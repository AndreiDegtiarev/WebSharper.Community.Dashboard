(function()
{
 "use strict";
 var WebSharper,Community,Dashboard,Test,AppModel,Client,IntelliFactory,Runtime,Worker,RandomRunner,OpenWeatherRunner,TextBoxRenderer,ChartRenderer,Operators,Dashboard$1,Panel,PanelContainer,LayoutManagers,UI,Next,AttrModule,Doc,Helper,console,Remoting,AjaxRemotingProvider,List;
 WebSharper=window.WebSharper=window.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 Test=Dashboard.Test=Dashboard.Test||{};
 AppModel=Test.AppModel=Test.AppModel||{};
 Client=Test.Client=Test.Client||{};
 IntelliFactory=window.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Worker=Dashboard&&Dashboard.Worker;
 RandomRunner=Dashboard&&Dashboard.RandomRunner;
 OpenWeatherRunner=Dashboard&&Dashboard.OpenWeatherRunner;
 TextBoxRenderer=Dashboard&&Dashboard.TextBoxRenderer;
 ChartRenderer=Dashboard&&Dashboard.ChartRenderer;
 Operators=WebSharper&&WebSharper.Operators;
 Dashboard$1=Dashboard&&Dashboard.Dashboard;
 Panel=Community&&Community.Panel;
 PanelContainer=Panel&&Panel.PanelContainer;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 AttrModule=Next&&Next.AttrModule;
 Doc=Next&&Next.Doc;
 Helper=Panel&&Panel.Helper;
 console=window.console;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 List=WebSharper&&WebSharper.List;
 AppModel=Test.AppModel=Runtime.Class({
  get_Worker:function()
  {
   return this.$==1?Worker.CreateRunner(this.$0):this.$==2?Worker.CreateRenderer(this.$0):this.$==3?Worker.Create(this.$0):Worker.CreateRunner(this.$0);
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
   $0:(RandomRunner.get_FromInPorts())(worker)
  }):m instanceof Dashboard.OpenWeatherRunner?new AppModel({
   $:1,
   $0:(OpenWeatherRunner.get_FromInPorts())(worker)
  }):m instanceof Dashboard.TextBoxRenderer?new AppModel({
   $:2,
   $0:(TextBoxRenderer.get_FromInPorts())(worker)
  }):m instanceof Dashboard.ChartRenderer?new AppModel({
   $:3,
   $0:(ChartRenderer.get_FromInPorts())(worker)
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
 Client.Main=function()
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
  registerWidget(ChartRenderer.Create(100,100,50));
  return Doc.Element("div",[],[dashboard.get_Render(),Helper.IconNormal("add",function()
  {
   console.log((new AjaxRemotingProvider.New()).Sync("WebSharper.Community.Dashboard.Test:WebSharper.Community.Dashboard.Test.Server.Serialize:232010747",[List.map(function(item)
   {
    return AppModel.FromWorker(item.Worker);
   },List.ofSeq(dashboard.Data.EventItems))]));
  })]);
 };
}());
