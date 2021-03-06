namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.UI.Html
open WebSharper.Community.Panel
open WebSharper.Community.Dashboard
open WebSharper.Community.Dashboard.Events
open WebSharper.Community.Dashboard.Widgets
open FSharp.Data

type StartConfiguration = 
        {ConfigurationName:string}
        static member Create config = {ConfigurationName=config}

[<Require(typeof<WebSharper.Community.PropertyGrid.Resources.StyleResource>)>]
[<Require(typeof<WebSharper.Community.Panel.Resources.StyleResource>)>]
[<Require(typeof<WebSharper.Community.Dashboard.Resources.StyleResource>)>]
[<JavaScript>]
module Client =

    let Main (config:StartConfiguration) =
        Environment.Log <- (fun str -> Console.Log(str))
        MessageBus.RunServerRequests()
        let fromWorker = AppModel.FromWorker
        let log = Environment.Log
        //let fileName = Var.Create "Dashboard"
        let dashboard = App.CreateDashboard
        Environment.UpdateConfiguration <- (fun json -> 
                                                    try
                                                        let data = Json.Deserialize<AppData<AppModel>> json
                                                        data.RecreateOnClientEventsNotRunning dashboard (App.PanelContainerCreator) 
                                                                                    (AppModel.ToWorker:AppModel->Worker)
                                                        "Configuration updated" |> log
                                                    with
                                                    |ex -> ex.Message |> log
                                           )
        let makeTestConfig()= 
            let appData=AppData<AppModel>.Create dashboard fromWorker
            let panelKey = Helper.UniqueKey()
            let event = AppLib(AppRandomEvent(RandomEvent.Create))
            let eventWorker = event |> AppModel.ToWorker
            let eventPair = (eventWorker.Key,event)
            let makeWidget (widget:AppModel) = 
                let widgetWorker = widget |> AppModel.ToWorker
                let widgetPair = (widgetWorker.Key,panelKey,widget)
                (widgetPair,{InPortKey = widgetWorker.InPorts.[0].Key;OutPortKey="";WorkerKey=widgetWorker.Key})
            let (txtPair,textWorker) = makeWidget (AppLib(AppTextBoxWidget(TextBoxWidget.Create)))
            let (chartPair,chartWorker) = makeWidget (AppLib(AppChartWidget(ChartWidget.Create)))
            let (gaugePair, gaugeWorker) = makeWidget (AppLib(AppGaugeWidget(GaugeWidget.Create)))
            let panelData = [ PanelData.Create panelKey 0.0 0.0 []]
            {appData with Events = [("main",[eventPair])]
                          Widgets = [("main",panelData,[txtPair;chartPair;gaugePair])]
                          Rules = [("main",{RuleContainer =
                                                    [
                                                     {RuleChain = [{InPortKey = eventWorker.InPorts.[0].Key;OutPortKey=eventWorker.OutPorts.[0].Key;WorkerKey=eventWorker.Key}
                                                                   textWorker]}
                                                     {RuleChain = [{InPortKey = eventWorker.InPorts.[0].Key;OutPortKey=eventWorker.OutPorts.[0].Key;WorkerKey=eventWorker.Key}
                                                                   chartWorker]}
                                                     {RuleChain = [{InPortKey = eventWorker.InPorts.[0].Key;OutPortKey=eventWorker.OutPorts.[0].Key;WorkerKey=eventWorker.Key}
                                                                   gaugeWorker]}
                                                    ]})]
            }.RecreateOnClientEventsRunning dashboard (App.PanelContainerCreator) (AppModel.ToWorker:AppModel->Worker)
        let loadOnServer (configName)= 
            let data =  Server.LoadFromFile(configName)
//            data.RecreateOnClientEventsNotRunning dashboard (App.PanelContainerCreator) 
//                                                  (AppModel.ToWorker:AppModel->Worker)
            Server.RecreateOnServer data |> ignore
            "Server recreated" |> log

        let tbCellC content =td [] content
        let menu =
         div[][
            tbCellC[Helper.TxtIconNormal "build" "Sample configuration" (fun _ -> makeTestConfig())]
            tbCellC[Helper.TxtIconNormal "autorenew" "Refresh" (fun _ ->  
                                          let data = AppData<AppModel>.Create dashboard (AppModel.FromWorker)
                                          data.RecreateOnClientEventsRunning 
                                           dashboard (App.PanelContainerCreator) 
                                           (AppModel.ToWorker:AppModel->Worker)
                                          )]
            tbCellC[Helper.TxtIconNormal "archive" "Upload" (fun _ ->  
                                          let data =  AppData<AppModel>.Create dashboard (AppModel.FromWorker)
                                          Server.SaveToFile("Default",data)
                                    )]
            tbCellC[Helper.TxtIconNormal "unarchive" "Download  and run on client" (fun _ ->  
                              Server.LoadFromFile("Default")
                               .RecreateOnClientEventsRunning 
                                           dashboard (App.PanelContainerCreator) 
                                           (AppModel.ToWorker:AppModel->Worker)

                        )]
            tbCellC[Helper.TxtIconNormal "cloud_upload" "Download and run on server" (fun _ ->  loadOnServer("Default"))]
          ]
        (div[][dashboard.Render menu
             ]).OnAfterRender (fun _ -> //MessageBus.RunServerRequests()
                                  try
                                    if not (System.String.IsNullOrWhiteSpace(config.ConfigurationName)) then loadOnServer(config.ConfigurationName)
                                  with _ -> ())
