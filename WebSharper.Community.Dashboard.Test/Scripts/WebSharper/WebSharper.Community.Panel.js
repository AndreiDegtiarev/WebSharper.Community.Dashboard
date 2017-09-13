(function()
{
 "use strict";
 var Global,WebSharper,Community,Panel,Helper,WrapControlsAligment,WrapControls,PanelData,TitleButton,Panel$1,PanelContainer,Rect,LayoutManagers,SC$1,Dialog,List,Seq,Unchecked,Guid,UI,Next,Doc,AttrModule,Var,View,IntelliFactory,Runtime,Input,Mouse,ListModel,console;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Panel=Community.Panel=Community.Panel||{};
 Helper=Panel.Helper=Panel.Helper||{};
 WrapControlsAligment=Panel.WrapControlsAligment=Panel.WrapControlsAligment||{};
 WrapControls=Panel.WrapControls=Panel.WrapControls||{};
 PanelData=Panel.PanelData=Panel.PanelData||{};
 TitleButton=Panel.TitleButton=Panel.TitleButton||{};
 Panel$1=Panel.Panel=Panel.Panel||{};
 PanelContainer=Panel.PanelContainer=Panel.PanelContainer||{};
 Rect=Panel.Rect=Panel.Rect||{};
 LayoutManagers=Panel.LayoutManagers=Panel.LayoutManagers||{};
 SC$1=Global.StartupCode$WebSharper_Community_Panel$LayoutManagers=Global.StartupCode$WebSharper_Community_Panel$LayoutManagers||{};
 Dialog=Panel.Dialog=Panel.Dialog||{};
 List=WebSharper&&WebSharper.List;
 Seq=WebSharper&&WebSharper.Seq;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Guid=WebSharper&&WebSharper.Guid;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 Doc=Next&&Next.Doc;
 AttrModule=Next&&Next.AttrModule;
 Var=Next&&Next.Var;
 View=Next&&Next.View;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Input=Next&&Next.Input;
 Mouse=Input&&Input.Mouse;
 ListModel=Next&&Next.ListModel;
 console=Global.console;
 Helper.MoveItemInModelList=function(items,isDown,item)
 {
  var listItems,targetIndex,p,first;
  listItems=List.ofSeq(items);
  targetIndex=isDown?Seq.findIndex(function(entry)
  {
   return Unchecked.Equals(entry,item);
  },listItems)+1:Seq.findIndex(function(entry)
  {
   return Unchecked.Equals(entry,item);
  },listItems)-1;
  targetIndex>=0&&targetIndex<listItems.get_Length()?(items.Clear(),p=List.splitAt(targetIndex,List.filter(function(entry)
  {
   return!Unchecked.Equals(entry,item);
  },listItems)),first=p[0],List.iter(function(entry)
  {
   items.Append(entry);
  },List.append(first,new List.T({
   $:1,
   $0:item,
   $1:p[1]
  }))),List.iter(function(entry)
  {
   items.Append(entry);
  },first)):void 0;
 };
 Helper.UniqueKey=function()
 {
  var c;
  c=Guid.NewGuid();
  return Global.String(c);
 };
 Helper.TxtIconNormal=function(id,txt,action)
 {
  return Helper.TxtIcon("material-icons orange600",id,txt,action);
 };
 Helper.TxtIcon=function(className,id,txt,action)
 {
  return Doc.Element("div",Helper.AttrsClick(action),[Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[],[Doc.Element("i",[AttrModule.Class(className)],[Doc.TextNode(id)])]),Doc.Element("td",[AttrModule.Style("vertical-align","middle")],[Doc.TextNode(txt)])])])]);
 };
 Helper.IconSmall=function(id,action)
 {
  return Helper.Icon("material-icons orange600 small",id,action);
 };
 Helper.IconNormal=function(id,action)
 {
  return Helper.Icon("material-icons orange600",id,action);
 };
 Helper.Icon=function(className,id,action)
 {
  return Doc.Element("i",new List.T({
   $:1,
   $0:AttrModule.Class(className),
   $1:Helper.AttrsClick(action)
  }),[Doc.TextNode(id)]);
 };
 Helper.AttrsClick=function(action)
 {
  return List.ofArray([AttrModule.Style("Color","#FB8C00"),AttrModule.Style("cursor","pointer"),AttrModule.Handler("click",function()
  {
   return function()
   {
    return action();
   };
  })]);
 };
 WrapControlsAligment.Horizontal={
  $:1
 };
 WrapControlsAligment.Vertical={
  $:0
 };
 WrapControls.Render=function(icons,aligment,content)
 {
  var mouseOver,icons$1;
  mouseOver=Var.Create$1(false);
  icons$1=Doc.Element("div",[AttrModule.DynamicStyle("display",View.Map(function(value)
  {
   return!value?"none":"block";
  },mouseOver.v))],icons);
  return aligment.$==1?Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[],[content]),Doc.Element("td",[],[icons$1])])]).on("mouseenter",function()
  {
   return Var.Set(mouseOver,true);
  }).on("mouseleave",function()
  {
   return Var.Set(mouseOver,false);
  }):Doc.Element("div",[],[icons$1,content]);
 };
 PanelData.Create=function(key,left,top,children)
 {
  return PanelData.New(key,left,top,children);
 };
 PanelData.New=function(Key,Left,Top,Children)
 {
  return{
   Key:Key,
   Left:Left,
   Top:Top,
   Children:Children
  };
 };
 TitleButton=Panel.TitleButton=Runtime.Class({
  Render:function(panel)
  {
   var $this;
   $this=this;
   return Helper.IconSmall(this.Icon,function()
   {
    $this.Action(panel);
   });
  }
 },null,TitleButton);
 TitleButton.New=function(Icon,Action)
 {
  return new TitleButton({
   Icon:Icon,
   Action:Action
  });
 };
 Panel$1=Panel.Panel=Runtime.Class({
  get_Render:function()
  {
   var $this,dragActive,mouseOverVar,leftOffset,topOffset,toLocal,titleAttrsUpdated,titleContentUpdated,attrWidth,resDiv;
   function a(x_cor,y_cor)
   {
    var domRectParent,domRectParentParent,maxX,maxY,xPos,b,a$3,b$1,yPos,b$2,a$4,b$3;
    return dragActive.c?(domRectParent=$this.Element.c.getBoundingClientRect(),(domRectParentParent=$this.Element.c.parentElement.getBoundingClientRect(),(maxX=domRectParentParent.width-domRectParent.width,(maxY=domRectParentParent.height-domRectParent.height,(xPos=(b=(a$3=0,(b$1=+x_cor-leftOffset.c,Unchecked.Compare(a$3,b$1)===1?a$3:b$1)),Unchecked.Compare(maxX,b)===-1?maxX:b),(yPos=(b$2=(a$4=0,(b$3=+y_cor-topOffset.c,Unchecked.Compare(a$4,b$3)===1?a$4:b$3)),Unchecked.Compare(maxY,b$2)===-1?maxY:b$2),(Var.Set($this.Left,xPos),Var.Set($this.Top,yPos),$this.Relayout($this),[xPos,yPos]))))))):[$this.Left.c,$this.Top.c];
   }
   function a$1(x,y)
   {
    return(function($1)
    {
     return function($2)
     {
      return $1($2.toFixed(6)+"px");
     };
    }(Global.id))(x);
   }
   function a$2(x,y)
   {
    return(function($1)
    {
     return function($2)
     {
      return $1($2.toFixed(6)+"px");
     };
    }(Global.id))(y);
   }
   $this=this;
   dragActive=Var.Create$1(false);
   mouseOverVar=Var.Create$1(false);
   leftOffset=Var.Create$1(0);
   topOffset=Var.Create$1(0);
   toLocal=View.Map(function($1)
   {
    return a($1[0],$1[1]);
   },View.UpdateWhile([0,0],View.Map(function(v)
   {
    return v&&dragActive.c;
   },Mouse.get_LeftPressed()),Mouse.get_Position()));
   titleAttrsUpdated=Seq.concat([this.TitleAttrs,List.ofArray([AttrModule.Style("cursor","grab"),AttrModule.Handler("mouseenter",function()
   {
    return function()
    {
     return Var.Set(mouseOverVar,true);
    };
   }),AttrModule.Handler("mouseleave",function()
   {
    return function()
    {
     return!dragActive.c?Var.Set(mouseOverVar,false):null;
    };
   }),AttrModule.Handler("mouseup",function()
   {
    return function()
    {
     Var.Set(mouseOverVar,false);
     return Var.Set(dragActive,false);
    };
   }),AttrModule.Handler("mousedown",function()
   {
    return function(evnt)
    {
     mouseOverVar.c&&!Unchecked.Equals($this.Element.c.parentElement,null)&&!Unchecked.Equals($this.Element.c.parentElement.parentElement,null)?Var.Set(dragActive,true):void 0;
     Var.Set(leftOffset,+evnt.clientX-$this.Left.c);
     return Var.Set(topOffset,+evnt.clientY-$this.Top.c);
    };
   })])]);
   titleContentUpdated=Doc.Element("table",[AttrModule.Style("width","100%")],[Doc.Element("tr",[],[Doc.Element("td",[],[this.TitleContent]),Doc.Element("td",[AttrModule.Style("text-align","right"),AttrModule.Style("vertical-align","middle")],List.map(function(btn)
   {
    return btn.Render($this);
   },this.TitleButtons))])]);
   attrWidth=this.Width>0?List.ofArray([AttrModule.Style("width",(function($1)
   {
    return function($2)
    {
     return $1($2.toFixed(6)+"px");
    };
   }(Global.id))(this.Width))]):List.T.Empty;
   resDiv=Doc.Element("div",Seq.concat([this.PannelAttrs,Seq.concat([attrWidth,this.Height>0?List.ofArray([AttrModule.Style("height",(function($1)
   {
    return function($2)
    {
     return $1($2.toFixed(6)+"px");
    };
   }(Global.id))(this.Height))]):List.T.Empty]),List.ofArray([AttrModule.DynamicStyle("left",View.Map(function(x)
   {
    return(function($1)
    {
     return function($2)
     {
      return $1($2.toFixed(6)+"px");
     };
    }(Global.id))(x);
   },this.Left.v)),AttrModule.DynamicStyle("left",View.Map(function($1)
   {
    return a$1($1[0],$1[1]);
   },toLocal)),AttrModule.DynamicStyle("top",View.Map(function($1)
   {
    return a$2($1[0],$1[1]);
   },toLocal)),AttrModule.DynamicStyle("top",View.Map(function(y)
   {
    return(function($1)
    {
     return function($2)
     {
      return $1($2.toFixed(6)+"px");
     };
    }(Global.id))(y);
   },this.Top.v))])]),[Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",attrWidth,[Doc.EmbedView(View.Map(function(is)
   {
    return is?Doc.Element("div",titleAttrsUpdated,[titleContentUpdated]):Doc.Element("div",[],[]);
   },this.IsWithTitle.v))])]),Doc.Element("tr",[],[Doc.Element("td",[],[this.PanelContent,this.Children.get_Render()])])])]);
   Var.Set(this.Element,resDiv.elt);
   return resDiv.OnAfterRender(function()
   {
    $this.onAfterRender($this);
   });
  },
  get_PanelData:function()
  {
   return PanelData.Create(this.Key,this.Left.c,this.Top.c,List.map(function(panel)
   {
    return panel.get_PanelData();
   },List.ofSeq(this.Children.PanelItems)));
  },
  EditProperties:function(propGrid)
  {
   propGrid.Edit(List.concat([this.Properties,List.concat(List.map(function(childPanel)
   {
    return childPanel.Properties;
   },List.ofSeq(this.Children.PanelItems)))]));
  },
  WithInitialAutoLayout:function()
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties,Var.Create$1(true));
  },
  WithHeight:function(cy)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,cy,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties,this.IsWithInitialAutoLayout);
  },
  WithWidth:function(cx)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,cx,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties,this.IsWithInitialAutoLayout);
  },
  WithProperties:function(properties)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,properties,this.IsWithInitialAutoLayout);
  },
  WithOnAfterRender:function(fnc)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,fnc,this.Properties,this.IsWithInitialAutoLayout);
  },
  WithInternalName:function(name)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,name,this.onAfterRender,this.Properties,this.IsWithInitialAutoLayout);
  },
  WithTitle:function(withTitle)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,withTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties,this.IsWithInitialAutoLayout);
  },
  WithChildPanelContainer:function(container)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,container,this.InternalName,this.onAfterRender,this.Properties,this.IsWithInitialAutoLayout);
  },
  WithRelayoutFnc:function(fnc)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,fnc,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties,this.IsWithInitialAutoLayout);
  },
  WithPanelContent:function(content)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,content,this.Children,this.InternalName,this.onAfterRender,this.Properties,this.IsWithInitialAutoLayout);
  },
  WithTitleButtons:function(buttons)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,buttons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties,this.IsWithInitialAutoLayout);
  },
  WithTitleContent:function(content)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,content,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties,this.IsWithInitialAutoLayout);
  },
  WithTitleAttrs:function(attrs)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,attrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties,this.IsWithInitialAutoLayout);
  },
  WithPannelAttrs:function(attrs)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,attrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties,this.IsWithInitialAutoLayout);
  },
  WithKey:function(key)
  {
   return Panel$1.New(key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties,this.IsWithInitialAutoLayout);
  }
 },null,Panel$1);
 Panel$1.get_Create=function()
 {
  var c;
  return Panel$1.New((c=Guid.NewGuid(),Global.String(c)),Var.Create$1(0),Var.Create$1(0),0,0,Var.Create$1(null),Global.ignore,List.T.Empty,Var.Create$1(true),List.ofArray([AttrModule.Class("panelTitle")]),Doc.Element("div",[],[]),List.T.Empty,Doc.Element("div",[],[]),PanelContainer.get_Create(),"",Global.ignore,List.T.Empty,Var.Create$1(false));
 };
 Panel$1.New=function(Key,Left,Top,Width,Height,Element,Relayout,PannelAttrs,IsWithTitle,TitleAttrs,TitleContent,TitleButtons,PanelContent,Children,InternalName,onAfterRender,Properties,IsWithInitialAutoLayout)
 {
  return new Panel$1({
   Key:Key,
   Left:Left,
   Top:Top,
   Width:Width,
   Height:Height,
   Element:Element,
   Relayout:Relayout,
   PannelAttrs:PannelAttrs,
   IsWithTitle:IsWithTitle,
   TitleAttrs:TitleAttrs,
   TitleContent:TitleContent,
   TitleButtons:TitleButtons,
   PanelContent:PanelContent,
   Children:Children,
   InternalName:InternalName,
   onAfterRender:onAfterRender,
   Properties:Properties,
   IsWithInitialAutoLayout:IsWithInitialAutoLayout
  });
 };
 PanelContainer=Panel.PanelContainer=Runtime.Class({
  get_Render:function()
  {
   var $this;
   $this=this;
   return Doc.Element("div",Seq.concat([this.ContainerAttributes,this.Width>0?List.ofArray([AttrModule.Style("width",(function($1)
   {
    return function($2)
    {
     return $1($2.toFixed(6)+"px");
    };
   }(Global.id))(this.Width))]):List.T.Empty,this.Height>0?List.ofArray([AttrModule.Style("height",(function($1)
   {
    return function($2)
    {
     return $1($2.toFixed(6)+"px");
    };
   }(Global.id))(this.Height))]):List.T.Empty,List.ofArray([AttrModule.Style("position","relative")])]),[Doc.ConvertBy(function(m)
   {
    return m.Key;
   },function(item)
   {
    return item.get_Render().OnAfterRender(function()
    {
     if(item.IsWithInitialAutoLayout.c)
      {
       $this.LayoutManager.WebSharper_Community_Panel_ILayoutManager$PlacePanel($this,item);
       Var.Set(item.IsWithInitialAutoLayout,false);
      }
    });
   },this.PanelItems.v)]);
  },
  AddPanel:function(panel)
  {
   var o,a;
   this.PanelItems.Append(panel.WithRelayoutFnc((o=this.LayoutManager,(a=this,function(a$1)
   {
    o.WebSharper_Community_Panel_ILayoutManager$Relayout(a,a$1);
   }))));
  },
  FindPanelItem:function(panel)
  {
   return Seq.find(function(item)
   {
    return Unchecked.Equals(item.Element,panel.Element);
   },List.ofSeq(this.PanelItems));
  },
  WithHeight:function(cy)
  {
   return PanelContainer.New(this.Width,cy,this.PanelItems,this.LayoutManager,this.ContainerAttributes);
  },
  WithWidth:function(cx)
  {
   return PanelContainer.New(cx,this.Height,this.PanelItems,this.LayoutManager,this.ContainerAttributes);
  },
  WithLayoutManager:function(layoutManager)
  {
   return PanelContainer.New(this.Width,this.Height,this.PanelItems,layoutManager,this.ContainerAttributes);
  },
  WithAttributes:function(attrs)
  {
   return PanelContainer.New(this.Width,this.Height,this.PanelItems,this.LayoutManager,attrs);
  }
 },null,PanelContainer);
 PanelContainer.get_Create=function()
 {
  return PanelContainer.New(0,0,ListModel.Create(function(item)
  {
   return item.Key;
  },List.T.Empty),{
   WebSharper_Community_Panel_ILayoutManager$Relayout:function()
   {
    return null;
   },
   WebSharper_Community_Panel_ILayoutManager$PlacePanel:function()
   {
    return null;
   }
  },List.T.Empty);
 };
 PanelContainer.New=function(Width,Height,PanelItems,LayoutManager,ContainerAttributes)
 {
  return new PanelContainer({
   Width:Width,
   Height:Height,
   PanelItems:PanelItems,
   LayoutManager:LayoutManager,
   ContainerAttributes:ContainerAttributes
  });
 };
 Rect=Panel.Rect=Runtime.Class({
  toString:function()
  {
   return"left:"+Global.String(this.left)+" "+" top:"+Global.String(this.top)+" right:"+Global.String(this.right)+" bottom:"+Global.String(this.bottom);
  },
  inflate:function(width,height)
  {
   return Rect.New(this.left-width,this.right+width,this.top-height,this.bottom+height);
  },
  get_minSize:function()
  {
   var a,b;
   a=this.get_width();
   b=this.get_height();
   return Unchecked.Compare(a,b)===-1?a:b;
  },
  get_height:function()
  {
   return this.bottom-this.top;
  },
  get_width:function()
  {
   return this.right-this.left;
  },
  intersect:function(rect)
  {
   var left,a,b,right,a$1,b$1,top,a$2,b$2,bottom,a$3,b$3;
   left=(a=this.left,(b=rect.left,Unchecked.Compare(a,b)===1?a:b));
   right=(a$1=this.right,(b$1=rect.right,Unchecked.Compare(a$1,b$1)===-1?a$1:b$1));
   top=(a$2=this.top,(b$2=rect.top,Unchecked.Compare(a$2,b$2)===1?a$2:b$2));
   bottom=(a$3=this.bottom,(b$3=rect.bottom,Unchecked.Compare(a$3,b$3)===-1?a$3:b$3));
   return Rect.New(left,Unchecked.Compare(left,right)===1?left:right,top,Unchecked.Compare(top,bottom)===1?top:bottom);
  },
  offset:function(x_offset,y_offset)
  {
   return Rect.New(this.left+x_offset,this.right+x_offset,this.top+y_offset,this.bottom+y_offset);
  },
  get_isEmpty:function()
  {
   return this.left>=this.right||this.top>=this.bottom;
  }
 },null,Rect);
 Rect.fromPanel=function(panel)
 {
  return Rect.fromDomRect(panel.Element.c).offset(panel.Left.c,panel.Top.c);
 };
 Rect.fromDomRect=function(elem)
 {
  var domRc;
  return!Unchecked.Equals(elem,null)?(domRc=elem.getBoundingClientRect(),Rect.New(0,domRc.width,0,domRc.height)):Rect.Create(0,0,0,0);
 };
 Rect.Create=function(left,top,right,bottom)
 {
  return Rect.New(left,right,top,bottom);
 };
 Rect.New=function(left,right,top,bottom)
 {
  return new Rect({
   left:left,
   right:right,
   top:top,
   bottom:bottom
  });
 };
 LayoutManagers.StackPanelLayoutManager=function()
 {
  SC$1.$cctor();
  return SC$1.StackPanelLayoutManager;
 };
 LayoutManagers.FloatingPanelLayoutManager=function(margin)
 {
  return{
   WebSharper_Community_Panel_ILayoutManager$Relayout:function(panelContainer,exceptPanel)
   {
    return LayoutManagers.relayout(panelContainer,exceptPanel,margin);
   },
   WebSharper_Community_Panel_ILayoutManager$PlacePanel:function(panelContainer,panelItem)
   {
    return LayoutManagers.placePanel(panelContainer,panelItem,margin);
   }
  };
 };
 LayoutManagers.relayout=function(panelContainer,exceptPanel,margin)
 {
  var panelItems,exceptPanelItem,foundPanel;
  panelItems=panelContainer.PanelItems;
  exceptPanelItem=Seq.find(function(panelItem)
  {
   return panelItem.Key===exceptPanel.Key;
  },List.ofSeq(panelItems));
  foundPanel=Seq.tryFind(function(panelItem)
  {
   return panelItem.Key!==exceptPanelItem.Key&&Rect.fromPanel(panelItem).intersect(Rect.fromPanel(exceptPanelItem)).get_minSize()>15;
  },List.ofSeq(panelItems));
  foundPanel!=null&&foundPanel.$==1?LayoutManagers.movePanelToFreeSpace(panelItems,foundPanel.$0,margin):void 0;
 };
 LayoutManagers.placePanel=function(panelContainer,panelItem,margin)
 {
  var rcPanel,foundCandidate,rc;
  rcPanel=Rect.fromPanel(panelItem);
  foundCandidate=Seq.tryFind(function(rc$1)
  {
   return rc$1.get_width()>=rcPanel.get_width()&&rc$1.get_height()>=rcPanel.get_height();
  },LayoutManagers.collectFreeSpace(panelContainer.PanelItems,Rect.Create(0,0,panelContainer.Width,panelContainer.Height),panelItem,margin));
  foundCandidate!=null&&foundCandidate.$==1?(rc=foundCandidate.$0,Var.Set(panelItem.Left,rc.left+margin),Var.Set(panelItem.Top,rc.top+margin)):void 0;
 };
 LayoutManagers.movePanelToFreeSpace=function(panelItems,panelItem,margin)
 {
  var rcPanel,foundCandidate,rc;
  rcPanel=Rect.fromPanel(panelItem);
  foundCandidate=Seq.tryFind(function(rc$1)
  {
   return rc$1.get_width()>=rcPanel.get_width()&&rc$1.get_height()>=rcPanel.get_height();
  },LayoutManagers.collectFreeSpace(panelItems,Rect.fromDomRect(panelItem.Element.c.parentElement),panelItem,margin));
  foundCandidate!=null&&foundCandidate.$==1?(rc=foundCandidate.$0,Var.Set(panelItem.Left,rc.left+margin),Var.Set(panelItem.Top,rc.top+margin)):void 0;
 };
 LayoutManagers.collectFreeSpace=function(panelItems,rcContainer,except,margin)
 {
  var x;
  x=List.filter(function(item)
  {
   return item.Key!==except.Key;
  },List.ofSeq(panelItems));
  return Seq.fold(function(acc,panel)
  {
   var rcPanel,rcTop,rcLeft;
   rcPanel=LayoutManagers.panelRect(panel,0);
   rcTop=Rect.New(0,rcContainer.right,0,rcPanel.top);
   rcLeft=Rect.New(0,rcPanel.left,0,rcContainer.bottom);
   return List.concat(List.map(function(rc)
   {
    return List.filter(function(accRect)
    {
     return!accRect.get_isEmpty();
    },List.map(function(accRc)
    {
     return accRc.intersect(rc);
    },acc));
   },List.ofArray([rcTop,rcLeft,Rect.New(rcPanel.right,rcContainer.right,rcLeft.top,rcLeft.bottom),Rect.New(rcTop.left,rcTop.right,rcPanel.bottom,rcContainer.bottom)])));
  },List.ofArray([rcContainer]),x);
 };
 LayoutManagers.calcClientArea=function(panelItems,stopItem,margin)
 {
  var rects;
  rects=List.map(function(panel)
  {
   console.log(panel.InternalName);
   return LayoutManagers.panelRect(panel,margin);
  },function(acc,lst)
  {
   var rest,head;
   while(true)
    if(lst.$==1)
     {
      rest=lst.$1;
      head=lst.$0;
      if(head.Key===stopItem.Key)
       return acc;
      else
       {
        acc=new List.T({
         $:1,
         $0:head,
         $1:acc
        });
        lst=rest;
       }
     }
    else
     return acc;
  }(List.T.Empty,List.ofSeq(panelItems)));
  return rects.$==0?Rect.Create(0,0,0,0):Rect.Create(List.min(List.map(function(rc)
  {
   return rc.left;
  },rects)),List.min(List.map(function(rc)
  {
   return rc.top;
  },rects)),List.max(List.map(function(rc)
  {
   return rc.right;
  },rects)),List.max(List.map(function(rc)
  {
   return rc.bottom;
  },rects)));
 };
 LayoutManagers.panelRect=function(panel,margin)
 {
  return Rect.fromPanel(panel).inflate(margin,margin);
 };
 SC$1.$cctor=function()
 {
  SC$1.$cctor=Global.ignore;
  SC$1.StackPanelLayoutManager={
   WebSharper_Community_Panel_ILayoutManager$Relayout:function(panelContainer,exceptPanel)
   {
    return LayoutManagers.relayout(panelContainer,exceptPanel,0);
   },
   WebSharper_Community_Panel_ILayoutManager$PlacePanel:function()
   {
    return null;
   }
  };
 };
 Dialog=Panel.Dialog=Runtime.Class({
  get_Render:function()
  {
   var $this;
   $this=this;
   return Doc.Element("div",[AttrModule.Style("position","absolute"),AttrModule.Style("left","250px"),AttrModule.Style("top","200px"),AttrModule.Style("z-index","1"),AttrModule.Style("background-color","white"),AttrModule.Style("min-height","100px"),AttrModule.Style("min-width","200px"),AttrModule.DynamicStyle("display",View.Map(function(isVis)
   {
    return isVis?"block":"none";
   },this.Visibility.v))],[Doc.Element("table",[AttrModule.Style("background-color","grey"),AttrModule.Style("display","block"),AttrModule.Style("min-height","100px"),AttrModule.Style("min-width","200px")],[Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[AttrModule.Style("border-style","hidden"),AttrModule.Style("background","#404040"),AttrModule.Style("color","rgb(200,200,200)"),AttrModule.Style("padding","0px 2px 5px 2px"),AttrModule.Style("Width","200px"),AttrModule.Style("font-size","medium")],[Doc.TextView(this.Title.v)])])]),Doc.Element("table",[],[Doc.Element("tr",[],[Doc.Element("td",[AttrModule.Style("padding","5px 0px 0px 2px")],[Doc.BindView(Global.id,this.Content.v)])]),Doc.Element("tr",[],[Doc.Element("td",[AttrModule.Style("padding","20px 12px 2px 20px")],[Doc.Element("button",[AttrModule.Style("border-radius","2px"),AttrModule.Handler("click",function()
   {
    return function()
    {
     Var.Set($this.Visibility,false);
     return $this.OKCallback.c();
    };
   })],[Doc.TextNode("OK")])]),Doc.Element("td",[AttrModule.Style("padding","20px 12px 2px 50px")],[Doc.Element("button",[AttrModule.Style("border-radius","2px"),AttrModule.Handler("click",function()
   {
    return function()
    {
     return Var.Set($this.Visibility,false);
    };
   })],[Doc.TextNode("Cancel")])])])])])]);
  },
  ShowDialog:function(title,content,okCallback)
  {
   Var.Set(this.Title,title);
   Var.Set(this.Content,content);
   Var.Set(this.Visibility,true);
   Var.Set(this.OKCallback,okCallback);
  }
 },null,Dialog);
 Dialog.get_Create=function()
 {
  return Dialog.New(Var.Create$1(""),Var.Create$1(Doc.Element("div",[],[])),Var.Create$1(false),Var.Create$1(Global.ignore));
 };
 Dialog.New=function(Title,Content,Visibility,OKCallback)
 {
  return new Dialog({
   Title:Title,
   Content:Content,
   Visibility:Visibility,
   OKCallback:OKCallback
  });
 };
}());
