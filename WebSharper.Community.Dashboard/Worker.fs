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
        OutPorts:(string*MessageBus.Message) list
    }
    static member Create name inPorts outPorts = {WorkerName = name; InPorts=inPorts|> List.map (fun (name,msg)->InPortData.Create name msg 1); OutPorts=outPorts}
    static member CreateWithCache name inPorts outPorts = {WorkerName = name; InPorts=inPorts|> List.map (fun (name,msg,cacheSize)->InPortData.Create name msg cacheSize); OutPorts=outPorts}
[<JavaScript>]
type IWorkerContext =
    abstract Data:WorkerData
and
 [<JavaScript;CustomEquality;NoComparison>] 
 Worker =
   {
       Key:string
       Name:Var<string>
       InPorts:list<InPort>
       OutPorts:list<OutPort>
       Runner:Option<IRunner>
       Renderer:Option<IRenderer>
       DataContext:IWorkerContext
       RunnerContext:Option<IRunnerContext>
   }
   static member Create (dataContext:IWorkerContext) =
           {
               Key = Helper.UniqueKey()
               Name = Var.Create dataContext.Data.WorkerName
               InPorts = dataContext.Data.InPorts |> List.map InPort.FromData
               OutPorts = dataContext.Data.OutPorts |> List.map OutPort.FromData
               Runner = None
               Renderer = None
               DataContext = dataContext 
               RunnerContext = None                   
           }
   static member CreateWithRunner src =Worker.Create(src).WithRunner(src)
   static member CreateWithRenderer src = "CreateWithRenderer" |> Environment.Log
                                          Worker.Create(src).WithRenderer(src)
   member x.WithKey(key) = {x with Key=key}
   member x.WithRunner(runner:IRunner) = {x with Runner=Some(runner)}
   member x.WithRenderer(renderer:IRenderer) = {x with Renderer=Some(renderer)}
   member x.WithStartRunner()  = 
          match x.Runner with
          |Some(runner) -> {x with RunnerContext=runner.Run(x)}
          |None -> x
   member x.ToData  =   {WorkerName = x.Name.Value;
                         InPorts = x.InPorts |> List.map (InPort.ToData)
                         OutPorts = x.OutPorts |> List.map (OutPort.ToData) 
                        }
   member x.CloneAndRun =
          let varName = Var.Create x.Name.Value
          let iPorts = x.InPorts |> List.map InPort.Clone
          let oPorts = x.OutPorts |> List.map OutPort.Clone
          let copy =
              {
                       Key = Helper.UniqueKey()
                       Name = varName
                       InPorts = iPorts
                       OutPorts = oPorts
                       Runner = x.Runner
                       Renderer = x.Renderer
                       DataContext = x.DataContext
                       RunnerContext = None
              } 
          copy.WithStartRunner()
          
   member x.Render =  match x.Renderer with
                      |Some(renderer) -> renderer.Render(x)
                      |None -> Doc.Empty
       
   member   x.Properties = (Properties.string "Name" x.Name)::(x.InPorts |> List.map (fun port -> port.Property))
   override x.Equals y = match y with
                         | :? Worker as worker -> x.Name = worker.Name
                         | _ -> false
and
 [<JavaScript>] IRunner = 
    abstract Run:(Worker->Option<IRunnerContext>)
and
 [<JavaScript>] IRenderer = 
    abstract Render:(Worker->Doc)

[<JavaScript>]
module Workers = 
    let allPorts workers fnc = workers |> List.map fnc |> List.concat
    let allOutPorts workers = allPorts workers (fun worker -> worker.OutPorts)
    let allInPorts workers = allPorts workers (fun worker -> worker.InPorts)
