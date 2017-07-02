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
module Widgets =
    type TextBox()= 
        let varText = Var.Create ""
        let inPortNumber = new IInPortNumber("in Value",(fun value->varText.Value<-((int)value).ToString()))
        interface IReceiver with
                        override x.Name=Var.Create "Text"
                        override x.InPorts=[inPortNumber]
                        override x.Render() = 
                                    divAttr [attr.``class`` "bigvalue"] [
                                         textView varText.View
                                    ]
                        override x.Clone() = TextBox() :> IReceiver
                        override x.Properties = []
    type Chart(cx,cy,chartBufferSize)= 
        let data = [for x in 0 .. chartBufferSize-1 -> (0.0)]
        let values = let queue=Queue<double>()
                     data|>Seq.iter (fun entry -> queue.Enqueue(entry))
                     queue
        let chart = Charting.Chart.Line(data).WithFillColor(Color.Name "white")
        let inPortNumber = new IInPortNumber("in Value",(fun value->
                                                            values.Enqueue(value)
                                                            if values.Count > chartBufferSize then
                                                                values.Dequeue()|>ignore
                                                            values|>Seq.iteri (fun ind entry -> chart.UpdateData(ind, fun e -> entry))
                                                        ))
        interface IReceiver with
                         override x.Name=Var.Create "Chart"
                         override x.InPorts=[inPortNumber]
                         override x.Render() = 
                             Renderers.ChartJs.Render(chart , Size=Size(cx, cy))
                         override x.Properties = []
                         override x.Clone() = Chart(cx,cy,chartBufferSize) :> IReceiver
