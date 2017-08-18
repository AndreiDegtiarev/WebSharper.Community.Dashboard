namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.Community.Dashboard

module Server =
    let mutable RootFolder =""
    [<Rpc>]
    let DoSomething input =
        let R (s: string) = System.String(Array.rev(s.ToCharArray()))
        async {
            return R input
        }       
    [<Rpc>]
    let SaveToFile (fileName:string, data:AppData) = 
        let json = Json.Serialize<AppData> data
        System.IO.File.WriteAllText(System.IO.Path.Combine(RootFolder,fileName+".cfg"),json)
    [<Rpc>]
    let LoadFromFile (fileName:string) = 
        let json = System.IO.File.ReadAllText(System.IO.Path.Combine(RootFolder,fileName+".cfg"))
        let data = Json.Deserialize<AppData> json
        data
    [<Rpc>]
    let RecreateOnServer (data:AppData) = 
        MessageBus.Log <- (fun str -> System.Diagnostics.Debug.WriteLine(str))
        MessageBus.Role <- MessageBus.Server
        data.RecreateOnServer


