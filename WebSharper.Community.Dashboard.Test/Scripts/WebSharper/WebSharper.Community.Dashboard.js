(function()
{
 "use strict";
 var Global,WebSharper,Community,Dashboard,IInPortNumber,IOutPortNumber,Sources,SrcOpenWeather,Forecast,Widgets,SourceItem,ReceiverItem,Dashboard$1,IntelliFactory,Runtime,Util,Control,FSharpEvent,Random,Concurrency,List,PrintfHelpers,Data,TxtRuntime,FSharp,Data$1,Runtime$1,IO,Unchecked,Arrays,Seq,Operators,Charting,Chart,Pervasives,Renderers,ChartJs,UI,Next,Var,AttrProxy,Doc,Key,Panel,PanelContainer,LayoutManagers,AttrModule,Panel$1,TitleButton,ListModel,PropertyGrid,PropertyGrid$1;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 IInPortNumber=Dashboard.IInPortNumber=Dashboard.IInPortNumber||{};
 IOutPortNumber=Dashboard.IOutPortNumber=Dashboard.IOutPortNumber||{};
 Sources=Dashboard.Sources=Dashboard.Sources||{};
 SrcOpenWeather=Dashboard.SrcOpenWeather=Dashboard.SrcOpenWeather||{};
 Forecast=SrcOpenWeather.Forecast=SrcOpenWeather.Forecast||{};
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
 PrintfHelpers=WebSharper&&WebSharper.PrintfHelpers;
 Data=WebSharper&&WebSharper.Data;
 TxtRuntime=Data&&Data.TxtRuntime;
 FSharp=Global.FSharp;
 Data$1=FSharp&&FSharp.Data;
 Runtime$1=Data$1&&Data$1.Runtime;
 IO=Runtime$1&&Runtime$1.IO;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Arrays=WebSharper&&WebSharper.Arrays;
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
 PropertyGrid=Community&&Community.PropertyGrid;
 PropertyGrid$1=PropertyGrid&&PropertyGrid.PropertyGrid;
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
    var rnd;
    rnd=new Random.New();
    return Concurrency.Start(Concurrency.Delay(function()
    {
     return Concurrency.While(function()
     {
      return true;
     },Concurrency.Delay(function()
     {
      return Concurrency.Bind(Concurrency.Sleep(600),function()
      {
       var d;
       d=Global.Math.random()*dispersion+middleValue;
       outRandomNumber.Trigger(d);
       return Concurrency.Return(null);
      });
     }));
    }),null);
   },
   WebSharper_Community_Dashboard_ISource$get_OutPorts:function()
   {
    return List.ofArray([outRandomNumber]);
   }
  };
 };
 Forecast.New=function(Title,Description,ImageUrl,Temperature,TemparatureMinMax)
 {
  return{
   Title:Title,
   Description:Description,
   ImageUrl:ImageUrl,
   Temperature:Temperature,
   TemparatureMinMax:TemparatureMinMax
  };
 };
 SrcOpenWeather.Create=function(city)
 {
  var outTempearatur;
  outTempearatur=new IOutPortNumber.New("Temperature");
  return{
   WebSharper_Community_Dashboard_ISource$Run:function()
   {
    var rnd;
    rnd=new Random.New();
    return Concurrency.Start(Concurrency.Delay(function()
    {
     return Concurrency.While(function()
     {
      return true;
     },Concurrency.Delay(function()
     {
      var x;
      x=SrcOpenWeather.get("971df4ae03b507bfbe817a171a3f2bc7",city);
      return Concurrency.Bind(x,function(a)
      {
       var a$1;
       a$1="Value generated:"+a.$0.Title;
       Global.console.log(a$1);
       outTempearatur.Trigger(+a.$0.Temperature);
       return Concurrency.Bind(Concurrency.Sleep(1000*15),function()
       {
        return Concurrency.Return(null);
       });
      });
     }));
    }),null);
   },
   WebSharper_Community_Dashboard_ISource$get_OutPorts:function()
   {
    return List.ofArray([outTempearatur]);
   }
  };
 };
 SrcOpenWeather.get=function(key,city)
 {
  return Concurrency.Delay(function()
  {
   var request,f,x;
   request=((f=function($1,$2,$3)
   {
    return $1("http://api.openweathermap.org/data/2.5/weather?q="+PrintfHelpers.toSafe($2)+"&units=metric&appid="+PrintfHelpers.toSafe($3));
   },(Runtime.Curried3(f))(Global.id))(city))(key);
   Global.console.log("get key city "+request);
   x=TxtRuntime.AsyncMap(IO.asyncReadTextAtRuntime(false,"C:\\Users\\Andrey\\Private\\VS_Projects\\WebSharper.Community.Dashboard\\WebSharper.Community.Dashboard","","JSON","",request),function(t)
   {
    return Unchecked.Equals(typeof t,"string")?Global.JSON.parse(t):t;
   });
   return Concurrency.Bind(x,function(a)
   {
    var m;
    Global.console.log("get key city 2");
    return Concurrency.Return((m=function(head)
    {
     var f$1,v,name,t,v$1,name$1,v$2,name$2,f$2,v$3,name$3,t$1,v$4,name$4,opt,t$2,v$5,name$5,opt$1,t$3,v$6,name$6,opt$2;
     return Forecast.New(((f$1=function($1,$2,$3)
     {
      return $1(PrintfHelpers.toSafe($2)+", "+PrintfHelpers.toSafe($3));
     },(Runtime.Curried3(f$1))(Global.id))((v=(name="name",name in a?{
      $:1,
      $0:a[name]
     }:null),v==null?null:v.$0)))((t=a.sys,(v$1=(name$1="country",name$1 in t?{
      $:1,
      $0:t[name$1]
     }:null),v$1==null?null:v$1.$0))),(v$2=(name$2="main",name$2 in head?{
      $:1,
      $0:head[name$2]
     }:null),v$2==null?null:v$2.$0),(f$2=function($1,$2)
     {
      return $1("http://openweathermap.org/img/w/"+PrintfHelpers.toSafe($2)+".png");
     },(function($1)
     {
      return function($2)
      {
       return f$2($1,$2);
      };
     }(Global.id))((v$3=(name$3="icon",name$3 in head?{
      $:1,
      $0:head[name$3]
     }:null),v$3==null?null:v$3.$0))),(t$1=a.main,(v$4=(name$4="temp",name$4 in t$1?{
      $:1,
      $0:t$1[name$4]
     }:null),(opt=v$4==null?null:{
      $:1,
      $0:1*v$4.$0
     },opt==null?null:opt.$0))),[(t$2=a.main,(v$5=(name$5="temp_min",name$5 in t$2?{
      $:1,
      $0:t$2[name$5]
     }:null),(opt$1=v$5==null?null:{
      $:1,
      $0:1*v$5.$0
     },opt$1==null?null:opt$1.$0))),(t$3=a.main,(v$6=(name$6="temp_max",name$6 in t$3?{
      $:1,
      $0:t$3[name$6]
     }:null),(opt$2=v$6==null?null:{
      $:1,
      $0:1*v$6.$0
     },opt$2==null?null:opt$2.$0)))]);
    },function(o)
    {
     return o==null?null:{
      $:1,
      $0:m(o.$0)
     };
    }(Arrays.tryHead(a.weather))));
   });
  });
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
   }),TitleButton.New("edit",function(panel)
   {
    $this.PropertyGrid.Edit(panel.Properties);
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
   var a,a$1,a$2,a$3,a$4,a$5,a$6,a$7,a$8,a$9,a$10,a$11,a$12,a$13,a$14,a$15,a$16,a$17,a$18;
   a=[(a$1=[(a$2=[(a$3=[AttrModule.Style("vertical-align","top")],(a$4=[(a$5=[(a$6=[AttrModule.Style("Height","100%")],(a$7=[(a$8=[AttrModule.Style("Height","100%")],(a$9=[(a$10=[AttrModule.Class("material-icons orange600")],(a$11=[Doc.TextNode("dehaze")],Doc.Element("i",a$10,a$11)))],Doc.Element("td",a$8,a$9)))],Doc.Element("tr",a$6,a$7))),(a$12=[(a$13=[(a$14=[AttrModule.Class("material-icons orange600"),AttrModule.Style("cursor","pointer")],(a$15=[Doc.TextNode("add")],Doc.Element("i",a$14,a$15)))],Doc.Element("td",[],a$13))],Doc.Element("tr",[],a$12)),(a$16=[(a$17=[this.PropertyGrid.get_Render()],Doc.Element("td",[],a$17))],Doc.Element("tr",[],a$16))],Doc.Element("table",[],a$5))],Doc.Element("td",a$3,a$4))),(a$18=[this.PanelContainer.get_Render()],Doc.Element("td",[],a$18))],Doc.Element("tr",[],a$2))],Doc.Element("table",[],a$1))];
   return Doc.Element("div",[],a);
  }
 },null,Dashboard$1);
 Dashboard$1.Create=function(panelContainer)
 {
  var a,a$1;
  return Dashboard$1.New((a=List.T.Empty,ListModel.Create(function(item)
  {
   return item.Key;
  },a)),(a$1=List.T.Empty,ListModel.Create(function(item)
  {
   return item.Key;
  },a$1)),panelContainer,PropertyGrid$1.get_Create());
 };
 Dashboard$1.New=function(SourceItems,ReceiverItems,PanelContainer$1,PropertyGrid$2)
 {
  return new Dashboard$1({
   SourceItems:SourceItems,
   ReceiverItems:ReceiverItems,
   PanelContainer:PanelContainer$1,
   PropertyGrid:PropertyGrid$2
  });
 };
}());
