
module Settings 
    #load @"..\..\WebSharper.Community.Build\gloabalSettings.fsx"
    let projectName = "Dashboard"
    let projectDescription = "WebSharper floating panel component"
    let dependencies = [("WebSharper.UI","")
                        ("WebSharper.FSharp","")
                        ("WebSharper.Charting","")
                        ("WebSharper.Data","")
                        ("WebSharper.Community.Panel",globalSettings.version)]
    let releaseNotes = "Database event, behavior adjusted"