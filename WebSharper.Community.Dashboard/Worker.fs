namespace WebSharper.Community.Dashboard

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.Community.PropertyGrid


[<JavaScript>]type IWorkerContext = interface end
[<JavaScript>]type IRunnerContext = interface end

[<JavaScript;CustomEquality;NoComparison>] 
type IWorker =
   {
       Name:Var<string>
       InPorts:list<IInPort>
       OutPorts:list<IOutPort>
       Runner:Option<IRunner>
       Renderer:Option<IRenderer>
       DataContext:IWorkerContext
       RunnerContext:Option<IRunnerContext>
   }
   static member CreateNative name iPorts oPorts dataContext runner renderer =
           {
               Name = Var.Create name
               InPorts = iPorts
               OutPorts = oPorts
               Runner = runner
               Renderer = renderer
               DataContext = dataContext 
               RunnerContext = None                   
           }
   static member Create name iPorts oPorts dataContext= 
       IWorker.CreateNative name iPorts oPorts dataContext (Some(dataContext :>IRunner)) (Some(dataContext :>IRenderer)) 
   static member CreateRunner name iPorts oPorts dataContext = 
       IWorker.CreateNative name iPorts oPorts dataContext (Some(dataContext :>IRunner)) None
   static member CreateRenderer name iPorts oPorts dataContext = 
       IWorker.CreateNative name iPorts oPorts dataContext None (Some(dataContext :>IRenderer)) 

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
                         | :? IWorker as worker -> x.Name = worker.Name
                         | _ -> false
and
 [<JavaScript>] IRunner = 
    abstract Run:(IWorker->Option<IRunnerContext>)
and
 [<JavaScript>] IRenderer = abstract Render:(IWorker->Doc)

