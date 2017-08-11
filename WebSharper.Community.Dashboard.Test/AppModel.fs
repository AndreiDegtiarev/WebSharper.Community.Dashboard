namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.Community.Dashboard
open WebSharper.Community.Panel


[<JavaScript>]
type AppModel =
    |RandomSource of RandomRunner
    |OpenWeatherSource of OpenWeatherRunner
    |TextWidget   of TextBoxRenderer
    |ChartWidget  of ChartRenderer
    member x.Worker =
        match x with 
        |RandomSource(src) -> Worker.Create(src).WithRunner(src)
        |OpenWeatherSource(src) -> Worker.Create(src).WithRunner(src)
        |TextWidget(src)   -> Worker.Create(src).WithRenderer(src)
        |ChartWidget(src)  -> Worker.Create(src).WithRunner(src).WithRenderer(src)

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
        PanelData:PanelData list
        Events:(string*AppModel) list
        Widgets:(string*string*AppModel) list
        Rules:RuleContainer
    }
    static member Create dashboard = 
        {
            PanelData = dashboard.PanelContainer.PanelItems |>List.ofSeq |>List.map (fun panel -> panel.PanelData)
            Events=dashboard.Data.EventItems   |>List.ofSeq |> List.map (fun item -> (item.Worker.Key,AppModel.FromWorker item.Worker))
            Widgets=dashboard.Data.WidgetItems |>List.ofSeq |> List.map (fun item -> (item.Widget.Key,item.Panel,AppModel.FromWorker item.Widget))
            Rules = dashboard.Editor.CopyToRules
        }    
    static member CreateDashboard =
        let layoutManager = LayoutManagers.FloatingPanelLayoutManager 5.0
        let panelContainer=PanelContainer.Create
                                         .WithLayoutManager(layoutManager)
                                         .WithWidth(800.0).WithHeight(420.0)
                                         .WithAttributes([Attr.Style "border" "1px solid white"
                                                          //Attr.Style "position" "absolute"
                                                         ])
        let dashboard = Dashboard.Create panelContainer
        let register data fnc = data |> AppModel.ToWorker |> fnc
        let registerEvent  data = register data dashboard.Factory.RegisterEvent
        let registerWidget data = register data dashboard.Factory.RegisterWidget

        OpenWeatherRunner.Create "London" ""  |> registerEvent
        RandomRunner.Create 50.0 5.0          |> registerEvent
        TextBoxRenderer.Create                |> registerWidget
        ChartRenderer.Create 300.0 100.0 50.0 |> registerWidget
        dashboard

    member x.Recreate (dashboard:Dashboard) =
        dashboard.Restore x.PanelData 
                          (x.Events |> List.map (fun (key,event) -> (key,event.Worker.WithStartRunner())))
                          (x.Widgets |>List.map (fun (key,keyPanel,widget) -> (key,keyPanel,widget.Worker)))
                          x.Rules
    member x.RecreateOnClient (dashboard:Dashboard) =
        dashboard.Restore x.PanelData 
                          (x.Events |> List.map (fun (key,event) -> (key,event.Worker)))
                          (x.Widgets |>List.map (fun (key,keyPanel,widget) -> (key,keyPanel,widget.Worker)))
                          x.Rules
    member x.RecreateOnServer =
        let allWorkers=(x.Events |> List.map (fun (_,event) -> event.Worker))
                       @(x.Widgets |> List.map (fun (_,_,widget) -> widget.Worker))
                       |>List.map (fun worker -> worker.WithStartRunner())
        x.Rules.Reconnect allWorkers
