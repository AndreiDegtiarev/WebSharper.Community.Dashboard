namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.Community.Dashboard
open WebSharper.Community.Panel


[<JavaScript>]
type AppData =
    {
        PanelData:PanelData list
        Events:(string*AppModel) list
        Widgets:(string*string*AppModel) list
        Rules:RuleContainer
    }
    static member Create (dashboard:Dashboard) = 
        let (panelData,events,widgets,rules) = dashboard.Store (AppModel.FromWorker)
        {
            PanelData = panelData
            Events=events
            Widgets=widgets
            Rules = rules
        }    
    member x.Recreate (dashboard:Dashboard) =
        dashboard.Restore x.PanelData 
                          (x.Events |> List.map (fun (key,event) -> (key,event.Worker.WithStartRunner())))
                          (x.Widgets |>List.map (fun (key,keyPanel,widget) -> (key,keyPanel,widget.Worker)))
                          x.Rules
    member x.RecreateOnClient (dashboard:Dashboard) =
        dashboard.Restore x.PanelData 
                          (x.Events |> List.map (fun (key,event) -> (key,event.Worker)))
                          (x.Widgets |>List.map (fun (key,keyPanel,widget) -> (key,keyPanel,widget.Worker)))
                          x.Rules
    member x.RecreateOnServer =
        let allWorkers=(x.Events |> List.map (fun (_,event) -> event.Worker))
                       @(x.Widgets |> List.map (fun (_,_,widget) -> widget.Worker))
                       |>List.map (fun worker -> worker.WithStartRunner())
        x.Rules.Reconnect allWorkers
