// JavaScript Document
var PopBig = true;
var PopMid = true;

function Popup(obj){
	this.obj = obj;
	this.settings = {
		pos:'center',
		title:'',
		moveIn:true
	};
	this.dragable = true;
	this.obj.tit = true;
};
Popup.prototype.init = function(opt){
	extend( this.settings , opt || {} );
	this.obj.style.display = 'block';
	this.setPos();
	
	var title = this.settings.title || this.obj.title;
	this.obj.title = '';
	if(this.obj.tit){
		var oTitle = document.createElement('h3');
		oTitle.className = 'mytitle';
		oTitle.innerHTML = title;
		
		this.obj.appendChild(oTitle);
		this.obj.tit = false;
	}
	this.popClose();
};
Popup.prototype.topClose = function(){
	var This = this;
	var oClose = document.createElement('span');
	oClose.className = 'tclose';
	oClose.innerHTML = 'x';
	
	this.obj.appendChild(oClose);
	this.tclose = getByClass(this.obj,'span','tclose')[0];
	oClose.onclick = function(){
		This.fnClose.call(This);
	}
};
Popup.prototype.popClose = function(){
	var This = this;
	var closePop =  getByClass(this.obj,'input','popclose');
	
	for(var i=0;i<closePop.length;i++){
		closePop[i].onclick = function(){
			This.fnClose.call(This);
		}
	}
};
Popup.prototype.fnClose = function(){
	var This = this;
	this.obj.removeChild(this.tclose);
	
	if(this.settings.movein){
		action(this.obj,{opacity:0,top:-80},function(){
			This.obj.style.display = 'none';
		});
		setTimeout(function(){
			action(This.oMast,{opacity:0},function(){
				document.body.removeChild(This.oMast);
			});
		},300)
	}else{
		This.obj.style.display = 'none';
		this.oMast && action(this.oMast,{opacity:0},function(){
			document.body.removeChild(This.oMast);
		});
	}
};
Popup.prototype.setPos = function(){
	if(this.settings.pos == 'center'){
		this.obj.style.position = 'absolute';
		if(veiwWidth()<this.obj.offsetWidth){
			this.obj.style.left ='0px';
		}else if(veiwHeight()<this.obj.offsetHeight){
			this.obj.style.top =0+scrollY()+'px';
		}else{
			this.obj.style.left = (veiwWidth() - this.obj.offsetWidth)/2 + 'px';
			this.obj.style.top = (veiwHeight() - this.obj.offsetHeight)/2 + scrollY() + 'px';
		}
	}else if(this.settings.pos == 'right-bottom'){
		this.obj.style.position = 'absolute';
		this.obj.style.left = veiwWidth() - this.obj.offsetWidth + 'px';
		this.obj.style.top = veiwHeight() - this.obj.offsetHeight + scrollY() + 'px';
	}else if(this.settings.pos == 'left-center'){
		this.obj.style.position = 'absolute';
		this.obj.style.left = 0 + 'px';
		this.obj.style.top = (veiwHeight() - this.obj.offsetHeight)/2 + scrollY() + 'px';
	}
};
Popup.prototype.fixedPos = function(){
	var This = this;
	window.onscroll = function(){
		//This.easyState = true;
		This.setPos();
	};
};
Popup.prototype.mast = function(){
	var This = this;
	var oDiv = document.createElement('div');
	oDiv.className = 'master';
	oDiv.style.width = veiwWidth() + 'px';
	oDiv.style.height = veiwHeight() + 'px';
	oDiv.style.zIndex = '666';
	this.obj.style.zIndex = '667';
	document.body.appendChild(oDiv);

	this.oMast = getByClass(document,'div','master')[0];
	action(this.oMast,{opacity:40});
	
	if(window.attachEvent){
		window.attachEvent('resize',function(){
			This.oMast.style.width = veiwWidth() + 'px';
			This.oMast.style.height = veiwHeight() + 'px';
		});
		window.attachEvent('scroll',function(){
			This.oMast.style.top = scrollY() + 'px';
		});
	}else{
		window.addEventListener('resize',function(){
			This.oMast.style.width = veiwWidth() + 'px';
			This.oMast.style.height = veiwHeight() + 'px';
		},false);
		window.addEventListener('scroll',function(){
			This.oMast.style.top = scrollY() + 'px';
		},false);
	}
};
Popup.prototype.dragbar = function(){
	this.dragBar = getByClass(this.obj,'h3','mytitle')[0];
	var d = new drag(this.dragBar,this.obj);
	d.init();
	
};
Popup.prototype.moveIn = function(){
	this.obj.style.top = '-200px';
	this.obj.style.opacity = '0';
	action(this.obj,{top:Math.floor((veiwHeight() - this.obj.offsetHeight)/2),opacity:100})
};
Popup.prototype.bigBtn = function(){
	var This = this;
	var big = document.createElement('span');
	big.className = 'bigest';
	if(PopBig){
		this.obj.appendChild(big);
		PopBig = false;
	}
	this.bigBtn = getByClass(this.obj,'span','bigest')[0];
	
	this.bigBtn.onclick = function(){
		This.changeBig();
	}
	this.W = css(this.obj,'width');
	this.H = css(this.obj,'height');
};
Popup.prototype.changeBig = function(){
	this.obj.style.left = '0';
	this.obj.style.top = '0';
	this.obj.style.width = veiwWidth()+'px';
	this.obj.style.height = veiwHeight()-2*parseInt(css(this.obj,'padding'))+'px';
	this.bigBtn.style.display = 'none';
	if(PopMid){
		this.midBtn();
	}
	this.midBtn.style.display = 'block';
};
Popup.prototype.midBtn = function(){
	var This = this;
	var mid = document.createElement('span');
	mid.className = 'midBtn';
	if(PopMid){
		this.obj.appendChild(mid);
		PopMid = false;
	}
	this.midBtn = getByClass(this.obj,'span','midBtn')[0];
	
	this.midBtn.onclick = function(){
		This.changeMid();
	}
};
Popup.prototype.changeMid = function(){
	this.obj.style.width = parseInt(this.W) + 'px';
	this.obj.style.height = parseInt(this.H) + 'px';
	this.setPos();
	
	this.midBtn.style.display = 'none';
	this.bigBtn.style.display = 'block';
}
Popup.prototype.minimize = function(){
	this.obj.children[1].style.display = 'block';
	var W = parseInt(css(this.obj,'width'));
	var H = parseInt(css(this.obj,'height'));
	this.obj.children[1].style.display = 'none';
	this.obj.style.display = 'block';
	this.easyshow = getByClass(this.obj,'div','easyshow')[0];
	
	this.obj.style.width = this.easyshow.offsetWidth + 'px';
	this.obj.style.height = this.easyshow.offsetHeight + 'px';
	this.obj.style.background = 'none';
	
	var This = this;
	this.easyshow.onclick = function(){
		This.easyshow.style.display = 'none';
		This.obj.children[1].style.display = 'block'
		action(This.obj,{width:W,height:H,top:scrollY()+Math.round((veiwHeight()-H)/2)});
		This.minBtn();
		This.oMin.style.display = 'block';
		This.easyState = false;
	};
};
Popup.prototype.minBtn = function(){
	var This = this;
	var minBtn = document.createElement('div');
	minBtn.className = 'minBtn';
	minBtn.innerHTML = '<<收起';
	this.obj.appendChild(minBtn);
	
	this.oMin = getByClass(this.obj,'div','minBtn')[0];
	this.oMin.style.display = 'block';
	this.oMin.onclick = function(){
		This.changeMin();
	};
};
Popup.prototype.changeMin = function(){
	var This = this;
	this.obj.removeChild(this.oMin)
	this.easyshow.style.display = 'block';
	this.easyshow.style.opacity = '0';
	this.easyshow.style.filter = 'alpha(opacity = 0)';
	action(this.obj,{width:This.easyshow.offsetWidth,height:parseInt(css(this.easyshow,'height')),top:scrollY()+Math.round(((veiwHeight()-parseInt(css(this.easyshow,'width')))/2))},function(){
		This.obj.children[1].style.display = 'none';
		This.easyshow.style.opacity = '1';
		This.easyshow.style.filter = 'alpha(opacity = 100)';
	});
	if(this.easyState){
		this.obj.children[1].style.display = 'none';
		this.easyshow.style.opacity = '1';
		this.easyshow.style.filter = 'alpha(opacity = 100)';
	}
};

