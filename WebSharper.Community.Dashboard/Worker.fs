namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid

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
       Name:Var<string>
       InPorts:list<InPort>
       OutPorts:list<OutPort>
       Runner:Option<IRunner>
       Renderer:Option<IRenderer>
       DataContext:IWorkerContext
       RunnerContext:Option<IRunnerContext>
   }
   static member CreateNative (dataContext:IWorkerContext) runner renderer =
           {
               Name = Var.Create dataContext.Name
               InPorts = dataContext.InPorts
               OutPorts = dataContext.OutPorts
               Runner = runner
               Renderer = renderer
               DataContext = dataContext 
               RunnerContext = None                   
           }
   static member Create dataContext= 
       Worker.CreateNative dataContext (Some(dataContext :>IRunner)) (Some(dataContext :>IRenderer)) 
   static member CreateRunner dataContext = 
       Worker.CreateNative dataContext (Some(dataContext :>IRunner)) None
   static member CreateRenderer dataContext = 
       Worker.CreateNative dataContext None (Some(dataContext :>IRenderer)) 

   member x.CloneAndRun =
          let varName = Var.Create x.Name.Value
          let iPorts = x.InPorts |> List.map (fun port -> port.Clone)
          let oPorts = x.OutPorts |> List.map (fun port -> Ports.Clone port)
          let copy =
              {
                       Name = varName
                       InPorts = iPorts
                       OutPorts = oPorts
                       Runner = x.Runner
                       Renderer = x.Renderer
                       DataContext = x.DataContext
                       RunnerContext = None
              } 
          match copy.Runner with
          |Some(runner) -> {copy with RunnerContext=runner.Run(copy)}
          |None -> copy
          
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

