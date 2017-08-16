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
    return Doc.Select([AttrModule.Class("form-control")],fncCnv,selections,_var);
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
   return Doc.Element("div",[AttrModule.Class("propertyGrid")],[Doc.ConvertBy(function(m)
   {
    return m.Key;
   },function(item)
   {
    return item.Property instanceof IGroupProperty?Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[AttrModule.Class("td-group")],[item.Property.WebSharper_Community_PropertyGrid_IProperty$get_Render()])])]):Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[AttrModule.Class("td-no-group")],[Doc.TextNode(item.Property.WebSharper_Community_PropertyGrid_IProperty$get_Name())]),Doc.Element("td",[AttrModule.Class("td-no-group")],[item.Property.WebSharper_Community_PropertyGrid_IProperty$get_Render()])])]);
   },this.Properties.v)]);
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
