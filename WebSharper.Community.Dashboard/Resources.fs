namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.Core.Resources

[<JavaScript>]
module Resources =
    [<assembly: System.Web.UI.WebResource("Dashboard.css", "text/css")>]
    do()
    type StyleResource() =
        inherit BaseResource("Dashboard.css")