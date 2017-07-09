(function()
{
 "use strict";
 var Global,WebSharper,Community,Dashboard,DshBase,DshBaseReact,InPort,OutPort,InPortNum,InPortStr,OutPortNum,PortConnector,Worker,Sources,RandomValueSource,SrcOpenWeather,Forecast,Create,Widgets,TextBox,Chart,WorkerItem,Factory,PortConnectorItem,DshData,DshEditorCellItem,DshEditorRowItem,DshEditor,SourceProperty,Dashboard$1,IntelliFactory,Runtime,UI,Next,Var,PropertyGrid,Properties,Control,FSharpEvent,List,Random,Concurrency,PrintfHelpers,Data,TxtRuntime,FSharp,Data$1,Runtime$1,IO,Unchecked,Arrays,Seq,Operators,Charting,Chart$1,Pervasives,View,AttrModule,Doc,Renderers,ChartJs,Key,ListModel,Panel,Helper,PanelContainer,LayoutManagers,Panel$1,TitleButton,Dialog,PropertyGrid$1;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 DshBase=Dashboard.DshBase=Dashboard.DshBase||{};
 DshBaseReact=Dashboard.DshBaseReact=Dashboard.DshBaseReact||{};
 InPort=Dashboard.InPort=Dashboard.InPort||{};
 OutPort=Dashboard.OutPort=Dashboard.OutPort||{};
 InPortNum=Dashboard.InPortNum=Dashboard.InPortNum||{};
 InPortStr=Dashboard.InPortStr=Dashboard.InPortStr||{};
 OutPortNum=Dashboard.OutPortNum=Dashboard.OutPortNum||{};
 PortConnector=Dashboard.PortConnector=Dashboard.PortConnector||{};
 Worker=Dashboard.Worker=Dashboard.Worker||{};
 Sources=Dashboard.Sources=Dashboard.Sources||{};
 RandomValueSource=Sources.RandomValueSource=Sources.RandomValueSource||{};
 SrcOpenWeather=Dashboard.SrcOpenWeather=Dashboard.SrcOpenWeather||{};
 Forecast=SrcOpenWeather.Forecast=SrcOpenWeather.Forecast||{};
 Create=SrcOpenWeather.Create=SrcOpenWeather.Create||{};
 Widgets=Dashboard.Widgets=Dashboard.Widgets||{};
 TextBox=Widgets.TextBox=Widgets.TextBox||{};
 Chart=Widgets.Chart=Widgets.Chart||{};
 WorkerItem=Dashboard.WorkerItem=Dashboard.WorkerItem||{};
 Factory=Dashboard.Factory=Dashboard.Factory||{};
 PortConnectorItem=Dashboard.PortConnectorItem=Dashboard.PortConnectorItem||{};
 DshData=Dashboard.DshData=Dashboard.DshData||{};
 DshEditorCellItem=Dashboard.DshEditorCellItem=Dashboard.DshEditorCellItem||{};
 DshEditorRowItem=Dashboard.DshEditorRowItem=Dashboard.DshEditorRowItem||{};
 DshEditor=Dashboard.DshEditor=Dashboard.DshEditor||{};
 SourceProperty=Dashboard.SourceProperty=Dashboard.SourceProperty||{};
 Dashboard$1=Dashboard.Dashboard=Dashboard.Dashboard||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Var=Next&&Next.Var;
 PropertyGrid=Community&&Community.PropertyGrid;
 Properties=PropertyGrid&&PropertyGrid.Properties;
 Control=WebSharper&&WebSharper.Control;
 FSharpEvent=Control&&Control.FSharpEvent;
 List=WebSharper&&WebSharper.List;
 Random=WebSharper&&WebSharper.Random;
 Concurrency=WebSharper&&WebSharper.Concurrency;
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
 Chart$1=Charting&&Charting.Chart;
 Pervasives=Charting&&Charting.Pervasives;
 View=Next&&Next.View;
 AttrModule=Next&&Next.AttrModule;
 Doc=Next&&Next.Doc;
 Renderers=Charting&&Charting.Renderers;
 ChartJs=Renderers&&Renderers.ChartJs;
 Key=Next&&Next.Key;
 ListModel=Next&&Next.ListModel;
 Panel=Community&&Community.Panel;
 Helper=Panel&&Panel.Helper;
 PanelContainer=Panel&&Panel.PanelContainer;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 Panel$1=Panel&&Panel.Panel;
 TitleButton=Panel&&Panel.TitleButton;
 Dialog=Panel&&Panel.Dialog;
 PropertyGrid$1=PropertyGrid&&PropertyGrid.PropertyGrid;
 DshBase=Dashboard.DshBase=Runtime.Class({
  get_Name:function()
  {
   return this.name;
  }
 },null,DshBase);
 DshBase.New=Runtime.Ctor(function(name)
 {
  this.name=name;
 },DshBase);
 DshBaseReact=Dashboard.DshBaseReact=Runtime.Class({
  get_Name:function()
  {
   return this.name;
  }
 },null,DshBaseReact);
 DshBaseReact.New=Runtime.Ctor(function(name)
 {
  this.name=Var.Create$1(name);
 },DshBaseReact);
 InPort=Dashboard.InPort=Runtime.Class({
  get_Property:function()
  {
   return Properties.group("empty");
  },
  Disconnect:function()
  {
   var a;
   this.Disconnector();
   a="Port "+this.name$1+" disconnected";
   Global.console.log(a);
   this.Disconnector=function()
   {
   };
  },
  RegisterDisconnector:function(outPort,disconnector)
  {
   this._outPort=outPort;
   this.Disconnector=disconnector;
  },
  get_OutPort:function()
  {
   return this._outPort;
  }
 },DshBase,InPort);
 InPort.New=Runtime.Ctor(function(name)
 {
  DshBase.New.call(this,name);
  this.name$1=name;
  this.Disconnector=function()
  {
  };
  this._outPort=new OutPort.New("No connection");
 },InPort);
 OutPort=Dashboard.OutPort=Runtime.Class({
  IsCompatible:function(port)
  {
   return false;
  },
  Connect:function(port)
  {
   return function()
   {
   };
  }
 },DshBase,OutPort);
 OutPort.New=Runtime.Ctor(function(name)
 {
  DshBase.New.call(this,name);
 },OutPort);
 InPortNum=Dashboard.InPortNum=Runtime.Class({
  get_Value:function()
  {
   return this.value;
  },
  get_Property:function()
  {
   return Properties["double"](this.name$2,this.value);
  }
 },InPort,InPortNum);
 InPortNum.New=Runtime.Ctor(function(name,defValue)
 {
  InPort.New.call(this,name);
  this.name$2=name;
  this.value=Var.Create$1(defValue);
 },InPortNum);
 InPortStr=Dashboard.InPortStr=Runtime.Class({
  get_Value:function()
  {
   return this.value;
  },
  get_Property:function()
  {
   return Properties.string(this.name$2,this.value);
  }
 },InPort,InPortStr);
 InPortStr.New=Runtime.Ctor(function(name,defStr)
 {
  InPort.New.call(this,name);
  this.name$2=name;
  this.value=Var.Create$1(defStr);
 },InPortStr);
 OutPortNum=Dashboard.OutPortNum=Runtime.Class({
  Trigger:function(value)
  {
   this.event.event.Trigger(value);
  },
  Connect:function(port)
  {
   var $this,a,handler;
   $this=this;
   a="Port "+this.name$1+" connect";
   Global.console.log(a);
   port.Disconnect();
   handler=function(a$1,arg)
   {
    var a$2;
    a$2=port.get_Value();
    return Var.Set(a$2,arg);
   };
   this.event.event.AddHandler(handler);
   return function()
   {
    $this.event.event.RemoveHandler(handler);
   };
  },
  IsCompatible:function(port)
  {
   return port instanceof InPortNum;
  }
 },OutPort,OutPortNum);
 OutPortNum.New=Runtime.Ctor(function(name)
 {
  OutPort.New.call(this,name);
  this.name$1=name;
  this.event=new FSharpEvent.New();
 },OutPortNum);
 PortConnector=Dashboard.PortConnector=Runtime.Class({
  Disconnect:function()
  {
   this.disconnector();
  }
 },DshBase,PortConnector);
 PortConnector.New=Runtime.Ctor(function(outPort,inPort)
 {
  DshBase.New.call(this,outPort.get_Name()+"->"+inPort.get_Name());
  this.disconnector=outPort.Connect(inPort);
 },PortConnector);
 Worker=Dashboard.Worker=Runtime.Class({
  get_OutPorts:function()
  {
   return List.T.Empty;
  },
  get_InPorts:function()
  {
   return List.T.Empty;
  },
  Run:function()
  {
  },
  get_Properties:function()
  {
   var m;
   m=function(prop)
   {
    return prop.get_Property();
   };
   return function(l)
   {
    return List.map(m,l);
   }(this.get_InPorts());
  }
 },DshBaseReact,Worker);
 Worker.New=Runtime.Ctor(function(name)
 {
  DshBaseReact.New.call(this,name);
 },Worker);
 RandomValueSource=Sources.RandomValueSource=Runtime.Class({
  Run:function()
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
      d=Global.Math.random()*$this.inDispersionValue.get_Value().c+$this.inMiddleValue.get_Value().c;
      $this.outRandomNumber.Trigger(d);
      return Concurrency.Return(null);
     });
    }));
   }),null);
  },
  Clone:function()
  {
   return new RandomValueSource.New(this.middleValue,this.dispersion);
  },
  get_OutPorts:function()
  {
   return List.ofArray([this.outRandomNumber]);
  },
  get_InPorts:function()
  {
   return List.ofArray([this.inMiddleValue,this.inDispersionValue]);
  }
 },Worker,RandomValueSource);
 RandomValueSource.New=Runtime.Ctor(function(middleValue,dispersion)
 {
  Worker.New.call(this,"Random");
  this.middleValue=middleValue;
  this.dispersion=dispersion;
  this.inMiddleValue=new InPortNum.New("Middle value",this.middleValue);
  this.inDispersionValue=new InPortNum.New("Dispersion",this.dispersion);
  this.outRandomNumber=new OutPortNum.New("Random value");
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
  Run:function()
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
     x=SrcOpenWeather.get($this.inApiKey.get_Value().c,$this.inCity.get_Value().c);
     return Concurrency.Bind(x,function(a)
     {
      var a$1,a$2;
      a$1=a==null?Concurrency.Return(null):(a$2="Value generated:"+a.$0.Title,Global.console.log(a$2),$this.outTempearatur.Trigger(+a.$0.Temperature),Concurrency.Return(null));
      return Concurrency.Combine(a$1,Concurrency.Delay(function()
      {
       return Concurrency.Bind(Concurrency.Sleep(1000*15),function()
       {
        return Concurrency.Return(null);
       });
      }));
     });
    }));
   }),null);
  },
  Clone:function()
  {
   return new Create.New(this.city);
  },
  get_OutPorts:function()
  {
   return List.ofArray([this.outTempearatur]);
  },
  get_InPorts:function()
  {
   return List.ofArray([this.inApiKey,this.inCity]);
  }
 },Worker,Create);
 Create.New=Runtime.Ctor(function(city)
 {
  Worker.New.call(this,"OpenWeatherMap");
  this.city=city;
  this.inApiKey=new InPortStr.New("ApiKey","");
  this.inCity=new InPortStr.New("City",this.city);
  this.outTempearatur=new OutPortNum.New("Temperature");
 },Create);
 SrcOpenWeather.get=function(key,city)
 {
  return Concurrency.Delay(function()
  {
   var request,f;
   request=((f=function($1,$2,$3)
   {
    return $1("http://api.openweathermap.org/data/2.5/weather?q="+PrintfHelpers.toSafe($2)+"&units=metric&appid="+PrintfHelpers.toSafe($3));
   },(Runtime.Curried3(f))(Global.id))(city))(key);
   Global.console.log("get key city "+request);
   return Concurrency.TryWith(Concurrency.Delay(function()
   {
    var x;
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
   }),function(a)
   {
    var a$1;
    a$1=a.message;
    Global.console.log(a$1);
    return Concurrency.Return(null);
   });
  });
 };
 TextBox=Widgets.TextBox=Runtime.Class({
  get_Number:function()
  {
   return this.inPortNumber;
  },
  Clone:function()
  {
   return new TextBox.New();
  },
  get_InPorts:function()
  {
   return List.ofArray([this.inPortNumber]);
  }
 },Worker,TextBox);
 TextBox.New=Runtime.Ctor(function()
 {
  Worker.New.call(this,"Text");
  this.inPortNumber=new InPortNum.New("in Value",0);
 },TextBox);
 Chart=Widgets.Chart=Runtime.Class({
  observe:function(value)
  {
   var $this,v,a;
   $this=this;
   this.values.push(value);
   this.values.length>this.chartBufferSize?v=this.values.shift():void 0;
   a=function(ind,entry)
   {
    return $this.chart.__UpdateData(ind,function()
    {
     return entry;
    });
   };
   (function(s)
   {
    Seq.iteri(a,s);
   }(this.values));
  },
  get_Cy:function()
  {
   return this.inPortCy;
  },
  get_Cx:function()
  {
   return this.inPortCx;
  },
  get_Chart:function()
  {
   return this.chart;
  },
  Clone:function()
  {
   return new Chart.New(this.cx,this.cy,this.chartBufferSize);
  },
  get_InPorts:function()
  {
   return List.ofArray([this.inPortNumber,this.inPortCx,this.inPortCy]);
  }
 },Worker,Chart);
 Chart.New=Runtime.Ctor(function(cx,cy,chartBufferSize)
 {
  var $this,data,queue,a,a$1;
  $this=this;
  Worker.New.call(this,"Chart");
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
  this.values=(queue=[],(a=function(entry)
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
  this.inPortCx=new InPortNum.New("cx",this.cx);
  this.inPortCy=new InPortNum.New("cy",this.cy);
  this.inPortNumber=new InPortNum.New("in Value",0);
  a$1=this.inPortNumber.get_Value().v;
  View.Sink(function(v)
  {
   $this.observe(v);
  },a$1);
 },Chart);
 Widgets.render=function(worker)
 {
  var strView,a,a$1,a$2;
  return worker instanceof TextBox?(strView=(a=worker.get_Number().get_Value().v,View.Map(function(value)
  {
   var c;
   c=value<<0;
   return Global.String(c);
  },a)),(a$1=[AttrModule.Class("bigvalue")],(a$2=[Doc.TextView(strView)],Doc.Element("div",a$1,a$2)))):worker instanceof Chart?ChartJs.Render$8(worker.get_Chart(),{
   $:1,
   $0:{
    $:0,
    $0:worker.get_Cx().get_Value().c<<0,
    $1:worker.get_Cy().get_Value().c<<0
   }
  },null,null):Doc.Element("div",[],[]);
 };
 WorkerItem.Create=function(worker)
 {
  return WorkerItem.New(Key.Fresh(),worker);
 };
 WorkerItem.New=function(Key$1,Worker$1)
 {
  return{
   Key:Key$1,
   Worker:Worker$1
  };
 };
 Factory=Dashboard.Factory=Runtime.Class({
  RegisterSource:function(source)
  {
   this.SourceItems.Append(WorkerItem.Create(source));
  },
  RegisterWidget:function(receiver)
  {
   this.WidgetItems.Append(WorkerItem.Create(receiver));
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
 Factory.New=function(SourceItems,WidgetItems)
 {
  return new Factory({
   SourceItems:SourceItems,
   WidgetItems:WidgetItems
  });
 };
 PortConnectorItem.Create=function(connector)
 {
  return PortConnectorItem.New(Key.Fresh(),connector);
 };
 PortConnectorItem.New=function(Key$1,PortConnector$1)
 {
  return{
   Key:Key$1,
   PortConnector:PortConnector$1
  };
 };
 DshData=Dashboard.DshData=Runtime.Class({
  ConnectPorts:function(outPort,inPort)
  {
   var connnector;
   connnector=new PortConnector.New(outPort,inPort);
   this.PortConnectorItems.Append(PortConnectorItem.Create(connnector));
  }
 },null,DshData);
 DshData.get_Create=function()
 {
  var a,a$1,a$2;
  return DshData.New((a=List.T.Empty,ListModel.Create(function(item)
  {
   return item.Key;
  },a)),(a$1=List.T.Empty,ListModel.Create(function(item)
  {
   return item.Key;
  },a$1)),(a$2=List.T.Empty,ListModel.Create(function(item)
  {
   return item.Key;
  },a$2)));
 };
 DshData.New=function(WorkItems,WidgetItems,PortConnectorItems)
 {
  return new DshData({
   WorkItems:WorkItems,
   WidgetItems:WidgetItems,
   PortConnectorItems:PortConnectorItems
  });
 };
 DshEditorCellItem=Dashboard.DshEditorCellItem=Runtime.Class({
  Render:function(data)
  {
   var workerSelector,items,m,a,a$1,a$2,a$3,a$4,a$5,a$6,a$7,a$8;
   workerSelector=(items=(m=function(item)
   {
    return{
     $:1,
     $0:item
    };
   },function(l)
   {
    return List.map(m,l);
   }(List.ofSeq(data.WorkItems))),(a=[AttrModule.Class("form-control")],(a$1=this.OptWorker,Doc.Select(a,function(item)
   {
    return item==null?" ":item.$0.Worker.get_Name().c;
   },items,a$1))));
   a$2=[AttrModule.Class("td DshEditorCell")];
   a$3=[(a$4=[AttrModule.Class("div DshEditorCell")],(a$5=[(a$6=[(a$7=[(a$8=[Helper.IconNormal("add",function()
   {
   })],Doc.Element("td",[],a$8)),Doc.Element("td",[],[workerSelector])],Doc.Element("tr",[],a$7))],Doc.Element("table",[],a$6))],Doc.Element("div",a$4,a$5)))];
   return Doc.Element("td",a$2,a$3);
  }
 },null,DshEditorCellItem);
 DshEditorCellItem.get_Create=function()
 {
  return DshEditorCellItem.New(Key.Fresh(),Var.Create$1(null));
 };
 DshEditorCellItem.New=function(Key$1,OptWorker)
 {
  return new DshEditorCellItem({
   Key:Key$1,
   OptWorker:OptWorker
  });
 };
 DshEditorRowItem=Dashboard.DshEditorRowItem=Runtime.Class({
  Render:function(data)
  {
   var $this,renderExistentCells,a,a$1,a$2;
   $this=this;
   renderExistentCells=(a=function(m)
   {
    return m.Key;
   },(a$1=function(item)
   {
    return item.Render(data);
   },function(a$3)
   {
    return Doc.ConvertBy(a,a$1,a$3);
   })(this.CellItems.v));
   a$2=[renderExistentCells,Helper.IconNormal("add",function()
   {
    $this.CellItems.Append(DshEditorCellItem.get_Create());
   })];
   return Doc.Element("tr",[],a$2);
  }
 },null,DshEditorRowItem);
 DshEditorRowItem.get_Create=function()
 {
  var a;
  return DshEditorRowItem.New(Key.Fresh(),(a=List.T.Empty,ListModel.Create(function(item)
  {
   return item.Key;
  },a)));
 };
 DshEditorRowItem.New=function(Key$1,CellItems)
 {
  return new DshEditorRowItem({
   Key:Key$1,
   CellItems:CellItems
  });
 };
 DshEditor=Dashboard.DshEditor=Runtime.Class({
  Render:function(data)
  {
   var $this,renderRows,a,a$1,a$2,a$3,a$4;
   $this=this;
   renderRows=(a=function(m)
   {
    return m.Key;
   },(a$1=function(item)
   {
    var a$5;
    a$5=[item.Render(data)];
    return Doc.Element("tr",[],a$5);
   },function(a$5)
   {
    return Doc.ConvertBy(a,a$1,a$5);
   })(this.RowItems.v));
   a$2=[renderRows,(a$3=[(a$4=[Helper.IconNormal("add",function()
   {
    $this.RowItems.Append(DshEditorRowItem.get_Create());
   })],Doc.Element("td",[],a$4))],Doc.Element("tr",[],a$3))];
   return Doc.Element("table",[],a$2);
  }
 },null,DshEditor);
 DshEditor.get_Create=function()
 {
  var a;
  return DshEditor.New((a=List.T.Empty,ListModel.Create(function(item)
  {
   return item.Key;
  },a)));
 };
 DshEditor.New=function(RowItems)
 {
  return new DshEditor({
   RowItems:RowItems
  });
 };
 SourceProperty=Dashboard.SourceProperty=Runtime.Class({
  WebSharper_Community_PropertyGrid_IProperty$get_Render:function()
  {
   var $this,items,m,item,m$1,p,selected,observe,a,a$1,a$2;
   $this=this;
   items=List.concat((m=function(item$1)
   {
    var m$2;
    m$2=function(port)
    {
     return[item$1,port];
    };
    return function(l)
    {
     return List.map(m$2,l);
    }(item$1.Worker.get_OutPorts());
   },function(l)
   {
    return List.map(m,l);
   }(List.ofSeq(this.data.WorkItems))));
   return items.get_Length()>0?(item=(m$1=(p=function(srcItem,port)
   {
    return Unchecked.Equals(port,$this.receiver.get_InPorts().get_Item(0).get_OutPort());
   },function(l)
   {
    return Seq.tryFind(function($1)
    {
     return p($1[0],$1[1]);
    },l);
   }(items)),(m$1!=null?m$1.$==1:false)?m$1.$0:List.head(items)),(selected=Var.Create$1(item),(observe=function(src,outPort)
   {
    $this.data.ConnectPorts(outPort,$this.receiver.get_InPorts().get_Item(0));
   },(a=selected.v,View.Sink(function($1)
   {
    return observe($1[0],$1[1]);
   },a),a$1=[AttrModule.Class("form-control")],a$2=function(item$1,port)
   {
    return item$1.Worker.get_Name().c+"\\"+port.get_Name();
   },Doc.Select(a$1,function($1)
   {
    return a$2($1[0],$1[1]);
   },items,selected))))):Doc.TextNode("No sources defined");
  },
  WebSharper_Community_PropertyGrid_IProperty$get_Name:function()
  {
   return"Source";
  }
 },null,SourceProperty);
 SourceProperty.New=Runtime.Ctor(function(data,receiver)
 {
  this.data=data;
  this.receiver=receiver;
 },SourceProperty);
 Dashboard$1=Dashboard.Dashboard=Runtime.Class({
  get_Render:function()
  {
   var $this,srcRender,a,a$1,a$2,containers,menu,m,containerDivs,m$1,a$3,a$4,a$5,a$6,a$7,a$8,a$9,a$10,a$11,a$12,a$13,a$14,a$15,a$16;
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
   srcRender=(a=[(a$1=function(m$2)
   {
    return m$2.Key;
   },(a$2=function(item)
   {
    var a$17,a$18,a$19;
    a$17=[(a$18=Helper.AttrsClick(function()
    {
     $this.PropertyGrid.Edit(item.Worker.get_Properties());
    }),(a$19=[Doc.TextView(item.Worker.get_Name().v)],Doc.Element("i",a$18,a$19)))];
    return Doc.Element("tr",[],a$17);
   },function(a$17)
   {
    return Doc.ConvertBy(a$1,a$2,a$17);
   })(this.Data.WorkItems.v))],Doc.Element("table",[],a));
   containers=List.ofArray([["Board",container(true,this.PanelContainer.get_Render())],["Sources",container(false,srcRender)],["Edit",container(false,this.DshEditor.Render(this.Data))]]);
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
   a$3=[(a$4=[(a$5=[(a$6=[AttrModule.Style("vertical-align","top")],(a$7=[(a$8=Seq.concat([List.ofArray([(a$9=[(a$10=[Helper.IconNormal("dehaze",function()
   {
   })],Doc.Element("td",[],a$10))],Doc.Element("tr",[],a$9)),(a$11=[(a$12=[Helper.IconNormal("add",function()
   {
    var p,varBoolDash,p$1,varBoolSrc,items,selected,o,a$17,a$18,a$19,v;
    p=containers.get_Item(0);
    varBoolDash=p[1][0];
    p$1=containers.get_Item(1);
    varBoolSrc=p$1[1][0];
    varBoolSrc.c?(items=List.ofSeq($this.Factory.SourceItems),selected=Var.Create$1(List.head(items)),o=$this.Dialog,a$17=(a$18=[(a$19=[AttrModule.Class("form-control")],Doc.Select(a$19,function(item)
    {
     return item.Worker.get_Name().c;
    },items,selected))],Doc.Element("div",[],a$18)),o.ShowDialog("Select source",a$17,function()
    {
     selected.c.Worker.Run();
     $this.RegisterSource(selected.c.Worker.Clone());
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
   var $this,renderWidgets,x,a,childContainerContent;
   $this=this;
   renderWidgets=(x=this.Factory.WidgetItems.v,(a=this.Data.WidgetItems.key,Doc.ConvertBy(a,function(item)
   {
    var nameView,a$1;
    nameView=item.Worker.get_Name().v;
    a$1=[Doc.TextView(nameView)];
    return Doc.Element("div",[],a$1);
   },x)));
   childContainerContent=PanelContainer.get_Create().WithLayoutManager(LayoutManagers.StackPanelLayoutManager()).WithAttributes([AttrModule.Style("border","1px solid white"),AttrModule.Style("display","flex")]);
   this.PanelContainer.AddPanel(Panel$1.get_Create().WithPannelAttrs([AttrModule.Style("Width",Global.String(cx)+"px"),AttrModule.Style("position","absolute")]).WithTitleContent(Doc.TextNode(name)).WithTitleButtons(List.ofArray([TitleButton.New("add",function(panel)
   {
    var items,selected,o,a$1,a$2,a$3;
    items=List.ofSeq($this.Factory.WidgetItems);
    selected=Var.Create$1(List.head(items));
    o=$this.Dialog;
    a$1=(a$2=[(a$3=[AttrModule.Class("form-control")],Doc.Select(a$3,function(item)
    {
     return item.Worker.get_Name().c;
    },items,selected))],Doc.Element("div",[],a$2));
    o.ShowDialog("Select widget",a$1,function()
    {
     Global.console.log("Dialog.IsOK");
     $this.RegisterWidget(panel.Children,selected.c.Worker.Clone());
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
  RegisterWidget:function(toPanelContainer,widget)
  {
   this.Data.WidgetItems.Append(WorkerItem.Create(widget));
   toPanelContainer.AddPanel(Panel$1.get_Create().WithTitle(false).WithPanelContent(Widgets.render(widget)).WithProperties(new List.T({
    $:1,
    $0:new SourceProperty.New(this.Data,widget),
    $1:widget.get_Properties()
   })));
  },
  RegisterSource:function(source)
  {
   this.Data.WorkItems.Append(WorkerItem.Create(source));
   source.Run();
  }
 },null,Dashboard$1);
 Dashboard$1.Create=function(panelContainer)
 {
  var dialog,F,D;
  dialog=Dialog.get_Create();
  F=Factory.get_Create();
  D=DshData.get_Create();
  return Dashboard$1.New(F,D,panelContainer,DshEditor.get_Create(),PropertyGrid$1.get_Create(),dialog);
 };
 Dashboard$1.New=function(Factory$1,Data$2,PanelContainer$1,DshEditor$1,PropertyGrid$2,Dialog$1)
 {
  return new Dashboard$1({
   Factory:Factory$1,
   Data:Data$2,
   PanelContainer:PanelContainer$1,
   DshEditor:DshEditor$1,
   PropertyGrid:PropertyGrid$2,
   Dialog:Dialog$1
  });
 };
}());
