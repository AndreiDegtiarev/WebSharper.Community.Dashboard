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
        inherit Worker("Text")
        let inPortNumber = new InPortNum("in Value",0.0)
        member x.Number = inPortNumber
        override x.InPorts=[inPortNumber]

        override x.Clone() = TextBox() :> Worker
    type Chart(cx,cy,chartBufferSize)= 
        inherit Worker("Chart")
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

    let render (worker:Worker) = 
        match worker with
        | :? TextBox  as txt ->  
                let strView = View.Map (fun value -> ((int)value).ToString()) (txt.Number.Value.View)
                divAttr [Attr.Class "bigvalue"] [
                                 textView strView
                ]
        | :? Chart  as chart ->  
                Renderers.ChartJs.Render(chart.Chart , Size=Size((int) chart.Cx.Value.Value, (int) chart.Cy.Value.Value))
        | _ -> div[]