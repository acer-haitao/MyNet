// JavaScript Document
function $(a, b){ //获取元素
	if(typeof a === 'function'){
		window.onload = a;
	}else if(typeof a === 'string' && document.getElementById(a)){
		return document.getElementById(a);
	} else if(typeof a === 'string') {
		return document.getElementsByTagName(a);
	} else {
		return a.getElementsByTagName(b);
	}
}

function action(obj,json,fn){
	clearInterval(obj.iTimer);
	var iSpeed = 0;
	var iCur = 0;
	obj.iTimer = setInterval(function() {
		
		var iBtn = true;
		
		for (attr in json) {
			if (attr == 'opacity') {
				iCur = Math.round(css(obj, attr) * 100);
			} else {
				iCur = parseInt(css(obj, attr));
			}
			iSpeed = (json[attr] - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		
			if (iCur != json[attr]) {
				iBtn = false;
				if (attr == 'opacity') {
					obj.style.opacity = (iCur + iSpeed) / 100;
					obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
				} else {
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
		}
		if (iBtn) {
			clearInterval(obj.iTimer);
			fn && fn.call(obj);
		}
		
	}, 30);
}
function css(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function next(obj){
	return obj.nextElementSibling || obj.nextSibling;
}
function prev(obj){
	return obj.previousElementSibling || obj.previousSibling;
}
function last(obj){
	return obj.lastElementChild || obj.lastChild;
}
function getByClass(parent, tagName, className) {
	var aEls = parent.getElementsByTagName(tagName);
	var arr = [];
	
	var serchC = className.split(' ')
	for (var i=0; i<aEls.length; i++) {
		var aClass = aEls[i].className.split(' ');
		for (var j=0; j<aClass.length; j++) {
			for(var n=0;n<serchC.length;n++){
				if (aClass[j] == serchC[n]) {
					arr.push(aEls[i]);
					break;
				}
			}
		}
	}
	return arr;
};

function drag(obj,moveEle){  //面向对象的拖拽
	this.obj = obj;
	this.moveEle = moveEle || obj;
	this.disX = 0;
	this.disY = 0;
	this.init();
};
drag.prototype.init = function(){  //拖拽默认
	var This = this;
	this.obj.onmousedown = function(ev){
		var ev = ev || event;
		This.moveEle.disX = ev.clientX - This.moveEle.offsetLeft;
		This.moveEle.disY = ev.clientY - This.moveEle.offsetTop;
		
		var _this = This;
		document.onmousemove = function(ev){
			var ev = ev || event;
			var L = ev.clientX - This.moveEle.disX;
			var T =  ev.clientY - This.moveEle.disY;
			if(L<0){
				L=0;
			}else if(L>veiwWidth()- This.moveEle.offsetWidth){
				L = veiwWidth() - This.moveEle.offsetWidth;
			}
			if(T<0+scrollY()){
				T=0+scrollY();
			}else if(T > veiwHeight() - This.moveEle.offsetHeight+scrollY()){
				T = veiwHeight()-This.moveEle.offsetHeight+scrollY();
			}
			
			This.moveEle.style.left = L  + 'px';
			This.moveEle.style.top = T + 'px';
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	}
};
function Sbar(box){  //自定义滚动条
	this.obj = box;
	this.disY = 0;
	this.added = true;
	this.bBtn = true;
	
};
Sbar.prototype.init = function(){
	var parent = document.createElement('div');
	var bar = document.createElement('div');
	parent.className = 'scroll';
	bar.className = 'scroBar';
	parent.appendChild(bar);
	if(this.added){
		this.obj.appendChild(parent);
	}
	this.scrolBar = getByClass(this.obj,'div','scroBar')[0];
	
	var _this = this;
	var cont = getByClass(this.obj,'div','content')[0];
	
	bar.onmousedown = function(ev){
		var ev = ev || window.event;
		_this.disY = ev.clientY - bar.offsetTop;
		document.onmousemove = function(ev){
			var ev = ev || window.event;
			var T = ev.clientY - _this.disY;
			
			if(T<0){
				T = 0;
			}
			else if(T>parent.offsetHeight - bar.offsetHeight){
				T = parent.offsetHeight - bar.offsetHeight;
			}
			bar.style.top = T + 'px';
			var scale = T/(parent.offsetHeight - bar.offsetHeight);
			cont.style.top = - scale * (cont.offsetHeight - _this.obj.offsetHeight) +  'px';
		};
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	};
	if(cont.addEventListener){
		cont.addEventListener('DOMMouseScroll',show,false);
		parent.addEventListener('DOMMouseScroll',show,false);
	}
	cont.onmousewheel = show;
	parent.onmousewheel = show;
	
	function show(ev){
		var ev = ev || window.event;
		var T = 0;
		
		if(ev.detail){
			_this.bBtn =  ev.detail>0  ?  true  :  false;
		}
		else{
			_this.bBtn =  ev.wheelDelta<0  ?  true  :  false;
		}
		if(_this.bBtn){  //↓
			T = bar.offsetTop + 10;
		}
		else{  //↑
			T = bar.offsetTop - 10;
		}
		if(T<0){
			T = 0;
		}
		else if(T>parent.offsetHeight - bar.offsetHeight){
			T = parent.offsetHeight - bar.offsetHeight;
		}
		bar.style.top = T + 'px';
		
		var scale = T/(parent.offsetHeight - bar.offsetHeight);
		cont.style.top = - scale * (cont.offsetHeight - _this.obj.offsetHeight) + 'px';
		if(ev.preventDefault){
			ev.preventDefault(); //addEventListener
		}
		else{
			return false;
		}
	};
	
	this.obj.onmouseover = function(){
		parent.style.height = _this.obj.clientHeight - 26 + 'px';	
		if(cont.offsetHeight<_this.obj.clientHeight){
			parent.style.display = 'none';
		}else{
			parent.style.display = 'block';
			bar.style.height = parent.clientHeight*(_this.obj.clientHeight/cont.offsetHeight) + 'px';
		}
	};
	this.obj.onmouseout = function(){
		parent.style.display = 'none';
	};
	
};

//		运动	
function Action(obj,json,endFn){
	this.obj = obj;
	this.json = json;
	this.endFn = endFn;
	this.speed = 0;
	this.now = 0;
	this.obj.timer = null;
};
Action.prototype.init = function(){
	var _this = this;
	this.obj.timer = setInterval(function(){
		_this.Btn = true;
		
		for(attr in _this.json){
			if(attr == 'opacity'){
				_this.now = Math.round(css(_this.obj, attr) * 100);
			}else{
				_this.now = parseInt(css(_this.obj, attr));
			}
			_this.speed = (Math.round(_this.json[attr]) - _this.now) / 8;
			_this.speed = _this.speed > 0 ? Math.ceil(_this.speed) : Math.floor(_this.speed);
			if (_this.now != _this.json[attr]) {
				_this.Btn = false;
				if (attr == 'opacity') {
					_this.obj.style.opacity = (_this.now + _this.speed) / 100;
					_this.obj.style.filter = 'alpha(opacity='+ (_this.now + _this.speed) +')';
				} else {
					_this.obj.style[attr] = _this.now + _this.speed + 'px';
				}
			}
		}
		if (_this.Btn) {
			clearInterval(_this.obj.timer);
			_this.endFn && _this.endFn.call(_this.obj);
		}
	},30)
};

function shake(obj,dir,fn){
	clearInterval(obj.timer);
	var pos = parseInt(css(obj,dir));
	var arr = [];
	var num = 0;
	for(var i=6; i>0; i-=2){
		arr.push(i, -i);
	}
	obj.timer = setInterval(function(){
		obj.style[dir] = pos+arr[num]+'px';
		num++;
		if(num==arr.length){
			clearInterval(obj.timer);
			fn && fn.call(obj);
		}
	},30)
};
function css(obj,attr){  //获取样式
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
function veiwWidth(){  //获取可视区宽
	return document.documentElement.clientWidth || document.body.clientHeight;
};
function veiwHeight(){  //获取可视区高
	return document.documentElement.clientHeight || document.body.clientHeight;
};
function scrollY(){  //滚动条高度
	return document.documentElement.scrollTop || document.body.scrollTop;
};
function extend(a,b){  //赋值
	for(var attr in b){
		a[attr] = b[attr];
	}
};

function loading(obj){  //加载进度
	clearInterval(obj.timer);
	var aSpan = obj.getElementsByTagName('span');
	var n=0;
	for(var i=0;i<aSpan.length;i++){
		aSpan[i].Height = 6;
		aSpan[i].style.position = 'absolute';
		aSpan[i].style.left = 12*(i+4)+'px';
		aSpan[i].style.top = (28-aSpan[i].offsetHeight)/2+'px';
		aSpan[i].style.margin = 0;
	}
	obj.timer = setInterval(function(){
		if(aSpan[n].offsetHeight<6){
			aSpan[n].Height*=-1;
		}else if(aSpan[n].offsetHeight>18){
			aSpan[n].Height*=-1;
		}
		H=aSpan[n].offsetHeight+aSpan[n].Height;
		if(H<2){
			H=2;
		}
		aSpan[n].style.height= H+'px';
		aSpan[n].style.top=(28-aSpan[n].offsetHeight)/2+'px';
		n++;
		if(n>aSpan.length-1){
			n=0;
		}
	},50);
}



