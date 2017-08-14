(function()
{
 "use strict";
 var WebSharper,Community,Dashboard,MessageBus,Role,Value,Message,ListenerInfo,AgentMessage,AgentState,SC$1,InPort,OutPortType,OutPort,Ports,Worker,Workers,RandomRunner,OpenWeather,Forecast,OpenWeatherRunner,DatabaseRunner,ChartRunnerContext,ChartRenderer,TextBoxRenderer,ButtonRenderer,RuleEntry,RuleChain,RuleContainer,WorkerItem,Factory,WidgetItem,EventsGroupItem,DshData,EventsEditor,RulesCellItem,RulesRowItem,RulesEditor,SelectorItem,SelectorGroup,WindowSelector,Dashboard$1,AppModelLib,App,SC$2,IntelliFactory,Runtime,Operators,Panel,Helper,Date,List,Concurrency,Remoting,AjaxRemotingProvider,Control,MailboxProcessor,PrintfHelpers,Seq,UI,Next,Var,PropertyGrid,Properties,Guid,Unchecked,Doc,Random,Math,console,Data,TxtRuntime,FSharp,Data$1,Runtime$1,IO,JSON,Arrays,View,Charting,Renderers,ChartJs,Chart,Pervasives,AttrModule,Enumerator,Key,ListModel,Option,PanelContainer,LayoutManagers,Panel$1,TitleButton,Dialog,PropertyGrid$1;
 WebSharper=window.WebSharper=window.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 MessageBus=Dashboard.MessageBus=Dashboard.MessageBus||{};
 Role=MessageBus.Role=MessageBus.Role||{};
 Value=MessageBus.Value=MessageBus.Value||{};
 Message=MessageBus.Message=MessageBus.Message||{};
 ListenerInfo=MessageBus.ListenerInfo=MessageBus.ListenerInfo||{};
 AgentMessage=MessageBus.AgentMessage=MessageBus.AgentMessage||{};
 AgentState=MessageBus.AgentState=MessageBus.AgentState||{};
 SC$1=window.StartupCode$WebSharper_Community_Dashboard$MessageBus=window.StartupCode$WebSharper_Community_Dashboard$MessageBus||{};
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
 WidgetItem=Dashboard.WidgetItem=Dashboard.WidgetItem||{};
 EventsGroupItem=Dashboard.EventsGroupItem=Dashboard.EventsGroupItem||{};
 DshData=Dashboard.DshData=Dashboard.DshData||{};
 EventsEditor=Dashboard.EventsEditor=Dashboard.EventsEditor||{};
 RulesCellItem=Dashboard.RulesCellItem=Dashboard.RulesCellItem||{};
 RulesRowItem=Dashboard.RulesRowItem=Dashboard.RulesRowItem||{};
 RulesEditor=Dashboard.RulesEditor=Dashboard.RulesEditor||{};
 SelectorItem=Dashboard.SelectorItem=Dashboard.SelectorItem||{};
 SelectorGroup=Dashboard.SelectorGroup=Dashboard.SelectorGroup||{};
 WindowSelector=Dashboard.WindowSelector=Dashboard.WindowSelector||{};
 Dashboard$1=Dashboard.Dashboard=Dashboard.Dashboard||{};
 AppModelLib=Dashboard.AppModelLib=Dashboard.AppModelLib||{};
 App=Dashboard.App=Dashboard.App||{};
 SC$2=window.StartupCode$WebSharper_Community_Dashboard$AppModelLib=window.StartupCode$WebSharper_Community_Dashboard$AppModelLib||{};
 IntelliFactory=window.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Operators=WebSharper&&WebSharper.Operators;
 Panel=Community&&Community.Panel;
 Helper=Panel&&Panel.Helper;
 Date=window.Date;
 List=WebSharper&&WebSharper.List;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 Control=WebSharper&&WebSharper.Control;
 MailboxProcessor=Control&&Control.MailboxProcessor;
 PrintfHelpers=WebSharper&&WebSharper.PrintfHelpers;
 Seq=WebSharper&&WebSharper.Seq;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Var=Next&&Next.Var;
 PropertyGrid=Community&&Community.PropertyGrid;
 Properties=PropertyGrid&&PropertyGrid.Properties;
 Guid=WebSharper&&WebSharper.Guid;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Doc=Next&&Next.Doc;
 Random=WebSharper&&WebSharper.Random;
 Math=window.Math;
 console=window.console;
 Data=WebSharper&&WebSharper.Data;
 TxtRuntime=Data&&Data.TxtRuntime;
 FSharp=window.FSharp;
 Data$1=FSharp&&FSharp.Data;
 Runtime$1=Data$1&&Data$1.Runtime;
 IO=Runtime$1&&Runtime$1.IO;
 JSON=window.JSON;
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
         return $1("Values from server requested messages received:"+window.String($2));
        };
       }(window.id))(a$1.get_Length()));
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
  SC$1.Log=function()
  {
  };
  SC$1.Agent=MailboxProcessor.Start(function(inbox)
  {
   var cutBuffer,split,update_and_split,send_to_listeners;
   function loop(state)
   {
    var b;
    b=null;
    return Concurrency.Delay(function()
    {
     return Concurrency.Bind(inbox.Receive(null),function(a)
     {
      var listenerInfo,time,m,maxTimes,m$1,busKeyValue,o;
      return a.$==2?(listenerInfo=a.$0[0],((MessageBus.Log())((function($1)
      {
       return function($2)
       {
        return $1("RegisterListener:"+PrintfHelpers.toSafe($2));
       };
      }(window.id))(listenerInfo.Name)),loop(AgentState.New(state.ServerCallback,new List.T({
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
      },List.T.Empty,List.concat((m=function(info,a$1,buffer)
      {
       return cutBuffer(time,buffer);
      },List.map(function($1)
      {
       return m($1[0],$1[1],$1[2]);
      },state.Listeners))))),loop(state))):a.$==6?(maxTimes=(m$1=function(info,a$1,buffer)
      {
       return buffer.$==0?(new Date(0,0-1,0)).getTime():List.maxBy(function(item)
       {
        return item.Time;
       },buffer).Time;
      },List.map(function($1)
      {
       return m$1($1[0],$1[1],$1[2]);
      },state.Listeners)),(a.$0(maxTimes.$==0?(new Date(0,0-1,0)).getTime():List.max(maxTimes)),loop(state))):a.$==1?loop(AgentState.New(state.ServerCallback,send_to_listeners(a.$0,state.Listeners))):a.$==0?(busKeyValue=a.$0,(o=state.ServerCallback,o==null?void 0:o.$0(busKeyValue),loop(AgentState.New(state.ServerCallback,send_to_listeners(busKeyValue,state.Listeners))))):loop(AgentState.get_empty());
     });
    });
   }
   cutBuffer=function(time,buffer)
   {
    return Seq.fold(function(acc,item)
    {
     return item.Time>=time?new List.T({
      $:1,
      $0:item,
      $1:acc
     }):acc;
    },List.T.Empty,buffer);
   };
   split=function(maxSize,buffer)
   {
    return maxSize<buffer.get_Length()?(List.splitAt(maxSize,buffer))[0]:buffer;
   };
   update_and_split=function(maxSize,buffer,value)
   {
    return maxSize===1?List.ofArray([value]):split(maxSize,new List.T({
     $:1,
     $0:value,
     $1:buffer
    }));
   };
   send_to_listeners=function(message,listeners)
   {
    var m;
    m=function(info,callback,buf)
    {
     var listener;
     listener=window.Array.prototype.slice.call(arguments);
     return info.Key===message.Key?(callback(message),[info,callback,update_and_split(info.CacheSize,buf,message)]):listener;
    };
    return List.map(function($1)
    {
     return m($1[0],$1[1],$1[2]);
    },listeners);
   };
   return loop(AgentState.get_empty());
  },null);
  SC$1.$cctor=window.ignore;
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
   return this.ExtractPortBooleanValue(window.id);
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
   return this.ExtractPortStringValue(window.id);
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
   return this.ExtractPortNumberValue(window.id);
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
   return InPort.New((c=Guid.NewGuid(),window.String(c)),this.Name,(m=this.PortValue,m.$==1?{
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
  var m;
  return Ports.CreateWithCache((m=function(name,value)
  {
   return[name,value,1];
  },List.map(function($1)
  {
   return m($1[0],$1[1]);
  },info)));
 };
 Ports.CreateWithCache=function(info)
 {
  var m;
  m=function(name,pair,cacheSize)
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
  };
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
  return OpenWeatherRunner.New("OpenWeatherMap",MessageBus.CreateString(city),MessageBus.CreateString(apikey),(c=Guid.NewGuid(),window.String(c)));
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
     },4))(window.id))(value.Key))(window.String(value.Time)))(value.Value.get_AsNumber());
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
    var chartBufferSize,context;
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
    },null,null);
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
     $0:ChartRunnerContext.New(Chart.Line(data).__WithFillColor(new Pervasives.Color({
      $:2,
      $0:"white"
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
     return window.String(c);
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
    }))(window.id))(inPort.Name))(inPort.Key));
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
        }(window.id))(cell2.InPortKey)),o$1=Seq.tryFind(function(port)
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
 EventsGroupItem.get_Create=function()
 {
  return EventsGroupItem.New(Key.Fresh(),Var.Create$1("Events"),ListModel.Create(function(item)
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
 DshData=Dashboard.DshData=Runtime.Class({
  RegisterWidget:function(key,panel,widget)
  {
   var widget_key;
   widget_key=widget.WithKey(key);
   this.WidgetItems.Append(WidgetItem.Create(panel,widget_key));
   this.WorkItems.Append(WorkerItem.Create(widget_key));
  },
  RegisterEventInGroup:function(key,group,event)
  {
   var item;
   item=WorkerItem.Create(event.WithKey(key));
   group.EventItems.Append(item);
   this.WorkItems.Append(item);
  },
  RegisterEvent:function(key,event)
  {
   var item;
   item=WorkerItem.Create(event.WithKey(key));
   this.EventItems.Append(item);
   this.WorkItems.Append(item);
  },
  get_Clear:function()
  {
   this.WorkItems.Clear();
   this.WidgetItems.Clear();
   this.EventItems.Clear();
   this.EventGroups.Clear();
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
 DshData.New=function(WorkItems,WidgetItems,EventItems,EventGroups)
 {
  return new DshData({
   WorkItems:WorkItems,
   WidgetItems:WidgetItems,
   EventItems:EventItems,
   EventGroups:EventGroups
  });
 };
 EventsEditor.Render=function(data,propGrid)
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
  },data.EventItems.v)]);
 };
 RulesCellItem=Dashboard.RulesCellItem=Runtime.Class({
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
 RulesEditor=Dashboard.RulesEditor=Runtime.Class({
  Render:function(data)
  {
   var $this,reconnectFnc;
   $this=this;
   reconnectFnc=function()
   {
    var x;
    x=List.map(function(item)
    {
     return item.Worker;
    },List.ofSeq(data.WorkItems));
    $this.get_CopyToRules().Reconnect(x);
   };
   return Doc.Element("table",[],[Doc.ConvertBy(function(m)
   {
    return m.Key;
   },function(item)
   {
    return Doc.Element("tr",[],[item.Render(data,function()
    {
     reconnectFnc();
    })]);
   },this.RowItems.v)]);
  },
  Restore:function(data,rules)
  {
   var $this,allWorkers,allOutPorts,allInPorts;
   $this=this;
   this.RowItems.Clear();
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
    $this.RowItems.Append(row);
   },rules.RuleContainer);
   rules.Reconnect(allWorkers);
  },
  get_CopyToRules:function()
  {
   return RuleContainer.New(List.map(function(row)
   {
    return RuleChain.New(List.map(function(cell)
    {
     var m,m$1,m$2;
     return RuleEntry.New((m=cell.OptInPort.c,m==null?"":m.$0.Key),(m$1=cell.OptOutPort.c,m$1==null?"":m$1.$0.Key),(m$2=cell.OptWorker.c,m$2==null?"":m$2.$0.Worker.Key));
    },List.ofSeq(row.CellItems)));
   },List.ofSeq(this.RowItems)));
  }
 },null,RulesEditor);
 RulesEditor.get_Create=function()
 {
  return RulesEditor.New(ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty));
 };
 RulesEditor.New=function(RowItems)
 {
  return new RulesEditor({
   RowItems:RowItems
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
   plus=(m=this.ChildCreatator,m==null?Doc.Element("tr",[],[]):(fnc=m.$0,Doc.Element("tr",[],[Doc.Element("td",[],[Helper.IconSmall("add",function()
   {
    var p;
    p=fnc();
    $this.SelectorItems.Append(SelectorItem.Create(p[0],p[1]));
   })])])));
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
    return Doc.Element("tr",[],[Doc.Element("td",[AttrModule.DynamicStyle("Color",View.Map(function(selItem)
    {
     return Unchecked.Equals(selItem.Key,item.Key)?"#FB8C00":"#7D4600";
    },selectedItemVar.v)),AttrModule.Style("cursor","pointer"),AttrModule.Handler("click",function()
    {
     return function()
     {
      return Var.Set(selectedItemVar,item);
     };
    })],[Doc.TextView(mapName)])]);
   },this.SelectorItems.v),plus]);
  }
 },null,SelectorGroup);
 SelectorGroup.Create=function(name,config,childCreator)
 {
  var items;
  items=ListModel.Create(function(item)
  {
   return item.Key;
  },List.map(function($1)
  {
   return SelectorItem.Create($1[0],$1[1]);
  },config));
  return SelectorGroup.New(Key.Fresh(),Var.Create$1(name),items,childCreator);
 };
 SelectorGroup.New=function(Key$1,Name,SelectorItems,ChildCreatator)
 {
  return new SelectorGroup({
   Key:Key$1,
   Name:Name,
   SelectorItems:SelectorItems,
   ChildCreatator:ChildCreatator
  });
 };
 WindowSelector=Dashboard.WindowSelector=Runtime.Class({
  get_RenderMenu:function()
  {
   var $this;
   $this=this;
   return this.SelectorGroups.get_Length()===1?List.head(List.ofSeq(this.SelectorGroups)).RenderMenu("",this.SelectedItem):Doc.Element("div",[],[Doc.ConvertBy(function(m)
   {
    return m.Key;
   },function(group)
   {
    return Doc.Element("div",[],[Doc.TextView(group.Name.v),group.RenderMenu("    ",$this.SelectedItem)]);
   },this.SelectorGroups.v)]);
  },
  get_Render:function()
  {
   return Doc.Element("div",[],[Doc.BindView(function(value)
   {
    return value.SelectorRenderer;
   },this.SelectedItem.v)]);
  },
  get_SelectedIndex:function()
  {
   var $this;
   $this=this;
   return Seq.findIndex(function(listItem)
   {
    return Unchecked.Equals(listItem.Key,$this.SelectedItem.c.Key);
   },List.concat(List.map(function(group)
   {
    return List.ofSeq(group.SelectorItems);
   },List.ofSeq(this.SelectorGroups))));
  },
  AppenGroup:function(name,config,childCreator)
  {
   this.SelectorGroups.Append(SelectorGroup.Create(name,config,childCreator));
  }
 },null,WindowSelector);
 WindowSelector.Create=function(name,config,childCreator)
 {
  var group,S;
  group=SelectorGroup.Create(name,config,childCreator);
  S=ListModel.Create(function(item)
  {
   return item.Key;
  },List.ofArray([group]));
  return WindowSelector.New(Var.Create$1(List.head(List.ofSeq(group.SelectorItems))),S);
 };
 WindowSelector.New=function(SelectedItem,SelectorGroups)
 {
  return new WindowSelector({
   SelectedItem:SelectedItem,
   SelectorGroups:SelectorGroups
  });
 };
 Dashboard$1=Dashboard.Dashboard=Runtime.Class({
  get_Render:function()
  {
   var $this;
   $this=this;
   return Doc.Element("div",[],[Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[AttrModule.Style("vertical-align","top")],[Doc.Element("table",[],Seq.concat([List.ofArray([Doc.Element("tr",[],[Doc.Element("td",[],[Helper.IconNormal("dehaze",function()
   {
   })])]),Doc.Element("tr",[],[Doc.Element("td",[],[Helper.IconNormal("add",function()
   {
    var selIndex,items,selected;
    selIndex=$this.EditorSelector.get_SelectedIndex();
    selIndex===1?(items=List.ofSeq($this.Factory.EventItems),selected=Var.Create$1(List.head(items)),$this.Dialog.ShowDialog("Select source",Doc.Element("div",[],[Doc.Select([AttrModule.Class("form-control")],function(item)
    {
     return item.Worker.Name.c;
    },items,selected)]),function()
    {
     var a;
     a=selected.c.Worker.get_CloneAndRun();
     $this.Data.RegisterEvent(Helper.UniqueKey(),a);
    })):selIndex===0?$this.CreatePanel("Panel",700,null):selIndex===2?$this.RulesEditor.RowItems.Append(RulesRowItem.Create([RulesCellItem.get_Create(),RulesCellItem.get_Create()])):void 0;
   })])])]),List.ofArray([this.EditorSelector.get_RenderMenu()]),List.ofArray([Doc.Element("tr",[],[Doc.Element("td",[],[])]),Doc.Element("tr",[],[Doc.Element("td",[],[this.PropertyGrid.get_Render()])])])]))]),Doc.Element("td",[],[this.EditorSelector.get_Render()])])]),Doc.Element("div",[],[this.Dialog.get_Render()])]);
  },
  Restore:function(panelList,events,widgets,dashEditorData)
  {
   var $this,a,a$1;
   $this=this;
   this.PanelContainer.PanelItems.Clear();
   this.Data.get_Clear();
   List.iter(function(panelConfig)
   {
    var panel;
    panel=$this.CreatePanel("Panel",700,{
     $:1,
     $0:panelConfig.Key
    });
    Var.Set(panel.Left,panelConfig.Left);
    Var.Set(panel.Top,panelConfig.Top);
   },panelList);
   a=function(key,event)
   {
    $this.Data.RegisterEvent(key,event);
   };
   List.iter(function($1)
   {
    return a($1[0],$1[1]);
   },events);
   console.log("Events restored");
   a$1=function(key,panelKey,widget)
   {
    $this.RegisterWidget(key,panelKey,Seq.find(function(entry)
    {
     return entry.Key===panelKey;
    },List.ofSeq($this.PanelContainer.PanelItems)).Children,widget.WithStartRunner());
   };
   List.iter(function($1)
   {
    return a$1($1[0],$1[1],$1[2]);
   },widgets);
   console.log("Widgets restored");
   this.RulesEditor.Restore(this.Data,dashEditorData);
   console.log("Connectors restored");
  },
  Store:function(fncFromWorker)
  {
   return[List.map(function(panel)
   {
    return panel.get_PanelData();
   },List.ofSeq(this.PanelContainer.PanelItems)),List.map(function(item)
   {
    return[item.Worker.Key,fncFromWorker(item.Worker)];
   },List.ofSeq(this.Data.EventItems)),List.map(function(item)
   {
    return[item.Widget.Key,item.Panel,fncFromWorker(item.Widget)];
   },List.ofSeq(this.Data.WidgetItems)),this.RulesEditor.get_CopyToRules()];
  },
  CreatePanel:function(name,cx,key)
  {
   var $this,keyDef,d,c,childContainerContent,panel;
   $this=this;
   Doc.ConvertBy(this.Data.WidgetItems.key,function(item)
   {
    return Doc.Element("div",[],[Doc.TextView(item.Widget.Name.v)]);
   },this.Data.WidgetItems.v);
   keyDef=(d=(c=Guid.NewGuid(),window.String(c)),key==null?d:key.$0);
   childContainerContent=PanelContainer.get_Create().WithLayoutManager(LayoutManagers.StackPanelLayoutManager()).WithAttributes([AttrModule.Style("border","1px solid white"),AttrModule.Style("display","flex")]);
   panel=Panel$1.get_Create().WithKey(keyDef).WithPannelAttrs([AttrModule.Style("Width",window.String(cx)+"px"),AttrModule.Style("position","absolute")]).WithTitleContent(Doc.TextNode(name)).WithTitleButtons(List.ofArray([TitleButton.New("add",function(panel$1)
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
     $this.RegisterWidget(Helper.UniqueKey(),panel$1.Key,panel$1.Children,selected.c.Worker.get_CloneAndRun());
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
    },List.ofSeq($this.Data.WidgetItems)))));
   }),TitleButton.New("clear",function(panel$1)
   {
    $this.PanelContainer.PanelItems.Remove($this.PanelContainer.FindPanelItem(panel$1));
   })])).WithChildPanelContainer(childContainerContent);
   this.PanelContainer.AddPanel(panel);
   return panel;
  },
  RegisterWidget:function(key,panelKey,toPanelContainer,worker)
  {
   this.Data.RegisterWidget(key,panelKey,worker);
   toPanelContainer.AddPanel(Panel$1.get_Create().WithTitle(false).WithPanelContent(worker.get_Render()));
  }
 },null,Dashboard$1);
 Dashboard$1.Create=function(panelContainer)
 {
  var dialog,rulesEditor,data,propertyGrid,editorSelector;
  dialog=Dialog.get_Create();
  rulesEditor=RulesEditor.get_Create();
  data=DshData.get_Create();
  propertyGrid=PropertyGrid$1.get_Create();
  editorSelector=WindowSelector.Create("root",List.ofArray([[Var.Create$1("Board"),panelContainer.get_Render()],[Var.Create$1("Events"),EventsEditor.Render(data,propertyGrid)],[Var.Create$1("Rules"),rulesEditor.Render(data)]]),null);
  return Dashboard$1.New(Factory.get_Create(),data,panelContainer,rulesEditor,propertyGrid,dialog,editorSelector);
 };
 Dashboard$1.New=function(Factory$1,Data$2,PanelContainer$1,RulesEditor$1,PropertyGrid$2,Dialog$1,EditorSelector)
 {
  return new Dashboard$1({
   Factory:Factory$1,
   Data:Data$2,
   PanelContainer:PanelContainer$1,
   RulesEditor:RulesEditor$1,
   PropertyGrid:PropertyGrid$2,
   Dialog:Dialog$1,
   EditorSelector:EditorSelector
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
 App.Register=function(dashboard)
 {
  var register;
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
  register=function(fnc,data)
  {
   var o;
   o=AppModelLib.FromDataContext(data),o==null?null:{
    $:1,
    $0:fnc(o.$0.get_Worker())
   };
  };
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
  SC$2.CreateDashboard=(dashboard=Dashboard$1.Create(PanelContainer.get_Create().WithLayoutManager(LayoutManagers.FloatingPanelLayoutManager(5)).WithWidth(800).WithHeight(420).WithAttributes([AttrModule.Style("border","1px solid white")])),(App.Register(dashboard),dashboard));
  SC$2.$cctor=window.ignore;
 });
}());
