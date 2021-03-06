﻿namespace WebSharper.Community.Dashboard

open System
open WebSharper
open WebSharper.JavaScript
open FSharp.Data
open WebSharper.Community.Panel

[<JavaScript>]
module MessageBus =

    let log=Environment.Log

    type SystemMessage =
    |UpdateConfiguration of string

    type Value =
    |Number of double
    |String of string
    |Boolean of bool
    |Select of (int*string list)
    |System of SystemMessage
     member x.AsNumber  = match x with |Number(value) -> value 
                                       | _ -> "MessageBus.Value: unexpected type" |> log 
                                              0.0
     member x.AsString  = match x with |String(value) -> value 
                                       | _ -> "MessageBus.Value: unexpected type" |> log
                                              "Invalid"
     member x.AsBoolean = match x with |Boolean(value)-> value 
                                       | _ -> "MessageBus.Value: unexpected type" |> log
                                              false
     member x.AsSelect =  match x with |Select(value) -> value | _ -> failwith("MessageBus.Value: unexpected type")
     member x.trySystem = match x with |System(value) -> Some(value) | _ -> None
    type Message = 
        {Key:string;Time:System.DateTime;Value:Value}
        static member Create value = {Key=Helper.UniqueKey();Time=System.DateTime.UtcNow;Value = value}
        member x.WithKey key = {x with Key = key} 
        member x.WithTime time = {x with Time = time} 

    let CreateMessage value = {Key=Helper.UniqueKey();Time=System.DateTime.UtcNow;Value=value}

    type ListenerInfo =
     {Key:string;Name:string;CacheSize:int}
     static member Create key name cacheSize = {Key = key;Name = name;CacheSize=cacheSize}
    type SystemStatus = 
    |Inactive
    |Running

    type AgentMessage =
        | Send of Message
        | SendOnlyToClient of Message
        | RegisterListener of (ListenerInfo*(Message->unit))
        | RegisterServerCallback of (Message -> unit)
        | Stop
        | Start
        | GetStatus of (AsyncReplyChannel<SystemStatus>)
        | ReadMessages of (System.DateTime*System.DateTime*AsyncReplyChannel<Message list>)
        | LatestMessageTime of (AsyncReplyChannel<(System.DateTime*System.DateTime)>)
    type AgentState =
        {
            SystemStatus:SystemStatus
            ServerCallback:Option<(Message ->unit)>
            Listeners:List<ListenerInfo*(Message->unit)*List<Message>>
            LastConfigurationTime:DateTime
        }
        static member empty = {
                                Listeners= AgentState.initListeners;
                                SystemStatus=Inactive
                                ServerCallback=None
                                LastConfigurationTime=DateTime(1,1,1)}
        static member initListeners = [(ListenerInfo.Create "system" "Configuration" 1,
                                              (fun msg->msg.Value.trySystem |> Option.map (fun sysMsg -> match sysMsg with|UpdateConfiguration(json) ->  Environment.UpdateConfiguration(json)) |> ignore)
                                               ,[])]

    let Agent = MailboxProcessor<AgentMessage>.Start(fun inbox ->
        let cutBuffer (time:DateTime) buffer=
            buffer |> List.fold (fun acc item -> //sprintf "%s %s %s  %f %b" (item.Time.ToLongDateString()) (item.Time.ToLongTimeString()) (time.ToLongTimeString())  ((item.Time - time).TotalSeconds) ((item.Time - time).TotalSeconds > 0.0) |> log
                                                 if (item.Time - time).TotalSeconds > 0.01 then item::acc else acc) []  
                   //|> List.rev
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
                                                     //sprintf "Message send from:%s CacheSize:%d BufSize:%d" info.Name info.CacheSize (buf|>List.length)|> log
                                                     try
                                                        callback (message)
                                                     with
                                                     |ex -> sprintf "Fails send message. It might be that receiver doesn't expect message of this type: %s" info.Name |> log
                                                     (info,callback,update_and_split (info.CacheSize) buf message )
                                                 else listener )

        let rec loop state = async {
            let! message = inbox.Receive()
            match message with
            | Stop -> return! loop {state with SystemStatus = Inactive; Listeners= AgentState.initListeners}
            | Start -> return! loop {state with SystemStatus = Running}
            | GetStatus(channel) -> 
                channel.Reply(state.SystemStatus)
                return! loop state
            | RegisterListener (listenerInfo,receiver) ->
                sprintf "RegisterListener:%s %s" listenerInfo.Name listenerInfo.Key |> log
                //let buffer = if listenerInfo.CacheSize = 1 then SingleValue(startValue) else ListenerBuffer(listenerInfo.CacheSize,[])
                return! loop {state with Listeners=((listenerInfo,receiver,[])::state.Listeners)}
            | RegisterServerCallback (fnc) -> return! loop {state with ServerCallback=Some(fnc)}
            | ReadMessages (timeSys,timeMsg,channel) ->
                let messages = 
                    let getMsgs time listeners = 
                        listeners |> List.map (fun (info,_,buffer) -> cutBuffer time buffer) |> List.concat
                        |> List.fold (fun acc state -> if not (acc |> List.contains state) then state::acc else acc) [] 
                        |> List.sortBy (fun msg -> msg.Time)
                    let msgsSys=state.Listeners|> List.filter (fun (info,_,_) ->info.Key = "system" ) |> (getMsgs timeSys)
                    let msgs=state.Listeners|> List.filter (fun (info,_,_) ->info.Key <> "system" ) |> (getMsgs timeMsg)
                    msgsSys@msgs
                //Environment.Log(sprintf "ReadMessages:%d" messages.Length)
                channel.Reply(messages)
                return! loop state
            | LatestMessageTime (channel) ->
                let maxTimes = state.Listeners |> List.map (fun (info,_,buffer) -> //sprintf "Check listener time %s" info.Name |> log
                                                                                   match buffer with
                                                                                   |[] ->  DateTime(1,1,1)
                                                                                   |_ -> (buffer 
                                                                                         // |> List.filter (fun msg -> match msg.Value.trySystem with |Some(_) -> false |None -> true)
                                                                                          |> List.maxBy (fun item -> item.Time)).Time)
                let maxTime = match maxTimes with
                              | [] ->  DateTime(1,1,1)
                              | _ -> maxTimes |> List.max
                channel.Reply(state.LastConfigurationTime,maxTime)
                //sprintf "Max time:%s" (maxTime.ToString()) |> log
                return! loop state
            | SendOnlyToClient (message) ->
                match message.Value.trySystem with
                |Some(sys) -> match sys with |UpdateConfiguration(json) -> Environment.UpdateConfiguration(json)
                              return! loop {state with LastConfigurationTime = message.Time}
                |None ->
                    return! loop {state with Listeners=state.Listeners |> send_to_listeners message}
            | Send (message) ->
                //sprintf "Num listeners:%d msg:%s %s" state.Listeners.Length message.Key (message.Time.ToLongTimeString()) |> log
                state.ServerCallback |> Option.map(fun fncServer -> fncServer message) |> ignore
                return! loop {state with Listeners=state.Listeners |> send_to_listeners message}

        }
        loop AgentState.empty
    )
    [<Rpc>]
    let SendToServer(message) =
        Agent.Post(Send(message))
    [<Rpc>]
    let GetMessages (timeSys:System.DateTime,timeMsg:System.DateTime) = 
       Agent.PostAndAsyncReply(fun r -> ReadMessages(timeSys,timeMsg,r))
    let RunServerRequests()= 
        async {
            while true do
                do! Async.Sleep (2*1000)
                //"Ask for server messages" |> log
                let! latestTimes = Agent.PostAndAsyncReply(fun r -> LatestMessageTime(r))
                try
                    let! messages=GetMessages latestTimes
                    messages |> List.iter (fun message -> Agent.Post(SendOnlyToClient(message)))
                    if messages.Length > 0 then
                        messages |> List.iter (fun msg ->sprintf "%s %s" msg.Key (msg.Time.ToString()) |> log) 
                        sprintf "Values from server requested messages received:%d" (messages.Length) |> log
                with
                |_ ->()
        }|> Async.Start

