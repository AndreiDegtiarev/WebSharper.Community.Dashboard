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


(*[<JavaScript>]
module TextBoxAndChart =

    type Chart(cx,cy,chartBufferSize)= 
        inherit Widget("Chart")
        let data = [for x in 0 .. chartBufferSize-1 -> (0.0)]
        let values = let queue=Queue<double>()
                     data|>Seq.iter (fun entry -> queue.Enqueue(entry))
                     queue
        let chart = Charting.Chart.Line(data).WithFillColor(Color.Name "white")
        let inPortCx = new InPortNum("cx",cx)
        let inPortCy = new InPortNum("cy",cy)
        let inPortNumber = new InPortNum("in Value",0.0)
        let observe value =
            values.Enqueue(value)
            if values.Count > chartBufferSize then
                values.Dequeue()|>ignore
            values|>Seq.iteri (fun ind entry -> chart.UpdateData(ind, fun e -> entry))
        do View.Sink observe inPortNumber.Value.View

        member x.Chart = chart
        member x.Cx = inPortCx
        member x.Cy = inPortCy
        override x.InPorts=[inPortNumber;inPortCx;inPortCy]
        override x.Clone() = Chart(cx,cy,chartBufferSize) :> Worker 
        override x.Render() = Renderers.ChartJs.Render(x.Chart , Size=Size((int) x.Cx.Value.Value, (int) x.Cy.Value.Value)) :> Doc
*)
[<JavaScript>]
type ChartRunnerContext =
    {
        LineChart:Charts.LineChart
    }
    interface IRunnerContext
[<JavaScript>]
type ChartRenderer =
  {
    Cx:double
    Cy:double
    ChartBufferSize:int
  }
  static member Create cx cy bufferSize = {
                                            Cx=cx;Cy=cy;ChartBufferSize=bufferSize
                                          }

  interface IRunner with
    override x.Run = (fun worker ->
                                    let chartBufferSize = (int) (Ports.NumberVar worker.InPorts.[3]).Value
                                    let data = [for x in 0 .. chartBufferSize-1 -> (0.0)]
                                    let values = let queue=Queue<double>()
                                                 data|>Seq.iter (fun entry -> queue.Enqueue(entry))
                                                 queue
                                    let chart = Charting.Chart.Line(data).WithFillColor(Color.Name "white")

                                    let inPortNumber = Ports.NumberVar worker.InPorts.[0]
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
                            let cx = Ports.NumberVar worker.InPorts.[1]
                            let cy = Ports.NumberVar worker.InPorts.[2]
                            let chart = worker.RunnerContext.Value :?> ChartRunnerContext
                            Renderers.ChartJs.Render(chart.LineChart, Size=Size((int) cx.Value, (int) cy.Value)) :> Doc
                             )
  interface IWorkerContext
[<JavaScript>]
type TextBoxRenderer =
  {TextBoxRenderer:string}
  static member Create = {TextBoxRenderer="TextBoxRenderer"}
  interface IRenderer with
    override x.Render  = (fun worker -> 
                            let numValue = Ports.NumberVar worker.InPorts.[0]
                            let strView = View.Map (fun value -> ((int)value).ToString()) (numValue.View)
                            divAttr [Attr.Class "bigvalue"] [
                                             textView strView
                            ] :> Doc)
  interface IWorkerContext


