﻿namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.UI.Html
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
                                                            {InPortKey  = match cell.OptInPort.Value  with | Some(port)  -> port.Key | None -> ""
                                                             OutPortKey = match cell.OptOutPort.Value with | Some(port)  -> port.Key | None -> ""
                                                             WorkerKey  = match cell.OptWorker.Value  with | Some(worker)-> worker.Worker.Key | None -> "" 
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
        //rules.Reconnect allWorkers
    let Render data rowItems= 
        let moveItem = Helper.MoveItemInModelList rowItems
        let icons item = [
                       Helper.IconSmall "keyboard_arrow_down" (fun _ ->moveItem true item)
                       Helper.IconSmall "keyboard_arrow_up" (fun _ ->moveItem false item)
                       Helper.IconSmall "clear" (fun _ ->rowItems.Remove(item))
                    ]

        let reconnectFnc () =
            async{
                let! status = MessageBus.Agent.PostAndAsyncReply(fun r -> MessageBus.GetStatus(r))
                match status with
                |MessageBus.Running -> 
                    MessageBus.Agent.Post MessageBus.Stop
                    data.WorkItems |>List.ofSeq |> List.map (fun item -> item.Worker)
                    |> (CopyToRules rowItems).Reconnect
                    MessageBus.Agent.Post MessageBus.Start
                |_ ->()
            } |> Async.Start
        let renderRows=  ListModel.View rowItems
                         |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> tr[] [item.Render data.WorkItems (fun _ ->reconnectFnc())
                                                                                  |> WrapControls.Render (icons item) WrapControlsAligment.Horizontal
                                                                                 ]) 
        table[][
               renderRows
             ]


