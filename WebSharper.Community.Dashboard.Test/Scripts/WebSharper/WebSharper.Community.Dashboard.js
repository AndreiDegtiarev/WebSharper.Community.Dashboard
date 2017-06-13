(function()
{
 "use strict";
 var Global,WebSharper,Community,Dashboard,RandomValueSource,Receivers,SourceItem,ReceiverItem,Dashboard$1,IntelliFactory,Runtime,Random,Concurrency,Control,FSharpEvent,Charting,LiveChart,Renderers,ChartJs,UI,Next,AttrProxy,Doc,Key,Panel,PanelContainer,LayoutManagers,AttrModule,Panel$1,List,TitleButton,Operators,ListModel;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 RandomValueSource=Dashboard.RandomValueSource=Dashboard.RandomValueSource||{};
 Receivers=Dashboard.Receivers=Dashboard.Receivers||{};
 SourceItem=Dashboard.SourceItem=Dashboard.SourceItem||{};
 ReceiverItem=Dashboard.ReceiverItem=Dashboard.ReceiverItem||{};
 Dashboard$1=Dashboard.Dashboard=Dashboard.Dashboard||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Random=WebSharper&&WebSharper.Random;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Control=WebSharper&&WebSharper.Control;
 FSharpEvent=Control&&Control.FSharpEvent;
 Charting=WebSharper&&WebSharper.Charting;
 LiveChart=Charting&&Charting.LiveChart;
 Renderers=Charting&&Charting.Renderers;
 ChartJs=Renderers&&Renderers.ChartJs;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 AttrProxy=Next&&Next.AttrProxy;
 Doc=Next&&Next.Doc;
 Key=Next&&Next.Key;
 Panel=Community&&Community.Panel;
 PanelContainer=Panel&&Panel.PanelContainer;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 AttrModule=Next&&Next.AttrModule;
 Panel$1=Panel&&Panel.Panel;
 List=WebSharper&&WebSharper.List;
 TitleButton=Panel&&Panel.TitleButton;
 Operators=WebSharper&&WebSharper.Operators;
 ListModel=Next&&Next.ListModel;
 RandomValueSource=Dashboard.RandomValueSource=Runtime.Class({
  WebSharper_Community_Dashboard_ISource$Run:function()
  {
   var $this,rnd,a;
   $this=this;
   rnd=new Random.New();
   a=Concurrency.Delay(function()
   {
    var b;
    b=Concurrency.Delay(function()
    {
     var x;
     x=Concurrency.Sleep(600);
     return Concurrency.Bind(x,function()
     {
      var d,c;
      d=Global.Math.random()*300;
      $this.NumberEvent.event.Trigger(d);
      $this.StringEvent.event.Trigger((c=d<<0,Global.String(c)));
      return Concurrency.Return(null);
     });
    });
    return Concurrency.While(function()
    {
     return true;
    },b);
   });
   Concurrency.Start(a,null);
  },
  WebSharper_Community_Dashboard_ISource$get_String:function()
  {
   return this.StringEvent;
  },
  WebSharper_Community_Dashboard_ISource$get_Number:function()
  {
   return this.NumberEvent;
  }
 },null,RandomValueSource);
 RandomValueSource.get_Create=function()
 {
  return RandomValueSource.New(new FSharpEvent.New(),new FSharpEvent.New());
 };
 RandomValueSource.New=function(NumberEvent,StringEvent)
 {
  return new RandomValueSource({
   NumberEvent:NumberEvent,
   StringEvent:StringEvent
  });
 };
 Receivers.receiverChart=function(event,cx,cy)
 {
  return{
   WebSharper_Community_Dashboard_IReceiver$Render:function()
   {
    var ch;
    ch=LiveChart.Line(event.event);
    return ChartJs.Render$8(ch,{
     $:1,
     $0:{
      $:0,
      $0:cx,
      $1:cy
     }
    },null,{
     $:1,
     $0:10
    });
   }
  };
 };
 Receivers.receiverText=function(viewText)
 {
  return{
   WebSharper_Community_Dashboard_IReceiver$Render:function()
   {
    var a,a$1;
    a=[AttrProxy.Create("class","bigvalue")];
    a$1=[Doc.TextView(viewText)];
    return Doc.Element("div",a,a$1);
   }
  };
 };
 SourceItem.Create=function(src)
 {
  return SourceItem.New(Key.Fresh(),src);
 };
 SourceItem.New=function(Key$1,Source)
 {
  return{
   Key:Key$1,
   Source:Source
  };
 };
 ReceiverItem.Create=function(receiver)
 {
  return ReceiverItem.New(Key.Fresh(),receiver);
 };
 ReceiverItem.New=function(Key$1,Receiver)
 {
  return{
   Key:Key$1,
   Receiver:Receiver
  };
 };
 Dashboard$1=Dashboard.Dashboard=Runtime.Class({
  CreatePanel:function(cx,afterRenderFnc)
  {
   var $this,childContainerContent;
   $this=this;
   childContainerContent=PanelContainer.get_Create().WithLayoutManager(LayoutManagers.StackPanelLayoutManager()).WithAttributes([AttrModule.Style("border","1px solid white")]);
   this.PanelContainer.AddPanel(Panel$1.get_Create().WithPannelAttrs([AttrModule.Style("Width",Global.String(cx)+"px")]).WithTitleContent(Doc.TextNode("Panel")).WithTitleButtons(List.ofArray([TitleButton.New("add",function()
   {
   }),TitleButton.New("edit",function()
   {
   }),TitleButton.New("clear",function(panel)
   {
    $this.PanelContainer.PanelItems.Remove($this.PanelContainer.FindPanelItem(panel));
   })])).WithChildPanelContainer(childContainerContent).WithOnAfterRender(Operators.DefaultArg(afterRenderFnc,function()
   {
   })));
   return childContainerContent;
  },
  AddReceiver:function(toPanelContainer,receiver)
  {
   this.ReceiverItems.Append(ReceiverItem.Create(receiver));
   toPanelContainer.AddPanel(Panel$1.get_Create().WithTitle(false).WithPanelContent(receiver.WebSharper_Community_Dashboard_IReceiver$Render()));
  },
  AddSource:function(source)
  {
   this.SourceItems.Append(SourceItem.Create(source));
   source.WebSharper_Community_Dashboard_ISource$Run();
  },
  get_Render:function()
  {
   return this.PanelContainer.get_Render();
  }
 },null,Dashboard$1);
 Dashboard$1.Create=function(panelContainer)
 {
  var a,a$1;
  return Dashboard$1.New((a=new List.T({
   $:0
  }),ListModel.Create(function(item)
  {
   return item.Key;
  },a)),(a$1=new List.T({
   $:0
  }),ListModel.Create(function(item)
  {
   return item.Key;
  },a$1)),panelContainer);
 };
 Dashboard$1.New=function(SourceItems,ReceiverItems,PanelContainer$1)
 {
  return new Dashboard$1({
   SourceItems:SourceItems,
   ReceiverItems:ReceiverItems,
   PanelContainer:PanelContainer$1
  });
 };
}());
