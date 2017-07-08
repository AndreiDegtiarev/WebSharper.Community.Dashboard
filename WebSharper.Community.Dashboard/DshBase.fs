namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next

[<JavaScript>]
type DshBase(name:string) =
    member x.Name = name

[<JavaScript>]
type DshBaseReact(name:string) =
    let name = Var.Create name
    member x.Name = name