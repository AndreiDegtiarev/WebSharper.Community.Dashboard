namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next


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
type DshData =
    {
        WorkItems : ListModel<Key,WorkerItem>
        WidgetItems : ListModel<Key,WorkerItem>
        EventItems : ListModel<Key,WorkerItem>
        PortConnectorItems : ListModel<Key,PortConnectorItem>
    }
    static member Create =
        {
            WorkItems = ListModel.Create (fun item ->item.Key) []
            WidgetItems = ListModel.Create (fun item ->item.Key) []
            EventItems = ListModel.Create (fun item ->item.Key) []
            PortConnectorItems = ListModel.Create (fun item ->item.Key) []
        }
    member x.RegisterEvent event = 
        let item = WorkerItem.Create event
        x.EventItems.Add item
        x.WorkItems.Add item
    member x.RegisterWidget widget = 
        let item = WorkerItem.Create widget
        x.WidgetItems.Add item
        x.WorkItems.Add item
    member x.ConnectPorts outPort inPort = 
        let connnector = PortConnector(outPort,inPort)
        x. PortConnectorItems.Add (PortConnectorItem.Create connnector)
