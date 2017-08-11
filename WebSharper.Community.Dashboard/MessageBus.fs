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

    type KeyValue = 
        {Key:string;Time:System.DateTime;Value:Value}

    let CreateKeyValue key value = {Key=key;Time=System.DateTime.UtcNow;Value=value}
    let CreateNumPair key value = CreateKeyValue key (Number(value))
    let CreateStrPair key value = CreateKeyValue key (String(value))
    let CreateNumber value = CreateNumPair (Helper.UniqueKey()) value
    let CreateString value = CreateStrPair (Helper.UniqueKey()) value

    type Message =
        | Send of KeyValue
        | RegisterListener of (string*string*(Value->unit))
        | Clear
        | ReadMessages of (System.DateTime*AsyncReplyChannel<KeyValue list>)
        | LatestMessageTime of (AsyncReplyChannel<System.DateTime>)

    type AgentState =
        {
            Buffer:List<KeyValue>
            Listeners:List<string*string*(Value->unit)>
        }
        static member empty = {Listeners=List.empty;Buffer=List.empty}

    let Agent = MailboxProcessor<Message>.Start(fun inbox ->
        let timeDiff = 10.0
        let cutBuffer time buffer=
            buffer |> List.fold (fun acc item -> if item.Time >= time then item::acc else acc) []

        let rec loop state = async {
            let! message = inbox.Receive()
            match message with
            | Clear ->
                return! loop AgentState.empty
            | RegisterListener listenerInfo ->
                return! loop {state with Listeners=(listenerInfo::state.Listeners)}
            | ReadMessages (time,channel) ->
                channel.Reply(state.Buffer |> cutBuffer time)
                return! loop state
            | LatestMessageTime (channel) ->
                channel.Reply(match state.Buffer with
                              | [] ->  System.DateTime(0,0,0)
                              | buf -> (buf |> List.maxBy (fun item -> item.Time)).Time)
                return! loop state
            | Send (busKeyValue) ->
                let newState = 
                   let newBuf = busKeyValue::(state.Buffer)
                   let lastTime = (newBuf |> List.maxBy (fun item -> item.Time)).Time-System.TimeSpan.FromSeconds(timeDiff)
                   let buf = newBuf |> cutBuffer lastTime
                   //Log(sprintf "Last time:%s count:%d" (lastTime.ToString()) (buf.Length))
                   {state with Buffer = buf}
                //Log(sprintf "Num listeners:%d" newState.Listeners.Length)
                newState.Listeners |> List.filter (fun (key,_,_)  -> key = busKeyValue.Key) |> List.iter (fun (_,name,callback) -> 
                                                                                                         //"Message send from:"+name |> Log
                                                                                                         callback (busKeyValue.Value))
                return! loop newState

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
                Console.Log(sprintf "Values from server requested messages received:%d" (messages.Length))
        }|> Async.Start