//floatBar
function Float(obj){
	this.obj = obj;
	this.settings = {
		pos		:'',
		floatjump:false,
		jHeight:20,
		floatshake	:false
	}
};
Float.prototype.init = function(opt){
	extend( this.settings , opt || {} );
};
Float.prototype.jump = function(){
	if(this.settings.floatjump){
		var This = this;
		var iSpeed = -This.settings.jHeight;
		var pos = this.obj.offsetTop;
		var T = 0;
		clearInterval(this.obj.jTimer);
		this.obj.jTimer = setInterval(function(){
			iSpeed += 2;
			T = This.obj.offsetTop + iSpeed;
			
			if(T>=pos){
				iSpeed*=-1;
				iSpeed*=0.6;
			}
			This.obj.style.top =  T +'px';
			document.title = (T>=pos) +':'+iSpeed;
			if(Math.abs(iSpeed)<1&&T>=pos){
				clearInterval(This.obj.jTimer)
			}
		},30)
	}
};
Float.prototype.shake = function(dir,fn){
	if(this.settings.floatshake){
		clearInterval(this.obj.sTimer);
		var This = this;
		var pos = parseInt(css(this.obj,dir));
		var arr = [];
		var num = 0;
		for(var i=6; i>0; i-=2){
			arr.push(i, -i);
		}
		//arr.push(0)
		
		this.obj.sTimer = setInterval(function(){
			This.obj.style[dir] = pos+arr[num]+'px';
			//alert(arr[num])
			num++;
			if(num==arr.length-1){
				This.obj.style[dir] = pos + 'px';
				clearInterval(This.obj.sTimer);
				fn && fn.call(This.obj);
			}
		},30)
	}
}





