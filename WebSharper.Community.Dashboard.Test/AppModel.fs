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
        |AppLib(src) -> src.Worker
    static member FromDataContext (data:IWorkerContext)=
        match data |> AppModelLib.FromDataContext with
        |Some(appModel) -> appModel
        |_ -> failwith("AllTypes FromDataContext unknown type")
         
    static member FromWorker (worker:Worker)= 
        match worker |> AppModelLib.FromWorker with
        |Some(appModel) -> AppLib(appModel)
        |_ -> failwith("AllTypes FromWorker unknown type") 
    static member ToWorker data = (data |> AppModel.FromDataContext).Worker


    
