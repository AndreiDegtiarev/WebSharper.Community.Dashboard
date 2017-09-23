namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.PropertyGrid
open WebSharper.Community.Panel

[<JavaScript>]
type ISelectorItem =  
    abstract Key:Key
    abstract Name:Var<string>
    abstract Render:Elt

type MoveDirection =
|MoveUp
|MoveDown
[<JavaScript>]
type SelectorGroup =
    {
        Key:Key
        Name:Var<string>
        SelectorItems:ListModel<Key,ISelectorItem>
        ItemCreatator:Option<(unit->ISelectorItem)>
        ItemOnCreated:(ISelectorItem -> unit)
        ItemOnSelected:(ISelectorItem -> unit)
        ItemOnDelete:(ISelectorItem -> unit)
        ItemOnMove:(ISelectorItem -> MoveDirection -> unit)
    }     
    static member Create name (items:ISelectorItem list) itemCreator itemOnCreated itemOnSelected itemOnDelete itemOnMove=
        let modelItems = items |> ListModel.Create (fun item ->item.Key)
        {
            Key=Key.Fresh()
            Name = Var.Create name
            SelectorItems = modelItems
            ItemCreatator = itemCreator
            ItemOnCreated  = itemOnCreated
            ItemOnSelected = itemOnSelected
            ItemOnDelete = itemOnDelete
            ItemOnMove = itemOnMove
        }
//    member x.ItemByIndex ind = x.SelectorItems |> List.ofSeq |> List.head
    member x.Render (selectedItemVar:Var<Option<ISelectorItem>>) = 
        ListModel.View x.SelectorItems
                        |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> 
                                                      divAttr[Attr.DynamicStyle "display" 
                                                                        (View.Map (fun (selectedItemOpt:Option<ISelectorItem>) -> 
                                                                                      match selectedItemOpt with
                                                                                      |Some(selItem) -> if selItem = item then "block" else "none"
                                                                                      |None -> "none") selectedItemVar.View)      
                                                             ]
                                                             [item.Render]
                                                    )
    member x.RenderMenu offset (selectedItemVar:Var<Option<ISelectorItem>>) withControls= 
     let moveItem = Helper.MoveItemInModelList x.SelectorItems
     let icons item = [
                    Helper.IconSmall "keyboard_arrow_down" (fun _ ->moveItem true item
                                                                    x.ItemOnMove item MoveDown)
                    Helper.IconSmall "keyboard_arrow_up" (fun _ ->moveItem false item
                                                                  x.ItemOnMove item MoveUp)
                    Helper.IconSmall "clear" (fun _ ->x.SelectorItems.Remove(item)
                                                      x.ItemOnDelete(item))
                 ]


     let plus = 
       match x.ItemCreatator with
       |Some(creator) -> tr[td[divAttr[Attr.Style "margin-left" "20px"][Helper.IconSmall "add" 
                                                        (fun _ ->let item = creator()
                                                                 //let item = SelectorItem.Create config.Name config.Render
                                                                 x.ItemOnCreated(item)
                                                                 x.SelectorItems.Add (item)
                                                           )]]]
       |None -> tr[]
     table[
       ListModel.View x.SelectorItems
       |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> let mapName = item.Name.View |> View.Map (fun name -> offset + name)
                                                            tr[tdAttr[Attr.DynamicStyle "Color" (View.Map (fun (selItemVar:Option<ISelectorItem>) -> 
                                                                                                                match selItemVar with 
                                                                                                                |Some(selItem) -> if selItem.Key = item.Key then "#FB8C00" else "#7D4600" 
                                                                                                                |None -> "#7D4600")  selectedItemVar.View)                                                                       
                                                                      ][(divAttr[Attr.Style "margin-left" "10px"
                                                                                 Attr.Style "margin-right" "5px"
                                                                                 Attr.Style "cursor" "pointer"
                                                                                 on.click (fun elem _-> x.ItemOnSelected(item)
                                                                                                        selectedItemVar.Value <- Some(item))
                                                                                 ][textView  mapName])
                                                                                  |> if withControls then WrapControls.Render (icons item) WrapControlsAligment.Horizontal
                                                                                    else (fun elt -> elt) ]] )  
       plus
     ]
