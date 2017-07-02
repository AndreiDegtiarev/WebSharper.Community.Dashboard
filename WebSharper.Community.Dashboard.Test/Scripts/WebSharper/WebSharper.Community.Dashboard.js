(function()
{
 "use strict";
 var Global,WebSharper,Community,Dashboard,IInPortNumber,IOutPortNumber,Sources,RandomValueSource,SrcOpenWeather,Forecast,Create,Widgets,TextBox,Chart,SourceItem,ReceiverItem,Factory,Dashboard$1,IntelliFactory,Runtime,Control,FSharpEvent,Random,Concurrency,List,PropertyGrid,Properties,UI,Next,Var,PrintfHelpers,Data,TxtRuntime,FSharp,Data$1,Runtime$1,IO,Unchecked,Arrays,AttrProxy,Doc,Charting,Renderers,ChartJs,Seq,Operators,Chart$1,Pervasives,Key,ListModel,AttrModule,View,Panel,PanelContainer,LayoutManagers,Panel$1,TitleButton,PropertyGrid$1,Dialog;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 IInPortNumber=Dashboard.IInPortNumber=Dashboard.IInPortNumber||{};
 IOutPortNumber=Dashboard.IOutPortNumber=Dashboard.IOutPortNumber||{};
 Sources=Dashboard.Sources=Dashboard.Sources||{};
 RandomValueSource=Sources.RandomValueSource=Sources.RandomValueSource||{};
 SrcOpenWeather=Dashboard.SrcOpenWeather=Dashboard.SrcOpenWeather||{};
 Forecast=SrcOpenWeather.Forecast=SrcOpenWeather.Forecast||{};
 Create=SrcOpenWeather.Create=SrcOpenWeather.Create||{};
 Widgets=Dashboard.Widgets=Dashboard.Widgets||{};
 TextBox=Widgets.TextBox=Widgets.TextBox||{};
 Chart=Widgets.Chart=Widgets.Chart||{};
 SourceItem=Dashboard.SourceItem=Dashboard.SourceItem||{};
 ReceiverItem=Dashboard.ReceiverItem=Dashboard.ReceiverItem||{};
 Factory=Dashboard.Factory=Dashboard.Factory||{};
 Dashboard$1=Dashboard.Dashboard=Dashboard.Dashboard||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Control=WebSharper&&WebSharper.Control;
 FSharpEvent=Control&&Control.FSharpEvent;
 Random=WebSharper&&WebSharper.Random;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 List=WebSharper&&WebSharper.List;
 PropertyGrid=Community&&Community.PropertyGrid;
 Properties=PropertyGrid&&PropertyGrid.Properties;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Var=Next&&Next.Var;
 PrintfHelpers=WebSharper&&WebSharper.PrintfHelpers;
 Data=WebSharper&&WebSharper.Data;
 TxtRuntime=Data&&Data.TxtRuntime;
 FSharp=Global.FSharp;
 Data$1=FSharp&&FSharp.Data;
 Runtime$1=Data$1&&Data$1.Runtime;
 IO=Runtime$1&&Runtime$1.IO;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Arrays=WebSharper&&WebSharper.Arrays;
 AttrProxy=Next&&Next.AttrProxy;
 Doc=Next&&Next.Doc;
 Charting=WebSharper&&WebSharper.Charting;
 Renderers=Charting&&Charting.Renderers;
 ChartJs=Renderers&&Renderers.ChartJs;
 Seq=WebSharper&&WebSharper.Seq;
 Operators=WebSharper&&WebSharper.Operators;
 Chart$1=Charting&&Charting.Chart;
 Pervasives=Charting&&Charting.Pervasives;
 Key=Next&&Next.Key;
 ListModel=Next&&Next.ListModel;
 AttrModule=Next&&Next.AttrModule;
 View=Next&&Next.View;
 Panel=Community&&Community.Panel;
 PanelContainer=Panel&&Panel.PanelContainer;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 Panel$1=Panel&&Panel.Panel;
 TitleButton=Panel&&Panel.TitleButton;
 PropertyGrid$1=PropertyGrid&&PropertyGrid.PropertyGrid;
 Dialog=Panel&&Panel.Dialog;
 IInPortNumber=Dashboard.IInPortNumber=Runtime.Class({
  Disconnect:function()
  {
   var a;
   this.Disconnector();
   a="Port "+this.name+" disconnected";
   Global.console.log(a);
   this.Disconnector=function()
   {
   };
  },
  RegisterDisconnector:function(disconnector)
  {
   this.Disconnector=disconnector;
  },
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
  this.Disconnector=function()
  {
  };
 },IInPortNumber);
 IOutPortNumber=Dashboard.IOutPortNumber=Runtime.Class({
  Trigger:function(value)
  {
   this.event.event.Trigger(value);
  },
  WebSharper_Community_Dashboard_IOutPort$Connect:function(port)
  {
   var $this,a,handler;
   $this=this;
   a="Port "+this.name+" connect";
   Global.console.log(a);
   port.Disconnect();
   handler=function(a$1,arg)
   {
    return(port.get_Callback())(arg);
   };
   this.event.event.AddHandler(handler);
   port.RegisterDisconnector(function()
   {
    $this.event.event.RemoveHandler(handler);
   });
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
 RandomValueSource=Sources.RandomValueSource=Runtime.Class({
  WebSharper_Community_Dashboard_ISource$Run:function()
  {
   var $this,rnd;
   $this=this;
   rnd=new Random.New();
   Concurrency.Start(Concurrency.Delay(function()
   {
    return Concurrency.While(function()
    {
     return true;
    },Concurrency.Delay(function()
    {
     return Concurrency.Bind(Concurrency.Sleep(600),function()
     {
      var d;
      d=Global.Math.random()*$this.varDispersion.c+$this.varMiddleValue.c;
      $this.outRandomNumber.Trigger(d);
      return Concurrency.Return(null);
     });
    }));
   }),null);
  },
  WebSharper_Community_Dashboard_ISource$Clone:function()
  {
   return new RandomValueSource.New(this.middleValue,this.dispersion);
  },
  WebSharper_Community_Dashboard_ISource$get_Properties:function()
  {
   return List.ofArray([Properties.string("Name",this.name),Properties["double"]("Middle value",this.varMiddleValue),Properties["double"]("Dispersion value",this.varDispersion)]);
  },
  WebSharper_Community_Dashboard_ISource$get_OutPorts:function()
  {
   return List.ofArray([this.outRandomNumber]);
  },
  WebSharper_Community_Dashboard_ISource$get_Name:function()
  {
   return this.name;
  }
 },null,RandomValueSource);
 RandomValueSource.New=Runtime.Ctor(function(middleValue,dispersion)
 {
  this.middleValue=middleValue;
  this.dispersion=dispersion;
  this.outRandomNumber=new IOutPortNumber.New("Random value");
  this.varMiddleValue=Var.Create$1(this.middleValue);
  this.varDispersion=Var.Create$1(this.dispersion);
  this.name=Var.Create$1("Random");
 },RandomValueSource);
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
 Create=SrcOpenWeather.Create=Runtime.Class({
  WebSharper_Community_Dashboard_ISource$Run:function()
  {
   var $this,rnd;
   $this=this;
   rnd=new Random.New();
   Concurrency.Start(Concurrency.Delay(function()
   {
    return Concurrency.While(function()
    {
     return true;
    },Concurrency.Delay(function()
    {
     var x;
     x=SrcOpenWeather.get($this.apiKey.c,$this.cityVar.c);
     return Concurrency.Bind(x,function(a)
     {
      var a$1;
      a$1="Value generated:"+a.$0.Title;
      Global.console.log(a$1);
      $this.outTempearatur.Trigger(+a.$0.Temperature);
      return Concurrency.Bind(Concurrency.Sleep(1000*15),function()
      {
       return Concurrency.Return(null);
      });
     });
    }));
   }),null);
  },
  WebSharper_Community_Dashboard_ISource$Clone:function()
  {
   return new Create.New(this.city);
  },
  WebSharper_Community_Dashboard_ISource$get_Properties:function()
  {
   return List.ofArray([Properties.string("Name",this.name),Properties.string("ApiKey",this.apiKey),Properties.string("City",this.cityVar)]);
  },
  WebSharper_Community_Dashboard_ISource$get_OutPorts:function()
  {
   return List.ofArray([this.outTempearatur]);
  },
  WebSharper_Community_Dashboard_ISource$get_Name:function()
  {
   return this.name;
  }
 },null,Create);
 Create.New=Runtime.Ctor(function(city)
 {
  this.city=city;
  this.outTempearatur=new IOutPortNumber.New("Temperature");
  this.apiKey=Var.Create$1("");
  this.cityVar=Var.Create$1(this.city);
  this.name=Var.Create$1("OpenWeatherMap");
 },Create);
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
 TextBox=Widgets.TextBox=Runtime.Class({
  WebSharper_Community_Dashboard_IReceiver$get_Properties:function()
  {
   return List.T.Empty;
  },
  WebSharper_Community_Dashboard_IReceiver$Clone:function()
  {
   return new TextBox.New();
  },
  WebSharper_Community_Dashboard_IReceiver$Render:function()
  {
   var a,a$1;
   a=[AttrProxy.Create("class","bigvalue")];
   a$1=[Doc.TextView(this.varText.v)];
   return Doc.Element("div",a,a$1);
  },
  WebSharper_Community_Dashboard_IReceiver$get_InPorts:function()
  {
   return List.ofArray([this.inPortNumber]);
  },
  WebSharper_Community_Dashboard_IReceiver$get_Name:function()
  {
   return Var.Create$1("Text");
  }
 },null,TextBox);
 TextBox.New=Runtime.Ctor(function()
 {
  var $this;
  $this=this;
  this.varText=Var.Create$1("");
  this.inPortNumber=new IInPortNumber.New("in Value",function(value)
  {
   var a,a$1,c;
   a=$this.varText;
   a$1=(c=value<<0,Global.String(c));
   Var.Set(a,a$1);
  });
 },TextBox);
 Chart=Widgets.Chart=Runtime.Class({
  WebSharper_Community_Dashboard_IReceiver$Clone:function()
  {
   return new Chart.New(this.cx,this.cy,this.chartBufferSize);
  },
  WebSharper_Community_Dashboard_IReceiver$get_Properties:function()
  {
   return List.T.Empty;
  },
  WebSharper_Community_Dashboard_IReceiver$Render:function()
  {
   return ChartJs.Render$8(this.chart,{
    $:1,
    $0:{
     $:0,
     $0:this.cx,
     $1:this.cy
    }
   },null,null);
  },
  WebSharper_Community_Dashboard_IReceiver$get_InPorts:function()
  {
   return List.ofArray([this.inPortNumber]);
  },
  WebSharper_Community_Dashboard_IReceiver$get_Name:function()
  {
   return Var.Create$1("Chart");
  }
 },null,Chart);
 Chart.New=Runtime.Ctor(function(cx,cy,chartBufferSize)
 {
  var $this,data,values,queue,a;
  $this=this;
  this.cx=cx;
  this.cy=cy;
  this.chartBufferSize=chartBufferSize;
  data=List.ofSeq(Seq.delay(function()
  {
   return Seq.map(function()
   {
    return 0;
   },Operators.range(0,$this.chartBufferSize-1));
  }));
  values=(queue=[],(a=function(entry)
  {
   queue.push(entry);
  },function(s)
  {
   Seq.iter(a,s);
  }(data),queue));
  this.chart=Chart$1.Line(data).__WithFillColor(new Pervasives.Color({
   $:2,
   $0:"white"
  }));
  this.inPortNumber=new IInPortNumber.New("in Value",function(value)
  {
   var v,a$1;
   values.push(value);
   values.length>$this.chartBufferSize?v=values.shift():void 0;
   a$1=function(ind,entry)
   {
    return $this.chart.__UpdateData(ind,function()
    {
     return entry;
    });
   };
   (function(s)
   {
    Seq.iteri(a$1,s);
   }(values));
  });
 },Chart);
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
 Factory=Dashboard.Factory=Runtime.Class({
  RegisterSource:function(source)
  {
   this.SourceItems.Append(SourceItem.Create(source));
  },
  RegisterReceiver:function(receiver)
  {
   this.ReceiverItems.Append(ReceiverItem.Create(receiver));
  }
 },null,Factory);
 Factory.get_Create=function()
 {
  var a,a$1;
  return Factory.New((a=List.T.Empty,ListModel.Create(function(item)
  {
   return item.Key;
  },a)),(a$1=List.T.Empty,ListModel.Create(function(item)
  {
   return item.Key;
  },a$1)));
 };
 Factory.New=function(SourceItems,ReceiverItems)
 {
  return new Factory({
   SourceItems:SourceItems,
   ReceiverItems:ReceiverItems
  });
 };
 Dashboard$1=Dashboard.Dashboard=Runtime.Class({
  get_Render:function()
  {
   var $this,attrsClick,srcRender,a,a$1,a$2,containers,menu,m,containerDivs,m$1,a$3,a$4,a$5,a$6,a$7,a$8,a$9,a$10,a$11,a$12,a$13,a$14,a$15,a$16;
   function icon(id,action)
   {
    var a$17,a$18;
    a$17=new List.T({
     $:1,
     $0:AttrModule.Class("material-icons orange600"),
     $1:attrsClick(action)
    });
    a$18=[Doc.TextNode(id)];
    return Doc.Element("i",a$17,a$18);
   }
   function container(varValue,content)
   {
    var varVis,a$17,a$18;
    varVis=Var.Create$1(varValue);
    return[varVis,(a$17=[AttrModule.DynamicStyle("display",(a$18=varVis.v,View.Map(function(isVisible)
    {
     return isVisible?"initial":"none";
    },a$18)))],Doc.Element("div",a$17,[content]))];
   }
   $this=this;
   attrsClick=function(action)
   {
    return List.ofArray([AttrModule.Style("Color","#FB8C00"),AttrModule.Style("cursor","pointer"),AttrModule.Handler("click",function()
    {
     return function()
     {
      return action();
     };
    })]);
   };
   srcRender=(a=[(a$1=function(m$2)
   {
    return m$2.Key;
   },(a$2=function(item)
   {
    var a$17,a$18,a$19;
    a$17=[(a$18=attrsClick(function()
    {
     $this.PropertyGrid.Edit(item.Source.WebSharper_Community_Dashboard_ISource$get_Properties());
    }),(a$19=[Doc.TextView(item.Source.WebSharper_Community_Dashboard_ISource$get_Name().v)],Doc.Element("i",a$18,a$19)))];
    return Doc.Element("tr",[],a$17);
   },function(a$17)
   {
    return Doc.ConvertBy(a$1,a$2,a$17);
   })(this.SourceItems.v))],Doc.Element("table",[],a));
   containers=List.ofArray([["Board",container(true,this.PanelContainer.get_Render())],["Sources",container(false,srcRender)]]);
   menu=(m=function(name,a$17)
   {
    var varVis,a$18,a$19,a$20,a$21;
    varVis=a$17[0];
    a$18=[(a$19=[AttrModule.DynamicStyle("Color",(a$20=varVis.v,View.Map(function(isVisible)
    {
     return isVisible?"#FB8C00":"#7D4600";
    },a$20))),AttrModule.Style("cursor","pointer"),AttrModule.Handler("click",function()
    {
     return function()
     {
      var a$22;
      a$22=function(a$23,a$24)
      {
       var varBool;
       varBool=a$24[0];
       !Unchecked.Equals(varBool,varVis)?Var.Set(varBool,false):Var.Set(varBool,true);
      };
      return function(l)
      {
       List.iter(function($1)
       {
        return a$22($1[0],$1[1]);
       },l);
      }(containers);
     };
    })],(a$21=[Doc.TextNode(name)],Doc.Element("td",a$19,a$21)))];
    return Doc.Element("tr",[],a$18);
   },function(l)
   {
    return List.map(function($1)
    {
     return m($1[0],$1[1]);
    },l);
   }(containers));
   containerDivs=(m$1=function(a$17,a$18)
   {
    return a$18[1];
   },function(l)
   {
    return List.map(function($1)
    {
     return m$1($1[0],$1[1]);
    },l);
   }(containers));
   a$3=[(a$4=[(a$5=[(a$6=[AttrModule.Style("vertical-align","top")],(a$7=[(a$8=Seq.concat([List.ofArray([(a$9=[(a$10=[icon("dehaze",function()
   {
   })],Doc.Element("td",[],a$10))],Doc.Element("tr",[],a$9)),(a$11=[(a$12=[icon("add",function()
   {
    var p,varBoolDash,p$1,varBoolSrc,items,selected,o,a$17,a$18,a$19,v;
    p=containers.get_Item(0);
    varBoolDash=p[1][0];
    p$1=containers.get_Item(1);
    varBoolSrc=p$1[1][0];
    varBoolSrc.c?(items=List.ofSeq($this.Factory.SourceItems),selected=Var.Create$1(List.head(items)),o=$this.Dialog,a$17=(a$18=[(a$19=[AttrModule.Class("form-control")],Doc.Select(a$19,function(item)
    {
     return item.Source.WebSharper_Community_Dashboard_ISource$get_Name().c;
    },items,selected))],Doc.Element("div",[],a$18)),o.ShowDialog("Select source",a$17,function()
    {
     selected.c.Source.WebSharper_Community_Dashboard_ISource$Run();
     $this.RegisterSource(selected.c.Source.WebSharper_Community_Dashboard_ISource$Clone());
    })):varBoolDash.c?v=$this.CreatePanel("Panel",700,{
     $:1,
     $0:function()
     {
     }
    }):void 0;
   })],Doc.Element("td",[],a$12))],Doc.Element("tr",[],a$11)),(a$13=[Doc.Element("td",[],[])],Doc.Element("tr",[],a$13)),(a$14=[(a$15=[this.PropertyGrid.get_Render()],Doc.Element("td",[],a$15))],Doc.Element("tr",[],a$14))]),menu]),Doc.Element("table",[],a$8))],Doc.Element("td",a$6,a$7))),Doc.Element("td",[],containerDivs)],Doc.Element("tr",[],a$5))],Doc.Element("table",[],a$4)),(a$16=[this.Dialog.get_Render()],Doc.Element("div",[],a$16))];
   return Doc.Element("div",[],a$3);
  },
  CreatePanel:function(name,cx,afterRenderFnc)
  {
   var $this,renderReceivers,x,a,childContainerContent;
   $this=this;
   renderReceivers=(x=this.Factory.ReceiverItems.v,(a=this.ReceiverItems.key,Doc.ConvertBy(a,function(item)
   {
    var a$1;
    a$1=[Doc.TextView(item.Receiver.WebSharper_Community_Dashboard_IReceiver$get_Name().v)];
    return Doc.Element("div",[],a$1);
   },x)));
   childContainerContent=PanelContainer.get_Create().WithLayoutManager(LayoutManagers.StackPanelLayoutManager()).WithAttributes([AttrModule.Style("border","1px solid white"),AttrModule.Style("display","flex")]);
   this.PanelContainer.AddPanel(Panel$1.get_Create().WithPannelAttrs([AttrModule.Style("Width",Global.String(cx)+"px"),AttrModule.Style("position","absolute")]).WithTitleContent(Doc.TextNode(name)).WithTitleButtons(List.ofArray([TitleButton.New("add",function(panel)
   {
    var items,selected,o,a$1,a$2,a$3;
    items=List.ofSeq($this.Factory.ReceiverItems);
    selected=Var.Create$1(List.head(items));
    o=$this.Dialog;
    a$1=(a$2=[(a$3=[AttrModule.Class("form-control")],Doc.Select(a$3,function(item)
    {
     return item.Receiver.WebSharper_Community_Dashboard_IReceiver$get_Name().c;
    },items,selected))],Doc.Element("div",[],a$2));
    o.ShowDialog("Select widget",a$1,function()
    {
     Global.console.log("Dialog.IsOK");
     $this.RegisterReceiver(panel.Children,selected.c.Receiver.WebSharper_Community_Dashboard_IReceiver$Clone());
    });
   }),TitleButton.New("edit",function(panel)
   {
    Global.console.log("Edit");
    panel.EditProperties($this.PropertyGrid);
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
   var items,m,selected,observe,a;
   this.ReceiverItems.Append(ReceiverItem.Create(receiver));
   toPanelContainer.AddPanel(Panel$1.get_Create().WithTitle(false).WithPanelContent(receiver.WebSharper_Community_Dashboard_IReceiver$Render()).WithProperties((items=List.concat((m=function(item)
   {
    var m$1;
    m$1=function(port)
    {
     return[item,port];
    };
    return function(l)
    {
     return List.map(m$1,l);
    }(item.Source.WebSharper_Community_Dashboard_ISource$get_OutPorts());
   },function(l)
   {
    return List.map(m,l);
   }(List.ofSeq(this.SourceItems)))),(selected=Var.Create$1(List.head(items)),(observe=function(src,port)
   {
    var a$1;
    a$1="RegisterReceiver observe"+src.Source.WebSharper_Community_Dashboard_ISource$get_Name().c;
    Global.console.log(a$1);
    port.WebSharper_Community_Dashboard_IOutPort$Connect(receiver.WebSharper_Community_Dashboard_IReceiver$get_InPorts().get_Item(0));
   },(a=selected.v,View.Sink(function($1)
   {
    return observe($1[0],$1[1]);
   },a),new List.T({
    $:1,
    $0:Properties.select("Source",function(t)
    {
     var port;
     port=t[1];
     return t[0].Source.WebSharper_Community_Dashboard_ISource$get_Name().c+"\\"+port.WebSharper_Community_Dashboard_IOutPort$get_Name();
    },items,selected),
    $1:receiver.WebSharper_Community_Dashboard_IReceiver$get_Properties()
   })))))));
  },
  RegisterSource:function(source)
  {
   this.SourceItems.Append(SourceItem.Create(source));
   source.WebSharper_Community_Dashboard_ISource$Run();
  }
 },null,Dashboard$1);
 Dashboard$1.Create=function(panelContainer)
 {
  var a,a$1;
  return Dashboard$1.New(Factory.get_Create(),(a=List.T.Empty,ListModel.Create(function(item)
  {
   return item.Key;
  },a)),(a$1=List.T.Empty,ListModel.Create(function(item)
  {
   return item.Key;
  },a$1)),panelContainer,PropertyGrid$1.get_Create(),Dialog.get_Create());
 };
 Dashboard$1.New=function(Factory$1,SourceItems,ReceiverItems,PanelContainer$1,PropertyGrid$2,Dialog$1)
 {
  return new Dashboard$1({
   Factory:Factory$1,
   SourceItems:SourceItems,
   ReceiverItems:ReceiverItems,
   PanelContainer:PanelContainer$1,
   PropertyGrid:PropertyGrid$2,
   Dialog:Dialog$1
  });
 };
}());
