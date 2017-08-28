namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel
open WebSharper.Community.Dashboard
open FSharp.Data

type StartConfiguration = 
        {ConfigurationName:string}
        static member Create config = {ConfigurationName=config}

[<Require(typeof<WebSharper.Community.PropertyGrid.Resources.StyleResource>)>]
[<JavaScript>]
module Client =

    let Main (config:StartConfiguration) =
        Environment.Log <- (fun str -> Console.Log(str))
        let fromWorker = AppModel.FromWorker
        let toWorker = AppModel.ToWorker
        let log = Environment.Log
        let fileName = Var.Create "Dashboard"
        let dashboard = App.CreateDashboard fromWorker toWorker 
        let makeTestConfig()= 
            let appData=AppData<AppModel>.Create dashboard fromWorker
            let panelKey = Helper.UniqueKey()
            let event = AppLib(RandomSource(RandomRunner.Create))
            let eventWorker = event |> AppModel.ToWorker
            let eventPair = (eventWorker.Key,event)
            let makeWidget (widget:AppModel) = 
                let widgetWorker = widget |> AppModel.ToWorker
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
            }.RecreateOnClientEventsRunning dashboard (App.PanelContainerCreator) (AppModel.ToWorker:AppModel->Worker)
        let loadOnServer (configName)= 
            let data =  Server.LoadFromFile(configName)
            data.RecreateOnClientEventsNotRunning dashboard (App.PanelContainerCreator) 
                                                  (AppModel.ToWorker:AppModel->Worker)
            Server.RecreateOnServer data |> ignore
            "Server recreated" |> log
            MessageBus.RunServerRequests()

        let tbCellC content =td content
        let menu =
           div[
            tbCellC[Helper.TxtIconNormal "build" "Sample configuration" (fun _ ->  
                              makeTestConfig())]
            tbCellC [text "File name"
                     Doc.Input [] fileName]
            tbCellC[Helper.TxtIconNormal "archive" "Upload" (fun _ ->  
                                          let data =  AppData<AppModel>.Create dashboard (AppModel.FromWorker)
                                          Server.SaveToFile(fileName.Value,data)
                                    )]
            tbCellC[Helper.TxtIconNormal "unarchive" "Download  and run on client" (fun _ ->  
                              Server.LoadFromFile(fileName.Value)
                               .RecreateOnClientEventsRunning 
                                           dashboard (App.PanelContainerCreator) 
                                           (AppModel.ToWorker:AppModel->Worker)

                        )]
            tbCellC[Helper.TxtIconNormal "cloud_upload" "Download and run on server" (fun _ ->  loadOnServer(fileName.Value))]
          ]
        div[dashboard.Render menu
        ].OnAfterRender (fun _ -> try
                                    if not (System.String.IsNullOrWhiteSpace(config.ConfigurationName)) then loadOnServer(config.ConfigurationName)
                                  with _ -> ())
