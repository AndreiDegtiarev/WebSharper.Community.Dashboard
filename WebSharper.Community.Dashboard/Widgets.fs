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
    Name:string
    Number:MessageBus.Message
    Cx:MessageBus.Message
    Cy:MessageBus.Message
    ChartBufferSize:MessageBus.Message
  }
  static member Create cx cy bufferSize = {
                                            Name = "Chart"
                                            Number=MessageBus.CreateNumber 0.0
                                            Cx=MessageBus.CreateNumber cx
                                            Cy=MessageBus.CreateNumber cy
                                            ChartBufferSize=MessageBus.CreateNumber bufferSize
                                          }

  static member FromPorts = (fun worker -> {
                                                 Number=worker.InPorts.[0].PortValue.Value
                                                 Cx=worker.InPorts.[1].PortValue.Value
                                                 Cy=worker.InPorts.[2].PortValue.Value
                                                 ChartBufferSize=worker.InPorts.[3].PortValue.Value
                                                 Name = worker.Name.Value
                                           })
  interface IWorkerContext with
    override x.Name = x.Name
    override x.InPorts =  [
                             (" in Value",x.Number,(int)x.ChartBufferSize.Value.AsNumber)
                             ("cx", x.Cx,1)
                             ("cy", x.Cy,1)
                             ("BufferSize", x.ChartBufferSize,1)
                          ]|>Ports.CreateWithCache
    override x.OutPorts = []
  interface IRunner with
    override x.Run = (fun worker ->
                                    let chartBufferSize = (int) worker.InPorts.[3].Number
                                    let data = [for x in 0 .. chartBufferSize-1 -> (0.0)]
                                    let values = let queue=Queue<double>()
                                                 data|>Seq.iter (fun entry -> queue.Enqueue(entry))
                                                 queue
                                    let chart = Charting.Chart.Line(data).WithFill(false).WithStrokeColor(Color.Hex "#FB8C00").WithPointColor(Color.Name "black")

                                    Some({LineChart=chart;Queue=values} :> IRunnerContext)
                        )
  interface IRenderer with
    override x.Render  = (fun worker ->
                            let chartBufferSize = (int) worker.InPorts.[3].Number
                            let context = worker.RunnerContext.Value :?> ChartRunnerContext

                            let inPortNumberView = worker.InPorts.[0].NumberView
                            let observe value =
                                context.Queue.Enqueue(value)
                                if context.Queue.Count > chartBufferSize then
                                    context.Queue.Dequeue()|>ignore
                                context.Queue|>Seq.iteri (fun ind entry -> context.LineChart.UpdateData(ind, fun e -> entry))
                            do View.Sink observe inPortNumberView
     
                            let cx = worker.InPorts.[1].Number
                            let cy = worker.InPorts.[2].Number
                            let chart = worker.RunnerContext.Value :?> ChartRunnerContext
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
    Name:string
    TextBoxValue:MessageBus.Message
  }
  static member Create = {Name="Text";TextBoxValue=MessageBus.CreateNumber 0.0}
  static member FromPorts = (fun worker -> {TextBoxValue=worker.InPorts.[0].PortValue.Value;Name = worker.Name.Value})
  interface IWorkerContext with
    override x.Name = x.Name
    override x.InPorts =  [("in Value",x.TextBoxValue)] |> Ports.Create 
    override x.OutPorts = []

  interface IRenderer with
    override x.Render  = (fun worker -> 
                            let strView = worker.InPorts.[0].NumberView |> View.Map (fun value -> ((int)value).ToString())
                            divAttr [Attr.Class "bigvalue"] [
                                             textView strView
                            ] :> Doc)

[<JavaScript>]
type ButtonRenderer =
  {
    Name:string
    ButtonName:MessageBus.Message
    State:MessageBus.Message
    OutPortKey:string
  }
  static member Create = {Name="Button";
                          ButtonName=MessageBus.CreateString "Button"
                          State=MessageBus.CreateNumber 0.0
                          OutPortKey=Helper.UniqueKey()
                          }
  static member FromPorts = (fun worker -> {ButtonName=worker.InPorts.[0].PortValue.Value
                                            State = worker.InPorts.[1].PortValue.Value
                                            OutPortKey=worker.OutPorts.[0].Key
                                            Name = worker.Name.Value})
  interface IWorkerContext with
    override x.Name = x.Name
    override x.InPorts =  [("Caption",x.ButtonName)
                           ("State",x.State)] |> Ports.Create 
    override x.OutPorts = [OutPort.CreateNumber x.OutPortKey "Button value"]

  interface IRenderer with
    override x.Render  = (fun worker -> 
                            let name = worker.InPorts.[0].String 
                            let boolView = worker.InPorts.[1].BooleanView
                            Doc.ButtonView name [] boolView (fun state -> worker.OutPorts.[0].Trigger (MessageBus.Boolean(state))) :> Doc
                            )

