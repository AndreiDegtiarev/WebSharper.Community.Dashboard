namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next


[<JavaScript>]
type ISource =
    abstract member OutPorts:List<IOutPort>
    abstract member Run:unit->unit

[<JavaScript>]
module Sources = 
    let RandomValueSource middleValue dispersion=
        let outRandomNumber = IOutPortNumber("Random value")

        {new ISource with 
            override x.OutPorts = [outRandomNumber]
            override x.Run()=
                let rnd = System.Random()
                async {
                    while true do
                        do! Async.Sleep 600
                        let d = rnd.NextDouble() * dispersion + middleValue
                        //Console.Log ("Value generated:"+d.ToString())
                        outRandomNumber.Trigger d
                }
                |> Async.Start
         }
