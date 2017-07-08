namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel

[<JavaScript>]
type DshEditorCellItem =
    {
        Key:Key
        OptWorker : Option<Worker>
    }
    static member Create =
        {
            Key=Key.Fresh()
            OptWorker = None
        }
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
    member x.Render = let renderExistentCells= ListModel.View x.CellItems
                                               |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> let content =
                                                                                                          match item.OptWorker with
                                                                                                          |Some(worker) -> textView worker.Name.View
                                                                                                          |None -> text ""
                                                                                                    tdAttr [Attr.Style "width" "50px"
                                                                                                            Attr.Style "height" "50px"
                                                                                                            Attr.Style "border" "2px solid white"]
                                                                                                           [content])
                      tr[ renderExistentCells
                          Helper.IconNormal "add" (fun _ -> x.CellItems.Add (DshEditorCellItem.Create) )
                        ]
[<JavaScript>]
type DshEditor =
    {
        RowItems:ListModel<Key,DshEditorRowItem>
    }
    static member Create =
        {
            RowItems = ListModel.Create (fun item ->item.Key) []
        }
    
    member x.Render = 
        let renderRows=  ListModel.View x.RowItems
                         |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> tr [item.Render])
        table[
               renderRows
               tr[td[Helper.IconNormal "add" (fun _ -> x.RowItems.Add (DshEditorRowItem.Create) )]]
             ]

        
    