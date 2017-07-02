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
    abstract member Clone:unit -> ISource

[<JavaScript>]
module Sources = 
    type RandomValueSource(middleValue,dispersion)=
        let outRandomNumber = IOutPortNumber("Random value")
        let varMiddleValue=Var.Create middleValue
        let varDispersion=Var.Create dispersion
        let name = Var.Create "Random"
        interface ISource with
            override x.Name=name
            override x.OutPorts = [outRandomNumber;]
            override x.Properties = [Properties.string "Name" name;Properties.double "Middle value" varMiddleValue;Properties.double "Dispersion value" varDispersion ]
            override x.Clone() = RandomValueSource(middleValue,dispersion) :> ISource
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
