namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next

[<JavaScript>]
type IInPort =
    abstract Name:string 

[<JavaScript>]
type IOutPort =
    abstract Name:string 
    abstract IsCompatible : IInPort->bool
    abstract Connect : IInPort->unit

[<JavaScript>]
type IInPortNumber(name,callback) =
    let mutable Disconnector=(fun _ ->())
    interface IInPort with
        override x.Name = name
    member x.Callback = callback
    member x.RegisterDisconnector (disconnector:(unit->unit)) = Disconnector <- disconnector
    member x.Disconnect() = Disconnector()
                            Console.Log("Port "+ name + " disconnected")
                            Disconnector <- (fun _ ->())
[<JavaScript>]
type IOutPortNumber(name)=
    let event=new Event<double>()
    interface IOutPort with 
        override x.Name=name
        override x.IsCompatible port=port :? IInPortNumber
        override x.Connect port =  Console.Log("Port "+ name + " connect")
                                   let numPort = (port :?> IInPortNumber)
                                   numPort.Disconnect()
                                   let handler = Handler<double>(fun _ arg -> numPort.Callback(arg))
                                   event.Publish.AddHandler(handler)
                                   numPort.RegisterDisconnector (fun _ -> event.Publish.RemoveHandler(handler))
                                   //event.Publish.Add((port :?> IInPortNumber).Callback)
    member x.Trigger value=event.Trigger value

