(function()
{
 "use strict";
 var Global,WebSharper,Community,Dashboard,Test,Client,Panel,PanelContainer,LayoutManagers,UI,Next,AttrModule,Dashboard$1,RandomValueSource,Doc,Var,Util,Receivers;
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
 RandomValueSource=Dashboard&&Dashboard.RandomValueSource;
 Doc=Next&&Next.Doc;
 Var=Next&&Next.Var;
 Util=WebSharper&&WebSharper.Util;
 Receivers=Dashboard&&Dashboard.Receivers;
 Client.Main=function()
 {
  var panelContainer,dashboard,srcRandom,_this,a;
  panelContainer=PanelContainer.get_Create().WithLayoutManager(LayoutManagers.FloatingPanelLayoutManager(5)).WithWidth(800).WithHeight(400).WithAttributes([AttrModule.Style("border","1px solid white")]);
  dashboard=Dashboard$1.Create(panelContainer);
  srcRandom=RandomValueSource.get_Create();
  dashboard.AddSource(srcRandom);
  _this=(a=[dashboard.get_Render()],Doc.Element("div",[],a));
  return _this.OnAfterRender(function(el)
  {
   var clientWidth,cx,varText,createPanel;
   Global.console.log("OnAfterRender");
   clientWidth=el.clientWidth;
   cx=800-15;
   varText=Var.Create$1("");
   Util.addListener(srcRandom.WebSharper_Community_Dashboard_ISource$get_String().event,function(str)
   {
    Var.Set(varText,str);
   });
   createPanel=function(fnc)
   {
    var clientContainer;
    clientContainer=dashboard.CreatePanel(cx,{
     $:1,
     $0:fnc
    });
    dashboard.AddReceiver(clientContainer,Receivers.receiverText(varText.v));
    dashboard.AddReceiver(clientContainer,Receivers.receiverChart(srcRandom.WebSharper_Community_Dashboard_ISource$get_Number(),cx-270<<0,120));
   };
   createPanel(function()
   {
    createPanel(function()
    {
    });
   });
  });
 };
}());
