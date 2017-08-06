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
                            | :? RandomRunner    as src -> RandomSource(RandomRunner.FromPorts worker)
                            | :? OpenWeatherRunner as src -> OpenWeatherSource(OpenWeatherRunner.FromPorts worker)
                            | :? TextBoxRenderer as src -> TextWidget(TextBoxRenderer.FromPorts worker)
                            | :? ChartRenderer   as src -> ChartWidget(ChartRenderer.FromPorts worker)
                            | _ -> failwith("AllTypes FromDataContext unknown type") 
    static member ToWorker data = (data |> AppModel.FromDataContext).Worker

[<JavaScript>]
type AppData =
    {
        Events:AppModel list
        Widgets:(string*AppModel) list
        PortConnectors:PortConnectorData list
    }
    static member Create (dschData:DshData) = 
        {
            Events=dschData.EventItems   |>List.ofSeq |> List.map (fun item -> AppModel.FromWorker item.Worker)
            Widgets=dschData.WidgetItems |>List.ofSeq |> List.map (fun item -> (item.Panel,AppModel.FromWorker item.Widget))
            PortConnectors = dschData.PortConnectorItems |>List.ofSeq |> List.map (fun item -> item.PortConnector.Data)
        }


