namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html

[<JavaScript>]
type WorkerItem =
    {
        Key:Key
        Worker : Worker
    }
    static member Create  worker=
        {
            Key=Key.Fresh()
            Worker = worker
        }
[<JavaScript>]
type Factory =
    {
        EventItems : ListModel<Key,WorkerItem>
        WidgetItems : ListModel<Key,WorkerItem>
    }
    static member Create =
        {
           EventItems = ListModel.Create (fun item ->item.Key) []
           WidgetItems = ListModel.Create (fun item ->item.Key) []
        }
    member x.RegisterWidget widget = 
        x.WidgetItems.Add (WorkerItem.Create widget)
    member x.RegisterEvent event = 
        x.EventItems.Add (WorkerItem.Create event)
