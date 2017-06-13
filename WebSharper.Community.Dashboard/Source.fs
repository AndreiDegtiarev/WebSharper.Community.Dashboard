namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next


[<JavaScript>]
type ISource =
    abstract member Number : Event<double>
    abstract member String : Event<string>
    abstract member Run:unit->unit

[<JavaScript>]
type RandomValueSource =
    {
        NumberEvent:Event<double>
        StringEvent:Event<string>
    }
    static member Create =
        {
            NumberEvent=new Event<double>()
            StringEvent=new Event<string>()
        }

    interface ISource with 
        member x.Number = x.NumberEvent
        member x.String = x.StringEvent
        member x.Run()=
            let rnd = System.Random()
            async {
                while true do
                    do! Async.Sleep 600
                    let d = rnd.NextDouble() * 300.
                    //Console.Log "Value generated"
                    x.NumberEvent.Trigger d
                    x.StringEvent.Trigger (((int)d).ToString())
            }
            |> Async.Start

