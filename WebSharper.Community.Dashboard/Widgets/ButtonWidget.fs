namespace WebSharper.Community.Dashboard.Widgets

open WebSharper
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Dashboard

[<JavaScript>]
type ButtonWidget =
  {
      ButtonWidgetData:WorkerData
  }
  static member Create = {ButtonWidgetData = WorkerData.Create "Button" [("Caption",MessageBus.StringMessage "Button")
                                                                         ("State",MessageBus.NumberMessage 0.0)
                                                                        ][("Button value",MessageBus.NumberMessage 0.0)]}
                         
  static member FromWorker = (fun (worker:Worker) -> {ButtonWidgetData = worker.ToData})

  interface IWorkerData with
      override x.Data = x.ButtonWidgetData
      override x.Run  = None
      override x.Render  = Some(fun worker -> 
                                let name = worker.InPorts.[0].String 
                                let boolView = worker.InPorts.[1].BooleanView
                                Doc.ButtonView name [] boolView (fun state -> worker.OutPorts.[0].Trigger (MessageBus.Boolean(state))) :> Doc
                            )