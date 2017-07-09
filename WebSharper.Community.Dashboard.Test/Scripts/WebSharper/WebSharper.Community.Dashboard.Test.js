(function()
{
 "use strict";
 var Global,WebSharper,Community,Dashboard,Test,Client,Panel,PanelContainer,LayoutManagers,UI,Next,AttrModule,Dashboard$1,SrcOpenWeather,Create,Sources,RandomValueSource,Widgets,TextBox,Chart,Doc;
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
 Create=SrcOpenWeather&&SrcOpenWeather.Create;
 Sources=Dashboard&&Dashboard.Sources;
 RandomValueSource=Sources&&Sources.RandomValueSource;
 Widgets=Dashboard&&Dashboard.Widgets;
 TextBox=Widgets&&Widgets.TextBox;
 Chart=Widgets&&Widgets.Chart;
 Doc=Next&&Next.Doc;
 Client.Main=function()
 {
  var panelContainer,dashboard,a;
  panelContainer=PanelContainer.get_Create().WithLayoutManager(LayoutManagers.FloatingPanelLayoutManager(5)).WithWidth(800).WithHeight(420).WithAttributes([AttrModule.Style("border","1px solid white")]);
  dashboard=Dashboard$1.Create(panelContainer);
  dashboard.Factory.RegisterEvent(new Create.New("London"));
  dashboard.Factory.RegisterEvent(new RandomValueSource.New(50,5));
  dashboard.Factory.RegisterWidget(new TextBox.New());
  dashboard.Factory.RegisterWidget(new Chart.New(100,100,50));
  a=[dashboard.get_Render()];
  return Doc.Element("div",[],a);
 };
}());
