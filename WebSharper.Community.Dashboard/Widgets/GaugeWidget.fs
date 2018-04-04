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
  static member Create = {GaugeWidgetData = WorkerData.Create "Gauge" [InPortData.CreateNumber "Angle" 0.0
                                                                       InPortData.CreateNumber "Min Temp" 0.0
                                                                       InPortData.CreateNumber "Max Temp" 100.0
                                                                      ][]}
                         
  static member FromWorker = (fun (worker:Worker) -> {GaugeWidgetData = worker.ToData})

  interface IWorkerData with
      override x.Data = x.GaugeWidgetData
      override x.Run  = None
      override x.Render  =  Some (fun worker -> let radius = "80" //rx = ry = 80.0
                                                let (center_x, center_y) = (100.0, 100.0) // center of circle
                                                let FindCoordinates angle =
                                                  let angle_in_radians = angle * Math.PI / 180.0
                                                  let x = (center_x + Double.Parse(radius) * Math.Cos angle_in_radians).ToString()
                                                  let y = (center_y - Double.Parse(radius) * Math.Sin angle_in_radians).ToString()
                                                  (x,y)
                                                let FixedValues = 
                                                      let (x, y) = FindCoordinates 180.0
                                                      "M" + x + "," + y + "A" + radius + "," + radius + "," + "0, 0 , 1," //fixed values for d attribute
                                                let VariableParam (end_coordinates:double)=
                                                      let (x, y) =  FindCoordinates end_coordinates
                                                      FixedValues + x + "," + y 
                                                let SetColor angle =
                                                  match angle with
                                                      | 90.0 -> "yellow"
                                                      | angle when angle > 90.0 -> "red"
                                                      | angle when angle < 90.0 && angle > 0.0 -> "orange"
                                                      | _ -> "whitesmoke"
                                                let CalAngleForMinMaxVal value =
                                                    let minValue = worker.InPorts.[1].PortValue.Value.Value.AsNumber
                                                    let maxValue = worker.InPorts.[2].PortValue.Value.Value.AsNumber
                                                    match value with
                                                    | value when value >= maxValue -> 180.0
                                                    | value when value <= minValue -> 0.0 
                                                    |_ -> 180.0 * (value/(maxValue + minValue))
                                                let gaugeColorView = worker.InPorts.[0].PortValue.View |> View.Map (fun msg -> SetColor (CalAngleForMinMaxVal(msg.Value.AsNumber)))
                                                worker.InPorts.[0].PortValue.View |> View.Map (fun msg -> 
                                                                Doc.SvgElement "svg" [] 
                                                                  [  
                                                                     Doc.SvgElement "path" [SvgAttributes.d (VariableParam 0.0)
                                                                                            Attr.Style "stroke" "whitesmoke"
                                                                                            Attr.Style "stroke-width" "30"
                                                                                            Attr.Style "fill" "none"
                                                                                           ][]
                                                                     Doc.SvgElement "path" [SvgAttributes.d (VariableParam (180.0 - CalAngleForMinMaxVal(msg.Value.AsNumber)))
                                                                                            Attr.DynamicStyle "stroke" gaugeColorView
                                                                                            Attr.Style "stroke-width" "30"
                                                                                            Attr.Style "fill" "none"
                                                                                           ][]
                                                                     Doc.SvgElement "text" [SvgAttributes.x "20"
                                                                                            SvgAttributes.y "120"
                                                                                            SvgAttributes.textAnchor "middle"
                                                                                            Attr.Style "Stroke" "Whitesmoke"
                                                                                           ][text ((worker.InPorts.[1].PortValue.Value.Value.AsNumber).ToString())]
                                                                     Doc.SvgElement "text" [SvgAttributes.x "180"
                                                                                            SvgAttributes.y "120"
                                                                                            SvgAttributes.textAnchor "middle"
                                                                                            Attr.Style "Stroke" "Whitesmoke"
                                                                                           ][text ((worker.InPorts.[2].PortValue.Value.Value.AsNumber).ToString())]
                                                                     Doc.SvgElement "text" [SvgAttributes.x "100"
                                                                                            SvgAttributes.y "80"
                                                                                            SvgAttributes.textAnchor "middle"
                                                                                            Attr.Style "Stroke" "Whitesmoke"
                                                                                            Attr.Style "font-size" "x-large"
                                                                                           ][text ((Math.Truncate(worker.InPorts.[0].PortValue.Value.Value.AsNumber)).ToString())]
                                                                  ])|> Doc.EmbedView)