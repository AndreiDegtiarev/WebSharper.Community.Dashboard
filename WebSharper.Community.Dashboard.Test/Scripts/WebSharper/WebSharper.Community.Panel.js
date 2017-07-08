(function()
{
 "use strict";
 var Global,WebSharper,Community,Panel,Helper,TitleButton,Panel$1,PanelContainer,Rect,LayoutManagers,SC$1,Dialog,List,UI,Next,AttrModule,Doc,IntelliFactory,Runtime,Var,Input,Mouse,View,Operators,Seq,Unchecked,Key,ListModel;
 Global=window;
 WebSharper=Global.WebSharper=Global.WebSharper||{};
 Community=WebSharper.Community=WebSharper.Community||{};
 Panel=Community.Panel=Community.Panel||{};
 Helper=Panel.Helper=Panel.Helper||{};
 TitleButton=Panel.TitleButton=Panel.TitleButton||{};
 Panel$1=Panel.Panel=Panel.Panel||{};
 PanelContainer=Panel.PanelContainer=Panel.PanelContainer||{};
 Rect=Panel.Rect=Panel.Rect||{};
 LayoutManagers=Panel.LayoutManagers=Panel.LayoutManagers||{};
 SC$1=Global.StartupCode$WebSharper_Community_Panel$LayoutManagers=Global.StartupCode$WebSharper_Community_Panel$LayoutManagers||{};
 Dialog=Panel.Dialog=Panel.Dialog||{};
 List=WebSharper&&WebSharper.List;
 UI=WebSharper&&WebSharper.UI;
 Next=UI&&UI.Next;
 AttrModule=Next&&Next.AttrModule;
 Doc=Next&&Next.Doc;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 Var=Next&&Next.Var;
 Input=Next&&Next.Input;
 Mouse=Input&&Input.Mouse;
 View=Next&&Next.View;
 Operators=WebSharper&&WebSharper.Operators;
 Seq=WebSharper&&WebSharper.Seq;
 Unchecked=WebSharper&&WebSharper.Unchecked;
 Key=Next&&Next.Key;
 ListModel=Next&&Next.ListModel;
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
  var a,a$1;
  a=new List.T({
   $:1,
   $0:AttrModule.Class(className),
   $1:Helper.AttrsClick(action)
  });
  a$1=[Doc.TextNode(id)];
  return Doc.Element("i",a,a$1);
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
   var $this,dragActive,mouseOverVar,leftOffset,topOffset,mapDragActive,a,lastHeldPos,a$1,toLocal,f,titleAttrsUpdated,titleContentUpdated,a$2,a$3,a$4,a$5,a$6,a$7,m,attrWidth,f$1,attrHeight,f$2,panelAttrsUpdated,a$8,a$9,a$10,a$11,resDiv,a$12,a$13,a$14,a$15,a$16,a$17,a$18,a$19;
   $this=this;
   dragActive=Var.Create$1(false);
   mouseOverVar=Var.Create$1(false);
   leftOffset=Var.Create$1(0);
   topOffset=Var.Create$1(0);
   mapDragActive=(a=Mouse.get_LeftPressed(),View.Map(function(v)
   {
    return v?dragActive.c:false;
   },a));
   lastHeldPos=(a$1=Mouse.get_Position(),View.UpdateWhile([0,0],mapDragActive,a$1));
   toLocal=(f=function(x_cor,y_cor)
   {
    var domRectParent,domRectParentParent,maxX,maxY,xPos,yPos,a$20,a$21;
    return dragActive.c?(domRectParent=$this.Element.c.getBoundingClientRect(),(domRectParentParent=$this.Element.c.parentElement.getBoundingClientRect(),(maxX=domRectParentParent.width-domRectParent.width,(maxY=domRectParentParent.height-domRectParent.height,(xPos=Operators.Min(maxX,Operators.Max(0,+x_cor-leftOffset.c)),(yPos=Operators.Min(maxY,Operators.Max(0,+y_cor-topOffset.c)),(a$20=$this.Left,Var.Set(a$20,xPos),a$21=$this.Top,Var.Set(a$21,yPos),$this.Relayout($this),[xPos,yPos]))))))):[$this.Left.c,$this.Top.c];
   },View.Map(function($1)
   {
    return f($1[0],$1[1]);
   },lastHeldPos));
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
     var a$20,a$21;
     ((mouseOverVar.c?!Unchecked.Equals($this.Element.c.parentElement,null):false)?!Unchecked.Equals($this.Element.c.parentElement.parentElement,null):false)?Var.Set(dragActive,true):void 0;
     a$20=+evnt.clientX-$this.Left.c;
     Var.Set(leftOffset,a$20);
     a$21=+evnt.clientY-$this.Top.c;
     return Var.Set(topOffset,a$21);
    };
   })])]);
   titleContentUpdated=(a$2=[AttrModule.Style("width","100%")],(a$3=[(a$4=[(a$5=[this.TitleContent],Doc.Element("td",[],a$5)),(a$6=[AttrModule.Style("text-align","right"),AttrModule.Style("vertical-align","middle")],(a$7=(m=function(btn)
   {
    return btn.Render($this);
   },function(l)
   {
    return List.map(m,l);
   }(this.TitleButtons)),Doc.Element("td",a$6,a$7)))],Doc.Element("tr",[],a$4))],Doc.Element("table",a$2,a$3)));
   attrWidth=this.Width>0?List.ofArray([AttrModule.Style("width",(f$1=function($1,$2)
   {
    return $1($2.toFixed(6)+"px");
   },(function($1)
   {
    return function($2)
    {
     return f$1($1,$2);
    };
   }(Global.id))(this.Width)))]):List.T.Empty;
   attrHeight=this.Height>0?List.ofArray([AttrModule.Style("height",(f$2=function($1,$2)
   {
    return $1($2.toFixed(6)+"px");
   },(function($1)
   {
    return function($2)
    {
     return f$2($1,$2);
    };
   }(Global.id))(this.Height)))]):List.T.Empty;
   panelAttrsUpdated=Seq.concat([this.PannelAttrs,Seq.concat([attrWidth,attrHeight]),List.ofArray([AttrModule.DynamicStyle("left",(a$8=this.Left.v,View.Map(function(x)
   {
    var f$3;
    f$3=function($1,$2)
    {
     return $1($2.toFixed(6)+"px");
    };
    return(function($1)
    {
     return function($2)
     {
      return f$3($1,$2);
     };
    }(Global.id))(x);
   },a$8))),AttrModule.DynamicStyle("left",(a$9=function(x)
   {
    var f$3;
    f$3=function($1,$2)
    {
     return $1($2.toFixed(6)+"px");
    };
    return(function($1)
    {
     return function($2)
     {
      return f$3($1,$2);
     };
    }(Global.id))(x);
   },View.Map(function($1)
   {
    return a$9($1[0],$1[1]);
   },toLocal))),AttrModule.DynamicStyle("top",(a$10=function(x,y)
   {
    var f$3;
    f$3=function($1,$2)
    {
     return $1($2.toFixed(6)+"px");
    };
    return(function($1)
    {
     return function($2)
     {
      return f$3($1,$2);
     };
    }(Global.id))(y);
   },View.Map(function($1)
   {
    return a$10($1[0],$1[1]);
   },toLocal))),AttrModule.DynamicStyle("top",(a$11=this.Top.v,View.Map(function(y)
   {
    var f$3;
    f$3=function($1,$2)
    {
     return $1($2.toFixed(6)+"px");
    };
    return(function($1)
    {
     return function($2)
     {
      return f$3($1,$2);
     };
    }(Global.id))(y);
   },a$11)))])]);
   resDiv=(a$12=[(a$13=[(a$14=[(a$15=[this.IsWithTitle?Doc.Element("div",titleAttrsUpdated,[titleContentUpdated]):Doc.Element("div",[],[])],Doc.Element("td",attrWidth,a$15))],Doc.Element("tr",[],a$14)),(a$16=[(a$17=[this.PanelContent,this.Children.get_Render()],Doc.Element("td",[],a$17))],Doc.Element("tr",[],a$16))],Doc.Element("table",[],a$13))],Doc.Element("div",panelAttrsUpdated,a$12));
   a$18=this.Element;
   a$19=resDiv.elt;
   Var.Set(a$18,a$19);
   return resDiv.OnAfterRender(function()
   {
    $this.onAfterRender($this);
   });
  },
  EditProperties:function(propGrid)
  {
   var m;
   propGrid.Edit(List.concat([this.Properties,List.concat((m=function(childPanel)
   {
    return childPanel.Properties;
   },function(l)
   {
    return List.map(m,l);
   }(List.ofSeq(this.Children.PanelItems))))]));
  },
  WithHeight:function(cy)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,cy,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties);
  },
  WithWidth:function(cx)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,cx,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties);
  },
  WithProperties:function(properties)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,properties);
  },
  WithOnAfterRender:function(fnc)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,fnc,this.Properties);
  },
  WithInternalName:function(name)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,name,this.onAfterRender,this.Properties);
  },
  WithTitle:function(withTitle)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,withTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties);
  },
  WithChildPanelContainer:function(container)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,container,this.InternalName,this.onAfterRender,this.Properties);
  },
  WithRelayoutFnc:function(fnc)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,fnc,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties);
  },
  WithPanelContent:function(content)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,content,this.Children,this.InternalName,this.onAfterRender,this.Properties);
  },
  WithTitleButtons:function(buttons)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,buttons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties);
  },
  WithTitleContent:function(content)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,this.TitleAttrs,content,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties);
  },
  WithTitleAttrs:function(attrs)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,this.PannelAttrs,this.IsWithTitle,attrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties);
  },
  WithPannelAttrs:function(attrs)
  {
   return Panel$1.New(this.Key,this.Left,this.Top,this.Width,this.Height,this.Element,this.Relayout,attrs,this.IsWithTitle,this.TitleAttrs,this.TitleContent,this.TitleButtons,this.PanelContent,this.Children,this.InternalName,this.onAfterRender,this.Properties);
  }
 },null,Panel$1);
 Panel$1.get_Create=function()
 {
  return Panel$1.New(Key.Fresh(),Var.Create$1(0),Var.Create$1(0),0,0,Var.Create$1(null),function()
  {
  },List.T.Empty,true,List.ofArray([AttrModule.Class("panelTitle")]),Doc.Element("div",[],[]),List.T.Empty,Doc.Element("div",[],[]),PanelContainer.get_Create(),"",function()
  {
  },List.T.Empty);
 };
 Panel$1.New=function(Key$1,Left,Top,Width,Height,Element,Relayout,PannelAttrs,IsWithTitle,TitleAttrs,TitleContent,TitleButtons,PanelContent,Children,InternalName,onAfterRender,Properties)
 {
  return new Panel$1({
   Key:Key$1,
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
   Properties:Properties
  });
 };
 PanelContainer=Panel.PanelContainer=Runtime.Class({
  get_Render:function()
  {
   var $this,attrWidth,f,attrHeight,f$1,attrsUpdated,a,a$1,a$2;
   $this=this;
   attrWidth=this.Width>0?List.ofArray([AttrModule.Style("width",(f=function($1,$2)
   {
    return $1($2.toFixed(6)+"px");
   },(function($1)
   {
    return function($2)
    {
     return f($1,$2);
    };
   }(Global.id))(this.Width)))]):List.T.Empty;
   attrHeight=this.Height>0?List.ofArray([AttrModule.Style("height",(f$1=function($1,$2)
   {
    return $1($2.toFixed(6)+"px");
   },(function($1)
   {
    return function($2)
    {
     return f$1($1,$2);
    };
   }(Global.id))(this.Height)))]):List.T.Empty;
   attrsUpdated=Seq.concat([this.ContainerAttributes,attrWidth,attrHeight,List.ofArray([AttrModule.Style("position","relative")])]);
   a=[(a$1=function(m)
   {
    return m.Key;
   },(a$2=function(item)
   {
    var _this;
    _this=item.get_Render();
    return _this.OnAfterRender(function()
    {
     $this.LayoutManager.WebSharper_Community_Panel_ILayoutManager$PlacePanel($this,item);
    });
   },function(a$3)
   {
    return Doc.ConvertBy(a$1,a$2,a$3);
   })(this.PanelItems.v))];
   return Doc.Element("div",attrsUpdated,a);
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
   var p;
   p=function(item)
   {
    return Unchecked.Equals(item.Element,panel.Element);
   };
   return function(l)
   {
    return Seq.find(p,l);
   }(List.ofSeq(this.PanelItems));
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
  var a;
  return PanelContainer.New(0,0,(a=List.T.Empty,ListModel.Create(function(item)
  {
   return item.Key;
  },a)),{
   WebSharper_Community_Panel_ILayoutManager$PlacePanel:function()
   {
    return null;
   },
   WebSharper_Community_Panel_ILayoutManager$Relayout:function()
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
   var l,t;
   l=this.left-width;
   t=this.top-height;
   return Rect.New(l,this.right+width,t,this.bottom+height);
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
   var left,right,top,bottom;
   left=Operators.Max(this.left,rect.left);
   right=Operators.Min(this.right,rect.right);
   top=Operators.Max(this.top,rect.top);
   bottom=Operators.Min(this.bottom,rect.bottom);
   return Rect.New(left,Operators.Max(left,right),top,Operators.Max(top,bottom));
  },
  offset:function(x_offset,y_offset)
  {
   var l,t;
   l=this.left+x_offset;
   t=this.top+y_offset;
   return Rect.New(l,this.right+x_offset,t,this.bottom+y_offset);
  },
  get_isEmpty:function()
  {
   return this.left>=this.right?true:this.top>=this.bottom;
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
   WebSharper_Community_Panel_ILayoutManager$PlacePanel:function(panelContainer,panelItem)
   {
    return LayoutManagers.placePanel(panelContainer,panelItem,margin);
   },
   WebSharper_Community_Panel_ILayoutManager$Relayout:function(panelContainer,exceptPanel)
   {
    return LayoutManagers.relayout(panelContainer,exceptPanel,margin);
   }
  };
 };
 LayoutManagers.relayout=function(panelContainer,exceptPanel,margin)
 {
  var panelItems,listOfPanelItems,exceptPanelItem,p,foundPanel,p$1,panelItem;
  panelItems=panelContainer.PanelItems;
  listOfPanelItems=List.ofSeq(panelItems);
  exceptPanelItem=(p=function(panelItem$1)
  {
   return Unchecked.Equals(panelItem$1.Key,exceptPanel.Key);
  },function(l)
  {
   return Seq.find(p,l);
  }(listOfPanelItems));
  foundPanel=(p$1=function(panelItem$1)
  {
   return!Unchecked.Equals(panelItem$1.Key,exceptPanelItem.Key)?!Rect.fromPanel(panelItem$1).intersect(Rect.fromPanel(exceptPanelItem)).get_isEmpty():false;
  },function(l)
  {
   return Seq.tryFind(p$1,l);
  }(List.ofSeq(panelItems)));
  (foundPanel!=null?foundPanel.$==1:false)?(panelItem=foundPanel.$0,LayoutManagers.movePanelToFreeSpace(panelItems,panelItem,margin)):void 0;
 };
 LayoutManagers.placePanel=function(panelContainer,panelItem,margin)
 {
  var rcPanel,rcContainer,a,a$1,foundCandidate,p,rc,a$2,a$3,a$4,a$5;
  rcPanel=Rect.fromPanel(panelItem);
  rcContainer=(a=panelContainer.Width,(a$1=panelContainer.Height,Rect.Create(0,0,a,a$1)));
  foundCandidate=(p=function(rc$1)
  {
   return rc$1.get_width()>=rcPanel.get_width()?rc$1.get_height()>=rcPanel.get_height():false;
  },function(l)
  {
   return Seq.tryFind(p,l);
  }(LayoutManagers.collectFreeSpace(panelContainer.PanelItems,rcContainer,panelItem,margin)));
  (foundCandidate!=null?foundCandidate.$==1:false)?(rc=foundCandidate.$0,a$2=panelItem.Left,a$3=rc.left+margin,Var.Set(a$2,a$3),a$4=panelItem.Top,a$5=rc.top+margin,Var.Set(a$4,a$5)):void 0;
 };
 LayoutManagers.movePanelToFreeSpace=function(panelItems,panelItem,margin)
 {
  var rcPanel,rcContainer,foundCandidate,p,rc,a,a$1,a$2,a$3;
  rcPanel=Rect.fromPanel(panelItem);
  rcContainer=Rect.fromDomRect(panelItem.Element.c.parentElement);
  foundCandidate=(p=function(rc$1)
  {
   return rc$1.get_width()>=rcPanel.get_width()?rc$1.get_height()>=rcPanel.get_height():false;
  },function(l)
  {
   return Seq.tryFind(p,l);
  }(LayoutManagers.collectFreeSpace(panelItems,rcContainer,panelItem,margin)));
  (foundCandidate!=null?foundCandidate.$==1:false)?(rc=foundCandidate.$0,a=panelItem.Left,a$1=rc.left+margin,Var.Set(a,a$1),a$2=panelItem.Top,a$3=rc.top+margin,Var.Set(a$2,a$3)):void 0;
 };
 LayoutManagers.collectFreeSpace=function(panelItems,rcContainer,except,margin)
 {
  var x,p,s;
  x=(p=function(item)
  {
   return!Unchecked.Equals(item.Key,except.Key);
  },function(l)
  {
   return List.filter(p,l);
  }(List.ofSeq(panelItems)));
  s=List.ofArray([rcContainer]);
  return Seq.fold(function(acc,panel)
  {
   var rcPanel,rcTop,rcLeft,m,t,b;
   rcPanel=LayoutManagers.panelRect(panel,0);
   rcTop=Rect.New(0,rcContainer.right,0,rcPanel.top);
   rcLeft=Rect.New(0,rcPanel.left,0,rcContainer.bottom);
   return List.concat((m=function(rc)
   {
    var p$1,m$1;
    p$1=function(accRect)
    {
     return!accRect.get_isEmpty();
    };
    return function(l)
    {
     return List.filter(p$1,l);
    }((m$1=function(accRc)
    {
     return accRc.intersect(rc);
    },function(l)
    {
     return List.map(m$1,l);
    }(acc)));
   },function(l)
   {
    return List.map(m,l);
   }(List.ofArray([rcTop,rcLeft,Rect.New(rcPanel.right,rcContainer.right,rcLeft.top,rcLeft.bottom),(t=rcPanel.bottom,(b=rcContainer.bottom,Rect.New(rcTop.left,rcTop.right,t,b)))]))));
  },s,x);
 };
 LayoutManagers.calcClientArea=function(panelItems,stopItem,margin)
 {
  var sublist,rects,m,x,$1,a,m$1,a$1,m$2,a$2,m$3,a$3,m$4;
  sublist=function(acc,lst)
  {
   var rest,head;
   while(true)
    if(lst.$==1)
     {
      rest=lst.$1;
      head=lst.$0;
      if(Unchecked.Equals(head.Key,stopItem.Key))
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
  };
  rects=(m=function(panel)
  {
   var a$4;
   a$4=panel.InternalName;
   Global.console.log(a$4);
   return LayoutManagers.panelRect(panel,margin);
  },function(l)
  {
   return List.map(m,l);
  }((x=List.ofSeq(panelItems),($1=List.T.Empty,function($2)
  {
   return sublist($1,$2);
  }(x)))));
  return rects.$==0?Rect.Create(0,0,0,0):(a=List.min((m$1=function(rc)
  {
   return rc.left;
  },function(l)
  {
   return List.map(m$1,l);
  }(rects))),(a$1=List.min((m$2=function(rc)
  {
   return rc.top;
  },function(l)
  {
   return List.map(m$2,l);
  }(rects))),(a$2=List.max((m$3=function(rc)
  {
   return rc.right;
  },function(l)
  {
   return List.map(m$3,l);
  }(rects))),(a$3=List.max((m$4=function(rc)
  {
   return rc.bottom;
  },function(l)
  {
   return List.map(m$4,l);
  }(rects))),Rect.Create(a,a$1,a$2,a$3)))));
 };
 LayoutManagers.panelRect=function(panel,margin)
 {
  return Rect.fromPanel(panel).inflate(margin,margin);
 };
 SC$1.$cctor=Runtime.Cctor(function()
 {
  SC$1.StackPanelLayoutManager={
   WebSharper_Community_Panel_ILayoutManager$PlacePanel:function()
   {
    return null;
   },
   WebSharper_Community_Panel_ILayoutManager$Relayout:function(panelContainer,exceptPanel)
   {
    return LayoutManagers.relayout(panelContainer,exceptPanel,0);
   }
  };
  SC$1.$cctor=Global.ignore;
 });
 Dialog=Panel.Dialog=Runtime.Class({
  get_Render:function()
  {
   var $this,a,a$1,a$2,a$3,a$4,a$5,a$6,a$7,a$8,a$9,a$10,a$11,a$12,a$13,a$14,a$15,a$16,a$17,a$18,a$19,a$20,a$21,a$22;
   $this=this;
   a=[AttrModule.Style("position","absolute"),AttrModule.Style("left","50%"),AttrModule.Style("top","50%"),AttrModule.Style("z-index","1"),AttrModule.Style("background-color","white"),AttrModule.Style("min-height","100px"),AttrModule.Style("min-width","200px"),AttrModule.DynamicStyle("display",(a$1=this.Visibility.v,View.Map(function(isVis)
   {
    return isVis?"block":"none";
   },a$1)))];
   a$2=[(a$3=[AttrModule.Style("background-color","grey"),AttrModule.Style("display","block"),AttrModule.Style("min-height","100px"),AttrModule.Style("min-width","200px")],(a$4=[(a$5=[(a$6=[(a$7=[AttrModule.Style("border-style","hidden"),AttrModule.Style("background","#404040"),AttrModule.Style("color","rgb(200,200,200)"),AttrModule.Style("padding","0px 2px 5px 2px"),AttrModule.Style("Width","200px"),AttrModule.Style("font-size","medium")],(a$8=[Doc.TextView(this.Title.v)],Doc.Element("td",a$7,a$8)))],Doc.Element("tr",[],a$6))],Doc.Element("table",[],a$5)),(a$9=[(a$10=[(a$11=[AttrModule.Style("padding","5px 0px 0px 2px")],(a$12=[(a$13=Global.id,function(a$23)
   {
    return Doc.BindView(a$13,a$23);
   }(this.Content.v))],Doc.Element("td",a$11,a$12)))],Doc.Element("tr",[],a$10)),(a$14=[(a$15=[AttrModule.Style("padding","20px 12px 2px 20px")],(a$16=[(a$17=[AttrModule.Style("border-radius","2px"),AttrModule.Handler("click",function()
   {
    return function()
    {
     var a$23;
     a$23=$this.Visibility;
     Var.Set(a$23,false);
     return $this.OKCallback.c();
    };
   })],(a$18=[Doc.TextNode("OK")],Doc.Element("button",a$17,a$18)))],Doc.Element("td",a$15,a$16))),(a$19=[AttrModule.Style("padding","20px 12px 2px 50px")],(a$20=[(a$21=[AttrModule.Style("border-radius","2px"),AttrModule.Handler("click",function()
   {
    return function()
    {
     var a$23;
     a$23=$this.Visibility;
     return Var.Set(a$23,false);
    };
   })],(a$22=[Doc.TextNode("Cancel")],Doc.Element("button",a$21,a$22)))],Doc.Element("td",a$19,a$20)))],Doc.Element("tr",[],a$14))],Doc.Element("table",[],a$9))],Doc.Element("table",a$3,a$4)))];
   return Doc.Element("div",a,a$2);
  },
  ShowDialog:function(title,content,okCallback)
  {
   var a,a$1,a$2,a$3;
   a=this.Title;
   Var.Set(a,title);
   a$1=this.Content;
   Var.Set(a$1,content);
   a$2=this.Visibility;
   Var.Set(a$2,true);
   a$3=this.OKCallback;
   Var.Set(a$3,okCallback);
  }
 },null,Dialog);
 Dialog.get_Create=function()
 {
  return Dialog.New(Var.Create$1(""),Var.Create$1(Doc.Element("div",[],[])),Var.Create$1(false),Var.Create$1(function()
  {
  }));
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
