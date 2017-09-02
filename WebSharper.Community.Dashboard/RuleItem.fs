namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel
open WebSharper.Community.PropertyGrid


[<JavaScript>]
type RulesCellItem =
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
    member x.Render (workItems:ListModel<Key,WorkerItem>) reconnectFnc= 
         let observe (optWorker) =
              match optWorker with 
              |Some(workerItem) -> //"Workitem selected" |> Environment.Log
                                   x.OptInPort.Value <-  workerItem.Worker.InPorts |> List.tryHead
                                   x.OptOutPort.Value <- workerItem.Worker.OutPorts |> List.tryHead
                                   reconnectFnc()
              |None -> ()
         View.Sink observe x.OptWorker.View
         View.Sink (fun optInport -> //"inport selected" |> Environment.Log
                                     reconnectFnc()) x.OptInPort.View
         View.Sink (fun optInport -> //"outport selected" |> Environment.Log
                                     reconnectFnc()) x.OptOutPort.View

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
           let items = workItems.View.Map (fun itemSeq -> None::(itemSeq|>List.ofSeq|>List.map(fun item -> Some(item))))
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
type RulesRowItem =
    {
        Key:Key
        CellItems : ListModel<Key,RulesCellItem>
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
                          Helper.IconNormal "add" (fun _ -> x.CellItems.Add (RulesCellItem.Create) )
                        ]