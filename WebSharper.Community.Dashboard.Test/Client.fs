namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel
open WebSharper.Community.Dashboard

[<JavaScript>]
module Client =

    let Main () =
        let panelContainer=PanelContainer.Create
                                         .WithLayoutManager(LayoutManagers.FloatingPanelLayoutManager 5.0)
                                         .WithWidth(800.0).WithHeight(400.0)
                                         .WithAttributes([Attr.Style "border" "1px solid white"])
        let dashboard = Dashboard.Create panelContainer
        let srcRandom = RandomValueSource.Create :> ISource
        dashboard.AddSource srcRandom 

        div[
                dashboard.Render
           ].OnAfterRender(fun (el) -> 
                               Console.Log "OnAfterRender"
                               let clientWidth = el.ClientWidth
                               let cx = 800.0 - 15.0
                               let varText = Var.Create ""
                               srcRandom.String.Publish.Add(fun str -> varText.Value <- str)
                               let createPanel fnc =
                                   let clientContainer = dashboard.CreatePanel(cx,fnc)
                                   Receivers.receiverText varText.View |> dashboard.AddReceiver clientContainer 
                                   let receiver = Receivers.receiverChart srcRandom.Number ((int)(cx - 270.0)) 120
                                   receiver |> dashboard.AddReceiver clientContainer 
                               createPanel(fun _ -> createPanel(fun _->()))
                          )
