(function()
{
 "use strict";
 var Global,WebSharper,Community,Dashboard,IInPortNumber,IOutPortNumber,Sources,Widgets,SourceItem,ReceiverItem,Dashboard$1,IntelliFactory,Runtime,Util,Control,FSharpEvent,Random,Concurrency,List,Seq,Operators,Charting,Chart,Pervasives,Renderers,ChartJs,UI,Next,Var,AttrProxy,Doc,Key,Panel,PanelContainer,LayoutManagers,AttrModule,Panel$1,TitleButton,ListModel;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 IInPortNumber=Dashboard.IInPortNumber=Dashboard.IInPortNumber||{};
 IOutPortNumber=Dashboard.IOutPortNumber=Dashboard.IOutPortNumber||{};
 Sources=Dashboard.Sources=Dashboard.Sources||{};
 Widgets=Dashboard.Widgets=Dashboard.Widgets||{};
 SourceItem=Dashboard.SourceItem=Dashboard.SourceItem||{};
 ReceiverItem=Dashboard.ReceiverItem=Dashboard.ReceiverItem||{};
 Dashboard$1=Dashboard.Dashboard=Dashboard.Dashboard||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Util=WebSharper&&WebSharper.Util;
 Control=WebSharper&&WebSharper.Control;
 FSharpEvent=Control&&Control.FSharpEvent;
 Random=WebSharper&&WebSharper.Random;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 List=WebSharper&&WebSharper.List;
 Seq=WebSharper&&WebSharper.Seq;
 Operators=WebSharper&&WebSharper.Operators;
 Charting=WebSharper&&WebSharper.Charting;
 Chart=Charting&&Charting.Chart;
 Pervasives=Charting&&Charting.Pervasives;
 Renderers=Charting&&Charting.Renderers;
 ChartJs=Renderers&&Renderers.ChartJs;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Var=Next&&Next.Var;
 AttrProxy=Next&&Next.AttrProxy;
 Doc=Next&&Next.Doc;
 Key=Next&&Next.Key;
 Panel=Community&&Community.Panel;
 PanelContainer=Panel&&Panel.PanelContainer;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 AttrModule=Next&&Next.AttrModule;
 Panel$1=Panel&&Panel.Panel;
 TitleButton=Panel&&Panel.TitleButton;
 ListModel=Next&&Next.ListModel;
 IInPortNumber=Dashboard.IInPortNumber=Runtime.Class({
  get_Callback:function()
  {
   return this.callback;
  },
  WebSharper_Community_Dashboard_IInPort$get_Name:function()
  {
   return this.name;
  }
 },null,IInPortNumber);
 IInPortNumber.New=Runtime.Ctor(function(name,callback)
 {
  this.name=name;
  this.callback=callback;
 },IInPortNumber);
 IOutPortNumber=Dashboard.IOutPortNumber=Runtime.Class({
  Trigger:function(value)
  {
   this.event.event.Trigger(value);
  },
  WebSharper_Community_Dashboard_IOutPort$Connect:function(port)
  {
   Util.addListener(this.event.event,port.get_Callback());
  },
  WebSharper_Community_Dashboard_IOutPort$IsCompatible:function(port)
  {
   return port instanceof IInPortNumber;
  },
  WebSharper_Community_Dashboard_IOutPort$get_Name:function()
  {
   return this.name;
  }
 },null,IOutPortNumber);
 IOutPortNumber.New=Runtime.Ctor(function(name)
 {
  this.name=name;
  this.event=new FSharpEvent.New();
 },IOutPortNumber);
 Sources.RandomValueSource=function(middleValue,dispersion)
 {
  var outRandomNumber;
  outRandomNumber=new IOutPortNumber.New("Random value");
  return{
   WebSharper_Community_Dashboard_ISource$Run:function()
   {
    var rnd,a;
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
       var d;
       d=Global.Math.random()*dispersion+middleValue;
       outRandomNumber.Trigger(d);
       return Concurrency.Return(null);
      });
     });
     return Concurrency.While(function()
     {
      return true;
     },b);
    });
    return Concurrency.Start(a,null);
   },
   WebSharper_Community_Dashboard_ISource$get_OutPorts:function()
   {
    return List.ofArray([outRandomNumber]);
   }
  };
 };
 Widgets.chart=function(cx,cy,chartBufferSize)
 {
  var data,values,queue,a,chart,inPortNumber;
  data=List.ofSeq(Seq.delay(function()
  {
   return Seq.map(function()
   {
    return 0;
   },Operators.range(0,chartBufferSize-1));
  }));
  values=(queue=[],(a=function(entry)
  {
   queue.push(entry);
  },function(s)
  {
   Seq.iter(a,s);
  }(data),queue));
  chart=Chart.Line(data).__WithFillColor(new Pervasives.Color({
   $:2,
   $0:"white"
  }));
  inPortNumber=new IInPortNumber.New("in Value",function(value)
  {
   var v,a$1;
   values.push(value);
   values.length>chartBufferSize?v=values.shift():void 0;
   a$1=function(ind,entry)
   {
    return chart.__UpdateData(ind,function()
    {
     return entry;
    });
   };
   (function(s)
   {
    Seq.iteri(a$1,s);
   }(values));
  });
  return{
   WebSharper_Community_Dashboard_IReceiver$Render:function()
   {
    return ChartJs.Render$8(chart,{
     $:1,
     $0:{
      $:0,
      $0:cx,
      $1:cy
     }
    },null,null);
   },
   WebSharper_Community_Dashboard_IReceiver$get_InPorts:function()
   {
    return List.ofArray([inPortNumber]);
   }
  };
 };
 Widgets.text=function()
 {
  var varText,inPortNumber;
  varText=Var.Create$1("");
  inPortNumber=new IInPortNumber.New("in Value",function(value)
  {
   var a,c;
   a=(c=value<<0,Global.String(c));
   Var.Set(varText,a);
  });
  return{
   WebSharper_Community_Dashboard_IReceiver$Render:function()
   {
    var a,a$1;
    a=[AttrProxy.Create("class","bigvalue")];
    a$1=[Doc.TextView(varText.v)];
    return Doc.Element("div",a,a$1);
   },
   WebSharper_Community_Dashboard_IReceiver$get_InPorts:function()
   {
    return List.ofArray([inPortNumber]);
   }
  };
 };
 SourceItem.Create=function(id,src)
 {
  return SourceItem.New(Key.Fresh(),id,src);
 };
 SourceItem.New=function(Key$1,Id,Source)
 {
  return{
   Key:Key$1,
   Id:Id,
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
  CreatePanel:function(name,cx,afterRenderFnc)
  {
   var $this,childContainerContent;
   $this=this;
   childContainerContent=PanelContainer.get_Create().WithLayoutManager(LayoutManagers.StackPanelLayoutManager()).WithAttributes([AttrModule.Style("border","1px solid white"),AttrModule.Style("display","flex")]);
   this.PanelContainer.AddPanel(Panel$1.get_Create().WithPannelAttrs([AttrModule.Style("Width",Global.String(cx)+"px"),AttrModule.Style("position","absolute")]).WithTitleContent(Doc.TextNode(name)).WithTitleButtons(List.ofArray([TitleButton.New("add",function()
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
  RegisterReceiver:function(toPanelContainer,receiver)
  {
   this.ReceiverItems.Append(ReceiverItem.Create(receiver));
   toPanelContainer.AddPanel(Panel$1.get_Create().WithTitle(false).WithPanelContent(receiver.WebSharper_Community_Dashboard_IReceiver$Render()));
  },
  RegisterSource:function(key,source)
  {
   this.SourceItems.Append(SourceItem.Create(key,source));
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
