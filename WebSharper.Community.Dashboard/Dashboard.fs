namespace WebSharper.Community.Dashboard

open System
open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel
open WebSharper.Community.PropertyGrid
 
[<JavaScript>]
module internal DshHelper = 
    let PanelGroupCreator data panelContainerCreator= (fun _ ->
                                     let number = (data.WidgetGroups |> List.ofSeq  |> List.length) + 1
                                     let panelContainer = panelContainerCreator()
                                     let grItem = WidgetsGroupItem.Create ("panel"+(number.ToString())) panelContainer
                                     data.WidgetGroups.Add(grItem)
                                     grItem :> ISelectorItem)
    let EventsGroupCreator data propertyGrid= (fun _ ->
                                 let number = (data.EventGroups |> List.ofSeq  |> List.length) + 1
                                 let grItem = EventsGroupItem.Create ("event"+(number.ToString())) propertyGrid
                                 data.EventGroups.Add(grItem)
                                 grItem :> ISelectorItem)
    let RulesGroupCreator data = (fun _ -> 
                                let number = (data.RulesGroups |> List.ofSeq  |> List.length) + 1
                                let grItem = RulesGroupItem.Create ("rules"+(number.ToString())) (RulesEditor.Render data)
                                data.RulesGroups.Add(grItem)
                                //(Var.Create "rules1",renderer data)
                                grItem :> ISelectorItem)

type DashboardMode =
|DashboardRun
|DashboardEdit

