namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid
open WebSharper.Community.Panel

[<JavaScript>]
type InPortData =  
    {
        Key:string
        Name:string
        Value:MessageBus.Message
        CacheSize:int
    }
    static member Create name value cacheSize= {Value=value;Key = value.Key;Name=name;CacheSize=cacheSize}
[<JavaScript;CustomEquality;NoComparison>]
type InPort =  {Data:InPortData;PortValue:Var<MessageBus.Message>}
                static member FromData (data:InPortData) = {Data=data;PortValue=Var.Create data.Value}
                static member ToData port= {port.Data with Value=port.PortValue.Value}
                override x.Equals y = match y with
                                      | :? InPort as yPort -> x.Data.Name = yPort.Data.Name
                                      | _ -> false
                static member Clone port = {
                                    port with 
                                        Data={port.Data with Key=System.Guid.NewGuid().ToString()}
                                        PortValue = Var.Create port.PortValue.Value
                                  }
                member x.Name = x.Data.Name
                member x.Key = x.Data.Key
                member x.Property = 
                        match x.PortValue.Value.Value with 
                        |MessageBus.Number(value) ->let var = Var.Create x.Number
                                                    var.View |> View.Sink (fun number -> x.PortValue.Value <- {x.PortValue.Value with Value = MessageBus.Number(number)})
                                                    Properties.double  x.Data.Name var
                        |MessageBus.String(value) ->let var = Var.Create x.String 
                                                    var.View |> View.Sink (fun number -> x.PortValue.Value <- {x.PortValue.Value with Value = MessageBus.String(number)})
                                                    Properties.string  x.Data.Name var
                        |MessageBus.Boolean(value) ->let var = Var.Create x.Boolean 
                                                     var.View |> View.Sink (fun number -> x.PortValue.Value <- {x.PortValue.Value with Value = MessageBus.Boolean(number)})
                                                     Properties.check  x.Data.Name var

               member x.Receive (value:MessageBus.Message) = x.PortValue.Value <- value; //.WithKey(x.Key)

               member x.Number = x.PortValue.Value.Value.AsNumber
               member x.NumberView = x.PortValue.View  |> View.Map (fun value -> value.Value.AsNumber ) 

               member x.String = x.PortValue.Value.Value.AsString 
               member x.StringView = x.PortValue.View  |> View.Map (fun value -> value.Value.AsString ) 

               member x.Boolean = x.PortValue.Value.Value.AsBoolean 
               member x.BooleanView = x.PortValue.View  |> View.Map (fun value -> value.Value.AsBoolean ) 


[<JavaScript;CustomEquality;NoComparison>]
type OutPort = 
           {Key:string;Name:string;Type:MessageBus.Message} 
           static member FromData (name,msg:MessageBus.Message) = {Key=msg.Key;Name = name;Type = msg}
           static member ToData port= (port.Name,port.Type)
           static member Clone (port:OutPort) = {port with Key=Helper.UniqueKey()}
           member x.Trigger value = MessageBus.Agent.Post (MessageBus.Send(MessageBus.CreateMessage x.Key value))

           override x.Equals y = match y with
                                 | :? OutPort as yPort -> x.Name = yPort.Name
                                 | _ -> false
               

            
