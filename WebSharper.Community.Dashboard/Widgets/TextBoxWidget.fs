namespace WebSharper.Community.Dashboard.Widgets

open WebSharper
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Dashboard

[<JavaScript>]
type TextBoxWidget =
  {
      TextBoxWidgetData:WorkerData
  }
  static member Create = {TextBoxWidgetData = WorkerData.Create "Text" [("in Value",MessageBus.NumberMessage 0.0)] []} 
  static member FromWorker = (fun (worker:Worker) -> {TextBoxWidgetData = worker.ToData}) 
  interface IWorkerData with
    override x.Data = x.TextBoxWidgetData
    override x.Run = None
    override x.Render  = Some(fun worker -> 
                            let strView = worker.InPorts.[0].NumberView |> View.Map (fun value -> ((int)value).ToString())
                            divAttr [Attr.Class "bigvalue"] [
                                             textView strView
                            ] :> Doc)

