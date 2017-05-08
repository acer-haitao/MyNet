window.onload = window.onscroll = window.onresize= function(){
    /*IE和谷歌走onmousewheel 火狐走DOMMouseScroll必须由绑定事件触发*/

    /*封装事件绑定函数*/
    function AddEvent(obj,type,fn){
        if(obj.addEventListener)
        {
            obj.addEventListener(type,fn,false);
        }
        else{
            obj.attachEvent('on'+type,fn)
        }
    }

    function Wheel(obj,callback){
        /*滚轮兼容判断*/
        if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1)
        {
            AddEvent(obj,'DOMMouseScroll',fn)
        }else{
            AddEvent(obj,'mousewheel',fn);
        }

        /*封装滚轮鼠标上下滑事件  IE和chrome走ev.wheelDelta  firefox走ev.detail*/
        function fn(ev){
            var ev = ev || event;
            var Down = true;
            if(ev.wheelDelta)
            {
                Down = ev.wheelDelta>0?true:false;
            }else{
                Down = ev.detail <0 ?true:false;
            }	   
            callback && callback(Down);
            if(ev.preventDefault){
                ev.preventDefault();
            }
             window.event.returnValue = false

        }

    }

    /*回调函数使用*/
    var timer = null;                                                          //定时器变量
    var onOff = true;                                                          //滚轮 滚动开关
    /*让IE兼容getElementsByClassName*/
    if(!document.getElementsByClassName){
      document.getElementsByClassName = function(className, element){
        var children = (element || document).getElementsByTagName('*');
        var elements = new Array();
        for (var i=0; i<children.length; i++){
          var child = children[i];
          var classNames = child.className.split(' ');
          for (var j=0; j<classNames.length; j++){
            if (classNames[j] == className){ 
              elements.push(child);
              break;
            }
          }
        } 
        return elements;
      };
    }

    var wrapDiv = document.getElementById('oBox');                              //父级DOM
    var moveBox = document.getElementById('oBoxWrap');                          //动画DOM
    var oCh = document.documentElement.clientHeight||document.body.clientHeight;//获取可视高度
    var oDiv = document.getElementsByClassName('box');                          //获取每个可视区容器
    
    wrapDiv.style.height=oCh+'px';                                              //动态设置DOM 高度

    /*小按钮轮播效果*/
    var oBtn = document.getElementById('IconBox');
    var aLiBtn = oBtn.getElementsByTagName('li');
    var aSpan = oBtn.getElementsByTagName('span');
    
    for(var i=0;i<oDiv.length;i++){
        if(i==0){aSpan[i].className="cur"}
        oDiv[i].style.height = oCh+'px';
        aSpan[i].attributes['data-value']=i; 
    }
    
    /*运动函数*/
    var animate = function(Index){
        for(var i=0;i<aSpan.length;i++){
            aSpan[i].className="";
            if(i==Index){aSpan[Index].className="cur";}
        }
        moveBox.style.top = -oCh*Index+'px';
    };

    for(var i=0;i<aLiBtn.length;i++){
        aLiBtn[i].index = i;
        aLiBtn[i].onclick = function(){
            /*切换小按钮当前效果*/
            var Index = this.index;
            aBtnClick(Index)
        }

        function aBtnClick(Index){
            animate(Index);
        }
    }
    
    /*获取当前CUR 位置*/
    var getCurrent = function(){
        for(var i=0;i<aSpan.length;i++){
            if(aSpan[i].className=='cur'){
                return i;
            }
        }
    };
    
    Wheel(document,function(T){
        if(onOff){
            clearTimeout(timer);
            onOff = false;
            var Index = getCurrent();                                              //获取当前CUR 位置
            if(T){/*鼠标向上滚动*/
                var I = Index-1;
                if(I>=0){
                   animate(I); 
                }
                timer = setTimeout(function(){
                    onOff = true;
                },500);
            }else{/*鼠标向下滚动*/
                var I = Index+1;
                if(I<aSpan.length){
                   animate(I); 
                }
                timer = setTimeout(function(){
                    onOff = true;
                },500);
            }
        }
    })
		   
}		
   