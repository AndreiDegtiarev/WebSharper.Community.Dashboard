namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid

type EmptyVal = {Nothing:string} 

type NumberVal = {NumValue : Var<double>} 

type StringVal = {StrValue : Var<string>} 

type PortValue =
|EmptyPortValue of EmptyVal
|NumberPortValue of NumberVal
|StringPortValue of StringVal


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

[<JavaScript>]
type NumberValue =
 {
    Key:string
    NumberValue:double
 }
 static member Create value= {Key=System.Guid.NewGuid().ToString();NumberValue=value}
[<JavaScript>]
type StringValue =
 {
    Key:string
    StringValue:string
 }
 static member Create value= {Key=System.Guid.NewGuid().ToString();StringValue=value}

[<JavaScript;CustomEquality;NoComparison>]
type InPort =  {Key:string;Name:string;Disconnector:(unit->unit);Disconnect:(unit->unit);OutPort:OutPort;PortValue:PortValue;}
                override x.Equals y = match y with
                                      | :? InPort as yPort -> x.Name = yPort.Name
                                      | _ -> false
                member x.Clone = {
                                    x with 
                                        Key=System.Guid.NewGuid().ToString()
                                        PortValue =
                                            match x.PortValue with 
                                            |EmptyPortValue(value)  -> EmptyPortValue(value)
                                            |NumberPortValue(value) -> NumberPortValue({NumValue=Var.Create value.NumValue.Value})
                                            |StringPortValue(value) -> StringPortValue({StrValue=Var.Create value.StrValue.Value})

                                  }
                member x.Property = 
                        match x.PortValue with 
                        |EmptyPortValue(value) -> Properties.group x.Name
                        |NumberPortValue(value) -> Properties.double  x.Name value.NumValue
                        |StringPortValue(value) -> Properties.string  x.Name value.StrValue
               member x.ExtractPortNumberValue fnc= match x.PortValue with |NumberPortValue(value) -> fnc(value.NumValue) | _ -> failwith("unexpected type")
               member x.Number = x.ExtractPortNumberValue (fun variable -> variable.Value)
               member x.NumberVar = x.ExtractPortNumberValue (fun variable -> variable)
               member x.NumberValue = x.ExtractPortNumberValue (fun variable -> {Key=x.Key;NumberValue=variable.Value})
               member x.ExtractPortStringValue fnc= match x.PortValue with |StringPortValue(value) -> fnc(value.StrValue) | _ -> failwith("unexpected type")
               member x.String = x.ExtractPortStringValue (fun variable -> variable.Value)
               member x.StringVar = x.ExtractPortStringValue (fun variable -> variable)
               member x.StringValue = x.ExtractPortStringValue (fun variable -> {Key=x.Key;StringValue=variable.Value})
and
 [<JavaScript;CustomEquality;NoComparison>]
 OutPort = {Key:string;Name:string;IsCompatible:(InPort->bool);Connect:InPort->(unit->unit);Trigger:ITrigger}
                override x.Equals y = match y with
                                      | :? OutPort as yPort -> x.Name = yPort.Name
                                      | _ -> false

[<JavaScript>]
type PortConnectorData = {OutPortKey:string;InPortKey:string}
[<JavaScript>]
type PortConnector = {Name:string;InPort:InPort;OutPort:OutPort;Disconnect:(unit->unit)}
                      static member Create  (oPort:OutPort) (iPort:InPort)= 
                                let disconnector=oPort.Connect iPort
                                {Name=(oPort.Name+"->"+iPort.Name);InPort = iPort;OutPort=oPort;Disconnect=disconnector}
                      member x.Data={OutPortKey=x.OutPort.Key;InPortKey=x.InPort.Key}

 
[<JavaScript>]
module Ports = 

    let NumTrigger (port:OutPort) = match port.Trigger with|NumberTrigger(trigger) -> trigger.Trigger| _ -> failwith("unexpected type")

    let BaseOutPort key name = {Key=key;Name = name;IsCompatible=(fun _ -> false); Connect = (fun _ ->(fun _ ->()));Trigger = EmptyTrigger({EmptyTrigger=""})}

    let BaseInPort key name =  
                           let disconnector = (fun _ -> ())
                           {
                            Key = key
                            Name = name;
                            Disconnector = disconnector;
                            Disconnect = (fun _ -> 
                                            disconnector()
                                            Console.Log("Port "+ name + " disconnected"))
                            OutPort = BaseOutPort "" "Empty"
                            PortValue = EmptyPortValue({Nothing =""})
                           }
    let InPortNum name (defValue:NumberValue) = {BaseInPort defValue.Key name with PortValue =  NumberPortValue({NumValue=Var.Create defValue.NumberValue }) }

    let InPortStr name (defValue:StringValue) = {BaseInPort defValue.Key name with PortValue = StringPortValue({StrValue = Var.Create defValue.StringValue}) }

    let OutPortNum key name =
        let event=new Event<double>()
        {
            BaseOutPort key name with 
                IsCompatible = (fun port -> match port.PortValue with
                                            |NumberPortValue(_)->true
                                            | _ ->false
                                            )
                Connect = (fun port -> 
                                   match port.PortValue with
                                   |NumberPortValue(numValue)->
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
        let key=System.Guid.NewGuid().ToString()
        match oPort.Trigger with
        |NumberTrigger(trigger) -> OutPortNum key oPort.Name
        | _ -> BaseOutPort key oPort.Name

            
