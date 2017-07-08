namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid

(*
[<JavaScript>]
type ISource =
    abstract member  Name  :Var<string> 
    abstract member OutPorts:List<OutPort>
    abstract member  Properties: List<IProperty>
    abstract member Run:unit->unit
    abstract member Clone:unit -> ISource
*)
[<JavaScript>]
module Sources = 
    type RandomValueSource(middleValue,dispersion)=
        inherit Worker("Random")
        let inMiddleValue = InPortNum("Middle value",middleValue)
        let inDispersionValue = InPortNum("Dispersion",dispersion)
        let outRandomNumber = OutPortNum("Random value")

        override x.InPorts = [inMiddleValue;inDispersionValue]
        override x.OutPorts = [outRandomNumber]
        //override x.Properties = [Properties.string "Name" name;Properties.double "Middle value" varMiddleValue;Properties.double "Dispersion value" varDispersion ]
        override x.Clone() = RandomValueSource(middleValue,dispersion) :> Worker
        override x.Run()=
            let rnd = System.Random()
            async {
                while true do
                    do! Async.Sleep 600
                    let disper = inDispersionValue.Value.Value
                    let d = rnd.NextDouble() * inDispersionValue.Value.Value + inMiddleValue.Value.Value
                    //Console.Log ("Value generated:"+d.ToString())
                    outRandomNumber.Trigger d
            }
            |> Async.Start
