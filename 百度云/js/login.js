var oUserId=document.getElementById("userId")
var loginBtn=oUserId.getElementsByTagName("span")[0];
var logBox=document.getElementById("loginFrame_box");
var oX=logBox.getElementsByTagName("a")[0];
var maskBg=document.getElementById("maskBg");//遮罩
var loginInput=document.getElementById("loginInput");
var aInp=loginInput.getElementsByTagName("input");
var aSpan=loginInput.getElementsByTagName("span");
var oSearchBtn=document.getElementById("searchBtn");
var oSearchWord=document.getElementById("searchWord");
var oSuggestion=document.getElementById("suggestion");
var oHeadeRight=document.getElementById("headeRight");
var oMsgMask=document.getElementById("msgMask");
var msgSpan=document.getElementById("msg").getElementsByTagName("p")[0];
var msgTimer=null;
var oBody=document.getElementById("mybody");
var oMsg=document.getElementById("msg2");
oUserId.onclick=function(){ //点击登录
	logBox.style.display="block";
	maskBg.style.display="block";
	oMsg.style.display='none';	
	logBox.style.top=(document.documentElement.clientHeight/2)-(logBox.offsetHeight/2)+'px';//可视区的一半减去元素自身的一半
	logBox.style.left=document.documentElement.clientWidth+'px'; //初始left	
	move(logBox,{left:document.documentElement.clientWidth*0.9-logBox.offsetWidth},1500,"backOut",function(){ //登陆框 
		aInp[0].focus();	
		oMsgFn();
		msgTimer=setInterval(oMsgFn,14000);			
		function oMsgFn(){  //提示文字			
			move(oMsgMask,{left:oMsgMask.offsetWidth},3000,'linear',function(){				
				setTimeout(function(){
					move(msgSpan,{opacity:0},1000,"easeOut",function(){
						oMsgMask.style.left=0;
						msgSpan.style.opacity=1;
						msgSpan.style.filter='Alpha(opacity=100)';
					});
				},3000);				
			});						
		}		
	})
	move(maskBg,{opacity:1},1500,"easeOut");//背景图
}

aInp[0].onblur=function(){	 //用户名	
	var re =/^[^0-9]\w+@[a-zA-Z0-9]{2,}\.(com|cn|net)$/g;//var re =/^[^0-9]\w+@[a-zA-Z0-9]{2,}\.[a-zA-Z]{2,3}$/g;
	var val=this.value
	if(re.test(val)){	
		aSpan[0].style.background="url(../baidu/imgs/btn_icon.gif) -50px -510px no-repeat";	
	}else{
		aSpan[0].style.background='url(../baidu/imgs/btn_icon.gif) -76px -510px no-repeat';		
	}		
}

aInp[1].onblur=function(){	 //密码
	var re =/^[^0-9]\w{5,9}$/g;
	var val=this.value
	if(re.test(val)){	
		aSpan[1].style.background="url(../baidu/imgs/btn_icon.gif) -50px -510px no-repeat";	
	}else{
		aSpan[1].style.background='url(../baidu/imgs/btn_icon.gif) -76px -510px no-repeat';
	}	
}

