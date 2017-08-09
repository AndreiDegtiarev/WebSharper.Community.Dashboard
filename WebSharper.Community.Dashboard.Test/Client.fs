namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel
open WebSharper.Community.Dashboard
open FSharp.Data


[<JavaScript>]
module Client =

    let Main () =
        
        let dashboard = AppData.CreateDashboard

        let fileName = Var.Create "D:\\Dashboard.cfg"
        div[dashboard.Render
            text "File name"
            Doc.Input [] fileName
            Helper.TxtIconNormal "file_upload" "Upload" (fun _ ->  
                                          let data =  AppData.Create dashboard
                                          //data.Recreate dashboard
                                          Server.SaveToFile(fileName.Value,data)
                                          //Console.Log(Server.Serialize data)
                                    )
            Helper.TxtIconNormal "file_download" "Download" (fun _ ->  
                              let data =  Server.LoadFromFile(fileName.Value)
                              data.Recreate dashboard
                              //Console.Log(Server.Serialize data)
                        )

        ]
