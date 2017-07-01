namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid


[<JavaScript>]
type ISource =
    abstract member  Name  :Var<string> 
    abstract member OutPorts:List<IOutPort>
    abstract member  Properties: List<IProperty>
    abstract member Run:unit->unit

[<JavaScript>]
module Sources = 
    let RandomValueSource middleValue dispersion=
        let outRandomNumber = IOutPortNumber("Random value")
        let varMiddleValue=Var.Create 100.0
        let varDispersion=Var.Create 0.1
        {new ISource with 
            override x.Name=Var.Create "Random"
            override x.OutPorts = [outRandomNumber;]
            override x.Properties = [Properties.double "Middle value" varMiddleValue;Properties.double "Dispersion value" varDispersion ]
            override x.Run()=
                let rnd = System.Random()
                async {
                    while true do
                        do! Async.Sleep 600
                        let d = rnd.NextDouble() * varDispersion.Value + varMiddleValue.Value
                        //Console.Log ("Value generated:"+d.ToString())
                        outRandomNumber.Trigger d
                }
                |> Async.Start
         }
