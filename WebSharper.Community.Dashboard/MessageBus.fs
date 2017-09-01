namespace WebSharper.Community.Dashboard

open System
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
    |Select of (int*string list)
     member x.AsNumber  = match x with |Number(value) -> value | _ -> failwith("MessageBus.Value: unexpected type")
     member x.AsString  = match x with |String(value) -> value | _ -> failwith("MessageBus.Value: unexpected type")
     member x.AsBoolean = match x with |Boolean(value)-> value | _ -> failwith("MessageBus.Value: unexpected type")
     member x.AsSelect =  match x with |Select(value) -> value | _ -> failwith("MessageBus.Value: unexpected type")

    type Message = 
        {Key:string;Time:System.DateTime;Value:Value}
        static member Create value = {Key=Helper.UniqueKey();Time=System.DateTime.UtcNow;Value = value}
        member x.WithKey key = {x with Key = key} 
        member x.WithTime time = {x with Time = time} 

    let CreateMessage key value = {Key=key;Time=System.DateTime.UtcNow;Value=value}
    let NumberKeyMessage key value = CreateMessage key (Number(value))
    let StringKeyMessage key value = CreateMessage key (String(value))
    let BooleanKeyMesage key value = CreateMessage key (Boolean(value))
    let NumberMessage value = NumberKeyMessage (Helper.UniqueKey()) value
    let StringMessage value = StringKeyMessage (Helper.UniqueKey()) value
    let SelectMessage value = CreateMessage (Helper.UniqueKey()) (Select(value))

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
        let cutBuffer (time:DateTime) buffer=
            buffer |> List.fold (fun acc item -> //sprintf "%s %s  %f %b" (item.Time.ToLongTimeString()) (time.ToLongTimeString())  ((item.Time - time).TotalSeconds) ((item.Time - time).TotalSeconds > 0.0) |> log
                                                if (item.Time - time).TotalSeconds > 0.01 then item::acc else acc) []
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
                                                     try
                                                        callback (message)
                                                     with
                                                     |ex -> sprintf "Fails send message. It might be that receiver doesn't expect message of this type: %s" info.Name |> log
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
                //sprintf "Max time:%s" (maxTime.ToString()) |> log
                return! loop state
            | SendOnlyToClient (message) ->
                return! loop {state with Listeners=state.Listeners |> send_to_listeners message}
            | Send (message) ->
                //sprintf "Num listeners:%d msg:%s" state.Listeners.Length message.Key |> log
                state.ServerCallback |> Option.map(fun fncServer -> fncServer message) |> ignore
                return! loop {state with Listeners=state.Listeners |> send_to_listeners message}

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
                //"Ask for server messages" |> log
                let! latestTime = Agent.PostAndAsyncReply(fun r -> LatestMessageTime(r))
                let! messages=GetMessages latestTime
                messages |> List.iter (fun message -> Agent.Post(SendOnlyToClient(message)))
                if messages.Length > 0 then
                    //messages |> List.iter (fun msg ->sprintf "%s %s" msg.Key (msg.Time.ToString()) |> log) 
                    sprintf "Values from server requested messages received:%d" (messages.Length) |> log
        }|> Async.Start

