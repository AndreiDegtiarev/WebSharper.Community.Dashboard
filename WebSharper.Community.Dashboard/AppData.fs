namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.Community.Dashboard
open WebSharper.Community.Panel

[<JavaScript>]
module internal AppDataHelper =

    let RecreateEvents  toWorker events = events |> List.map (fun (grName,gr) -> (grName,gr|>List.map (fun (key,event) -> (key,event |> toWorker))))

    let RecreateWidgets toWorker widgets = widgets |> List.map (fun (grName,panelData,gr) -> (grName,panelData,gr|>List.map (fun (key,keyPanel,widget) -> (key,keyPanel,widget |> toWorker))))

    let RecreateOnClient eventsStarter (dashboard:Dashboard) panelContainerCreator  toWorker config=
        let (events,widgets,rules) = config
        Environment.Role <- Environment.Client
        MessageBus.Agent.Post(MessageBus.RegisterServerCallback(MessageBus.SendToServer))
        let (allEvents,allWidgets) =
            dashboard.Restore panelContainerCreator 
                              (events |> RecreateEvents toWorker)
                              (widgets |> RecreateWidgets toWorker)
                              rules
        allEvents |> List.iter eventsStarter


    let RecreateEventsOnServer toWorker events =         
        events 
        |> RecreateEvents toWorker 
        |> List.map (fun (_,gr)->gr) |> List.concat |> List.map (fun (_,gr)->gr) 

    let RecreatWidgetsOnServer toWorker widgets = 
        widgets 
        |> RecreateWidgets  toWorker
        |> List.map (fun (_,_,gr)->gr) |> List.concat |> List.map (fun (_,_,gr)->gr)
        


[<JavaScript>]
type AppData<'a> =
    {
        Events:(string*((string*'a) list)) list
        Widgets:(string*(PanelData list)*((string*string*'a) list)) list
        Rules:(string*RuleContainer) list
    }
    static member empty() = 
        {
            Events = []
            Widgets = []
            Rules = []
        }
    static member Create (dashboard:Dashboard) fromWorker= 
        let (events,widgets,rules) = dashboard.Store (fromWorker)
        {
            Events=events
            Widgets=widgets
            Rules = rules
        }
    member x.RecreateOnClientEventsNotRunning (dashboard:Dashboard) panelContainerCreator  toWorker = 
            AppDataHelper.RecreateOnClient (fun (worker:Worker) -> ()) (dashboard:Dashboard) panelContainerCreator  toWorker (x.Events,x.Widgets,x.Rules)
    member x.RecreateOnClientEventsRunning (dashboard:Dashboard) panelContainerCreator  toWorker = 
            AppDataHelper.RecreateOnClient (fun (worker:Worker) -> worker.StartRunner()) (dashboard:Dashboard) panelContainerCreator  toWorker  (x.Events,x.Widgets,x.Rules)
    member x.RecreateOnServer json toWorker=
        let allEvents = x.Events |> AppDataHelper.RecreateEventsOnServer toWorker 
        let allWidgets = x.Widgets |> AppDataHelper.RecreatWidgetsOnServer toWorker
        let allWorkers = allEvents@allWidgets //|> List.map (fun (worker:Worker) -> worker.WithStartRunner())
        x.Rules |> List.iter (fun (grName,rules:RuleContainer) -> allWorkers |> rules.Reconnect)
        allWorkers |> List.iter (fun worker -> worker.StartRunner() |> ignore)
        let msgValue = MessageBus.System(MessageBus.UpdateConfiguration(json))
        MessageBus.Send((MessageBus.CreateMessage msgValue).WithKey("system")) |> MessageBus.Agent.Post
        allEvents