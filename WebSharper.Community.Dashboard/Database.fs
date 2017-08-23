namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.Panel
open System.IO

module ServerDatabase =

    [<Rpc>]
    let WriteLine file line = 
            System.IO.File.AppendAllText(Path.Combine(Environment.DataDirectory,file),line + "\n")
[<JavaScript>]
type DatabaseRunnerContext =
    {
        DatabaseRunnerRun:MailboxProcessor<string>
    }
    interface IRunnerContext
[<JavaScript>]
type DatabaseRunner =
 {
        Name:string
        DatabaseName:MessageBus.Message
        InValue:MessageBus.Message
        OutPortKey:string
 }
 static member Create  = {
                            Name = "Database"
                            DatabaseName=MessageBus.CreateString "Database.txt"
                            InValue=MessageBus.CreateNumber 0.0
                            OutPortKey=Helper.UniqueKey()
                         }
 static member FromPorts = (fun worker -> {
                                             InValue=worker.InPorts.[0].PortValue.Value 
                                             DatabaseName=worker.InPorts.[1].PortValue.Value 
                                             OutPortKey=worker.OutPorts.[0].Key
                                             Name = worker.Name.Value
                                          })
 interface IWorkerContext with
    override x.Name = x.Name
    override x.InPorts =  [(" in Value",x.InValue);("Database name",x.DatabaseName)] |> Ports.Create 
    override x.OutPorts = [OutPort.CreateNumber x.OutPortKey "Number value"]
 interface IRunner with
        override x.Run= (fun worker ->
                            worker.InPorts.[0].PortValue.View
                            |> View.Sink (fun value -> 
                                    let text=sprintf "%s %s %f" value.Key (value.Time.ToString()) value.Value.AsNumber
                                    ServerDatabase.WriteLine (worker.InPorts.[1].String) text
                                    worker.OutPorts.[0].TriggerWithKey value
                                )  
                            None
                         )

