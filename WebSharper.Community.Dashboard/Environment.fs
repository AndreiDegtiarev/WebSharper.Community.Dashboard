namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript

[<JavaScript>]
module Environment = 
    type Role =
    |Client
    |Server

    let mutable Role:Role = Server
    let mutable Log:(string->unit) = (fun _ ->())
    let mutable DataDirectory:string = ""
    let mutable UpdateConfiguration:(string->unit) = (fun _ -> ())
