namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid
open WebSharper.Community.Panel

[<JavaScript>]type IRunnerContext = interface end

[<JavaScript>]
type WorkerData = 
    {
        WorkerName:string
        InPorts:InPortData list
        OutPorts:OutPort list
    }
    static member Create name inPorts outPorts = {WorkerName = name; InPorts=inPorts; OutPorts=outPorts}
    //static member CreateWithCache name inPorts outPorts = {WorkerName = name; InPorts=inPorts|> List.map (fun (name,msg,cacheSize)->InPortData.Create name msg cacheSize); OutPorts=outPorts}
[<JavaScript>]
type IWorkerData =
    abstract Data:WorkerData
    abstract Run:Option<Worker->Option<IRunnerContext> >
    abstract Render:Option<(Worker->Doc)>
and
 [<JavaScript>] 
 Worker =
   {
       Key:string
       Name:Var<string>
       InPorts:list<InPort>
       OutPorts:list<OutPort>
       Data:IWorkerData
       RunnerContext:Var<Option<IRunnerContext>>
   }
   static member Create (dataContext:IWorkerData) =
           {
               Key = Helper.UniqueKey()
               Name = Var.Create dataContext.Data.WorkerName
               InPorts = dataContext.Data.InPorts |> List.map InPort.FromData
               OutPorts = dataContext.Data.OutPorts
               Data = dataContext 
               RunnerContext = Var.Create None                   
           }
   member x.WithKey(key) = {x with Key=key}
   member x.StartRunner()  = 
          match x.Data.Run with
          |Some(run) -> x.RunnerContext.Value <- run(x)
          |None -> ()
   member x.ToData  =   {WorkerName = x.Name.Value;
                         InPorts = x.InPorts |> List.map (InPort.ToData)
                         OutPorts = x.OutPorts
                        }
   member x.Clone =
          {
                   Key = Helper.UniqueKey()
                   Name = Var.Create x.Name.Value
                   InPorts = x.InPorts |> List.map InPort.Clone
                   OutPorts = x.OutPorts |> List.map OutPort.Clone
                   Data = x.Data
                   RunnerContext = Var.Create None
          }
          
   member x.Render =  match x.Data.Render with
                      |Some(render) -> render(x)
                      |None -> Doc.Empty
       
   member   x.Properties = (Properties.group "")::(Properties.string "Name" x.Name)::(x.InPorts |> List.map (fun port -> port.Property))


[<JavaScript>]
module Workers = 
    let allPorts workers fnc = workers |> List.map fnc |> List.concat
    let allOutPorts workers = allPorts workers (fun worker -> worker.OutPorts)
    let allInPorts workers = allPorts workers (fun worker -> worker.InPorts)
