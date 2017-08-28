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
        let log = Environment.Log
        let allOutPorts = Workers.allOutPorts workers
        let allInPorts = Workers.allInPorts workers
        allInPorts |> List.iter (fun inPort ->  Environment.Log(sprintf "InPort: %s %s" inPort.Name inPort.Data.Key))
        allOutPorts |> List.iter (fun port ->  Environment.Log(sprintf "outPort: %s %s" port.Name port.Key))
        MessageBus.Agent.Post MessageBus.Clear
        x.RuleContainer
        |> List.ofSeq
        |> List.iter (fun row -> 
                             let cells = row.RuleChain |> List.ofSeq
                             for i in [1..(cells.Length - 1)] do
                                 let cell1=cells.[i-1]
                                 let cell2=cells.[i]
                                 allOutPorts|> List.tryFind (fun port -> port.Key = cell1.OutPortKey)
                                 |> Option.map (fun outPort -> sprintf "Found outPort %s try to find inPort:%s" cell1.OutPortKey cell2.InPortKey |> log
                                                               allInPorts|> List.tryFind (fun port -> port.Data.Key = cell2.InPortKey)
                                                               |> Option.map (fun inPort ->
                                                                                "Found inPort"|> log
                                                                                if inPort.PortValue.Value.Key <> inPort.Data.Key then
                                                                                    inPort.PortValue.Value <- inPort.PortValue.Value.WithKey(inPort.Data.Key)
                                                                                let listInfo = MessageBus.ListenerInfo.Create outPort.Key (outPort.Name+"->"+inPort.Name) inPort.Data.CacheSize 
                                                                                let templateValue = match inPort.PortValue.Value.Value with 
                                                                                                    |MessageBus.Number(_) -> MessageBus.Message.Create (MessageBus.Number(0.0))
                                                                                                    |MessageBus.String(_) -> MessageBus.Message.Create (MessageBus.String(""))
                                                                                                    |MessageBus.Boolean(_) -> MessageBus.Message.Create (MessageBus.Boolean(false))
                                                                                MessageBus.Agent.Post (MessageBus.RegisterListener(listInfo,templateValue,inPort.Receive))
                                                                             ))|>ignore
                     )


