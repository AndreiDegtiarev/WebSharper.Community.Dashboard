namespace WebSharper.Community.Dashboard.Events

open WebSharper
open WebSharper.Community.Dashboard


[<JavaScript>]
type RandomEvent =
 {
    RandomEventData:WorkerData
 }
 static member Create  = {
                           RandomEventData =  WorkerData.Create "Random" 
                                                                    [InPortData.CreateNumber "Middle value" 100.0
                                                                     InPortData.CreateNumber "Dispersion" 10.0
                                                                     InPortData.CreateNumber "Delay sec." 2.0]
                                                                    [OutPort.Create "Random value"]
                          }
 static member FromWorker = (fun (worker:Worker) -> { RandomEventData = worker.ToData})
 interface IWorkerData with
    override x.Data = x.RandomEventData
    override x.Run = Some(fun worker -> 
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
                              None)
    override x.Render = None

 
 
