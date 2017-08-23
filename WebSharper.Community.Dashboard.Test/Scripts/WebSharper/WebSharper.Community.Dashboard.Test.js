(function()
{
 "use strict";
 var Global,WebSharper,Community,Dashboard,Test,AppModel,AppData,Client,IntelliFactory,Runtime,AppModelLib,Operators,List,Environment,MessageBus,Remoting,AjaxRemotingProvider,RuleEntry,Panel,Helper,RandomRunner,TextBoxRenderer,ChartRenderer,PanelData,RuleContainer,RuleChain,App,UI,Next,Doc,console,Var,Strings;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 Test=Dashboard.Test=Dashboard.Test||{};
 AppModel=Test.AppModel=Test.AppModel||{};
 AppData=Test.AppData=Test.AppData||{};
 Client=Test.Client=Test.Client||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 AppModelLib=Dashboard&&Dashboard.AppModelLib;
 Operators=WebSharper&&WebSharper.Operators;
 List=WebSharper&&WebSharper.List;
 Environment=Dashboard&&Dashboard.Environment;
 MessageBus=Dashboard&&Dashboard.MessageBus;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 RuleEntry=Dashboard&&Dashboard.RuleEntry;
 Panel=Community&&Community.Panel;
 Helper=Panel&&Panel.Helper;
 RandomRunner=Dashboard&&Dashboard.RandomRunner;
 TextBoxRenderer=Dashboard&&Dashboard.TextBoxRenderer;
 ChartRenderer=Dashboard&&Dashboard.ChartRenderer;
 PanelData=Panel&&Panel.PanelData;
 RuleContainer=Dashboard&&Dashboard.RuleContainer;
 RuleChain=Dashboard&&Dashboard.RuleChain;
 App=Dashboard&&Dashboard.App;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Doc=Next&&Next.Doc;
 console=Global.console;
 Var=Next&&Next.Var;
 Strings=WebSharper&&WebSharper.Strings;
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
   var allEvents,allWorkers;
   function m(a$1,gr)
   {
    return gr;
   }
   function m$1(a$1,gr)
   {
    return gr;
   }
   function m$2(a$1,a$2,gr)
   {
    return gr;
   }
   function m$3(a$1,a$2,gr)
   {
    return gr;
   }
   function a(grName,rules)
   {
    rules.Reconnect(allWorkers);
   }
   allEvents=List.map(function($1)
   {
    return m($1[0],$1[1]);
   },List.concat(List.map(function($1)
   {
    return m$1($1[0],$1[1]);
   },this.RecreateEvents(Global.id))));
   allWorkers=List.map(function(worker)
   {
    return worker.WithStartRunner();
   },List.append(allEvents,List.map(function($1)
   {
    return m$2($1[0],$1[1],$1[2]);
   },List.concat(List.map(function($1)
   {
    return m$3($1[0],$1[1],$1[2]);
   },this.get_RecreateWidgets())))));
   List.iter(function($1)
   {
    return a($1[0],$1[1]);
   },this.Rules);
   return allEvents;
  },
  RecreateOnClient:function(dashboard,panelContainerCreator)
  {
   var _this;
   Environment.set_Role(Environment.Role.Client);
   _this=MessageBus.Agent();
   _this.mailbox.AddLast({
    $:3,
    $0:function(m)
    {
     (new AjaxRemotingProvider.New()).Send("WebSharper.Community.Dashboard:WebSharper.Community.Dashboard.MessageBus.SendToServer:-1358505674",[m]);
    }
   });
   _this.resume();
   dashboard.Restore(panelContainerCreator,this.RecreateEvents(Global.id),this.get_RecreateWidgets(),this.Rules);
  },
  Recreate:function(dashboard,panelContainerCreator)
  {
   dashboard.Restore(panelContainerCreator,this.RecreateEvents(function(worker)
   {
    return worker.WithStartRunner();
   }),this.get_RecreateWidgets(),this.Rules);
  },
  get_RecreateWidgets:function()
  {
   function m(grName,panelData,gr)
   {
    function m$1(key,keyPanel,widget)
    {
     return[key,keyPanel,widget.get_Worker()];
    }
    return[grName,panelData,List.map(function($1)
    {
     return m$1($1[0],$1[1],$1[2]);
    },gr)];
   }
   return List.map(function($1)
   {
    return m($1[0],$1[1],$1[2]);
   },this.Widgets);
  },
  RecreateEvents:function(fnc)
  {
   function m(grName,gr)
   {
    function m$1(key,event)
    {
     return[key,fnc(event.get_Worker())];
    }
    return[grName,List.map(function($1)
    {
     return m$1($1[0],$1[1]);
    },gr)];
   }
   return List.map(function($1)
   {
    return m($1[0],$1[1]);
   },this.Events);
  }
 },null,AppData);
 AppData.Create=function(dashboard)
 {
  var p;
  p=dashboard.Store(AppModel.FromWorker);
  return AppData.New(p[0],p[1],p[2]);
 };
 AppData.get_empty=function()
 {
  return AppData.New(List.T.Empty,List.T.Empty,List.T.Empty);
 };
 AppData.New=function(Events,Widgets,Rules)
 {
  return new AppData({
   Events:Events,
   Widgets:Widgets,
   Rules:Rules
  });
 };
 Client.Main=function(config)
 {
  var fileName,dashboard;
  function makeTestConfig()
  {
   var panelKey,event,eventWorker,p,p$1,panelData;
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
   panelData=List.ofArray([PanelData.Create(panelKey,0,0,List.T.Empty)]);
   AppData.New(List.ofArray([["main",List.ofArray([[eventWorker.Key,event]])]]),List.ofArray([["main",panelData,List.ofArray([p[0],p$1[0]])]]),List.ofArray([["main",RuleContainer.New(List.ofArray([RuleChain.New(List.ofArray([RuleEntry.New(eventWorker.InPorts.get_Item(0).Key,eventWorker.OutPorts.get_Item(0).Key,eventWorker.Key),p[1]])),RuleChain.New(List.ofArray([RuleEntry.New(eventWorker.InPorts.get_Item(0).Key,eventWorker.OutPorts.get_Item(0).Key,eventWorker.Key),p$1[1]]))]))]])).Recreate(dashboard,function()
   {
    return App.PanelContainerCreator();
   });
  }
  function loadOnServer(configName)
  {
   var data;
   data=(new AjaxRemotingProvider.New()).Sync("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.LoadFromFile:-133840407",[configName]);
   data.RecreateOnClient(dashboard,function()
   {
    return App.PanelContainerCreator();
   });
   (new AjaxRemotingProvider.New()).Sync("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.RecreateOnServer:1994187327",[data]);
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
  fileName=Var.Create$1("Dashboard");
  dashboard=App.CreateDashboard();
  return Doc.Element("div",[],[dashboard.Render(Doc.Element("div",[],[tbCellC(List.ofArray([Helper.TxtIconNormal("build","Sample configuration",function()
  {
   makeTestConfig();
  })])),tbCellC(List.ofArray([Doc.TextNode("File name"),Doc.Input([],fileName)])),tbCellC(List.ofArray([Helper.TxtIconNormal("archive","Upload",function()
  {
   (new AjaxRemotingProvider.New()).Send("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.SaveToFile:-1567987319",[fileName.c,AppData.Create(dashboard)]);
  })])),tbCellC(List.ofArray([Helper.TxtIconNormal("unarchive","Download  and run on client",function()
  {
   (new AjaxRemotingProvider.New()).Sync("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.LoadFromFile:-133840407",[fileName.c]).Recreate(dashboard,function()
   {
    return App.PanelContainerCreator();
   });
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
