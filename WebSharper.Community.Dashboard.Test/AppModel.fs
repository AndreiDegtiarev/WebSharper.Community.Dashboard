namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.JavaScript
open WebSharper.Community.Dashboard

[<JavaScript>]
type AppModel =
    |RandomSource of RandomRunner
    |OpenWeatherSource of OpenWeatherRunner
    |TextWidget   of TextBoxRenderer
    |ChartWidget  of ChartRenderer
    member x.Worker =
        match x with 
        |RandomSource(src) -> Worker.CreateRunner src
        |OpenWeatherSource(src) -> Worker.CreateRunner src
        |TextWidget(src)   -> Worker.CreateRenderer src
        |ChartWidget(src)  -> Worker.Create src
    static member FromDataContext (data:IWorkerContext)=
        match data with
        | :? RandomRunner    as src -> RandomSource(src)
        | :? OpenWeatherRunner as src -> OpenWeatherSource(src)
        | :? TextBoxRenderer as src -> TextWidget(src)
        | :? ChartRenderer   as src -> ChartWidget(src)
        | _ -> failwith("AllTypes FromDataContext unknown type") 
         
    static member FromWorker (worker:Worker)= 
                            match worker.DataContext with
                            | :? RandomRunner    as src -> RandomSource(RandomRunner.FromInPorts worker)
                            | :? OpenWeatherRunner as src -> OpenWeatherSource(OpenWeatherRunner.FromInPorts worker)
                            | :? TextBoxRenderer as src -> TextWidget(TextBoxRenderer.FromInPorts worker)
                            | :? ChartRenderer   as src -> ChartWidget(ChartRenderer.FromInPorts worker)
                            | _ -> failwith("AllTypes FromDataContext unknown type") 
    static member ToWorker data = (data |> AppModel.FromDataContext).Worker
