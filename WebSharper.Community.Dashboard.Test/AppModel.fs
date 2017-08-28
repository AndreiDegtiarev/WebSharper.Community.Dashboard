namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.Community.Dashboard
open WebSharper.Community.Panel

[<JavaScript>]
type AppModel =
    |AppLib of AppModelLib

    static member ToWorker appData = 
        match appData with 
        |AppLib(src) -> AppModelLib.ToWorker src  
        
    static member FromWorker (worker:Worker)= 
        match worker |> AppModelLib.FromWorker with
        |Some(appModel) -> AppLib(appModel)
        |_ -> failwith("AllTypes FromWorker unknown type") 



    
