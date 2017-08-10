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
    }
    interface IRunnerContext
[<JavaScript>]
type ChartRenderer =
  {
    Number:MessageBus.KeyValue
    Cx:MessageBus.KeyValue
    Cy:MessageBus.KeyValue
    ChartBufferSize:MessageBus.KeyValue
  }
  static member Create cx cy bufferSize = {
                                            Number=MessageBus.CreateNumber 0.0
                                            Cx=MessageBus.CreateNumber cx
                                            Cy=MessageBus.CreateNumber cy
                                            ChartBufferSize=MessageBus.CreateNumber bufferSize
                                          }

  static member FromPorts = (fun worker -> {
                                                 Number=worker.InPorts.[1].NumberValue
                                                 Cx=worker.InPorts.[1].NumberValue
                                                 Cy=worker.InPorts.[2].NumberValue
                                                 ChartBufferSize=worker.InPorts.[3].NumberValue
                                           })
  interface IWorkerContext with
    override x.Name = "Chart"
    override x.InPorts =  [
                             ("in Value",MessageBus.CreateNumber 0.0)
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

                                    let inPortNumber = worker.InPorts.[0].NumberVar
                                    let observe value =
                                        values.Enqueue(value)
                                        if values.Count > chartBufferSize then
                                            values.Dequeue()|>ignore
                                        values|>Seq.iteri (fun ind entry -> chart.UpdateData(ind, fun e -> entry))
                                    do View.Sink observe inPortNumber.View
                                    Some({LineChart=chart} :> IRunnerContext)
                        )
  interface IRenderer with
    override x.Render  = (fun worker -> 
                            let cx = worker.InPorts.[1].Number
                            let cy = worker.InPorts.[2].Number
                            let chart = worker.RunnerContext.Value :?> ChartRunnerContext
                            Renderers.ChartJs.Render(chart.LineChart, Size=Size((int) cx, (int) cy)) :> Doc
                             )


[<JavaScript>]
type TextBoxRenderer =
  {TextBoxValue:MessageBus.KeyValue}
  static member Create = {TextBoxValue=MessageBus.CreateNumber 0.0}
  static member FromPorts = (fun worker -> {TextBoxValue=worker.InPorts.[0].NumberValue})
  interface IWorkerContext with
    override x.Name = "Text"
    override x.InPorts =  [("in Value",x.TextBoxValue)] |> Ports.Create 
    override x.OutPorts = []

  interface IRenderer with
    override x.Render  = (fun worker -> 
                            let numValue = worker.InPorts.[0].NumberVar
                            let strView = View.Map (fun value -> ((int)value).ToString()) (numValue.View)
                            divAttr [Attr.Class "bigvalue"] [
                                             textView strView
                            ] :> Doc)


