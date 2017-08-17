namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.PropertyGrid
open WebSharper.Community.Panel

[<JavaScript>]
type SelectorItem =
    {
        Key:Key
        Name:Var<string>
        SelectorRenderer:Elt
    }
    static member Create name renderer=
        {
            Key=Key.Fresh()
            Name = name
            SelectorRenderer=renderer
        }

[<JavaScript>]
type SelectorGroup =
    {
        Key:Key
        Name:Var<string>
        SelectorItems:ListModel<Key,SelectorItem>
        ChildCreatator:Option<(unit->(Var<string>*Elt))>
        ItemOnCreated:(SelectorItem -> unit)
        ItemOnSelected:(SelectorItem -> unit)
    }     
    static member Create name (config:(Var<string>*Elt) list) childCreator itemOnCreated itemOnSelected =
        let items = config |> List.map (fun (name,renderer) -> SelectorItem.Create name renderer) |> ListModel.Create (fun item ->item.Key)
        {
            Key=Key.Fresh()
            Name = Var.Create name
            SelectorItems = items
            ChildCreatator = childCreator
            ItemOnCreated  = itemOnCreated
            ItemOnSelected = itemOnSelected
        }
    member x.RenderMenu offset (selectedItemVar:Var<Option<SelectorItem>>) = 
     let plus = 
       match x.ChildCreatator with
       |Some(fnc) -> tr[td[divAttr[Attr.Style "margin-left" "20px"][Helper.IconSmall "add" 
                                                        (fun _ ->let (name,renderer) = fnc()
                                                                 let item = SelectorItem.Create name renderer
                                                                 x.ItemOnCreated(item)
                                                                 x.SelectorItems.Add (item)
                                                           )]]]
       |None -> tr[]
     table[
       ListModel.View x.SelectorItems
       |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> let mapName = item.Name.View |> View.Map (fun name -> offset + name)
                                                            tr[tdAttr[Attr.DynamicStyle "Color" (View.Map (fun (selItemVar:Option<SelectorItem>) -> 
                                                                                                                match selItemVar with 
                                                                                                                |Some(selItem) -> if selItem.Key = item.Key then "#FB8C00" else "#7D4600" 
                                                                                                                |None -> "#7D4600")  selectedItemVar.View) 
                                                                      Attr.Style "cursor" "pointer"
                                                                      on.click (fun elem _-> x.ItemOnSelected(item)
                                                                                             selectedItemVar.Value <- Some(item))
                                                                      
                                                                      ][divAttr[Attr.Style "margin-left" "10px"
                                                                                Attr.Style "margin-right" "5px"][textView  mapName]]] )  
       plus
     ]
[<JavaScript>]
type WindowSelector =
    {
        OptSelectedItem:Var<Option<SelectorItem> >
        SelectorGroups:ListModel<Key,SelectorGroup>
        ItemOnCreated:(int -> SelectorItem -> unit)
        GroupOnClick:(SelectorGroup -> unit)
        ItemOnSelected:(SelectorItem -> unit)
    }
    static member Create  = 
        {
            SelectorGroups =  ListModel.Create (fun item ->item.Key) []
            OptSelectedItem = Var.Create None
            ItemOnCreated  = (fun _ _ -> ())
            GroupOnClick = (fun _ -> ())
            ItemOnSelected = (fun _ -> ())
        }
    member x.WithItemOnCreated onCreatedFnc = {x with ItemOnCreated = onCreatedFnc}
    member x.WithGroupOnClick onClickFnc = {x with GroupOnClick = onClickFnc}
    member x.WithItemOnSelected onSelectedFnc = {x with ItemOnSelected = onSelectedFnc}
    member x.ClearGroups() = 
            x.OptSelectedItem.Value <- None
            x.SelectorGroups |> List.ofSeq |> List.iter (fun gr -> gr.SelectorItems.Clear())
    member x.SelectedItem = match x.OptSelectedItem.Value with | Some(item) -> item | None -> failwith "Something really wrong with WindowSelector"
    member x.AppenGroup name config childCreator =
            let ind = x.SelectorGroups.Length 
            x.SelectorGroups.Add(SelectorGroup.Create name config childCreator (x.ItemOnCreated ind) x.ItemOnSelected)

    member x.GroupFromItem (item:SelectorItem) = x.SelectorGroups |> List.ofSeq |> List.find (fun group -> group.SelectorItems |> List.ofSeq |> List.exists (fun entry-> entry.Key = item.Key)) 

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
        div[x.OptSelectedItem.View |> Doc.BindView (fun value -> match value with |Some(selector) -> selector.SelectorRenderer :> Doc |None -> Doc.Empty)]
    member x.RenderMenu =     
          if x.SelectorGroups.Length = 1 then
            (x.SelectorGroups |> List.ofSeq |> List.head).RenderMenu "" x.OptSelectedItem
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
                                               group.RenderMenu "    " x.OptSelectedItem
                                            ]
                                        )
              ]
            
