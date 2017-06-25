namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open FSharp.Data

[<JavaScript>]
module SrcOpenWeather =

    type Forecast = {
        Title: string
        Description: string
        ImageUrl: string
        Temperature: decimal
        TemparatureMinMax: decimal * decimal
    }

    type WeatherApi = 
        JsonProvider<""" {"coord":{"lon":-0.13,"lat":51.51},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"},{"id":311,"main":"Drizzle","description":"rain and drizzle","icon":"09d"}],"base":"cmc stations","main":{"temp":282.66,"pressure":999,"humidity":87,"temp_min":281.75,"temp_max":283.15},"wind":{"speed":5.7,"deg":140},"rain":{"1h":0.35},"clouds":{"all":75},"dt":1451724700,"sys":{"type":1,"id":5091,"message":0.0043,"country":"GB","sunrise":1451721965,"sunset":1451750585},"id":2643743,"name":"London","cod":200} """>

    let get key city =
        async {
            let request = sprintf "http://api.openweathermap.org/data/2.5/weather?q=%s&units=metric&appid=%s" city key
            Console.Log ("get key city " + request)
            let! weather = WeatherApi.AsyncLoad(request)
            Console.Log ("get key city 2")
            return weather.Weather 
                   |> Array.tryHead
                   |> Option.map (fun head -> 
                        { Title = sprintf "%s, %s" weather.Name weather.Sys.Country
                          Description = head.Main
                          ImageUrl = sprintf "http://openweathermap.org/img/w/%s.png" head.Icon
                          Temperature = weather.Main.Temp
                          TemparatureMinMax = weather.Main.TempMin, weather.Main.TempMax })
        }
    let Create city=
        let outTempearatur = IOutPortNumber("Temperature")
        let key = "xxxx" //put here your api key
        {new ISource with 
            override x.OutPorts = [outTempearatur]
            override x.Run()=
                let rnd = System.Random()
                async {
                    while true do
                        let! response = get key city
                        Console.Log ("Value generated:"+response.Value.Title)
                        outTempearatur.Trigger ((double)response.Value.Temperature)
                        do! Async.Sleep (1000*15)
                }
                |> Async.Start
         }