[<JavaScript>]
type Dashboard =
    {
        Factory : Factory
        Data:DshData
        PropertyGrid : PropertyGrid
        Dialog : Dialog
        EditorSelectorRun : WindowSelector
        EditorSelectorEdit : WindowSelector
        Mode:Var<DashboardMode>
        PanelTitleVisibility:Var<bool>
    }
    static member Create (panelContainerCreator:(unit->PanelContainer))=
        let dialog = Dialog.Create
        let data = DshData.Create
        let propertyGrid = PropertyGrid.Create
        let editorSelectorRun = WindowSelector.Create
        let editorSelectorEdit = WindowSelector.Create
                                   .WithGroupOnClick(fun gr -> //Environment.Log "WithGroupOnClick"
                                                               gr.SelectorItems |> List.ofSeq |> List.mapi (fun ind item -> Properties.string ((ind+1).ToString()) item.Name) |> propertyGrid.Edit)
                                   .WithItemOnSelected(fun item -> //Environment.Log "WithItemOnSelected"
                                                                   List.empty |> propertyGrid.Edit)
                                   .WithItemOnCreated(fun grInd item -> if grInd = 0 then (editorSelectorRun.SelectorGroups |> List.ofSeq |> List.head).SelectorItems.Add(item)) 
                                   .WithItemOnDeleted(fun _ _ -> ())
                                   .WithItemOnDeleted(fun grInd item -> 
                                                                   match item with
                                                                   | :? WidgetsGroupItem as gr -> data.WidgetGroups.Remove(gr)
                                                                   | :? EventsGroupItem as gr -> data.EventGroups.Remove(gr)
                                                                   | :? RulesGroupItem as gr -> data.RulesGroups.Remove(gr)
                                                                   | _ -> failwith "WithItemOnDeleted, type unknown"
                                                                   if grInd = 0 then (editorSelectorRun.SelectorGroups |> List.ofSeq |> List.head).SelectorItems.Remove(item))
                                   .WithItemOnMove(fun grInd item direction -> 
                                                                let isDown = 
                                                                    match direction with
                                                                    |MoveUp -> false
                                                                    |MoveDown -> true
                                                                match item with
                                                                | :? WidgetsGroupItem as gr -> Helper.MoveItemInModelList data.WidgetGroups isDown gr
                                                                                               Helper.MoveItemInModelList (editorSelectorRun.SelectorGroups |> List.ofSeq |> List.head).SelectorItems isDown item
                                                                | :? EventsGroupItem as gr -> Helper.MoveItemInModelList data.EventGroups isDown gr
                                                                | :? RulesGroupItem as gr -> Helper.MoveItemInModelList data.RulesGroups isDown gr
                                                                | _ -> failwith "WithItemOnDeleted, type unknown"
                                   )
                                   .WithControls(true)
        let panelGroupCreator = DshHelper.PanelGroupCreator data panelContainerCreator
        let firstPanel = panelGroupCreator()
        editorSelectorEdit.AppenGroup "Panels" [firstPanel] (Some(panelGroupCreator))
        editorSelectorRun.AppenGroup "Panels" [firstPanel] None

        let eventsGroupCreator = DshHelper.EventsGroupCreator data propertyGrid
        editorSelectorEdit.AppenGroup "Events" [eventsGroupCreator()] (Some(eventsGroupCreator))

        let rulesGroupCreator = DshHelper.RulesGroupCreator data
        editorSelectorEdit.AppenGroup "Rules" [rulesGroupCreator()] (Some(rulesGroupCreator))
        editorSelectorEdit.OptSelectedItem.Value <- Some((editorSelectorEdit.GroupByIndex 0).SelectorItems |> List.ofSeq |> List.head)
        editorSelectorRun.OptSelectedItem.Value <- Some((editorSelectorRun.GroupByIndex 0).SelectorItems |> List.ofSeq |> List.head)
        {
           Factory = Factory.Create
           Data = data
           Dialog = dialog
           PropertyGrid = propertyGrid
           EditorSelectorEdit = editorSelectorEdit
           EditorSelectorRun = editorSelectorRun
           Mode = Var.Create DashboardRun
           PanelTitleVisibility=Var.Create false
        }

    member x.RegisterWidget key group panelKey (toPanelContainer:PanelContainer) worker = 
        x.Data.RegisterWidget key group panelKey worker 
        let panel = Panel.Create
                         .WithPanelContent(worker.Render)
        panel.IsWithTitle.Value <- false
        toPanelContainer.AddPanel panel
    member x.CreatePanel(group,name,?key) = //,?afterRenderFnc) = 
        let renderWidgets= group.WidgetItems.View
                           |> Doc.BindSeqCachedBy group.WidgetItems.Key (fun item-> 
                                                                                let nameView = item.Widget.Name.View
                                                                                div[textView nameView])           

        let keyDef = defaultArg key (System.Guid.NewGuid().ToString())
        let childContainerContent = PanelContainer.Create
                                                  .WithLayoutManager(LayoutManagers.StackPanelLayoutManager)
                                                  .WithAttributes([Attr.Style "display" "flex"]) 
        let panel = Panel.Create
                         .WithKey(keyDef)
                         .WithPannelAttrs([//Attr.Style "Width" (cx.ToString()+"px")
                                           Attr.Style "position" "absolute"
                                           Attr.Style "Background" "#2a2a2a"
                                          ])
                         .WithTitle(x.PanelTitleVisibility)
                         .WithTitleContent(text (name))
                         .WithTitleButtons(
                                      [
                                        {Icon="add";Action=(fun panel->(
                                                                        let items = x.Factory.WidgetItems|>List.ofSeq
                                                                        let selected=Var.Create (items.Head)
                                                                        x.Dialog.ShowDialog "Select widget" (div[Doc.Select [Attr.Class "form-control"] (fun item -> item.Worker.Name.Value) items selected])
                                                                                                             (fun _ -> 
                                                                                                                Console.Log("Dialog.IsOK")
                                                                                                                let widget = selected.Value.Worker.Clone
                                                                                                                widget.StartRunner()
                                                                                                                x.RegisterWidget (Helper.UniqueKey()) group panel.Key panel.Children widget
                                                                                                             )
                                                                       ))}
                                        {Icon="edit"; Action=(fun panel->Console.Log("Edit")
                                                                         group.WidgetItems 
                                                                         |> List.ofSeq 
                                                                         |> List.filter (fun item-> item.Panel = panel.Key)
                                                                         |> List.map (fun item -> item.Widget.Properties)
                                                                         |> List.concat
                                                                         |> x.PropertyGrid.Edit)}
                                        {Icon="clear";Action=(fun panel->group.PanelContainer.PanelItems.Remove(group.PanelContainer.FindPanelItem panel)
                                                                         group.WidgetItems.RemoveBy(fun item -> item.Panel = panel.Key)
                                                             )}
                                      ])
                          .WithChildPanelContainer(childContainerContent)
        group.PanelContainer.AddPanel panel
        panel  
    member x.Store fncFromWorkerOpt  =
        let fncFromWorker  acc (worker:Worker)= 
            match fncFromWorkerOpt worker with
            |Some(appModel) -> (worker.Key,appModel)::acc
            |None -> acc
        let fncFromWidget  acc panel (widget:Worker)= 
            match fncFromWorkerOpt widget with
            |Some(appModel) -> (widget.Key,panel,appModel)::acc
            |None -> acc
        let events=x.Data.EventGroups|> List.ofSeq |> List.map (fun gr -> (gr.Name.Value,gr.EventItems |>List.ofSeq |> List.fold (fun acc item ->  fncFromWorker acc item.Worker)[] |> List.rev))
        let widgets=x.Data.WidgetGroups|> List.ofSeq |> List.map (fun gr ->
                           let panelData = gr.PanelContainer.PanelItems |>List.ofSeq |>List.map (fun panel -> panel.PanelData)
                           (gr.Name.Value,panelData,gr.WidgetItems |>List.ofSeq |> List.fold (fun acc item ->  fncFromWidget acc item.Panel item.Widget)[] |> List.rev))
        let rules = x.Data.RulesGroups|> List.ofSeq |> List.map (fun gr ->
                           (gr.Name.Value,RulesEditor.CopyToRules gr.RulesRowItems))
        (events,widgets,rules)

    member x.Restore panelCreator events widgets rules =
        MessageBus.Agent.Post MessageBus.Stop
        x.EditorSelectorRun.ClearGroups()
        x.EditorSelectorEdit.ClearGroups()
        x.Data.Clear
        List.empty |> x.PropertyGrid.Edit

        let gSelectorPanelsRun=x.EditorSelectorRun.GroupByIndex 0
        let gSelectorPanelsEdit=x.EditorSelectorEdit.GroupByIndex 0
        let gSelectorEvents=x.EditorSelectorEdit.GroupByIndex 1
        let gSelectorRules=x.EditorSelectorEdit.GroupByIndex 2
        widgets |> List.iteri (fun ind (grName,panelList,gr) -> 
                                let item = DshHelper.PanelGroupCreator x.Data panelCreator ()
                                item.Name.Value <- grName
                                gSelectorPanelsEdit.SelectorItems.Add (item)
                                gSelectorPanelsRun.SelectorItems.Add (item)
                                let grItem = x.Data.WidgetGroups |> List.ofSeq |> List.item ind
                                panelList
                                |> List.iter(fun (panelConfig:PanelData) -> 
                                                     let panel = x.CreatePanel(grItem,"Panel",panelConfig.Key)
                                                     panel.Left.Value <- panelConfig.Left
                                                     panel.Top.Value <- panelConfig.Top
                                            )
                                gr |> List.iter (fun (key,panelKey,widget:Worker) ->        
                                                    let panel = grItem.PanelContainer.PanelItems |>List.ofSeq |> List.find (fun entry -> entry.Key = panelKey)
                                                    x.RegisterWidget key grItem panelKey panel.Children (widget.StartRunner()
                                                                                                         widget)))
        Console.Log("Widgets restored")   
        events |> List.iteri (fun ind (grName,gr) -> 
                                let item = DshHelper.EventsGroupCreator x.Data x.PropertyGrid ()
                                item.Name.Value <- grName
                                gSelectorEvents.SelectorItems.Add (item)
                                let grItem = x.Data.EventGroups |> List.ofSeq |> List.item ind
                                gr|> List.iter (fun (key,event:Worker) -> x.Data.RegisterEvent key grItem event)) 
        Console.Log("Events restored") 
        rules |> List.iteri (fun ind (grName,rulesData) -> 
                                let item = DshHelper.RulesGroupCreator x.Data ()
                                item.Name.Value <- grName
                                gSelectorRules.SelectorItems.Add (item)
                                let grItem = x.Data.RulesGroups |> List.ofSeq |> List.item ind
                                RulesEditor.Restore x.Data grItem.RulesRowItems rulesData
                                ) 
        if x.Data.WidgetGroups.Length > 0 then
            x.EditorSelectorEdit.OptSelectedItem.Value <- Some((x.EditorSelectorEdit.GroupByIndex 0).SelectorItems |> List.ofSeq |> List.head)
            x.EditorSelectorRun.OptSelectedItem.Value <- Some((x.EditorSelectorRun.GroupByIndex 0).SelectorItems |> List.ofSeq |> List.head)
        else 
            x.EditorSelectorEdit.OptSelectedItem.Value <- None
            x.EditorSelectorRun.OptSelectedItem.Value <- None
        let allWorkers = x.Data.WorkItems |>List.ofSeq |> List.map (fun item -> item.Worker)
        rules |> List.iter (fun (grName,rules:RuleContainer) -> allWorkers |> rules.Reconnect)
        MessageBus.Agent.Post MessageBus.Start
        Console.Log("Connectors restored")   
        let allEvents = x.Data.EventGroups |> List.ofSeq |> List.map (fun gr -> gr.EventItems |> List.ofSeq |> List.map (fun item -> item.Worker)) |> List.concat
        let allWidgets = x.Data.WidgetGroups |> List.ofSeq |> List.map (fun gr -> gr.WidgetItems |> List.ofSeq |> List.map (fun item -> item.Widget)) |> List.concat

        (allEvents,allWidgets)
    member x.Render menu=
        x.Mode.View |> View.Map (fun mode -> 
          match mode with 
          |DashboardRun -> div[tableAttr[Attr.Style "White-space" "nowrap"] 
                                    [tr[
                                            tdAttr [Attr.Style "vertical-align" "top"]
                                                   [Helper.IconNormal "dehaze" (fun _ -> x.PanelTitleVisibility.Value <- true
                                                                                         x.Mode.Value <- DashboardEdit)
                                                    x.EditorSelectorRun.RenderMenu
                                                    //(if (x.EditorSelectorRun.GroupByIndex 0).SelectorItems.Length > 1 then x.EditorSelectorRun.RenderMenu else div[]) 
                                              ]
                                            td [x.EditorSelectorRun.Render] 
                                        ]
                                     ]
                              ]
          |DashboardEdit -> 
            div[
                tableAttr[Attr.Style "White-space" "nowrap"][
                    tr[
                        tdAttr [Attr.Style "vertical-align" "top"][
                            table
                                     (Seq.concat
                                        [
                                           [
                                                tr[td[Helper.IconNormal "dehaze" (fun _ ->x.PanelTitleVisibility.Value <- false 
                                                                                          x.Mode.Value <- DashboardRun)]]
                                           ]
                                           [x.EditorSelectorEdit.RenderMenu]
                                           [     
                                                tr[td[]]
                                                tr[td[x.PropertyGrid.Render]]
                                           ]
                                        ])

                          ]
                        tdAttr[Attr.Style "vertical-align" "top"][
                               menu
                               Helper.IconNormal "add" (fun _ ->
                                           let selIndex = x.EditorSelectorEdit.SelectedGroupIndex
                                           if selIndex = 1 then
                                               let items = x.Factory.EventItems|>List.ofSeq
                                               let selected=Var.Create (items.Head)
                                               x.Dialog.ShowDialog "Select source" (div[Doc.Select [Attr.Class "form-control"] (fun item -> item.Worker.Name.Value) items selected])
                                                                                        (fun _ ->  let event = selected.Value.Worker.Clone
                                                                                                   event.StartRunner()
                                                                                                   let group = x.Data.EventGroups |> List.ofSeq |> List.item (x.EditorSelectorEdit.SelectedIndexInGroup)
                                                                                                   x.Data.RegisterEvent (Helper.UniqueKey()) group event)
                                           else if selIndex = 0 then
                                               let group = x.Data.WidgetGroups |> List.ofSeq |> List.item (x.EditorSelectorEdit.SelectedIndexInGroup)
                                               let panel =x.CreatePanel(group,"Panel")
                                               panel.IsWithInitialAutoLayout.Value <- true
                                           else if selIndex = 2 then
                                               let group = x.Data.RulesGroups |> List.ofSeq |> List.item (x.EditorSelectorEdit.SelectedIndexInGroup)
                                               group.RulesRowItems.Add (RulesRowItem.Create [RulesCellItem.Create;RulesCellItem.Create]) 
                                    )
                               x.EditorSelectorEdit.Render
                           ] 
                     ]
                ]
                div[x.Dialog.Render]
             ]) |> Doc.EmbedView

