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
                                                                    [("Middle value",MessageBus.NumberMessage 100.0)
                                                                     ("Dispersion",MessageBus.NumberMessage 10.0)
                                                                     ("Delay sec.",MessageBus.NumberMessage 2.0)]
                                                                    [("Random value",MessageBus.NumberMessage 0.0)]
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

 
 
