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
              |Some(workerItem) -> //Console.Log("Workitem selected")
                                   x.OptInPort.Value <- workerItem.Worker.InPorts |> List.tryHead
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
                            tr[td[Helper.IconNormal "add" (fun _ ->())]
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
    static member Create =
        {
            Key=Key.Fresh()
            CellItems = ListModel.Create (fun item ->item.Key) []
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
    member x.Reconnect (data:DshData) ()= 
                           data.PortConnectorItems |> Seq.iter (fun item -> item.PortConnector.Disconnect())
                           data.PortConnectorItems.Clear()
                           x.RowItems
                           |> List.ofSeq
                           |> List.iter (fun row -> 
                                                let cells = row.CellItems |> List.ofSeq
                                                for i in [1..(cells.Length - 1)] do
                                                    let cell1=cells.[i-1]
                                                    let cell2=cells.[i]
                                                    cell1.OptOutPort.Value 
                                                    |> Option.map (fun outPort -> cell2.OptInPort.Value 
                                                                                  |> Option.map (fun inPort->data.ConnectPorts outPort inPort))|>ignore
                                                    //data.ConnectPorts (cell1.OptOutPort.Value.Value) (cell2.OptInPort.Value.Value) 
                                        )
    member x.Render data = 
        let renderRows=  ListModel.View x.RowItems
                         |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> tr [item.Render data (x.Reconnect data)])
        table[
               renderRows
               tr[td[Helper.IconNormal "add" (fun _ -> x.RowItems.Add (DshEditorRowItem.Create) )]]
             ]

[<JavaScript>] 
type SourceProperty(data,receiver:Worker)= 
    interface IProperty with 
          override x.Name = "Source"
          override x.Render = 
              let items = data.WorkItems|>List.ofSeq|>List.map(fun item -> item.Worker.OutPorts|>List.map(fun port -> item,port))|>List.concat
              if items.Length > 0 then
                  let item = 
                      match items |>List.tryFind (fun (srcItem,port) -> port = receiver.InPorts.[0].OutPort) with
                      |None -> items.Head
                      |Some(item) -> item
                  let selected=Var.Create (item)
                  let propSources = Properties.select "Source" (fun (item,port:OutPort) -> item.Worker.Name.Value + "\\"+(port.Name)) items selected
                  let observe (src,outPort:OutPort) =
                      data.ConnectPorts outPort receiver.InPorts.[0]
                  View.Sink observe selected.View

                  Doc.Select [Attr.Class "form-control"] 
                        (fun (item,port:OutPort) -> item.Worker.Name.Value + "\\"+(port.Name)) 
                        items
                        selected  :>Doc
              else 
                text "No sources defined"        
    