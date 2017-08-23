namespace WebSharper.Community.Dashboard

open WebSharper

[<JavaScript>]
type RuleEntry =
    {InPortKey:string;OutPortKey:string;WorkerKey:string;}
[<JavaScript>]
type RuleChain =
    {RuleChain:RuleEntry list}

[<JavaScript>]
type RuleContainer =
    {RuleContainer:RuleChain list}
    member x.Reconnect workers = 
        let allOutPorts = Workers.allOutPorts workers
        let allInPorts = Workers.allInPorts workers
        allInPorts |> List.iter (fun inPort ->  Environment.Log(sprintf "%s %s" inPort.Name inPort.Key))
        MessageBus.Agent.Post MessageBus.Clear
        x.RuleContainer
        |> List.ofSeq
        |> List.iter (fun row -> 
                             let cells = row.RuleChain |> List.ofSeq
                             for i in [1..(cells.Length - 1)] do
                                 let cell1=cells.[i-1]
                                 let cell2=cells.[i]
                                 allOutPorts|> List.tryFind (fun port -> port.Key = cell1.OutPortKey)
                                 |> Option.map (fun outPort -> Environment.Log(sprintf "Found out port %s" cell2.InPortKey)
                                                               allInPorts|> List.tryFind (fun port -> port.Key = cell2.InPortKey)
                                                               |> Option.map (fun inPort ->
                                                                                Environment.Log "Found int port"
                                                                                let listInfo = MessageBus.ListenerInfo.Create outPort.Key (outPort.Name+"->"+inPort.Name) inPort.CacheSize 
                                                                                let templateValue = match inPort.PortValue.Value.Value with 
                                                                                                    |MessageBus.Number(_) -> MessageBus.Message.Create (MessageBus.Number(0.0))
                                                                                                    |MessageBus.String(_) -> MessageBus.Message.Create (MessageBus.String(""))
                                                                                                    |MessageBus.Boolean(_) -> MessageBus.Message.Create (MessageBus.Boolean(false))
                                                                                MessageBus.Agent.Post (MessageBus.RegisterListener(listInfo,templateValue,inPort.Receive))
                                                                             ))|>ignore
                     )


