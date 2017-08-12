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
        Editor: DshEditor
        PropertyGrid : PropertyGrid
        Dialog : Dialog
    }
    static member Create panelContainer=
        let dialog = Dialog.Create
        {
           Factory = Factory.Create
           Data = DshData.Create
           PanelContainer=panelContainer
           Dialog = dialog
           Editor = DshEditor.Create
           PropertyGrid = PropertyGrid.Create
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
        x.Editor.Restore (x.Data) dashEditorData
        Console.Log("Connectors restored")   
        //x.Data.WorkItems |> List.ofSeq |> List.iter (fun worker -> worker.Worker.Runner |> Option.map(fun runner -> runner.Run worker.Worker) |> ignore)
        
    member x.Render=
        let eventsRender =
            table[
                    ListModel.View x.Data.EventItems
                    |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> tr [iAttr (Helper.AttrsClick 
                                                                                       (fun _ ->item.Worker.Properties |> x.PropertyGrid.Edit))
                                                                            [textView item.Worker.Name.View]])
                  ]
        let container varValue content = let varVis=Var.Create varValue 
                                         (varVis,divAttr[Attr.DynamicStyle "display" (View.Map (fun (isVisible) -> if isVisible then "initial" else "none")  varVis.View) ]
                                                        [content])
        let containers = ["Board",  container true x.PanelContainer.Render
                          "Events", container false eventsRender
                          "Rules",  container false (x.Editor.Render x.Data)
                         ]
        let menu=containers |> List.map (fun (name,(varVis,targetDiv)) ->tr[tdAttr[Attr.DynamicStyle "Color" (View.Map (fun (isVisible) -> if isVisible then "#FB8C00" else "#7D4600")  varVis.View) 
                                                                                   Attr.Style "cursor" "pointer"
                                                                                   on.click (fun elem _->[] |> x.PropertyGrid.Edit
                                                                                                         containers
                                                                                                         |>List.iter (fun (_,(varBool,_)) -> if varBool<> varVis then varBool.Value <- false else varBool.Value <- true)
                                                                                            )
                                                                                 ][text name]]  :> Doc )
        let containerDivs = containers |> List.map (fun (_,(_,targetDiv)) -> targetDiv :> Doc)
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
                                                                let (_,(varBoolDash,_)) = containers.[0]
                                                                let (_,(varBoolSrc,_)) = containers.[1]
                                                                let (_,(varBoolEdit,_)) = containers.[2]
                                                                if varBoolSrc.Value then
                                                                    let items = x.Factory.EventItems|>List.ofSeq
                                                                    let selected=Var.Create (items.Head)
                                                                    x.Dialog.ShowDialog "Select source" (div[Doc.Select [Attr.Class "form-control"] (fun item -> item.Worker.Name.Value) items selected])
                                                                                                             (fun _ ->  let event = selected.Value.Worker.CloneAndRun
                                                                                                                        x.Data.RegisterEvent (Helper.UniqueKey()) event)
                                                                else if varBoolDash.Value then
                                                                    x.CreatePanel("Panel",700)|>ignore
                                                                else if varBoolEdit.Value then
                                                                    x.Editor.RowItems.Add (DshEditorRowItem.Create [DshEditorCellItem.Create]) 
                                                             )]]
                                       ]
                                       menu
                                       [     
                                            tr[td[]]
                                            tr[td[x.PropertyGrid.Render]]
                                       ]
                                    ])

                      ]
                    td containerDivs
                 ]
            ]
            div[x.Dialog.Render]
         ]

