namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid

[<JavaScript>]
[<AbstractClass>]
type Worker(name) =
    inherit DshBaseReact(name)
    abstract member  InPorts:List<InPort>
    abstract member  OutPorts:List<OutPort>
    abstract member Run:unit->unit
    abstract member Clone:unit -> Worker
    member x.Properties = let nameProp=Properties.string "Name" x.Name
                          x.InPorts |> List.map (fun prop -> prop.Property)
    default x.InPorts=[]
    default x.OutPorts=[]
    default x.Run()=()