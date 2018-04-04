(function()
{
 "use strict";
 var Global,WebSharper,Community,PropertyGrid,PropertyItem,Obj,IGroupProperty,Properties,PropertyGrid$1,UI,Key,IntelliFactory,Runtime,Doc,AttrModule,AttrProxy,List,ListModel;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 PropertyGrid=Community.PropertyGrid=Community.PropertyGrid||{};
 PropertyItem=PropertyGrid.PropertyItem=PropertyGrid.PropertyItem||{};
 Obj=WebSharper&&WebSharper.Obj;
 IGroupProperty=PropertyGrid.IGroupProperty=PropertyGrid.IGroupProperty||{};
 Properties=PropertyGrid.Properties=PropertyGrid.Properties||{};
 PropertyGrid$1=PropertyGrid.PropertyGrid=PropertyGrid.PropertyGrid||{};
 UI=WebSharper&&WebSharper.UI;
 Key=UI&&UI.Key;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Doc=UI&&UI.Doc;
 AttrModule=UI&&UI.AttrModule;
 AttrProxy=UI&&UI.AttrProxy;
 List=WebSharper&&WebSharper.List;
 ListModel=UI&&UI.ListModel;
 PropertyItem.Create=function(param)
 {
  return PropertyItem.New(Key.Fresh(),param);
 };
 PropertyItem.New=function(Key$1,Property)
 {
  return{
   Key:Key$1,
   Property:Property
  };
 };
 IGroupProperty=PropertyGrid.IGroupProperty=Runtime.Class({
  WebSharper_Community_PropertyGrid_IProperty$get_Render:function()
  {
   return Doc.TextNode(this.name);
  },
  WebSharper_Community_PropertyGrid_IProperty$get_Name:function()
  {
   return this.name;
  }
 },Obj,IGroupProperty);
 IGroupProperty.New=Runtime.Ctor(function(name)
 {
  this.name=name;
 },IGroupProperty);
 Properties.group=function(name)
 {
  return new IGroupProperty.New(name);
 };
 Properties.check=function(name,_var)
 {
  return{
   WebSharper_Community_PropertyGrid_IProperty$get_Name:function()
   {
    return name;
   },
   WebSharper_Community_PropertyGrid_IProperty$get_Render:function()
   {
    return Doc.CheckBox([AttrModule.Class("form-control")],_var);
   }
  };
 };
 Properties.select=function(name,fncCnv,selections,_var)
 {
  return{
   WebSharper_Community_PropertyGrid_IProperty$get_Name:function()
   {
    return name;
   },
   WebSharper_Community_PropertyGrid_IProperty$get_Render:function()
   {
    return Doc.Select([AttrModule.Class("td-no-group")],fncCnv,selections,_var);
   }
  };
 };
 Properties["double"]=function(name,_var)
 {
  return{
   WebSharper_Community_PropertyGrid_IProperty$get_Name:function()
   {
    return name;
   },
   WebSharper_Community_PropertyGrid_IProperty$get_Render:function()
   {
    return Doc.FloatInputUnchecked([],_var);
   }
  };
 };
 Properties.string=function(name,_var)
 {
  return{
   WebSharper_Community_PropertyGrid_IProperty$get_Name:function()
   {
    return name;
   },
   WebSharper_Community_PropertyGrid_IProperty$get_Render:function()
   {
    return Doc.Input([],_var);
   }
  };
 };
 PropertyGrid$1=PropertyGrid.PropertyGrid=Runtime.Class({
  get_Render:function()
  {
   return Doc.Element("div",[AttrModule.Class("propertyGrid")],[Doc.Element("table",[],[Doc.ConvertBy(function(m)
   {
    return m.Key;
   },function(item)
   {
    return item.Property instanceof IGroupProperty?Doc.Element("tr",[],[Doc.Element("td",[AttrModule.Class("td-group"),AttrProxy.Create("colspan","2")],[item.Property.WebSharper_Community_PropertyGrid_IProperty$get_Render()])]):Doc.Element("tr",[],[Doc.Element("td",[AttrModule.Class("td-no-group")],[Doc.TextNode(item.Property.WebSharper_Community_PropertyGrid_IProperty$get_Name())]),Doc.Element("td",[AttrModule.Class("td-no-group")],[item.Property.WebSharper_Community_PropertyGrid_IProperty$get_Render()])]);
   },this.Properties.v)])]);
  },
  Edit:function(properties)
  {
   this.Properties.Clear();
   this.Properties.AppendMany(List.map(PropertyItem.Create,properties));
  }
 },null,PropertyGrid$1);
 PropertyGrid$1.get_Create=function()
 {
  return PropertyGrid$1.New(ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty));
 };
 PropertyGrid$1.New=function(Properties$1)
 {
  return new PropertyGrid$1({
   Properties:Properties$1
  });
 };
}());
