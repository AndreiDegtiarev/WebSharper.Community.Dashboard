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
type Dashboard =
    {
        Factory : Factory
        Data:DshData
        PanelContainer:PanelContainer
        RulesEditor: RulesEditor
        PropertyGrid : PropertyGrid
        Dialog : Dialog
        EditorSelector : WindowSelector
    }
    static member Create (panelContainer:PanelContainer)=
        let dialog = Dialog.Create
        let rulesEditor =  RulesEditor.Create
        let data = DshData.Create
        let propertyGrid = PropertyGrid.Create
        let editorSelector = WindowSelector.Create "root"
                                                  [(Var.Create "Board",panelContainer.Render)
                                                   (Var.Create "Events",EventsEditor.Render data propertyGrid)
                                                   (Var.Create "Rules",rulesEditor.Render data)
                                                  ] None
//        editorSelector.AppenGroup "Panels" [(Var.Create "panel1",panelContainer.Render)] None
//        editorSelector.AppenGroup "Events" [(Var.Create "event1",EventsEditor.Render data propertyGrid)] (Some((fun _ ->
//                                                                                                                   data.EventGroups.Add(EventsGroupItem.Create)
//                                                                                                                   (Var.Create "event1",EventsEditor.Render data propertyGrid))))
//        editorSelector.AppenGroup "Rules" [(Var.Create "rules1",rulesEditor.Render data)] None
        {
           Factory = Factory.Create
           Data = data
           PanelContainer=panelContainer
           Dialog = dialog
           RulesEditor = rulesEditor
           PropertyGrid = propertyGrid
           EditorSelector = editorSelector
        }
    member x.RegisterWidget key panelKey (toPanelContainer:PanelContainer) worker = 
        x.Data.RegisterWidget key panelKey worker 
        let panel = Panel.Create
                         .WithTitle(false)
                         .WithPanelContent(worker.Render)
                        // .WithProperties ((SourceProperty(x.Data,worker) :>IProperty)::worker.Properties) 

        toPanelContainer.AddPanel panel
    member x.CreatePanel(name,cx,?key) = //,?afterRenderFnc) = 
        let renderWidgets= x.Data.WidgetItems.View
                           |> Doc.BindSeqCachedBy x.Data.WidgetItems.Key (fun item-> 
                                                                                let nameView = item.Widget.Name.View
                                                                                div[textView nameView])           

        //let afterRenderFncDef = defaultArg afterRenderFnc (fun _->())
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
                         .WithTitleContent(text (name))
                         .WithTitleButtons(
                                      [
                                        {Icon="add";Action=(fun panel->(
                                                                        let items = x.Factory.WidgetItems|>List.ofSeq
                                                                        let selected=Var.Create (items.Head)
                                                                        x.Dialog.ShowDialog "Select widget" (div[Doc.Select [Attr.Class "form-control"] (fun item -> item.Worker.Name.Value) items selected])
                                                                                                             (fun _ -> 
                                                                                                                Console.Log("Dialog.IsOK")
                                                                                                                x.RegisterWidget (Helper.UniqueKey()) panel.Key panel.Children selected.Value.Worker.CloneAndRun
                                                                                                             )
                                                                       ))}
                                        {Icon="edit"; Action=(fun panel->Console.Log("Edit")
                                                                         x.Data.WidgetItems 
                                                                         |> List.ofSeq 
                                                                         |> List.filter (fun item-> item.Panel = panel.Key)
                                                                         |> List.map (fun item -> item.Widget.Properties)
                                                                         |> List.concat
                                                                         |> x.PropertyGrid.Edit)}
                                                                         //x.PropertyGrid |> panel.EditProperties
                                        {Icon="clear";Action=(fun panel->x.PanelContainer.PanelItems.Remove(x.PanelContainer.FindPanelItem panel))}
                                      ])
                          .WithChildPanelContainer(childContainerContent)
                          //.WithOnAfterRender(afterRenderFncDef)
        x.PanelContainer.AddPanel panel
        //childContainerContent
        panel  
    member x.Store fncFromWorker  =
            let panelData = x.PanelContainer.PanelItems |>List.ofSeq |>List.map (fun panel -> panel.PanelData)
            let events=x.Data.EventItems   |>List.ofSeq |> List.map (fun item -> (item.Worker.Key,fncFromWorker item.Worker))
            let widgets=x.Data.WidgetItems |>List.ofSeq |> List.map (fun item -> (item.Widget.Key,item.Panel,fncFromWorker item.Widget))
            let rules = x.RulesEditor.CopyToRules
            (panelData,events,widgets,rules)

    member x.Restore panelList events widgets dashEditorData =
        x.PanelContainer.PanelItems.Clear()
        x.Data.Clear
        panelList
        |> List.iter(fun (panelConfig:PanelData) -> 
                             let panel = x.CreatePanel("Panel",700,panelConfig.Key)
                             panel.Left.Value <- panelConfig.Left
                             panel.Top.Value <- panelConfig.Top
                    )
        events |> List.iter (fun (key,event:Worker) -> x.Data.RegisterEvent key event)     
        Console.Log("Events restored")   
        widgets |> List.iter (fun (key,panelKey,widget:Worker) ->
                                let panel = x.PanelContainer.PanelItems |>List.ofSeq |> List.find (fun entry -> entry.Key = panelKey)
                                x.RegisterWidget key panelKey panel.Children (widget.WithStartRunner()))
        Console.Log("Widgets restored")   
        x.RulesEditor.Restore (x.Data) dashEditorData
        Console.Log("Connectors restored")   
        //x.Data.WorkItems |> List.ofSeq |> List.iter (fun worker -> worker.Worker.Runner |> Option.map(fun runner -> runner.Run worker.Worker) |> ignore)
        
    member x.Render=

        div [
            table[
                tr[
                    tdAttr [Attr.Style "vertical-align" "top"][
                        table
                                 (Seq.concat
                                    [
                                       [
                                            tr[td[Helper.IconNormal "dehaze" (fun _ -> ())]]
                                            tr[td[Helper.IconNormal "add" (fun _ -> 
                                                                let selIndex = x.EditorSelector.SelectedIndex
                                                                if selIndex = 1 then
                                                                    let items = x.Factory.EventItems|>List.ofSeq
                                                                    let selected=Var.Create (items.Head)
                                                                    x.Dialog.ShowDialog "Select source" (div[Doc.Select [Attr.Class "form-control"] (fun item -> item.Worker.Name.Value) items selected])
                                                                                                             (fun _ ->  let event = selected.Value.Worker.CloneAndRun
                                                                                                                        x.Data.RegisterEvent (Helper.UniqueKey()) event)
                                                                else if selIndex = 0 then
                                                                    x.CreatePanel("Panel",700)|>ignore
                                                                else if selIndex = 2 then
                                                                    x.RulesEditor.RowItems.Add (RulesRowItem.Create [RulesCellItem.Create;RulesCellItem.Create]) 
                                                             )]]
                                       ]
                                       [x.EditorSelector.RenderMenu]
                                       [     
                                            tr[td[]]
                                            tr[td[x.PropertyGrid.Render]]
                                       ]
                                    ])

                      ]
                    td [x.EditorSelector.Render] 
                 ]
            ]
            div[x.Dialog.Render]
         ]

