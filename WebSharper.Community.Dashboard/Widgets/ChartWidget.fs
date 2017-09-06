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
        LineChart:Charts.CompositeChart<Charts.LineChart>
        Sources : Event<string*float> list
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
                                                    InPortData.CreateNumber "Number of additional ports" 0.0
                                                   ]
                                                   []
          }

  static member FromWorker = (fun (worker:Worker) ->  {ChartWidgetData = worker.ToData})

  interface IWorkerData with
    override x.Data = let chartBufferSize = (int) x.ChartWidgetData.InPorts.[3].Value.Value.AsNumber
                      let numAdditionalPorts = (int) x.ChartWidgetData.InPorts.[5].Value.Value.AsNumber
                      let resultNumberOfPorts = numAdditionalPorts + 6 
                      let inPorts = 
                          if resultNumberOfPorts < x.ChartWidgetData.InPorts.Length then
                            let (ports,_)= x.ChartWidgetData.InPorts |> List.splitAt resultNumberOfPorts
                            ports
                          else if resultNumberOfPorts > x.ChartWidgetData.InPorts.Length then
                            let startIndex = x.ChartWidgetData.InPorts.Length - 6+1
                            let newPorts = [ for i in 0..(resultNumberOfPorts - x.ChartWidgetData.InPorts.Length-1) -> (InPortData.CreateNumber (" in Value "+ (startIndex + i).ToString()) 0.0).WithCacheSize(chartBufferSize)]
                            x.ChartWidgetData.InPorts@newPorts
                          else 
                            x.ChartWidgetData.InPorts
                      {x.ChartWidgetData with InPorts = inPorts}
    override x.Run = Some(fun worker ->
                                    let chartBufferSize = (int) worker.InPorts.[3].Number
                                    //let inPortNumberView = worker.InPorts.[0].PortValue.View
                                    let numAdditionalPorts = (int) x.ChartWidgetData.InPorts.[5].Value.Value.AsNumber
                                    let srcs = List.init (numAdditionalPorts + 1) (fun ind -> Event<string*float>())
                                    let (_,ports)=worker.InPorts |> List.splitAt(6)
                                    let allSrcPorts=worker.InPorts.[0]::ports

                                    let observe port (msg:MessageBus.Message) =
                                        let (sel,_) = worker.InPorts.[4].PortValue.Value.Value.AsSelect
                                        let x_label = 
                                            match sel with
                                            |0 -> msg.Time.ToLongTimeString()
                                            |1 -> msg.Time.ToShortTimeString()
                                            |2 -> msg.Time.ToLongDateString()
                                            |3 -> msg.Time.ToShortDateString()
                                            |_ -> ""
                                        let index = allSrcPorts |> List.findIndex (fun entry -> entry = port)
                                        //sprintf "Chart trigger value %s %f" x_label msg.Value.AsNumber |> Environment.Log
                                        srcs.[index].Trigger (x_label,msg.Value.AsNumber)
                                    let charts = Chart.Combine [for src in srcs ->                                      
                                                                    (LiveChart.Line src.Publish)
                                                                     .WithFill(false)
                                                                     .WithStrokeColor(Color.Hex "#FB8C00")
                                                                     .WithPointColor(Color.Name "black")]
                                    allSrcPorts |> List.iter (fun port -> View.Sink (observe port) port.PortValue.View)
                                    //do View.Sink observe inPortNumberView
                                    Some({LineChart=charts;Sources = srcs} :> IRunnerContext)
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

