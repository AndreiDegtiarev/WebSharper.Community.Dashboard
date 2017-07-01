namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html

[<JavaScript>]
type SourceItem =
    {
        Key:Key
        //Id:string
        Source : ISource
    }
    static member Create  src=
        {
            Key=Key.Fresh()
          //  Id=id
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
type Factory =
    {
        SourceItems : ListModel<Key,SourceItem>
        ReceiverItems : ListModel<Key,ReceiverItem>
    }
    static member Create =
        {
           SourceItems = ListModel.Create (fun item ->item.Key) []
           ReceiverItems = ListModel.Create (fun item ->item.Key) []
        }
    member x.RegisterReceiver receiver = 
        x.ReceiverItems.Add (ReceiverItem.Create receiver)
    member x.RegisterSource source = 
        x.SourceItems.Add (SourceItem.Create source)
