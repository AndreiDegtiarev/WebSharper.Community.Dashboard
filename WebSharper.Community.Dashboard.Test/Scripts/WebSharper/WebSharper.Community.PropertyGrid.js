(function()
{
 "use strict";
 var Global,WebSharper,Community,PropertyGrid,PropertyItem,IGroupProperty,Properties,PropertyGrid$1,UI,Next,Key,IntelliFactory,Runtime,Doc,AttrModule,List,ListModel;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 PropertyGrid=Community.PropertyGrid=Community.PropertyGrid||{};
 PropertyItem=PropertyGrid.PropertyItem=PropertyGrid.PropertyItem||{};
 IGroupProperty=PropertyGrid.IGroupProperty=PropertyGrid.IGroupProperty||{};
 Properties=PropertyGrid.Properties=PropertyGrid.Properties||{};
 PropertyGrid$1=PropertyGrid.PropertyGrid=PropertyGrid.PropertyGrid||{};
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Key=Next&&Next.Key;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Doc=Next&&Next.Doc;
 AttrModule=Next&&Next.AttrModule;
 List=WebSharper&&WebSharper.List;
 ListModel=Next&&Next.ListModel;
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
 },null,IGroupProperty);
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
   WebSharper_Community_PropertyGrid_IProperty$get_Render:function()
   {
    var a;
    a=[AttrModule.Class("form-control")];
    return Doc.CheckBox(a,_var);
   },
   WebSharper_Community_PropertyGrid_IProperty$get_Name:function()
   {
    return name;
   }
  };
 };
 Properties.select=function(name,fncCnv,selections,_var)
 {
  return{
   WebSharper_Community_PropertyGrid_IProperty$get_Render:function()
   {
    var a;
    a=[AttrModule.Class("form-control")];
    return Doc.Select(a,fncCnv,selections,_var);
   },
   WebSharper_Community_PropertyGrid_IProperty$get_Name:function()
   {
    return name;
   }
  };
 };
 Properties["double"]=function(name,_var)
 {
  return{
   WebSharper_Community_PropertyGrid_IProperty$get_Render:function()
   {
    return Doc.FloatInputUnchecked([],_var);
   },
   WebSharper_Community_PropertyGrid_IProperty$get_Name:function()
   {
    return name;
   }
  };
 };
 Properties.string=function(name,_var)
 {
  return{
   WebSharper_Community_PropertyGrid_IProperty$get_Render:function()
   {
    return Doc.Input([],_var);
   },
   WebSharper_Community_PropertyGrid_IProperty$get_Name:function()
   {
    return name;
   }
  };
 };
 PropertyGrid$1=PropertyGrid.PropertyGrid=Runtime.Class({
  get_Render:function()
  {
   var renderItem,a,a$1,a$2;
   renderItem=function(item)
   {
    var a$3,a$4,a$5,a$6,a$7,a$8,a$9,a$10,a$11,a$12;
    return item.Property instanceof IGroupProperty?(a$3=[(a$4=[(a$5=[AttrModule.Class("td-group")],(a$6=[item.Property.WebSharper_Community_PropertyGrid_IProperty$get_Render()],Doc.Element("td",a$5,a$6)))],Doc.Element("tr",[],a$4))],Doc.Element("table",[],a$3)):(a$7=[(a$8=[(a$9=[AttrModule.Class("td-no-group")],(a$10=[Doc.TextNode(item.Property.WebSharper_Community_PropertyGrid_IProperty$get_Name())],Doc.Element("td",a$9,a$10))),(a$11=[AttrModule.Class("td-no-group")],(a$12=[item.Property.WebSharper_Community_PropertyGrid_IProperty$get_Render()],Doc.Element("td",a$11,a$12)))],Doc.Element("tr",[],a$8))],Doc.Element("table",[],a$7));
   };
   a=[AttrModule.Class("propertyGrid")];
   a$1=[(a$2=function(m)
   {
    return m.Key;
   },function(a$3)
   {
    return Doc.ConvertBy(a$2,renderItem,a$3);
   }(this.Properties.v))];
   return Doc.Element("div",a,a$1);
  },
  Edit:function(properties)
  {
   this.Properties.Clear();
   this.Properties.AppendMany(List.map(PropertyItem.Create,properties));
  }
 },null,PropertyGrid$1);
 PropertyGrid$1.get_Create=function()
 {
  var a;
  return PropertyGrid$1.New((a=List.T.Empty,ListModel.Create(function(item)
  {
   return item.Key;
  },a)));
 };
 PropertyGrid$1.New=function(Properties$1)
 {
  return new PropertyGrid$1({
   Properties:Properties$1
  });
 };
}());
