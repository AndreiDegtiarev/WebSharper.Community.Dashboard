namespace WebSharper.Community.Dashboard.Widgets

open System
open System.Collections.Generic
open WebSharper
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Charting
open WebSharper.Community.Dashboard

[<JavaScript>]
type ChartWidgetContext =
    {
        LineChart:Charts.LineChart
        Queue:Queue<double>
    }
    interface IRunnerContext
[<JavaScript>]
type ChartWidget =
  {
      ChartWidgetData:WorkerData
  }
  static member Create cx cy bufferSize = {
                           ChartWidgetData =  WorkerData.CreateWithCache "Chart" 
                                                                    [(" in Value",MessageBus.NumberMessage 100.0,(int)bufferSize)
                                                                     ("cx",MessageBus.NumberMessage cx,1)
                                                                     ("cy",MessageBus.NumberMessage cy,1)
                                                                     ("BufferSize",MessageBus.NumberMessage bufferSize,1)
                                                                    ]
                                                                    []
                                          }

  static member FromWorker = (fun (worker:Worker) -> {ChartWidgetData = worker.ToData})

  interface IWorkerData with
    override x.Data = x.ChartWidgetData
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
                            let chart = worker.RunnerContext.Value.Value :?> ChartWidgetContext

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

