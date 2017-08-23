namespace WebSharper.Community.Dashboard.Test

open WebSharper
open WebSharper.Sitelets
open WebSharper.UI.Next
open WebSharper.UI.Next.Server
open WebSharper.Community.Dashboard

type EndPoint =
    | [<EndPoint "/">] Home
    | [<EndPoint "/about">] About

module Templating =
    open WebSharper.UI.Next.Html

    type MainTemplate = Templating.Template<"Main.html">

    // Compute a menubar where the menu item for the given endpoint is active
    let MenuBar (ctx: Context<EndPoint>) endpoint : Doc list =
        let ( => ) txt act =
             liAttr [if endpoint = act then yield attr.``class`` "active"] [
                aAttr [attr.href (ctx.Link act)] [text txt]
             ]
        [
            li ["Home" => EndPoint.Home]
            li ["About" => EndPoint.About]
        ]

    let Main ctx action (title: string) (body: Doc list) =
        Content.Page(
            MainTemplate()
                .Title(title)
                .MenuBar(MenuBar ctx action)
                .Body(body)
                .Doc()
        )

module Site =
    open WebSharper.UI.Next.Html
    open System.Web

    let HomePage ctx configName=
        Templating.Main ctx EndPoint.Home "Home" [
            div [client <@ Client.Main(configName) @>]
        ]

    let AboutPage ctx =
        Templating.Main ctx EndPoint.About "About" [
            h1 [text "About"]
            p [text "This is a template WebSharper client-server application."]
        ]

    [<Website>]
    let Main =
        Application.MultiPage (fun (ctx:Context<EndPoint>) endpoint ->
            Environment.DataDirectory <- System.IO.Path.Combine(ctx.RootFolder,"Data")
            let queryParams = HttpUtility.ParseQueryString ctx.RequestUri.Query
            let configName = queryParams.["Config"]
            match endpoint with
            | EndPoint.Home -> HomePage ctx (StartConfiguration.Create configName)
            | EndPoint.About -> AboutPage ctx
        )
