namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.Community.Dashboard
open WebSharper.Community.Panel

[<JavaScript>]
type AppModel =
    |AppLib of AppModelLib

    static member ToWorker appData = 
        match appData with 
        |AppLib(src) -> AppModelLib.ToWorker src  
        
    static member FromWorker (worker:Worker)= worker |> AppModelLib.FromWorker |> Option.map(fun appModel -> AppLib(appModel))




    
