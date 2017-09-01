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
[<JavaScript>]
type InPort =  {Data:InPortData;PortValue:Var<MessageBus.Message>}
                static member FromData (data:InPortData) = {Data=data;PortValue=Var.Create data.Value}
                static member ToData port= {port.Data with Value=port.PortValue.Value}
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
                                                    var.View |> View.Sink (fun entry -> x.PortValue.Value <- {x.PortValue.Value with Value = MessageBus.Number(entry)})
                                                    Properties.double  x.Data.Name var
                        |MessageBus.String(value) ->let var = Var.Create x.String 
                                                    var.View |> View.Sink (fun entry -> x.PortValue.Value <- {x.PortValue.Value with Value = MessageBus.String(entry)})
                                                    Properties.string  x.Data.Name var
                        |MessageBus.Boolean(value) ->let var = Var.Create x.Boolean 
                                                     var.View |> View.Sink (fun entry -> x.PortValue.Value <- {x.PortValue.Value with Value = MessageBus.Boolean(entry)})
                                                     Properties.check  x.Data.Name var
                        |MessageBus.Select(ind,sel_list) ->
                                                    let var = Var.Create sel_list.[ind]
                                                    var.View |> View.Sink (fun entry -> x.PortValue.Value <- {x.PortValue.Value with Value = MessageBus.Select((sel_list |> List.findIndex (fun str -> str = entry),sel_list))})
                                                    Properties.select x.Data.Name (fun str -> str) sel_list var

               member x.Receive (value:MessageBus.Message) = x.PortValue.Value <- value; //.WithKey(x.Key)

               member x.Number = x.PortValue.Value.Value.AsNumber
               member x.NumberView = x.PortValue.View  |> View.Map (fun value -> value.Value.AsNumber ) 

               member x.String = x.PortValue.Value.Value.AsString 
               member x.StringView = x.PortValue.View  |> View.Map (fun value -> value.Value.AsString ) 

               member x.Boolean = x.PortValue.Value.Value.AsBoolean 
               member x.BooleanView = x.PortValue.View  |> View.Map (fun value -> value.Value.AsBoolean ) 

               member x.Select = x.PortValue.Value.Value.AsSelect 
               member x.SelectView = x.PortValue.View  |> View.Map (fun value -> value.Value.AsSelect ) 
[<JavaScript>]
type OutPort = 
           {Key:string;Name:string} 
           static member Create name = {Key=Helper.UniqueKey();Name=name} 
           static member Clone (port:OutPort) = {port with Key=Helper.UniqueKey()}
           member x.Trigger value = MessageBus.Agent.Post (MessageBus.Send(MessageBus.CreateMessage x.Key value))


            
