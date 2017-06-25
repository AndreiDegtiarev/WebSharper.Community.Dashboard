(function()
{
 "use strict";
 var Global,WebSharper,Data,Pervasives,WBRuntime,WorldBankCountry,WorldBankRuntime,FSharp,Data$1,Runtime,WorldBank,Indicator,JSRuntime,TxtRuntime,IO,Guid,Strings,Concurrency,List,Arrays,JavaScript,Pervasives$1,IntelliFactory,Runtime$1,Operators,Unchecked;
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
 Guid=WebSharper&&WebSharper.Guid;
 Strings=WebSharper&&WebSharper.Strings;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 List=WebSharper&&WebSharper.List;
 Arrays=WebSharper&&WebSharper.Arrays;
 JavaScript=WebSharper&&WebSharper.JavaScript;
 Pervasives$1=JavaScript&&JavaScript.Pervasives;
 IntelliFactory=Global.IntelliFactory;
 Runtime$1=IntelliFactory&&IntelliFactory.Runtime;
 Operators=WebSharper&&WebSharper.Operators;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Pervasives.randomFunctionName=function()
 {
  var _this,c;
  _this=(c=Guid.NewGuid(),Global.String(c)).toLowerCase();
  return Strings.ReplaceChar(_this,45,95);
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
   var guid,wb,countryCode,url,v,a,r;
   guid=Pervasives.randomFunctionName();
   wb=country.Context;
   countryCode=country.Code;
   url=WBRuntime.worldBankUrl(wb,List.ofArray(["countries",countryCode,"indicators",indicator]),List.ofArray([["date","1900:2050"],["format","jsonp"]]));
   v=(a=(r={},r.url=url,r.dataType="jsonp",r.jsonp="prefix",r.jsonpCallback="jsonp"+guid,r.error=function(jqXHR,textStatus,error)
   {
    return ko(Global.Error(textStatus+error));
   },r.success=function(data)
   {
    var res,c;
    res=(c=function(e)
    {
     return e.value==null?null:{
      $:1,
      $0:[e.date,e.value]
     };
    },function(a$1)
    {
     return Arrays.choose(c,a$1);
    }(Arrays.get(data,1))).slice().reverse();
    return ok(Pervasives$1.NewFromSeq(res));
   },r),Global.jQuery.ajax(a));
  });
 };
 WorldBankRuntime.GetIndicators=Global.id;
 WorldBankRuntime.GetCountry=function(countries,code,name)
 {
  return WorldBankCountry.New(countries,code,name);
 };
 WBRuntime.worldBankUrl=function(wb,functions,props)
 {
  var s,m,s$1,m$1;
  return wb.serviceUrl+"/"+(s=(m=function(m$2)
  {
   return"/"+Global.encodeURIComponent(m$2);
  },function(l)
  {
   return List.map(m,l);
  }(functions)),Strings.concat("",s))+"?per_page=1000"+(s$1=(m$1=function(key,value)
  {
   return"&"+key+"="+Global.encodeURIComponent(value);
  },function(l)
  {
   return List.map(function($1)
   {
    return m$1($1[0],$1[1]);
   },l);
  }(props)),Strings.concat("",s$1));
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
 },null,Indicator);
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
  var m,f;
  m=(f=Global.id,function(x)
  {
   return mapping(f(x));
  });
  return function(o)
  {
   return o==null?null:{
    $:1,
    $0:m(o.$0)
   };
  }(JSRuntime.matchTag(tagCode,doc));
 };
 JSRuntime.GetArrayChildrenByTypeTag=function(doc,cultureStr,tagCode,mapping)
 {
  var m,f,c;
  return Global.Array.isArray(doc)?(m=(f=Global.id,function(x)
  {
   return mapping(f(x));
  }),function(a)
  {
   return Arrays.map(m,a);
  }((c=function(v)
  {
   return JSRuntime.matchTag(tagCode,v);
  },function(a)
  {
   return Arrays.choose(c,a);
  }(doc)))):Operators.FailWith("JSON mismatch: Expected Array node");
 };
 JSRuntime.matchTag=function(tagCode,value)
 {
  var v;
  return value==null?null:(Unchecked.Equals(typeof value,"boolean")?tagCode==="Boolean":false)?{
   $:1,
   $0:value
  }:(Unchecked.Equals(typeof value,"number")?tagCode==="Number":false)?{
   $:1,
   $0:value
  }:(Unchecked.Equals(typeof value,"string")?tagCode==="Number":false)?(v=1*value,Global.isNaN(v)?null:{
   $:1,
   $0:v
  }):(Unchecked.Equals(typeof value,"string")?tagCode==="String":false)?{
   $:1,
   $0:value
  }:(Global.Array.isArray(value)?tagCode==="Array":false)?{
   $:1,
   $0:value
  }:(Unchecked.Equals(typeof value,"object")?tagCode==="Record":false)?{
   $:1,
   $0:value
  }:null;
 };
 TxtRuntime.AsyncMap=function(comp,mapping)
 {
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
  var a;
  a=function(ok,ko)
  {
   var p,l,uri$1,jsonp,settings,r,fn,v;
   p=(l=uri.toLowerCase(),Strings.StartsWith(l,"jsonp|")?[uri.substring(6),true]:Strings.StartsWith(l,"json|")?[uri.substring(5),false]:[uri,false]);
   uri$1=p[0];
   jsonp=p[1];
   settings=(r={},r.dataType="json",r.success=function(data)
   {
    return ok(data);
   },r.error=function(a$1,a$2,err)
   {
    return ko(Global.Error(err));
   },r);
   jsonp?(fn=Pervasives.randomFunctionName(),settings.dataType="jsonp",settings.jsonp="prefix",settings.jsonpCallback="jsonp"+fn):void 0;
   v=Global.jQuery.ajax(uri$1,settings);
  };
  return Concurrency.FromContinuations(function($1,$2,$3)
  {
   return a.apply(null,[$1,$2,$3]);
  });
 };
}());
