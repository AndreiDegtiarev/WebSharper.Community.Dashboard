namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Storage
open WebSharper.Community.Panel


//[<JavaScript>]
//type PortConnectorItem =
//    {
//        Key:Key
//        PortConnector : PortConnector
//    }
//    static member Create  connector=
//        {
//            Key=Key.Fresh()
//            PortConnector = connector
//        }
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
 //       PortConnectorItems : ListModel<Key,PortConnectorItem>
    }
    static member Create =
        {
            WorkItems = ListModel.Create (fun item ->item.Key) []
            WidgetItems = ListModel.Create (fun item ->item.Key) []
            EventItems = ListModel.Create (fun item ->item.Key) []
            //EventItems = ListModel.CreateWithStorage (fun item ->item.Key) (LocalStorage "local-storage" Serializer.Default<WorkerItem>)
 //           PortConnectorItems = ListModel.Create (fun item ->item.Key) []
        }
    member x.Clear = 
        x.WorkItems.Clear()
        x.WidgetItems.Clear()
        x.EventItems.Clear()
//        x.PortConnectorItems.Clear()
    member x.RegisterEvent key (event:Worker) = 
        let item = WorkerItem.Create (event.WithKey(key))
        x.EventItems.Add item
        x.WorkItems.Add item
    member x.RegisterWidget key panel (widget:Worker) = 
        let widget_key = widget.WithKey(key)
        let item = WidgetItem.Create panel (widget_key)
        x.WidgetItems.Add item
        x.WorkItems.Add (WorkerItem.Create widget_key)
    member x.ConnectPorts (outPort:OutPort) (inPort:InPort) = 
        Console.Log("Connect ports:"+outPort.Name+" "+inPort.Name)
//        let connnector = PortConnector.Create outPort inPort 
//        x.PortConnectorItems.Add (PortConnectorItem.Create connnector)
        MessageBus.Agent.Post (MessageBus.RegisterListener(outPort.Key,inPort.Receive))
