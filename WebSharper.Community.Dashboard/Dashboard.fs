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
        DshEditor: DshEditor
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
           DshEditor = DshEditor.Create
           PropertyGrid = PropertyGrid.Create
        }
    member x.RegisterWidget (toPanelContainer:PanelContainer) (worker:Worker) = 
        x.Data.RegisterWidget worker
        let panel = Panel.Create
                         .WithTitle(false)
                         .WithPanelContent(match worker with
                                           | :?  Widget as widget -> widget.Render()                                    
                                           | _ ->div[] :> Doc)
                         .WithProperties ((SourceProperty(x.Data,worker) :>IProperty)::worker.Properties) 

        toPanelContainer.AddPanel panel
    member x.CreatePanel(name,cx,?afterRenderFnc) = 
        let renderWidgets= x.Factory.WidgetItems.View
                           |> Doc.BindSeqCachedBy x.Data.WidgetItems.Key (fun item-> 
                                                let nameView = item.Worker.Name.View
                                                div[textView nameView])           

        let afterRenderFncDef = defaultArg afterRenderFnc (fun _->())
        let childContainerContent = PanelContainer.Create
                                                  .WithLayoutManager(LayoutManagers.StackPanelLayoutManager)
                                                  .WithAttributes([Attr.Style "border" "1px solid white"
                                                                   Attr.Style "display" "flex"
                                                                  ]) 
        let panel = Panel.Create
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
                                                                                                                x.RegisterWidget panel.Children (selected.Value.Worker.Clone())
                                                                                                             )
                                                                       ))}
                                        {Icon="edit"; Action=(fun panel->Console.Log("Edit")
                                                                         x.PropertyGrid |> panel.EditProperties)}
                                        {Icon="clear";Action=(fun panel->x.PanelContainer.PanelItems.Remove(x.PanelContainer.FindPanelItem panel))}
                                      ])
                          .WithChildPanelContainer(childContainerContent)
                          .WithOnAfterRender(afterRenderFncDef)
        x.PanelContainer.AddPanel panel
        childContainerContent   
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
                          "Rules",  container false (x.DshEditor.Render x.Data)
                         ]
        let menu=containers |> List.map (fun (name,(varVis,targetDiv)) ->tr[tdAttr[Attr.DynamicStyle "Color" (View.Map (fun (isVisible) -> if isVisible then "#FB8C00" else "#7D4600")  varVis.View) 
                                                                                   Attr.Style "cursor" "pointer"
                                                                                   on.click (fun elem _->containers
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
                                                                if varBoolSrc.Value then
                                                                    let items = x.Factory.EventItems|>List.ofSeq
                                                                    let selected=Var.Create (items.Head)
                                                                    x.Dialog.ShowDialog "Select source" (div[Doc.Select [Attr.Class "form-control"] (fun item -> item.Worker.Name.Value) items selected])
                                                                                                             (fun _ ->  let event = selected.Value.Worker.Clone()
                                                                                                                        x.Data.RegisterEvent event
                                                                                                                        event.Run())
                                                                else if varBoolDash.Value then
                                                                    x.CreatePanel("Panel",700,(fun _->()))|>ignore
                                                             )]]
                                            tr[td[]]
                                            tr[td[x.PropertyGrid.Render]]
                                       ]
                                       menu
                                    ])

                      ]
                    td containerDivs
                 ]
            ]
            div[x.Dialog.Render]
         ]

