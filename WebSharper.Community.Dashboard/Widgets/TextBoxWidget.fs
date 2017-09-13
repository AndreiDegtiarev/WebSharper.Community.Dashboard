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
  static member Create = {TextBoxWidgetData = WorkerData.Create "Text" [InPortData.CreateString "in Text" "txt"] []} 
  static member FromWorker = (fun (worker:Worker) -> {TextBoxWidgetData = worker.ToData}) 
  interface IWorkerData with
    override x.Data = x.TextBoxWidgetData
    override x.Run = None
    override x.Render  = Some(fun worker -> 
                            let strView = worker.InPorts.[0].PortValue.View 
                                          |> View.Map (fun msg -> 
                                                         match msg.Value with
                                                         |MessageBus.Number(value) -> ((int)value).ToString()
                                                         |MessageBus.String(value) -> value
                                                         |MessageBus.Boolean(value) -> value.ToString()
                                                         |_ -> "Wrong port value format"
                                                      )
                            divAttr [Attr.Class "bigvalue"] [
                                             textView strView
                            ] :> Doc)

