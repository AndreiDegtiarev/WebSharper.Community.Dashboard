namespace WebSharper.Community.Dashboard

open System
open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel

[<JavaScript>]
type SourceItem =
    {
        Key:Key
        Source : ISource
    }
    static member Create src=
        {
            Key=Key.Fresh();
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
            Key=Key.Fresh();
            Receiver = receiver
        }
[<JavaScript>]
type Dashboard =
    {
        SourceItems : ListModel<Key,SourceItem>
        ReceiverItems : ListModel<Key,ReceiverItem>
        PanelContainer:PanelContainer
    }
    static member Create panelContainer=
        {
           SourceItems = ListModel.Create (fun item ->item.Key) []
           ReceiverItems = ListModel.Create (fun item ->item.Key) []
           PanelContainer=panelContainer
        }
    member x.Render=
        x.PanelContainer.Render 
    member x.AddSource source = 
        x.SourceItems.Add (SourceItem.Create source)
        source.Run()
    member x.AddReceiver (toPanelContainer:PanelContainer) receiver = 
        x.ReceiverItems.Add (ReceiverItem.Create receiver)
        let panel = Panel.Create
                         .WithTitle(false)
                         .WithPanelContent(receiver.Render())
                         //.WithInternalName("text")
        toPanelContainer.AddPanel panel
    member x.CreatePanel(cx,?afterRenderFnc) = 
        let afterRenderFncDef = defaultArg afterRenderFnc (fun _->())
        let childContainerContent = PanelContainer.Create
                                                  .WithLayoutManager(LayoutManagers.StackPanelLayoutManager)
                                                  .WithAttributes([Attr.Style "border" "1px solid white"]) 
        let panel = Panel.Create
                         .WithPannelAttrs([Attr.Style "Width" (cx.ToString()+"px")])
                         .WithTitleContent(text ("Panel"))
                         .WithTitleButtons(
                                      [
                                        {Icon="add";Action=(fun panel->())}
                                        {Icon="edit";Action=(fun panel->())}
                                        {Icon="clear";Action=(fun panel->x.PanelContainer.PanelItems.Remove(x.PanelContainer.FindPanelItem panel))}
                                      ])
                          .WithChildPanelContainer(childContainerContent)
                          .WithOnAfterRender(afterRenderFncDef)
        x.PanelContainer.AddPanel panel
        childContainerContent    