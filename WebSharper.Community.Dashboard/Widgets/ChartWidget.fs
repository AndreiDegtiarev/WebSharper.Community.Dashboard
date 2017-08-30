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
        Source : Event<float>
    }
    interface IRunnerContext
[<JavaScript>]
type ChartWidget =
  {
      ChartWidgetData:WorkerData
  }
  static member Create  = 
          let bufferSize = 20
          {
                       ChartWidgetData =  WorkerData.CreateWithCache "Chart" 
                                                   [(" in Value",MessageBus.NumberMessage 100.0,bufferSize)
                                                    ("cx",MessageBus.NumberMessage 300.0,1)
                                                    ("cy",MessageBus.NumberMessage 150.0,1)
                                                    ("BufferSize",MessageBus.NumberMessage ((float)bufferSize),1)
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
                                    //let chart = Charting.Chart.Line(data).WithFill(false).WithStrokeColor(Color.Hex "#FB8C00").WithPointColor(Color.Name "black")
                                    let inPortNumberView = worker.InPorts.[0].NumberView
                                    let src = Event<float>()
                                    let observe value =
                                        src.Trigger value
                                    do View.Sink observe inPortNumberView
                                    let chart = (LiveChart.Line src.Publish).WithFill(false).WithStrokeColor(Color.Hex "#FB8C00").WithPointColor(Color.Name "black")

                                    Some({LineChart=chart;Queue=values;Source = src} :> IRunnerContext)
                        )
    override x.Render  = Some(fun worker ->
                            let chartBufferSize = (int) worker.InPorts.[3].Number
                            let context = worker.RunnerContext.Value.Value :?> ChartWidgetContext
                            let config = ChartJs.CommonChartConfig(Title=ChartJs.TitleConfig(Display = false),
                                                                   Legend = ChartJs.LegendConfig(Display = false),
                                                                   Elements = ChartJs.ElementConfig(Point=ChartJs.PointConfig(Radius = 0.0)
                                                                                                    ,Line = ChartJs.LineConfig(BorderWidth = 1.0)
                                                                                                   )
                                                                   )
                            let cx = worker.InPorts.[1].Number
                            let cy = worker.InPorts.[2].Number

                            context.LineChart|> fun ch -> Renderers.ChartJs.Render(ch, Window = chartBufferSize,Size=Size((int) cx, (int) cy),Config=config)  :> Doc// only display 10 points of data max
//                            let chart = worker.RunnerContext.Value.Value :?> ChartWidgetContext
//
//                            let inPortNumberView = worker.InPorts.[0].NumberView
//                            let observe value =
//                                chart.Queue.Enqueue(value)
//                                if chart.Queue.Count > chartBufferSize then
//                                    chart.Queue.Dequeue()|>ignore
//                                chart.Queue|>Seq.iteri (fun ind entry -> chart.LineChart.UpdateData(ind, fun e -> entry))
//                            do View.Sink observe inPortNumberView
//     
//                            Renderers.ChartJs.Render(chart.LineChart, Size=Size((int) cx, (int) cy),Config=config) :> Doc
                             )

