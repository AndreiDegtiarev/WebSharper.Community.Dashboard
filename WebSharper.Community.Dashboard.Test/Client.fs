namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel
open WebSharper.Community.Dashboard
open FSharp.Data

[<Require(typeof<WebSharper.Community.PropertyGrid.Resources.StyleResource>)>]
[<JavaScript>]
module Client =

    let Main () =
        MessageBus.Log <- (fun str -> Console.Log(str))
        let fileName = Var.Create "D:\\Dashboard.cfg"
        let dashboard = App.CreateDashboard
        let makeTestConfig()= 
            let appData=AppData.Create dashboard
            let panelKey = Helper.UniqueKey()
            let event = AppLib(RandomSource(RandomRunner.Create 100.0 50.0))
            let eventWorker = event.Worker
            let eventPair = (eventWorker.Key,event)
            let makeWidget (widget:AppModel) = 
                let widgetWorker = widget.Worker
                let widgetPair = (widgetWorker.Key,panelKey,widget)
                (widgetPair,{InPortKey = widgetWorker.InPorts.[0].Key;OutPortKey="";WorkerKey=widgetWorker.Key})
            let (txtPair,textWorker) = makeWidget (AppLib(TextWidget(TextBoxRenderer.Create)))
            let (chartPair,chartWorker) = makeWidget (AppLib(ChartWidget(ChartRenderer.Create 300.0 150.0 50.0)))
            let panelData = [ PanelData.Create panelKey 0.0 0.0 []]
            {appData with Events = [("main",[eventPair])]
                          Widgets = [("main",panelData,[txtPair;chartPair])]
                          Rules = [("main",{RuleContainer =
                                                    [
                                                     {RuleChain = [{InPortKey = eventWorker.InPorts.[0].Key;OutPortKey=eventWorker.OutPorts.[0].Key;WorkerKey=eventWorker.Key}
                                                                   textWorker]}
                                                     {RuleChain = [{InPortKey = eventWorker.InPorts.[0].Key;OutPortKey=eventWorker.OutPorts.[0].Key;WorkerKey=eventWorker.Key}
                                                                   chartWorker]}
                                                    ]})]
            }.Recreate dashboard (App.PanelContainerCreator)
        let tbCellC content =td content
        div[
           table [
                      tr[
                        tbCellC[Helper.TxtIconNormal "build" "Sample configuration" (fun _ ->  
                                          makeTestConfig())]
                        tbCellC [text "File name"
                                 Doc.Input [] fileName]
                        tbCellC[Helper.TxtIconNormal "archive" "Upload" (fun _ ->  
                                                      let data =  AppData.Create dashboard
                                                      Server.SaveToFile(fileName.Value,data)
                                                )]
                        tbCellC[Helper.TxtIconNormal "unarchive" "Download  and run on client" (fun _ ->  
                                          let data =  Server.LoadFromFile(fileName.Value)
                                          data.Recreate dashboard (App.PanelContainerCreator)
                                    )]
                        tbCellC[Helper.TxtIconNormal "cloud_upload" "Download and run on server" (fun _ ->  
                                          let data =  Server.LoadFromFile(fileName.Value)
                                          data.RecreateOnClient dashboard (App.PanelContainerCreator)
                                          Server.RecreateOnServer data
                                          MessageBus.RunServerRequests()
                                          
                                    )]
                        ]
           ]
           dashboard.Render

        ]
