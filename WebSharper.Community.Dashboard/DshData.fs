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
type DshData =
    {
        WorkItems : ListModel<Key,WorkerItem>
        WidgetItems : ListModel<Key,WidgetItem>
        EventItems : ListModel<Key,WorkerItem>
    }
    static member Create =
        {
            WorkItems = ListModel.Create (fun item ->item.Key) []
            WidgetItems = ListModel.Create (fun item ->item.Key) []
            EventItems = ListModel.Create (fun item ->item.Key) []

        }
    member x.Clear = 
        x.WorkItems.Clear()
        x.WidgetItems.Clear()
        x.EventItems.Clear()
    member x.RegisterEvent key (event:Worker) = 
        let item = WorkerItem.Create (event.WithKey(key))
        x.EventItems.Add item
        x.WorkItems.Add item
    member x.RegisterWidget key panel (widget:Worker) = 
        let widget_key = widget.WithKey(key)
        let item = WidgetItem.Create panel (widget_key)
        x.WidgetItems.Add item
        x.WorkItems.Add (WorkerItem.Create widget_key)
 //   member x.ConnectPorts (outPort:OutPort) (inPort:InPort) = 
 //       Console.Log("Connect ports:"+outPort.Name+" "+inPort.Name)
 //       MessageBus.Agent.Post (MessageBus.RegisterListener(outPort.Key,inPort.Receive))
