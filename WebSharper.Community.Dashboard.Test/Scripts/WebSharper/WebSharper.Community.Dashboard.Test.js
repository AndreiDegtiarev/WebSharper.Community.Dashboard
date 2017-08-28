(function()
{
 "use strict";
 var Global,WebSharper,Community,Dashboard,Test,AppModel,Client,AppModelLib,RuleEntry,AppData,Panel,Helper,RandomRunner,TextBoxRenderer,ChartRenderer,List,PanelData,RuleContainer,RuleChain,App,Remoting,AjaxRemotingProvider,MessageBus,UI,Next,Doc,Environment,console,Var,Strings;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 Test=Dashboard.Test=Dashboard.Test||{};
 AppModel=Test.AppModel=Test.AppModel||{};
 Client=Test.Client=Test.Client||{};
 AppModelLib=Dashboard&&Dashboard.AppModelLib;
 RuleEntry=Dashboard&&Dashboard.RuleEntry;
 AppData=Dashboard&&Dashboard.AppData;
 Panel=Community&&Community.Panel;
 Helper=Panel&&Panel.Helper;
 RandomRunner=Dashboard&&Dashboard.RandomRunner;
 TextBoxRenderer=Dashboard&&Dashboard.TextBoxRenderer;
 ChartRenderer=Dashboard&&Dashboard.ChartRenderer;
 List=WebSharper&&WebSharper.List;
 PanelData=Panel&&Panel.PanelData;
 RuleContainer=Dashboard&&Dashboard.RuleContainer;
 RuleChain=Dashboard&&Dashboard.RuleChain;
 App=Dashboard&&Dashboard.App;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 MessageBus=Dashboard&&Dashboard.MessageBus;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Doc=Next&&Next.Doc;
 Environment=Dashboard&&Dashboard.Environment;
 console=Global.console;
 Var=Next&&Next.Var;
 Strings=WebSharper&&WebSharper.Strings;
 AppModel.FromWorker=function(worker)
 {
  var o;
  o=AppModelLib.FromWorker(worker);
  return o==null?null:{
   $:1,
   $0:{
    $:0,
    $0:o.$0
   }
  };
 };
 AppModel.ToWorker=function(appData)
 {
  return AppModelLib.ToWorker(appData.$0);
 };
 Client.Main=function(config)
 {
  var log,fileName,dashboard;
  function makeTestConfig()
  {
   var panelKey,event,eventWorker,p,p$1,panelData;
   function makeWidget(widget)
   {
    var widgetWorker;
    widgetWorker=AppModel.ToWorker(widget);
    return[[widgetWorker.Key,panelKey,widget],RuleEntry.New(widgetWorker.InPorts.get_Item(0).get_Key(),"",widgetWorker.Key)];
   }
   AppData.Create(dashboard,AppModel.FromWorker);
   panelKey=Helper.UniqueKey();
   event={
    $:0,
    $0:{
     $:0,
     $0:RandomRunner.get_Create()
    }
   };
   eventWorker=AppModel.ToWorker(event);
   p=makeWidget({
    $:0,
    $0:{
     $:3,
     $0:TextBoxRenderer.get_Create()
    }
   });
   p$1=makeWidget({
    $:0,
    $0:{
     $:4,
     $0:ChartRenderer.Create(300,150,50)
    }
   });
   panelData=List.ofArray([PanelData.Create(panelKey,0,0,List.T.Empty)]);
   AppData.New(List.ofArray([["main",List.ofArray([[eventWorker.Key,event]])]]),List.ofArray([["main",panelData,List.ofArray([p[0],p$1[0]])]]),List.ofArray([["main",RuleContainer.New(List.ofArray([RuleChain.New(List.ofArray([RuleEntry.New(eventWorker.InPorts.get_Item(0).get_Key(),eventWorker.OutPorts.get_Item(0).Key,eventWorker.Key),p[1]])),RuleChain.New(List.ofArray([RuleEntry.New(eventWorker.InPorts.get_Item(0).get_Key(),eventWorker.OutPorts.get_Item(0).Key,eventWorker.Key),p$1[1]]))]))]])).RecreateOnClientEventsRunning(dashboard,function()
   {
    return App.PanelContainerCreator();
   },AppModel.ToWorker);
  }
  function loadOnServer(configName)
  {
   var data;
   data=(new AjaxRemotingProvider.New()).Sync("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.LoadFromFile:960175932",[configName]);
   data.RecreateOnClientEventsNotRunning(dashboard,function()
   {
    return App.PanelContainerCreator();
   },AppModel.ToWorker);
   (new AjaxRemotingProvider.New()).Send("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.RecreateOnServer:1430973847",[data]);
   log("Server recreated");
   MessageBus.RunServerRequests();
  }
  function tbCellC(content)
  {
   return Doc.Element("td",[],content);
  }
  Environment.set_Log(function(str)
  {
   console.log(str);
  });
  log=Environment.Log();
  fileName=Var.Create$1("Dashboard");
  dashboard=App.CreateDashboard();
  return Doc.Element("div",[],[dashboard.Render(Doc.Element("div",[],[tbCellC(List.ofArray([Helper.TxtIconNormal("build","Sample configuration",function()
  {
   makeTestConfig();
  })])),tbCellC(List.ofArray([Doc.TextNode("File name"),Doc.Input([],fileName)])),tbCellC(List.ofArray([Helper.TxtIconNormal("archive","Upload",function()
  {
   (new AjaxRemotingProvider.New()).Send("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.SaveToFile:-1517660316",[fileName.c,AppData.Create(dashboard,AppModel.FromWorker)]);
  })])),tbCellC(List.ofArray([Helper.TxtIconNormal("unarchive","Download  and run on client",function()
  {
   (new AjaxRemotingProvider.New()).Sync("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.LoadFromFile:960175932",[fileName.c]).RecreateOnClientEventsRunning(dashboard,function()
   {
    return App.PanelContainerCreator();
   },AppModel.ToWorker);
  })])),tbCellC(List.ofArray([Helper.TxtIconNormal("cloud_upload","Download and run on server",function()
  {
   loadOnServer(fileName.c);
  })]))]))]).OnAfterRender(function()
  {
   try
   {
    !Strings.IsNullOrWhiteSpace(config.ConfigurationName)?loadOnServer(config.ConfigurationName):null;
   }
   catch(m)
   {
    null;
   }
  });
 };
}());
