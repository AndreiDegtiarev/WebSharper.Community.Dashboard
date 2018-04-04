namespace WebSharper.Community.Dashboard.Widgets

open WebSharper
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.UI.Html
open WebSharper.Community.Dashboard

[<JavaScript>]
type ButtonWidget =
  {
      ButtonWidgetData:WorkerData
  }
  static member Create = {ButtonWidgetData = WorkerData.Create "Button" [InPortData.CreateString "Caption" "Button"
                                                                         InPortData.CreateNumber "State" 0.0
                                                                        ][OutPort.Create "Button value"]}
                         
  static member FromWorker = (fun (worker:Worker) -> {ButtonWidgetData = worker.ToData})

  interface IWorkerData with
      override x.Data = x.ButtonWidgetData
      override x.Run  = None
      override x.Render  = Some(fun worker -> 
                                let name = worker.InPorts.[0].String 
                                let boolView = worker.InPorts.[1].BooleanView
                                Doc.ButtonView name [] boolView (fun state -> worker.OutPorts.[0].Trigger (MessageBus.Boolean(state))) :> Doc
                            )