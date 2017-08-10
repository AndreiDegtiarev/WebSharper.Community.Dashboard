namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.Community.Panel

[<JavaScript>]
module MessageBus =

    type Value =
    |Number of double
    |String of string

    type KeyValue = 
        {Key:string;Value:Value}

    let CreateKeyValue key value = {Key=key;Value=value}
    let CreateNumPair key value = CreateKeyValue key (Number(value))
    let CreateStrPair key value = CreateKeyValue key (String(value))
    let CreateNumber value = CreateNumPair (Helper.UniqueKey()) value
    let CreateString value = CreateStrPair (Helper.UniqueKey()) value

    type Message =
        | Send of KeyValue
        | RegisterListener of (string*(Value->unit))
        | Clear

    type AgentState =
        {Listeners:List<string*(Value->unit)>}

    let Agent = MailboxProcessor<Message>.Start(fun inbox ->
        let rec loop state = async {
            let! message = inbox.Receive()
            match message with
            | Clear ->
                return! loop{Listeners=List.empty}
            | RegisterListener listenerInfo ->
                return! loop {state with Listeners=(listenerInfo::state.Listeners)}
            | Send (busKeyValue) ->
                state.Listeners |> List.filter (fun (key,_)  -> key = busKeyValue.Key) |> List.iter (fun (_,callback) -> callback (busKeyValue.Value))
                return! loop state

        }
        loop {Listeners=List.empty}
    )

