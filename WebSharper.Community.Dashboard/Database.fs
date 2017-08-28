namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.Panel
open System
open System.IO

module ServerDatabase =

    type AgentMessage =
    |WriteMessage of (string*MessageBus.Message)
    |ReadAllMessages of (string*AsyncReplyChannel<MessageBus.Message list>)

    let Agent = MailboxProcessor<AgentMessage>.Start(fun inbox ->
        let fileName file = Path.Combine(Environment.DataDirectory,file)
        let rec loop state = async {
            let! message = inbox.Receive()
            match message with
            | WriteMessage (file,message) ->
                try
                    let line=sprintf "%s %s %f" message.Key (message.Time.ToString()) message.Value.AsNumber
                    File.AppendAllText(fileName file,line + "\n")
                with
                |ex -> ex.Message |> Environment.Log
                return! loop ""
            | ReadAllMessages (file,channel) ->
                try
                    if File.Exists(fileName file) then
                        let messages = 
                            System.IO.File.ReadAllLines(fileName file)
                            |>Array.map (fun line -> line.Split([|' '|], System.StringSplitOptions.RemoveEmptyEntries)|>List.ofArray)
                            |>List.ofArray
                            |>List.fold (fun acc raw -> match raw with
                                                        |keyStr::dateStr::timeStr::value::[] ->let time = System.DateTime.Parse(dateStr + " " + timeStr)
                                                                                               (MessageBus.NumberKeyMessage keyStr (Double.Parse(value)))
                                                                                                .WithTime(time) :: acc

                                                        |_ -> acc) []
                        channel.Reply(messages)
                    else channel.Reply([])
                with
                |ex -> ex.Message |> Environment.Log
                return! loop ""

        }
        loop ""
    )

    [<Rpc>]
    let WriteMessage file message = 
            Agent.Post(WriteMessage(file,message))
    [<Rpc>]
    let ReadAllMessages file= 
            Agent.PostAndReply(fun r -> ReadAllMessages(file,r))
[<JavaScript>]
type DatabaseRunnerContext =
    {
        DatabaseRunnerRun:MailboxProcessor<string>
    }
    interface IRunnerContext

[<JavaScript>]
type DatabaseRunner =
 {
    DatabaseData:WorkerData
 }
 static member Create  = {
                           DatabaseData =  WorkerData.Create "Database" 
                                                                    [(" in Value",MessageBus.NumberMessage 100.0)
                                                                     ("Database name",MessageBus.StringMessage "Database.txt")]
                                                                    [("Number value",MessageBus.NumberMessage 0.0)]
                         }
 static member FromWorker = (fun (worker:Worker) -> {DatabaseData = worker.ToData})
 interface IWorkerContext with
      override x.Data = x.DatabaseData
 interface IRunner with
        override x.Run= (fun worker ->
                            let file = worker.InPorts.[1].String
                            ServerDatabase.ReadAllMessages file
                            |> List.iter (fun msg -> (MessageBus.Agent.Post(MessageBus.Send(msg))))
                            worker.InPorts.[0].PortValue.View
                            |> View.Sink (fun value -> 
                                    ServerDatabase.WriteMessage file value
                                    worker.OutPorts.[0].Trigger value.Value
                                )  
                            None
                         )

