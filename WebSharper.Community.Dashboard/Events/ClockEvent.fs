namespace WebSharper.Community.Dashboard.Events

open System
open WebSharper
open WebSharper.Community.Dashboard


[<JavaScript>]
type ClockEvent =
 {
    ClockEventData:WorkerData
 }
 static member Create  = {
                           ClockEventData =  WorkerData.Create "Clock" 
                                                                    [("Format",MessageBus.SelectMessage ((0,["long time";"short time";"long date";"short date"])))
                                                                     ("Delay sec.",MessageBus.NumberMessage 1.0)]
                                                                    [OutPort.Create "Date Time"]
                          }
 static member FromWorker = (fun (worker:Worker) -> { ClockEventData = worker.ToData})
 interface IWorkerData with
    override x.Data = x.ClockEventData
    override x.Run = Some(fun worker -> 
                              async {
                                  while true do
                                      let (sel,_) = worker.InPorts.[0].PortValue.Value.Value.AsSelect
                                      let time = DateTime.Now
                                      let strTime = 
                                          match sel with
                                          |0 -> time.ToLongTimeString()
                                          |1 -> time.ToShortTimeString()
                                          |2 -> time.ToLongDateString()
                                          |3 -> time.ToShortDateString()
                                          |_ -> ""
                                      worker.OutPorts.[0].Trigger (MessageBus.String(strTime))
                                      do! Async.Sleep ((int)(worker.InPorts.[1].Number * 1000.0))
                                      sprintf "Time value generated %s" strTime |> Environment.Log
                              }|> Async.Start 
                              None)
    override x.Render = None

