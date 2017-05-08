function getElsByClass( parent,tagName,className ){
	var aEls = parent.getElementsByTagName(tagName);
	var arr = [];
	for(var i=0;i<aEls.length;i++){
		var aClassName = aEls[i].className.split(' ');
		for(var j=0;j<aClassName.length;j++){
			if(aClassName[j]==className){
				arr.push(aEls[i]);
				break;
			}
		}
	}
	return arr;
};
/*1.------------------------通过class获取元素----------------------------------*/
function addClass(obj, classNames) {
	var classArr = [];
	var Names = obj.className;
	classArr = Names.split(' ');
	for (var j = 0; j < classArr.length; j++) {
		if (classArr[j] === classNames) {
			return;
		}
	}
	if (!obj.className) {
		obj.className = classNames;
	} else {
		obj.className += ' ' + classNames;
	}
};
/*2.------------------------删除class----------------------------------*/
function removeClass(obj, classNames) {
	var names = obj.className;
	if (!names) {
		return;
	}
	var classArr = names.split(' ');
	for (var j = 0; j < classArr.length; j++) {
		if (classArr[j] === classNames) {
			classArr.splice(j, 1);
			obj.className = classArr.join(' ');
		}
	}
};

/*3.------------------------move运动函数----------------------------------*/
var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线  先慢后快
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线  先快后慢
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){  //猛弹两次
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){ //回缩的距离
		if (typeof s == 'undefined') {
			s = 3.70158;  
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){  //后退再前
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){  //回弹三次
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
}

function move(obj,json,time,fx,callBack,units){
  units= units||"px"
  var oldTime = new Date().getTime();
  var timer = null;
  var j = {};
  for( var attr in json ){
	  j[attr] = {}; 
	  if( attr === "opacity" ){
		  j[attr].b = parseFloat(getStyle(obj,attr));
	  }else{
		  j[attr].b = parseInt(getStyle(obj,attr));
	  };
	  j[attr].c = json[attr] - j[attr].b;
  };
  var d = time;
  timer = setInterval(function (){	 
	  var current = new Date().getTime();
	  var t = current - oldTime;
	  if( t >= d ){
		  t = d;
	  };
	  for( var attr in json ){
		  var v = Tween[fx](t,j[attr].b,j[attr].c,d);
		  if( attr === "opacity" ){
			obj.style[attr] = v;
	  		obj.style.filter = 'alpha(opacity='+v*100+')';
		  }else{
			  if( units=="px" ){
					units='px';  
				}else{
					units='%'
				}
			  obj.style[attr] = v + units;
		  }				
	  }
	  if( t==d ){
		  callBack && callBack();
		  clearInterval(timer);
	  }
  },30);
};

function getStyle(obj,attr){return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];}
/*-----------------------------------------兄弟节点函数---------------------------------------------------------*/
function last( obj ){
	if( !obj || !obj.lastChild ) return null;
	return obj.lastChild.nodeType === 1 ? obj.lastChild : prev(  obj.lastChild );
}

function first( obj ){
	if( !obj || !obj.firstChild ) return null;
	return obj.firstChild.nodeType === 1 ? obj.firstChild : next(  obj.firstChild );
}

function prev( obj ){
	if( !obj || !obj.previousSibling ) return null;
	return obj.previousSibling.nodeType === 1 ? obj.previousSibling : prev(  obj.previousSibling );
}

function next( obj ){
	if( !obj || !obj.nextSibling ) return null;
	return obj.nextSibling.nodeType === 1 ? obj.nextSibling : next(  obj.nextSibling );
	
}

function css(obj, attr, val) {
	if (arguments.length >= 3) {
		if (attr == 'opacity') {
			obj.style.opacity = val / 100;
			obj.style.filter = "alpha(opacity=" + val + ")";
		} else {
			obj.style[attr] = val + 'px';
		}
	} else {
		var val = obj.currentStyle ? parseFloat(obj.currentStyle[attr]) : parseFloat(getComputedStyle(obj)[attr]);
		if (attr == 'opacity') {
			return Math.round(val * 100);
		} else {
			return val;
		}
	}
};


/*---------------------------------getOffsetLeft&Top-----------------------------------------------*/
function getOffsetLeft( obj ){
	var iLeft = 0;
	var objBorder = parseInt(getStyle(obj,"borderLeftWidth"));//NaN	 有的浏览器元素不设置宽度返回的是auto 或 medium 
	objBorder = isNaN( objBorder ) ? 0 : objBorder;
	while( obj ){
		var borderL = parseInt(getStyle(obj,"borderLeftWidth"));		
		borderL = isNaN(borderL) ? 0 : borderL;
		iLeft += obj.offsetLeft + borderL;
		obj = obj.offsetParent;
	};
	return iLeft - objBorder;	 //去掉自身的左边框的宽度
};

