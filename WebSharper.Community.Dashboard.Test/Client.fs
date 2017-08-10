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
        
        let fileName = Var.Create "D:\\Dashboard.cfg"
        let dashboard = AppData.CreateDashboard
        let makeTestConfig()= 
            let appData=AppData.Create dashboard
            let panelKey = Helper.UniqueKey()
            let event = RandomSource(RandomRunner.Create 100.0 50.0)
            let eventWorker = event.Worker
            let eventPair = (eventWorker.Key,event)
            let widget = TextWidget(TextBoxRenderer.Create)
            let widgetWorker = widget.Worker
            let widgetPair = (widgetWorker.Key,panelKey,widget)
            {appData with PanelData = [ PanelData.Create panelKey 0.0 0.0 []]
                          Events = [eventPair]
                          Widgets = [widgetPair]
                          DshEditorData = {DshEditorRows =
                                                    [{
                                                       DshEditorCells = 
                                                            [
                                                                {CellInPortKey = eventWorker.InPorts.[0].Key;CellOutPortKey=eventWorker.OutPorts.[0].Key;CellWorkerKey=eventWorker.Key}
                                                                {CellInPortKey = widgetWorker.InPorts.[0].Key;CellOutPortKey="";CellWorkerKey=widgetWorker.Key}
                                                            ]
                                                    }]}
            }.Recreate dashboard
        div[dashboard.Render
            text "File name"
            Doc.Input [] fileName
            Helper.TxtIconNormal "file_upload" "Upload" (fun _ ->  
                                          let data =  AppData.Create dashboard
                                          Server.SaveToFile(fileName.Value,data)
                                    )
            Helper.TxtIconNormal "file_download" "Download" (fun _ ->  
                              let data =  Server.LoadFromFile(fileName.Value)
                              data.Recreate dashboard
                        )
            Helper.TxtIconNormal "build" "Sample configuration" (fun _ ->  
                              makeTestConfig()
                        )

        ]
