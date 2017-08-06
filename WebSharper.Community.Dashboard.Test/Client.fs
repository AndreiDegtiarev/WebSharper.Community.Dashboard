namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel
open WebSharper.Community.Dashboard
open FSharp.Data


[<JavaScript>]
module Client =

    let Main () =
        
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

        OpenWeatherRunner.Create "London" ""|> registerEvent
        RandomRunner.Create 50.0 5.0        |> registerEvent
        TextBoxRenderer.Create              |> registerWidget
        ChartRenderer.Create 100.0 100.0 50 |> registerWidget

        div[dashboard.Render
            Helper.IconNormal "add" (fun _ ->  let elems =  dashboard.Data.EventItems |>List.ofSeq |> List.map (fun item -> AppModel.FromWorker item.Worker)
                                               Console.Log(Server.Serialize elems))

        ]
