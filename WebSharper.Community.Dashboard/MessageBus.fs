namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open FSharp.Data
open WebSharper.Community.Panel

[<JavaScript>]
module MessageBus =
    let mutable Log:(string->unit) =(fun _ ->())
    type Value =
    |Number of double
    |String of string
     member x.AsNumber = match x with |Number(num) -> num | _ -> failwith("MessageBus.Value: unexpected type")

    type KeyValue = 
        {Key:string;Time:System.DateTime;Value:Value}
        static member Create value = {Key=Helper.UniqueKey();Time=System.DateTime.UtcNow;Value = value}

    let CreateKeyValue key value = {Key=key;Time=System.DateTime.UtcNow;Value=value}
    let CreateNumPair key value = CreateKeyValue key (Number(value))
    let CreateStrPair key value = CreateKeyValue key (String(value))
    let CreateNumber value = CreateNumPair (Helper.UniqueKey()) value
    let CreateString value = CreateStrPair (Helper.UniqueKey()) value

    type ListenerInfo =
     {Key:string;Name:string;CacheSize:int}
     static member Create key name cacheSize = {Key = key;Name = name;CacheSize=cacheSize}

    type Message =
        | Send of KeyValue
        | RegisterListener of (ListenerInfo*KeyValue*(Value->unit))
        | Clear
        | ReadMessages of (System.DateTime*AsyncReplyChannel<KeyValue list>)
        | LatestMessageTime of (AsyncReplyChannel<System.DateTime>)

    type AgentState =
        {
            Listeners:List<ListenerInfo*(Value->unit)*List<KeyValue>>
        }
        static member empty = {Listeners=List.empty}

    let Agent = MailboxProcessor<Message>.Start(fun inbox ->
        //let timeDiff = 10.0
        let cutBuffer time buffer=
            buffer |> List.fold (fun acc item -> if item.Time >= time then item::acc else acc) []
        let split maxSize (buffer:List<KeyValue>) = 
                        if maxSize < buffer.Length then 
                            let (new_buffer,rest) =  buffer|> List.splitAt maxSize
                            new_buffer else buffer
        let update_and_split maxSize buffer value= 
            if maxSize = 1 then [value] else value::buffer |> split maxSize


        let rec loop state = async {
            let! message = inbox.Receive()
            match message with
            | Clear ->
                return! loop AgentState.empty
            | RegisterListener (listenerInfo,startValue,receiver) ->
                Log(sprintf "RegisterListener:%s" listenerInfo.Name)
                //let buffer = if listenerInfo.CacheSize = 1 then SingleValue(startValue) else ListenerBuffer(listenerInfo.CacheSize,[])
                return! loop {state with Listeners=((listenerInfo,receiver,[])::state.Listeners)}
            | ReadMessages (time,channel) ->
                let messages = 
                    state.Listeners |> List.map (fun (info,_,buffer) -> cutBuffer time buffer) |> List.concat
                    |> List.fold (fun acc state -> if not (acc |> List.contains state) then state::acc else acc) []
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
            | Send (busKeyValue) ->
                //Log(sprintf "Num listeners:%d" state.Listeners.Length)
                let listeners = 
                    state.Listeners 
                    //|> List.filter (fun (info,_,_)  -> info.Key = busKeyValue.Key) 
                    |> List.map (fun listener -> let  (info,callback,buf) = listener
                                                 if info.Key = busKeyValue.Key then 
                                                     //sprintf "Message send from:%s CacheSize:%d BufSize:%d" info.Name info.CacheSize buf.Length|> Log
                                                     callback (busKeyValue.Value)
                                                     (info,callback,update_and_split (info.CacheSize) buf busKeyValue )
                                                 else listener
                               )
                return! loop {Listeners=listeners}

        }
        loop AgentState.empty
    )
    [<Rpc>]
    let GetMessages (time:System.DateTime) = 
       Agent.PostAndAsyncReply(fun r -> ReadMessages(time,r))
    let RunServerRequests()= 
        async {
            while true do
                do! Async.Sleep (2*1000)
                let! latestTime = Agent.PostAndAsyncReply(fun r -> LatestMessageTime(r))
                let! messages=GetMessages latestTime
                messages |> List.iter (fun message -> Agent.Post(Send(message)))
                Log(sprintf "Values from server requested messages received:%d" (messages.Length))
        }|> Async.Start

