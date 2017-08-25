namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid
open WebSharper.Community.Panel


[<JavaScript;CustomEquality;NoComparison>]
type InPort =  {Key:string;Name:string;PortValue:Var<MessageBus.Message>;CacheSize:int}
                static member Create  key name portValue cacheSize = {Key = key;Name = name;PortValue=portValue;CacheSize = cacheSize}
                override x.Equals y = match y with
                                      | :? InPort as yPort -> x.Name = yPort.Name
                                      | _ -> false
                member x.Clone = {
                                    x with 
                                        Key=System.Guid.NewGuid().ToString()
                                        PortValue = Var.Create x.PortValue.Value
                                  }
                member x.Property = 
                        match x.PortValue.Value.Value with 
                        |MessageBus.Number(value) ->let var = Var.Create x.Number
                                                    var.View |> View.Sink (fun number -> x.PortValue.Value <- {x.PortValue.Value with Value = MessageBus.Number(number)})
                                                    Properties.double  x.Name var
                        |MessageBus.String(value) ->let var = Var.Create x.String 
                                                    var.View |> View.Sink (fun number -> x.PortValue.Value <- {x.PortValue.Value with Value = MessageBus.String(number)})
                                                    Properties.string  x.Name var
                        |MessageBus.Boolean(value) ->let var = Var.Create x.Boolean 
                                                     var.View |> View.Sink (fun number -> x.PortValue.Value <- {x.PortValue.Value with Value = MessageBus.Boolean(number)})
                                                     Properties.check  x.Name var

               member x.Receive (value:MessageBus.Message) = x.PortValue.Value <- value.WithKey(x.Key)

               member x.Number = x.PortValue.Value.Value.AsNumber
               member x.NumberView = x.PortValue.View  |> View.Map (fun value -> value.Value.AsNumber ) 

               member x.String = x.PortValue.Value.Value.AsString 
               member x.StringView = x.PortValue.View  |> View.Map (fun value -> value.Value.AsString ) 

               member x.Boolean = x.PortValue.Value.Value.AsBoolean 
               member x.BooleanView = x.PortValue.View  |> View.Map (fun value -> value.Value.AsBoolean ) 
and
 [<JavaScript>]
 OutPortType =
 |NumberOutPort
 |StringOutPort
 |BooleanOutPort
 member x.IsCompatible inPort =
    match x with
    |NumberOutPort -> match inPort.PortValue.Value.Value with |MessageBus.Number(_)->true | _ ->false
    |StringOutPort -> match inPort.PortValue.Value.Value with |MessageBus.String(_)->true | _ ->false
    |BooleanOutPort ->match inPort.PortValue.Value.Value with |MessageBus.Boolean(_)->true | _ ->false
    
and
 [<JavaScript;CustomEquality;NoComparison>]
 OutPort = {Key:string;Name:string;Type:OutPortType} 
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
                            |MessageBus.Number(value) -> InPort.Create pair.Key name (Var.Create (MessageBus.Message.Create (MessageBus.Number(value)))) cacheSize
                            |MessageBus.String(value) -> InPort.Create pair.Key name (Var.Create (MessageBus.Message.Create (MessageBus.String(value)))) cacheSize
                            |MessageBus.Boolean(value) ->InPort.Create pair.Key name (Var.Create (MessageBus.Message.Create (MessageBus.Boolean(value)))) cacheSize
                        )
    let Create info = CreateWithCache (info |> List.map (fun (name,value) -> (name,value,1)))                     

            
