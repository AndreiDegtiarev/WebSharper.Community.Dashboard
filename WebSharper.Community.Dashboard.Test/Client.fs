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
        let layoutManager = LayoutManagers.FloatingPanelLayoutManager 5.0
        let panelContainer=PanelContainer.Create
                                         .WithLayoutManager(layoutManager)
                                         .WithWidth(800.0).WithHeight(420.0)
                                         .WithAttributes([Attr.Style "border" "1px solid white"
                                                          //Attr.Style "position" "absolute"
                                                         ])
        let dashboard = Dashboard.Create panelContainer
        dashboard.Factory.RegisterEvent (SrcOpenWeather.Create("London"))
        dashboard.Factory.RegisterEvent (Sources.RandomValueSource(50.0,5.0))
        dashboard.Factory.RegisterWidget (Widgets.TextBox())
        dashboard.Factory.RegisterWidget (Widgets.Chart(100.0,100.0,50))

        div[dashboard.Render]
