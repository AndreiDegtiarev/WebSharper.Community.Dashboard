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
    static member Create  name=
        {
            Key=Key.Fresh()
            Name=Var.Create name
            EventItems = ListModel.Create (fun item ->item.Key) []
        }
[<JavaScript>]
type WidgetsGroupItem = 
    {
      Key:Key
      Name:Var<string>
      WidgetItems : ListModel<Key,WidgetItem>
      PanelContainer:PanelContainer
    }
    static member Create  name panelContainer =
        {
            Key=Key.Fresh()
            Name=Var.Create name
            WidgetItems = ListModel.Create (fun item ->item.Key) []
            PanelContainer = panelContainer
        }
[<JavaScript>]
type RulesGroupItem = 
    {
      Key:Key
      Name:Var<string>
      RulesRowItems:ListModel<Key,RulesRowItem>
    }
    static member Create  name =
        {
            Key=Key.Fresh()
            Name=Var.Create name
            RulesRowItems = ListModel.Create (fun item ->item.Key) []
        }

[<JavaScript>]
type DshData =
    {
        WorkItems : ListModel<Key,WorkerItem>
        WidgetGroups : ListModel<Key,WidgetsGroupItem>
        EventGroups : ListModel<Key,EventsGroupItem>
        RulesGroups : ListModel<Key,RulesGroupItem>
    }
    static member Create =
        {
            WorkItems = ListModel.Create (fun item ->item.Key) []
            WidgetGroups = ListModel.Create (fun item ->item.Key) []
            EventGroups = ListModel.Create (fun item ->item.Key) []
            RulesGroups = ListModel.Create (fun item ->item.Key) []
        }
    member x.Clear = 
        x.WorkItems.Clear()
        x.WidgetGroups.Clear()
        x.EventGroups.Clear()
        x.RulesGroups.Clear()
    member x.RegisterEvent key (group:EventsGroupItem) (event:Worker) = 
        let item = WorkerItem.Create (event.WithKey(key))
        group.EventItems.Add item
        x.WorkItems.Add item
    member x.RegisterWidget key group panel (widget:Worker) = 
        let widget_key = widget.WithKey(key)
        let item = WidgetItem.Create panel (widget_key)
        group.WidgetItems.Add item
        x.WorkItems.Add (WorkerItem.Create widget_key)


