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
type SourceItem =
    {
        Key:Key
        Id:string
        Source : ISource
    }
    static member Create (id:string) src=
        {
            Key=Key.Fresh()
            Id=id
            Source = src
        }
[<JavaScript>]
type ReceiverItem =
    {
        Key:Key
        Receiver : IReceiver
    }
    static member Create receiver=
        {
            Key=Key.Fresh()
            Receiver = receiver
        }
[<JavaScript>]
type Dashboard =
    {
        SourceItems : ListModel<Key,SourceItem>
        ReceiverItems : ListModel<Key,ReceiverItem>
        PanelContainer:PanelContainer
        PropertyGrid : PropertyGrid
    }
    static member Create panelContainer=
        {
           SourceItems = ListModel.Create (fun item ->item.Key) []
           ReceiverItems = ListModel.Create (fun item ->item.Key) []
           PanelContainer=panelContainer
           PropertyGrid = PropertyGrid.Create
        }
    member x.Render=
        div [
            table[
                tr[
                    tdAttr [Attr.Style "vertical-align" "top"][
                        table
                             [
                                trAttr[Attr.Style "Height" "100%"]
                                  [
                                    tdAttr[Attr.Style "Height" "100%"]
                                          [iAttr[Attr.Class "material-icons orange600"][text "dehaze"]]
                                  ]
                                tr[td[iAttr[Attr.Class "material-icons orange600"
                                            Attr.Style "cursor" "pointer"][text "add"]
                                      ]
                                    ]
                                tr[td[x.PropertyGrid.Render]]
                             ]
                      ]
                    td[x.PanelContainer.Render]
                  ]
            ]
        ]

        //x.PanelContainer.Render 
    member x.RegisterSource key source = 
        x.SourceItems.Add (SourceItem.Create key source)
        source.Run()
    member x.RegisterReceiver (toPanelContainer:PanelContainer) receiver = 
        x.ReceiverItems.Add (ReceiverItem.Create receiver)
        let panel = Panel.Create
                         .WithTitle(false)
                         .WithPanelContent(receiver.Render())
                         //.WithInternalName("text")
        toPanelContainer.AddPanel panel
    member x.CreatePanel(name,cx,?afterRenderFnc) = 
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
                                        {Icon="add";Action=(fun panel->())}
                                        {Icon="edit";Action=(fun panel->x.PropertyGrid.Edit (panel.Properties))}
                                        {Icon="clear";Action=(fun panel->x.PanelContainer.PanelItems.Remove(x.PanelContainer.FindPanelItem panel))}
                                      ])
                          .WithChildPanelContainer(childContainerContent)
                          .WithOnAfterRender(afterRenderFncDef)
        x.PanelContainer.AddPanel panel
        childContainerContent    