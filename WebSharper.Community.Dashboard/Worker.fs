namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid
open WebSharper.Community.Panel

[<JavaScript>]type IRunnerContext = interface end

[<JavaScript>]
type IWorkerContext =
    abstract Name:string
    abstract InPorts  : (InPort list)
    abstract OutPorts : (OutPort list)
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
               Name = Var.Create dataContext.Name
               InPorts = dataContext.InPorts
               OutPorts = dataContext.OutPorts
               Runner = None
               Renderer = None
               DataContext = dataContext 
               RunnerContext = None                   
           }
   member x.WithKey(key) = {x with Key=key}
   member x.WithRunner(runner) = {x with Runner=Some(runner)}
   member x.WithRenderer(renderer) = {x with Renderer=Some(renderer)}
   member x.WithStartRunner()  = 
          match x.Runner with
          |Some(runner) -> {x with RunnerContext=runner.Run(x)}
          |None -> x

   member x.CloneAndRun =
          let varName = Var.Create x.Name.Value
          let iPorts = x.InPorts |> List.map (fun port -> port.Clone)
          let oPorts = x.OutPorts |> List.map (fun port -> port.Clone)
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
 [<JavaScript>] IRenderer = abstract Render:(Worker->Doc)

