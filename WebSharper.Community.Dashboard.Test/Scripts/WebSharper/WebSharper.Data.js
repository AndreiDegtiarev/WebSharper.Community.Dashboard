(function()
{
 "use strict";
 var Global,WebSharper,Data,Pervasives,WBRuntime,WorldBankCountry,WorldBankRuntime,FSharp,Data$1,Runtime,WorldBank,Indicator,JSRuntime,TxtRuntime,IO,Strings,System,Guid,Concurrency,$,List,JavaScript,Pervasives$1,Arrays,IntelliFactory,Runtime$1,Operators,Array,Unchecked;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Data=WebSharper.Data=WebSharper.Data||{};
 Pervasives=Data.Pervasives=Data.Pervasives||{};
 WBRuntime=Data.WBRuntime=Data.WBRuntime||{};
 WorldBankCountry=WBRuntime.WorldBankCountry=WBRuntime.WorldBankCountry||{};
 WorldBankRuntime=WBRuntime.WorldBankRuntime=WBRuntime.WorldBankRuntime||{};
 FSharp=Global.FSharp=Global.FSharp||{};
 Data$1=FSharp.Data=FSharp.Data||{};
 Runtime=Data$1.Runtime=Data$1.Runtime||{};
 WorldBank=Runtime.WorldBank=Runtime.WorldBank||{};
 Indicator=WorldBank.Indicator=WorldBank.Indicator||{};
 JSRuntime=Data.JSRuntime=Data.JSRuntime||{};
 TxtRuntime=Data.TxtRuntime=Data.TxtRuntime||{};
 IO=Runtime.IO=Runtime.IO||{};
 Strings=WebSharper&&WebSharper.Strings;
 System=Global.System;
 Guid=System&&System.Guid;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 $=Global.jQuery;
 List=WebSharper&&WebSharper.List;
 JavaScript=WebSharper&&WebSharper.JavaScript;
 Pervasives$1=JavaScript&&JavaScript.Pervasives;
 Arrays=WebSharper&&WebSharper.Arrays;
 IntelliFactory=Global.IntelliFactory;
 Runtime$1=IntelliFactory&&IntelliFactory.Runtime;
 Operators=WebSharper&&WebSharper.Operators;
 Array=Global.Array;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Pervasives.randomFunctionName=function()
 {
  var c;
  return Strings.ReplaceChar((c=Guid.NewGuid(),Global.String(c)).toLowerCase(),"-","_");
 };
 WorldBankCountry.New=function(Context,Code,Name)
 {
  return{
   Context:Context,
   Code:Code,
   Name:Name
  };
 };
 WorldBankRuntime.AsyncGetIndicator=function(country,indicator)
 {
  return Concurrency.FromContinuations(function(ok,ko)
  {
   var guid,r;
   guid=Pervasives.randomFunctionName();
   $.ajax((r={},r.url=WBRuntime.worldBankUrl(country.Context,List.ofArray(["countries",country.Code,"indicators",indicator]),List.ofArray([["date","1900:2050"],["format","jsonp"]])),r.dataType="jsonp",r.jsonp="prefix",r.jsonpCallback="jsonp"+guid,r.error=function(jqXHR,textStatus,error)
   {
    return ko(Global.Error(textStatus+error));
   },r.success=function(data)
   {
    return ok(Pervasives$1.NewFromSeq(Arrays.choose(function(e)
    {
     return e.value==null?null:{
      $:1,
      $0:[e.date,e.value]
     };
    },Arrays.get(data,1)).slice().reverse()));
   },r));
  });
 };
 WorldBankRuntime.GetIndicators=Global.id;
 WorldBankRuntime.GetCountry=function(countries,code,name)
 {
  return WorldBankCountry.New(countries,code,name);
 };
 WBRuntime.worldBankUrl=function(wb,functions,props)
 {
  function m(key,value)
  {
   return"&"+key+"="+Global.encodeURIComponent(value);
  }
  return wb.serviceUrl+"/"+Strings.concat("",List.map(function(m$1)
  {
   return"/"+Global.encodeURIComponent(m$1);
  },functions))+"?per_page=1000"+Strings.concat("",List.map(function($1)
  {
   return m($1[0],$1[1]);
  },props));
 };
 Indicator=WorldBank.Indicator=Runtime$1.Class({
  TryGetValueAt:function(year)
  {
   var e;
   e=this[Global.String(year)];
   return e==void 0?null:{
    $:1,
    $0:e
   };
  }
 },WebSharper.Obj,Indicator);
 JSRuntime.GetArrayChildByTypeTag=function(value,cultureStr,tagCode)
 {
  var arr;
  arr=JSRuntime.GetArrayChildrenByTypeTag(value,cultureStr,tagCode,Global.id);
  return Arrays.length(arr)===1?Arrays.get(arr,0):Operators.FailWith("JSON mismatch: Expected single value, but found multiple.");
 };
 JSRuntime.TryGetArrayChildByTypeTag=function(doc,cultureStr,tagCode,mapping)
 {
  var arr;
  arr=JSRuntime.GetArrayChildrenByTypeTag(doc,cultureStr,tagCode,mapping);
  return Arrays.length(arr)===1?{
   $:1,
   $0:Arrays.get(arr,0)
  }:Arrays.length(arr)===0?null:Operators.FailWith("JSON mismatch: Expected Array with single or no elements.");
 };
 JSRuntime.TryGetValueByTypeTag=function(doc,cultureStr,tagCode,mapping)
 {
  var o;
  o=JSRuntime.matchTag(tagCode,doc);
  return o==null?null:{
   $:1,
   $0:mapping(o.$0)
  };
 };
 JSRuntime.GetArrayChildrenByTypeTag=function(doc,cultureStr,tagCode,mapping)
 {
  return Array.isArray(doc)?Arrays.map(function(x)
  {
   return mapping(Global.id(x));
  },Arrays.choose(function(v)
  {
   return JSRuntime.matchTag(tagCode,v);
  },doc)):Operators.FailWith("JSON mismatch: Expected Array node");
 };
 JSRuntime.matchTag=function(tagCode,value)
 {
  var v;
  return value==null?null:Unchecked.Equals(typeof value,"boolean")&&tagCode==="Boolean"?{
   $:1,
   $0:value
  }:Unchecked.Equals(typeof value,"number")&&tagCode==="Number"?{
   $:1,
   $0:value
  }:Unchecked.Equals(typeof value,"string")&&tagCode==="Number"?(v=1*value,Global.isNaN(v)?null:{
   $:1,
   $0:v
  }):Unchecked.Equals(typeof value,"string")&&tagCode==="String"?{
   $:1,
   $0:value
  }:Array.isArray(value)&&tagCode==="Array"?{
   $:1,
   $0:value
  }:Unchecked.Equals(typeof value,"object")&&tagCode==="Record"?{
   $:1,
   $0:value
  }:null;
 };
 TxtRuntime.AsyncMap=function(comp,mapping)
 {
  var b;
  b=null;
  return Concurrency.Delay(function()
  {
   return Concurrency.Bind(comp,function(a)
   {
    return Concurrency.Return(mapping(a));
   });
  });
 };
 IO.asyncReadTextAtRuntimeWithDesignTimeRules=function(defaultResolutionFolder,resolutionFolder,formatName,encodingStr,uri)
 {
  return IO.asyncReadTextAtRuntime(false,defaultResolutionFolder,resolutionFolder,formatName,encodingStr,uri);
 };
 IO.asyncReadTextAtRuntime=function(forFSI,defaultResolutionFolder,resolutionFolder,formatName,encodingStr,uri)
 {
  function a(ok,ko)
  {
   var p,l,settings,r,fn;
   p=(l=uri.toLowerCase(),Strings.StartsWith(l,"jsonp|")?[uri.substring(6),true]:Strings.StartsWith(l,"json|")?[uri.substring(5),false]:[uri,false]);
   settings=(r={},r.dataType="json",r.success=function(data)
   {
    return ok(data);
   },r.error=function(a$1,a$2,err)
   {
    return ko(Global.Error(err));
   },r);
   p[1]?(fn=Pervasives.randomFunctionName(),settings.dataType="jsonp",settings.jsonp="prefix",settings.jsonpCallback="jsonp"+fn):void 0;
   $.ajax(p[0],settings);
  }
  return Concurrency.FromContinuations(function($1,$2,$3)
  {
   return a.apply(null,[$1,$2,$3]);
  });
 };
}());
