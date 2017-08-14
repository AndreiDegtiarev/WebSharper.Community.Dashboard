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
    }     
    static member Create name (config:(Var<string>*Elt) list) childCreator=
        let items = config |> List.map (fun (name,renderer) -> SelectorItem.Create name renderer) |> ListModel.Create (fun item ->item.Key)
        {
            Key=Key.Fresh()
            Name = Var.Create name
            SelectorItems = items
            ChildCreatator = childCreator
        }
    member x.RenderMenu offset (selectedItemVar:Var<SelectorItem>) = 
     let plus = 
       match x.ChildCreatator with
       |Some(fnc) -> tr[td[Helper.IconSmall "add" (fun _ ->let (name,renderer) = fnc()
                                                           x.SelectorItems.Add (SelectorItem.Create name renderer)
                                                           )]]
       |None -> tr[]
     table[
       ListModel.View x.SelectorItems
       |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> let mapName = item.Name.View |> View.Map (fun name -> offset + name)
                                                            tr[tdAttr[Attr.DynamicStyle "Color" (View.Map (fun (selItem:SelectorItem) -> if selItem.Key = item.Key then "#FB8C00" else "#7D4600")  selectedItemVar.View) 
                                                                      Attr.Style "cursor" "pointer"
                                                                      on.click (fun elem _-> selectedItemVar.Value <- item)
                                                                      
                                                                      ][textView  mapName]] )  
       plus
     ]
[<JavaScript>]
type WindowSelector =
    {
        SelectedItem:Var<SelectorItem>
        SelectorGroups:ListModel<Key,SelectorGroup>
    }
    static member Create  name config childCreator =
        let group = SelectorGroup.Create name config childCreator
        {
            SelectorGroups =  ListModel.Create (fun item ->item.Key) [group]
            SelectedItem=Var.Create (group.SelectorItems |> List.ofSeq |> List.head)
        }
    member x.AppenGroup name config childCreator =
        x.SelectorGroups.Add(SelectorGroup.Create name config childCreator)
    member x.SelectedIndex = 
            x.SelectorGroups |> List.ofSeq |> List.map (fun group -> group.SelectorItems |> List.ofSeq) |> List.concat
            |> List.findIndex (fun listItem -> listItem.Key = x.SelectedItem.Value.Key)
    member x.Render = 
        div[x.SelectedItem.View |> Doc.BindView (fun value -> value.SelectorRenderer)]
    member x.RenderMenu =     
          if x.SelectorGroups.Length = 1 then
            (x.SelectorGroups |> List.ofSeq |> List.head).RenderMenu "" x.SelectedItem
          else
           div[ 
            ListModel.View x.SelectorGroups
            |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun group -> 
                                        div[
                                               textView group.Name.View
                                               group.RenderMenu "    " x.SelectedItem
                                            ]
                                        )
              ]
            
