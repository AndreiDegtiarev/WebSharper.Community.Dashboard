(function()
{
 "use strict";
 var Global,WebSharper,Community,Dashboard,Test,Client,Panel,LayoutManagers,PanelContainer,UI,Next,AttrModule,Dashboard$1,Sources,SrcOpenWeather,Doc,List,Widgets;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 Test=Dashboard.Test=Dashboard.Test||{};
 Client=Test.Client=Test.Client||{};
 Panel=Community&&Community.Panel;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 PanelContainer=Panel&&Panel.PanelContainer;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 AttrModule=Next&&Next.AttrModule;
 Dashboard$1=Dashboard&&Dashboard.Dashboard;
 Sources=Dashboard&&Dashboard.Sources;
 SrcOpenWeather=Dashboard&&Dashboard.SrcOpenWeather;
 Doc=Next&&Next.Doc;
 List=WebSharper&&WebSharper.List;
 Widgets=Dashboard&&Dashboard.Widgets;
 Client.Main=function()
 {
  var layoutManager,panelContainer,dashboard,srcRandom2,srcRandom1,_this,a;
  layoutManager=LayoutManagers.FloatingPanelLayoutManager(5);
  panelContainer=PanelContainer.get_Create().WithLayoutManager(layoutManager).WithWidth(800).WithHeight(420).WithAttributes([AttrModule.Style("border","1px solid white")]);
  dashboard=Dashboard$1.Create(panelContainer);
  srcRandom2=Sources.RandomValueSource(50,5);
  srcRandom1=SrcOpenWeather.Create("Herzogenaurach");
  srcRandom1.WebSharper_Community_Dashboard_ISource$Run();
  srcRandom2.WebSharper_Community_Dashboard_ISource$Run();
  _this=(a=[dashboard.get_Render()],Doc.Element("div",[],a));
  return _this.OnAfterRender(function(el)
  {
   var clientWidth,cx;
   function createPanel(name,src,fnc)
   {
    var clientContainer,a$1;
    clientContainer=dashboard.CreatePanel(name,cx,{
     $:1,
     $0:fnc
    });
    a$1=function(widget)
    {
     src.WebSharper_Community_Dashboard_ISource$get_OutPorts().get_Item(0).WebSharper_Community_Dashboard_IOutPort$Connect(widget.WebSharper_Community_Dashboard_IReceiver$get_InPorts().get_Item(0));
     dashboard.RegisterReceiver(clientContainer,widget);
    };
    (function(l)
    {
     List.iter(a$1,l);
    }(List.ofArray([Widgets.text(),Widgets.chart(cx-270<<0,120,50)])));
   }
   Global.console.log("OnAfterRender");
   clientWidth=el.clientWidth;
   cx=800-15;
   createPanel("Panel1",srcRandom1,function(panel)
   {
    layoutManager.WebSharper_Community_Panel_ILayoutManager$Relayout(panelContainer,panel);
   });
   createPanel("Panel2",srcRandom2,function(panel)
   {
    Global.console.log("second create panel");
    layoutManager.WebSharper_Community_Panel_ILayoutManager$PlacePanel(panelContainer,panel);
   });
  });
 };
}());
