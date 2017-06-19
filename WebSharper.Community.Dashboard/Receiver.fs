namespace WebSharper.Community.Dashboard

open System
open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next

[<JavaScript>]
type IReceiver=
        abstract member  InPorts:List<IInPortNumber>
        abstract member  Render : unit->Elt
