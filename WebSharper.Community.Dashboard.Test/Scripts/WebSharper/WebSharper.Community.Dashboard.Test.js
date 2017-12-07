(function()
{
 "use strict";
 var Global,WebSharper,Community,Dashboard,Test,AppModel,Client,WebSharper$Community$Dashboard$Test_JsonDecoder,AppModelLib,RuleEntry,AppData,Panel,Helper,Events,RandomEvent,Widgets,TextBoxWidget,ChartWidget,GaugeWidget,List,PanelData,RuleContainer,RuleChain,App,Remoting,AjaxRemotingProvider,UI,Next,Doc,Environment,console,MessageBus,JSON,Strings,Json,Provider;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 Test=Dashboard.Test=Dashboard.Test||{};
 AppModel=Test.AppModel=Test.AppModel||{};
 Client=Test.Client=Test.Client||{};
 WebSharper$Community$Dashboard$Test_JsonDecoder=Global.WebSharper$Community$Dashboard$Test_JsonDecoder=Global.WebSharper$Community$Dashboard$Test_JsonDecoder||{};
 AppModelLib=Dashboard&&Dashboard.AppModelLib;
 RuleEntry=Dashboard&&Dashboard.RuleEntry;
 AppData=Dashboard&&Dashboard.AppData;
 Panel=Community&&Community.Panel;
 Helper=Panel&&Panel.Helper;
 Events=Dashboard&&Dashboard.Events;
 RandomEvent=Events&&Events.RandomEvent;
 Widgets=Dashboard&&Dashboard.Widgets;
 TextBoxWidget=Widgets&&Widgets.TextBoxWidget;
 ChartWidget=Widgets&&Widgets.ChartWidget;
 GaugeWidget=Widgets&&Widgets.GaugeWidget;
 List=WebSharper&&WebSharper.List;
 PanelData=Panel&&Panel.PanelData;
 RuleContainer=Dashboard&&Dashboard.RuleContainer;
 RuleChain=Dashboard&&Dashboard.RuleChain;
 App=Dashboard&&Dashboard.App;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Doc=Next&&Next.Doc;
 Environment=Dashboard&&Dashboard.Environment;
 console=Global.console;
 MessageBus=Dashboard&&Dashboard.MessageBus;
 JSON=Global.JSON;
 Strings=WebSharper&&WebSharper.Strings;
 Json=WebSharper&&WebSharper.Json;
 Provider=Json&&Json.Provider;
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
  var log,dashboard;
  function makeTestConfig()
  {
   var panelKey,event,eventWorker,p,p$1,p$2,panelData;
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
     $0:RandomEvent.get_Create()
    }
   };
   eventWorker=AppModel.ToWorker(event);
   p=makeWidget({
    $:0,
    $0:{
     $:4,
     $0:TextBoxWidget.get_Create()
    }
   });
   p$1=makeWidget({
    $:0,
    $0:{
     $:5,
     $0:ChartWidget.get_Create()
    }
   });
   p$2=makeWidget({
    $:0,
    $0:{
     $:7,
     $0:GaugeWidget.get_Create()
    }
   });
   panelData=List.ofArray([PanelData.Create(panelKey,0,0,List.T.Empty)]);
   AppData.New(List.ofArray([["main",List.ofArray([[eventWorker.Key,event]])]]),List.ofArray([["main",panelData,List.ofArray([p[0],p$1[0],p$2[0]])]]),List.ofArray([["main",RuleContainer.New(List.ofArray([RuleChain.New(List.ofArray([RuleEntry.New(eventWorker.InPorts.get_Item(0).get_Key(),eventWorker.OutPorts.get_Item(0).Key,eventWorker.Key),p[1]])),RuleChain.New(List.ofArray([RuleEntry.New(eventWorker.InPorts.get_Item(0).get_Key(),eventWorker.OutPorts.get_Item(0).Key,eventWorker.Key),p$1[1]])),RuleChain.New(List.ofArray([RuleEntry.New(eventWorker.InPorts.get_Item(0).get_Key(),eventWorker.OutPorts.get_Item(0).Key,eventWorker.Key),p$2[1]]))]))]])).RecreateOnClientEventsRunning(dashboard,function()
   {
    return App.PanelContainerCreator();
   },AppModel.ToWorker);
  }
  function loadOnServer(configName)
  {
   var data;
   data=(new AjaxRemotingProvider.New()).Sync("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.LoadFromFile:960175932",[configName]);
   (new AjaxRemotingProvider.New()).Send("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.RecreateOnServer:1430973847",[data]);
   log("Server recreated");
  }
  function tbCellC(content)
  {
   return Doc.Element("td",[],content);
  }
  Environment.set_Log(function(str)
  {
   console.log(str);
  });
  MessageBus.RunServerRequests();
  log=Environment.Log();
  dashboard=App.CreateDashboard();
  Environment.set_UpdateConfiguration(function(json)
  {
   try
   {
    (WebSharper$Community$Dashboard$Test_JsonDecoder.j())(JSON.parse(json)).RecreateOnClientEventsNotRunning(dashboard,function()
    {
     return App.PanelContainerCreator();
    },AppModel.ToWorker);
    log("Configuration updated");
   }
   catch(ex)
   {
    log(ex.message);
   }
  });
  return Doc.Element("div",[],[dashboard.Render(Doc.Element("div",[],[tbCellC(List.ofArray([Helper.TxtIconNormal("build","Sample configuration",function()
  {
   makeTestConfig();
  })])),tbCellC(List.ofArray([Helper.TxtIconNormal("autorenew","Refresh",function()
  {
   AppData.Create(dashboard,AppModel.FromWorker).RecreateOnClientEventsRunning(dashboard,function()
   {
    return App.PanelContainerCreator();
   },AppModel.ToWorker);
  })])),tbCellC(List.ofArray([Helper.TxtIconNormal("archive","Upload",function()
  {
   var data;
   data=AppData.Create(dashboard,AppModel.FromWorker);
   (new AjaxRemotingProvider.New()).Send("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.SaveToFile:-1517660316",["Default",data]);
  })])),tbCellC(List.ofArray([Helper.TxtIconNormal("unarchive","Download  and run on client",function()
  {
   (new AjaxRemotingProvider.New()).Sync("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.LoadFromFile:960175932",["Default"]).RecreateOnClientEventsRunning(dashboard,function()
   {
    return App.PanelContainerCreator();
   },AppModel.ToWorker);
  })])),tbCellC(List.ofArray([Helper.TxtIconNormal("cloud_upload","Download and run on server",function()
  {
   loadOnServer("Default");
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
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$8=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$8?WebSharper$Community$Dashboard$Test_JsonDecoder._v$8:WebSharper$Community$Dashboard$Test_JsonDecoder._v$8=(Provider.DecodeUnion(void 0,"$",[[0,[["$0","Item",Provider.Id(),0]]]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$7=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$7?WebSharper$Community$Dashboard$Test_JsonDecoder._v$7:WebSharper$Community$Dashboard$Test_JsonDecoder._v$7=(Provider.DecodeUnion(MessageBus.Value,"$",[[0,[["$0","Item",Provider.Id(),0]]],[1,[["$0","Item",Provider.Id(),0]]],[2,[["$0","Item",Provider.Id(),0]]],[3,[["$0","Item",Provider.DecodeTuple([Provider.Id(),Provider.DecodeList(Provider.Id())]),0]]],[4,[["$0","Item",WebSharper$Community$Dashboard$Test_JsonDecoder.j$8,0]]]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$6=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$6?WebSharper$Community$Dashboard$Test_JsonDecoder._v$6:WebSharper$Community$Dashboard$Test_JsonDecoder._v$6=(Provider.DecodeRecord(MessageBus.Message,[["Key",Provider.Id(),0],["Time",Provider.DecodeDateTime(),0],["Value",WebSharper$Community$Dashboard$Test_JsonDecoder.j$7,0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$5=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$5?WebSharper$Community$Dashboard$Test_JsonDecoder._v$5:WebSharper$Community$Dashboard$Test_JsonDecoder._v$5=(Provider.DecodeRecord(Dashboard.InPortData,[["Key",Provider.Id(),0],["Name",Provider.Id(),0],["Value",WebSharper$Community$Dashboard$Test_JsonDecoder.j$6,0],["CacheSize",Provider.Id(),0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$9=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$9?WebSharper$Community$Dashboard$Test_JsonDecoder._v$9:WebSharper$Community$Dashboard$Test_JsonDecoder._v$9=(Provider.DecodeRecord(Dashboard.OutPort,[["Key",Provider.Id(),0],["Name",Provider.Id(),0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$4=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$4?WebSharper$Community$Dashboard$Test_JsonDecoder._v$4:WebSharper$Community$Dashboard$Test_JsonDecoder._v$4=(Provider.DecodeRecord(void 0,[["WorkerName",Provider.Id(),0],["InPorts",Provider.DecodeList(WebSharper$Community$Dashboard$Test_JsonDecoder.j$5),0],["OutPorts",Provider.DecodeList(WebSharper$Community$Dashboard$Test_JsonDecoder.j$9),0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$3=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$3?WebSharper$Community$Dashboard$Test_JsonDecoder._v$3:WebSharper$Community$Dashboard$Test_JsonDecoder._v$3=(Provider.DecodeRecord(GaugeWidget,[["GaugeWidgetData",WebSharper$Community$Dashboard$Test_JsonDecoder.j$4,0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$10=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$10?WebSharper$Community$Dashboard$Test_JsonDecoder._v$10:WebSharper$Community$Dashboard$Test_JsonDecoder._v$10=(Provider.DecodeRecord(Widgets.ButtonWidget,[["ButtonWidgetData",WebSharper$Community$Dashboard$Test_JsonDecoder.j$4,0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$11=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$11?WebSharper$Community$Dashboard$Test_JsonDecoder._v$11:WebSharper$Community$Dashboard$Test_JsonDecoder._v$11=(Provider.DecodeRecord(ChartWidget,[["ChartWidgetData",WebSharper$Community$Dashboard$Test_JsonDecoder.j$4,0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$12=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$12?WebSharper$Community$Dashboard$Test_JsonDecoder._v$12:WebSharper$Community$Dashboard$Test_JsonDecoder._v$12=(Provider.DecodeRecord(TextBoxWidget,[["TextBoxWidgetData",WebSharper$Community$Dashboard$Test_JsonDecoder.j$4,0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$13=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$13?WebSharper$Community$Dashboard$Test_JsonDecoder._v$13:WebSharper$Community$Dashboard$Test_JsonDecoder._v$13=(Provider.DecodeRecord(Events.DatabaseEvent,[["DatabaseEventData",WebSharper$Community$Dashboard$Test_JsonDecoder.j$4,0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$14=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$14?WebSharper$Community$Dashboard$Test_JsonDecoder._v$14:WebSharper$Community$Dashboard$Test_JsonDecoder._v$14=(Provider.DecodeRecord(Events.OpenWeatherEvent,[["OpenWeatherEventData",WebSharper$Community$Dashboard$Test_JsonDecoder.j$4,0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$15=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$15?WebSharper$Community$Dashboard$Test_JsonDecoder._v$15:WebSharper$Community$Dashboard$Test_JsonDecoder._v$15=(Provider.DecodeRecord(Events.ClockEvent,[["ClockEventData",WebSharper$Community$Dashboard$Test_JsonDecoder.j$4,0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$16=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$16?WebSharper$Community$Dashboard$Test_JsonDecoder._v$16:WebSharper$Community$Dashboard$Test_JsonDecoder._v$16=(Provider.DecodeRecord(RandomEvent,[["RandomEventData",WebSharper$Community$Dashboard$Test_JsonDecoder.j$4,0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$2=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$2?WebSharper$Community$Dashboard$Test_JsonDecoder._v$2:WebSharper$Community$Dashboard$Test_JsonDecoder._v$2=(Provider.DecodeUnion(void 0,"$",[[0,[[null,null,WebSharper$Community$Dashboard$Test_JsonDecoder.j$16]]],[1,[[null,null,WebSharper$Community$Dashboard$Test_JsonDecoder.j$15]]],[2,[[null,null,WebSharper$Community$Dashboard$Test_JsonDecoder.j$14]]],[3,[[null,null,WebSharper$Community$Dashboard$Test_JsonDecoder.j$13]]],[4,[[null,null,WebSharper$Community$Dashboard$Test_JsonDecoder.j$12]]],[5,[[null,null,WebSharper$Community$Dashboard$Test_JsonDecoder.j$11]]],[6,[[null,null,WebSharper$Community$Dashboard$Test_JsonDecoder.j$10]]],[7,[[null,null,WebSharper$Community$Dashboard$Test_JsonDecoder.j$3]]]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$1=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$1?WebSharper$Community$Dashboard$Test_JsonDecoder._v$1:WebSharper$Community$Dashboard$Test_JsonDecoder._v$1=(Provider.DecodeUnion(void 0,"$",[[0,[["$0","Item",WebSharper$Community$Dashboard$Test_JsonDecoder.j$2,0]]]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$17=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$17?WebSharper$Community$Dashboard$Test_JsonDecoder._v$17:WebSharper$Community$Dashboard$Test_JsonDecoder._v$17=(Provider.DecodeRecord(void 0,[["Key",Provider.Id(),0],["Left",Provider.Id(),0],["Top",Provider.Id(),0],["Children",Provider.DecodeList(WebSharper$Community$Dashboard$Test_JsonDecoder.j$17),0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$19=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$19?WebSharper$Community$Dashboard$Test_JsonDecoder._v$19:WebSharper$Community$Dashboard$Test_JsonDecoder._v$19=(Provider.DecodeRecord(void 0,[["RuleChain",Provider.DecodeList(Provider.Id()),0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j$18=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v$18?WebSharper$Community$Dashboard$Test_JsonDecoder._v$18:WebSharper$Community$Dashboard$Test_JsonDecoder._v$18=(Provider.DecodeRecord(RuleContainer,[["RuleContainer",Provider.DecodeList(WebSharper$Community$Dashboard$Test_JsonDecoder.j$19),0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonDecoder.j=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonDecoder._v?WebSharper$Community$Dashboard$Test_JsonDecoder._v:WebSharper$Community$Dashboard$Test_JsonDecoder._v=(Provider.DecodeRecord(AppData,[["Events",Provider.DecodeList(Provider.DecodeTuple([Provider.Id(),Provider.DecodeList(Provider.DecodeTuple([Provider.Id(),WebSharper$Community$Dashboard$Test_JsonDecoder.j$1]))])),0],["Widgets",Provider.DecodeList(Provider.DecodeTuple([Provider.Id(),Provider.DecodeList(WebSharper$Community$Dashboard$Test_JsonDecoder.j$17),Provider.DecodeList(Provider.DecodeTuple([Provider.Id(),Provider.Id(),WebSharper$Community$Dashboard$Test_JsonDecoder.j$1]))])),0],["Rules",Provider.DecodeList(Provider.DecodeTuple([Provider.Id(),WebSharper$Community$Dashboard$Test_JsonDecoder.j$18])),0]]))();
 };
}());
