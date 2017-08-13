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
    |TextWidget   of TextBoxRenderer
    |ChartWidget  of ChartRenderer
    member x.Worker =
        match x with 
        |RandomSource(src) -> Worker.CreateWithRunner src
        |OpenWeatherSource(src) -> Worker.CreateWithRunner src
        |TextWidget(src)   -> Worker.CreateWithRenderer src
        |ChartWidget(src)  -> Worker.Create(src).WithRunner(src).WithRenderer(src)

    static member FromDataContext (data:IWorkerContext)=
        match data with
        | :? RandomRunner      as src -> Some(RandomSource(src))
        | :? OpenWeatherRunner as src -> Some(OpenWeatherSource(src))
        | :? TextBoxRenderer   as src -> Some(TextWidget(src))
        | :? ChartRenderer     as src -> Some(ChartWidget(src))
        | _ -> None 
         
    static member FromWorker (worker:Worker)= 
                            match worker.DataContext with
                            | :? RandomRunner      as src -> Some(RandomSource(RandomRunner.FromPorts worker))
                            | :? OpenWeatherRunner as src -> Some(OpenWeatherSource(OpenWeatherRunner.FromPorts worker))
                            | :? TextBoxRenderer   as src -> Some(TextWidget(TextBoxRenderer.FromPorts worker))
                            | :? ChartRenderer     as src -> Some(ChartWidget(ChartRenderer.FromPorts worker))
                            | _ -> None 


[<JavaScript>]          
module App =
    let Register dashboard = 
        let register fnc data   = data |> AppModelLib.FromDataContext |> Option.map (fun appObj -> appObj.Worker |> fnc) |> ignore
        let registerEvent  data = data |> register (dashboard.Factory.RegisterEvent)
        let registerWidget data = data |> register (dashboard.Factory.RegisterWidget)

        OpenWeatherRunner.Create "London" ""  |> registerEvent
        RandomRunner.Create 50.0 5.0          |> registerEvent
        TextBoxRenderer.Create                |> registerWidget
        ChartRenderer.Create 300.0 100.0 50.0 |> registerWidget
 
    let CreateDashboard =
        let layoutManager = LayoutManagers.FloatingPanelLayoutManager 5.0
        let panelContainer=PanelContainer.Create
                                         .WithLayoutManager(layoutManager)
                                         .WithWidth(800.0).WithHeight(420.0)
                                         .WithAttributes([Attr.Style "border" "1px solid white"
                                                          //Attr.Style "position" "absolute"
                                                         ])
        let dashboard = Dashboard.Create panelContainer
        dashboard |> Register 
        dashboard