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
    member x.IWorker =
        match x with 
        |RandomSource(src) -> IWorker.CreateRunner      "Random" [Ports.InPortNum "Middle value" src.MiddleValue;Ports.InPortNum "Dispersion" src.Dispersion] [Ports.OutPortNum "Random value"] src
        |OpenWeatherSource(src) -> IWorker.CreateRunner "OpenWeatherMap" [Ports.InPortStr "City" src.OpenWeatherCity;Ports.InPortStr "ApiKey" src.OpenWeatherApiKey]  [Ports.OutPortNum "Temperature"] src
        |TextWidget(src)   -> IWorker.CreateRenderer    "Text"   [Ports.InPortNum "in Value" 0.0] [] src
        |ChartWidget(src)  -> IWorker.Create "Chart"  [
                                                        Ports.InPortNum "in Value" 0.0
                                                        Ports.InPortNum "cx" src.Cx
                                                        Ports.InPortNum "cy" src.Cy
                                                        Ports.InPortNum "BufferSize" ((double)src.ChartBufferSize)
                                                      ] [] src
    static member FromDataContext (data:IWorkerContext)=
        match data with
        | :? RandomRunner    as src -> RandomSource(src)
        | :? OpenWeatherRunner as src -> OpenWeatherSource(src)
        | :? TextBoxRenderer as src -> TextWidget(src)
        | :? ChartRenderer   as src -> ChartWidget(src)
        | _ -> failwith("AllTypes FromDataContext unknown type")  
    static member FromIWorker (worker:IWorker)= AppModel.FromDataContext worker.DataContext
    static member ToIWorker data = (data |> AppModel.FromDataContext).IWorker
