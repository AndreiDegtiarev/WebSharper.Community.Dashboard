namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next

[<JavaScript>]
type IInPort(name) =
    let mutable Disconnector=(fun _ ->())
    let mutable _outPort:IOutPort=IOutPort("No connection")
    member x.Name:string = name
    member x.OutPort = _outPort
    member x.RegisterDisconnector outPort (disconnector:(unit->unit)) = 
                                            _outPort <- outPort
                                            Disconnector <- disconnector
    member x.Disconnect() = Disconnector()
                            Console.Log("Port "+ name + " disconnected")
                            Disconnector <- (fun _ ->())

and [<JavaScript>] IOutPort(name) =
    member x.Name:string=name
    abstract member IsCompatible : IInPort->bool
    abstract member Connect : IInPort->unit
    default x.IsCompatible port = false
    default x.Connect port = ()
[<JavaScript>]
type IInPortNumber(name,callback) =
    inherit IInPort(name)
    member x.Callback = callback

[<JavaScript>]
type IOutPortNumber(name)=
    inherit IOutPort(name)
    let event=new Event<double>()
    override x.IsCompatible port=port :? IInPortNumber
    override x.Connect port =  Console.Log("Port "+ name + " connect")
                               let numPort = (port :?> IInPortNumber)
                               numPort.Disconnect()
                               let handler = Handler<double>(fun _ arg -> numPort.Callback(arg))
                               event.Publish.AddHandler(handler)
                               numPort.RegisterDisconnector x (fun _ -> event.Publish.RemoveHandler(handler))
                               //event.Publish.Add((port :?> IInPortNumber).Callback)
    member x.Trigger value=event.Trigger value

