namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.PropertyGrid
open WebSharper.Community.Panel

[<JavaScript>]
module EventsEditor =

    let Render (eventItems:ListModel<Key,WorkerItem>) (propGrid:PropertyGrid)= 
            table[
                    ListModel.View eventItems
                    |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> tr [iAttr (Helper.AttrsClick 
                                                                                       (fun _ ->item.Worker.Properties |> propGrid.Edit))
                                                                            [textView item.Worker.Name.View]])
                  ]

