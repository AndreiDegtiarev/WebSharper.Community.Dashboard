namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid

[<JavaScript>]
type InPort(name) =
    inherit DshBase(name)
    let mutable Disconnector=(fun _ ->())
    let mutable _outPort:OutPort=OutPort("No connection")
    member x.OutPort = _outPort
    member x.RegisterDisconnector outPort (disconnector:(unit->unit)) = 
                                            _outPort <- outPort
                                            Disconnector <- disconnector
    member x.Disconnect() = Disconnector()
                            Console.Log("Port "+ name + " disconnected")
                            Disconnector <- (fun _ ->())
    abstract member Property : IProperty  
    default x.Property = Properties.group "empty"
and [<JavaScript>] OutPort(name) =
    inherit DshBase(name)
    abstract member IsCompatible : InPort->bool
    abstract member Connect : InPort->(unit->unit)
    default x.IsCompatible port = false
    default x.Connect port = (fun _ -> ())
[<JavaScript>]
type InPortNum(name,defValue:double) =
    inherit InPort(name)
    let value=Var.Create defValue
    member x.Value = value
    override x.Property = Properties.double name value
[<JavaScript>]
type InPortStr(name,defStr:string) =
    inherit InPort(name)
    let value=Var.Create defStr
    member x.Value = value
    override x.Property = Properties.string name value
[<JavaScript>]
type OutPortNum(name)=
    inherit OutPort(name)
    let event=new Event<double>()
    override x.IsCompatible port=port :? InPortNum
    override x.Connect port =  Console.Log("Port "+ name + " connect")
                               let numPort = (port :?> InPortNum)
                               numPort.Disconnect()
                               let handler = Handler<double>(fun _ arg -> numPort.Value.Value<-arg)
                               event.Publish.AddHandler(handler)
                               let disconnector = (fun _ -> event.Publish.RemoveHandler(handler))
                               disconnector
                               //numPort.RegisterDisconnector x (fun _ -> event.Publish.RemoveHandler(handler))
                               //event.Publish.Add((port :?> IInPortNumber).Callback)
                               
    member x.Trigger value=event.Trigger value


[<JavaScript>]
type PortConnector(outPort:OutPort,inPort:InPort)=
    inherit DshBase(outPort.Name+"->"+inPort.Name)
    let disconnector=outPort.Connect inPort
    member x.Disconnect() = disconnector()
