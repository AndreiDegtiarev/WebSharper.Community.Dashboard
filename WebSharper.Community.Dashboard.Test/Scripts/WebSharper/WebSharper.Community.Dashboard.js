(function()
{
 "use strict";
 var WebSharper,Community,Dashboard,EmptyTrigger,NumberTrigger,InPort,OutPort,PortConnector,Ports,Worker,RandomRunner,OpenWeather,Forecast,OpenWeatherRunner,ChartRunnerContext,ChartRenderer,TextBoxRenderer,WorkerItem,Factory,PortConnectorItem,DshData,DshEditorCellItem,DshEditorRowItem,DshEditor,Dashboard$1,IntelliFactory,Runtime,PropertyGrid,Properties,UI,Next,Var,Control,FSharpEvent,console,Operators,Unchecked,List,Doc,Random,Concurrency,Math,PrintfHelpers,Data,TxtRuntime,FSharp,Data$1,Runtime$1,IO,JSON,Arrays,Charting,Renderers,ChartJs,Seq,Chart,Pervasives,View,AttrModule,Key,ListModel,Option,Panel,Helper,Enumerator,PanelContainer,LayoutManagers,Panel$1,TitleButton,Dialog,PropertyGrid$1;
 WebSharper=window.WebSharper=window.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 EmptyTrigger=Dashboard.EmptyTrigger=Dashboard.EmptyTrigger||{};
 NumberTrigger=Dashboard.NumberTrigger=Dashboard.NumberTrigger||{};
 InPort=Dashboard.InPort=Dashboard.InPort||{};
 OutPort=Dashboard.OutPort=Dashboard.OutPort||{};
 PortConnector=Dashboard.PortConnector=Dashboard.PortConnector||{};
 Ports=Dashboard.Ports=Dashboard.Ports||{};
 Worker=Dashboard.Worker=Dashboard.Worker||{};
 RandomRunner=Dashboard.RandomRunner=Dashboard.RandomRunner||{};
 OpenWeather=Dashboard.OpenWeather=Dashboard.OpenWeather||{};
 Forecast=OpenWeather.Forecast=OpenWeather.Forecast||{};
 OpenWeatherRunner=Dashboard.OpenWeatherRunner=Dashboard.OpenWeatherRunner||{};
 ChartRunnerContext=Dashboard.ChartRunnerContext=Dashboard.ChartRunnerContext||{};
 ChartRenderer=Dashboard.ChartRenderer=Dashboard.ChartRenderer||{};
 TextBoxRenderer=Dashboard.TextBoxRenderer=Dashboard.TextBoxRenderer||{};
 WorkerItem=Dashboard.WorkerItem=Dashboard.WorkerItem||{};
 Factory=Dashboard.Factory=Dashboard.Factory||{};
 PortConnectorItem=Dashboard.PortConnectorItem=Dashboard.PortConnectorItem||{};
 DshData=Dashboard.DshData=Dashboard.DshData||{};
 DshEditorCellItem=Dashboard.DshEditorCellItem=Dashboard.DshEditorCellItem||{};
 DshEditorRowItem=Dashboard.DshEditorRowItem=Dashboard.DshEditorRowItem||{};
 DshEditor=Dashboard.DshEditor=Dashboard.DshEditor||{};
 Dashboard$1=Dashboard.Dashboard=Dashboard.Dashboard||{};
 IntelliFactory=window.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 PropertyGrid=Community&&Community.PropertyGrid;
 Properties=PropertyGrid&&PropertyGrid.Properties;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Var=Next&&Next.Var;
 Control=WebSharper&&WebSharper.Control;
 FSharpEvent=Control&&Control.FSharpEvent;
 console=window.console;
 Operators=WebSharper&&WebSharper.Operators;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 List=WebSharper&&WebSharper.List;
 Doc=Next&&Next.Doc;
 Random=WebSharper&&WebSharper.Random;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Math=window.Math;
 PrintfHelpers=WebSharper&&WebSharper.PrintfHelpers;
 Data=WebSharper&&WebSharper.Data;
 TxtRuntime=Data&&Data.TxtRuntime;
 FSharp=window.FSharp;
 Data$1=FSharp&&FSharp.Data;
 Runtime$1=Data$1&&Data$1.Runtime;
 IO=Runtime$1&&Runtime$1.IO;
 JSON=window.JSON;
 Arrays=WebSharper&&WebSharper.Arrays;
 Charting=WebSharper&&WebSharper.Charting;
 Renderers=Charting&&Charting.Renderers;
 ChartJs=Renderers&&Renderers.ChartJs;
 Seq=WebSharper&&WebSharper.Seq;
 Chart=Charting&&Charting.Chart;
 Pervasives=Charting&&Charting.Pervasives;
 View=Next&&Next.View;
 AttrModule=Next&&Next.AttrModule;
 Key=Next&&Next.Key;
 ListModel=Next&&Next.ListModel;
 Option=WebSharper&&WebSharper.Option;
 Panel=Community&&Community.Panel;
 Helper=Panel&&Panel.Helper;
 Enumerator=WebSharper&&WebSharper.Enumerator;
 PanelContainer=Panel&&Panel.PanelContainer;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 Panel$1=Panel&&Panel.Panel;
 TitleButton=Panel&&Panel.TitleButton;
 Dialog=Panel&&Panel.Dialog;
 PropertyGrid$1=PropertyGrid&&PropertyGrid.PropertyGrid;
 EmptyTrigger.New=function(EmptyTrigger$1)
 {
  return{
   EmptyTrigger:EmptyTrigger$1
  };
 };
 NumberTrigger=Dashboard.NumberTrigger=Runtime.Class({
  Trigger:function(value)
  {
   this.NumberEvent.event.Trigger(value);
  }
 },null,NumberTrigger);
 NumberTrigger.New=function(NumberEvent)
 {
  return new NumberTrigger({
   NumberEvent:NumberEvent
  });
 };
 InPort=Dashboard.InPort=Runtime.Class({
  Equals:function(y)
  {
   return y instanceof InPort&&this.Name===y.Name;
  },
  get_Property:function()
  {
   var m;
   m=this.Value;
   return m.$==1?Properties["double"](this.Name,m.$0.NumValue):m.$==2?Properties.string(this.Name,m.$0.StrValue):Properties.group(this.Name);
  },
  get_Clone:function()
  {
   var m;
   return InPort.New(this.Name,this.Disconnector,this.Disconnect,this.OutPort,(m=this.Value,m.$==1?{
    $:1,
    $0:{
     NumValue:Var.Create$1(m.$0.NumValue.c)
    }
   }:m.$==2?{
    $:2,
    $0:{
     StrValue:Var.Create$1(m.$0.StrValue.c)
    }
   }:{
    $:0,
    $0:m.$0
   }));
  }
 },null,InPort);
 InPort.New=function(Name,Disconnector,Disconnect,OutPort$1,Value)
 {
  return new InPort({
   Name:Name,
   Disconnector:Disconnector,
   Disconnect:Disconnect,
   OutPort:OutPort$1,
   Value:Value
  });
 };
 OutPort=Dashboard.OutPort=Runtime.Class({
  Equals:function(y)
  {
   return y instanceof OutPort&&this.Name===y.Name;
  }
 },null,OutPort);
 OutPort.New=function(Name,IsCompatible,Connect,Trigger)
 {
  return new OutPort({
   Name:Name,
   IsCompatible:IsCompatible,
   Connect:Connect,
   Trigger:Trigger
  });
 };
 PortConnector.Create=function(oPort,iPort)
 {
  return PortConnector.New(oPort.Name+"->"+iPort.Name,iPort,oPort,oPort.Connect(iPort));
 };
 PortConnector.New=function(Name,InPort$1,OutPort$1,Disconnect)
 {
  return{
   Name:Name,
   InPort:InPort$1,
   OutPort:OutPort$1,
   Disconnect:Disconnect
  };
 };
 Ports.Clone=function(oPort)
 {
  return oPort.Trigger.$==1?Ports.OutPortNum(oPort.Name):Ports.BaseOutPort(oPort.Name);
 };
 Ports.OutPortNum=function(name)
 {
  var event;
  event=new FSharpEvent.New();
  return OutPort.New(Ports.BaseOutPort(name).Name,function(port)
  {
   return port.Value.$==1&&true;
  },function(port)
  {
   var m,numValue,handler;
   m=port.Value;
   return m.$==1?(numValue=m.$0,(port.Disconnect(),handler=function(a,arg)
   {
    return Var.Set(numValue.NumValue,arg);
   },event.event.AddHandler(handler),console.log("Port "+name+" connected with "+port.Name),function()
   {
    event.event.RemoveHandler(handler);
   })):Operators.FailWith("Unexpected type");
  },{
   $:1,
   $0:NumberTrigger.New(event)
  });
 };
 Ports.InPortStr=function(name,defValue)
 {
  var i;
  i=Ports.BaseInPort(name);
  return InPort.New(i.Name,i.Disconnector,i.Disconnect,i.OutPort,{
   $:2,
   $0:{
    StrValue:Var.Create$1(defValue)
   }
  });
 };
 Ports.InPortNum=function(name,defValue)
 {
  var i;
  i=Ports.BaseInPort(name);
  return InPort.New(i.Name,i.Disconnector,i.Disconnect,i.OutPort,{
   $:1,
   $0:{
    NumValue:Var.Create$1(defValue)
   }
  });
 };
 Ports.BaseInPort=function(name)
 {
  return InPort.New(name,function()
  {
  },function()
  {
   console.log("Port "+name+" disconnected");
  },Ports.BaseOutPort("Empty"),{
   $:0,
   $0:{
    Nothing:""
   }
  });
 };
 Ports.BaseOutPort=function(name)
 {
  return OutPort.New(name,function()
  {
   return false;
  },function()
  {
   return function()
   {
    return null;
   };
  },{
   $:0,
   $0:EmptyTrigger.New("")
  });
 };
 Ports.NumTrigger=function(port)
 {
  var m,trigger;
  m=port.Trigger;
  return m.$==1?(trigger=m.$0,function(a)
  {
   trigger.Trigger(a);
  }):Operators.FailWith("unexpected type");
 };
 Ports.StringVar=function(port)
 {
  var m;
  m=port.Value;
  return m.$==2?m.$0.StrValue:Operators.FailWith("unexpected type");
 };
 Ports.NumberVar=function(port)
 {
  var m;
  m=port.Value;
  return m.$==1?m.$0.NumValue:Operators.FailWith("unexpected type");
 };
 Worker=Dashboard.Worker=Runtime.Class({
  Equals:function(y)
  {
   return y instanceof Worker&&Unchecked.Equals(this.Name,y.Name);
  },
  get_Properties:function()
  {
   return new List.T({
    $:1,
    $0:Properties.string("Name",this.Name),
    $1:List.map(function(port)
    {
     return port.get_Property();
    },this.InPorts)
   });
  },
  get_Render:function()
  {
   var m;
   m=this.Renderer;
   return m==null?Doc.Empty():(m.$0.WebSharper_Community_Dashboard_IRenderer$get_Render())(this);
  },
  get_CloneAndRun:function()
  {
   var copy,m;
   copy=Worker.New(Var.Create$1(this.Name.c),List.map(function(port)
   {
    return port.get_Clone();
   },this.InPorts),List.map(Ports.Clone,this.OutPorts),this.Runner,this.Renderer,this.DataContext,null);
   m=copy.Runner;
   return m==null?copy:Worker.New(copy.Name,copy.InPorts,copy.OutPorts,copy.Runner,copy.Renderer,copy.DataContext,(m.$0.WebSharper_Community_Dashboard_IRunner$get_Run())(copy));
  }
 },null,Worker);
 Worker.CreateRenderer=function(dataContext)
 {
  return Worker.CreateNative(dataContext,null,{
   $:1,
   $0:dataContext
  });
 };
 Worker.CreateRunner=function(dataContext)
 {
  return Worker.CreateNative(dataContext,{
   $:1,
   $0:dataContext
  },null);
 };
 Worker.Create=function(dataContext)
 {
  return Worker.CreateNative(dataContext,{
   $:1,
   $0:dataContext
  },{
   $:1,
   $0:dataContext
  });
 };
 Worker.CreateNative=function(dataContext,runner,renderer)
 {
  return Worker.New(Var.Create$1(dataContext.WebSharper_Community_Dashboard_IWorkerContext$get_Name()),dataContext.WebSharper_Community_Dashboard_IWorkerContext$get_InPorts(),dataContext.WebSharper_Community_Dashboard_IWorkerContext$get_OutPorts(),runner,renderer,dataContext,null);
 };
 Worker.New=function(Name,InPorts,OutPorts,Runner,Renderer,DataContext,RunnerContext)
 {
  return new Worker({
   Name:Name,
   InPorts:InPorts,
   OutPorts:OutPorts,
   Runner:Runner,
   Renderer:Renderer,
   DataContext:DataContext,
   RunnerContext:RunnerContext
  });
 };
 RandomRunner=Dashboard.RandomRunner=Runtime.Class({
  WebSharper_Community_Dashboard_IRunner$get_Run:function()
  {
   return function(worker)
   {
    var b;
    new Random.New();
    Concurrency.Start((b=null,Concurrency.Delay(function()
    {
     return Concurrency.While(function()
     {
      return true;
     },Concurrency.Delay(function()
     {
      return Concurrency.Bind(Concurrency.Sleep(600),function()
      {
       var disper,middle,d;
       disper=Ports.NumberVar(worker.InPorts.get_Item(1));
       middle=Ports.NumberVar(worker.InPorts.get_Item(0));
       d=Math.random()*disper.c+middle.c;
       (Ports.NumTrigger(worker.OutPorts.get_Item(0)))(d);
       return Concurrency.Zero();
      });
     }));
    })),null);
    return null;
   };
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_OutPorts:function()
  {
   return List.ofArray([Ports.OutPortNum("Random value")]);
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_InPorts:function()
  {
   return List.ofArray([Ports.InPortNum("Middle value",this.MiddleValue),Ports.InPortNum("Dispersion",this.Dispersion)]);
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_Name:function()
  {
   return"Rundom";
  }
 },null,RandomRunner);
 RandomRunner.get_FromInPorts=function()
 {
  return function(worker)
  {
   return RandomRunner.Create(Ports.NumberVar(worker.InPorts.get_Item(0)).c,Ports.NumberVar(worker.InPorts.get_Item(1)).c);
  };
 };
 RandomRunner.Create=function(middleValue,dispersion)
 {
  return RandomRunner.New(middleValue,dispersion);
 };
 RandomRunner.New=function(MiddleValue,Dispersion)
 {
  return new RandomRunner({
   MiddleValue:MiddleValue,
   Dispersion:Dispersion
  });
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
 OpenWeather.get=function(key,city)
 {
  var b;
  b=null;
  return Concurrency.Delay(function()
  {
   var request;
   request=(((Runtime.Curried3(function($1,$2,$3)
   {
    return $1("http://api.openweathermap.org/data/2.5/weather?q="+PrintfHelpers.toSafe($2)+"&units=metric&appid="+PrintfHelpers.toSafe($3));
   }))(window.id))(city))(key);
   console.log("get key city "+request);
   return Concurrency.TryWith(Concurrency.Delay(function()
   {
    return Concurrency.Bind(TxtRuntime.AsyncMap(IO.asyncReadTextAtRuntime(false,"C:\\Users\\Andrey\\Private\\VS_Projects\\WebSharper.Community.Dashboard\\WebSharper.Community.Dashboard","","JSON","",request),function(t)
    {
     return Unchecked.Equals(typeof t,"string")?JSON.parse(t):t;
    }),function(a)
    {
     var o,head,prop,opt,x,prop$1,opt$1,prop$2,opt$2,prop$3,opt$3,v,x$1,prop$4,opt$4,v$1,x$2,prop$5,opt$5,v$2,x$3,prop$6,opt$6;
     console.log("get key city 2");
     return Concurrency.Return((o=Arrays.tryHead(a.weather),o==null?null:{
      $:1,
      $0:(head=o.$0,Forecast.New((((Runtime.Curried3(function($1,$2,$3)
      {
       return $1(PrintfHelpers.toSafe($2)+", "+PrintfHelpers.toSafe($3));
      }))(window.id))((opt=(prop="name",prop in a?{
       $:1,
       $0:a[prop]
      }:null),opt==null?null:opt.$0)))((opt$1=(x=a.sys,(prop$1="country",prop$1 in x?{
       $:1,
       $0:x[prop$1]
      }:null)),opt$1==null?null:opt$1.$0)),(opt$2=(prop$2="main",prop$2 in head?{
       $:1,
       $0:head[prop$2]
      }:null),opt$2==null?null:opt$2.$0),(function($1)
      {
       return function($2)
       {
        return $1("http://openweathermap.org/img/w/"+PrintfHelpers.toSafe($2)+".png");
       };
      }(window.id))((opt$3=(prop$3="icon",prop$3 in head?{
       $:1,
       $0:head[prop$3]
      }:null),opt$3==null?null:opt$3.$0)),(v=(x$1=a.main,(prop$4="temp",prop$4 in x$1?{
       $:1,
       $0:x$1[prop$4]
      }:null)),(opt$4=v==null?null:{
       $:1,
       $0:1*v.$0
      },opt$4==null?null:opt$4.$0)),[(v$1=(x$2=a.main,(prop$5="temp_min",prop$5 in x$2?{
       $:1,
       $0:x$2[prop$5]
      }:null)),(opt$5=v$1==null?null:{
       $:1,
       $0:1*v$1.$0
      },opt$5==null?null:opt$5.$0)),(v$2=(x$3=a.main,(prop$6="temp_max",prop$6 in x$3?{
       $:1,
       $0:x$3[prop$6]
      }:null)),(opt$6=v$2==null?null:{
       $:1,
       $0:1*v$2.$0
      },opt$6==null?null:opt$6.$0))]))
     }));
    });
   }),function(a)
   {
    console.log(a.message);
    return Concurrency.Return(null);
   });
  });
 };
 OpenWeatherRunner=Dashboard.OpenWeatherRunner=Runtime.Class({
  WebSharper_Community_Dashboard_IRunner$get_Run:function()
  {
   return function(worker)
   {
    var b;
    Concurrency.Start((b=null,Concurrency.Delay(function()
    {
     return Concurrency.While(function()
     {
      return true;
     },Concurrency.Delay(function()
     {
      var inCity,inApiKey,outTempearatur;
      inCity=worker.InPorts.get_Item(0);
      inApiKey=worker.InPorts.get_Item(1);
      outTempearatur=worker.OutPorts.get_Item(0);
      return Concurrency.Bind(OpenWeather.get(Ports.StringVar(inApiKey).c,Ports.StringVar(inCity).c),function(a)
      {
       return Concurrency.Combine(a==null?Concurrency.Zero():(console.log("Value generated:"+a.$0.Title),(Ports.NumTrigger(outTempearatur))(+a.$0.Temperature),Concurrency.Zero()),Concurrency.Delay(function()
       {
        return Concurrency.Bind(Concurrency.Sleep(1000*15),function()
        {
         return Concurrency.Return(null);
        });
       }));
      });
     }));
    })),null);
    return null;
   };
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_OutPorts:function()
  {
   return List.ofArray([Ports.OutPortNum("Temperature")]);
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_InPorts:function()
  {
   return List.ofArray([Ports.InPortStr("City",this.OpenWeatherCity),Ports.InPortStr("ApiKey",this.OpenWeatherApiKey)]);
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_Name:function()
  {
   return"OpenWeatherMap";
  }
 },null,OpenWeatherRunner);
 OpenWeatherRunner.get_FromInPorts=function()
 {
  return function(worker)
  {
   return OpenWeatherRunner.Create(Ports.StringVar(worker.InPorts.get_Item(0)).c,Ports.StringVar(worker.InPorts.get_Item(1)).c);
  };
 };
 OpenWeatherRunner.Create=function(city,apikey)
 {
  return OpenWeatherRunner.New(city,apikey);
 };
 OpenWeatherRunner.New=function(OpenWeatherCity,OpenWeatherApiKey)
 {
  return new OpenWeatherRunner({
   OpenWeatherCity:OpenWeatherCity,
   OpenWeatherApiKey:OpenWeatherApiKey
  });
 };
 ChartRunnerContext.New=function(LineChart)
 {
  return{
   LineChart:LineChart
  };
 };
 ChartRenderer=Dashboard.ChartRenderer=Runtime.Class({
  WebSharper_Community_Dashboard_IRenderer$get_Render:function()
  {
   return function(worker)
   {
    return ChartJs.Render$8(worker.RunnerContext.$0.LineChart,{
     $:1,
     $0:{
      $:0,
      $0:Ports.NumberVar(worker.InPorts.get_Item(1)).c<<0,
      $1:Ports.NumberVar(worker.InPorts.get_Item(2)).c<<0
     }
    },null,null);
   };
  },
  WebSharper_Community_Dashboard_IRunner$get_Run:function()
  {
   return function(worker)
   {
    var chartBufferSize,data,values,queue,chart;
    chartBufferSize=Ports.NumberVar(worker.InPorts.get_Item(3)).c<<0;
    data=List.ofSeq(Seq.delay(function()
    {
     return Seq.map(function()
     {
      return 0;
     },Operators.range(0,chartBufferSize-1));
    }));
    values=(queue=[],(Seq.iter(function(entry)
    {
     queue.push(entry);
    },data),queue));
    chart=Chart.Line(data).__WithFillColor(new Pervasives.Color({
     $:2,
     $0:"white"
    }));
    View.Sink(function(value)
    {
     values.push(value);
     values.length>chartBufferSize?values.shift():void 0;
     Seq.iteri(function(ind,entry)
     {
      return chart.__UpdateData(ind,function()
      {
       return entry;
      });
     },values);
    },Ports.NumberVar(worker.InPorts.get_Item(0)).v);
    return{
     $:1,
     $0:ChartRunnerContext.New(chart)
    };
   };
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_OutPorts:function()
  {
   return List.T.Empty;
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_InPorts:function()
  {
   return List.ofArray([Ports.InPortNum("in Value",0),Ports.InPortNum("cx",this.Cx),Ports.InPortNum("cy",this.Cy),Ports.InPortNum("BufferSize",+this.ChartBufferSize)]);
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_Name:function()
  {
   return"Chart";
  }
 },null,ChartRenderer);
 ChartRenderer.get_FromInPorts=function()
 {
  return function(worker)
  {
   return ChartRenderer.Create(Ports.NumberVar(worker.InPorts.get_Item(1)).c,Ports.NumberVar(worker.InPorts.get_Item(2)).c,Ports.NumberVar(worker.InPorts.get_Item(3)).c<<0);
  };
 };
 ChartRenderer.Create=function(cx,cy,bufferSize)
 {
  return ChartRenderer.New(cx,cy,bufferSize);
 };
 ChartRenderer.New=function(Cx,Cy,ChartBufferSize)
 {
  return new ChartRenderer({
   Cx:Cx,
   Cy:Cy,
   ChartBufferSize:ChartBufferSize
  });
 };
 TextBoxRenderer=Dashboard.TextBoxRenderer=Runtime.Class({
  WebSharper_Community_Dashboard_IRenderer$get_Render:function()
  {
   return function(worker)
   {
    var strView;
    strView=View.Map(function(value)
    {
     var c;
     c=value<<0;
     return window.String(c);
    },Ports.NumberVar(worker.InPorts.get_Item(0)).v);
    return Doc.Element("div",[AttrModule.Class("bigvalue")],[Doc.TextView(strView)]);
   };
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_OutPorts:function()
  {
   return List.T.Empty;
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_InPorts:function()
  {
   return List.ofArray([Ports.InPortNum("in Value",this.TextBoxValue)]);
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_Name:function()
  {
   return"Text";
  }
 },null,TextBoxRenderer);
 TextBoxRenderer.get_FromInPorts=function()
 {
  return function(worker)
  {
   return TextBoxRenderer.New(Ports.NumberVar(worker.InPorts.get_Item(0)).c);
  };
 };
 TextBoxRenderer.get_Create=function()
 {
  return TextBoxRenderer.New(0);
 };
 TextBoxRenderer.New=function(TextBoxValue)
 {
  return new TextBoxRenderer({
   TextBoxValue:TextBoxValue
  });
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
  RegisterEvent:function(event)
  {
   this.EventItems.Append(WorkerItem.Create(event));
  },
  RegisterWidget:function(widget)
  {
   this.WidgetItems.Append(WorkerItem.Create(widget));
  }
 },null,Factory);
 Factory.get_Create=function()
 {
  return Factory.New(ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty),ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty));
 };
 Factory.New=function(EventItems,WidgetItems)
 {
  return new Factory({
   EventItems:EventItems,
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
   console.log("Connect ports:"+outPort.Name+" "+inPort.Name);
   this.PortConnectorItems.Append(PortConnectorItem.Create(PortConnector.Create(outPort,inPort)));
  },
  RegisterWidget:function(widget)
  {
   var item;
   item=WorkerItem.Create(widget);
   this.WidgetItems.Append(item);
   this.WorkItems.Append(item);
  },
  RegisterEvent:function(event)
  {
   var item;
   item=WorkerItem.Create(event);
   this.EventItems.Append(item);
   this.WorkItems.Append(item);
  }
 },null,DshData);
 DshData.get_Create=function()
 {
  return DshData.New(ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty),ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty),ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty),ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty));
 };
 DshData.New=function(WorkItems,WidgetItems,EventItems,PortConnectorItems)
 {
  return new DshData({
   WorkItems:WorkItems,
   WidgetItems:WidgetItems,
   EventItems:EventItems,
   PortConnectorItems:PortConnectorItems
  });
 };
 DshEditorCellItem=Dashboard.DshEditorCellItem=Runtime.Class({
  Render:function(data,reconnectFnc)
  {
   var $this,workerSelector,inPorts,outPorts,items;
   $this=this;
   View.Sink(function(optWorker)
   {
    var workerItem;
    if(optWorker==null)
     ;
    else
     {
      workerItem=optWorker.$0;
      console.log("Workitem selected");
      Var.Set($this.OptInPort,List.tryHead(workerItem.Worker.InPorts));
      Var.Set($this.OptOutPort,List.tryHead(workerItem.Worker.OutPorts));
      reconnectFnc();
     }
   },this.OptWorker.v);
   View.Sink(function()
   {
    reconnectFnc();
   },this.OptInPort.v);
   View.Sink(function()
   {
    reconnectFnc();
   },this.OptOutPort.v);
   workerSelector=(inPorts=View.Map(function(workerItemOpt)
   {
    var ports;
    return workerItemOpt==null?List.ofArray([null]):(ports=List.map(function(item)
    {
     return{
      $:1,
      $0:item
     };
    },workerItemOpt.$0.Worker.InPorts),ports.get_Length()>0?ports:List.ofArray([null]));
   },this.OptWorker.v),(outPorts=View.Map(function(workerItemOpt)
   {
    var ports;
    return workerItemOpt==null?List.ofArray([null]):(ports=List.map(function(item)
    {
     return{
      $:1,
      $0:item
     };
    },workerItemOpt.$0.Worker.OutPorts),ports.get_Length()>0?ports:List.ofArray([null]));
   },this.OptWorker.v),(items=View.Map(function(itemSeq)
   {
    return new List.T({
     $:1,
     $0:null,
     $1:List.map(function(item)
     {
      return{
       $:1,
       $0:item
      };
     },List.ofSeq(itemSeq))
    });
   },data.WorkItems.v),Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[],[Doc.SelectDyn([AttrModule.Class("form-control")],function(item)
   {
    return Option.fold(function(a,port)
    {
     return port.Name;
    }," ",item);
   },inPorts,this.OptInPort)]),Doc.Element("td",[],[Doc.SelectDyn([AttrModule.Class("form-control")],function(item)
   {
    return Option.fold(function(a,workerItem)
    {
     return workerItem.Worker.Name.c;
    }," ",item);
   },items,this.OptWorker)]),Doc.Element("td",[],[Doc.SelectDyn([AttrModule.Class("form-control")],function(item)
   {
    return Option.fold(function(a,port)
    {
     return port.Name;
    }," ",item);
   },outPorts,this.OptOutPort)])])]))));
   return Doc.Element("td",[AttrModule.Class("td DshEditorCell")],[Doc.Element("div",[AttrModule.Class("div DshEditorCell")],[Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[],[Helper.IconNormal("add",function()
   {
   })]),Doc.Element("td",[],[workerSelector])])])])]);
  }
 },null,DshEditorCellItem);
 DshEditorCellItem.get_Create=function()
 {
  return DshEditorCellItem.New(Key.Fresh(),Var.Create$1(null),Var.Create$1(null),Var.Create$1(null));
 };
 DshEditorCellItem.New=function(Key$1,OptInPort,OptWorker,OptOutPort)
 {
  return new DshEditorCellItem({
   Key:Key$1,
   OptInPort:OptInPort,
   OptWorker:OptWorker,
   OptOutPort:OptOutPort
  });
 };
 DshEditorRowItem=Dashboard.DshEditorRowItem=Runtime.Class({
  Render:function(data,reconnectFnc)
  {
   var $this;
   $this=this;
   return Doc.Element("tr",[],[Doc.ConvertBy(function(m)
   {
    return m.Key;
   },function(item)
   {
    return item.Render(data,reconnectFnc);
   },this.CellItems.v),Helper.IconNormal("add",function()
   {
    $this.CellItems.Append(DshEditorCellItem.get_Create());
   })]);
  }
 },null,DshEditorRowItem);
 DshEditorRowItem.get_Create=function()
 {
  return DshEditorRowItem.New(Key.Fresh(),ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty));
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
   var $this;
   $this=this;
   return Doc.Element("table",[],[Doc.ConvertBy(function(m)
   {
    return m.Key;
   },function(item)
   {
    return Doc.Element("tr",[],[item.Render(data,function()
    {
     $this.Reconnect(data,void 0);
    })]);
   },this.RowItems.v),Doc.Element("tr",[],[Doc.Element("td",[],[Helper.IconNormal("add",function()
   {
    $this.RowItems.Append(DshEditorRowItem.get_Create());
   })])])]);
  },
  Reconnect:function(data,u)
  {
   Seq.iter(function(item)
   {
    item.PortConnector.Disconnect();
   },data.PortConnectorItems);
   data.PortConnectorItems.Clear();
   List.iter(function(row)
   {
    var cells,i,e;
    cells=List.ofSeq(row.CellItems);
    i=List.ofSeq(Operators.range(1,cells.get_Length()-1));
    e=Enumerator.Get(i);
    try
    {
     while(e.MoveNext())
      (function()
      {
       var i$1,cell1,cell2,o,o$1;
       i$1=e.Current();
       cell1=cells.get_Item(i$1-1);
       cell2=cells.get_Item(i$1);
       o=cell1.OptOutPort.c,o==null?null:{
        $:1,
        $0:(o$1=cell2.OptInPort.c,o$1==null?null:{
         $:1,
         $0:data.ConnectPorts(o.$0,o$1.$0)
        })
       };
      }());
    }
    finally
    {
     if("Dispose"in e)
      e.Dispose();
    }
   },List.ofSeq(this.RowItems));
  }
 },null,DshEditor);
 DshEditor.get_Create=function()
 {
  return DshEditor.New(ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty));
 };
 DshEditor.New=function(RowItems)
 {
  return new DshEditor({
   RowItems:RowItems
  });
 };
 Dashboard$1=Dashboard.Dashboard=Runtime.Class({
  get_Render:function()
  {
   var $this,eventsRender,containers,menu,m,containerDivs,m$1;
   function container(varValue,content)
   {
    var varVis;
    varVis=Var.Create$1(varValue);
    return[varVis,Doc.Element("div",[AttrModule.DynamicStyle("display",View.Map(function(isVisible)
    {
     return isVisible?"initial":"none";
    },varVis.v))],[content])];
   }
   $this=this;
   eventsRender=Doc.Element("table",[],[Doc.ConvertBy(function(m$2)
   {
    return m$2.Key;
   },function(item)
   {
    return Doc.Element("tr",[],[Doc.Element("i",Helper.AttrsClick(function()
    {
     $this.PropertyGrid.Edit(item.Worker.get_Properties());
    }),[Doc.TextView(item.Worker.Name.v)])]);
   },this.Data.EventItems.v)]);
   containers=List.ofArray([["Board",container(true,this.PanelContainer.get_Render())],["Events",container(false,eventsRender)],["Rules",container(false,this.DshEditor.Render(this.Data))]]);
   menu=(m=function(name,a)
   {
    var varVis;
    varVis=a[0];
    return Doc.Element("tr",[],[Doc.Element("td",[AttrModule.DynamicStyle("Color",View.Map(function(isVisible)
    {
     return isVisible?"#FB8C00":"#7D4600";
    },varVis.v)),AttrModule.Style("cursor","pointer"),AttrModule.Handler("click",function()
    {
     return function()
     {
      var a$1;
      $this.PropertyGrid.Edit(List.T.Empty);
      a$1=function(a$2,a$3)
      {
       var varBool;
       varBool=a$3[0];
       !Unchecked.Equals(varBool,varVis)?Var.Set(varBool,false):Var.Set(varBool,true);
      };
      return List.iter(function($1)
      {
       return a$1($1[0],$1[1]);
      },containers);
     };
    })],[Doc.TextNode(name)])]);
   },List.map(function($1)
   {
    return m($1[0],$1[1]);
   },containers));
   containerDivs=(m$1=function(a,a$1)
   {
    return a$1[1];
   },List.map(function($1)
   {
    return m$1($1[0],$1[1]);
   },containers));
   return Doc.Element("div",[],[Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[AttrModule.Style("vertical-align","top")],[Doc.Element("table",[],Seq.concat([List.ofArray([Doc.Element("tr",[],[Doc.Element("td",[],[Helper.IconNormal("dehaze",function()
   {
   })])]),Doc.Element("tr",[],[Doc.Element("td",[],[Helper.IconNormal("add",function()
   {
    var varBoolDash,items,selected;
    varBoolDash=(containers.get_Item(0))[1][0];
    (containers.get_Item(1))[1][0].c?(items=List.ofSeq($this.Factory.EventItems),selected=Var.Create$1(List.head(items)),$this.Dialog.ShowDialog("Select source",Doc.Element("div",[],[Doc.Select([AttrModule.Class("form-control")],function(item)
    {
     return item.Worker.Name.c;
    },items,selected)]),function()
    {
     $this.Data.RegisterEvent(selected.c.Worker.get_CloneAndRun());
    })):varBoolDash.c?$this.CreatePanel("Panel",700,{
     $:1,
     $0:function()
     {
     }
    }):void 0;
   })])]),Doc.Element("tr",[],[Doc.Element("td",[],[])]),Doc.Element("tr",[],[Doc.Element("td",[],[this.PropertyGrid.get_Render()])])]),menu]))]),Doc.Element("td",[],containerDivs)])]),Doc.Element("div",[],[this.Dialog.get_Render()])]);
  },
  CreatePanel:function(name,cx,afterRenderFnc)
  {
   var $this,childContainerContent;
   $this=this;
   Doc.ConvertBy(this.Data.WidgetItems.key,function(item)
   {
    return Doc.Element("div",[],[Doc.TextView(item.Worker.Name.v)]);
   },this.Factory.WidgetItems.v);
   childContainerContent=PanelContainer.get_Create().WithLayoutManager(LayoutManagers.StackPanelLayoutManager()).WithAttributes([AttrModule.Style("border","1px solid white"),AttrModule.Style("display","flex")]);
   this.PanelContainer.AddPanel(Panel$1.get_Create().WithPannelAttrs([AttrModule.Style("Width",window.String(cx)+"px"),AttrModule.Style("position","absolute")]).WithTitleContent(Doc.TextNode(name)).WithTitleButtons(List.ofArray([TitleButton.New("add",function(panel)
   {
    var items,selected;
    items=List.ofSeq($this.Factory.WidgetItems);
    selected=Var.Create$1(List.head(items));
    $this.Dialog.ShowDialog("Select widget",Doc.Element("div",[],[Doc.Select([AttrModule.Class("form-control")],function(item)
    {
     return item.Worker.Name.c;
    },items,selected)]),function()
    {
     console.log("Dialog.IsOK");
     $this.RegisterWidget(panel.Children,selected.c.Worker.get_CloneAndRun());
    });
   }),TitleButton.New("edit",function(panel)
   {
    console.log("Edit");
    panel.EditProperties($this.PropertyGrid);
   }),TitleButton.New("clear",function(panel)
   {
    $this.PanelContainer.PanelItems.Remove($this.PanelContainer.FindPanelItem(panel));
   })])).WithChildPanelContainer(childContainerContent).WithOnAfterRender(afterRenderFnc==null?function()
   {
   }:afterRenderFnc.$0));
   return childContainerContent;
  },
  RegisterWidget:function(toPanelContainer,worker)
  {
   this.Data.RegisterWidget(worker);
   toPanelContainer.AddPanel(Panel$1.get_Create().WithTitle(false).WithPanelContent(worker.get_Render()));
  }
 },null,Dashboard$1);
 Dashboard$1.Create=function(panelContainer)
 {
  var dialog;
  dialog=Dialog.get_Create();
  return Dashboard$1.New(Factory.get_Create(),DshData.get_Create(),panelContainer,DshEditor.get_Create(),PropertyGrid$1.get_Create(),dialog);
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
