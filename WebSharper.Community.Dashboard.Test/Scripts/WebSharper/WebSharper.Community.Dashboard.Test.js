(function()
{
 "use strict";
 var Global,WebSharper,Community,Dashboard,Test,Client,Panel,PanelContainer,LayoutManagers,UI,Next,AttrModule,Dashboard$1,SrcOpenWeather,Sources,Widgets,Doc;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 Test=Dashboard.Test=Dashboard.Test||{};
 Client=Test.Client=Test.Client||{};
 Panel=Community&&Community.Panel;
 PanelContainer=Panel&&Panel.PanelContainer;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 AttrModule=Next&&Next.AttrModule;
 Dashboard$1=Dashboard&&Dashboard.Dashboard;
 SrcOpenWeather=Dashboard&&Dashboard.SrcOpenWeather;
 Sources=Dashboard&&Dashboard.Sources;
 Widgets=Dashboard&&Dashboard.Widgets;
 Doc=Next&&Next.Doc;
 Client.Main=function()
 {
  var panelContainer,dashboard,_this,a;
  panelContainer=PanelContainer.get_Create().WithLayoutManager(LayoutManagers.FloatingPanelLayoutManager(5)).WithWidth(800).WithHeight(420).WithAttributes([AttrModule.Style("border","1px solid white")]);
  dashboard=Dashboard$1.Create(panelContainer);
  dashboard.Factory.RegisterSource(SrcOpenWeather.Create("London"));
  dashboard.Factory.RegisterSource(Sources.RandomValueSource(50,5));
  dashboard.Factory.RegisterReceiver(Widgets.text());
  dashboard.Factory.RegisterReceiver(Widgets.chart(100,100,50));
  _this=(a=[dashboard.get_Render()],Doc.Element("div",[],a));
  return _this.OnAfterRender(function()
  {
  });
 };
}());
