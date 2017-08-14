namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Storage
open WebSharper.Community.Panel


[<JavaScript>]
type WidgetItem = 
    {
      Key:Key
      Panel:string;
      Widget:Worker
    }
    static member Create  panel widget=
        {
            Key=Key.Fresh()
            Panel = panel
            Widget = widget
        }
[<JavaScript>]
type EventsGroupItem = 
    {
      Key:Key
      Name:Var<string>
      EventItems : ListModel<Key,WorkerItem>
    }
    static member Create  =
        {
            Key=Key.Fresh()
            Name=Var.Create "Events"
            EventItems = ListModel.Create (fun item ->item.Key) []
        }

[<JavaScript>]
type DshData =
    {
        WorkItems : ListModel<Key,WorkerItem>
        WidgetItems : ListModel<Key,WidgetItem>
        EventItems : ListModel<Key,WorkerItem>
        EventGroups : ListModel<Key,EventsGroupItem>
    }
    static member Create =
        {
            WorkItems = ListModel.Create (fun item ->item.Key) []
            WidgetItems = ListModel.Create (fun item ->item.Key) []
            EventItems = ListModel.Create (fun item ->item.Key) []
            EventGroups = ListModel.Create (fun item ->item.Key) []
        }
    member x.Clear = 
        x.WorkItems.Clear()
        x.WidgetItems.Clear()
        x.EventItems.Clear()
        x.EventGroups.Clear()
    member x.RegisterEvent key (event:Worker) = 
        let item = WorkerItem.Create (event.WithKey(key))
        x.EventItems.Add item
        x.WorkItems.Add item
    member x.RegisterEventInGroup key (group:EventsGroupItem) (event:Worker) = 
        let item = WorkerItem.Create (event.WithKey(key))
        group.EventItems.Add item
        x.WorkItems.Add item
    member x.RegisterWidget key panel (widget:Worker) = 
        let widget_key = widget.WithKey(key)
        let item = WidgetItem.Create panel (widget_key)
        x.WidgetItems.Add item
        x.WorkItems.Add (WorkerItem.Create widget_key)

