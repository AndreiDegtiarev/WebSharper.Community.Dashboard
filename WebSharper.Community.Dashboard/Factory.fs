namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html

(*
[<JavaScript>]
type AllTypes =
|RandomSource of (Var<string> * IInPort list * IOutPort list * Sources.RandomRunner)
|TextWidget   of (Var<string> * IInPort list * IOutPort list * Widgets.TextBoxRenderer)   
 
[<JavaScript>]
module Helper =
    let Worker worker =      
        match worker with 
        |RandomSource(name,iPorts,oPorts,runner) -> MakeWorker.WorkerSrc name iPorts oPorts runner {Sources.RandomRunner="RandomRunner";Sources.MiddleValue=50.0;Sources.Dispersion = 5.0}    
        |TextWidget(name,iPorts,oPorts,renderer) -> MakeWorker.Worker name iPorts oPorts Widgets.EmptyRunner.Create renderer {Widgets.TextBoxRenderer="bla"}
    let Clone worker =
        let clone (name:Var<string>)= Var.Create name.Value
        let cloneIPort (ports:IInPort list) = ports |> List.map (fun port -> {port with Value=Ports.Clone port})
        let cloneOPort (ports:IOutPort list) = ports |> List.map (fun port -> Ports.CloneO port)
        match worker with 
        |RandomSource(name,iPorts,oPorts,runner) -> RandomSource(clone name,cloneIPort iPorts,cloneOPort oPorts,runner)   
        |TextWidget(name,iPorts,oPorts,renderer) ->   TextWidget(clone name,cloneIPort iPorts,cloneOPort oPorts,renderer) 
        *)
[<JavaScript>]
type WorkerItem =
    {
        Key:Key
        Worker : IWorker
    }
    static member Create  worker=
        {
            Key=Key.Fresh()
            Worker = worker
        }
[<JavaScript>]
type Factory =
    {
        EventItems : ListModel<Key,WorkerItem>
        WidgetItems : ListModel<Key,WorkerItem>
    }
    static member Create =
        {
           EventItems = ListModel.Create (fun item ->item.Key) []
           WidgetItems = ListModel.Create (fun item ->item.Key) []
        }
    member x.RegisterWidget widget = 
        x.WidgetItems.Add (WorkerItem.Create widget)
    member x.RegisterEvent event = 
        x.EventItems.Add (WorkerItem.Create event)
