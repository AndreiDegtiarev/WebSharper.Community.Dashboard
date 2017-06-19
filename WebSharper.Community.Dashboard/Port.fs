namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript

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
    interface IInPort with
        override x.Name = name
    member x.Callback = callback
[<JavaScript>]
type IOutPortNumber(name)=
    let event=new Event<double>()
    interface IOutPort with 
        override x.Name=name
        override x.IsCompatible port=port :? IInPortNumber
        override x.Connect port = event.Publish.Add((port :?> IInPortNumber).Callback)
    member x.Trigger value=event.Trigger value

