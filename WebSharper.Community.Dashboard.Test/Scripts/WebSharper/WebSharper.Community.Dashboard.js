(function()
{
 "use strict";
 var Global,WebSharper,Community,Dashboard,MessageBus,Role,Value,Message,ListenerInfo,AgentMessage,AgentState,SC$1,InPort,OutPortType,OutPort,Ports,Worker,Workers,RandomRunner,OpenWeather,Forecast,OpenWeatherRunner,DatabaseRunner,ChartRunnerContext,ChartRenderer,TextBoxRenderer,ButtonRenderer,RuleEntry,RuleChain,RuleContainer,WorkerItem,Factory,SelectorItem,SelectorGroup,WindowSelector,RulesCellItem,RulesRowItem,WidgetItem,EventsGroupItem,WidgetsGroupItem,RulesGroupItem,DshData,EventsEditor,RulesEditor,DshHelper,Dashboard$1,AppModelLib,App,SC$2,IntelliFactory,Runtime,Operators,Panel,Helper,Date,List,Concurrency,Remoting,AjaxRemotingProvider,Control,MailboxProcessor,Seq,PrintfHelpers,UI,Next,Var,PropertyGrid,Properties,Guid,Unchecked,Doc,Random,Math,console,Data,TxtRuntime,FSharp,Data$1,Runtime$1,IO,JSON,Arrays,View,Charting,Renderers,ChartJs,Chart,Pervasives,AttrModule,Enumerator,Key,ListModel,Option,PanelContainer,LayoutManagers,Panel$1,TitleButton,Dialog,PropertyGrid$1;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 MessageBus=Dashboard.MessageBus=Dashboard.MessageBus||{};
 Role=MessageBus.Role=MessageBus.Role||{};
 Value=MessageBus.Value=MessageBus.Value||{};
 Message=MessageBus.Message=MessageBus.Message||{};
 ListenerInfo=MessageBus.ListenerInfo=MessageBus.ListenerInfo||{};
 AgentMessage=MessageBus.AgentMessage=MessageBus.AgentMessage||{};
 AgentState=MessageBus.AgentState=MessageBus.AgentState||{};
 SC$1=Global.StartupCode$WebSharper_Community_Dashboard$MessageBus=Global.StartupCode$WebSharper_Community_Dashboard$MessageBus||{};
 InPort=Dashboard.InPort=Dashboard.InPort||{};
 OutPortType=Dashboard.OutPortType=Dashboard.OutPortType||{};
 OutPort=Dashboard.OutPort=Dashboard.OutPort||{};
 Ports=Dashboard.Ports=Dashboard.Ports||{};
 Worker=Dashboard.Worker=Dashboard.Worker||{};
 Workers=Dashboard.Workers=Dashboard.Workers||{};
 RandomRunner=Dashboard.RandomRunner=Dashboard.RandomRunner||{};
 OpenWeather=Dashboard.OpenWeather=Dashboard.OpenWeather||{};
 Forecast=OpenWeather.Forecast=OpenWeather.Forecast||{};
 OpenWeatherRunner=Dashboard.OpenWeatherRunner=Dashboard.OpenWeatherRunner||{};
 DatabaseRunner=Dashboard.DatabaseRunner=Dashboard.DatabaseRunner||{};
 ChartRunnerContext=Dashboard.ChartRunnerContext=Dashboard.ChartRunnerContext||{};
 ChartRenderer=Dashboard.ChartRenderer=Dashboard.ChartRenderer||{};
 TextBoxRenderer=Dashboard.TextBoxRenderer=Dashboard.TextBoxRenderer||{};
 ButtonRenderer=Dashboard.ButtonRenderer=Dashboard.ButtonRenderer||{};
 RuleEntry=Dashboard.RuleEntry=Dashboard.RuleEntry||{};
 RuleChain=Dashboard.RuleChain=Dashboard.RuleChain||{};
 RuleContainer=Dashboard.RuleContainer=Dashboard.RuleContainer||{};
 WorkerItem=Dashboard.WorkerItem=Dashboard.WorkerItem||{};
 Factory=Dashboard.Factory=Dashboard.Factory||{};
 SelectorItem=Dashboard.SelectorItem=Dashboard.SelectorItem||{};
 SelectorGroup=Dashboard.SelectorGroup=Dashboard.SelectorGroup||{};
 WindowSelector=Dashboard.WindowSelector=Dashboard.WindowSelector||{};
 RulesCellItem=Dashboard.RulesCellItem=Dashboard.RulesCellItem||{};
 RulesRowItem=Dashboard.RulesRowItem=Dashboard.RulesRowItem||{};
 WidgetItem=Dashboard.WidgetItem=Dashboard.WidgetItem||{};
 EventsGroupItem=Dashboard.EventsGroupItem=Dashboard.EventsGroupItem||{};
 WidgetsGroupItem=Dashboard.WidgetsGroupItem=Dashboard.WidgetsGroupItem||{};
 RulesGroupItem=Dashboard.RulesGroupItem=Dashboard.RulesGroupItem||{};
 DshData=Dashboard.DshData=Dashboard.DshData||{};
 EventsEditor=Dashboard.EventsEditor=Dashboard.EventsEditor||{};
 RulesEditor=Dashboard.RulesEditor=Dashboard.RulesEditor||{};
 DshHelper=Dashboard.DshHelper=Dashboard.DshHelper||{};
 Dashboard$1=Dashboard.Dashboard=Dashboard.Dashboard||{};
 AppModelLib=Dashboard.AppModelLib=Dashboard.AppModelLib||{};
 App=Dashboard.App=Dashboard.App||{};
 SC$2=Global.StartupCode$WebSharper_Community_Dashboard$AppModelLib=Global.StartupCode$WebSharper_Community_Dashboard$AppModelLib||{};
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Operators=WebSharper&&WebSharper.Operators;
 Panel=Community&&Community.Panel;
 Helper=Panel&&Panel.Helper;
 Date=Global.Date;
 List=WebSharper&&WebSharper.List;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 Control=WebSharper&&WebSharper.Control;
 MailboxProcessor=Control&&Control.MailboxProcessor;
 Seq=WebSharper&&WebSharper.Seq;
 PrintfHelpers=WebSharper&&WebSharper.PrintfHelpers;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Var=Next&&Next.Var;
 PropertyGrid=Community&&Community.PropertyGrid;
 Properties=PropertyGrid&&PropertyGrid.Properties;
 Guid=WebSharper&&WebSharper.Guid;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Doc=Next&&Next.Doc;
 Random=WebSharper&&WebSharper.Random;
 Math=Global.Math;
 console=Global.console;
 Data=WebSharper&&WebSharper.Data;
 TxtRuntime=Data&&Data.TxtRuntime;
 FSharp=Global.FSharp;
 Data$1=FSharp&&FSharp.Data;
 Runtime$1=Data$1&&Data$1.Runtime;
 IO=Runtime$1&&Runtime$1.IO;
 JSON=Global.JSON;
 Arrays=WebSharper&&WebSharper.Arrays;
 View=Next&&Next.View;
 Charting=WebSharper&&WebSharper.Charting;
 Renderers=Charting&&Charting.Renderers;
 ChartJs=Renderers&&Renderers.ChartJs;
 Chart=Charting&&Charting.Chart;
 Pervasives=Charting&&Charting.Pervasives;
 AttrModule=Next&&Next.AttrModule;
 Enumerator=WebSharper&&WebSharper.Enumerator;
 Key=Next&&Next.Key;
 ListModel=Next&&Next.ListModel;
 Option=WebSharper&&WebSharper.Option;
 PanelContainer=Panel&&Panel.PanelContainer;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 Panel$1=Panel&&Panel.Panel;
 TitleButton=Panel&&Panel.TitleButton;
 Dialog=Panel&&Panel.Dialog;
 PropertyGrid$1=PropertyGrid&&PropertyGrid.PropertyGrid;
 Role.Server={
  $:1
 };
 Role.Client={
  $:0
 };
 Value=MessageBus.Value=Runtime.Class({
  get_AsNumber:function()
  {
   return this.$==0?this.$0:Operators.FailWith("MessageBus.Value: unexpected type");
  }
 },null,Value);
 Message.Create=function(value)
 {
  return Message.New(Helper.UniqueKey(),Date.now(),value);
 };
 Message.New=function(Key$1,Time,Value$1)
 {
  return{
   Key:Key$1,
   Time:Time,
   Value:Value$1
  };
 };
 ListenerInfo.Create=function(key,name,cacheSize)
 {
  return ListenerInfo.New(key,name,cacheSize);
 };
 ListenerInfo.New=function(Key$1,Name,CacheSize)
 {
  return{
   Key:Key$1,
   Name:Name,
   CacheSize:CacheSize
  };
 };
 AgentMessage.Clear={
  $:4
 };
 AgentState.get_empty=function()
 {
  return AgentState.New(null,List.T.Empty);
 };
 AgentState.New=function(ServerCallback,Listeners)
 {
  return{
   ServerCallback:ServerCallback,
   Listeners:Listeners
  };
 };
 MessageBus.RunServerRequests=function()
 {
  var b;
  Concurrency.Start((b=null,Concurrency.Delay(function()
  {
   return Concurrency.While(function()
   {
    return true;
   },Concurrency.Delay(function()
   {
    return Concurrency.Bind(Concurrency.Sleep(2*1000),function()
    {
     return Concurrency.Bind(MessageBus.Agent().PostAndAsyncReply(function(r)
     {
      return{
       $:6,
       $0:r
      };
     },null),function(a)
     {
      return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("WebSharper.Community.Dashboard:WebSharper.Community.Dashboard.MessageBus.GetMessages:1550733476",[a]),function(a$1)
      {
       List.iter(function(message)
       {
        var _this;
        _this=MessageBus.Agent();
        _this.mailbox.AddLast({
         $:1,
         $0:message
        });
        _this.resume();
       },a$1);
       (MessageBus.Log())((function($1)
       {
        return function($2)
        {
         return $1("Values from server requested messages received:"+Global.String($2));
        };
       }(Global.id))(a$1.get_Length()));
       return Concurrency.Zero();
      });
     });
    });
   }));
  })),null);
 };
 MessageBus.Agent=function()
 {
  SC$1.$cctor();
  return SC$1.Agent;
 };
 MessageBus.CreateString=function(value)
 {
  return MessageBus.CreateStrPair(Helper.UniqueKey(),value);
 };
 MessageBus.CreateNumber=function(value)
 {
  return MessageBus.CreateNumPair(Helper.UniqueKey(),value);
 };
 MessageBus.CreateBooleanPair=function(key,value)
 {
  return MessageBus.CreateKeyValue(key,new Value({
   $:2,
   $0:value
  }));
 };
 MessageBus.CreateStrPair=function(key,value)
 {
  return MessageBus.CreateKeyValue(key,new Value({
   $:1,
   $0:value
  }));
 };
 MessageBus.CreateNumPair=function(key,value)
 {
  return MessageBus.CreateKeyValue(key,new Value({
   $:0,
   $0:value
  }));
 };
 MessageBus.CreateKeyValue=function(key,value)
 {
  return Message.New(key,Date.now(),value);
 };
 MessageBus.Log=function()
 {
  SC$1.$cctor();
  return SC$1.Log;
 };
 MessageBus.set_Log=function($1)
 {
  SC$1.$cctor();
  SC$1.Log=$1;
 };
 MessageBus.Role$1=function()
 {
  SC$1.$cctor();
  return SC$1.Role;
 };
 MessageBus.set_Role=function($1)
 {
  SC$1.$cctor();
  SC$1.Role=$1;
 };
 SC$1.$cctor=Runtime.Cctor(function()
 {
  SC$1.Role=Role.Server;
  SC$1.Log=Global.ignore;
  SC$1.Agent=MailboxProcessor.Start(function(inbox)
  {
   function cutBuffer(time,buffer)
   {
    return Seq.fold(function(acc,item)
    {
     return item.Time>=time?new List.T({
      $:1,
      $0:item,
      $1:acc
     }):acc;
    },List.T.Empty,buffer);
   }
   function split(maxSize,buffer)
   {
    return maxSize<buffer.get_Length()?(List.splitAt(maxSize,buffer))[0]:buffer;
   }
   function update_and_split(maxSize,buffer,value)
   {
    return maxSize===1?List.ofArray([value]):split(maxSize,new List.T({
     $:1,
     $0:value,
     $1:buffer
    }));
   }
   function send_to_listeners(message,listeners)
   {
    function m(info,callback,buf)
    {
     var listener;
     listener=Global.Array.prototype.slice.call(arguments);
     return info.Key===message.Key?(callback(message),[info,callback,update_and_split(info.CacheSize,buf,message)]):listener;
    }
    return List.map(function($1)
    {
     return m($1[0],$1[1],$1[2]);
    },listeners);
   }
   function loop(state)
   {
    var b;
    b=null;
    return Concurrency.Delay(function()
    {
     return Concurrency.Bind(inbox.Receive(null),function(a)
     {
      var listenerInfo,time,maxTimes,busKeyValue,o;
      function m(info,a$1,buffer)
      {
       return cutBuffer(time,buffer);
      }
      function m$1(info,a$1,buffer)
      {
       return buffer.$==0?(new Date(0,0-1,0)).getTime():List.maxBy(function(item)
       {
        return item.Time;
       },buffer).Time;
      }
      return a.$==2?(listenerInfo=a.$0[0],((MessageBus.Log())((function($1)
      {
       return function($2)
       {
        return $1("RegisterListener:"+PrintfHelpers.toSafe($2));
       };
      }(Global.id))(listenerInfo.Name)),loop(AgentState.New(state.ServerCallback,new List.T({
       $:1,
       $0:[listenerInfo,a.$0[2],List.T.Empty],
       $1:state.Listeners
      }))))):a.$==3?loop(AgentState.New({
       $:1,
       $0:a.$0
      },state.Listeners)):a.$==5?(time=a.$0[0],(a.$0[1](Seq.fold(function(acc,state$1)
      {
       return!List.contains(state$1,acc)?new List.T({
        $:1,
        $0:state$1,
        $1:acc
       }):acc;
      },List.T.Empty,List.concat(List.map(function($1)
      {
       return m($1[0],$1[1],$1[2]);
      },state.Listeners)))),loop(state))):a.$==6?(maxTimes=List.map(function($1)
      {
       return m$1($1[0],$1[1],$1[2]);
      },state.Listeners),(a.$0(maxTimes.$==0?(new Date(0,0-1,0)).getTime():List.max(maxTimes)),loop(state))):a.$==1?loop(AgentState.New(state.ServerCallback,send_to_listeners(a.$0,state.Listeners))):a.$==0?(busKeyValue=a.$0,(o=state.ServerCallback,o==null?void 0:o.$0(busKeyValue),loop(AgentState.New(state.ServerCallback,send_to_listeners(busKeyValue,state.Listeners))))):loop(AgentState.get_empty());
     });
    });
   }
   return loop(AgentState.get_empty());
  },null);
  SC$1.$cctor=Global.ignore;
 });
 InPort=Dashboard.InPort=Runtime.Class({
  Equals:function(y)
  {
   return y instanceof InPort&&this.Name===y.Name;
  },
  get_BooleanValue:function()
  {
   var $this;
   $this=this;
   return this.ExtractPortBooleanValue(function(variable)
   {
    return MessageBus.CreateBooleanPair($this.Key,variable.c);
   });
  },
  get_BooleanVar:function()
  {
   return this.ExtractPortBooleanValue(Global.id);
  },
  get_Boolean:function()
  {
   return this.ExtractPortBooleanValue(function(variable)
   {
    return variable.c;
   });
  },
  ExtractPortBooleanValue:function(fnc)
  {
   var m;
   m=this.PortValue;
   return m.$==2?fnc(m.$0[1]):Operators.FailWith("unexpected type");
  },
  get_StringValue:function()
  {
   var $this;
   $this=this;
   return this.ExtractPortStringValue(function(variable)
   {
    return MessageBus.CreateStrPair($this.Key,variable.c);
   });
  },
  get_StringVar:function()
  {
   return this.ExtractPortStringValue(Global.id);
  },
  get_String:function()
  {
   return this.ExtractPortStringValue(function(variable)
   {
    return variable.c;
   });
  },
  ExtractPortStringValue:function(fnc)
  {
   var m;
   m=this.PortValue;
   return m.$==1?fnc(m.$0[1]):Operators.FailWith("unexpected type");
  },
  get_NumberValue:function()
  {
   var $this;
   $this=this;
   return this.ExtractPortNumberValue(function(variable)
   {
    return MessageBus.CreateNumPair($this.Key,variable.c);
   });
  },
  get_NumberVar:function()
  {
   return this.ExtractPortNumberValue(Global.id);
  },
  get_Number:function()
  {
   return this.ExtractPortNumberValue(function(variable)
   {
    return variable.c;
   });
  },
  ExtractPortNumberValue:function(fnc)
  {
   var m;
   m=this.PortValue;
   return m.$==0?fnc(m.$0[1]):Operators.FailWith("unexpected type");
  },
  Receive:function(value)
  {
   var m,m$1,m$2,m$3;
   m=this.PortValue;
   m.$==1?(m$1=value.Value,m$1.$==1?Var.Set(m.$0[1],m$1.$0):Operators.FailWith("incompatible types")):m.$==2?(m$2=value.Value,m$2.$==2?Var.Set(m.$0[1],m$2.$0):Operators.FailWith("incompatible types")):(m$3=value.Value,m$3.$==0?Var.Set(m.$0[1],m$3.$0):Operators.FailWith("incompatible types"));
  },
  get_KeyValueVar:function()
  {
   var m;
   m=this.PortValue;
   return m.$==1?m.$0[0]:m.$==2?m.$0[0]:m.$0[0];
  },
  get_Property:function()
  {
   var m;
   m=this.PortValue;
   return m.$==1?Properties.string(this.Name,m.$0[1]):m.$==2?Properties.check(this.Name,m.$0[1]):Properties["double"](this.Name,m.$0[1]);
  },
  get_Clone:function()
  {
   var c,m;
   return InPort.New((c=Guid.NewGuid(),Global.String(c)),this.Name,(m=this.PortValue,m.$==1?{
    $:1,
    $0:[Var.Create$1(m.$0[0].c),Var.Create$1(m.$0[1].c)]
   }:m.$==2?{
    $:2,
    $0:[Var.Create$1(m.$0[0].c),Var.Create$1(m.$0[1].c)]
   }:{
    $:0,
    $0:[Var.Create$1(m.$0[0].c),Var.Create$1(m.$0[1].c)]
   }),this.CacheSize);
  }
 },null,InPort);
 InPort.Create=function(key,name,portValue,cacheSize)
 {
  return InPort.New(key,name,portValue,cacheSize);
 };
 InPort.New=function(Key$1,Name,PortValue,CacheSize)
 {
  return new InPort({
   Key:Key$1,
   Name:Name,
   PortValue:PortValue,
   CacheSize:CacheSize
  });
 };
 OutPortType=Dashboard.OutPortType=Runtime.Class({
  IsCompatible:function(inPort)
  {
   return this.$==1?inPort.PortValue.$==1&&true:this.$==2?inPort.PortValue.$==2&&true:inPort.PortValue.$==0&&true;
  }
 },null,OutPortType);
 OutPortType.BooleanOutPort=new OutPortType({
  $:2
 });
 OutPortType.StringOutPort=new OutPortType({
  $:1
 });
 OutPortType.NumberOutPort=new OutPortType({
  $:0
 });
 OutPort=Dashboard.OutPort=Runtime.Class({
  Equals:function(y)
  {
   return y instanceof OutPort&&this.Name===y.Name;
  },
  TriggerWithKey:function(value)
  {
   var _this;
   _this=MessageBus.Agent();
   _this.mailbox.AddLast({
    $:0,
    $0:value
   });
   _this.resume();
  },
  Trigger:function(value)
  {
   var _this;
   _this=MessageBus.Agent();
   _this.mailbox.AddLast({
    $:0,
    $0:MessageBus.CreateKeyValue(this.Key,value)
   });
   _this.resume();
  },
  get_Clone:function()
  {
   return OutPort.New(Helper.UniqueKey(),this.Name,this.Type);
  }
 },null,OutPort);
 OutPort.CreateString=function(key,name)
 {
  return OutPort.Create(key,name,OutPortType.StringOutPort);
 };
 OutPort.CreateNumber=function(key,name)
 {
  return OutPort.Create(key,name,OutPortType.NumberOutPort);
 };
 OutPort.Create=function(key,name,portType)
 {
  return OutPort.New(key,name,portType);
 };
 OutPort.New=function(Key$1,Name,Type)
 {
  return new OutPort({
   Key:Key$1,
   Name:Name,
   Type:Type
  });
 };
 Ports.Create=function(info)
 {
  function m(name,value)
  {
   return[name,value,1];
  }
  return Ports.CreateWithCache(List.map(function($1)
  {
   return m($1[0],$1[1]);
  },info));
 };
 Ports.CreateWithCache=function(info)
 {
  function m(name,pair,cacheSize)
  {
   var m$1,value,value$1,value$2;
   m$1=pair.Value;
   return m$1.$==1?(value=m$1.$0,InPort.Create(pair.Key,name,{
    $:1,
    $0:[Var.Create$1(Message.Create(new Value({
     $:1,
     $0:value
    }))),Var.Create$1(value)]
   },cacheSize)):m$1.$==2?(value$1=m$1.$0,InPort.Create(pair.Key,name,{
    $:2,
    $0:[Var.Create$1(Message.Create(new Value({
     $:2,
     $0:value$1
    }))),Var.Create$1(value$1)]
   },cacheSize)):(value$2=m$1.$0,InPort.Create(pair.Key,name,{
    $:0,
    $0:[Var.Create$1(Message.Create(new Value({
     $:0,
     $0:value$2
    }))),Var.Create$1(value$2)]
   },cacheSize));
  }
  return List.map(function($1)
  {
   return m($1[0],$1[1],$1[2]);
  },info);
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
   var varName,iPorts,oPorts;
   varName=Var.Create$1(this.Name.c);
   iPorts=List.map(function(port)
   {
    return port.get_Clone();
   },this.InPorts);
   oPorts=List.map(function(port)
   {
    return port.get_Clone();
   },this.OutPorts);
   return Worker.New(Helper.UniqueKey(),varName,iPorts,oPorts,this.Runner,this.Renderer,this.DataContext,null).WithStartRunner();
  },
  WithStartRunner:function()
  {
   var m;
   m=this.Runner;
   return m==null?this:Worker.New(this.Key,this.Name,this.InPorts,this.OutPorts,this.Runner,this.Renderer,this.DataContext,(m.$0.WebSharper_Community_Dashboard_IRunner$get_Run())(this));
  },
  WithRenderer:function(renderer)
  {
   return Worker.New(this.Key,this.Name,this.InPorts,this.OutPorts,this.Runner,{
    $:1,
    $0:renderer
   },this.DataContext,this.RunnerContext);
  },
  WithRunner:function(runner)
  {
   return Worker.New(this.Key,this.Name,this.InPorts,this.OutPorts,{
    $:1,
    $0:runner
   },this.Renderer,this.DataContext,this.RunnerContext);
  },
  WithKey:function(key)
  {
   return Worker.New(key,this.Name,this.InPorts,this.OutPorts,this.Runner,this.Renderer,this.DataContext,this.RunnerContext);
  }
 },null,Worker);
 Worker.CreateWithRenderer=function(src)
 {
  return Worker.Create(src).WithRenderer(src);
 };
 Worker.CreateWithRunner=function(src)
 {
  return Worker.Create(src).WithRunner(src);
 };
 Worker.Create=function(dataContext)
 {
  return Worker.New(Helper.UniqueKey(),Var.Create$1(dataContext.WebSharper_Community_Dashboard_IWorkerContext$get_Name()),dataContext.WebSharper_Community_Dashboard_IWorkerContext$get_InPorts(),dataContext.WebSharper_Community_Dashboard_IWorkerContext$get_OutPorts(),null,null,dataContext,null);
 };
 Worker.New=function(Key$1,Name,InPorts,OutPorts,Runner,Renderer,DataContext,RunnerContext)
 {
  return new Worker({
   Key:Key$1,
   Name:Name,
   InPorts:InPorts,
   OutPorts:OutPorts,
   Runner:Runner,
   Renderer:Renderer,
   DataContext:DataContext,
   RunnerContext:RunnerContext
  });
 };
 Workers.allInPorts=function(workers)
 {
  return Workers.allPorts(workers,function(worker)
  {
   return worker.InPorts;
  });
 };
 Workers.allOutPorts=function(workers)
 {
  return Workers.allPorts(workers,function(worker)
  {
   return worker.OutPorts;
  });
 };
 Workers.allPorts=function(workers,fnc)
 {
  return List.concat(List.map(fnc,workers));
 };
 RandomRunner=Dashboard.RandomRunner=Runtime.Class({
  WithMiddleValue:function(value)
  {
   return RandomRunner.New(this.Name,MessageBus.CreateNumber(value),this.Dispersion,this.OutPortKey);
  },
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
       disper=worker.InPorts.get_Item(1).get_Number();
       middle=worker.InPorts.get_Item(0).get_Number();
       d=Math.random()*disper+middle;
       worker.OutPorts.get_Item(0).Trigger(new Value({
        $:0,
        $0:d
       }));
       return Concurrency.Zero();
      });
     }));
    })),null);
    return null;
   };
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_OutPorts:function()
  {
   return List.ofArray([OutPort.CreateNumber(this.OutPortKey,"Random value")]);
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_InPorts:function()
  {
   return Ports.Create(List.ofArray([["Middle value",this.MiddleValue],["Dispersion",this.Dispersion]]));
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_Name:function()
  {
   return this.Name;
  }
 },null,RandomRunner);
 RandomRunner.get_FromPorts=function()
 {
  return function(worker)
  {
   return RandomRunner.New(worker.Name.c,worker.InPorts.get_Item(0).get_NumberValue(),worker.InPorts.get_Item(1).get_NumberValue(),worker.OutPorts.get_Item(0).Key);
  };
 };
 RandomRunner.Create=function(middleValue,dispersion)
 {
  return RandomRunner.New("Random",MessageBus.CreateNumber(middleValue),MessageBus.CreateNumber(dispersion),Helper.UniqueKey());
 };
 RandomRunner.New=function(Name,MiddleValue,Dispersion,OutPortKey)
 {
  return new RandomRunner({
   Name:Name,
   MiddleValue:MiddleValue,
   Dispersion:Dispersion,
   OutPortKey:OutPortKey
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
   }))(Global.id))(city))(key);
   console.log("get key city "+request);
   return Concurrency.TryWith(Concurrency.Delay(function()
   {
    return Concurrency.Bind(TxtRuntime.AsyncMap(IO.asyncReadTextAtRuntime(false,"C:\\AEAFrame\\WebSharper.Community.Dashboard\\WebSharper.Community.Dashboard","","JSON","",request),function(t)
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
      }))(Global.id))((opt=(prop="name",prop in a?{
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
      }(Global.id))((opt$3=(prop$3="icon",prop$3 in head?{
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
      return Concurrency.Bind(OpenWeather.get(inApiKey.get_String(),inCity.get_String()),function(a)
      {
       return Concurrency.Combine(a==null?Concurrency.Zero():(console.log("Value generated:"+a.$0.Title),outTempearatur.Trigger(new Value({
        $:0,
        $0:+a.$0.Temperature
       })),Concurrency.Zero()),Concurrency.Delay(function()
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
   return List.ofArray([OutPort.CreateNumber(this.OutPortKey,"Temperature")]);
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_InPorts:function()
  {
   return Ports.Create(List.ofArray([["City",this.OpenWeatherCity],["ApiKey",this.OpenWeatherApiKey]]));
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_Name:function()
  {
   return this.Name;
  }
 },null,OpenWeatherRunner);
 OpenWeatherRunner.get_FromPorts=function()
 {
  return function(worker)
  {
   return OpenWeatherRunner.New(worker.Name.c,worker.InPorts.get_Item(0).get_StringValue(),worker.InPorts.get_Item(1).get_StringValue(),worker.OutPorts.get_Item(0).Key);
  };
 };
 OpenWeatherRunner.Create=function(city,apikey)
 {
  var c;
  return OpenWeatherRunner.New("OpenWeatherMap",MessageBus.CreateString(city),MessageBus.CreateString(apikey),(c=Guid.NewGuid(),Global.String(c)));
 };
 OpenWeatherRunner.New=function(Name,OpenWeatherCity,OpenWeatherApiKey,OutPortKey)
 {
  return new OpenWeatherRunner({
   Name:Name,
   OpenWeatherCity:OpenWeatherCity,
   OpenWeatherApiKey:OpenWeatherApiKey,
   OutPortKey:OutPortKey
  });
 };
 DatabaseRunner=Dashboard.DatabaseRunner=Runtime.Class({
  WebSharper_Community_Dashboard_IRunner$get_Run:function()
  {
   return function(worker)
   {
    View.Sink(function(value)
    {
     var text;
     text=((((Runtime.Curried(function($1,$2,$3,$4)
     {
      return $1(PrintfHelpers.toSafe($2)+" "+PrintfHelpers.toSafe($3)+" "+$4.toFixed(6));
     },4))(Global.id))(value.Key))(Global.String(value.Time)))(value.Value.get_AsNumber());
     (new AjaxRemotingProvider.New()).Send("WebSharper.Community.Dashboard:WebSharper.Community.Dashboard.ServerDatabase.WriteLine:2078881569",[worker.InPorts.get_Item(1).get_String(),text]);
     worker.OutPorts.get_Item(0).TriggerWithKey(value);
    },worker.InPorts.get_Item(0).get_KeyValueVar().v);
    return null;
   };
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_OutPorts:function()
  {
   return List.ofArray([OutPort.CreateNumber(this.OutPortKey,"Number value")]);
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_InPorts:function()
  {
   return Ports.Create(List.ofArray([[" in Value",this.InValue],["Database name",this.DatabaseName]]));
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_Name:function()
  {
   return this.Name;
  }
 },null,DatabaseRunner);
 DatabaseRunner.get_FromPorts=function()
 {
  return function(worker)
  {
   var I;
   I=worker.InPorts.get_Item(0).get_NumberValue();
   return DatabaseRunner.New(worker.Name.c,worker.InPorts.get_Item(1).get_StringValue(),I,worker.OutPorts.get_Item(0).Key);
  };
 };
 DatabaseRunner.get_Create=function()
 {
  return DatabaseRunner.New("Database",MessageBus.CreateString("Database.txt"),MessageBus.CreateNumber(0),Helper.UniqueKey());
 };
 DatabaseRunner.New=function(Name,DatabaseName,InValue,OutPortKey)
 {
  return new DatabaseRunner({
   Name:Name,
   DatabaseName:DatabaseName,
   InValue:InValue,
   OutPortKey:OutPortKey
  });
 };
 ChartRunnerContext.New=function(LineChart,Queue)
 {
  return{
   LineChart:LineChart,
   Queue:Queue
  };
 };
 ChartRenderer=Dashboard.ChartRenderer=Runtime.Class({
  WebSharper_Community_Dashboard_IRenderer$get_Render:function()
  {
   return function(worker)
   {
    var chartBufferSize,context,r,r$1,r$2,r$3,r$4,r$5;
    chartBufferSize=worker.InPorts.get_Item(3).get_Number()<<0;
    context=worker.RunnerContext.$0;
    View.Sink(function(value)
    {
     context.Queue.push(value);
     context.Queue.length>chartBufferSize?context.Queue.shift():void 0;
     Seq.iteri(function(ind,entry)
     {
      return context.LineChart.__UpdateData(ind,function()
      {
       return entry;
      });
     },context.Queue);
    },worker.InPorts.get_Item(0).get_NumberVar().v);
    return ChartJs.Render$8(worker.RunnerContext.$0.LineChart,{
     $:1,
     $0:{
      $:0,
      $0:worker.InPorts.get_Item(1).get_Number()<<0,
      $1:worker.InPorts.get_Item(2).get_Number()<<0
     }
    },{
     $:1,
     $0:(r={},r.title=(r$1={},r$1.display=false,r$1),r.legend=(r$2={},r$2.display=false,r$2),r.elements=(r$3={},r$3.point=(r$4={},r$4.radius=0,r$4),r$3.line=(r$5={},r$5.borderWidth=1,r$5),r$3),r)
    },null);
   };
  },
  WebSharper_Community_Dashboard_IRunner$get_Run:function()
  {
   return function(worker)
   {
    var chartBufferSize,data,values,queue;
    chartBufferSize=worker.InPorts.get_Item(3).get_Number()<<0;
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
    return{
     $:1,
     $0:ChartRunnerContext.New(Chart.Line(data).WithFill(false).__WithStrokeColor(new Pervasives.Color({
      $:1,
      $0:"#FB8C00"
     })).__WithPointColor(new Pervasives.Color({
      $:2,
      $0:"black"
     })),values)
    };
   };
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_OutPorts:function()
  {
   return List.T.Empty;
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_InPorts:function()
  {
   return Ports.CreateWithCache(List.ofArray([[" in Value",this.Number,this.ChartBufferSize.Value.get_AsNumber()<<0],["cx",this.Cx,1],["cy",this.Cy,1],["BufferSize",this.ChartBufferSize,1]]));
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_Name:function()
  {
   return this.Name;
  }
 },null,ChartRenderer);
 ChartRenderer.get_FromPorts=function()
 {
  return function(worker)
  {
   return ChartRenderer.New(worker.Name.c,worker.InPorts.get_Item(0).get_NumberValue(),worker.InPorts.get_Item(1).get_NumberValue(),worker.InPorts.get_Item(2).get_NumberValue(),worker.InPorts.get_Item(3).get_NumberValue());
  };
 };
 ChartRenderer.Create=function(cx,cy,bufferSize)
 {
  return ChartRenderer.New("Chart",MessageBus.CreateNumber(0),MessageBus.CreateNumber(cx),MessageBus.CreateNumber(cy),MessageBus.CreateNumber(bufferSize));
 };
 ChartRenderer.New=function(Name,Number,Cx,Cy,ChartBufferSize)
 {
  return new ChartRenderer({
   Name:Name,
   Number:Number,
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
     return Global.String(c);
    },worker.InPorts.get_Item(0).get_NumberVar().v);
    return Doc.Element("div",[AttrModule.Class("bigvalue")],[Doc.TextView(strView)]);
   };
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_OutPorts:function()
  {
   return List.T.Empty;
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_InPorts:function()
  {
   return Ports.Create(List.ofArray([["in Value",this.TextBoxValue]]));
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_Name:function()
  {
   return this.Name;
  }
 },null,TextBoxRenderer);
 TextBoxRenderer.get_FromPorts=function()
 {
  return function(worker)
  {
   return TextBoxRenderer.New(worker.Name.c,worker.InPorts.get_Item(0).get_NumberValue());
  };
 };
 TextBoxRenderer.get_Create=function()
 {
  return TextBoxRenderer.New("Text",MessageBus.CreateNumber(0));
 };
 TextBoxRenderer.New=function(Name,TextBoxValue)
 {
  return new TextBoxRenderer({
   Name:Name,
   TextBoxValue:TextBoxValue
  });
 };
 ButtonRenderer=Dashboard.ButtonRenderer=Runtime.Class({
  WebSharper_Community_Dashboard_IRenderer$get_Render:function()
  {
   return function(worker)
   {
    return Doc.ButtonView(worker.InPorts.get_Item(0).get_String(),[],worker.InPorts.get_Item(1).get_BooleanVar().v,function(state)
    {
     worker.OutPorts.get_Item(0).Trigger(new Value({
      $:2,
      $0:state
     }));
    });
   };
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_OutPorts:function()
  {
   return List.ofArray([OutPort.CreateNumber(this.OutPortKey,"Button value")]);
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_InPorts:function()
  {
   return Ports.Create(List.ofArray([["Caption",this.ButtonName],["State",this.State]]));
  },
  WebSharper_Community_Dashboard_IWorkerContext$get_Name:function()
  {
   return this.Name;
  }
 },null,ButtonRenderer);
 ButtonRenderer.get_FromPorts=function()
 {
  return function(worker)
  {
   return ButtonRenderer.New(worker.Name.c,worker.InPorts.get_Item(0).get_StringValue(),worker.InPorts.get_Item(1).get_BooleanValue(),worker.OutPorts.get_Item(0).Key);
  };
 };
 ButtonRenderer.get_Create=function()
 {
  return ButtonRenderer.New("Button",MessageBus.CreateString("Button"),MessageBus.CreateNumber(0),Helper.UniqueKey());
 };
 ButtonRenderer.New=function(Name,ButtonName,State,OutPortKey)
 {
  return new ButtonRenderer({
   Name:Name,
   ButtonName:ButtonName,
   State:State,
   OutPortKey:OutPortKey
  });
 };
 RuleEntry.New=function(InPortKey,OutPortKey,WorkerKey)
 {
  return{
   InPortKey:InPortKey,
   OutPortKey:OutPortKey,
   WorkerKey:WorkerKey
  };
 };
 RuleChain.New=function(RuleChain$1)
 {
  return{
   RuleChain:RuleChain$1
  };
 };
 RuleContainer=Dashboard.RuleContainer=Runtime.Class({
  Reconnect:function(workers)
  {
   var allOutPorts,allInPorts,_this;
   allOutPorts=Workers.allOutPorts(workers);
   allInPorts=Workers.allInPorts(workers);
   List.iter(function(inPort)
   {
    (MessageBus.Log())((((Runtime.Curried3(function($1,$2,$3)
    {
     return $1(PrintfHelpers.toSafe($2)+" "+PrintfHelpers.toSafe($3));
    }))(Global.id))(inPort.Name))(inPort.Key));
   },allInPorts);
   _this=MessageBus.Agent();
   _this.mailbox.AddLast(AgentMessage.Clear);
   _this.resume();
   List.iter(function(row)
   {
    var cells,i,e;
    cells=List.ofSeq(row.RuleChain);
    i=List.ofSeq(Operators.range(1,cells.get_Length()-1));
    e=Enumerator.Get(i);
    try
    {
     while(e.MoveNext())
      (function()
      {
       var i$1,cell1,cell2,o,outPort,o$1,inPort,templateValue,m,_this$1;
       i$1=e.Current();
       cell1=cells.get_Item(i$1-1);
       cell2=cells.get_Item(i$1);
       {
        o=Seq.tryFind(function(port)
        {
         return port.Key===cell1.OutPortKey;
        },allOutPorts),o==null?null:{
         $:1,
         $0:(outPort=o.$0,((MessageBus.Log())((function($1)
         {
          return function($2)
          {
           return $1("Found out port "+PrintfHelpers.toSafe($2));
          };
         }(Global.id))(cell2.InPortKey)),o$1=Seq.tryFind(function(port)
         {
          return port.Key===cell2.InPortKey;
         },allInPorts),o$1==null?null:{
          $:1,
          $0:(inPort=o$1.$0,((MessageBus.Log())("Found int port"),templateValue=(m=inPort.PortValue,m.$==1?Message.Create(new Value({
           $:1,
           $0:""
          })):m.$==2?Message.Create(new Value({
           $:2,
           $0:false
          })):Message.Create(new Value({
           $:0,
           $0:0
          }))),_this$1=MessageBus.Agent(),_this$1.mailbox.AddLast({
           $:2,
           $0:[ListenerInfo.Create(outPort.Key,outPort.Name+"->"+inPort.Name,inPort.CacheSize),templateValue,function(a)
           {
            inPort.Receive(a);
           }]
          }),_this$1.resume()))
         }))
        };
        return;
       }
      }());
    }
    finally
    {
     if("Dispose"in e)
      e.Dispose();
    }
   },List.ofSeq(this.RuleContainer));
  }
 },null,RuleContainer);
 RuleContainer.New=function(RuleContainer$1)
 {
  return new RuleContainer({
   RuleContainer:RuleContainer$1
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
 SelectorItem.Create=function(name,renderer)
 {
  return SelectorItem.New(Key.Fresh(),name,renderer);
 };
 SelectorItem.New=function(Key$1,Name,SelectorRenderer)
 {
  return{
   Key:Key$1,
   Name:Name,
   SelectorRenderer:SelectorRenderer
  };
 };
 SelectorGroup=Dashboard.SelectorGroup=Runtime.Class({
  RenderMenu:function(offset,selectedItemVar)
  {
   var $this,plus,m,fnc;
   $this=this;
   plus=(m=this.ChildCreatator,m==null?Doc.Element("tr",[],[]):(fnc=m.$0,Doc.Element("tr",[],[Doc.Element("td",[],[Doc.Element("div",[AttrModule.Style("margin-left","20px")],[Helper.IconSmall("add",function()
   {
    var p,item;
    p=fnc();
    item=SelectorItem.Create(p[0],p[1]);
    $this.ItemOnCreated(item);
    $this.SelectorItems.Append(item);
   })])])])));
   return Doc.Element("table",[],[Doc.ConvertBy(function(m$1)
   {
    return m$1.Key;
   },function(item)
   {
    var mapName;
    mapName=View.Map(function(name)
    {
     return offset+name;
    },item.Name.v);
    return Doc.Element("tr",[],[Doc.Element("td",[AttrModule.DynamicStyle("Color",View.Map(function(selItemVar)
    {
     return selItemVar==null?"#7D4600":Unchecked.Equals(selItemVar.$0.Key,item.Key)?"#FB8C00":"#7D4600";
    },selectedItemVar.v)),AttrModule.Style("cursor","pointer"),AttrModule.Handler("click",function()
    {
     return function()
     {
      $this.ItemOnSelected(item);
      return Var.Set(selectedItemVar,{
       $:1,
       $0:item
      });
     };
    })],[Doc.Element("div",[AttrModule.Style("margin-left","10px"),AttrModule.Style("margin-right","5px")],[Doc.TextView(mapName)])])]);
   },this.SelectorItems.v),plus]);
  }
 },null,SelectorGroup);
 SelectorGroup.Create=function(name,config,childCreator,itemOnCreated,itemOnSelected)
 {
  var items;
  items=ListModel.Create(function(item)
  {
   return item.Key;
  },List.map(function($1)
  {
   return SelectorItem.Create($1[0],$1[1]);
  },config));
  return SelectorGroup.New(Key.Fresh(),Var.Create$1(name),items,childCreator,itemOnCreated,itemOnSelected);
 };
 SelectorGroup.New=function(Key$1,Name,SelectorItems,ChildCreatator,ItemOnCreated,ItemOnSelected)
 {
  return new SelectorGroup({
   Key:Key$1,
   Name:Name,
   SelectorItems:SelectorItems,
   ChildCreatator:ChildCreatator,
   ItemOnCreated:ItemOnCreated,
   ItemOnSelected:ItemOnSelected
  });
 };
 WindowSelector=Dashboard.WindowSelector=Runtime.Class({
  get_RenderMenu:function()
  {
   var $this;
   $this=this;
   return this.SelectorGroups.get_Length()===1?List.head(List.ofSeq(this.SelectorGroups)).RenderMenu("",this.OptSelectedItem):Doc.Element("div",[],[Doc.ConvertBy(function(m)
   {
    return m.Key;
   },function(group)
   {
    return Doc.Element("div",[],[Doc.Element("div",[AttrModule.Style("cursor","pointer"),AttrModule.Handler("click",function()
    {
     return function()
     {
      return $this.GroupOnClick(group);
     };
    })],[Doc.TextView(group.Name.v)]),group.RenderMenu("    ",$this.OptSelectedItem)]);
   },this.SelectorGroups.v)]);
  },
  get_Render:function()
  {
   return Doc.Element("div",[],[Doc.BindView(function(value)
   {
    return value==null?Doc.Empty():value.$0.SelectorRenderer;
   },this.OptSelectedItem.v)]);
  },
  GroupByIndex:function(index)
  {
   return Seq.nth(index,List.ofSeq(this.SelectorGroups));
  },
  get_SelectedIndex:function()
  {
   var $this;
   $this=this;
   return Seq.findIndex(function(listItem)
   {
    return Unchecked.Equals(listItem.Key,$this.get_SelectedItem().Key);
   },List.concat(List.map(function(group)
   {
    return List.ofSeq(group.SelectorItems);
   },List.ofSeq(this.SelectorGroups))));
  },
  get_SelectedIndexInGroup:function()
  {
   var $this;
   $this=this;
   return Seq.findIndex(function(listItem)
   {
    return Unchecked.Equals(listItem.Key,$this.get_SelectedItem().Key);
   },List.ofSeq(this.get_SelectedGroup().SelectorItems));
  },
  get_SelectedGroupIndex:function()
  {
   var $this;
   $this=this;
   return Seq.findIndex(function(gr)
   {
    return Unchecked.Equals(gr.Key,$this.get_SelectedGroup().Key);
   },List.ofSeq(this.SelectorGroups));
  },
  get_SelectedGroup:function()
  {
   return this.GroupFromItem(this.get_SelectedItem());
  },
  GroupFromItem:function(item)
  {
   return Seq.find(function(group)
   {
    return List.exists(function(entry)
    {
     return Unchecked.Equals(entry.Key,item.Key);
    },List.ofSeq(group.SelectorItems));
   },List.ofSeq(this.SelectorGroups));
  },
  AppenGroup:function(name,config,childCreator)
  {
   this.SelectorGroups.Append(SelectorGroup.Create(name,config,childCreator,this.ItemOnCreated(this.SelectorGroups.get_Length()),this.ItemOnSelected));
  },
  get_SelectedItem:function()
  {
   var m;
   m=this.OptSelectedItem.c;
   return m==null?Operators.FailWith("Something really wrong with WindowSelector"):m.$0;
  },
  ClearGroups:function()
  {
   Var.Set(this.OptSelectedItem,null);
   List.iter(function(gr)
   {
    gr.SelectorItems.Clear();
   },List.ofSeq(this.SelectorGroups));
  },
  WithItemOnSelected:function(onSelectedFnc)
  {
   return WindowSelector.New(this.OptSelectedItem,this.SelectorGroups,this.ItemOnCreated,this.GroupOnClick,onSelectedFnc);
  },
  WithGroupOnClick:function(onClickFnc)
  {
   return WindowSelector.New(this.OptSelectedItem,this.SelectorGroups,this.ItemOnCreated,onClickFnc,this.ItemOnSelected);
  },
  WithItemOnCreated:function(onCreatedFnc)
  {
   return WindowSelector.New(this.OptSelectedItem,this.SelectorGroups,onCreatedFnc,this.GroupOnClick,this.ItemOnSelected);
  }
 },null,WindowSelector);
 WindowSelector.get_Create=function()
 {
  var S;
  S=ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty);
  return WindowSelector.New(Var.Create$1(null),S,function()
  {
   return function()
   {
    return null;
   };
  },Global.ignore,Global.ignore);
 };
 WindowSelector.New=function(OptSelectedItem,SelectorGroups,ItemOnCreated,GroupOnClick,ItemOnSelected)
 {
  return new WindowSelector({
   OptSelectedItem:OptSelectedItem,
   SelectorGroups:SelectorGroups,
   ItemOnCreated:ItemOnCreated,
   GroupOnClick:GroupOnClick,
   ItemOnSelected:ItemOnSelected
  });
 };
 RulesCellItem=Dashboard.RulesCellItem=Runtime.Class({
  Render:function(workItems,reconnectFnc)
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
   },workItems.v),Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[],[Doc.SelectDyn([AttrModule.Class("form-control")],function(item)
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
   return Doc.Element("td",[AttrModule.Class("td DshEditorCell")],[Doc.Element("div",[AttrModule.Class("div DshEditorCell")],[Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[],[workerSelector])])])])]);
  }
 },null,RulesCellItem);
 RulesCellItem.get_Create=function()
 {
  return RulesCellItem.New(Key.Fresh(),Var.Create$1(null),Var.Create$1(null),Var.Create$1(null));
 };
 RulesCellItem.New=function(Key$1,OptInPort,OptWorker,OptOutPort)
 {
  return new RulesCellItem({
   Key:Key$1,
   OptInPort:OptInPort,
   OptWorker:OptWorker,
   OptOutPort:OptOutPort
  });
 };
 RulesRowItem=Dashboard.RulesRowItem=Runtime.Class({
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
    $this.CellItems.Append(RulesCellItem.get_Create());
   })]);
  }
 },null,RulesRowItem);
 RulesRowItem.Create=function(children)
 {
  return RulesRowItem.New(Key.Fresh(),ListModel.Create(function(item)
  {
   return item.Key;
  },children));
 };
 RulesRowItem.New=function(Key$1,CellItems)
 {
  return new RulesRowItem({
   Key:Key$1,
   CellItems:CellItems
  });
 };
 WidgetItem.Create=function(panel,widget)
 {
  return WidgetItem.New(Key.Fresh(),panel,widget);
 };
 WidgetItem.New=function(Key$1,Panel$2,Widget)
 {
  return{
   Key:Key$1,
   Panel:Panel$2,
   Widget:Widget
  };
 };
 EventsGroupItem.Create=function(name)
 {
  return EventsGroupItem.New(Key.Fresh(),Var.Create$1(name),ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty));
 };
 EventsGroupItem.New=function(Key$1,Name,EventItems)
 {
  return{
   Key:Key$1,
   Name:Name,
   EventItems:EventItems
  };
 };
 WidgetsGroupItem.Create=function(name,panelContainer)
 {
  return WidgetsGroupItem.New(Key.Fresh(),Var.Create$1(name),ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty),panelContainer);
 };
 WidgetsGroupItem.New=function(Key$1,Name,WidgetItems,PanelContainer$1)
 {
  return{
   Key:Key$1,
   Name:Name,
   WidgetItems:WidgetItems,
   PanelContainer:PanelContainer$1
  };
 };
 RulesGroupItem.Create=function(name)
 {
  return RulesGroupItem.New(Key.Fresh(),Var.Create$1(name),ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty));
 };
 RulesGroupItem.New=function(Key$1,Name,RulesRowItems)
 {
  return{
   Key:Key$1,
   Name:Name,
   RulesRowItems:RulesRowItems
  };
 };
 DshData=Dashboard.DshData=Runtime.Class({
  RegisterWidget:function(key,group,panel,widget)
  {
   var widget_key;
   widget_key=widget.WithKey(key);
   group.WidgetItems.Append(WidgetItem.Create(panel,widget_key));
   this.WorkItems.Append(WorkerItem.Create(widget_key));
  },
  RegisterEvent:function(key,group,event)
  {
   var item;
   item=WorkerItem.Create(event.WithKey(key));
   group.EventItems.Append(item);
   this.WorkItems.Append(item);
  },
  get_Clear:function()
  {
   this.WorkItems.Clear();
   this.WidgetGroups.Clear();
   this.EventGroups.Clear();
   this.RulesGroups.Clear();
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
 DshData.New=function(WorkItems,WidgetGroups,EventGroups,RulesGroups)
 {
  return new DshData({
   WorkItems:WorkItems,
   WidgetGroups:WidgetGroups,
   EventGroups:EventGroups,
   RulesGroups:RulesGroups
  });
 };
 EventsEditor.Render=function(eventItems,propGrid)
 {
  return Doc.Element("table",[],[Doc.ConvertBy(function(m)
  {
   return m.Key;
  },function(item)
  {
   return Doc.Element("tr",[],[Doc.Element("i",Helper.AttrsClick(function()
   {
    propGrid.Edit(item.Worker.get_Properties());
   }),[Doc.TextView(item.Worker.Name.v)])]);
  },eventItems.v)]);
 };
 RulesEditor.Render=function(data,rowItems)
 {
  function reconnectFnc()
  {
   var x;
   x=List.map(function(item)
   {
    return item.Worker;
   },List.ofSeq(data.WorkItems));
   RulesEditor.CopyToRules(rowItems).Reconnect(x);
  }
  return Doc.Element("table",[],[Doc.ConvertBy(function(m)
  {
   return m.Key;
  },function(item)
  {
   return Doc.Element("tr",[],[item.Render(data.WorkItems,function()
   {
    reconnectFnc();
   })]);
  },rowItems.v)]);
 };
 RulesEditor.Restore=function(data,rowItems,rules)
 {
  var allWorkers,allOutPorts,allInPorts;
  rowItems.Clear();
  allWorkers=List.map(function(item)
  {
   return item.Worker;
  },List.ofSeq(data.WorkItems));
  allOutPorts=Workers.allOutPorts(allWorkers);
  allInPorts=Workers.allInPorts(allWorkers);
  List.iter(function(rowData)
  {
   var row;
   row=RulesRowItem.Create([]);
   List.iter(function(cellData)
   {
    var cell;
    cell=RulesCellItem.get_Create();
    Var.Set(cell.OptWorker,Seq.tryFind(function(item)
    {
     return item.Worker.Key===cellData.WorkerKey;
    },List.ofSeq(data.WorkItems)));
    Var.Set(cell.OptInPort,Seq.tryFind(function(port)
    {
     return port.Key===cellData.InPortKey;
    },allInPorts));
    Var.Set(cell.OptOutPort,Seq.tryFind(function(port)
    {
     return port.Key===cellData.OutPortKey;
    },allOutPorts));
    row.CellItems.Append(cell);
   },rowData.RuleChain);
   rowItems.Append(row);
  },rules.RuleContainer);
  rules.Reconnect(allWorkers);
 };
 RulesEditor.CopyToRules=function(rowItems)
 {
  return RuleContainer.New(List.map(function(row)
  {
   return RuleChain.New(List.map(function(cell)
   {
    var m,m$1,m$2;
    return RuleEntry.New((m=cell.OptInPort.c,m==null?"":m.$0.Key),(m$1=cell.OptOutPort.c,m$1==null?"":m$1.$0.Key),(m$2=cell.OptWorker.c,m$2==null?"":m$2.$0.Worker.Key));
   },List.ofSeq(row.CellItems)));
  },List.ofSeq(rowItems)));
 };
 DshHelper.RulesGroupCreator=function(data,a)
 {
  var grItem;
  grItem=RulesGroupItem.Create("rules"+Global.String(List.length(List.ofSeq(data.RulesGroups))+1));
  data.RulesGroups.Append(grItem);
  return[grItem.Name,RulesEditor.Render(data,grItem.RulesRowItems)];
 };
 DshHelper.EventsGroupCreator=function(data,propertyGrid,a)
 {
  var grItem;
  grItem=EventsGroupItem.Create("event"+Global.String(List.length(List.ofSeq(data.EventGroups))+1));
  data.EventGroups.Append(grItem);
  return[grItem.Name,EventsEditor.Render(grItem.EventItems,propertyGrid)];
 };
 DshHelper.PanelGroupCreator=function(data,panelContainerCreator,a)
 {
  var number,panelContainer,grItem;
  number=List.length(List.ofSeq(data.WidgetGroups))+1;
  panelContainer=panelContainerCreator();
  grItem=WidgetsGroupItem.Create("panel"+Global.String(number),panelContainer);
  data.WidgetGroups.Append(grItem);
  return[grItem.Name,panelContainer.get_Render()];
 };
 Dashboard$1=Dashboard.Dashboard=Runtime.Class({
  Render:function(menu)
  {
   var $this;
   $this=this;
   return Doc.EmbedView(View.Map(function(mode)
   {
    return mode.$==1?Doc.Element("div",[],[Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[AttrModule.Style("vertical-align","top")],[Doc.Element("table",[],Seq.concat([List.ofArray([Doc.Element("tr",[],[Doc.Element("td",[],[Helper.IconNormal("dehaze",function()
    {
     Var.Set($this.PanelTitleVisibility,false);
     Var.Set($this.Mode,{
      $:0
     });
    })])])]),List.ofArray([$this.EditorSelectorEdit.get_RenderMenu()]),List.ofArray([Doc.Element("tr",[],[Doc.Element("td",[],[])]),Doc.Element("tr",[],[Doc.Element("td",[],[$this.PropertyGrid.get_Render()])])])]))]),Doc.Element("td",[AttrModule.Style("vertical-align","top")],[menu,Helper.IconNormal("add",function()
    {
     var selIndex,items,selected,x,x$1;
     selIndex=$this.EditorSelectorEdit.get_SelectedGroupIndex();
     selIndex===1?(items=List.ofSeq($this.Factory.EventItems),selected=Var.Create$1(List.head(items)),$this.Dialog.ShowDialog("Select source",Doc.Element("div",[],[Doc.Select([AttrModule.Class("form-control")],function(item)
     {
      return item.Worker.Name.c;
     },items,selected)]),function()
     {
      var event,a,x$2;
      event=selected.c.Worker.get_CloneAndRun();
      a=(x$2=List.ofSeq($this.Data.EventGroups),Seq.nth($this.EditorSelectorEdit.get_SelectedIndexInGroup(),x$2));
      $this.Data.RegisterEvent(Helper.UniqueKey(),a,event);
     })):selIndex===0?$this.CreatePanel((x=List.ofSeq($this.Data.WidgetGroups),Seq.nth($this.EditorSelectorEdit.get_SelectedIndexInGroup(),x)),"Panel",700,null):selIndex===2?(x$1=List.ofSeq($this.Data.RulesGroups),Seq.nth($this.EditorSelectorEdit.get_SelectedIndexInGroup(),x$1)).RulesRowItems.Append(RulesRowItem.Create([RulesCellItem.get_Create(),RulesCellItem.get_Create()])):void 0;
    }),$this.EditorSelectorEdit.get_Render()])])]),Doc.Element("div",[],[$this.Dialog.get_Render()])]):Doc.Element("div",[],[Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[AttrModule.Style("vertical-align","top")],[Helper.IconNormal("dehaze",function()
    {
     Var.Set($this.PanelTitleVisibility,true);
     Var.Set($this.Mode,{
      $:1
     });
    }),$this.EditorSelectorRun.GroupByIndex(0).SelectorItems.get_Length()>1?$this.EditorSelectorRun.get_RenderMenu():Doc.Element("div",[],[])]),Doc.Element("td",[],[$this.EditorSelectorRun.get_Render()])])])]);
   },this.Mode.v));
  },
  Restore:function(panelCreator,events,widgets,rules)
  {
   var $this,gSelectorPanelsRun,gSelectorPanelsEdit,gSelectorEvents,gSelectorRules;
   $this=this;
   this.EditorSelectorRun.ClearGroups();
   this.EditorSelectorEdit.ClearGroups();
   this.Data.get_Clear();
   gSelectorPanelsRun=this.EditorSelectorRun.GroupByIndex(0);
   gSelectorPanelsEdit=this.EditorSelectorEdit.GroupByIndex(0);
   gSelectorEvents=this.EditorSelectorEdit.GroupByIndex(1);
   gSelectorRules=this.EditorSelectorEdit.GroupByIndex(2);
   List.iteri(function(ind,t)
   {
    var p,renderer,grNameVar,grItem;
    function a(key,panelKey,widget)
    {
     $this.RegisterWidget(key,grItem,panelKey,Seq.find(function(entry)
     {
      return entry.Key===panelKey;
     },List.ofSeq(grItem.PanelContainer.PanelItems)).Children,widget.WithStartRunner());
    }
    p=DshHelper.PanelGroupCreator($this.Data,panelCreator,null);
    renderer=p[1];
    grNameVar=p[0];
    Var.Set(grNameVar,t[0]);
    gSelectorPanelsEdit.SelectorItems.Append(SelectorItem.Create(grNameVar,renderer));
    gSelectorPanelsRun.SelectorItems.Append(SelectorItem.Create(grNameVar,renderer));
    grItem=Seq.nth(ind,List.ofSeq($this.Data.WidgetGroups));
    List.iter(function(panelConfig)
    {
     var panel;
     panel=$this.CreatePanel(grItem,"Panel",700,{
      $:1,
      $0:panelConfig.Key
     });
     Var.Set(panel.Left,panelConfig.Left);
     Var.Set(panel.Top,panelConfig.Top);
    },t[1]);
    return List.iter(function($1)
    {
     return a($1[0],$1[1],$1[2]);
    },t[2]);
   },widgets);
   console.log("Widgets restored");
   List.iteri(function(ind,t)
   {
    var p,grNameVar,grItem;
    function a(key,event)
    {
     $this.Data.RegisterEvent(key,grItem,event);
    }
    p=DshHelper.EventsGroupCreator($this.Data,$this.PropertyGrid,null);
    grNameVar=p[0];
    Var.Set(grNameVar,t[0]);
    gSelectorEvents.SelectorItems.Append(SelectorItem.Create(grNameVar,p[1]));
    grItem=Seq.nth(ind,List.ofSeq($this.Data.EventGroups));
    return List.iter(function($1)
    {
     return a($1[0],$1[1]);
    },t[1]);
   },events);
   console.log("Events restored");
   List.iteri(function(ind,t)
   {
    var p,grNameVar;
    p=DshHelper.RulesGroupCreator($this.Data,null);
    grNameVar=p[0];
    Var.Set(grNameVar,t[0]);
    gSelectorRules.SelectorItems.Append(SelectorItem.Create(grNameVar,p[1]));
    return RulesEditor.Restore($this.Data,Seq.nth(ind,List.ofSeq($this.Data.RulesGroups)).RulesRowItems,t[1]);
   },rules);
   Var.Set(this.EditorSelectorEdit.OptSelectedItem,{
    $:1,
    $0:List.head(List.ofSeq(this.EditorSelectorEdit.GroupByIndex(0).SelectorItems))
   });
   Var.Set(this.EditorSelectorRun.OptSelectedItem,{
    $:1,
    $0:List.head(List.ofSeq(this.EditorSelectorRun.GroupByIndex(0).SelectorItems))
   });
   console.log("Connectors restored");
  },
  Store:function(fncFromWorker)
  {
   return[List.map(function(gr)
   {
    return[gr.Name.c,List.map(function(item)
    {
     return[item.Worker.Key,fncFromWorker(item.Worker)];
    },List.ofSeq(gr.EventItems))];
   },List.ofSeq(this.Data.EventGroups)),List.map(function(gr)
   {
    return[gr.Name.c,List.map(function(panel)
    {
     return panel.get_PanelData();
    },List.ofSeq(gr.PanelContainer.PanelItems)),List.map(function(item)
    {
     return[item.Widget.Key,item.Panel,fncFromWorker(item.Widget)];
    },List.ofSeq(gr.WidgetItems))];
   },List.ofSeq(this.Data.WidgetGroups)),List.map(function(gr)
   {
    return[gr.Name.c,RulesEditor.CopyToRules(gr.RulesRowItems)];
   },List.ofSeq(this.Data.RulesGroups))];
  },
  CreatePanel:function(group,name,cx,key)
  {
   var $this,keyDef,d,c,childContainerContent,panel;
   $this=this;
   Doc.ConvertBy(group.WidgetItems.key,function(item)
   {
    return Doc.Element("div",[],[Doc.TextView(item.Widget.Name.v)]);
   },group.WidgetItems.v);
   keyDef=(d=(c=Guid.NewGuid(),Global.String(c)),key==null?d:key.$0);
   childContainerContent=PanelContainer.get_Create().WithLayoutManager(LayoutManagers.StackPanelLayoutManager()).WithAttributes([AttrModule.Style("border","1px solid white"),AttrModule.Style("display","flex")]);
   panel=Panel$1.get_Create().WithKey(keyDef).WithPannelAttrs([AttrModule.Style("Width",Global.String(cx)+"px"),AttrModule.Style("position","absolute")]).WithTitle(this.PanelTitleVisibility).WithTitleContent(Doc.TextNode(name)).WithTitleButtons(List.ofArray([TitleButton.New("add",function(panel$1)
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
     $this.RegisterWidget(Helper.UniqueKey(),group,panel$1.Key,panel$1.Children,selected.c.Worker.get_CloneAndRun());
    });
   }),TitleButton.New("edit",function(panel$1)
   {
    console.log("Edit");
    $this.PropertyGrid.Edit(List.concat(List.map(function(item)
    {
     return item.Widget.get_Properties();
    },List.filter(function(item)
    {
     return item.Panel===panel$1.Key;
    },List.ofSeq(group.WidgetItems)))));
   }),TitleButton.New("clear",function(panel$1)
   {
    group.PanelContainer.PanelItems.Remove(group.PanelContainer.FindPanelItem(panel$1));
   })])).WithChildPanelContainer(childContainerContent);
   group.PanelContainer.AddPanel(panel);
   return panel;
  },
  RegisterWidget:function(key,group,panelKey,toPanelContainer,worker)
  {
   var panel;
   this.Data.RegisterWidget(key,group,panelKey,worker);
   panel=Panel$1.get_Create().WithPanelContent(worker.get_Render());
   Var.Set(panel.IsWithTitle,false);
   toPanelContainer.AddPanel(panel);
  }
 },null,Dashboard$1);
 Dashboard$1.Create=function(panelContainerCreator)
 {
  var dialog,data,propertyGrid,editorSelectorRun,editorSelectorEdit,firstPanel;
  function panelGroupCreator()
  {
   return DshHelper.PanelGroupCreator(data,panelContainerCreator,void 0);
  }
  function eventsGroupCreator()
  {
   return DshHelper.EventsGroupCreator(data,propertyGrid,void 0);
  }
  function rulesGroupCreator()
  {
   return DshHelper.RulesGroupCreator(data,void 0);
  }
  dialog=Dialog.get_Create();
  data=DshData.get_Create();
  propertyGrid=PropertyGrid$1.get_Create();
  editorSelectorRun=WindowSelector.get_Create();
  editorSelectorEdit=WindowSelector.get_Create().WithGroupOnClick(function(gr)
  {
   (MessageBus.Log())("WithGroupOnClick");
   propertyGrid.Edit(List.mapi(function(ind,item)
   {
    var c;
    return Properties.string((c=ind+1,Global.String(c)),item.Name);
   },List.ofSeq(gr.SelectorItems)));
  }).WithItemOnSelected(function()
  {
   (MessageBus.Log())("WithItemOnSelected");
   propertyGrid.Edit(List.T.Empty);
  }).WithItemOnCreated(function(grInd)
  {
   return function(item)
   {
    return grInd===0?List.head(List.ofSeq(editorSelectorRun.SelectorGroups)).SelectorItems.Append(item):null;
   };
  });
  firstPanel=panelGroupCreator();
  editorSelectorEdit.AppenGroup("Panels",List.ofArray([firstPanel]),{
   $:1,
   $0:panelGroupCreator
  });
  editorSelectorRun.AppenGroup("Panels",List.ofArray([firstPanel]),null);
  editorSelectorEdit.AppenGroup("Events",List.ofArray([eventsGroupCreator()]),{
   $:1,
   $0:eventsGroupCreator
  });
  editorSelectorEdit.AppenGroup("Rules",List.ofArray([rulesGroupCreator()]),{
   $:1,
   $0:rulesGroupCreator
  });
  Var.Set(editorSelectorEdit.OptSelectedItem,{
   $:1,
   $0:List.head(List.ofSeq(editorSelectorEdit.GroupByIndex(0).SelectorItems))
  });
  Var.Set(editorSelectorRun.OptSelectedItem,{
   $:1,
   $0:List.head(List.ofSeq(editorSelectorRun.GroupByIndex(0).SelectorItems))
  });
  return Dashboard$1.New(Factory.get_Create(),data,propertyGrid,dialog,editorSelectorRun,editorSelectorEdit,Var.Create$1({
   $:0
  }),Var.Create$1(false));
 };
 Dashboard$1.New=function(Factory$1,Data$2,PropertyGrid$2,Dialog$1,EditorSelectorRun,EditorSelectorEdit,Mode,PanelTitleVisibility)
 {
  return new Dashboard$1({
   Factory:Factory$1,
   Data:Data$2,
   PropertyGrid:PropertyGrid$2,
   Dialog:Dialog$1,
   EditorSelectorRun:EditorSelectorRun,
   EditorSelectorEdit:EditorSelectorEdit,
   Mode:Mode,
   PanelTitleVisibility:PanelTitleVisibility
  });
 };
 AppModelLib=Dashboard.AppModelLib=Runtime.Class({
  get_Worker:function()
  {
   var src;
   return this.$==1?Worker.CreateWithRunner(this.$0):this.$==2?Worker.CreateWithRunner(this.$0):this.$==3?Worker.CreateWithRenderer(this.$0):this.$==4?(src=this.$0,Worker.Create(src).WithRunner(src).WithRenderer(src)):this.$==5?Worker.CreateWithRenderer(this.$0):Worker.CreateWithRunner(this.$0);
  }
 },null,AppModelLib);
 AppModelLib.FromWorker=function(worker)
 {
  var m;
  m=worker.DataContext;
  return m instanceof RandomRunner?{
   $:1,
   $0:new AppModelLib({
    $:0,
    $0:(RandomRunner.get_FromPorts())(worker)
   })
  }:m instanceof OpenWeatherRunner?{
   $:1,
   $0:new AppModelLib({
    $:1,
    $0:(OpenWeatherRunner.get_FromPorts())(worker)
   })
  }:m instanceof DatabaseRunner?{
   $:1,
   $0:new AppModelLib({
    $:2,
    $0:(DatabaseRunner.get_FromPorts())(worker)
   })
  }:m instanceof TextBoxRenderer?{
   $:1,
   $0:new AppModelLib({
    $:3,
    $0:(TextBoxRenderer.get_FromPorts())(worker)
   })
  }:m instanceof ChartRenderer?{
   $:1,
   $0:new AppModelLib({
    $:4,
    $0:(ChartRenderer.get_FromPorts())(worker)
   })
  }:m instanceof ButtonRenderer?{
   $:1,
   $0:new AppModelLib({
    $:5,
    $0:(ButtonRenderer.get_FromPorts())(worker)
   })
  }:null;
 };
 AppModelLib.FromDataContext=function(data)
 {
  return data instanceof RandomRunner?{
   $:1,
   $0:new AppModelLib({
    $:0,
    $0:data
   })
  }:data instanceof OpenWeatherRunner?{
   $:1,
   $0:new AppModelLib({
    $:1,
    $0:data
   })
  }:data instanceof DatabaseRunner?{
   $:1,
   $0:new AppModelLib({
    $:2,
    $0:data
   })
  }:data instanceof TextBoxRenderer?{
   $:1,
   $0:new AppModelLib({
    $:3,
    $0:data
   })
  }:data instanceof ChartRenderer?{
   $:1,
   $0:new AppModelLib({
    $:4,
    $0:data
   })
  }:data instanceof ButtonRenderer?{
   $:1,
   $0:new AppModelLib({
    $:5,
    $0:data
   })
  }:null;
 };
 App.CreateDashboard=function()
 {
  SC$2.$cctor();
  return SC$2.CreateDashboard;
 };
 App.PanelContainerCreator=function(a)
 {
  return PanelContainer.get_Create().WithLayoutManager(LayoutManagers.FloatingPanelLayoutManager(5)).WithWidth(800).WithHeight(420).WithAttributes([AttrModule.Style("border","1px solid white")]);
 };
 App.Register=function(dashboard)
 {
  function register(fnc,data)
  {
   var o;
   {
    o=AppModelLib.FromDataContext(data),o==null?null:{
     $:1,
     $0:fnc(o.$0.get_Worker())
    };
    return;
   }
  }
  function registerEvent(data)
  {
   var o;
   register((o=dashboard.Factory,function(a)
   {
    o.RegisterEvent(a);
   }),data);
  }
  function registerWidget(data)
  {
   var o;
   register((o=dashboard.Factory,function(a)
   {
    o.RegisterWidget(a);
   }),data);
  }
  registerEvent(OpenWeatherRunner.Create("London",""));
  registerEvent(RandomRunner.Create(50,5));
  registerEvent(DatabaseRunner.get_Create());
  registerWidget(TextBoxRenderer.get_Create());
  registerWidget(ChartRenderer.Create(300,100,50));
  registerWidget(ButtonRenderer.get_Create());
 };
 SC$2.$cctor=Runtime.Cctor(function()
 {
  var dashboard;
  SC$2.CreateDashboard=(dashboard=Dashboard$1.Create(function()
  {
   return App.PanelContainerCreator();
  }),(App.Register(dashboard),dashboard));
  SC$2.$cctor=Global.ignore;
 });
}());
