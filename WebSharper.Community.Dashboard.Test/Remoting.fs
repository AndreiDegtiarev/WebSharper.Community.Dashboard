namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.Community.Dashboard

module Server =
    
    [<Rpc>]
    let DoSomething input =
        let R (s: string) = System.String(Array.rev(s.ToCharArray()))
        async {
            return R input
        }       
    [<Rpc>]
    let SaveToFile (fileName:string, data:AppData) = 
        let json = Json.Serialize<AppData> data
        System.IO.File.WriteAllText(fileName,json)
    [<Rpc>]
    let LoadFromFile (fileName:string) = 
        let json = System.IO.File.ReadAllText(fileName)
        let data = Json.Deserialize<AppData> json
        data
    [<Rpc>]
    let RecreateOnServer (data:AppData) = 
        MessageBus.Log <- (fun str -> System.Diagnostics.Debug.WriteLine(str))
        data.RecreateOnServer


