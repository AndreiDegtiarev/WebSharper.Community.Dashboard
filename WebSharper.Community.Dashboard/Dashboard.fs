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
                                     (grItem.Name,panelContainer.Render))
    let EventsGroupCreator data propertyGrid= (fun _ ->
                                 let number = (data.EventGroups |> List.ofSeq  |> List.length) + 1
                                 let grItem = EventsGroupItem.Create ("event"+(number.ToString()))
                                 data.EventGroups.Add(grItem)
                                 (grItem.Name,EventsEditor.Render (grItem.EventItems) propertyGrid))
    let RulesGroupCreator data = (fun _ -> 
                                let number = (data.RulesGroups |> List.ofSeq  |> List.length) + 1
                                let grItem = RulesGroupItem.Create ("rules"+(number.ToString()))
                                data.RulesGroups.Add(grItem)
                                //(Var.Create "rules1",renderer data)
                                (grItem.Name,RulesEditor.Render data (grItem.RulesRowItems)))

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
    member x.CreatePanel(group,name,cx,?key) = //,?afterRenderFnc) = 
        let renderWidgets= group.WidgetItems.View
                           |> Doc.BindSeqCachedBy group.WidgetItems.Key (fun item-> 
                                                                                let nameView = item.Widget.Name.View
                                                                                div[textView nameView])           

        let keyDef = defaultArg key (System.Guid.NewGuid().ToString())
        let childContainerContent = PanelContainer.Create
                                                  .WithLayoutManager(LayoutManagers.StackPanelLayoutManager)
                                                  .WithAttributes([Attr.Style "border" "1px solid white"
                                                                   Attr.Style "display" "flex"
                                                                  ]) 
        let panel = Panel.Create
                         .WithKey(keyDef)
                         .WithPannelAttrs([Attr.Style "Width" (cx.ToString()+"px")
                                           Attr.Style "position" "absolute"
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
                                                                                                                x.RegisterWidget (Helper.UniqueKey()) group panel.Key  panel.Children selected.Value.Worker.CloneAndRun
                                                                                                             )
                                                                       ))}
                                        {Icon="edit"; Action=(fun panel->Console.Log("Edit")
                                                                         group.WidgetItems 
                                                                         |> List.ofSeq 
                                                                         |> List.filter (fun item-> item.Panel = panel.Key)
                                                                         |> List.map (fun item -> item.Widget.Properties)
                                                                         |> List.concat
                                                                         |> x.PropertyGrid.Edit)}
                                        {Icon="clear";Action=(fun panel->group.PanelContainer.PanelItems.Remove(group.PanelContainer.FindPanelItem panel))}
                                      ])
                          .WithChildPanelContainer(childContainerContent)
        group.PanelContainer.AddPanel panel
        panel  
    member x.Store fncFromWorker  =
            let events=x.Data.EventGroups|> List.ofSeq |> List.map (fun gr ->
                               (gr.Name.Value,gr.EventItems |>List.ofSeq |> List.map (fun item -> (item.Worker.Key,fncFromWorker item.Worker))))
            let widgets=x.Data.WidgetGroups|> List.ofSeq |> List.map (fun gr ->
                               let panelData = gr.PanelContainer.PanelItems |>List.ofSeq |>List.map (fun panel -> panel.PanelData)
                               (gr.Name.Value,panelData,gr.WidgetItems |>List.ofSeq |> List.map (fun item -> (item.Widget.Key,item.Panel,fncFromWorker item.Widget))))
            let rules = x.Data.RulesGroups|> List.ofSeq |> List.map (fun gr ->
                               (gr.Name.Value,RulesEditor.CopyToRules gr.RulesRowItems))
            (events,widgets,rules)

    member x.Restore panelCreator events widgets rules =
        x.EditorSelectorRun.ClearGroups()
        x.EditorSelectorEdit.ClearGroups()
        x.Data.Clear

        let gSelectorPanelsRun=x.EditorSelectorRun.GroupByIndex 0
        let gSelectorPanelsEdit=x.EditorSelectorEdit.GroupByIndex 0
        let gSelectorEvents=x.EditorSelectorEdit.GroupByIndex 1
        let gSelectorRules=x.EditorSelectorEdit.GroupByIndex 2
        widgets |> List.iteri (fun ind (grName,panelList,gr) -> 
                                let (grNameVar,renderer) = DshHelper.PanelGroupCreator x.Data panelCreator ()
                                grNameVar.Value <- grName
                                gSelectorPanelsEdit.SelectorItems.Add (SelectorItem.Create grNameVar renderer)
                                gSelectorPanelsRun.SelectorItems.Add (SelectorItem.Create grNameVar renderer)
                                let grItem = x.Data.WidgetGroups |> List.ofSeq |> List.item ind
                                panelList
                                |> List.iter(fun (panelConfig:PanelData) -> 
                                                     let panel = x.CreatePanel(grItem,"Panel",700,panelConfig.Key)
                                                     panel.Left.Value <- panelConfig.Left
                                                     panel.Top.Value <- panelConfig.Top
                                            )
                                gr |> List.iter (fun (key,panelKey,widget:Worker) ->
                                                    let panel = grItem.PanelContainer.PanelItems |>List.ofSeq |> List.find (fun entry -> entry.Key = panelKey)
                                                    x.RegisterWidget key grItem panelKey panel.Children (widget.WithStartRunner())))
        Console.Log("Widgets restored")   
        events |> List.iteri (fun ind (grName,gr) -> 
                                let (grNameVar,renderer) = DshHelper.EventsGroupCreator x.Data x.PropertyGrid ()
                                grNameVar.Value <- grName
                                gSelectorEvents.SelectorItems.Add (SelectorItem.Create grNameVar renderer)
                                let grItem = x.Data.EventGroups |> List.ofSeq |> List.item ind
                                gr|> List.iter (fun (key,event:Worker) -> x.Data.RegisterEvent key grItem event)) 
        Console.Log("Events restored") 
        rules |> List.iteri (fun ind (grName,rulesData) -> 
                                let (grNameVar,renderer) = DshHelper.RulesGroupCreator x.Data ()
                                grNameVar.Value <- grName
                                gSelectorRules.SelectorItems.Add (SelectorItem.Create grNameVar renderer)
                                let grItem = x.Data.RulesGroups |> List.ofSeq |> List.item ind
                                RulesEditor.Restore x.Data grItem.RulesRowItems rulesData
                                ) 
        if x.Data.WidgetGroups.Length > 0 then
            x.EditorSelectorEdit.OptSelectedItem.Value <- Some((x.EditorSelectorEdit.GroupByIndex 0).SelectorItems |> List.ofSeq |> List.head)
            x.EditorSelectorRun.OptSelectedItem.Value <- Some((x.EditorSelectorRun.GroupByIndex 0).SelectorItems |> List.ofSeq |> List.head)
        else 
            x.EditorSelectorEdit.OptSelectedItem.Value <- None
            x.EditorSelectorRun.OptSelectedItem.Value <- None
        Console.Log("Connectors restored")   
        
    member x.Render menu=
        x.Mode.View |> View.Map (fun mode -> 
          match mode with 
          |DashboardRun -> div[table [tr[
                                            tdAttr [Attr.Style "vertical-align" "top"]
                                                   [Helper.IconNormal "dehaze" (fun _ -> x.PanelTitleVisibility.Value <- true
                                                                                         x.Mode.Value <- DashboardEdit)
                                                    (if (x.EditorSelectorRun.GroupByIndex 0).SelectorItems.Length > 1 then x.EditorSelectorRun.RenderMenu else div[]) 
                                              ]
                                            td [x.EditorSelectorRun.Render] 
                                        ]
                                     ]
                              ]
          |DashboardEdit -> 
            div[
                table[
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
                                                                                        (fun _ ->  let event = selected.Value.Worker.CloneAndRun
                                                                                                   let group = x.Data.EventGroups |> List.ofSeq |> List.item (x.EditorSelectorEdit.SelectedIndexInGroup)
                                                                                                   x.Data.RegisterEvent (Helper.UniqueKey()) group event)
                                           else if selIndex = 0 then
                                               let group = x.Data.WidgetGroups |> List.ofSeq |> List.item (x.EditorSelectorEdit.SelectedIndexInGroup)
                                               x.CreatePanel(group,"Panel",700)|>ignore
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

