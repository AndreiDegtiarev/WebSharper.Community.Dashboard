namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid


[<JavaScript>]
type RandomRunner =
 {
        MiddleValue:double
        Dispersion:double
 }
 static member Create middleValue dispersion = {MiddleValue=middleValue;Dispersion=dispersion}
 interface IRunner with
        override x.Run= (fun worker -> 
                                    let rnd = System.Random()
                                    async {
                                        while true do
                                            do! Async.Sleep 600
                                            let disper = Ports.NumberVar worker.InPorts.[1]
                                            let middle = Ports.NumberVar worker.InPorts.[0]
                                            let d = rnd.NextDouble() * disper.Value + middle.Value
                                            Ports.NumTrigger (worker.OutPorts.[0]) d
                                    }|> Async.Start 
                                    None
                         )
 interface IWorkerContext
       
