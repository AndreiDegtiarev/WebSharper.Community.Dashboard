(function()
{
 "use strict";
 var WebSharper,Community,Dashboard,Test,AppModel,Client,WebSharper$Community$Dashboard$Test_JsonEncoder,IntelliFactory,Runtime,IWorker,List,Ports,Operators,Dashboard$1,Panel,PanelContainer,LayoutManagers,UI,Next,AttrModule,OpenWeatherRunner,RandomRunner,TextBoxRenderer,ChartRenderer,Doc,Helper,console,JSON,Json,Provider;
 WebSharper=window.WebSharper=window.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 Test=Dashboard.Test=Dashboard.Test||{};
 AppModel=Test.AppModel=Test.AppModel||{};
 Client=Test.Client=Test.Client||{};
 WebSharper$Community$Dashboard$Test_JsonEncoder=window.WebSharper$Community$Dashboard$Test_JsonEncoder=window.WebSharper$Community$Dashboard$Test_JsonEncoder||{};
 IntelliFactory=window.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 IWorker=Dashboard&&Dashboard.IWorker;
 List=WebSharper&&WebSharper.List;
 Ports=Dashboard&&Dashboard.Ports;
 Operators=WebSharper&&WebSharper.Operators;
 Dashboard$1=Dashboard&&Dashboard.Dashboard;
 Panel=Community&&Community.Panel;
 PanelContainer=Panel&&Panel.PanelContainer;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 AttrModule=Next&&Next.AttrModule;
 OpenWeatherRunner=Dashboard&&Dashboard.OpenWeatherRunner;
 RandomRunner=Dashboard&&Dashboard.RandomRunner;
 TextBoxRenderer=Dashboard&&Dashboard.TextBoxRenderer;
 ChartRenderer=Dashboard&&Dashboard.ChartRenderer;
 Doc=Next&&Next.Doc;
 Helper=Panel&&Panel.Helper;
 console=window.console;
 JSON=window.JSON;
 Json=WebSharper&&WebSharper.Json;
 Provider=Json&&Json.Provider;
 AppModel=Test.AppModel=Runtime.Class({
  get_IWorker:function()
  {
   var src,src$1,src$2;
   return this.$==1?(src=this.$0,IWorker.CreateRunner("OpenWeatherMap",List.ofArray([Ports.InPortStr("City",src.OpenWeatherCity),Ports.InPortStr("ApiKey",src.OpenWeatherApiKey)]),List.ofArray([Ports.OutPortNum("Temperature")]),src)):this.$==2?IWorker.CreateRenderer("Text",List.ofArray([Ports.InPortNum("in Value",0)]),List.T.Empty,this.$0):this.$==3?(src$1=this.$0,IWorker.Create("Chart",List.ofArray([Ports.InPortNum("in Value",0),Ports.InPortNum("cx",src$1.Cx),Ports.InPortNum("cy",src$1.Cy),Ports.InPortNum("BufferSize",+src$1.ChartBufferSize)]),List.T.Empty,src$1)):(src$2=this.$0,IWorker.CreateRunner("Random",List.ofArray([Ports.InPortNum("Middle value",src$2.MiddleValue),Ports.InPortNum("Dispersion",src$2.Dispersion)]),List.ofArray([Ports.OutPortNum("Random value")]),src$2));
  }
 },null,AppModel);
 AppModel.ToIWorker=function(data)
 {
  return AppModel.FromDataContext(data).get_IWorker();
 };
 AppModel.FromIWorker=function(worker)
 {
  return AppModel.FromDataContext(worker.DataContext);
 };
 AppModel.FromDataContext=function(data)
 {
  return data instanceof Dashboard.RandomRunner?new AppModel({
   $:0,
   $0:data
  }):data instanceof Dashboard.OpenWeatherRunner?new AppModel({
   $:1,
   $0:data
  }):data instanceof Dashboard.TextBoxRenderer?new AppModel({
   $:2,
   $0:data
  }):data instanceof Dashboard.ChartRenderer?new AppModel({
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
   return fnc(AppModel.ToIWorker(data));
  };
  registerEvent(OpenWeatherRunner.Create("London",""));
  registerEvent(RandomRunner.Create(50,5));
  registerWidget(TextBoxRenderer.get_Create());
  registerWidget(ChartRenderer.Create(100,100,50));
  return Doc.Element("div",[],[dashboard.get_Render(),Helper.IconNormal("add",function()
  {
   var elems;
   elems=List.map(function(item)
   {
    return AppModel.FromIWorker(item.Worker);
   },List.ofSeq(dashboard.Data.EventItems));
   console.log(JSON.stringify(((Provider.EncodeList(WebSharper$Community$Dashboard$Test_JsonEncoder.j))())(elems)));
  })]);
 };
 WebSharper$Community$Dashboard$Test_JsonEncoder.j$1=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonEncoder._v$1?WebSharper$Community$Dashboard$Test_JsonEncoder._v$1:WebSharper$Community$Dashboard$Test_JsonEncoder._v$1=(Provider.EncodeRecord(ChartRenderer,[["Cx",Provider.Id(),0],["Cy",Provider.Id(),0],["ChartBufferSize",Provider.Id(),0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonEncoder.j$2=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonEncoder._v$2?WebSharper$Community$Dashboard$Test_JsonEncoder._v$2:WebSharper$Community$Dashboard$Test_JsonEncoder._v$2=(Provider.EncodeRecord(TextBoxRenderer,[["TextBoxRenderer",Provider.Id(),0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonEncoder.j$3=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonEncoder._v$3?WebSharper$Community$Dashboard$Test_JsonEncoder._v$3:WebSharper$Community$Dashboard$Test_JsonEncoder._v$3=(Provider.EncodeRecord(OpenWeatherRunner,[["OpenWeatherCity",Provider.Id(),0],["OpenWeatherApiKey",Provider.Id(),0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonEncoder.j$4=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonEncoder._v$4?WebSharper$Community$Dashboard$Test_JsonEncoder._v$4:WebSharper$Community$Dashboard$Test_JsonEncoder._v$4=(Provider.EncodeRecord(RandomRunner,[["MiddleValue",Provider.Id(),0],["Dispersion",Provider.Id(),0]]))();
 };
 WebSharper$Community$Dashboard$Test_JsonEncoder.j=function()
 {
  return WebSharper$Community$Dashboard$Test_JsonEncoder._v?WebSharper$Community$Dashboard$Test_JsonEncoder._v:WebSharper$Community$Dashboard$Test_JsonEncoder._v=(Provider.EncodeUnion(AppModel,"$",[[0,[[null,null,WebSharper$Community$Dashboard$Test_JsonEncoder.j$4]]],[1,[[null,null,WebSharper$Community$Dashboard$Test_JsonEncoder.j$3]]],[2,[[null,null,WebSharper$Community$Dashboard$Test_JsonEncoder.j$2]]],[3,[[null,null,WebSharper$Community$Dashboard$Test_JsonEncoder.j$1]]]]))();
 };
}());