function getOffsetTop( obj ){
	var iTop = 0;
	var objBorder = parseInt(getStyle(obj,"borderTopWidth"));//NaN	 有的浏览器元素不设置宽度返回的是auto 或 medium 
	objBorder = isNaN( objBorder ) ? 0 : objBorder
	while( obj ){
		var borderT = parseInt(getStyle(obj,"borderTopWidth"));		
		borderT = isNaN(borderT) ? 0 : borderT;
		iTop += obj.offsetTop + borderT ;
		obj = obj.offsetParent;
	};
	return iTop - objBorder;	//去掉自身的上边框的宽度
};
//function getStyle ( obj, attr ) { return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]}



function doMove( obj, attr, ms, target, fn ) {
	obj.style[attr] = target+'px';//对象、属性和目标值
	obj.style.transition = ms + 'ms ' + attr;//持续时间和属性
	setTimeout(function(){//回调函数
		obj.style.transition = '';
		fn && fn();
	}, ms)
}

/*---------------------------doMove---------------------------------------------*/
function doMove(obj,attr,speed,target,fn){//对象，属性，速度（步进），目标值，回调函数
	clearInterval(obj.timer);
	speed=target>parseInt(getStyle(obj,attr))?speed:-speed//判断正负数
	obj.timer=setInterval(function (){
		iLeft=parseInt(getStyle(obj,attr))+speed
		if(iLeft>=target&&speed>0||iLeft<=target&&speed<0){//当步进值大于目标值时
			iLeft=target;
		}
		obj.style[attr]=iLeft+'px'//注意这里的封装需要用[]		
		if(iLeft==target){
			clearInterval(obj.timer);
			fn&&fn();//if(fn){fn()}
		}		
	},40)
}

//function getStyle(obj,attr){return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr]}
function getStyle(obj,attr){return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];}




/*3.-------------------------获取元素到文档之间的距离--------------------------*/
function getPos(obj){
	var pos = {"left":0,"top":0};
	while(obj){
		pos.left += obj.offsetLeft;
		pos.top += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return pos;
};
/*4.-------------------------获取可视区的宽高--------------------------*/
function view(){
	return {
		w:window.innerWidth || document.documentElement.clientWidth,
		h:window.innerHeight || document.documentElement.clientHeight
	}
};
/*5.-------------------------碰撞检测函数--------------------------*/
function collision(obj1,obj2){
	var obj1L = getPos(obj1).left;
	var obj1LW = obj1L + obj1.offsetWidth;
	var obj1T = getPos(obj1).top;
	var obj1TH = obj1T + obj1.offsetHeight;
	
	var obj2L = getPos(obj2).left;
	var obj2LW = obj2L + obj2.offsetWidth;
	var obj2T = getPos(obj2).top;
	var obj2TH = obj2T + obj2.offsetHeight;
	
	if( obj1LW < obj2L || obj1L > obj2LW || obj1TH < obj2T || obj1T > obj2TH ){
		return false
	}
	return true;
};
/*6.------------------------向上查找父级元素，不完整--------------------------*/
function parents(obj,sClass){
	if(obj.nodeName==='BODY'){return null}
	var parent = null;
	var onOff = true;
	while( onOff ){
		var className = obj.parentNode.className;
		obj = obj.parentNode;
		if(obj.nodeName === 'BODY'){
			return null;
		}
		if( className === sClass.slice(1) ){
			onOff = false;
			parent = obj;
			return parent;
		}
	};
};
/*7.------------------------数组去重--------------------------*/
function removeRepeat(arr1,arr2){
	for(var i=0;i<arr1.length;i++){  // 循环arr1
		for(var j=0;j<arr2.length;j++){
			if(arr1[i]===arr2[j]){
				var len = arr2.length;
				arr2.splice(j,1);
				if(arr2.length < len){
					i--;
					break;
				}
			}
		}
	}
	return arr2;
};


/*7.------------------------事件绑定函数--------------------------*/
function bindEvent(obj,evName,evFn){	
	if( obj.addEventListener ){
		obj.addEventListener(evName,evFn,false);//标准下使用
	}else{
		obj.attachEvent("on"+evName,function (){//ie低版本使用
			evFn.call(obj);	//要改变一下传入的事件处理函数的this的指向
		})
	}	
}

/*-----------------------获取class------------------------------*/
/*
function getClass(className,tagName,content){
	var elements = 	( content || document ).getElementsByTagName("*");
	var re = new RegExp('\\b'+ className +'\\b');
	var arr = [];
	for( var i = 0; i < elements.length; i++){
		var classNames = elements[i].className;
		var tag = elements[i].nodeName.toLowerCase();
		if( re.test( classNames ) && tag == tagName || tag == "*"){
			arr.push( elements[i] );
		}
	};
	return arr;
}*/
/*-------------------shake-------------------------*/
function shake(obj,attr,range,fn){	
	var iNum=0;
	var arr=[];
	var speed=parseInt(getStyle(obj,attr));	
	for(var i=range;i>=0;i-=2){
		arr.push(i,-i);
	}
	if(obj.shake){return}
	clearInterval(obj.shake)
	obj.shake=setInterval(function(){			
		obj.style[attr]=speed+arr[iNum]+'px'
		iNum++;
		if(iNum==arr.length){
			clearInterval(obj.shake)
			obj.shake=0;
			fn&&fn();
		}					
	},40)	
}