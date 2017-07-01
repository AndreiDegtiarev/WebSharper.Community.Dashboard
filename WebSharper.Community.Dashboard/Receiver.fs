namespace WebSharper.Community.Dashboard

open System
open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid

[<JavaScript>]
type IReceiver=
        abstract member  Name  :Var<string> 
        abstract member  InPorts:List<IInPortNumber>
        abstract member  Render : unit->Elt
        abstract member  Properties: List<IProperty>
