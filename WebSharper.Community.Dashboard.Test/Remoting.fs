namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.Community.Dashboard

module Server =
     
    [<Rpc>]
    let SaveToFile (fileName:string, data:AppData) = 
        let json = Json.Serialize<AppData> data
        System.IO.File.WriteAllText(System.IO.Path.Combine(Environment.DataDirectory,fileName+".cfg"),json)
    [<Rpc>]
    let LoadFromFile (fileName:string) = 
        let json = System.IO.File.ReadAllText(System.IO.Path.Combine(Environment.DataDirectory,fileName+".cfg"))
        let data = Json.Deserialize<AppData> json
        data
    [<Rpc>]
    let RecreateOnServer (data:AppData) = 
        Environment.Log <- (fun str -> System.Diagnostics.Debug.WriteLine(str))
        Environment.Role <- Environment.Server
        data.RecreateOnServer


