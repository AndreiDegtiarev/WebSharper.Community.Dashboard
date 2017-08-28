namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid
open WebSharper.Community.Panel


[<JavaScript>]
type RandomRunner =
 {
    RandomRunnerData:WorkerData
 }
 static member Create  = {
                           RandomRunnerData =  WorkerData.Create "Random" 
                                                                    [("Middle value",MessageBus.NumberMessage 100.0)
                                                                     ("Dispersion",MessageBus.NumberMessage 10.0)
                                                                     ("Delay sec.",MessageBus.NumberMessage 2.0)]
                                                                    [("Random value",MessageBus.NumberMessage 0.0)]
                          }
 static member FromWorker = (fun (worker:Worker) -> { RandomRunnerData = worker.ToData})
 interface IWorkerContext with
    override x.Data = x.RandomRunnerData
 interface IRunner with
        override x.Run= (fun worker -> 
                                    let rnd = System.Random()
                                    async {
                                        while true do
                                            do! Async.Sleep ((int)(worker.InPorts.[2].Number * 1000.0))
                                            let middle = worker.InPorts.[0].Number
                                            let disper = worker.InPorts.[1].Number
                                            let d = rnd.NextDouble() * disper + middle
                                            worker.OutPorts.[0].Trigger (MessageBus.Number(d))
                                            //MessageBus.Log("Random value generated")
                                    }|> Async.Start 
                                    None
                         )
        
       
