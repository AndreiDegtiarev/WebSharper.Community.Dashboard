(function()
{
 "use strict";
 var WebSharper,Community,Dashboard,Test,AppModel,AppData,Client,IntelliFactory,Runtime,Worker,RandomRunner,OpenWeatherRunner,TextBoxRenderer,ChartRenderer,Operators,List,Dashboard$1,Panel,PanelContainer,LayoutManagers,UI,Next,AttrModule,DshEditorData,Var,Helper,PanelData,DshEditorRowData,DshEditorCellData,Doc,Remoting,AjaxRemotingProvider;
 WebSharper=window.WebSharper=window.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 Test=Dashboard.Test=Dashboard.Test||{};
 AppModel=Test.AppModel=Test.AppModel||{};
 AppData=Test.AppData=Test.AppData||{};
 Client=Test.Client=Test.Client||{};
 IntelliFactory=window.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Worker=Dashboard&&Dashboard.Worker;
 RandomRunner=Dashboard&&Dashboard.RandomRunner;
 OpenWeatherRunner=Dashboard&&Dashboard.OpenWeatherRunner;
 TextBoxRenderer=Dashboard&&Dashboard.TextBoxRenderer;
 ChartRenderer=Dashboard&&Dashboard.ChartRenderer;
 Operators=WebSharper&&WebSharper.Operators;
 List=WebSharper&&WebSharper.List;
 Dashboard$1=Dashboard&&Dashboard.Dashboard;
 Panel=Community&&Community.Panel;
 PanelContainer=Panel&&Panel.PanelContainer;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 AttrModule=Next&&Next.AttrModule;
 DshEditorData=Dashboard&&Dashboard.DshEditorData;
 Var=Next&&Next.Var;
 Helper=Panel&&Panel.Helper;
 PanelData=Panel&&Panel.PanelData;
 DshEditorRowData=Dashboard&&Dashboard.DshEditorRowData;
 DshEditorCellData=Dashboard&&Dashboard.DshEditorCellData;
 Doc=Next&&Next.Doc;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 AppModel=Test.AppModel=Runtime.Class({
  get_Worker:function()
  {
   var src,src$1,src$2,src$3;
   return this.$==1?(src=this.$0,Worker.Create(src).WithRunner(src)):this.$==2?(src$1=this.$0,Worker.Create(src$1).WithRenderer(src$1)):this.$==3?(src$2=this.$0,Worker.Create(src$2).WithRunner(src$2).WithRenderer(src$2)):(src$3=this.$0,Worker.Create(src$3).WithRunner(src$3));
  }
 },null,AppModel);
 AppModel.ToWorker=function(data)
 {
  return AppModel.FromDataContext(data).get_Worker();
 };
 AppModel.FromWorker=function(worker)
 {
  var m;
  m=worker.DataContext;
  return m instanceof Dashboard.RandomRunner?new AppModel({
   $:0,
   $0:(RandomRunner.get_FromPorts())(worker)
  }):m instanceof Dashboard.OpenWeatherRunner?new AppModel({
   $:1,
   $0:(OpenWeatherRunner.get_FromPorts())(worker)
  }):m instanceof Dashboard.TextBoxRenderer?new AppModel({
   $:2,
   $0:(TextBoxRenderer.get_FromPorts())(worker)
  }):m instanceof Dashboard.ChartRenderer?new AppModel({
   $:3,
   $0:(ChartRenderer.get_FromPorts())(worker)
  }):Operators.FailWith("AllTypes FromDataContext unknown type");
 };
 AppModel.FromDataContext=function(data)
 {
  return data instanceof RandomRunner?new AppModel({
   $:0,
   $0:data
  }):data instanceof OpenWeatherRunner?new AppModel({
   $:1,
   $0:data
  }):data instanceof TextBoxRenderer?new AppModel({
   $:2,
   $0:data
  }):data instanceof ChartRenderer?new AppModel({
   $:3,
   $0:data
  }):Operators.FailWith("AllTypes FromDataContext unknown type");
 };
 AppData=Test.AppData=Runtime.Class({
  Recreate:function(dashboard)
  {
   var m,m$1;
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
   },this.Widgets)),this.DshEditorData);
  }
 },null,AppData);
 AppData.get_CreateDashboard=function()
 {
  var dashboard,register;
  function registerEvent(data)
  {
   var o;
   register(data,(o=dashboard.Factory,function(a)
   {
    o.RegisterEvent(a);
   }));
  }
  function registerWidget(data)
  {
   var o;
   register(data,(o=dashboard.Factory,function(a)
   {
    o.RegisterWidget(a);
   }));
  }
  dashboard=Dashboard$1.Create(PanelContainer.get_Create().WithLayoutManager(LayoutManagers.FloatingPanelLayoutManager(5)).WithWidth(800).WithHeight(420).WithAttributes([AttrModule.Style("border","1px solid white")]));
  register=function(data,fnc)
  {
   return fnc(AppModel.ToWorker(data));
  };
  registerEvent(OpenWeatherRunner.Create("London",""));
  registerEvent(RandomRunner.Create(50,5));
  registerWidget(TextBoxRenderer.get_Create());
  registerWidget(ChartRenderer.Create(300,100,50));
  return dashboard;
 };
 AppData.Create=function(dashboard)
 {
  return AppData.New(List.map(function(panel)
  {
   return panel.get_PanelData();
  },List.ofSeq(dashboard.PanelContainer.PanelItems)),List.map(function(item)
  {
   return[item.Worker.Key,AppModel.FromWorker(item.Worker)];
  },List.ofSeq(dashboard.Data.EventItems)),List.map(function(item)
  {
   return[item.Widget.Key,item.Panel,AppModel.FromWorker(item.Widget)];
  },List.ofSeq(dashboard.Data.WidgetItems)),DshEditorData.Create(dashboard.Editor));
 };
 AppData.New=function(PanelData$1,Events,Widgets,DshEditorData$1)
 {
  return new AppData({
   PanelData:PanelData$1,
   Events:Events,
   Widgets:Widgets,
   DshEditorData:DshEditorData$1
  });
 };
 Client.Main=function()
 {
  var fileName,dashboard,makeTestConfig;
  fileName=Var.Create$1("D:\\Dashboard.cfg");
  dashboard=AppData.get_CreateDashboard();
  makeTestConfig=function()
  {
   var panelKey,event,eventWorker,widget,widgetWorker;
   AppData.Create(dashboard);
   panelKey=Helper.UniqueKey();
   event=new AppModel({
    $:0,
    $0:RandomRunner.Create(100,50)
   });
   eventWorker=event.get_Worker();
   widget=new AppModel({
    $:2,
    $0:TextBoxRenderer.get_Create()
   });
   widgetWorker=widget.get_Worker();
   AppData.New(List.ofArray([PanelData.Create(panelKey,0,0,List.T.Empty)]),List.ofArray([[eventWorker.Key,event]]),List.ofArray([[widgetWorker.Key,panelKey,widget]]),DshEditorData.New(List.ofArray([DshEditorRowData.New(List.ofArray([DshEditorCellData.New(eventWorker.InPorts.get_Item(0).Key,eventWorker.OutPorts.get_Item(0).Key,eventWorker.Key),DshEditorCellData.New(widgetWorker.InPorts.get_Item(0).Key,"",widgetWorker.Key)]))]))).Recreate(dashboard);
  };
  return Doc.Element("div",[],[dashboard.get_Render(),Doc.TextNode("File name"),Doc.Input([],fileName),Helper.TxtIconNormal("file_upload","Upload",function()
  {
   (new AjaxRemotingProvider.New()).Send("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.SaveToFile:-1567987319",[fileName.c,AppData.Create(dashboard)]);
  }),Helper.TxtIconNormal("file_download","Download",function()
  {
   (new AjaxRemotingProvider.New()).Sync("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.LoadFromFile:-133840407",[fileName.c]).Recreate(dashboard);
  }),Helper.TxtIconNormal("build","Sample configuration",function()
  {
   makeTestConfig();
  })]);
 };
}());
