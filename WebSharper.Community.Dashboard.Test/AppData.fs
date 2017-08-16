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
        Events:(string*((string*AppModel) list)) list
        Widgets:(string*(PanelData list)*((string*string*AppModel) list)) list
        Rules:(string*RuleContainer) list
    }
    member x.RecreateEvents fnc = 
        x.Events |> List.map (fun (grName,gr) -> (grName,gr|>List.map (fun (key,event) -> (key,event.Worker |> fnc))))
    member x.RecreateWidgets = 
        x.Widgets |> List.map (fun (grName,panelData,gr) -> (grName,panelData,gr|>List.map (fun (key,keyPanel,widget) -> (key,keyPanel,widget.Worker))))
    static member Create (dashboard:Dashboard) = 
        let (events,widgets,rules) = dashboard.Store (AppModel.FromWorker)
        {
            Events=events
            Widgets=widgets
            Rules = rules
        }    
    member x.Recreate (dashboard:Dashboard) panelContainerCreator=
        dashboard.Restore panelContainerCreator
                          (x.RecreateEvents (fun worker -> worker.WithStartRunner()))
                          (x.RecreateWidgets)
                          x.Rules
    member x.RecreateOnClient (dashboard:Dashboard) panelContainerCreator=
        MessageBus.Role <- MessageBus.Client
        MessageBus.Agent.Post(MessageBus.RegisterServerCallback(MessageBus.SendToServer))
        dashboard.Restore panelContainerCreator 
                          (x.RecreateEvents (fun worker -> worker))
                          (x.RecreateWidgets)
                          x.Rules
    member x.RecreateOnServer =
        let allEvents =  (x.RecreateEvents(fun worker -> worker))  |> List.map (fun (_,gr)->gr) |> List.concat |> List.map (fun (_,gr)->gr)
        let allWidgets = x.RecreateWidgets |> List.map (fun (_,_,gr)->gr) |> List.concat |> List.map (fun (_,_,gr)->gr)
        let allWorkers = allEvents@allWidgets |> List.map (fun worker -> worker.WithStartRunner())
        x.Rules |> List.iter (fun (grName,rules) -> allWorkers |> rules.Reconnect)
