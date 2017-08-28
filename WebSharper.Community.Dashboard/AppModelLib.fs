namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.Community.Dashboard
open WebSharper.Community.Panel

[<JavaScript>]
type AppModelLib =
    |RandomSource of RandomRunner
    |OpenWeatherSource of OpenWeatherRunner
    |DatabaseSource  of DatabaseRunner
    |TextWidget   of TextBoxRenderer
    |ChartWidget  of ChartRenderer
    |ButtonWidget  of ButtonRenderer
    static member ToWorker worker=
        match worker with 
        |RandomSource(src) -> Worker.CreateWithRunner src
        |OpenWeatherSource(src) -> Worker.CreateWithRunner src
        |DatabaseSource(src)   -> Worker.CreateWithRunner src
        |TextWidget(src)   -> Worker.CreateWithRenderer src
        |ChartWidget(src)  -> Worker.Create(src).WithRunner(src).WithRenderer(src)
        |ButtonWidget(src)   -> Worker.CreateWithRenderer src
         
    static member FromWorker (worker:Worker)= 
                            match worker.DataContext with
                            | :? RandomRunner      as src -> Some(RandomSource(RandomRunner.FromWorker worker))
                            | :? OpenWeatherRunner as src -> Some(OpenWeatherSource(OpenWeatherRunner.FromWorker worker))
                            | :? DatabaseRunner    as src -> Some(DatabaseSource(DatabaseRunner.FromWorker worker))
                            | :? TextBoxRenderer   as src -> Some(TextWidget(TextBoxRenderer.FromWorker worker))
                            | :? ChartRenderer     as src -> Some(ChartWidget(ChartRenderer.FromWorker worker))
                            | :? ButtonRenderer    as src -> Some(ButtonWidget(ButtonRenderer.FromWorker worker))
                            | _ -> None 


[<JavaScript>]          
module App =
    let Register fnc fromWorker toWorker data = data |> Worker.Create |> fromWorker |> Option.map (fun appModel -> appModel |> toWorker |> fnc |> ignore) |>ignore
    let RegisterEventGeneral  dashboard fromWorker toWorker data = data |> Register (dashboard.Factory.RegisterEvent)  fromWorker toWorker
    let RegisterWidgetGeneral dashboard  fromWorker toWorker data = data |> Register (dashboard.Factory.RegisterWidget) fromWorker toWorker
    let RegisterAppModelLib  fromWorker toWorker dashboard = 
        // AppModelLib.FromWorker AppModelLib.ToWorker because of Runner and Renderer registration
        let registerEvent  data = data |> RegisterEventGeneral dashboard  fromWorker toWorker
        let registerWidget data = data |> RegisterWidgetGeneral dashboard fromWorker toWorker

        OpenWeatherRunner.Create "London" ""  |> registerEvent
        RandomRunner.Create                   |> registerEvent
        DatabaseRunner.Create                 |> registerEvent
        TextBoxRenderer.Create                |> registerWidget
        ChartRenderer.Create 300.0 100.0 50.0 |> registerWidget
        ButtonRenderer.Create                 |> registerWidget
        dashboard
    let PanelContainerCreator=(fun _ -> 
                                let layoutManager = LayoutManagers.FloatingPanelLayoutManager 5.0
                                PanelContainer.Create
                                     .WithLayoutManager(layoutManager)
                                     .WithWidth(800.0).WithHeight(420.0)
                                     .WithAttributes([Attr.Style "border" "1px solid white"
                                                      //Attr.Style "position" "absolute"
                                                     ]))
    let CreateDashboard fromWorker toWorker =
        let dashboard = Dashboard.Create PanelContainerCreator
        dashboard |> RegisterAppModelLib fromWorker toWorker