namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid

type EmptyVal = {Nothing:string} 

type NumberVal = {NumValue : Var<double>} 

type StringVal = {StrValue : Var<string>} 

type IPortValue =
|EmptyValue of EmptyVal
|NumberValue of NumberVal
|StringValue of StringVal


[<JavaScript>]type EmptyTrigger = {EmptyTrigger:string}

[<JavaScript>]
type NumberTrigger = 
 {
    NumberEvent:Event<double>
 }
 member x.Trigger value = x.NumberEvent.Trigger value

[<JavaScript>]
type ITrigger =
|EmptyTrigger of EmptyTrigger
|NumberTrigger of NumberTrigger


[<JavaScript;CustomEquality;NoComparison>]
type InPort =  {Name:string;Disconnector:(unit->unit);Disconnect:(unit->unit);OutPort:OutPort;Value:IPortValue;}
                override x.Equals y = match y with
                                      | :? InPort as yPort -> x.Name = yPort.Name
                                      | _ -> false
                member x.Clone = {
                                    x with 
                                        Value =
                                            match x.Value with 
                                            |EmptyValue(value)  -> EmptyValue(value)
                                            |NumberValue(value) -> NumberValue({NumValue=Var.Create value.NumValue.Value})
                                            |StringValue(value) -> StringValue({StrValue=Var.Create value.StrValue.Value})

                                  }
                member x.Property = 
                        match x.Value with 
                        |EmptyValue(value) -> Properties.group x.Name
                        |NumberValue(value) -> Properties.double  x.Name value.NumValue
                        |StringValue(value) -> Properties.string  x.Name value.StrValue
and
 [<JavaScript;CustomEquality;NoComparison>]
 OutPort = {Name:string;IsCompatible:(InPort->bool);Connect:InPort->(unit->unit);Trigger:ITrigger}
                override x.Equals y = match y with
                                      | :? OutPort as yPort -> x.Name = yPort.Name
                                      | _ -> false


[<JavaScript>]
type PortConnector = {Name:string;InPort:InPort;OutPort:OutPort;Disconnect:(unit->unit)}
                      static member Create  (oPort:OutPort) (iPort:InPort)= 
                                let disconnector=oPort.Connect iPort
                                {Name=(oPort.Name+"->"+iPort.Name);InPort = iPort;OutPort=oPort;Disconnect=disconnector}
[<JavaScript>]
module Ports = 

    let NumberVar (port:InPort) = match port.Value with |NumberValue(value) -> value.NumValue | _ -> failwith("unexpected type")

    let StringVar (port:InPort) = match port.Value with |StringValue(value) -> value.StrValue | _ -> failwith("unexpected type")

    let NumTrigger (port:OutPort) = match port.Trigger with|NumberTrigger(trigger) -> trigger.Trigger| _ -> failwith("unexpected type")

    let BaseOutPort name = {Name = name;IsCompatible=(fun _ -> false); Connect = (fun _ ->(fun _ ->()));Trigger = EmptyTrigger({EmptyTrigger=""})}

    let BaseInPort name =  let disconnector = (fun _ -> ())
                           {
                            Name = name;
                            Disconnector = disconnector;
                            Disconnect = (fun _ -> 
                                            disconnector()
                                            Console.Log("Port "+ name + " disconnected"))
                            OutPort = BaseOutPort "Empty"
                            Value = EmptyValue({Nothing =""})
                           }
    let InPortNum name defValue = {BaseInPort name with Value =  NumberValue({NumValue=Var.Create defValue }) }

    let InPortStr name defValue = {BaseInPort name with Value = StringValue({StrValue = Var.Create defValue}) }

    let OutPortNum(name) =
        let event=new Event<double>()
        {
            BaseOutPort name with 
                IsCompatible = (fun port -> match port.Value with
                                            |NumberValue(_)->true
                                            | _ ->false
                                            )
                Connect = (fun port -> 
                                   match port.Value with
                                   |NumberValue(numValue)->
                                       port.Disconnect()
                                       let handler = Handler<double>(fun _ arg -> numValue.NumValue.Value<-arg)
                                       event.Publish.AddHandler(handler)
                                       let disconnector = (fun _ -> event.Publish.RemoveHandler(handler))
                                       Console.Log("Port "+ name + " connected with "+port.Name)
                                       disconnector
                                   | _ -> failwith("Unexpected type")
                          ) 
                Trigger = NumberTrigger({NumberEvent = event})
        }                               
    let Clone (oPort:OutPort) =
        match oPort.Trigger with
        |NumberTrigger(trigger) -> OutPortNum oPort.Name
        | _ -> BaseOutPort oPort.Name

            
