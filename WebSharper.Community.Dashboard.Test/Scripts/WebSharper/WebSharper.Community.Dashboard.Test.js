(function()
{
 "use strict";
 var WebSharper,Community,Dashboard,Test,AppModel,AppData,Client,IntelliFactory,Runtime,AppModelLib,Operators,List,MessageBus,Remoting,AjaxRemotingProvider,UI,Next,Doc,console,Var,App,RuleEntry,Panel,Helper,RandomRunner,TextBoxRenderer,ChartRenderer,PanelData,RuleContainer,RuleChain;
 WebSharper=window.WebSharper=window.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 Test=Dashboard.Test=Dashboard.Test||{};
 AppModel=Test.AppModel=Test.AppModel||{};
 AppData=Test.AppData=Test.AppData||{};
 Client=Test.Client=Test.Client||{};
 IntelliFactory=window.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 AppModelLib=Dashboard&&Dashboard.AppModelLib;
 Operators=WebSharper&&WebSharper.Operators;
 List=WebSharper&&WebSharper.List;
 MessageBus=Dashboard&&Dashboard.MessageBus;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Doc=Next&&Next.Doc;
 console=window.console;
 Var=Next&&Next.Var;
 App=Dashboard&&Dashboard.App;
 RuleEntry=Dashboard&&Dashboard.RuleEntry;
 Panel=Community&&Community.Panel;
 Helper=Panel&&Panel.Helper;
 RandomRunner=Dashboard&&Dashboard.RandomRunner;
 TextBoxRenderer=Dashboard&&Dashboard.TextBoxRenderer;
 ChartRenderer=Dashboard&&Dashboard.ChartRenderer;
 PanelData=Panel&&Panel.PanelData;
 RuleContainer=Dashboard&&Dashboard.RuleContainer;
 RuleChain=Dashboard&&Dashboard.RuleChain;
 AppModel=Test.AppModel=Runtime.Class({
  get_Worker:function()
  {
   return this.$0.get_Worker();
  }
 },null,AppModel);
 AppModel.ToWorker=function(data)
 {
  return AppModel.FromDataContext(data).get_Worker();
 };
 AppModel.FromWorker=function(worker)
 {
  var m;
  m=AppModelLib.FromWorker(worker);
  return m!=null&&m.$==1?new AppModel({
   $:0,
   $0:m.$0
  }):Operators.FailWith("AllTypes FromWorker unknown type");
 };
 AppModel.FromDataContext=function(data)
 {
  var m;
  m=AppModelLib.FromDataContext(data);
  return m!=null&&m.$==1?m.$0:Operators.FailWith("AllTypes FromDataContext unknown type");
 };
 AppData=Test.AppData=Runtime.Class({
  get_RecreateOnServer:function()
  {
   var m,m$1;
   this.Rules.Reconnect(List.map(function(worker)
   {
    return worker.WithStartRunner();
   },List.append((m=function(a,event)
   {
    return event.get_Worker();
   },List.map(function($1)
   {
    return m($1[0],$1[1]);
   },this.Events)),(m$1=function(a,a$1,widget)
   {
    return widget.get_Worker();
   },List.map(function($1)
   {
    return m$1($1[0],$1[1],$1[2]);
   },this.Widgets)))));
  },
  RecreateOnClient:function(dashboard)
  {
   var _this,m,m$1;
   MessageBus.set_Role(MessageBus.Role.Client);
   _this=MessageBus.Agent();
   _this.mailbox.AddLast({
    $:3,
    $0:function(m$2)
    {
     (new AjaxRemotingProvider.New()).Send("WebSharper.Community.Dashboard:WebSharper.Community.Dashboard.MessageBus.SendToServer:-1358505674",[m$2]);
    }
   });
   _this.resume();
   dashboard.Restore(this.PanelData,(m=function(key,event)
   {
    return[key,event.get_Worker()];
   },List.map(function($1)
   {
    return m($1[0],$1[1]);
   },this.Events)),(m$1=function(key,keyPanel,widget)
   {
    return[key,keyPanel,widget.get_Worker()];
   },List.map(function($1)
   {
    return m$1($1[0],$1[1],$1[2]);
   },this.Widgets)),this.Rules);
  },
  Recreate:function(dashboard)
  {
   var m,m$1;
   dashboard.Restore(this.PanelData,(m=function(key,event)
   {
    return[key,event.get_Worker().WithStartRunner()];
   },List.map(function($1)
   {
    return m($1[0],$1[1]);
   },this.Events)),(m$1=function(key,keyPanel,widget)
   {
    return[key,keyPanel,widget.get_Worker()];
   },List.map(function($1)
   {
    return m$1($1[0],$1[1],$1[2]);
   },this.Widgets)),this.Rules);
  }
 },null,AppData);
 AppData.Create=function(dashboard)
 {
  var p;
  p=dashboard.Store(AppModel.FromWorker);
  return AppData.New(p[0],p[1],p[2],p[3]);
 };
 AppData.New=function(PanelData$1,Events,Widgets,Rules)
 {
  return new AppData({
   PanelData:PanelData$1,
   Events:Events,
   Widgets:Widgets,
   Rules:Rules
  });
 };
 Client.Main=function()
 {
  var fileName,dashboard,makeTestConfig;
  function tbCellC(content)
  {
   return Doc.Element("td",[],content);
  }
  MessageBus.set_Log(function(str)
  {
   console.log(str);
  });
  fileName=Var.Create$1("D:\\Dashboard.cfg");
  dashboard=App.CreateDashboard();
  makeTestConfig=function()
  {
   var panelKey,event,eventWorker,p,p$1;
   function makeWidget(widget)
   {
    var widgetWorker;
    widgetWorker=widget.get_Worker();
    return[[widgetWorker.Key,panelKey,widget],RuleEntry.New(widgetWorker.InPorts.get_Item(0).Key,"",widgetWorker.Key)];
   }
   AppData.Create(dashboard);
   panelKey=Helper.UniqueKey();
   event=new AppModel({
    $:0,
    $0:new AppModelLib({
     $:0,
     $0:RandomRunner.Create(100,50)
    })
   });
   eventWorker=event.get_Worker();
   p=makeWidget(new AppModel({
    $:0,
    $0:new AppModelLib({
     $:3,
     $0:TextBoxRenderer.get_Create()
    })
   }));
   p$1=makeWidget(new AppModel({
    $:0,
    $0:new AppModelLib({
     $:4,
     $0:ChartRenderer.Create(300,150,50)
    })
   }));
   AppData.New(List.ofArray([PanelData.Create(panelKey,0,0,List.T.Empty)]),List.ofArray([[eventWorker.Key,event]]),List.ofArray([p[0],p$1[0]]),RuleContainer.New(List.ofArray([RuleChain.New(List.ofArray([RuleEntry.New(eventWorker.InPorts.get_Item(0).Key,eventWorker.OutPorts.get_Item(0).Key,eventWorker.Key),p[1]])),RuleChain.New(List.ofArray([RuleEntry.New(eventWorker.InPorts.get_Item(0).Key,eventWorker.OutPorts.get_Item(0).Key,eventWorker.Key),p$1[1]]))]))).Recreate(dashboard);
  };
  return Doc.Element("div",[],[Doc.Element("table",[],[Doc.Element("tr",[],[tbCellC(List.ofArray([Helper.TxtIconNormal("build","Sample configuration",function()
  {
   makeTestConfig();
  })])),tbCellC(List.ofArray([Doc.TextNode("File name"),Doc.Input([],fileName)])),tbCellC(List.ofArray([Helper.TxtIconNormal("archive","Upload",function()
  {
   (new AjaxRemotingProvider.New()).Send("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.SaveToFile:-1567987319",[fileName.c,AppData.Create(dashboard)]);
  })])),tbCellC(List.ofArray([Helper.TxtIconNormal("unarchive","Download  and run on client",function()
  {
   (new AjaxRemotingProvider.New()).Sync("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.LoadFromFile:-133840407",[fileName.c]).Recreate(dashboard);
  })])),tbCellC(List.ofArray([Helper.TxtIconNormal("cloud_upload","Download and run on server",function()
  {
   var data;
   data=(new AjaxRemotingProvider.New()).Sync("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.LoadFromFile:-133840407",[fileName.c]);
   data.RecreateOnClient(dashboard);
   (new AjaxRemotingProvider.New()).Send("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.RecreateOnServer:-1126735520",[data]);
   MessageBus.RunServerRequests();
  })]))])]),dashboard.get_Render()]);
 };
}());
