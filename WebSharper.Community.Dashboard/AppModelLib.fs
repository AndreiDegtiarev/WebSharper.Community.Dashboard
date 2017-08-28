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
    static member ToWorker appModel=
        match appModel with 
        |RandomSource(src) ->      src |> Worker.Create 
        |OpenWeatherSource(src) -> src |> Worker.Create 
        |DatabaseSource(src)   ->  src |> Worker.Create 
        |TextWidget(src)   ->      src |> Worker.Create 
        |ChartWidget(src)  ->      src |> Worker.Create 
        |ButtonWidget(src)   ->    src |> Worker.Create 
         
    static member FromWorker (worker:Worker)= 
                            match worker.Data with
                            | :? RandomRunner      as src -> Some(RandomSource(RandomRunner.FromWorker worker))
                            | :? OpenWeatherRunner as src -> Some(OpenWeatherSource(OpenWeatherRunner.FromWorker worker))
                            | :? DatabaseRunner    as src -> Some(DatabaseSource(DatabaseRunner.FromWorker worker))
                            | :? TextBoxRenderer   as src -> Some(TextWidget(TextBoxRenderer.FromWorker worker))
                            | :? ChartRenderer     as src -> Some(ChartWidget(ChartRenderer.FromWorker worker))
                            | :? ButtonRenderer    as src -> Some(ButtonWidget(ButtonRenderer.FromWorker worker))
                            | _ -> None 


[<JavaScript>]          
module App =
    let Register fnc data = data |> Worker.Create |> fnc
    let RegisterEventGeneral  dashboard data = data |> Register (dashboard.Factory.RegisterEvent) 
    let RegisterWidgetGeneral dashboard data = data |> Register (dashboard.Factory.RegisterWidget)

    let RegisterAppModelLib dashboard = 
        let registerEvent  data = data |> RegisterEventGeneral dashboard 
        let registerWidget data = data |> RegisterWidgetGeneral dashboard

        OpenWeatherRunner.Create "London" ""  |> registerEvent
        RandomRunner.Create                   |> registerEvent
        DatabaseRunner.Create                 |> registerEvent
        TextBoxRenderer.Create                |> registerWidget
        ChartRenderer.Create 300.0 150.0 50.0 |> registerWidget
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
    let CreateDashboard =
        let dashboard = Dashboard.Create PanelContainerCreator
        dashboard |> RegisterAppModelLib