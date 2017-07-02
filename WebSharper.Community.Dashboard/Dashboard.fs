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
        SourceItems : ListModel<Key,SourceItem>
        ReceiverItems : ListModel<Key,ReceiverItem>
        PanelContainer:PanelContainer
        PropertyGrid : PropertyGrid
        Dialog : Dialog
    }
    static member Create panelContainer=
        {
           Factory = Factory.Create
           SourceItems = ListModel.Create (fun item ->item.Key) []
           ReceiverItems = ListModel.Create (fun item ->item.Key) []
           PanelContainer=panelContainer
           PropertyGrid = PropertyGrid.Create
           Dialog = Dialog.Create
        }
    member x.RegisterSource source = 
        x.SourceItems.Add (SourceItem.Create source)
        source.Run()
    member x.RegisterReceiver (toPanelContainer:PanelContainer) receiver = 
        x.ReceiverItems.Add (ReceiverItem.Create receiver)
        let panel = Panel.Create
                         .WithTitle(false)
                         .WithPanelContent(receiver.Render())
                         .WithProperties (let items = x.SourceItems|>List.ofSeq|>List.map(fun item -> item.Source.OutPorts|>List.map(fun port -> item,port))|>List.concat
                                          let selected=Var.Create (items.Head)
                                          let propSources = Properties.select "Source" (fun (item,port:IOutPort) -> item.Source.Name.Value + "\\"+(port.Name)) items selected
                                          let observe (src,port:IOutPort) =
                                              Console.Log("RegisterReceiver observe"+ src.Source.Name.Value)
                                              port.Connect (receiver.InPorts.[0])
                                          View.Sink observe selected.View
                                          propSources::receiver.Properties) 
                         //.WithInternalName("text")
        toPanelContainer.AddPanel panel
    member x.CreatePanel(name,cx,?afterRenderFnc) = 
        let renderReceivers=x.Factory.ReceiverItems.View
                           |> Doc.BindSeqCachedBy x.ReceiverItems.Key (fun item-> div[textView item.Receiver.Name.View])           

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
                                                                        let items = x.Factory.ReceiverItems|>List.ofSeq
                                                                        let selected=Var.Create (items.Head)
                                                                        x.Dialog.ShowDialog "Select widget" (div[Doc.Select [Attr.Class "form-control"] (fun item -> item.Receiver.Name.Value) items selected])
                                                                                                             (fun _ -> 
                                                                                                                Console.Log("Dialog.IsOK")
                                                                                                                x.RegisterReceiver panel.Children (selected.Value.Receiver.Clone())
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
        let attrsClick action =[Attr.Style "Color" "#FB8C00"
                                Attr.Style "cursor" "pointer"
                                on.click (fun elem _->action())]
        let srcRender =
            table[
                    ListModel.View x.SourceItems
                    |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> tr [iAttr (attrsClick (fun _ ->item.Source.Properties |> x.PropertyGrid.Edit))
                                                                                [textView item.Source.Name.View]])
                  ]
        let icon id action = iAttr(Attr.Class "material-icons orange600"::attrsClick action)[text id]

        let container varValue content = let varVis=Var.Create varValue 
                                         (varVis,divAttr[Attr.DynamicStyle "display" (View.Map (fun (isVisible) -> if isVisible then "initial" else "none")  varVis.View) ]
                                                        [content])
        let containers = ["Board",   container true x.PanelContainer.Render
                          "Sources", container false srcRender
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
                                            tr[td[icon "dehaze" (fun _ -> ())]]
                                            tr[td[icon "add" (fun _ -> 
                                                                let (_,(varBoolDash,_)) = containers.[0]
                                                                let (_,(varBoolSrc,_)) = containers.[1]
                                                                if varBoolSrc.Value then
                                                                    let items = x.Factory.SourceItems|>List.ofSeq
                                                                    let selected=Var.Create (items.Head)
                                                                    x.Dialog.ShowDialog "Select source" (div[Doc.Select [Attr.Class "form-control"] (fun item -> item.Source.Name.Value) items selected])
                                                                                                             (fun _ -> 
                                                                                                                selected.Value.Source.Run()
                                                                                                                x.RegisterSource (selected.Value.Source.Clone()))
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

//and  SourceProperty= {new IProperty with 
//                                                 override x.Name = name
//                                                 override x.Render = Doc.Select [Attr.Class "form-control"] fncCnv selections var  :>Doc
//                                         } 