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
        OptWorker : Var<Option<WorkerItem> >
    }
    static member Create =
        {
            Key=Key.Fresh()
            OptWorker = Var.Create None
        }
    member x.Render data= 
         let workerSelector =
           let items = data.WorkItems|>List.ofSeq|>List.map(fun item -> Some(item))
           Doc.Select [Attr.Class "form-control"] 
               (fun (item) -> 
                               match item with
                               |Some(workerItem) -> workerItem.Worker.Name.Value
                               |None -> " ") 
               items
               x.OptWorker

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

    member x.Render data = 
                      let renderExistentCells= ListModel.View x.CellItems
                                               |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> item.Render data)
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
    
    member x.Render data = 
        let renderRows=  ListModel.View x.RowItems
                         |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> tr [item.Render data])
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
    