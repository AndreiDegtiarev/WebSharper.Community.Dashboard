namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid
open WebSharper.Community.Panel


type PortValue =
|NumberPortValue of Var<double>
|StringPortValue of Var<string>


[<JavaScript;CustomEquality;NoComparison>]
type InPort =  {Key:string;Name:string;PortValue:PortValue}
                static member Create  key name portValue = {Key = key;Name = name;PortValue=portValue}
                override x.Equals y = match y with
                                      | :? InPort as yPort -> x.Name = yPort.Name
                                      | _ -> false
                member x.Clone = {
                                    x with 
                                        Key=System.Guid.NewGuid().ToString()
                                        PortValue =
                                            match x.PortValue with 
                                            |NumberPortValue(value) -> NumberPortValue(Var.Create value.Value)
                                            |StringPortValue(value) -> StringPortValue(Var.Create value.Value)

                                  }
                member x.Property = 
                        match x.PortValue with 
                        |NumberPortValue(value) -> Properties.double  x.Name value
                        |StringPortValue(value) -> Properties.string  x.Name value
               member x.Receive value = match x.PortValue with 
                                        |NumberPortValue(variable) -> match value with MessageBus.Number(dblValue) -> variable.Value <- dblValue | _ -> failwith("incompatible types")
                                        |StringPortValue(variable) -> match value with MessageBus.String(strValue) -> variable.Value <- strValue | _ -> failwith("incompatible types")
               member x.ExtractPortNumberValue fnc= match x.PortValue with |NumberPortValue(value) -> fnc(value) | _ -> failwith("unexpected type")
               member x.Number = x.ExtractPortNumberValue (fun variable -> variable.Value)
               member x.NumberVar = x.ExtractPortNumberValue (fun variable -> variable)
               member x.NumberValue = x.ExtractPortNumberValue (fun variable -> MessageBus.CreateNumPair x.Key (variable.Value))
               member x.ExtractPortStringValue fnc= match x.PortValue with |StringPortValue(value) -> fnc(value) | _ -> failwith("unexpected type")
               member x.String = x.ExtractPortStringValue (fun variable -> variable.Value)
               member x.StringVar = x.ExtractPortStringValue (fun variable -> variable)
               member x.StringValue = x.ExtractPortStringValue (fun variable ->  MessageBus.CreateStrPair x.Key (variable.Value))
and
 [<JavaScript>]
 OutPortType =
 |NumberOutPort
 |StringOutPort
 member x.IsCompatible inPort =
    match x with
    |NumberOutPort -> match inPort.PortValue with |NumberPortValue(_)->true | _ ->false
    |StringOutPort -> match inPort.PortValue with |StringPortValue(_)->true | _ ->false
    
and
 [<JavaScript;CustomEquality;NoComparison>]
 OutPort = {Key:string;Name:string;Type:OutPortType} //;Connect:InPort->(unit->unit)}
           static member Create key name portType = {Key=key;Name = name;Type = portType}
           static member CreateNumber key name = OutPort.Create key name NumberOutPort
           static member CreateString key name = OutPort.Create key name StringOutPort
           member x.Clone = {x with Key=Helper.UniqueKey()}
           member x.Trigger value = MessageBus.Agent.Post (MessageBus.Send(MessageBus.CreateKeyValue x.Key value))
           override x.Equals y = match y with
                                 | :? OutPort as yPort -> x.Name = yPort.Name
                                 | _ -> false
[<JavaScript>]
module Ports = 
    let Create (info:(string*MessageBus.KeyValue) list) = 
                        info
                        |> List.map (fun  (name,pair:MessageBus.KeyValue) ->
                            match pair.Value with
                            |MessageBus.Number(value) -> InPort.Create pair.Key name (NumberPortValue(Var.Create value))
                            |MessageBus.String(value) -> InPort.Create pair.Key name (StringPortValue(Var.Create value))
                        )
                          

            
