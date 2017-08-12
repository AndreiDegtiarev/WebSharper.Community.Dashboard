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
    Number:MessageBus.KeyValue
    Cx:MessageBus.KeyValue
    Cy:MessageBus.KeyValue
    ChartBufferSize:MessageBus.KeyValue
  }
  static member Create cx cy bufferSize = {
                                            Name = "Chart"
                                            Number=MessageBus.CreateNumber 0.0
                                            Cx=MessageBus.CreateNumber cx
                                            Cy=MessageBus.CreateNumber cy
                                            ChartBufferSize=MessageBus.CreateNumber bufferSize
                                          }

  static member FromPorts = (fun worker -> {
                                                 Number=worker.InPorts.[0].NumberValue
                                                 Cx=worker.InPorts.[1].NumberValue
                                                 Cy=worker.InPorts.[2].NumberValue
                                                 ChartBufferSize=worker.InPorts.[3].NumberValue
                                                 Name = worker.Name.Value
                                           })
  interface IWorkerContext with
    override x.Name = x.Name
    override x.InPorts =  [
                             (" in Value",MessageBus.CreateNumber 0.0)
                             ("cx", x.Cx)
                             ("cy", x.Cy)
                             ("BufferSize", x.ChartBufferSize)
                          ]|>Ports.Create
    override x.OutPorts = []
  interface IRunner with
    override x.Run = (fun worker ->
                                    let chartBufferSize = (int) worker.InPorts.[3].Number
                                    let data = [for x in 0 .. chartBufferSize-1 -> (0.0)]
                                    let values = let queue=Queue<double>()
                                                 data|>Seq.iter (fun entry -> queue.Enqueue(entry))
                                                 queue
                                    let chart = Charting.Chart.Line(data).WithFillColor(Color.Name "white")

                                    Some({LineChart=chart;Queue=values} :> IRunnerContext)
                        )
  interface IRenderer with
    override x.Render  = (fun worker ->
                            let chartBufferSize = (int) worker.InPorts.[3].Number
                            let context = worker.RunnerContext.Value :?> ChartRunnerContext

                            let inPortNumber = worker.InPorts.[0].NumberVar
                            let observe value =
                                context.Queue.Enqueue(value)
                                if context.Queue.Count > chartBufferSize then
                                    context.Queue.Dequeue()|>ignore
                                context.Queue|>Seq.iteri (fun ind entry -> context.LineChart.UpdateData(ind, fun e -> entry))
                            do View.Sink observe inPortNumber.View
     
                            let cx = worker.InPorts.[1].Number
                            let cy = worker.InPorts.[2].Number
                            let chart = worker.RunnerContext.Value :?> ChartRunnerContext
                            Renderers.ChartJs.Render(chart.LineChart, Size=Size((int) cx, (int) cy)) :> Doc
                             )


[<JavaScript>]
type TextBoxRenderer =
  {
    Name:string
    TextBoxValue:MessageBus.KeyValue
  }
  static member Create = {Name="Text";TextBoxValue=MessageBus.CreateNumber 0.0}
  static member FromPorts = (fun worker -> {TextBoxValue=worker.InPorts.[0].NumberValue;Name = worker.Name.Value})
  interface IWorkerContext with
    override x.Name = x.Name
    override x.InPorts =  [("in Value",x.TextBoxValue)] |> Ports.Create 
    override x.OutPorts = []

  interface IRenderer with
    override x.Render  = (fun worker -> 
                            let numValue = worker.InPorts.[0].NumberVar
                            let strView = View.Map (fun value -> ((int)value).ToString()) (numValue.View)
                            divAttr [Attr.Class "bigvalue"] [
                                             textView strView
                            ] :> Doc)


