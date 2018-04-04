namespace WebSharper.Community.Dashboard.Widgets

open System
open WebSharper
open WebSharper.UI
open WebSharper.UI.Client
open WebSharper.UI.Html
open WebSharper.Community.Dashboard

[<JavaScript>]
type GaugeWidget =
  {
      GaugeWidgetData:WorkerData
  }
  static member Create = {GaugeWidgetData = WorkerData.Create "Gauge" [InPortData.CreateNumber "Angle" 0.0][]}
                         
  static member FromWorker = (fun (worker:Worker) -> {GaugeWidgetData = worker.ToData})

  interface IWorkerData with
      override x.Data = x.GaugeWidgetData
      override x.Run  = None
      override x.Render  =  Some (fun worker -> let radius = "80" //rx = ry = 80.0
                                                let (center_x, center_y) = (100.0, 100.0) // center of circle
                                                let find_coordinates angle =
                                                  let angle_in_radians = angle * Math.PI / 180.0
                                                  let x = (center_x + Double.Parse(radius) * Math.Cos angle_in_radians).ToString()
                                                  let y = (center_y - Double.Parse(radius) * Math.Sin angle_in_radians).ToString()
                                                  (x,y)
                                                let fixed_values = 
                                                      let (x, y) = find_coordinates 180.0
                                                      "M" + x + "," + y + "A" + radius + "," + radius + "," + "0, 0 , 1," //fixed values for d attribute
                                                let variable_param (end_coordinates:double)=
                                                      let (x, y) =  find_coordinates end_coordinates
                                                      fixed_values + x + "," + y 
                                                let setColor angle =
                                                  match angle with
                                                      | 90.0 -> "yellow"
                                                      | angle when angle <= 90.0 -> "orange"
                                                      | angle when angle > 90.0-> "red"
                                                      | _ -> ""
                                                let gaugeColorView = worker.InPorts.[0].PortValue.View |> View.Map (fun msg -> setColor (msg.Value.AsNumber))
                                                worker.InPorts.[0].PortValue.View |> View.Map (fun msg -> 
                                                                Doc.SvgElement "svg" [] 
                                                                  [  
                                                                     Doc.SvgElement "path" [SvgAttributes.d (variable_param 0.0)
                                                                                            Attr.Style "stroke" "whitesmoke"
                                                                                            Attr.Style "stroke-width" "30"
                                                                                            Attr.Style "fill" "none"
                                                                                           ][]
                                                                     Doc.SvgElement "path" [SvgAttributes.d (variable_param (180.0 - msg.Value.AsNumber))
                                                                                            Attr.DynamicStyle "stroke" gaugeColorView
                                                                                            Attr.Style "stroke-width" "30"
                                                                                            Attr.Style "fill" "none"
                                                                                           ][]
                                                                  ])|> Doc.EmbedView)