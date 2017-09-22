(function()
{
 "use strict";
 var Global,WebSharper,Community,Dashboard,Environment,Role,SC$1,MessageBus,Value,Message,ListenerInfo,SystemStatus,AgentMessage,AgentState,SC$2,InPortData,InPort,OutPort,WorkerData,Worker,Workers,RuleEntry,RuleChain,RuleContainer,WorkerItem,Factory,RulesCellItem,RulesRowItem,SelectorGroup,WindowSelector,WidgetItem,EventsGroupItem,WidgetsGroupItem,RulesGroupItem,DshData,RulesEditor,DshHelper,Dashboard$1,Events,RandomEvent,DatabaseEventContext,DatabaseEvent,OpenWeather,Forecast,OpenWeatherEvent,ClockEvent,Widgets,TextBoxWidget,ChartWidgetContext,ChartWidget,ButtonWidget,AppModelLib,App,SC$3,AppDataHelper,AppData,IntelliFactory,Runtime,Operators,Panel,Helper,Date,List,Concurrency,Remoting,AjaxRemotingProvider,Utils,Control,MailboxProcessor,Seq,UI,Next,View,Var,PropertyGrid,Properties,MatchFailureException,System,Guid,Doc,Enumerator,Key,ListModel,Unchecked,AttrModule,Option,WrapControls,console,PanelContainer,LayoutManagers,Panel$1,TitleButton,Dialog,PropertyGrid$1,Random,Math,Data,TxtRuntime,FSharp,Data$1,Runtime$1,IO,JSON,Arrays,DateUtil,Charting,Renderers,ChartJs,FSharpEvent,Chart,LiveChart,Pervasives;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Dashboard=Community.Dashboard=Community.Dashboard||{};
 Environment=Dashboard.Environment=Dashboard.Environment||{};
 Role=Environment.Role=Environment.Role||{};
 SC$1=Global.StartupCode$WebSharper_Community_Dashboard$Environment=Global.StartupCode$WebSharper_Community_Dashboard$Environment||{};
 MessageBus=Dashboard.MessageBus=Dashboard.MessageBus||{};
 Value=MessageBus.Value=MessageBus.Value||{};
 Message=MessageBus.Message=MessageBus.Message||{};
 ListenerInfo=MessageBus.ListenerInfo=MessageBus.ListenerInfo||{};
 SystemStatus=MessageBus.SystemStatus=MessageBus.SystemStatus||{};
 AgentMessage=MessageBus.AgentMessage=MessageBus.AgentMessage||{};
 AgentState=MessageBus.AgentState=MessageBus.AgentState||{};
 SC$2=Global.StartupCode$WebSharper_Community_Dashboard$MessageBus=Global.StartupCode$WebSharper_Community_Dashboard$MessageBus||{};
 InPortData=Dashboard.InPortData=Dashboard.InPortData||{};
 InPort=Dashboard.InPort=Dashboard.InPort||{};
 OutPort=Dashboard.OutPort=Dashboard.OutPort||{};
 WorkerData=Dashboard.WorkerData=Dashboard.WorkerData||{};
 Worker=Dashboard.Worker=Dashboard.Worker||{};
 Workers=Dashboard.Workers=Dashboard.Workers||{};
 RuleEntry=Dashboard.RuleEntry=Dashboard.RuleEntry||{};
 RuleChain=Dashboard.RuleChain=Dashboard.RuleChain||{};
 RuleContainer=Dashboard.RuleContainer=Dashboard.RuleContainer||{};
 WorkerItem=Dashboard.WorkerItem=Dashboard.WorkerItem||{};
 Factory=Dashboard.Factory=Dashboard.Factory||{};
 RulesCellItem=Dashboard.RulesCellItem=Dashboard.RulesCellItem||{};
 RulesRowItem=Dashboard.RulesRowItem=Dashboard.RulesRowItem||{};
 SelectorGroup=Dashboard.SelectorGroup=Dashboard.SelectorGroup||{};
 WindowSelector=Dashboard.WindowSelector=Dashboard.WindowSelector||{};
 WidgetItem=Dashboard.WidgetItem=Dashboard.WidgetItem||{};
 EventsGroupItem=Dashboard.EventsGroupItem=Dashboard.EventsGroupItem||{};
 WidgetsGroupItem=Dashboard.WidgetsGroupItem=Dashboard.WidgetsGroupItem||{};
 RulesGroupItem=Dashboard.RulesGroupItem=Dashboard.RulesGroupItem||{};
 DshData=Dashboard.DshData=Dashboard.DshData||{};
 RulesEditor=Dashboard.RulesEditor=Dashboard.RulesEditor||{};
 DshHelper=Dashboard.DshHelper=Dashboard.DshHelper||{};
 Dashboard$1=Dashboard.Dashboard=Dashboard.Dashboard||{};
 Events=Dashboard.Events=Dashboard.Events||{};
 RandomEvent=Events.RandomEvent=Events.RandomEvent||{};
 DatabaseEventContext=Events.DatabaseEventContext=Events.DatabaseEventContext||{};
 DatabaseEvent=Events.DatabaseEvent=Events.DatabaseEvent||{};
 OpenWeather=Events.OpenWeather=Events.OpenWeather||{};
 Forecast=OpenWeather.Forecast=OpenWeather.Forecast||{};
 OpenWeatherEvent=Events.OpenWeatherEvent=Events.OpenWeatherEvent||{};
 ClockEvent=Events.ClockEvent=Events.ClockEvent||{};
 Widgets=Dashboard.Widgets=Dashboard.Widgets||{};
 TextBoxWidget=Widgets.TextBoxWidget=Widgets.TextBoxWidget||{};
 ChartWidgetContext=Widgets.ChartWidgetContext=Widgets.ChartWidgetContext||{};
 ChartWidget=Widgets.ChartWidget=Widgets.ChartWidget||{};
 ButtonWidget=Widgets.ButtonWidget=Widgets.ButtonWidget||{};
 AppModelLib=Dashboard.AppModelLib=Dashboard.AppModelLib||{};
 App=Dashboard.App=Dashboard.App||{};
 SC$3=Global.StartupCode$WebSharper_Community_Dashboard$AppModelLib=Global.StartupCode$WebSharper_Community_Dashboard$AppModelLib||{};
 AppDataHelper=Dashboard.AppDataHelper=Dashboard.AppDataHelper||{};
 AppData=Dashboard.AppData=Dashboard.AppData||{};
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
 Utils=WebSharper&&WebSharper.Utils;
 Control=WebSharper&&WebSharper.Control;
 MailboxProcessor=Control&&Control.MailboxProcessor;
 Seq=WebSharper&&WebSharper.Seq;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 View=Next&&Next.View;
 Var=Next&&Next.Var;
 PropertyGrid=Community&&Community.PropertyGrid;
 Properties=PropertyGrid&&PropertyGrid.Properties;
 MatchFailureException=WebSharper&&WebSharper.MatchFailureException;
 System=Global.System;
 Guid=System&&System.Guid;
 Doc=Next&&Next.Doc;
 Enumerator=WebSharper&&WebSharper.Enumerator;
 Key=Next&&Next.Key;
 ListModel=Next&&Next.ListModel;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 AttrModule=Next&&Next.AttrModule;
 Option=WebSharper&&WebSharper.Option;
 WrapControls=Panel&&Panel.WrapControls;
 console=Global.console;
 PanelContainer=Panel&&Panel.PanelContainer;
 LayoutManagers=Panel&&Panel.LayoutManagers;
 Panel$1=Panel&&Panel.Panel;
 TitleButton=Panel&&Panel.TitleButton;
 Dialog=Panel&&Panel.Dialog;
 PropertyGrid$1=PropertyGrid&&PropertyGrid.PropertyGrid;
 Random=WebSharper&&WebSharper.Random;
 Math=Global.Math;
 Data=WebSharper&&WebSharper.Data;
 TxtRuntime=Data&&Data.TxtRuntime;
 FSharp=Global.FSharp;
 Data$1=FSharp&&FSharp.Data;
 Runtime$1=Data$1&&Data$1.Runtime;
 IO=Runtime$1&&Runtime$1.IO;
 JSON=Global.JSON;
 Arrays=WebSharper&&WebSharper.Arrays;
 DateUtil=WebSharper&&WebSharper.DateUtil;
 Charting=WebSharper&&WebSharper.Charting;
 Renderers=Charting&&Charting.Renderers;
 ChartJs=Renderers&&Renderers.ChartJs;
 FSharpEvent=Control&&Control.FSharpEvent;
 Chart=Charting&&Charting.Chart;
 LiveChart=Charting&&Charting.LiveChart;
 Pervasives=Charting&&Charting.Pervasives;
 Role.Server={
  $:1
 };
 Role.Client={
  $:0
 };
 Environment.UpdateConfiguration=function()
 {
  SC$1.$cctor();
  return SC$1.UpdateConfiguration;
 };
 Environment.set_UpdateConfiguration=function($1)
 {
  SC$1.$cctor();
  SC$1.UpdateConfiguration=$1;
 };
 Environment.DataDirectory=function()
 {
  SC$1.$cctor();
  return SC$1.DataDirectory;
 };
 Environment.set_DataDirectory=function($1)
 {
  SC$1.$cctor();
  SC$1.DataDirectory=$1;
 };
 Environment.Log=function()
 {
  SC$1.$cctor();
  return SC$1.Log;
 };
 Environment.set_Log=function($1)
 {
  SC$1.$cctor();
  SC$1.Log=$1;
 };
 Environment.Role$1=function()
 {
  SC$1.$cctor();
  return SC$1.Role;
 };
 Environment.set_Role=function($1)
 {
  SC$1.$cctor();
  SC$1.Role=$1;
 };
 SC$1.$cctor=function()
 {
  SC$1.$cctor=Global.ignore;
  SC$1.Role=Role.Server;
  SC$1.Log=Global.ignore;
  SC$1.DataDirectory="";
  SC$1.UpdateConfiguration=Global.ignore;
 };
 Value=MessageBus.Value=Runtime.Class({
  get_trySystem:function()
  {
   return this.$==4?{
    $:1,
    $0:this.$0
   }:null;
  },
  get_AsSelect:function()
  {
   return this.$==3?this.$0:Operators.FailWith("MessageBus.Value: unexpected type");
  },
  get_AsBoolean:function()
  {
   return this.$==2?this.$0:((MessageBus.log())("MessageBus.Value: unexpected type"),false);
  },
  get_AsString:function()
  {
   return this.$==1?this.$0:((MessageBus.log())("MessageBus.Value: unexpected type"),"Invalid");
  },
  get_AsNumber:function()
  {
   return this.$==0?this.$0:((MessageBus.log())("MessageBus.Value: unexpected type"),0);
  }
 },null,Value);
 Message=MessageBus.Message=Runtime.Class({
  WithTime:function(time)
  {
   return Message.New(this.Key,time,this.Value);
  },
  WithKey:function(key)
  {
   return Message.New(key,this.Time,this.Value);
  }
 },null,Message);
 Message.Create=function(value)
 {
  return Message.New(Helper.UniqueKey(),Date.now(),value);
 };
 Message.New=function(Key$1,Time,Value$1)
 {
  return new Message({
   Key:Key$1,
   Time:Time,
   Value:Value$1
  });
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
 SystemStatus.Running={
  $:1
 };
 SystemStatus.Inactive={
  $:0
 };
 AgentMessage.Start={
  $:5
 };
 AgentMessage.Stop={
  $:4
 };
 AgentState.get_initListeners=function()
 {
  return List.ofArray([[ListenerInfo.Create("system","Configuration",1),function(msg)
  {
   var o;
   o=msg.Value.get_trySystem();
   o==null?void 0:(Environment.UpdateConfiguration())(o.$0.$0);
  },List.T.Empty]]);
 };
 AgentState.get_empty=function()
 {
  return AgentState.New(SystemStatus.Inactive,null,AgentState.get_initListeners(),(new Date(1,1-1,1)).getTime());
 };
 AgentState.New=function(SystemStatus$1,ServerCallback,Listeners,LastConfigurationTime)
 {
  return{
   SystemStatus:SystemStatus$1,
   ServerCallback:ServerCallback,
   Listeners:Listeners,
   LastConfigurationTime:LastConfigurationTime
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
       $:8,
       $0:r
      };
     },null),function(a)
     {
      return Concurrency.TryWith(Concurrency.Delay(function()
      {
       return Concurrency.Bind((new AjaxRemotingProvider.New()).Async("WebSharper.Community.Dashboard:WebSharper.Community.Dashboard.MessageBus.GetMessages:214660718",[a[0],a[1]]),function(a$1)
       {
        var x;
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
        return a$1.get_Length()>0?(List.iter(function(msg)
        {
         var x$1;
         x$1=(((Runtime.Curried3(function($1,$2,$3)
         {
          return $1(Utils.toSafe($2)+" "+Utils.toSafe($3));
         }))(Global.id))(msg.Key))(Global.String(msg.Time));
         (MessageBus.log())(x$1);
        },a$1),x=(function($1)
        {
         return function($2)
         {
          return $1("Values from server requested messages received:"+Global.String($2));
         };
        }(Global.id))(a$1.get_Length()),(MessageBus.log())(x),Concurrency.Zero()):Concurrency.Zero();
       });
      }),function()
      {
       return Concurrency.Zero();
      });
     });
    });
   }));
  })),null);
 };
 MessageBus.Agent=function()
 {
  SC$2.$cctor();
  return SC$2.Agent;
 };
 MessageBus.CreateMessage=function(value)
 {
  return Message.New(Helper.UniqueKey(),Date.now(),value);
 };
 MessageBus.log=function()
 {
  SC$2.$cctor();
  return SC$2.log;
 };
 SC$2.$cctor=function()
 {
  SC$2.$cctor=Global.ignore;
  SC$2.log=Environment.Log();
  SC$2.Agent=MailboxProcessor.Start(function(inbox)
  {
   function cutBuffer(time,buffer)
   {
    return Seq.fold(function(acc,item)
    {
     var c;
     return(c=item.Time-time,c/1000)>0.01?new List.T({
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
     var listener,x;
     listener=Global.Array.prototype.slice.call(arguments);
     if(info.Key===message.Key)
      {
       try
       {
        callback(message);
       }
       catch(ex)
       {
        x=(function($1)
        {
         return function($2)
         {
          return $1("Fails send message. It might be that receiver doesn't expect message of this type: "+Utils.toSafe($2));
         };
        }(Global.id))(info.Name);
        (MessageBus.log())(x);
       }
       return[info,callback,update_and_split(info.CacheSize,buf,message)];
      }
     else
      return listener;
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
      var listenerInfo,x,maxTimes,message,m,message$1,o;
      function getMsgs(time,listeners)
      {
       function m$2(info,a$1,buffer)
       {
        return cutBuffer(time,buffer);
       }
       return List.sortBy(function(msg)
       {
        return msg.Time;
       },Seq.fold(function(acc,state$1)
       {
        return!List.contains(state$1,acc)?new List.T({
         $:1,
         $0:state$1,
         $1:acc
        }):acc;
       },List.T.Empty,List.concat(List.map(function($1)
       {
        return m$2($1[0],$1[1],$1[2]);
       },listeners))));
      }
      function p(info,a$1,a$2)
      {
       return info.Key==="system";
      }
      function p$1(info,a$1,a$2)
      {
       return info.Key!=="system";
      }
      function m$1(info,a$1,buffer)
      {
       return buffer.$==0?(new Date(1,1-1,1)).getTime():List.maxBy(function(item)
       {
        return item.Time;
       },buffer).Time;
      }
      return a.$==5?loop(AgentState.New(SystemStatus.Running,state.ServerCallback,state.Listeners,state.LastConfigurationTime)):a.$==6?(a.$0(state.SystemStatus),loop(state)):a.$==2?(listenerInfo=a.$0[0],(x=(((Runtime.Curried3(function($1,$2,$3)
      {
       return $1("RegisterListener:"+Utils.toSafe($2)+" "+Utils.toSafe($3));
      }))(Global.id))(listenerInfo.Name))(listenerInfo.Key),(MessageBus.log())(x),loop(AgentState.New(state.SystemStatus,state.ServerCallback,new List.T({
       $:1,
       $0:[listenerInfo,a.$0[1],List.T.Empty],
       $1:state.Listeners
      }),state.LastConfigurationTime)))):a.$==3?loop(AgentState.New(state.SystemStatus,{
       $:1,
       $0:a.$0
      },state.Listeners,state.LastConfigurationTime)):a.$==7?(a.$0[2](List.append(getMsgs(a.$0[0],List.filter(function($1)
      {
       return p($1[0],$1[1],$1[2]);
      },state.Listeners)),getMsgs(a.$0[1],List.filter(function($1)
      {
       return p$1($1[0],$1[1],$1[2]);
      },state.Listeners)))),loop(state)):a.$==8?(maxTimes=List.map(function($1)
      {
       return m$1($1[0],$1[1],$1[2]);
      },state.Listeners),(a.$0([state.LastConfigurationTime,maxTimes.$==0?(new Date(1,1-1,1)).getTime():List.max(maxTimes)]),loop(state))):a.$==1?(message=a.$0,(m=message.Value.get_trySystem(),m==null?loop(AgentState.New(state.SystemStatus,state.ServerCallback,send_to_listeners(message,state.Listeners),state.LastConfigurationTime)):Concurrency.Combine(((Environment.UpdateConfiguration())(m.$0.$0),Concurrency.Zero()),Concurrency.Delay(function()
      {
       return loop(AgentState.New(state.SystemStatus,state.ServerCallback,state.Listeners,message.Time));
      })))):a.$==0?(message$1=a.$0,(o=state.ServerCallback,o==null?void 0:o.$0(message$1),loop(AgentState.New(state.SystemStatus,state.ServerCallback,send_to_listeners(message$1,state.Listeners),state.LastConfigurationTime)))):loop(AgentState.New(SystemStatus.Inactive,state.ServerCallback,AgentState.get_initListeners(),state.LastConfigurationTime));
     });
    });
   }
   return loop(AgentState.get_empty());
  },null);
 };
 InPortData=Dashboard.InPortData=Runtime.Class({
  WithCacheSize:function(cacheSize)
  {
   return InPortData.New(this.Key,this.Name,this.Value,cacheSize);
  }
 },null,InPortData);
 InPortData.CreateSelect=function(name,value)
 {
  return InPortData.Create(name,new Value({
   $:3,
   $0:value
  }));
 };
 InPortData.CreateBoolean=function(name,value)
 {
  return InPortData.Create(name,new Value({
   $:2,
   $0:value
  }));
 };
 InPortData.CreateString=function(name,value)
 {
  return InPortData.Create(name,new Value({
   $:1,
   $0:value
  }));
 };
 InPortData.CreateNumber=function(name,value)
 {
  return InPortData.Create(name,new Value({
   $:0,
   $0:value
  }));
 };
 InPortData.Create=function(name,value)
 {
  var msg;
  msg=MessageBus.CreateMessage(value);
  return InPortData.New(msg.Key,name,msg.WithTime((new Date(1,1-1,1)).getTime()),1);
 };
 InPortData.New=function(Key$1,Name,Value$1,CacheSize)
 {
  return new InPortData({
   Key:Key$1,
   Name:Name,
   Value:Value$1,
   CacheSize:CacheSize
  });
 };
 InPort=Dashboard.InPort=Runtime.Class({
  get_SelectView:function()
  {
   return View.Map(function(value)
   {
    return value.Value.get_AsSelect();
   },this.PortValue.v);
  },
  get_Select:function()
  {
   return this.PortValue.c.Value.get_AsSelect();
  },
  get_BooleanView:function()
  {
   return View.Map(function(value)
   {
    return value.Value.get_AsBoolean();
   },this.PortValue.v);
  },
  get_Boolean:function()
  {
   return this.PortValue.c.Value.get_AsBoolean();
  },
  get_StringView:function()
  {
   return View.Map(function(value)
   {
    return value.Value.get_AsString();
   },this.PortValue.v);
  },
  get_String:function()
  {
   return this.PortValue.c.Value.get_AsString();
  },
  get_NumberView:function()
  {
   return View.Map(function(value)
   {
    return value.Value.get_AsNumber();
   },this.PortValue.v);
  },
  get_Number:function()
  {
   return this.PortValue.c.Value.get_AsNumber();
  },
  Receive:function(value)
  {
   Var.Set(this.PortValue,value);
  },
  get_Property:function()
  {
   var _var,_var$1,_var$2,sel_list,_var$3,$this,m;
   $this=this;
   m=this.PortValue.c.Value;
   if(m.$==0)
    {
     _var=Var.Create$1(this.get_Number());
     View.Sink(function(entry)
     {
      var i;
      Var.Set($this.PortValue,(i=$this.PortValue.c,Message.New(i.Key,i.Time,new Value({
       $:0,
       $0:entry
      }))));
     },_var.v);
     return Properties["double"](this.Data.Name,_var);
    }
   else
    if(m.$==1)
     {
      _var$1=Var.Create$1(this.get_String());
      View.Sink(function(entry)
      {
       var i;
       Var.Set($this.PortValue,(i=$this.PortValue.c,Message.New(i.Key,i.Time,new Value({
        $:1,
        $0:entry
       }))));
      },_var$1.v);
      return Properties.string(this.Data.Name,_var$1);
     }
    else
     if(m.$==2)
      {
       _var$2=Var.Create$1(this.get_Boolean());
       View.Sink(function(entry)
       {
        var i;
        Var.Set($this.PortValue,(i=$this.PortValue.c,Message.New(i.Key,i.Time,new Value({
         $:2,
         $0:entry
        }))));
       },_var$2.v);
       return Properties.check(this.Data.Name,_var$2);
      }
     else
      if(m.$==3)
       {
        sel_list=m.$0[1];
        _var$3=Var.Create$1(sel_list.get_Item(m.$0[0]));
        View.Sink(function(entry)
        {
         var i;
         Var.Set($this.PortValue,(i=$this.PortValue.c,Message.New(i.Key,i.Time,new Value({
          $:3,
          $0:[Seq.findIndex(function(str)
          {
           return str===entry;
          },sel_list),sel_list]
         }))));
        },_var$3.v);
        return Properties.select(this.Data.Name,Global.id,sel_list,_var$3);
       }
      else
       throw new MatchFailureException.New("Port.fs",38,30);
  },
  get_Key:function()
  {
   return this.Data.Key;
  },
  get_Name:function()
  {
   return this.Data.Name;
  }
 },null,InPort);
 InPort.Clone=function(port)
 {
  var i,c;
  return InPort.New((i=port.Data,InPortData.New((c=Guid.NewGuid(),Global.String(c)),i.Name,i.Value,i.CacheSize)),Var.Create$1(port.PortValue.c));
 };
 InPort.ToData=function(port)
 {
  var i;
  i=port.Data;
  return InPortData.New(i.Key,i.Name,port.PortValue.c,i.CacheSize);
 };
 InPort.FromData=function(data)
 {
  return InPort.New(data,Var.Create$1(data.Value));
 };
 InPort.New=function(Data$2,PortValue)
 {
  return new InPort({
   Data:Data$2,
   PortValue:PortValue
  });
 };
 OutPort=Dashboard.OutPort=Runtime.Class({
  Trigger:function(value)
  {
   var a,_this;
   a={
    $:0,
    $0:MessageBus.CreateMessage(value).WithKey(this.Key)
   };
   _this=MessageBus.Agent();
   _this.mailbox.AddLast(a);
   _this.resume();
  }
 },null,OutPort);
 OutPort.Clone=function(port)
 {
  return OutPort.New(Helper.UniqueKey(),port.Name);
 };
 OutPort.Create=function(name)
 {
  return OutPort.New(Helper.UniqueKey(),name);
 };
 OutPort.New=function(Key$1,Name)
 {
  return new OutPort({
   Key:Key$1,
   Name:Name
  });
 };
 WorkerData.Create=function(name,inPorts,outPorts)
 {
  return WorkerData.New(name,inPorts,outPorts);
 };
 WorkerData.New=function(WorkerName,InPorts,OutPorts)
 {
  return{
   WorkerName:WorkerName,
   InPorts:InPorts,
   OutPorts:OutPorts
  };
 };
 Worker=Dashboard.Worker=Runtime.Class({
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
   m=this.Data.WebSharper_Community_Dashboard_IWorkerData$get_Render();
   return m==null?Doc.Empty():m.$0(this);
  },
  get_Clone:function()
  {
   return Worker.New(Helper.UniqueKey(),Var.Create$1(this.Name.c),List.map(InPort.Clone,this.InPorts),List.map(OutPort.Clone,this.OutPorts),this.Data,Var.Create$1(null));
  },
  get_ToData:function()
  {
   return WorkerData.New(this.Name.c,List.map(InPort.ToData,this.InPorts),this.OutPorts);
  },
  StartRunner:function()
  {
   var m;
   m=this.Data.WebSharper_Community_Dashboard_IWorkerData$get_Run();
   m==null?void 0:Var.Set(this.RunnerContext,m.$0(this));
  },
  WithKey:function(key)
  {
   return Worker.New(key,this.Name,this.InPorts,this.OutPorts,this.Data,this.RunnerContext);
  }
 },null,Worker);
 Worker.Create=function(dataContext)
 {
  return Worker.New(Helper.UniqueKey(),Var.Create$1(dataContext.WebSharper_Community_Dashboard_IWorkerData$get_Data().WorkerName),List.map(InPort.FromData,dataContext.WebSharper_Community_Dashboard_IWorkerData$get_Data().InPorts),dataContext.WebSharper_Community_Dashboard_IWorkerData$get_Data().OutPorts,dataContext,Var.Create$1(null));
 };
 Worker.New=function(Key$1,Name,InPorts,OutPorts,Data$2,RunnerContext)
 {
  return new Worker({
   Key:Key$1,
   Name:Name,
   InPorts:InPorts,
   OutPorts:OutPorts,
   Data:Data$2,
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
   var log,allOutPorts,allInPorts;
   log=Environment.Log();
   allOutPorts=Workers.allOutPorts(workers);
   allInPorts=Workers.allInPorts(workers);
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
       var i$1,cell1,cell2,o,outPort,o$1,inPort,_this;
       i$1=e.Current();
       cell1=cells.get_Item(i$1-1);
       cell2=cells.get_Item(i$1);
       o=Seq.tryFind(function(port)
       {
        return port.Key===cell1.OutPortKey;
       },allOutPorts),o==null?null:{
        $:1,
        $0:(outPort=o.$0,(o$1=Seq.tryFind(function(port)
        {
         return port.Data.Key===cell2.InPortKey;
        },allInPorts),o$1==null?null:{
         $:1,
         $0:(inPort=o$1.$0,(log("Found inPort"),inPort.PortValue.c.Key!==inPort.Data.Key?Var.Set(inPort.PortValue,inPort.PortValue.c.WithKey(inPort.Data.Key)):void 0,_this=MessageBus.Agent(),_this.mailbox.AddLast({
          $:2,
          $0:[ListenerInfo.Create(outPort.Key,outPort.Name+"->"+inPort.get_Name(),inPort.Data.CacheSize),function(a)
          {
           inPort.Receive(a);
          }]
         }),_this.resume()))
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
 RulesCellItem=Dashboard.RulesCellItem=Runtime.Class({
  Render:function(workItems,reconnectFnc)
  {
   var $this,workerSelector,inPorts,outPorts,items;
   $this=this;
   View.Sink(function(optWorker)
   {
    var workerItem,m,port,m$1,port$1;
    if(optWorker==null)
     ;
    else
     {
      workerItem=optWorker.$0;
      m=$this.OptInPort.c;
      m==null?Var.Set($this.OptInPort,List.tryHead(workerItem.Worker.InPorts)):(port=m.$0,!List.exists(function(entry)
      {
       return Unchecked.Equals(entry,port);
      },workerItem.Worker.InPorts)?Var.Set($this.OptInPort,List.tryHead(workerItem.Worker.InPorts)):void 0);
      m$1=$this.OptOutPort.c;
      m$1==null?Var.Set($this.OptOutPort,List.tryHead(workerItem.Worker.OutPorts)):(port$1=m$1.$0,!List.exists(function(entry)
      {
       return Unchecked.Equals(entry,port$1);
      },workerItem.Worker.OutPorts)?Var.Set($this.OptOutPort,List.tryHead(workerItem.Worker.OutPorts)):void 0);
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
     return port.get_Name();
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
 SelectorGroup=Dashboard.SelectorGroup=Runtime.Class({
  RenderMenu:function(offset,selectedItemVar,withControls)
  {
   var $this,moveItem,i,plus,m,creator;
   function icons(item)
   {
    return List.ofArray([Helper.IconSmall("keyboard_arrow_down",function()
    {
     (moveItem(true))(item);
     ($this.ItemOnMove(item))({
      $:1
     });
    }),Helper.IconSmall("keyboard_arrow_up",function()
    {
     (moveItem(false))(item);
     ($this.ItemOnMove(item))({
      $:0
     });
    }),Helper.IconSmall("clear",function()
    {
     $this.SelectorItems.Remove(item);
     $this.ItemOnDelete(item);
    })]);
   }
   $this=this;
   moveItem=(i=this.SelectorItems,(Runtime.Curried3(Helper.MoveItemInModelList))(i));
   plus=(m=this.ItemCreatator,m==null?Doc.Element("tr",[],[]):(creator=m.$0,Doc.Element("tr",[],[Doc.Element("td",[],[Doc.Element("div",[AttrModule.Style("margin-left","20px")],[Helper.IconSmall("add",function()
   {
    var item;
    item=creator();
    $this.ItemOnCreated(item);
    $this.SelectorItems.Append(item);
   })])])])));
   return Doc.Element("table",[],[Doc.ConvertBy(function(m$1)
   {
    return m$1.WebSharper_Community_Dashboard_ISelectorItem$get_Key();
   },function(item)
   {
    var mapName,x,i$1,a;
    mapName=View.Map(function(name)
    {
     return offset+name;
    },item.WebSharper_Community_Dashboard_ISelectorItem$get_Name().v);
    return Doc.Element("tr",[],[Doc.Element("td",[AttrModule.DynamicStyle("Color",View.Map(function(selItemVar)
    {
     return selItemVar==null?"#7D4600":Unchecked.Equals(selItemVar.$0.WebSharper_Community_Dashboard_ISelectorItem$get_Key(),item.WebSharper_Community_Dashboard_ISelectorItem$get_Key())?"#FB8C00":"#7D4600";
    },selectedItemVar.v))],[(x=Doc.Element("div",[AttrModule.Style("margin-left","10px"),AttrModule.Style("margin-right","5px"),AttrModule.Style("cursor","pointer"),AttrModule.Handler("click",function()
    {
     return function()
     {
      $this.ItemOnSelected(item);
      return Var.Set(selectedItemVar,{
       $:1,
       $0:item
      });
     };
    })],[Doc.TextView(mapName)]),(withControls?(i$1=icons(item),(a=Panel.WrapControlsAligment.Horizontal,function(c)
    {
     return WrapControls.Render(i$1,a,c);
    })):Global.id)(x))])]);
   },this.SelectorItems.v),plus]);
  },
  Render:function(selectedItemVar)
  {
   return Doc.ConvertBy(function(m)
   {
    return m.WebSharper_Community_Dashboard_ISelectorItem$get_Key();
   },function(item)
   {
    return Doc.Element("div",[AttrModule.DynamicStyle("display",View.Map(function(selectedItemOpt)
    {
     return selectedItemOpt==null?"none":Unchecked.Equals(selectedItemOpt.$0,item)?"block":"none";
    },selectedItemVar.v))],[item.WebSharper_Community_Dashboard_ISelectorItem$get_Render()]);
   },this.SelectorItems.v);
  }
 },null,SelectorGroup);
 SelectorGroup.Create=function(name,items,itemCreator,itemOnCreated,itemOnSelected,itemOnDelete,itemOnMove)
 {
  var modelItems;
  modelItems=ListModel.Create(function(item)
  {
   return item.WebSharper_Community_Dashboard_ISelectorItem$get_Key();
  },items);
  return SelectorGroup.New(Key.Fresh(),Var.Create$1(name),modelItems,itemCreator,itemOnCreated,itemOnSelected,itemOnDelete,itemOnMove);
 };
 SelectorGroup.New=function(Key$1,Name,SelectorItems,ItemCreatator,ItemOnCreated,ItemOnSelected,ItemOnDelete,ItemOnMove)
 {
  return new SelectorGroup({
   Key:Key$1,
   Name:Name,
   SelectorItems:SelectorItems,
   ItemCreatator:ItemCreatator,
   ItemOnCreated:ItemOnCreated,
   ItemOnSelected:ItemOnSelected,
   ItemOnDelete:ItemOnDelete,
   ItemOnMove:ItemOnMove
  });
 };
 WindowSelector=Dashboard.WindowSelector=Runtime.Class({
  get_RenderMenu:function()
  {
   var $this;
   $this=this;
   return this.SelectorGroups.get_Length()===1?List.head(List.ofSeq(this.SelectorGroups)).RenderMenu("",this.OptSelectedItem,this.IsWithControls):Doc.Element("div",[],[Doc.ConvertBy(function(m)
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
    })],[Doc.TextView(group.Name.v)]),group.RenderMenu("    ",$this.OptSelectedItem,$this.IsWithControls)]);
   },this.SelectorGroups.v)]);
  },
  get_Render:function()
  {
   var $this;
   $this=this;
   return Doc.Element("div",[],[Doc.ConvertBy(function(m)
   {
    return m.Key;
   },function(group)
   {
    return group.Render($this.OptSelectedItem);
   },this.SelectorGroups.v)]);
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
    return Unchecked.Equals(listItem.WebSharper_Community_Dashboard_ISelectorItem$get_Key(),$this.get_SelectedItem().WebSharper_Community_Dashboard_ISelectorItem$get_Key());
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
    return Unchecked.Equals(listItem.WebSharper_Community_Dashboard_ISelectorItem$get_Key(),$this.get_SelectedItem().WebSharper_Community_Dashboard_ISelectorItem$get_Key());
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
     return Unchecked.Equals(entry.WebSharper_Community_Dashboard_ISelectorItem$get_Key(),item.WebSharper_Community_Dashboard_ISelectorItem$get_Key());
    },List.ofSeq(group.SelectorItems));
   },List.ofSeq(this.SelectorGroups));
  },
  AppenGroup:function(name,config,childCreator)
  {
   var ind;
   ind=this.SelectorGroups.get_Length();
   this.SelectorGroups.Append(SelectorGroup.Create(name,config,childCreator,this.ItemOnCreated(ind),this.ItemOnSelected,this.ItemOnDeleted(ind),this.ItemOnMove(ind)));
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
  WithControls:function(withControls)
  {
   return WindowSelector.New(this.OptSelectedItem,this.SelectorGroups,this.ItemOnCreated,this.GroupOnClick,this.ItemOnSelected,this.ItemOnDeleted,this.ItemOnMove,withControls);
  },
  WithItemOnMove:function(onMoveFnc)
  {
   return WindowSelector.New(this.OptSelectedItem,this.SelectorGroups,this.ItemOnCreated,this.GroupOnClick,this.ItemOnSelected,this.ItemOnDeleted,onMoveFnc,this.IsWithControls);
  },
  WithItemOnDeleted:function(onDeletedFnc)
  {
   return WindowSelector.New(this.OptSelectedItem,this.SelectorGroups,this.ItemOnCreated,this.GroupOnClick,this.ItemOnSelected,onDeletedFnc,this.ItemOnMove,this.IsWithControls);
  },
  WithItemOnSelected:function(onSelectedFnc)
  {
   return WindowSelector.New(this.OptSelectedItem,this.SelectorGroups,this.ItemOnCreated,this.GroupOnClick,onSelectedFnc,this.ItemOnDeleted,this.ItemOnMove,this.IsWithControls);
  },
  WithGroupOnClick:function(onClickFnc)
  {
   return WindowSelector.New(this.OptSelectedItem,this.SelectorGroups,this.ItemOnCreated,onClickFnc,this.ItemOnSelected,this.ItemOnDeleted,this.ItemOnMove,this.IsWithControls);
  },
  WithItemOnCreated:function(onCreatedFnc)
  {
   return WindowSelector.New(this.OptSelectedItem,this.SelectorGroups,onCreatedFnc,this.GroupOnClick,this.ItemOnSelected,this.ItemOnDeleted,this.ItemOnMove,this.IsWithControls);
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
  },Global.ignore,Global.ignore,function()
  {
   return function()
   {
    return null;
   };
  },Runtime.Curried3(function($1,$2,$3)
  {
   return null;
  }),false);
 };
 WindowSelector.New=function(OptSelectedItem,SelectorGroups,ItemOnCreated,GroupOnClick,ItemOnSelected,ItemOnDeleted,ItemOnMove,IsWithControls)
 {
  return new WindowSelector({
   OptSelectedItem:OptSelectedItem,
   SelectorGroups:SelectorGroups,
   ItemOnCreated:ItemOnCreated,
   GroupOnClick:GroupOnClick,
   ItemOnSelected:ItemOnSelected,
   ItemOnDeleted:ItemOnDeleted,
   ItemOnMove:ItemOnMove,
   IsWithControls:IsWithControls
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
 EventsGroupItem=Dashboard.EventsGroupItem=Runtime.Class({
  get_Render:function()
  {
   var $this,moveItem,i;
   function icons(item)
   {
    return List.ofArray([Helper.IconSmall("keyboard_arrow_down",function()
    {
     (moveItem(true))(item);
    }),Helper.IconSmall("keyboard_arrow_up",function()
    {
     (moveItem(false))(item);
    }),Helper.IconSmall("clear",function()
    {
     $this.EventItems.Remove(item);
    })]);
   }
   $this=this;
   moveItem=(i=this.EventItems,(Runtime.Curried3(Helper.MoveItemInModelList))(i));
   return Doc.Element("table",[],[Doc.ConvertBy(function(m)
   {
    return m.Key;
   },function(item)
   {
    var x;
    return Doc.Element("tr",[],[(x=Doc.Element("div",Helper.AttrsClick(function()
    {
     $this.PropertyGrid.Edit(item.Worker.get_Properties());
    }),[Doc.TextView(item.Worker.Name.v)]),WrapControls.Render(icons(item),Panel.WrapControlsAligment.Horizontal,x))]);
   },this.EventItems.v)]);
  },
  WebSharper_Community_Dashboard_ISelectorItem$get_Render:function()
  {
   return this.get_Render();
  },
  WebSharper_Community_Dashboard_ISelectorItem$get_Name:function()
  {
   return this.Name;
  },
  WebSharper_Community_Dashboard_ISelectorItem$get_Key:function()
  {
   return this.Key;
  }
 },null,EventsGroupItem);
 EventsGroupItem.Create=function(name,propertyGrid)
 {
  return EventsGroupItem.New(Key.Fresh(),Var.Create$1(name),ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty),propertyGrid);
 };
 EventsGroupItem.New=function(Key$1,Name,EventItems,PropertyGrid$2)
 {
  return new EventsGroupItem({
   Key:Key$1,
   Name:Name,
   EventItems:EventItems,
   PropertyGrid:PropertyGrid$2
  });
 };
 WidgetsGroupItem=Dashboard.WidgetsGroupItem=Runtime.Class({
  get_Render:function()
  {
   return this.PanelContainer.get_Render();
  },
  WebSharper_Community_Dashboard_ISelectorItem$get_Render:function()
  {
   return this.get_Render();
  },
  WebSharper_Community_Dashboard_ISelectorItem$get_Name:function()
  {
   return this.Name;
  },
  WebSharper_Community_Dashboard_ISelectorItem$get_Key:function()
  {
   return this.Key;
  }
 },null,WidgetsGroupItem);
 WidgetsGroupItem.Create=function(name,panelContainer)
 {
  return WidgetsGroupItem.New(Key.Fresh(),Var.Create$1(name),ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty),panelContainer);
 };
 WidgetsGroupItem.New=function(Key$1,Name,WidgetItems,PanelContainer$1)
 {
  return new WidgetsGroupItem({
   Key:Key$1,
   Name:Name,
   WidgetItems:WidgetItems,
   PanelContainer:PanelContainer$1
  });
 };
 RulesGroupItem=Dashboard.RulesGroupItem=Runtime.Class({
  Equals:function(y)
  {
   return y instanceof RulesGroupItem&&Unchecked.Equals(this.Key,y.Key);
  },
  get_Render:function()
  {
   return this.Renderer(this.RulesRowItems);
  },
  WebSharper_Community_Dashboard_ISelectorItem$get_Render:function()
  {
   return this.get_Render();
  },
  WebSharper_Community_Dashboard_ISelectorItem$get_Name:function()
  {
   return this.Name;
  },
  WebSharper_Community_Dashboard_ISelectorItem$get_Key:function()
  {
   return this.Key;
  }
 },null,RulesGroupItem);
 RulesGroupItem.Create=function(name,renderer)
 {
  return RulesGroupItem.New(Key.Fresh(),Var.Create$1(name),ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty),renderer);
 };
 RulesGroupItem.New=function(Key$1,Name,RulesRowItems,Renderer)
 {
  return new RulesGroupItem({
   Key:Key$1,
   Name:Name,
   RulesRowItems:RulesRowItems,
   Renderer:Renderer
  });
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
 RulesEditor.Render=function(data,rowItems)
 {
  function moveItem(i,i$1)
  {
   return Helper.MoveItemInModelList(rowItems,i,i$1);
  }
  function icons(item)
  {
   return List.ofArray([Helper.IconSmall("keyboard_arrow_down",function()
   {
    moveItem(true,item);
   }),Helper.IconSmall("keyboard_arrow_up",function()
   {
    moveItem(false,item);
   }),Helper.IconSmall("clear",function()
   {
    rowItems.Remove(item);
   })]);
  }
  function reconnectFnc()
  {
   var b;
   Concurrency.Start((b=null,Concurrency.Delay(function()
   {
    return Concurrency.Bind(MessageBus.Agent().PostAndAsyncReply(function(r)
    {
     return{
      $:6,
      $0:r
     };
    },null),function(a)
    {
     var _this,x,_this$1;
     return a.$==1?(_this=MessageBus.Agent(),_this.mailbox.AddLast(AgentMessage.Stop),_this.resume(),x=List.map(function(item)
     {
      return item.Worker;
     },List.ofSeq(data.WorkItems)),RulesEditor.CopyToRules(rowItems).Reconnect(x),_this$1=MessageBus.Agent(),_this$1.mailbox.AddLast(AgentMessage.Start),_this$1.resume(),Concurrency.Zero()):Concurrency.Zero();
    });
   })),null);
  }
  return Doc.Element("table",[],[Doc.ConvertBy(function(m)
  {
   return m.Key;
  },function(item)
  {
   var x;
   return Doc.Element("tr",[],[(x=item.Render(data.WorkItems,function()
   {
    reconnectFnc();
   }),WrapControls.Render(icons(item),Panel.WrapControlsAligment.Horizontal,x))]);
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
     return port.get_Key()===cellData.InPortKey;
    },allInPorts));
    Var.Set(cell.OptOutPort,Seq.tryFind(function(port)
    {
     return port.Key===cellData.OutPortKey;
    },allOutPorts));
    row.CellItems.Append(cell);
   },rowData.RuleChain);
   rowItems.Append(row);
  },rules.RuleContainer);
 };
 RulesEditor.CopyToRules=function(rowItems)
 {
  return RuleContainer.New(List.map(function(row)
  {
   return RuleChain.New(List.map(function(cell)
   {
    var m,m$1,m$2;
    return RuleEntry.New((m=cell.OptInPort.c,m==null?"":m.$0.get_Key()),(m$1=cell.OptOutPort.c,m$1==null?"":m$1.$0.Key),(m$2=cell.OptWorker.c,m$2==null?"":m$2.$0.Worker.Key));
   },List.ofSeq(row.CellItems)));
  },List.ofSeq(rowItems)));
 };
 DshHelper.RulesGroupCreator=function(data,a)
 {
  var grItem;
  grItem=RulesGroupItem.Create("rules"+Global.String(List.length(List.ofSeq(data.RulesGroups))+1),function(r)
  {
   return RulesEditor.Render(data,r);
  });
  data.RulesGroups.Append(grItem);
  return grItem;
 };
 DshHelper.EventsGroupCreator=function(data,propertyGrid,a)
 {
  var grItem;
  grItem=EventsGroupItem.Create("event"+Global.String(List.length(List.ofSeq(data.EventGroups))+1),propertyGrid);
  data.EventGroups.Append(grItem);
  return grItem;
 };
 DshHelper.PanelGroupCreator=function(data,panelContainerCreator,a)
 {
  var grItem;
  grItem=WidgetsGroupItem.Create("panel"+Global.String(List.length(List.ofSeq(data.WidgetGroups))+1),panelContainerCreator());
  data.WidgetGroups.Append(grItem);
  return grItem;
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
      event=selected.c.Worker.get_Clone();
      event.StartRunner();
      a=(x$2=List.ofSeq($this.Data.EventGroups),Seq.nth($this.EditorSelectorEdit.get_SelectedIndexInGroup(),x$2));
      $this.Data.RegisterEvent(Helper.UniqueKey(),a,event);
     })):selIndex===0?Var.Set($this.CreatePanel((x=List.ofSeq($this.Data.WidgetGroups),Seq.nth($this.EditorSelectorEdit.get_SelectedIndexInGroup(),x)),"Panel",null).IsWithInitialAutoLayout,true):selIndex===2?(x$1=List.ofSeq($this.Data.RulesGroups),Seq.nth($this.EditorSelectorEdit.get_SelectedIndexInGroup(),x$1)).RulesRowItems.Append(RulesRowItem.Create([RulesCellItem.get_Create(),RulesCellItem.get_Create()])):void 0;
    }),$this.EditorSelectorEdit.get_Render()])])]),Doc.Element("div",[],[$this.Dialog.get_Render()])]):Doc.Element("div",[],[Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[AttrModule.Style("vertical-align","top")],[Helper.IconNormal("dehaze",function()
    {
     Var.Set($this.PanelTitleVisibility,true);
     Var.Set($this.Mode,{
      $:1
     });
    }),$this.EditorSelectorRun.get_RenderMenu()]),Doc.Element("td",[],[$this.EditorSelectorRun.get_Render()])])])]);
   },this.Mode.v));
  },
  Restore:function(panelCreator,events,widgets,rules)
  {
   var $this,_this,gSelectorPanelsRun,gSelectorPanelsEdit,gSelectorEvents,gSelectorRules,allWorkers,_this$1;
   function a(grName,rules$1)
   {
    rules$1.Reconnect(allWorkers);
   }
   $this=this;
   _this=MessageBus.Agent();
   _this.mailbox.AddLast(AgentMessage.Stop);
   _this.resume();
   this.EditorSelectorRun.ClearGroups();
   this.EditorSelectorEdit.ClearGroups();
   this.Data.get_Clear();
   this.PropertyGrid.Edit(List.T.Empty);
   gSelectorPanelsRun=this.EditorSelectorRun.GroupByIndex(0);
   gSelectorPanelsEdit=this.EditorSelectorEdit.GroupByIndex(0);
   gSelectorEvents=this.EditorSelectorEdit.GroupByIndex(1);
   gSelectorRules=this.EditorSelectorEdit.GroupByIndex(2);
   List.iteri(function(ind,t)
   {
    var item,grItem;
    function a$1(key,panelKey,widget)
    {
     $this.RegisterWidget(key,grItem,panelKey,Seq.find(function(entry)
     {
      return entry.Key===panelKey;
     },List.ofSeq(grItem.PanelContainer.PanelItems)).Children,(widget.StartRunner(),widget));
    }
    item=DshHelper.PanelGroupCreator($this.Data,panelCreator,null);
    Var.Set(item.WebSharper_Community_Dashboard_ISelectorItem$get_Name(),t[0]);
    gSelectorPanelsEdit.SelectorItems.Append(item);
    gSelectorPanelsRun.SelectorItems.Append(item);
    grItem=Seq.nth(ind,List.ofSeq($this.Data.WidgetGroups));
    List.iter(function(panelConfig)
    {
     var panel;
     panel=$this.CreatePanel(grItem,"Panel",{
      $:1,
      $0:panelConfig.Key
     });
     Var.Set(panel.Left,panelConfig.Left);
     Var.Set(panel.Top,panelConfig.Top);
    },t[1]);
    return List.iter(function($1)
    {
     return a$1($1[0],$1[1],$1[2]);
    },t[2]);
   },widgets);
   console.log("Widgets restored");
   List.iteri(function(ind,t)
   {
    var item,grItem;
    function a$1(key,event)
    {
     $this.Data.RegisterEvent(key,grItem,event);
    }
    item=DshHelper.EventsGroupCreator($this.Data,$this.PropertyGrid,null);
    Var.Set(item.WebSharper_Community_Dashboard_ISelectorItem$get_Name(),t[0]);
    gSelectorEvents.SelectorItems.Append(item);
    grItem=Seq.nth(ind,List.ofSeq($this.Data.EventGroups));
    return List.iter(function($1)
    {
     return a$1($1[0],$1[1]);
    },t[1]);
   },events);
   console.log("Events restored");
   List.iteri(function(ind,t)
   {
    var item;
    item=DshHelper.RulesGroupCreator($this.Data,null);
    Var.Set(item.WebSharper_Community_Dashboard_ISelectorItem$get_Name(),t[0]);
    gSelectorRules.SelectorItems.Append(item);
    return RulesEditor.Restore($this.Data,Seq.nth(ind,List.ofSeq($this.Data.RulesGroups)).RulesRowItems,t[1]);
   },rules);
   this.Data.WidgetGroups.get_Length()>0?(Var.Set(this.EditorSelectorEdit.OptSelectedItem,{
    $:1,
    $0:List.head(List.ofSeq(this.EditorSelectorEdit.GroupByIndex(0).SelectorItems))
   }),Var.Set(this.EditorSelectorRun.OptSelectedItem,{
    $:1,
    $0:List.head(List.ofSeq(this.EditorSelectorRun.GroupByIndex(0).SelectorItems))
   })):(Var.Set(this.EditorSelectorEdit.OptSelectedItem,null),Var.Set(this.EditorSelectorRun.OptSelectedItem,null));
   allWorkers=List.map(function(item)
   {
    return item.Worker;
   },List.ofSeq(this.Data.WorkItems));
   List.iter(function($1)
   {
    return a($1[0],$1[1]);
   },rules);
   _this$1=MessageBus.Agent();
   _this$1.mailbox.AddLast(AgentMessage.Start);
   _this$1.resume();
   console.log("Connectors restored");
   return[List.concat(List.map(function(gr)
   {
    return List.map(function(item)
    {
     return item.Worker;
    },List.ofSeq(gr.EventItems));
   },List.ofSeq(this.Data.EventGroups))),List.concat(List.map(function(gr)
   {
    return List.map(function(item)
    {
     return item.Widget;
    },List.ofSeq(gr.WidgetItems));
   },List.ofSeq(this.Data.WidgetGroups)))];
  },
  Store:function(fncFromWorkerOpt)
  {
   function fncFromWorker(acc,worker)
   {
    var m;
    m=fncFromWorkerOpt(worker);
    return m==null?acc:new List.T({
     $:1,
     $0:[worker.Key,m.$0],
     $1:acc
    });
   }
   function fncFromWidget(acc,panel,widget)
   {
    var m;
    m=fncFromWorkerOpt(widget);
    return m==null?acc:new List.T({
     $:1,
     $0:[widget.Key,panel,m.$0],
     $1:acc
    });
   }
   return[List.map(function(gr)
   {
    return[gr.Name.c,List.rev(Seq.fold(function(acc,item)
    {
     return fncFromWorker(acc,item.Worker);
    },List.T.Empty,List.ofSeq(gr.EventItems)))];
   },List.ofSeq(this.Data.EventGroups)),List.map(function(gr)
   {
    return[gr.Name.c,List.map(function(panel)
    {
     return panel.get_PanelData();
    },List.ofSeq(gr.PanelContainer.PanelItems)),List.rev(Seq.fold(function(acc,item)
    {
     return fncFromWidget(acc,item.Panel,item.Widget);
    },List.T.Empty,List.ofSeq(gr.WidgetItems)))];
   },List.ofSeq(this.Data.WidgetGroups)),List.map(function(gr)
   {
    return[gr.Name.c,RulesEditor.CopyToRules(gr.RulesRowItems)];
   },List.ofSeq(this.Data.RulesGroups))];
  },
  CreatePanel:function(group,name,key)
  {
   var $this,keyDef,d,c,childContainerContent,panel;
   $this=this;
   Doc.ConvertBy(group.WidgetItems.key,function(item)
   {
    return Doc.Element("div",[],[Doc.TextView(item.Widget.Name.v)]);
   },group.WidgetItems.v);
   keyDef=(d=(c=Guid.NewGuid(),Global.String(c)),key==null?d:key.$0);
   childContainerContent=PanelContainer.get_Create().WithLayoutManager(LayoutManagers.StackPanelLayoutManager()).WithAttributes([AttrModule.Style("border","1px solid white"),AttrModule.Style("display","flex")]);
   panel=Panel$1.get_Create().WithKey(keyDef).WithPannelAttrs([AttrModule.Style("position","absolute")]).WithTitle(this.PanelTitleVisibility).WithTitleContent(Doc.TextNode(name)).WithTitleButtons(List.ofArray([TitleButton.New("add",function(panel$1)
   {
    var items,selected;
    items=List.ofSeq($this.Factory.WidgetItems);
    selected=Var.Create$1(List.head(items));
    $this.Dialog.ShowDialog("Select widget",Doc.Element("div",[],[Doc.Select([AttrModule.Class("form-control")],function(item)
    {
     return item.Worker.Name.c;
    },items,selected)]),function()
    {
     var widget;
     console.log("Dialog.IsOK");
     widget=selected.c.Worker.get_Clone();
     widget.StartRunner();
     $this.RegisterWidget(Helper.UniqueKey(),group,panel$1.Key,panel$1.Children,widget);
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
    group.WidgetItems.RemoveBy(function(item)
    {
     return item.Panel===panel$1.Key;
    });
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
   propertyGrid.Edit(List.mapi(function(ind,item)
   {
    var c;
    return Properties.string((c=ind+1,Global.String(c)),item.WebSharper_Community_Dashboard_ISelectorItem$get_Name());
   },List.ofSeq(gr.SelectorItems)));
  }).WithItemOnSelected(function()
  {
   propertyGrid.Edit(List.T.Empty);
  }).WithItemOnCreated(function(grInd)
  {
   return function(item)
   {
    return grInd===0?List.head(List.ofSeq(editorSelectorRun.SelectorGroups)).SelectorItems.Append(item):null;
   };
  }).WithItemOnDeleted(function()
  {
   return function()
   {
    return null;
   };
  }).WithItemOnDeleted(function(grInd)
  {
   return function(item)
   {
    item instanceof WidgetsGroupItem?data.WidgetGroups.Remove(item):item instanceof EventsGroupItem?data.EventGroups.Remove(item):item instanceof RulesGroupItem?data.RulesGroups.Remove(item):Operators.FailWith("WithItemOnDeleted, type unknown");
    return grInd===0?List.head(List.ofSeq(editorSelectorRun.SelectorGroups)).SelectorItems.Remove(item):null;
   };
  }).WithItemOnMove(Runtime.Curried3(function($1,item,direction)
  {
   var isDown;
   isDown=direction.$==1&&true;
   return item instanceof WidgetsGroupItem?(Helper.MoveItemInModelList(data.WidgetGroups,isDown,item),Helper.MoveItemInModelList(List.head(List.ofSeq(editorSelectorRun.SelectorGroups)).SelectorItems,isDown,item)):item instanceof EventsGroupItem?Helper.MoveItemInModelList(data.EventGroups,isDown,item):item instanceof RulesGroupItem?Helper.MoveItemInModelList(data.RulesGroups,isDown,item):Operators.FailWith("WithItemOnDeleted, type unknown");
  })).WithControls(true);
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
 RandomEvent=Events.RandomEvent=Runtime.Class({
  WebSharper_Community_Dashboard_IWorkerData$get_Render:function()
  {
   return null;
  },
  WebSharper_Community_Dashboard_IWorkerData$get_Run:function()
  {
   return{
    $:1,
    $0:function(worker)
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
       return Concurrency.Bind(Concurrency.Sleep(worker.InPorts.get_Item(2).get_Number()*1000>>0),function()
       {
        var middle,disper,d;
        middle=worker.InPorts.get_Item(0).get_Number();
        disper=worker.InPorts.get_Item(1).get_Number();
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
    }
   };
  },
  WebSharper_Community_Dashboard_IWorkerData$get_Data:function()
  {
   return this.RandomEventData;
  }
 },null,RandomEvent);
 RandomEvent.get_FromWorker=function()
 {
  return function(worker)
  {
   return RandomEvent.New(worker.get_ToData());
  };
 };
 RandomEvent.get_Create=function()
 {
  return RandomEvent.New(WorkerData.Create("Random",List.ofArray([InPortData.CreateNumber("Middle value",100),InPortData.CreateNumber("Dispersion",10),InPortData.CreateNumber("Delay sec.",2)]),List.ofArray([OutPort.Create("Random value")])));
 };
 RandomEvent.New=function(RandomEventData)
 {
  return new RandomEvent({
   RandomEventData:RandomEventData
  });
 };
 DatabaseEventContext.New=function(DatabaseEventRun)
 {
  return{
   DatabaseEventRun:DatabaseEventRun
  };
 };
 DatabaseEvent=Events.DatabaseEvent=Runtime.Class({
  WebSharper_Community_Dashboard_IWorkerData$get_Render:function()
  {
   return null;
  },
  WebSharper_Community_Dashboard_IWorkerData$get_Run:function()
  {
   return{
    $:1,
    $0:function(worker)
    {
     var isFirstCall,startTime;
     isFirstCall=true;
     startTime=worker.InPorts.get_Item(0).PortValue.c.Time;
     View.Sink(function(value)
     {
      var file;
      file=worker.InPorts.get_Item(1).get_String();
      isFirstCall?(List.iter(function(msg)
      {
       var _this;
       _this=MessageBus.Agent();
       _this.mailbox.AddLast({
        $:0,
        $0:msg
       });
       _this.resume();
      },(new AjaxRemotingProvider.New()).Sync("WebSharper.Community.Dashboard:WebSharper.Community.Dashboard.Events.ServerDatabase.ReadAllMessages:965639103",[file])),isFirstCall=false):value.Time>startTime?(new AjaxRemotingProvider.New()).Send("WebSharper.Community.Dashboard:WebSharper.Community.Dashboard.Events.ServerDatabase.WriteMessage:-353093100",[file,value]):void 0;
     },worker.InPorts.get_Item(0).PortValue.v);
     return null;
    }
   };
  },
  WebSharper_Community_Dashboard_IWorkerData$get_Data:function()
  {
   return this.DatabaseEventData;
  }
 },null,DatabaseEvent);
 DatabaseEvent.get_FromWorker=function()
 {
  return function(worker)
  {
   return DatabaseEvent.New(worker.get_ToData());
  };
 };
 DatabaseEvent.get_Create=function()
 {
  return DatabaseEvent.New(WorkerData.Create("Database",List.ofArray([InPortData.CreateNumber(" in Value",100),InPortData.CreateString("Database name","Database.txt")]),List.T.Empty));
 };
 DatabaseEvent.New=function(DatabaseEventData)
 {
  return new DatabaseEvent({
   DatabaseEventData:DatabaseEventData
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
    return $1("http://api.openweathermap.org/data/2.5/weather?q="+Utils.toSafe($2)+"&units=metric&appid="+Utils.toSafe($3));
   }))(Global.id))(city))(key);
   (Environment.Log())("get key city "+request);
   return Concurrency.TryWith(Concurrency.Delay(function()
   {
    return Concurrency.Bind(TxtRuntime.AsyncMap(IO.asyncReadTextAtRuntime(false,"C:\\Users\\Andrey\\Private\\VS_Projects\\WebSharper.Community.Dashboard\\WebSharper.Community.Dashboard","","JSON","",request),function(t)
    {
     return Unchecked.Equals(typeof t,"string")?JSON.parse(t):t;
    }),function(a)
    {
     var o,head,prop,opt,x,prop$1,opt$1,prop$2,opt$2,prop$3,opt$3,v,x$1,prop$4,opt$4,v$1,x$2,prop$5,opt$5,v$2,x$3,prop$6,opt$6;
     (Environment.Log())("get key city 2");
     return Concurrency.Return((o=Arrays.tryHead(a.weather),o==null?null:{
      $:1,
      $0:(head=o.$0,Forecast.New((((Runtime.Curried3(function($1,$2,$3)
      {
       return $1(Utils.toSafe($2)+", "+Utils.toSafe($3));
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
        return $1("http://openweathermap.org/img/w/"+Utils.toSafe($2)+".png");
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
    (Environment.Log())(a.message);
    return Concurrency.Return(null);
   });
  });
 };
 OpenWeatherEvent=Events.OpenWeatherEvent=Runtime.Class({
  WebSharper_Community_Dashboard_IWorkerData$get_Render:function()
  {
   return null;
  },
  WebSharper_Community_Dashboard_IWorkerData$get_Run:function()
  {
   return{
    $:1,
    $0:function(worker)
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
        return Concurrency.Combine(a==null?Concurrency.Zero():((Environment.Log())("Value generated:"+a.$0.Title),outTempearatur.Trigger(new Value({
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
    }
   };
  },
  WebSharper_Community_Dashboard_IWorkerData$get_Data:function()
  {
   return this.OpenWeatherEventData;
  }
 },null,OpenWeatherEvent);
 OpenWeatherEvent.get_FromWorker=function()
 {
  return function(worker)
  {
   return OpenWeatherEvent.New(worker.get_ToData());
  };
 };
 OpenWeatherEvent.Create=function(city,apikey)
 {
  return OpenWeatherEvent.New(WorkerData.Create("OpenWeatherMap",List.ofArray([InPortData.CreateString("City",city),InPortData.CreateString("ApiKey",apikey)]),List.ofArray([OutPort.Create("Temperature")])));
 };
 OpenWeatherEvent.New=function(OpenWeatherEventData)
 {
  return new OpenWeatherEvent({
   OpenWeatherEventData:OpenWeatherEventData
  });
 };
 ClockEvent=Events.ClockEvent=Runtime.Class({
  WebSharper_Community_Dashboard_IWorkerData$get_Render:function()
  {
   return null;
  },
  WebSharper_Community_Dashboard_IWorkerData$get_Run:function()
  {
   return{
    $:1,
    $0:function(worker)
    {
     var b;
     Concurrency.Start((b=null,Concurrency.Delay(function()
     {
      return Concurrency.While(function()
      {
       return true;
      },Concurrency.Delay(function()
      {
       var sel,time,strTime;
       sel=(worker.InPorts.get_Item(0).PortValue.c.Value.get_AsSelect())[0];
       time=Date.now();
       strTime=sel===0?DateUtil.LongTime(time):sel===1?DateUtil.ShortTime(time):sel===2?DateUtil.LongDate(time):sel===3?(new Date(time)).toLocaleDateString():"";
       worker.OutPorts.get_Item(0).Trigger(new Value({
        $:1,
        $0:strTime
       }));
       return Concurrency.Bind(Concurrency.Sleep(worker.InPorts.get_Item(1).get_Number()*1000>>0),function()
       {
        return Concurrency.Return(null);
       });
      }));
     })),null);
     return null;
    }
   };
  },
  WebSharper_Community_Dashboard_IWorkerData$get_Data:function()
  {
   return this.ClockEventData;
  }
 },null,ClockEvent);
 ClockEvent.get_FromWorker=function()
 {
  return function(worker)
  {
   return ClockEvent.New(worker.get_ToData());
  };
 };
 ClockEvent.get_Create=function()
 {
  return ClockEvent.New(WorkerData.Create("Clock",List.ofArray([InPortData.CreateSelect("Format",[0,List.ofArray(["long time","short time","long date","short date"])]),InPortData.CreateNumber("Delay sec.",1)]),List.ofArray([OutPort.Create("Date Time")])));
 };
 ClockEvent.New=function(ClockEventData)
 {
  return new ClockEvent({
   ClockEventData:ClockEventData
  });
 };
 TextBoxWidget=Widgets.TextBoxWidget=Runtime.Class({
  WebSharper_Community_Dashboard_IWorkerData$get_Render:function()
  {
   return{
    $:1,
    $0:function(worker)
    {
     var strView,widthView,fontSizeView,fontFamilyView;
     strView=View.Map(function(msg)
     {
      var m,c;
      m=msg.Value;
      return m.$==0?(c=m.$0>>0,Global.String(c)):m.$==1?m.$0:m.$==2?Global.String(m.$0):"Wrong port value format";
     },worker.InPorts.get_Item(0).PortValue.v);
     widthView=View.Map(function(msg)
     {
      var c;
      return(c=msg.Value.get_AsNumber(),Global.String(c))+"px";
     },worker.InPorts.get_Item(1).PortValue.v);
     fontSizeView=View.Map(function(msg)
     {
      var c;
      return(c=msg.Value.get_AsNumber(),Global.String(c))+"px";
     },worker.InPorts.get_Item(2).PortValue.v);
     fontFamilyView=View.Map(function(msg)
     {
      var p;
      p=msg.Value.get_AsSelect();
      return p[1].get_Item(p[0]);
     },worker.InPorts.get_Item(3).PortValue.v);
     return Doc.Element("div",[AttrModule.Class("bigvalue"),AttrModule.DynamicStyle("width",widthView),AttrModule.DynamicStyle("font-size",fontSizeView),AttrModule.DynamicStyle("font-family",fontFamilyView)],[Doc.TextView(strView)]);
    }
   };
  },
  WebSharper_Community_Dashboard_IWorkerData$get_Run:function()
  {
   return null;
  },
  WebSharper_Community_Dashboard_IWorkerData$get_Data:function()
  {
   return this.TextBoxWidgetData;
  }
 },null,TextBoxWidget);
 TextBoxWidget.get_FromWorker=function()
 {
  return function(worker)
  {
   return TextBoxWidget.New(worker.get_ToData());
  };
 };
 TextBoxWidget.get_Create=function()
 {
  return TextBoxWidget.New(WorkerData.Create("Text",List.ofArray([InPortData.CreateString("in Text","txt"),InPortData.CreateNumber("Width",200),InPortData.CreateNumber("Font-Size",100),InPortData.CreateSelect("Font-Family",[0,List.ofArray(["Times New Roman","Courier New","Arial","Freestyle Script"])])]),List.T.Empty));
 };
 TextBoxWidget.New=function(TextBoxWidgetData)
 {
  return new TextBoxWidget({
   TextBoxWidgetData:TextBoxWidgetData
  });
 };
 ChartWidgetContext.New=function(LineChart,Sources)
 {
  return{
   LineChart:LineChart,
   Sources:Sources
  };
 };
 ChartWidget=Widgets.ChartWidget=Runtime.Class({
  WebSharper_Community_Dashboard_IWorkerData$get_Render:function()
  {
   return{
    $:1,
    $0:function(worker)
    {
     var chartBufferSize,context,config,r,r$1,r$2,r$3,r$4,r$5;
     (Environment.Log())("Chart Render");
     chartBufferSize=worker.InPorts.get_Item(3).get_Number()>>0;
     context=worker.RunnerContext.c.$0;
     config=(r={},r.title=(r$1={},r$1.display=false,r$1),r.legend=(r$2={},r$2.display=false,r$2),r.elements=(r$3={},r$3.point=(r$4={},r$4.radius=0,r$4),r$3.line=(r$5={},r$5.borderWidth=1,r$5),r$3),r);
     return ChartJs.Render$2(context.LineChart,{
      $:1,
      $0:{
       $:0,
       $0:worker.InPorts.get_Item(1).get_Number()>>0,
       $1:worker.InPorts.get_Item(2).get_Number()>>0
      }
     },{
      $:1,
      $0:config
     },{
      $:1,
      $0:chartBufferSize
     });
    }
   };
  },
  WebSharper_Community_Dashboard_IWorkerData$get_Run:function()
  {
   var $this;
   $this=this;
   return{
    $:1,
    $0:function(worker)
    {
     var srcs,ports,allSrcPorts,charts;
     function observe(port,msg)
     {
      var sel,x_label,localTime;
      sel=(worker.InPorts.get_Item(4).PortValue.c.Value.get_AsSelect())[0];
      x_label=(localTime=msg.Time,sel===0?DateUtil.LongTime(localTime):sel===1?DateUtil.ShortTime(localTime):sel===2?DateUtil.LongDate(localTime):sel===3?(new Date(localTime)).toLocaleDateString():"");
      (Environment.Log())("Chart observe "+x_label);
      return srcs.get_Item(Seq.findIndex(function(entry)
      {
       return Unchecked.Equals(entry,port);
      },allSrcPorts)).event.Trigger([x_label,msg.Value.get_AsNumber()]);
     }
     (Environment.Log())("Chart run");
     worker.InPorts.get_Item(3).get_Number();
     srcs=List.init(($this.ChartWidgetData.InPorts.get_Item(5).Value.Value.get_AsNumber()>>0)+1,function()
     {
      return new FSharpEvent.New();
     });
     ports=(List.splitAt(6,worker.InPorts))[1];
     allSrcPorts=new List.T({
      $:1,
      $0:worker.InPorts.get_Item(0),
      $1:ports
     });
     charts=Chart.Combine(List.ofSeq(Seq.delay(function()
     {
      return Seq.map(function(src)
      {
       return LiveChart.Line$1(src.event).WithFill(false).__WithStrokeColor(new Pervasives.Color({
        $:1,
        $0:"#FB8C00"
       })).__WithPointColor(new Pervasives.Color({
        $:2,
        $0:"black"
       }));
      },srcs);
     })));
     List.iter(function(port)
     {
      View.Sink(function($1)
      {
       return observe(port,$1);
      },port.PortValue.v);
     },allSrcPorts);
     return{
      $:1,
      $0:ChartWidgetContext.New(charts,srcs)
     };
    }
   };
  },
  WebSharper_Community_Dashboard_IWorkerData$get_Data:function()
  {
   var $this,chartBufferSize,resultNumberOfPorts,startIndex,i;
   $this=this;
   chartBufferSize=this.ChartWidgetData.InPorts.get_Item(3).Value.Value.get_AsNumber()>>0;
   resultNumberOfPorts=(this.ChartWidgetData.InPorts.get_Item(5).Value.Value.get_AsNumber()>>0)+6;
   i=this.ChartWidgetData;
   return WorkerData.New(i.WorkerName,List.mapi(function(ind,port)
   {
    return ind===0||ind>5?port.WithCacheSize(chartBufferSize):port;
   },resultNumberOfPorts<this.ChartWidgetData.InPorts.get_Length()?(List.splitAt(resultNumberOfPorts,this.ChartWidgetData.InPorts))[0]:resultNumberOfPorts>this.ChartWidgetData.InPorts.get_Length()?(startIndex=this.ChartWidgetData.InPorts.get_Length()-6+1,List.append(this.ChartWidgetData.InPorts,List.ofSeq(Seq.delay(function()
   {
    return Seq.map(function(i$1)
    {
     var c;
     return InPortData.CreateNumber(" in Value "+(c=startIndex+i$1,Global.String(c)),0).WithCacheSize(chartBufferSize);
    },Operators.range(0,resultNumberOfPorts-$this.ChartWidgetData.InPorts.get_Length()-1));
   })))):this.ChartWidgetData.InPorts),i.OutPorts);
  }
 },null,ChartWidget);
 ChartWidget.get_FromWorker=function()
 {
  return function(worker)
  {
   return ChartWidget.New(worker.get_ToData());
  };
 };
 ChartWidget.get_Create=function()
 {
  var bufferSize;
  bufferSize=20;
  return ChartWidget.New(WorkerData.Create("Chart",List.ofArray([InPortData.CreateNumber(" in Value",100).WithCacheSize(bufferSize),InPortData.CreateNumber("cx",300),InPortData.CreateNumber("cy",150),InPortData.CreateNumber("BufferSize",bufferSize),InPortData.CreateSelect("X-Axis",[0,List.ofArray(["long time","short time","long date","short date"])]),InPortData.CreateNumber("Number of additional ports",0)]),List.T.Empty));
 };
 ChartWidget.New=function(ChartWidgetData)
 {
  return new ChartWidget({
   ChartWidgetData:ChartWidgetData
  });
 };
 ButtonWidget=Widgets.ButtonWidget=Runtime.Class({
  WebSharper_Community_Dashboard_IWorkerData$get_Render:function()
  {
   return{
    $:1,
    $0:function(worker)
    {
     return Doc.ButtonView(worker.InPorts.get_Item(0).get_String(),[],worker.InPorts.get_Item(1).get_BooleanView(),function(state)
     {
      worker.OutPorts.get_Item(0).Trigger(new Value({
       $:2,
       $0:state
      }));
     });
    }
   };
  },
  WebSharper_Community_Dashboard_IWorkerData$get_Run:function()
  {
   return null;
  },
  WebSharper_Community_Dashboard_IWorkerData$get_Data:function()
  {
   return this.ButtonWidgetData;
  }
 },null,ButtonWidget);
 ButtonWidget.get_FromWorker=function()
 {
  return function(worker)
  {
   return ButtonWidget.New(worker.get_ToData());
  };
 };
 ButtonWidget.get_Create=function()
 {
  return ButtonWidget.New(WorkerData.Create("Button",List.ofArray([InPortData.CreateString("Caption","Button"),InPortData.CreateNumber("State",0)]),List.ofArray([OutPort.Create("Button value")])));
 };
 ButtonWidget.New=function(ButtonWidgetData)
 {
  return new ButtonWidget({
   ButtonWidgetData:ButtonWidgetData
  });
 };
 AppModelLib.FromWorker=function(worker)
 {
  var m;
  m=worker.Data;
  return m instanceof RandomEvent?{
   $:1,
   $0:{
    $:0,
    $0:(RandomEvent.get_FromWorker())(worker)
   }
  }:m instanceof ClockEvent?{
   $:1,
   $0:{
    $:1,
    $0:(ClockEvent.get_FromWorker())(worker)
   }
  }:m instanceof OpenWeatherEvent?{
   $:1,
   $0:{
    $:2,
    $0:(OpenWeatherEvent.get_FromWorker())(worker)
   }
  }:m instanceof DatabaseEvent?{
   $:1,
   $0:{
    $:3,
    $0:(DatabaseEvent.get_FromWorker())(worker)
   }
  }:m instanceof TextBoxWidget?{
   $:1,
   $0:{
    $:4,
    $0:(TextBoxWidget.get_FromWorker())(worker)
   }
  }:m instanceof ChartWidget?{
   $:1,
   $0:{
    $:5,
    $0:(ChartWidget.get_FromWorker())(worker)
   }
  }:m instanceof ButtonWidget?{
   $:1,
   $0:{
    $:6,
    $0:(ButtonWidget.get_FromWorker())(worker)
   }
  }:null;
 };
 AppModelLib.ToWorker=function(appModel)
 {
  return appModel.$==1?Worker.Create(appModel.$0):appModel.$==2?Worker.Create(appModel.$0):appModel.$==3?Worker.Create(appModel.$0):appModel.$==4?Worker.Create(appModel.$0):appModel.$==5?Worker.Create(appModel.$0):appModel.$==6?Worker.Create(appModel.$0):Worker.Create(appModel.$0);
 };
 App.CreateDashboard=function()
 {
  SC$3.$cctor();
  return SC$3.CreateDashboard;
 };
 App.PanelContainerCreator=function(a)
 {
  return PanelContainer.get_Create().WithLayoutManager(LayoutManagers.FloatingPanelLayoutManager(5)).WithWidth(2800).WithHeight(2420).WithAttributes([]);
 };
 App.RegisterAppModelLib=function(dashboard)
 {
  function registerEvent(data)
  {
   App.RegisterEventGeneral(dashboard,data);
  }
  function registerWidget(data)
  {
   App.RegisterWidgetGeneral(dashboard,data);
  }
  registerEvent(OpenWeatherEvent.Create("London",""));
  registerEvent(RandomEvent.get_Create());
  registerEvent(ClockEvent.get_Create());
  registerEvent(DatabaseEvent.get_Create());
  registerWidget(TextBoxWidget.get_Create());
  registerWidget(ChartWidget.get_Create());
  registerWidget(ButtonWidget.get_Create());
  return dashboard;
 };
 App.RegisterWidgetGeneral=function(dashboard,data)
 {
  var o;
  App.Register((o=dashboard.Factory,function(a)
  {
   o.RegisterWidget(a);
  }),data);
 };
 App.RegisterEventGeneral=function(dashboard,data)
 {
  var o;
  App.Register((o=dashboard.Factory,function(a)
  {
   o.RegisterEvent(a);
  }),data);
 };
 App.Register=function(fnc,data)
 {
  return fnc(Worker.Create(data));
 };
 SC$3.$cctor=function()
 {
  SC$3.$cctor=Global.ignore;
  SC$3.CreateDashboard=App.RegisterAppModelLib(Dashboard$1.Create(function()
  {
   return App.PanelContainerCreator();
  }));
 };
 AppDataHelper.RecreatWidgetsOnServer=function(toWorker,widgets)
 {
  function m(a,a$1,gr)
  {
   return gr;
  }
  function m$1(a,a$1,gr)
  {
   return gr;
  }
  return List.map(function($1)
  {
   return m($1[0],$1[1],$1[2]);
  },List.concat(List.map(function($1)
  {
   return m$1($1[0],$1[1],$1[2]);
  },AppDataHelper.RecreateWidgets(toWorker,widgets))));
 };
 AppDataHelper.RecreateEventsOnServer=function(toWorker,events)
 {
  function m(a,gr)
  {
   return gr;
  }
  function m$1(a,gr)
  {
   return gr;
  }
  return List.map(function($1)
  {
   return m($1[0],$1[1]);
  },List.concat(List.map(function($1)
  {
   return m$1($1[0],$1[1]);
  },AppDataHelper.RecreateEvents(toWorker,events))));
 };
 AppDataHelper.RecreateOnClient=function(eventsStarter,dashboard,panelContainerCreator,toWorker,c,c$1,c$2)
 {
  var _this;
  Environment.set_Role(Role.Client);
  _this=MessageBus.Agent();
  _this.mailbox.AddLast({
   $:3,
   $0:function(m)
   {
    (new AjaxRemotingProvider.New()).Send("WebSharper.Community.Dashboard:WebSharper.Community.Dashboard.MessageBus.SendToServer:-1358505674",[m]);
   }
  });
  _this.resume();
  List.iter(eventsStarter,(dashboard.Restore(panelContainerCreator,AppDataHelper.RecreateEvents(toWorker,c),AppDataHelper.RecreateWidgets(toWorker,c$1),c$2))[0]);
 };
 AppDataHelper.RecreateWidgets=function(toWorker,widgets)
 {
  function m(grName,panelData,gr)
  {
   function m$1(key,keyPanel,widget)
   {
    return[key,keyPanel,toWorker(widget)];
   }
   return[grName,panelData,List.map(function($1)
   {
    return m$1($1[0],$1[1],$1[2]);
   },gr)];
  }
  return List.map(function($1)
  {
   return m($1[0],$1[1],$1[2]);
  },widgets);
 };
 AppDataHelper.RecreateEvents=function(toWorker,events)
 {
  function m(grName,gr)
  {
   function m$1(key,event)
   {
    return[key,toWorker(event)];
   }
   return[grName,List.map(function($1)
   {
    return m$1($1[0],$1[1]);
   },gr)];
  }
  return List.map(function($1)
  {
   return m($1[0],$1[1]);
  },events);
 };
 AppData=Dashboard.AppData=Runtime.Class({
  RecreateOnServer:function(json,toWorker)
  {
   var allWorkers,a,_this;
   function a$1(grName,rules)
   {
    rules.Reconnect(allWorkers);
   }
   allWorkers=List.append(AppDataHelper.RecreateEventsOnServer(toWorker,this.Events),AppDataHelper.RecreatWidgetsOnServer(toWorker,this.Widgets));
   List.iter(function($1)
   {
    return a$1($1[0],$1[1]);
   },this.Rules);
   List.iter(function(worker)
   {
    worker.StartRunner();
   },allWorkers);
   a={
    $:0,
    $0:MessageBus.CreateMessage(new Value({
     $:4,
     $0:{
      $:0,
      $0:json
     }
    })).WithKey("system")
   };
   _this=MessageBus.Agent();
   _this.mailbox.AddLast(a);
   _this.resume();
   return allWorkers;
  },
  RecreateOnClientEventsRunning:function(dashboard,panelContainerCreator,toWorker)
  {
   AppDataHelper.RecreateOnClient(function(worker)
   {
    worker.StartRunner();
   },dashboard,panelContainerCreator,toWorker,this.Events,this.Widgets,this.Rules);
  },
  RecreateOnClientEventsNotRunning:function(dashboard,panelContainerCreator,toWorker)
  {
   AppDataHelper.RecreateOnClient(Global.ignore,dashboard,panelContainerCreator,toWorker,this.Events,this.Widgets,this.Rules);
  }
 },null,AppData);
 AppData.Create=function(dashboard,fromWorker)
 {
  var p;
  p=dashboard.Store(fromWorker);
  return AppData.New(p[0],p[1],p[2]);
 };
 AppData.empty=function()
 {
  return AppData.New(List.T.Empty,List.T.Empty,List.T.Empty);
 };
 AppData.New=function(Events$1,Widgets$1,Rules)
 {
  return new AppData({
   Events:Events$1,
   Widgets:Widgets$1,
   Rules:Rules
  });
 };
}());
