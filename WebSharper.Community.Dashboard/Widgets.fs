namespace WebSharper.Community.Dashboard

open System
open System.Collections.Generic
open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel
open WebSharper.Community.Dashboard
open WebSharper.Charting


[<JavaScript>]
type ChartRunnerContext =
    {
        LineChart:Charts.LineChart
        Queue:Queue<double>
    }
    interface IRunnerContext
[<JavaScript>]
type ChartRenderer =
  {
      ChartRendererData:WorkerData
  }
  static member Create cx cy bufferSize = {
                           ChartRendererData =  WorkerData.CreateWithCache "Chart" 
                                                                    [(" in Value",MessageBus.NumberMessage 100.0,(int)bufferSize)
                                                                     ("cx",MessageBus.NumberMessage cx,1)
                                                                     ("cy",MessageBus.NumberMessage cy,1)
                                                                     ("BufferSize",MessageBus.NumberMessage bufferSize,1)
                                                                    ]
                                                                    []
                                          }

  static member FromWorker = (fun (worker:Worker) -> {ChartRendererData = worker.ToData})

  interface IWorkerData with
    override x.Data = x.ChartRendererData
    override x.Run = Some(fun worker ->
                                    let chartBufferSize = (int) worker.InPorts.[3].Number
                                    let data = [for x in 0 .. chartBufferSize-1 -> (0.0)]
                                    let values = let queue=Queue<double>()
                                                 data|>Seq.iter (fun entry -> queue.Enqueue(entry))
                                                 queue
                                    let chart = Charting.Chart.Line(data).WithFill(false).WithStrokeColor(Color.Hex "#FB8C00").WithPointColor(Color.Name "black")

                                    Some({LineChart=chart;Queue=values} :> IRunnerContext)
                        )
    override x.Render  = Some(fun worker ->
                            let chartBufferSize = (int) worker.InPorts.[3].Number
                            let chart = worker.RunnerContext.Value.Value :?> ChartRunnerContext

                            let inPortNumberView = worker.InPorts.[0].NumberView
                            let observe value =
                                chart.Queue.Enqueue(value)
                                if chart.Queue.Count > chartBufferSize then
                                    chart.Queue.Dequeue()|>ignore
                                chart.Queue|>Seq.iteri (fun ind entry -> chart.LineChart.UpdateData(ind, fun e -> entry))
                            do View.Sink observe inPortNumberView
     
                            let cx = worker.InPorts.[1].Number
                            let cy = worker.InPorts.[2].Number
                            let config = ChartJs.CommonChartConfig(Title=ChartJs.TitleConfig(Display = false),
                                                                   Legend = ChartJs.LegendConfig(Display = false),
                                                                   Elements = ChartJs.ElementConfig(Point=ChartJs.PointConfig(Radius = 0.0)
                                                                                                    ,Line = ChartJs.LineConfig(BorderWidth = 1.0)
                                                                                                   )
                                                                   )
                            Renderers.ChartJs.Render(chart.LineChart, Size=Size((int) cx, (int) cy),Config=config) :> Doc
                             )


[<JavaScript>]
type TextBoxRenderer =
  {
      TextBoxRendererData:WorkerData
  }
  static member Create = {TextBoxRendererData = WorkerData.Create "Text" [("in Value",MessageBus.NumberMessage 0.0)] []} 
  static member FromWorker = (fun (worker:Worker) -> {TextBoxRendererData = worker.ToData}) //TextBoxValue=worker.InPorts.[0].PortValue.Value;Name = worker.Name.Value})
  interface IWorkerData with
    override x.Data = x.TextBoxRendererData
    override x.Run = None
    override x.Render  = Some(fun worker -> 
                            let strView = worker.InPorts.[0].NumberView |> View.Map (fun value -> ((int)value).ToString())
                            divAttr [Attr.Class "bigvalue"] [
                                             textView strView
                            ] :> Doc)

[<JavaScript>]
type ButtonRenderer =
  {
      ButtonRendererData:WorkerData
  }
  static member Create = {ButtonRendererData = WorkerData.Create "Button" [("Caption",MessageBus.StringMessage "Button")
                                                                           ("State",MessageBus.NumberMessage 0.0)
                                                                          ][("Button value",MessageBus.NumberMessage 0.0)]}
                         
  static member FromWorker = (fun (worker:Worker) -> {ButtonRendererData = worker.ToData})

  interface IWorkerData with
      override x.Data = x.ButtonRendererData
      override x.Run  = None
      override x.Render  = Some(fun worker -> 
                                let name = worker.InPorts.[0].String 
                                let boolView = worker.InPorts.[1].BooleanView
                                Doc.ButtonView name [] boolView (fun state -> worker.OutPorts.[0].Trigger (MessageBus.Boolean(state))) :> Doc
                            )