[<JavaScript>]
type WindowSelector =
    {
        OptSelectedItem:Var<Option<ISelectorItem> >
        SelectorGroups:ListModel<Key,SelectorGroup>
        ItemOnCreated:(int -> ISelectorItem -> unit)
        GroupOnClick:(SelectorGroup -> unit)
        ItemOnSelected:(ISelectorItem -> unit)
        ItemOnDeleted:(int->ISelectorItem -> unit)
        ItemOnMove:(int->ISelectorItem -> MoveDirection -> unit)
        IsWithControls:bool
    }
    static member Create  = 
        {
            SelectorGroups =  ListModel.Create (fun item ->item.Key) []
            OptSelectedItem = Var.Create None
            ItemOnCreated  = (fun _ _ -> ())
            GroupOnClick = (fun _ -> ())
            ItemOnSelected = (fun _ -> ())
            ItemOnDeleted  = (fun _ _ -> ())
            ItemOnMove  = (fun _ _ _  -> ())
            IsWithControls = false
        }
    member x.WithItemOnCreated onCreatedFnc = {x with ItemOnCreated = onCreatedFnc}
    member x.WithGroupOnClick onClickFnc = {x with GroupOnClick = onClickFnc}
    member x.WithItemOnSelected onSelectedFnc = {x with ItemOnSelected = onSelectedFnc}
    member x.WithItemOnDeleted onDeletedFnc = {x with ItemOnDeleted = onDeletedFnc}
    member x.WithItemOnMove onMoveFnc = {x with ItemOnMove = onMoveFnc}
    member x.WithControls withControls = {x with IsWithControls = withControls}
    member x.ClearGroups() = 
            x.OptSelectedItem.Value <- None
            x.SelectorGroups |> List.ofSeq |> List.iter (fun gr -> gr.SelectorItems.Clear())
    member x.SelectedItem = match x.OptSelectedItem.Value with | Some(item) -> item | None -> failwith "Something really wrong with WindowSelector"
    member x.AppenGroup name config childCreator =
            let ind = x.SelectorGroups.Length 
            x.SelectorGroups.Add(SelectorGroup.Create name config childCreator (x.ItemOnCreated ind) x.ItemOnSelected (x.ItemOnDeleted ind) (x.ItemOnMove ind))

    member x.GroupFromItem (item:ISelectorItem) = x.SelectorGroups |> List.ofSeq |> List.find (fun group -> group.SelectorItems |> List.ofSeq |> List.exists (fun entry-> entry.Key = item.Key)) 

    member x.SelectedGroup = x.GroupFromItem (x.SelectedItem)

    member x.SelectedGroupIndex = 
            x.SelectorGroups |> List.ofSeq |> List.findIndex (fun gr -> gr.Key = x.SelectedGroup.Key)
    member x.SelectedIndexInGroup = 
            x.SelectedGroup.SelectorItems |> List.ofSeq |> List.findIndex (fun listItem -> listItem.Key = x.SelectedItem.Key)
    member x.SelectedIndex = 
            x.SelectorGroups |> List.ofSeq |> List.map (fun group -> group.SelectorItems |> List.ofSeq) |> List.concat
            |> List.findIndex (fun listItem -> listItem.Key = x.SelectedItem.Key)
    member x.GroupByIndex index = x.SelectorGroups |> List.ofSeq |> List.item index
    member x.Render = 
        //div[x.OptSelectedItem.View |> Doc.BindView (fun value -> match value with |Some(selector) -> selector.Render :> Doc |None -> Doc.Empty)]
        div[ 
                    ListModel.View x.SelectorGroups
                    |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun group -> 
                                                   group.Render x.OptSelectedItem
                                                )
                      ]
    member x.RenderMenu =     
          if x.SelectorGroups.Length = 1 then
            (x.SelectorGroups |> List.ofSeq |> List.head).RenderMenu "" x.OptSelectedItem x.IsWithControls
          else
           div[ 
            ListModel.View x.SelectorGroups
            |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun group -> 
                                        div[
                                               divAttr[
                                                    Attr.Style "cursor" "pointer"
                                                    on.click (fun elem _-> x.GroupOnClick(group))
                                                ]
                                                [textView group.Name.View]
                                               group.RenderMenu "    " x.OptSelectedItem x.IsWithControls
                                            ]
                                        )
              ]
            
