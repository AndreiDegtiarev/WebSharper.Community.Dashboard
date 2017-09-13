namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.Community.Dashboard
open WebSharper.Community.Dashboard.Events
open WebSharper.Community.Dashboard.Widgets
open WebSharper.Community.Panel

[<JavaScript>]
type AppModelLib =
    |AppRandomEvent      of RandomEvent
    |AppClockEvent       of ClockEvent //Define model object
    |AppOpenWeatherEvent of OpenWeatherEvent
    |AppDatabaseEvent    of DatabaseEvent
    |AppTextBoxWidget    of TextBoxWidget
    |AppChartWidget      of ChartWidget
    |AppButtonWidget     of ButtonWidget
    static member ToWorker appModel=
        match appModel with 
        |AppRandomEvent(src) ->      src |> Worker.Create 
        |AppClockEvent(src) ->       src |> Worker.Create //conversion from model object to worker
        |AppOpenWeatherEvent(src) -> src |> Worker.Create 
        |AppDatabaseEvent(src)   ->  src |> Worker.Create 
        |AppTextBoxWidget(src)   ->  src |> Worker.Create 
        |AppChartWidget(src)  ->     src |> Worker.Create 
        |AppButtonWidget(src)   ->   src |> Worker.Create 
         
    static member FromWorker (worker:Worker)= 
                            match worker.Data with
                            | :? RandomEvent      as src -> Some(AppRandomEvent(RandomEvent.FromWorker worker))
                            | :? ClockEvent      as src -> Some(AppClockEvent(ClockEvent.FromWorker worker)) //conversion from worker to model object
                            | :? OpenWeatherEvent as src -> Some(AppOpenWeatherEvent(OpenWeatherEvent.FromWorker worker))
                            | :? DatabaseEvent    as src -> Some(AppDatabaseEvent(DatabaseEvent.FromWorker worker))
                            | :? TextBoxWidget   as src -> Some(AppTextBoxWidget(TextBoxWidget.FromWorker worker))
                            | :? ChartWidget     as src -> Some(AppChartWidget(ChartWidget.FromWorker worker))
                            | :? ButtonWidget    as src -> Some(AppButtonWidget(ButtonWidget.FromWorker worker))
                            | _ -> None 


[<JavaScript>]          
module App =
    let Register fnc data = data |> Worker.Create |> fnc
    let RegisterEventGeneral  dashboard data = data |> Register (dashboard.Factory.RegisterEvent) 
    let RegisterWidgetGeneral dashboard data = data |> Register (dashboard.Factory.RegisterWidget)

    let RegisterAppModelLib dashboard = 
        let registerEvent  data = data |> RegisterEventGeneral dashboard 
        let registerWidget data = data |> RegisterWidgetGeneral dashboard

        OpenWeatherEvent.Create "London" ""  |> registerEvent
        RandomEvent.Create                   |> registerEvent
        ClockEvent.Create                    |> registerEvent //register clock event in the factory
        DatabaseEvent.Create                 |> registerEvent
        TextBoxWidget.Create                 |> registerWidget
        ChartWidget.Create                   |> registerWidget
        ButtonWidget.Create                  |> registerWidget
        dashboard
    let PanelContainerCreator=(fun _ -> 
                                let layoutManager = LayoutManagers.FloatingPanelLayoutManager 5.0
                                PanelContainer.Create
                                     .WithLayoutManager(layoutManager)
                                     .WithWidth(2800.0).WithHeight(2420.0)
                                     .WithAttributes([//Attr.Style "border" "1px solid white"
                                                     ]))
    let CreateDashboard =
        let dashboard = Dashboard.Create PanelContainerCreator
        dashboard |> RegisterAppModelLib