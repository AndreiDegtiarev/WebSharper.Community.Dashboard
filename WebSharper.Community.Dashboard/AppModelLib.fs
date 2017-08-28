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
    let Register dashboard = 
        let register fnc data   = data |> Worker.Create |> fnc |> ignore
        let registerEvent  data = data |> register (dashboard.Factory.RegisterEvent)
        let registerWidget data = data |> register (dashboard.Factory.RegisterWidget)

        OpenWeatherRunner.Create "London" ""  |> registerEvent
        RandomRunner.Create                   |> registerEvent
        DatabaseRunner.Create                 |> registerEvent
        TextBoxRenderer.Create                |> registerWidget
        ChartRenderer.Create 300.0 100.0 50.0 |> registerWidget
        ButtonRenderer.Create                 |> registerWidget
    let PanelContainerCreator=(fun _ -> 
                                let layoutManager = LayoutManagers.FloatingPanelLayoutManager 5.0
                                PanelContainer.Create
                                     .WithLayoutManager(layoutManager)
                                     .WithWidth(800.0).WithHeight(420.0)
                                     .WithAttributes([Attr.Style "border" "1px solid white"
                                                      //Attr.Style "position" "absolute"
                                                     ]))
    let CreateDashboard =
        let dashboard = Dashboard.Create PanelContainerCreator
        dashboard |> Register 
        dashboard