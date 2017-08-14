namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid
open WebSharper.Community.Panel


type PortValue =
|NumberPortValue of (Var<MessageBus.Message>*Var<double>)
|StringPortValue of (Var<MessageBus.Message>*Var<string>)
|BooleanPortValue of (Var<MessageBus.Message>*Var<bool>)


[<JavaScript;CustomEquality;NoComparison>]
type InPort =  {Key:string;Name:string;PortValue:PortValue;CacheSize:int}
                static member Create  key name portValue cacheSize = {Key = key;Name = name;PortValue=portValue;CacheSize = cacheSize}
                override x.Equals y = match y with
                                      | :? InPort as yPort -> x.Name = yPort.Name
                                      | _ -> false
                member x.Clone = {
                                    x with 
                                        Key=System.Guid.NewGuid().ToString()
                                        PortValue =
                                            match x.PortValue with 
                                            |NumberPortValue(pair,value) -> NumberPortValue(Var.Create pair.Value,Var.Create value.Value)
                                            |StringPortValue(pair,value) -> StringPortValue(Var.Create pair.Value,Var.Create value.Value)
                                            |BooleanPortValue(pair,value) ->BooleanPortValue(Var.Create pair.Value,Var.Create value.Value)

                                  }
                member x.Property = 
                        match x.PortValue with 
                        |NumberPortValue(_,value) -> Properties.double  x.Name value
                        |StringPortValue(_,value) -> Properties.string  x.Name value
                        |BooleanPortValue(_,value) -> Properties.check  x.Name value
                member x.KeyValueVar = 
                        match x.PortValue with 
                        |NumberPortValue(keyVal,_) -> keyVal
                        |StringPortValue(keyVal,_) -> keyVal
                        |BooleanPortValue(keyVal,_) -> keyVal
               member x.Receive (value:MessageBus.Message) = 
                                        match x.PortValue with 
                                        |NumberPortValue(_,variable) -> match value.Value with MessageBus.Number(dblValue) -> variable.Value <- dblValue | _ -> failwith("incompatible types")
                                        |StringPortValue(_,variable) -> match value.Value with MessageBus.String(strValue) -> variable.Value <- strValue | _ -> failwith("incompatible types")
                                        |BooleanPortValue(_,variable) -> match value.Value with MessageBus.Boolean(boolValue) -> variable.Value <- boolValue | _ -> failwith("incompatible types")
               member x.ExtractPortNumberValue fnc= match x.PortValue with |NumberPortValue(_,value) -> fnc(value) | _ -> failwith("unexpected type")
               member x.Number = x.ExtractPortNumberValue (fun variable -> variable.Value)
               member x.NumberVar = x.ExtractPortNumberValue (fun variable -> variable)
               member x.NumberValue = x.ExtractPortNumberValue (fun variable -> MessageBus.CreateNumPair x.Key (variable.Value))

               member x.ExtractPortStringValue fnc= match x.PortValue with |StringPortValue(_,value) -> fnc(value) | _ -> failwith("unexpected type")
               member x.String = x.ExtractPortStringValue (fun variable -> variable.Value)
               member x.StringVar = x.ExtractPortStringValue (fun variable -> variable)
               member x.StringValue = x.ExtractPortStringValue (fun variable ->  MessageBus.CreateStrPair x.Key (variable.Value))

               member x.ExtractPortBooleanValue fnc= match x.PortValue with |BooleanPortValue(_,value) -> fnc(value) | _ -> failwith("unexpected type")
               member x.Boolean = x.ExtractPortBooleanValue (fun variable -> variable.Value)
               member x.BooleanVar = x.ExtractPortBooleanValue (fun variable -> variable)
               member x.BooleanValue = x.ExtractPortBooleanValue (fun variable ->  MessageBus.CreateBooleanPair x.Key (variable.Value))
and
 [<JavaScript>]
 OutPortType =
 |NumberOutPort
 |StringOutPort
 |BooleanOutPort
 member x.IsCompatible inPort =
    match x with
    |NumberOutPort -> match inPort.PortValue with |NumberPortValue(_)->true | _ ->false
    |StringOutPort -> match inPort.PortValue with |StringPortValue(_)->true | _ ->false
    |BooleanOutPort -> match inPort.PortValue with |BooleanPortValue(_)->true | _ ->false
    
and
 [<JavaScript;CustomEquality;NoComparison>]
 OutPort = {Key:string;Name:string;Type:OutPortType} //;Connect:InPort->(unit->unit)}
           static member Create key name portType = {Key=key;Name = name;Type = portType}
           static member CreateNumber key name = OutPort.Create key name NumberOutPort
           static member CreateString key name = OutPort.Create key name StringOutPort
           member x.Clone = {x with Key=Helper.UniqueKey()}
           member x.Trigger value = MessageBus.Agent.Post (MessageBus.Send(MessageBus.CreateKeyValue x.Key value))
           member x.TriggerWithKey value = MessageBus.Agent.Post (MessageBus.Send(value))
           override x.Equals y = match y with
                                 | :? OutPort as yPort -> x.Name = yPort.Name
                                 | _ -> false
[<JavaScript>]
module Ports = 
    let CreateWithCache (info:(string*MessageBus.Message*int) list)= 
                        info
                        |> List.map (fun  (name,pair:MessageBus.Message,cacheSize) ->
                            match pair.Value with
                            |MessageBus.Number(value) -> InPort.Create pair.Key name (NumberPortValue(Var.Create (MessageBus.Message.Create (MessageBus.Number(value))),Var.Create value)) cacheSize
                            |MessageBus.String(value) -> InPort.Create pair.Key name (StringPortValue(Var.Create (MessageBus.Message.Create (MessageBus.String(value))),Var.Create value)) cacheSize
                            |MessageBus.Boolean(value) -> InPort.Create pair.Key name (BooleanPortValue(Var.Create (MessageBus.Message.Create (MessageBus.Boolean(value))),Var.Create value)) cacheSize
                        )
    let Create info = CreateWithCache (info |> List.map (fun (name,value) -> (name,value,1)))                     

            