logBox.onmousedown=function(ev){
	var e=ev||event;
	var mouseY=e.clientY-this.offsetTop; //鼠标到点击元素的距离
	var mouseX=e.clientX-this.offsetLeft;
	var t=0;
	var l=0;
	
	document.onmousemove=function(ev){
		var e=ev||event;
		t=e.clientY-mouseY
		l=e.clientX-mouseX
		//e.preventDefault?e.preventDefault():e.returnValue=false;//阻止拖拽默认事件	
		if(logBox.setCapture) logBox.setCapture();
		if( l>document.documentElement.clientWidth-logBox.offsetWidth*0.5){  //推入右侧
			clearInterval(msgTimer);
			document.onmousemove=null;	
			var explorer = window.navigator.userAgent
			if(explorer.indexOf("Chrome")!=-1) aInp[0].focus();			
			move(logBox,{left:document.documentElement.clientWidth},1000,"easeOut",function(){
				logBox.style.display="none";		
			});			
			move(maskBg,{opacity:0},1000,"easeOut",function(){
				maskBg.style.display="none";
				oMsg.style.display='block';				
			});			
			return;		
		}
		logBox.style.top=t+"px";
		logBox.style.left=l+"px";		
		return false;
	}
	document.onmouseup=function(){
		if(logBox.releaseCapture) logBox.releaseCapture();		
		if( t<0 ){
			t=0;
			move(logBox,{top:t,left:l},500,'easeOut')
		}
		if( l<0){
			l=0;
			move(logBox,{top:t,left:l},500,'easeOut')
		}
		if( t>document.documentElement.clientHeight-logBox.offsetHeight){
			t=document.documentElement.clientHeight-logBox.offsetHeight
			move(logBox,{top:t,left:l},500,'easeOut')
		}
		if( l>document.documentElement.clientWidth-logBox.offsetWidth&&l<document.documentElement.clientWidth-logBox.offsetWidth*0.5){
			l=document.documentElement.clientWidth-logBox.offsetWidth
			move(logBox,{top:t,left:l},500,'easeOut')
		}
		document.onmousemove=null;
		document.onmouseup=null;
	}
}

var oSearchTimer=0;
enlarge();
function enlarge(){ //查找
	oSearchTimer=setInterval(function(){
		move(oSearchBtn,{width:33,height:33,top:8,right:11},500,'backIn',function(){
			move(oSearchBtn,{width:30,height:30,top:11,right:14},300,'bounceOut')	
		});
	},5000);
};

oSearchBtn.onmouseover=function(){	clearInterval(oSearchTimer) }
oSearchBtn.onmouseout=function(){ enlarge() }
var onOff=true;
oSearchBtn.onclick=function(){	
	oSearchBtn.onmouseout=null;	
	clearInterval(oSearchTimer);	
	if(onOff){		
		move(oSearchBtn,{right:145},800,'linear');
		move(oSearchWord,{width:150},800,'linear',function(){
			move(oSearchBtn,{right:175},1000,'easeOut',function(){
				oSearchWord.focus();
				oSearchWord.value="";
				oSearchWord.style.color='#000';
				document.onclick=function(){	
					oSuggestion.style.display='none';
				}
				onOff=false;		
			});
		});
	};	
	var val=oSearchWord.value;
	if(!val||val=="搜索你的文件") return;
	window.open('http://www.baidu.com/s?wd='+val+'');		
};

oSearchWord.onblur=function(){ //搜索框失去焦点如果内容为空就自动关闭
	if( !this.value ){		
		move(oSearchBtn,{right:14},1000,'easeBothStrong');
		move(oSearchWord,{width:0},1000,'easeBothStrong',function(){
			oSearchWord.value="搜索你的文件";
			oSearchWord.style.color='';
			document.onclick=null; //释放内存				
			oSearchBtn.onmouseout=function(){ enlarge() }; //还原out事件
			enlarge(); //开启运动
			onOff=true;
		});		
	}	
}

oSearchWord.onkeyup=function(){
	if( !this.value ){
		oSuggestion.style.display='none';
	}else{
		oSuggestion.style.display='block'
	}
	var oScript=document.createElement("script");
	var script=document.getElementById("oScript");
	if(script){document.body.removeChild(script)};
	oScript.src='http://suggestion.baidu.com/su?wd='+this.value+'&cb=fn';
	oScript.id="oScript";
	document.body.appendChild(oScript);
}

function fn(data){
	var html=''
	for( var i=0;i<data.s.length;i++ ){
		html+='<li><a target="_blank" href="http://www.baidu.com/s?wd='+data.s[i]+'">'+data.s[i]+'</a></li>';
	}
	oSuggestion.innerHTML=html;
}

//oUserIdshake();
setInterval(oUserIdshake,12000);
function oUserIdshake(){
	shake(oUserId,'top',8,function(){
		shake(oUserId,'left',8);
	})
}

