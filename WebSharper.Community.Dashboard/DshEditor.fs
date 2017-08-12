namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel
open WebSharper.Community.PropertyGrid


[<JavaScript>]
type DshEditorCellItem =
    {
        Key:Key
        OptInPort : Var<Option<InPort> >
        OptWorker : Var<Option<WorkerItem> >
        OptOutPort : Var<Option<OutPort> >
    }
    static member Create =
        {
            Key=Key.Fresh()
            OptInPort = Var.Create None
            OptWorker = Var.Create None
            OptOutPort = Var.Create None
        }
    member x.Render data reconnectFnc= 
         let observe (optWorker) =
              match optWorker with 
              |Some(workerItem) -> Console.Log("Workitem selected")
                                   x.OptInPort.Value <-  workerItem.Worker.InPorts |> List.tryHead
                                   x.OptOutPort.Value <- workerItem.Worker.OutPorts |> List.tryHead
                                   reconnectFnc()
              |None -> ()
         View.Sink observe x.OptWorker.View
         View.Sink (fun optInport -> reconnectFnc()) x.OptInPort.View
         View.Sink (fun optInport -> reconnectFnc()) x.OptOutPort.View

         let workerSelector =
           let inPorts = x.OptWorker.View.Map (fun  workerItemOpt -> match workerItemOpt with
                                                                     |Some(workerItem) -> let ports = workerItem.Worker.InPorts|>List.map(fun item -> Some(item))
                                                                                          if ports.Length > 0 then ports else [None]
                                                                     |None -> [None]
                                              )
           let outPorts = x.OptWorker.View.Map (fun  workerItemOpt ->match workerItemOpt with
                                                                     |Some(workerItem) -> let ports = workerItem.Worker.OutPorts|>List.map(fun item -> Some(item))
                                                                                          if ports.Length > 0 then ports else [None]
                                                                     |None -> [None]
                                              )
           let items = data.WorkItems.View.Map (fun itemSeq -> None::(itemSeq|>List.ofSeq|>List.map(fun item -> Some(item))))
           table[tr[
                  td[Doc.SelectDyn [Attr.Class "form-control"] 
                       (fun (item) -> item |> Option.fold (fun _ (port:InPort) ->  port.Name) " ")
                       inPorts
                       x.OptInPort ]
                  td[Doc.SelectDyn [Attr.Class "form-control"] 
                       (fun (item) -> item |> Option.fold (fun _ workerItem ->  workerItem.Worker.Name.Value) " ")
                       items
                       x.OptWorker]
                  td[Doc.SelectDyn [Attr.Class "form-control"] 
                       (fun (item) -> item |> Option.fold (fun _ (port:OutPort) ->  port.Name) " ")
                       outPorts
                       x.OptOutPort ]
            ]]
         tdAttr[Attr.Class "td DshEditorCell"] 
              [divAttr[Attr.Class "div DshEditorCell"]
                      [
                        table
                         [
                            tr[//td[Helper.IconNormal "add" (fun _ ->())]
                               td[workerSelector]
                              ]
                         ]
                      ]
              ]
    
[<JavaScript>]
type DshEditorRowItem =
    {
        Key:Key
        CellItems : ListModel<Key,DshEditorCellItem>
    }
    static member Create children=
        {
            Key=Key.Fresh()
            CellItems = ListModel.Create (fun item ->item.Key) children
        }

    member x.Render data reconnectFnc = 
                      let renderExistentCells= ListModel.View x.CellItems
                                               |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> item.Render data reconnectFnc)
                      tr[ renderExistentCells
                          Helper.IconNormal "add" (fun _ -> x.CellItems.Add (DshEditorCellItem.Create) )
                        ]
[<JavaScript>]
type DshEditor =
    {
        RowItems:ListModel<Key,DshEditorRowItem>
    }
    static member Create  =
        {
            RowItems = ListModel.Create (fun item ->item.Key) []
        }
    member x.CopyToRules = 
       {RuleContainer =
            x.RowItems |> List.ofSeq 
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
    member x.Restore data rules =
        x.RowItems.Clear()
        let allWorkers = data.WorkItems |>List.ofSeq |> List.map (fun item -> item.Worker)
        let allOutPorts = Workers.allOutPorts allWorkers
        let allInPorts = Workers.allInPorts allWorkers

        rules.RuleContainer |> List.iter (fun rowData -> 
                                            let row = DshEditorRowItem.Create []
                                            rowData.RuleChain |> List.iter (fun cellData ->
                                                                                    let cell = DshEditorCellItem.Create 
                                                                                    cell.OptWorker.Value <- data.WorkItems |> List.ofSeq |> List.tryFind (fun item ->  item.Worker.Key = cellData.WorkerKey)
                                                                                    cell.OptInPort.Value <- allInPorts |> List.tryFind (fun port ->  port.Key = cellData.InPortKey)
                                                                                    cell.OptOutPort.Value <- allOutPorts |> List.tryFind (fun port ->  port.Key = cellData.OutPortKey)
                                                                                    row.CellItems.Add cell
                                                                                )  
                                            x.RowItems.Add row      
                                     )
        rules.Reconnect allWorkers
    member x.Render data = 
        let reconnectFnc () =
                data.WorkItems |>List.ofSeq |> List.map (fun item -> item.Worker)
                |> (x.CopyToRules).Reconnect
        let renderRows=  ListModel.View x.RowItems
                         |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> tr [item.Render data (fun _ ->reconnectFnc())]) // x.Reconnect data)])
        table[
               renderRows
             ]


