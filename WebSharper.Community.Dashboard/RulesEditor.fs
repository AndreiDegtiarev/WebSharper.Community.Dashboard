namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel
open WebSharper.Community.PropertyGrid

[<JavaScript>]
module RulesEditor =

    let CopyToRules rowItems= 
       {RuleContainer =
            rowItems |> List.ofSeq 
            |> List.map (fun row -> {RuleChain =
                                         row.CellItems |> List.ofSeq
                                         |> List.map (fun cell ->
                                                            {InPortKey  = match cell.OptInPort.Value with | Some(port) -> port.Key | None -> ""
                                                             OutPortKey = match cell.OptOutPort.Value with | Some(port) -> port.Key | None -> ""
                                                             WorkerKey  = match cell.OptWorker.Value with | Some(worker) -> worker.Worker.Key | None -> "" 
                                                            }
                                                       )
                                    }
                                 
                         ) 
                     }
    let Restore data (rowItems:ListModel<Key,RulesRowItem>) rules =
        rowItems.Clear()
        let allWorkers = data.WorkItems |>List.ofSeq |> List.map (fun item -> item.Worker)
        let allOutPorts = Workers.allOutPorts allWorkers
        let allInPorts = Workers.allInPorts allWorkers

        rules.RuleContainer |> List.iter (fun rowData -> 
                                            let row = RulesRowItem.Create []
                                            rowData.RuleChain |> List.iter (fun cellData ->
                                                                                    let cell = RulesCellItem.Create 
                                                                                    cell.OptWorker.Value <- data.WorkItems |> List.ofSeq |> List.tryFind (fun item ->  item.Worker.Key = cellData.WorkerKey)
                                                                                    cell.OptInPort.Value <- allInPorts |> List.tryFind (fun port ->  port.Key = cellData.InPortKey)
                                                                                    cell.OptOutPort.Value <- allOutPorts |> List.tryFind (fun port ->  port.Key = cellData.OutPortKey)
                                                                                    row.CellItems.Add cell
                                                                                )  
                                            rowItems.Add row      
                                     )
        rules.Reconnect allWorkers
    let Render data rowItems= 
        let reconnectFnc () =
                data.WorkItems |>List.ofSeq |> List.map (fun item -> item.Worker)
                |> (CopyToRules rowItems).Reconnect
        let renderRows=  ListModel.View rowItems
                         |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> tr [item.Render data.WorkItems (fun _ ->reconnectFnc())]) // x.Reconnect data)])
        table[
               renderRows
             ]


