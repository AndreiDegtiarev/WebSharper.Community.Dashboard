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
        //let srcRandom2 = Sources.RandomValueSource 50.0 5.0
        //let srcRandom1 = Sources.RandomValueSource 100.0 10.0
        //let srcRandom1 = SrcOpenWeather.Create "London"
        dashboard.Factory.RegisterSource (SrcOpenWeather.Create "London")
        dashboard.Factory.RegisterSource (Sources.RandomValueSource 50.0 5.0)
        dashboard.Factory.RegisterReceiver (Widgets.text())
        dashboard.Factory.RegisterReceiver (Widgets.chart(100,100,50))
        //srcRandom1.Run
        //srcRandom2.Run()
        div[
                dashboard.Render
           ].OnAfterRender(fun (el) -> ()
             (*                  Console.Log "OnAfterRender"
                               let clientWidth = el.ClientWidth
                               let cx = 800.0 - 15.0
                               let createPanel(name,(src:ISource),fnc) =
                                   let clientContainer = dashboard.CreatePanel(name,cx,fnc)
                                   [
                                        Widgets.text()
                                        Widgets.chart(((int)(cx - 270.0)),120,50)
                                   ]|>List.iter (fun widget  ->  src.OutPorts.[0].Connect (widget.InPorts.[0])
                                                                 dashboard.RegisterReceiver clientContainer widget
                                                                          )
                               createPanel("Panel1",srcRandom1,(fun panel -> layoutManager.Relayout panelContainer panel ))
                               createPanel("Panel2",srcRandom2,(fun panel -> 
                                            Console.Log "second create panel"
                                            layoutManager.PlacePanel panelContainer panel))
                                            *)
                          )
