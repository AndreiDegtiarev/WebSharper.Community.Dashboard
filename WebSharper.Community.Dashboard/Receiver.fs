namespace WebSharper.Community.Dashboard

open System
open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel
open WebSharper.Community.Dashboard
open WebSharper.Charting

[<JavaScript>]
type IReceiver=
        abstract member Render : unit->Elt
(*[<JavaScript>]
type ChartReceiver(source:ISource) =
    interface IReceiver with
        member x.Render (size:Size)  = 
            LiveChart.Line (source.Number.Publish)
            |> fun ch -> Renderers.ChartJs.Render(ch, Window = 10,Size = size) // only display 10 points of data max
            *)
[<JavaScript>]
module Receivers =
    let receiverText (viewText:View<string>) = {new IReceiver with override x.Render() = 
                                                                    divAttr [attr.``class`` "bigvalue"] [
                                                                         textView viewText
                                                                    ]
                    }
    let receiverChart (event:Event<double>) cx cy= {new IReceiver with 
                                                        override x.Render() = 
                                                            LiveChart.Line (event.Publish)
                                                            |> fun ch -> Renderers.ChartJs.Render(ch, Window = 10,Size=Size(cx, cy))
                    }