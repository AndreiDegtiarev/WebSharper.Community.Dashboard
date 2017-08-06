namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid


[<JavaScript>]
type RandomRunner =
 {
        MiddleValue:NumberValue
        Dispersion:NumberValue
        OutPortKey:string
 }
 static member Create middleValue dispersion = {
                                                MiddleValue=NumberValue.Create middleValue;
                                                Dispersion=NumberValue.Create dispersion
                                                OutPortKey=System.Guid.NewGuid().ToString()
                                               }
 static member FromPorts = (fun worker -> {
                                             MiddleValue=worker.InPorts.[0].NumberValue 
                                             Dispersion=worker.InPorts.[1].NumberValue
                                             OutPortKey=worker.OutPorts.[0].Key
                                          })
 interface IWorkerContext with
    override x.Name = "Rundom"
    override x.InPorts =  [Ports.InPortNum "Middle value" x.MiddleValue;Ports.InPortNum "Dispersion" x.Dispersion]
    override x.OutPorts = [Ports.OutPortNum x.OutPortKey "Random value"]
 interface IRunner with
        override x.Run= (fun worker -> 
                                    let rnd = System.Random()
                                    async {
                                        while true do
                                            do! Async.Sleep 600
                                            let disper = worker.InPorts.[1].Number
                                            let middle = worker.InPorts.[0].Number
                                            let d = rnd.NextDouble() * disper + middle
                                            Ports.NumTrigger (worker.OutPorts.[0]) d
                                    }|> Async.Start 
                                    None
                         )
        
       
