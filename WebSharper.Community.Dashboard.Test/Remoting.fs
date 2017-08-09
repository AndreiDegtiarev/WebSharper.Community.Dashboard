namespace WebSharper.Community.Dashboard.Test

open WebSharper

module Server =

    [<Rpc>]
    let DoSomething input =
        let R (s: string) = System.String(Array.rev(s.ToCharArray()))
        async {
            return R input
        }
    [<Rpc>]
    let Serialize (data:AppData) =
            Json.Serialize<AppData> data        
    [<Rpc>]
    let SaveToFile (fileName:string, data:AppData) = 
        let json = Json.Serialize<AppData> data
        System.IO.File.WriteAllText("D:/Dashboard.cfg",json)
    [<Rpc>]
    let LoadFromFile (fileName:string) = 
        let json = System.IO.File.ReadAllText(fileName)
        let data = Json.Deserialize<AppData> json
        data
