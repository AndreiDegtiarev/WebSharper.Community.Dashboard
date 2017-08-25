namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open FSharp.Data
open WebSharper.Community.Panel

[<JavaScript>]
module MessageBus =

    let log=Environment.Log

    type Value =
    |Number of double
    |String of string
    |Boolean of bool
     member x.AsNumber  = match x with |Number(num) -> num | _ -> failwith("MessageBus.Value: unexpected type")
     member x.AsString  = match x with |String(num) -> num | _ -> failwith("MessageBus.Value: unexpected type")
     member x.AsBoolean = match x with |Boolean(num) -> num | _ -> failwith("MessageBus.Value: unexpected type")

    type Message = 
        {Key:string;Time:System.DateTime;Value:Value}
        static member Create value = {Key=Helper.UniqueKey();Time=System.DateTime.UtcNow;Value = value}
        member x.WithKey key = {x with Key = key} 

    let CreateKeyValue key value = {Key=key;Time=System.DateTime.UtcNow;Value=value}
    let CreateNumPair key value = CreateKeyValue key (Number(value))
    let CreateStrPair key value = CreateKeyValue key (String(value))
    let CreateBooleanPair key value = CreateKeyValue key (Boolean(value))
    let CreateNumber value = CreateNumPair (Helper.UniqueKey()) value
    let CreateString value = CreateStrPair (Helper.UniqueKey()) value

    type ListenerInfo =
     {Key:string;Name:string;CacheSize:int}
     static member Create key name cacheSize = {Key = key;Name = name;CacheSize=cacheSize}

    type AgentMessage =
        | Send of Message
        | SendOnlyToClient of Message
        | RegisterListener of (ListenerInfo*Message*(Message->unit))
        | RegisterServerCallback of (Message -> unit)
        | Clear
        | ReadMessages of (System.DateTime*AsyncReplyChannel<Message list>)
        | LatestMessageTime of (AsyncReplyChannel<System.DateTime>)

    type AgentState =
        {
            ServerCallback:Option<(Message ->unit)>
            Listeners:List<ListenerInfo*(Message->unit)*List<Message>>
        }
        static member empty = {Listeners=List.empty;ServerCallback=None}

    let Agent = MailboxProcessor<AgentMessage>.Start(fun inbox ->
        //let timeDiff = 10.0
        let cutBuffer time buffer=
            buffer |> List.fold (fun acc item -> if item.Time >= time then item::acc else acc) []
        let split maxSize (buffer:List<Message>) = 
                        if maxSize < buffer.Length then 
                            let (new_buffer,rest) =  buffer|> List.splitAt maxSize
                            new_buffer else buffer
        let update_and_split maxSize buffer value= 
            if maxSize = 1 then [value] else value::buffer |> split maxSize

        let send_to_listeners  (message:Message) listeners = 
                    listeners 
                    //|> List.filter (fun (info,_,_)  -> info.Key = busKeyValue.Key) 
                    |> List.map (fun listener -> let  (info,callback,buf) = listener
                                                 if info.Key = message.Key then 
                                                     //sprintf "Message send from:%s CacheSize:%d BufSize:%d" info.Name info.CacheSize (buf|>List.length)|> Log
                                                     callback (message)
                                                     (info,callback,update_and_split (info.CacheSize) buf message )
                                                 else listener )

        let rec loop state = async {
            let! message = inbox.Receive()
            match message with
            | Clear ->
                return! loop AgentState.empty
            | RegisterListener (listenerInfo,startValue,receiver) ->
                sprintf "RegisterListener:%s %s" listenerInfo.Name listenerInfo.Key |> log
                //let buffer = if listenerInfo.CacheSize = 1 then SingleValue(startValue) else ListenerBuffer(listenerInfo.CacheSize,[])
                return! loop {state with Listeners=((listenerInfo,receiver,[])::state.Listeners)}
            | RegisterServerCallback (fnc) -> return! loop {state with ServerCallback=Some(fnc)}
            | ReadMessages (time,channel) ->
                let messages = 
                    state.Listeners |> List.map (fun (info,_,buffer) -> cutBuffer time buffer) |> List.concat
                    |> List.fold (fun acc state -> if not (acc |> List.contains state) then state::acc else acc) []
                //Log(sprintf "ReadMessages:%d" messages.Length)
                channel.Reply(messages)
                return! loop state
            | LatestMessageTime (channel) ->
                let maxTimes = state.Listeners |> List.map (fun (info,_,buffer) -> match buffer with
                                                                                   |[] -> System.DateTime(0,0,0)
                                                                                   |_ -> (buffer |> List.maxBy (fun item -> item.Time)).Time)
                let maxTime = match maxTimes with
                              | [] ->  System.DateTime(0,0,0)
                              | _ -> maxTimes |> List.max
                channel.Reply(maxTime)
                return! loop state
            | SendOnlyToClient (busKeyValue) ->
                return! loop {state with Listeners=state.Listeners |> send_to_listeners busKeyValue}
            | Send (busKeyValue) ->
                //log(sprintf "Num listeners:%d" state.Listeners.Length)
                state.ServerCallback |> Option.map(fun fncServer -> fncServer busKeyValue) |> ignore
                return! loop {state with Listeners=state.Listeners |> send_to_listeners busKeyValue}

        }
        loop AgentState.empty
    )
    [<Rpc>]
    let SendToServer(message) =
        Agent.Post(Send(message))
    [<Rpc>]
    let GetMessages (time:System.DateTime) = 
       Agent.PostAndAsyncReply(fun r -> ReadMessages(time,r))
    let RunServerRequests()= 
        async {
            while true do
                do! Async.Sleep (2*1000)
                let! latestTime = Agent.PostAndAsyncReply(fun r -> LatestMessageTime(r))
                let! messages=GetMessages latestTime
                messages |> List.iter (fun message -> Agent.Post(SendOnlyToClient(message)))
                if messages.Length > 0 then
                    sprintf "Values from server requested messages received:%d" (messages.Length) |> log
        }|> Async.Start

