namespace WebSharper.Community.Dashboard.Widgets

open WebSharper
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Dashboard


[<JavaScript>]
type TextBoxWidget =
    {
        TextBoxWidgetData:WorkerData
    }
    static member Create = {TextBoxWidgetData = WorkerData.Create "Text" [InPortData.CreateString "in Text" "txt"
                                                                          InPortData.CreateNumber "Width" 50.0
                                                                          InPortData.CreateNumber "Font-Size" 25.0
                                                                          InPortData.CreateSelect "Font-Family" (0, ["Courier New" ; "Segoe UI"; "Freestyle Script"])]
                                                                          []} 
    static member FromWorker = (fun (worker:Worker) -> {TextBoxWidgetData = worker.ToData}) 
    interface IWorkerData with
        override x.Data = x.TextBoxWidgetData
        override x.Run = None
        override x.Render  = Some(fun worker ->
                            let strView = worker.InPorts.[0].PortValue.View 
                                            |> View.Map (fun msg -> 
                                                            match msg.Value with
                                                            |MessageBus.Number(value) -> ((int)value).ToString()
                                                            |MessageBus.String(value) -> value
                                                            |MessageBus.Boolean(value) -> value.ToString()
                                                            |_ -> "Wrong port value format"
                                                        )
                            let widthView = worker.InPorts.[1].PortValue.View |> View.Map (fun msg -> msg.Value.AsNumber.ToString() + "px")
                            let fontSizeView = worker.InPorts.[2].PortValue.View |> View.Map (fun msg -> msg.Value.AsNumber.ToString() + "px")          
                            let fontFamilyView = worker.InPorts.[3].PortValue.View |> View.Map (fun msg -> let (ind,lst) = msg.Value.AsSelect
                                                                                                           lst.[ind])
                            divAttr [Attr.Class "bigvalue"
                                     Attr.DynamicStyle "width" widthView
                                     Attr.DynamicStyle "font-size" fontSizeView
                                     Attr.DynamicStyle "font-family" fontFamilyView
                                    ]
                                    [textView strView] :> Doc)

