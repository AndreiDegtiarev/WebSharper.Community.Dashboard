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
        Source : Event<string*float>
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
                       ChartWidgetData =  WorkerData.Create "Chart" 
                                                   [(InPortData.CreateNumber " in Value" 100.0).WithCacheSize(bufferSize)
                                                    InPortData.CreateNumber "cx" 300.0
                                                    InPortData.CreateNumber "cy" 150.0
                                                    InPortData.CreateNumber "BufferSize" ((float)bufferSize)
                                                    InPortData.CreateSelect "X-Axis" (0,["long time";"short time";"long date";"short date"])
                                                   ]
                                                   []
          }

  static member FromWorker = (fun (worker:Worker) -> {ChartWidgetData = worker.ToData})

  interface IWorkerData with
    override x.Data = x.ChartWidgetData
    override x.Run = Some(fun worker ->
                                    let chartBufferSize = (int) worker.InPorts.[3].Number
                                    let inPortNumberView = worker.InPorts.[0].PortValue.View
                                    let src = Event<string*float>()
                                    let observe (msg:MessageBus.Message) =
                                        let (sel,_) = worker.InPorts.[4].PortValue.Value.Value.AsSelect
                                        let x_label = 
                                            match sel with
                                            |0 -> msg.Time.ToLongTimeString()
                                            |1 -> msg.Time.ToShortTimeString()
                                            |2 -> msg.Time.ToLongDateString()
                                            |3 -> msg.Time.ToShortDateString()
                                            |_ -> ""
                                        //sprintf "Chart trigger value %s %f" x_label msg.Value.AsNumber |> Environment.Log
                                        src.Trigger (x_label,msg.Value.AsNumber)
                                    let chart = (LiveChart.Line src.Publish).WithFill(false).WithStrokeColor(Color.Hex "#FB8C00").WithPointColor(Color.Name "black")
                                    do View.Sink observe inPortNumberView
                                    Some({LineChart=chart;Source = src} :> IRunnerContext)
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
                             )

