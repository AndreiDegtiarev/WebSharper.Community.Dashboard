namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.Community.PropertyGrid
open WebSharper.Community.Panel
open WebSharper.UI.Html


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
      PropertyGrid:PropertyGrid
    }
    static member Create  name propertyGrid=
        {
            Key=Key.Fresh()
            Name=Var.Create name
            EventItems = ListModel.Create (fun item ->item.Key) []
            PropertyGrid = propertyGrid
        }
    member x.Render = 
            let moveItem = Helper.MoveItemInModelList x.EventItems
            let icons item = [
                           Helper.IconSmall "keyboard_arrow_down" (fun _ ->moveItem true item)
                           Helper.IconSmall "keyboard_arrow_up" (fun _ ->moveItem false item)
                           Helper.IconSmall "clear" (fun _ ->x.EventItems.Remove(item))
                        ]
            table[][
                    ListModel.View x.EventItems
                    |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> tr[] [(div(Helper.AttrsClick (fun _ ->item.Worker.Properties |> x.PropertyGrid.Edit))
                                                                                      [textView item.Worker.Name.View])
                                                                               |> WrapControls.Render (icons item) WrapControlsAligment.Horizontal
                                                                                                                   ])
                  ]
    interface ISelectorItem with
        override x.Key = x.Key
        override x.Name = x.Name
        override x.Render = x.Render
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
    member x.Render  = x.PanelContainer.Render
    interface ISelectorItem with
        override x.Key = x.Key
        override x.Name = x.Name
        override x.Render = x.Render

[<JavaScript;CustomEquality;NoComparison>]
type RulesGroupItem = 
    {
      Key:Key
      Name:Var<string>
      RulesRowItems:ListModel<Key,RulesRowItem>
      Renderer:(ListModel<Key,RulesRowItem>->Elt)
    }
    static member Create  name renderer=
        {
            Key=Key.Fresh()
            Name=Var.Create name
            RulesRowItems = ListModel.Create (fun item ->item.Key) []
            Renderer = renderer
        }
    member x.Render  = x.Renderer(x.RulesRowItems)

    interface ISelectorItem with
        override x.Key = x.Key
        override x.Name = x.Name
        override x.Render = x.Render
    override x.Equals y = match y with
                          | :? RulesGroupItem as gr -> x.Key = gr.Key
                          | _ -> false
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


