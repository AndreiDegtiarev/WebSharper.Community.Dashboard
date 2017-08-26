namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.Community.Dashboard

module Server =
     
    [<Rpc>]
    let SaveToFile (fileName:string, data:AppData<AppModel>) = 
        let json = Json.Serialize<AppData<AppModel>> data
        System.IO.File.WriteAllText(System.IO.Path.Combine(Environment.DataDirectory,fileName+".cfg"),json)
    [<Rpc>]
    let LoadFromFile (fileName:string) = 
        let json = System.IO.File.ReadAllText(System.IO.Path.Combine(Environment.DataDirectory,fileName+".cfg"))
        let data = Json.Deserialize<AppData<AppModel>> json
        data
    [<Rpc>]
    let RecreateOnServer (data:AppData<AppModel>) = 
        Environment.Log <- (fun str -> System.Diagnostics.Debug.WriteLine(str))
        Environment.Role <- Environment.Server
        data.RecreateOnServer (AppModel.ToWorker:AppModel->Worker) |> ignore


