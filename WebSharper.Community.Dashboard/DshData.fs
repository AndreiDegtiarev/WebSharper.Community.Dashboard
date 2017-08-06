namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Storage


[<JavaScript>]
type PortConnectorItem =
    {
        Key:Key
        PortConnector : PortConnector
    }
    static member Create  connector=
        {
            Key=Key.Fresh()
            PortConnector = connector
        }
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
        PortConnectorItems : ListModel<Key,PortConnectorItem>
    }
    static member Create =
        {
            WorkItems = ListModel.Create (fun item ->item.Key) []
            WidgetItems = ListModel.Create (fun item ->item.Key) []
            EventItems = ListModel.Create (fun item ->item.Key) []
            //EventItems = ListModel.CreateWithStorage (fun item ->item.Key) (LocalStorage "local-storage" Serializer.Default<WorkerItem>)
            PortConnectorItems = ListModel.Create (fun item ->item.Key) []
        }
    member x.RegisterEvent event = 
        let item = WorkerItem.Create event
        x.EventItems.Add item
        x.WorkItems.Add item
    member x.RegisterWidget panel widget = 
        let item = WidgetItem.Create panel widget
        x.WidgetItems.Add item
        x.WorkItems.Add (WorkerItem.Create widget)
    member x.ConnectPorts (outPort:OutPort) (inPort:InPort) = 
        Console.Log("Connect ports:"+outPort.Name+" "+inPort.Name)
        let connnector = PortConnector.Create outPort inPort 
        x. PortConnectorItems.Add (PortConnectorItem.Create connnector)
