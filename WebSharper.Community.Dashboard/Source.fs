namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid


[<JavaScript>]
type RandomRunner =
 {
        Name:string
        MiddleValue:MessageBus.KeyValue
        Dispersion:MessageBus.KeyValue
        OutPortKey:string
 }
 member x.WithMiddleValue(value) = {x with MiddleValue = MessageBus.CreateNumber value}
 static member Create middleValue dispersion = {
                                                Name = "Random"
                                                MiddleValue=MessageBus.CreateNumber middleValue
                                                Dispersion=MessageBus.CreateNumber dispersion
                                                OutPortKey=System.Guid.NewGuid().ToString()
                                               }
 static member FromPorts = (fun worker -> {
                                             MiddleValue=worker.InPorts.[0].NumberValue 
                                             Dispersion=worker.InPorts.[1].NumberValue
                                             OutPortKey=worker.OutPorts.[0].Key
                                             Name = worker.Name.Value
                                          })
 interface IWorkerContext with
    override x.Name = x.Name
    override x.InPorts =  [("Middle value",x.MiddleValue);("Dispersion",x.Dispersion)] |> Ports.Create 
    override x.OutPorts = [OutPort.CreateNumber x.OutPortKey "Random value"]
 interface IRunner with
        override x.Run= (fun worker -> 
                                    let rnd = System.Random()
                                    async {
                                        while true do
                                            do! Async.Sleep 600
                                            let disper = worker.InPorts.[1].Number
                                            let middle = worker.InPorts.[0].Number
                                            let d = rnd.NextDouble() * disper + middle
                                            worker.OutPorts.[0].Trigger (MessageBus.Number(d))
                                            //Console.Log("Value generated")
                                    }|> Async.Start 
                                    None
                         )
        
       
