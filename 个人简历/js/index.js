// JavaScript Document

window.onload = function(){

	var oBox = getByClass('box',document);

	var navUl = document.getElementById('bjList');
	var navLi = navUl.getElementsByTagName('li');
	
	var oBj1 = getByClass('bj1',document);
	var oBj2 = getByClass('bj2',document);
	var arrBj1 = [];
	var arrBj2 = [];
	for(var i=0; i<oBj1.length; i++){
		arrBj1.push(oBj1[i].offsetTop);
		arrBj2.push(oBj2[i].offsetTop);
	}

	var iNow = 0;
	function scrollMoveDown(i){   // 滚动条运动函数
		var num = i;
		clearInterval(timers);
		timers=setInterval(function(){
			scrollRun(num);
		},30); 
	} 
	function scrollRun(num){    //  滚动条往上或者往下运动
	
		T=document.documentElement.scrollTop || document.body.scrollTop; 
		//alert(iNow);
		if(T < oBox[0].offsetHeight *num && num > iNow){ 
			T+=71;
			window.scrollTo(0,T); 
		}else if(T > oBox[0].offsetHeight *num && num < iNow){ 
			T-=71;
			window.scrollTo(0,T);
		}else{
		window.scrollTo(0,num*oBox[0].offsetHeight);
		iNow = num;
		clearInterval(timers); 
		
		} 
	} 
	
	var T = 0;
	var timers = null;

	for(var i=0;i<navLi.length;i++){
		navLi[i].index = i;
		navLi[i].onclick = function(){    //nav  Li的变化
			
			scrollMoveDown(this.index);
			//for(var i=0; i<navLi.length;i++){
				//liBjmove1(navLi[i]);
			//}
			//liBjmove(navLi[this.index]);
		}
	}
	
	function liBjmove1(obj){
		var bjCor = obj.getElementsByTagName('img')[0];
		timeMove(bjCor,{top:34,left:10},'linear');
	}
	function liBjmove(obj){
		var bjCor = obj.getElementsByTagName('img')[0];
		timeMove(bjCor,{top:0,left:0},'linear');
		
	}

	var facebook = getByClass('facebook',document)[0];
	var fImg = facebook.getElementsByTagName('img')[0];
	var twitter = getByClass('twitter',document)[0];
	var tImg = twitter.getElementsByTagName('img')[0];

	fImg.onmouseover = function(){  // Facebook  icon  onmouseover事件
		this.src = 'img/index_img/btn_facebook_yellow.png';
	}
	fImg.onmouseout = function(){    //  Facebook  icon  onmouseout事件
		this.src = 'img/index_img/btn_facebook.png';
	}

	tImg.onmouseover = function(){  // Twitter  icon  onmouseover事件
		this.src = 'img/index_img/btn_twitter_yellow.png';
	}
	tImg.onmouseout = function(){  //   Twitter  icon  onmouseout事件
		this.src = 'img/index_img/btn_twitter.png';
	}
	
	var rightbox = getByClass('rightbox',document);
	var leftIcon = getByClass('leftIcon',document);
	var txtCon = getByClass('txtCon',document);
	var icon = getByClass('icon',document);
	var infoShow = getByClass('infoShow',document);
	

	for(var i=0;i<leftIcon.length; i++){  //  rightbox事件
		leftIcon[i].index = i;
		leftIcon[i].onmouseover = function(){  
			overCor(this);
		}
		leftIcon[i].onmouseout = function(){
			outCor(this);
		}
		leftIcon[i].onclick = function(){
			var that = this;
			if(this.parentNode.offsetWidth == 0){
				
				pzMoveW(this.parentNode,631);
				startMove(txtCon[this.index],{left: -600},function(){
					txtCon[that.index].style.display = 'none';
					icon[that.index].style.display = 'none';
				});
				startMove(icon[this.index],{left: -600});
			}else{
				txtCon[this.index].style.display = 'block';
				icon[this.index].style.display = 'block';
				pzMoveW(this.parentNode,0);
				startMove(txtCon[this.index],{left: 0});
				startMove(icon[this.index],{left: 0});
			}
			
		}
	}
	
	
	var listR1 = document.getElementById('listR1');
	var r1Li = listR1.getElementsByTagName('li');
	//var r1Div = listR1.getElementsByTagName('div');
	
	
	for(var i=0; i<r1Li.length; i++){
		r1Li[i].index = i;
		r1Li[i].onmouseenter = function (){

			$(this).find('div').animate({width : 460});
		}
		r1Li[i].onmouseleave  = function (){
			
			$(this).find('div').animate({width : 0});
		}	
	}
	
	for(var i=0; i<icon.length; i++){  //txt 里三个按钮  事件
		icon[i].index = i;
		iconfn(icon[i],i);
		
	}
	
	function iconfn(obj,a){   //  txt 里三个按钮  事件函数
		var icon1 = getByClass('icon1',obj);
		for(var i=0; i<icon1.length; i++){    
			
			icon1[i].onmouseover = function(){
				overCor(this);
			}
			icon1[i].onmouseout = function(){
				outCor(this);
			}
			icon1[0].onclick = function(){
				txMove(a);
			}
			icon1[1].onclick = function(){
			//alert(this.parentNode.className);
				pzMoveW(rightbox[a],631);
				startMove(txtCon[a],{left: -400},function(){
					txtCon[that.index].style.display = 'none';
					icon[that.index].style.display = 'none';
				});
				startMove(icon[a],{left: -400});
			}
			icon1[2].onclick = function(){
				txMove1(a);
			}
		}
	}
	
	
	function overCor(obj){  // 移入换图片
		var aImg = obj.getElementsByTagName('img');
		startMove(aImg[0],{opacity:0});
		startMove(aImg[1],{opacity:100});
	}
	function outCor(obj){   //移出换图片
		var aImg = obj.getElementsByTagName('img');
		startMove(aImg[0],{opacity:100});
		startMove(aImg[1],{opacity:0});
	}
	
	var timerT = null;
	var iSpeed = 0;
	function txMove(i){	

		clearInterval(timerT);
		timerT = setInterval(function(){					 						 
			iSpeed += (oBox[0].offsetHeight * (i+1) - scrollY())/6;
			iSpeed *= 0.75;
							 
			if( Math.abs(oBox[0].offsetHeight * (i+1) - scrollY())<=1 && Math.abs(iSpeed)<=1 ){
				
				document.body.scrollTop = document.documentElement.scrollTop = oBox[0].offsetHeight * (i+1);
				iSpeed = 0;
				clearInterval(timerT);
			}
			else{		
				document.body.scrollTop = document.documentElement.scrollTop = scrollY() + iSpeed ;
			}
		},30);
		
	}
	function txMove1(i){	

		clearInterval(timerT);
		timerT = setInterval(function(){					 						 
			iSpeed += (scrollY() - oBox[0].offsetHeight * (i-1) )/6;
			iSpeed *= 0.75;
							 
			if( Math.abs(scrollY() - oBox[0].offsetHeight * (i-1) )<=1 && Math.abs(iSpeed)<=1 ){
				clearInterval(timerT);
				document.body.scrollTop = document.documentElement.scrollTop = oBox[0].offsetHeight * (i-1);
				iSpeed = 0;
				
			}
			else{		
				document.body.scrollTop = document.documentElement.scrollTop = scrollY() - iSpeed ;
			}
		},30);
		
	}

	var box5 = document.getElementById('box5');
	var oUl5 = box5.getElementsByTagName('ul')[0];
	var oLi5 = box5.getElementsByTagName('li');
	var oDiv5 = oUl5.getElementsByTagName('div');
	
	for(var i=0; i<oLi5.length; i++){
		oLi5[i].index = i;
		oDiv5[i].style.background = 'url(img/index_img/liBj'+ (i+1) +'.gif) no-repeat';  //  给box5里li里的div加背景
		oLi5[i].onmouseover = function(){
			
			overBj(oLi5[this.index]);
		}
		oLi5[i].onmouseout = function(){
			outBj(oLi5[this.index]);
		}
	}
	function addBj(obj){
		
	}
	function overBj(obj){
		var oDiv5 = obj.getElementsByTagName('div')[0];
		startMove(oDiv5,{opacity:100});
	}
	function outBj(obj){
		var oDiv5 = obj.getElementsByTagName('div')[0];
		startMove(oDiv5,{opacity:0});
	}
	
	var footer = document.getElementById('footer');
	var upIcon = footer.getElementsByTagName('div')[0];
	
	upIcon.onclick = function(){   //   footer 事件
		if(footer.offsetHeight == 0){
			pzMoveH(footer,200);
		}else{
			pzMoveH(footer,0);
		}
	}
	
	function pzMoveW(obj,iTarget){   //碰撞弹性运动width++ or width--
		
		obj.iSpeed = 0;
		obj.iNow = 0;
		
		var num = 4;
		
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			
			if( obj.offsetWidth < iTarget ){
				num = 4;
			}
			else if(obj.offsetWidth > iTarget){
				num = -4;
			}
			
			obj.iSpeed += num;
			
			var W = obj.offsetWidth + obj.iSpeed;
			
			if( (W > iTarget && num > 0) || (W < iTarget && num < 0) ){
				
				obj.iNow++;
				
				W = iTarget;
				obj.iSpeed *= -1;
				obj.iSpeed *= 0.55;
				
				if(obj.iNow==2){
					clearInterval(obj.timer);
				}	
			}
			else{
				
				obj.iNow = 0;
			}	
			obj.style.width = W + 'px';	
		},30);	
	}
	
	function pzMoveH(obj,iTarget){  //弹性运动height++ or height--
		
		obj.iSpeed = 0;
		obj.iNow = 0;
		
		var num = 4;
		
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			
			if( obj.offsetHeight < iTarget ){
				num = 4;
			}
			else if(obj.offsetHeight > iTarget){
				num = -4;
			}
			
			obj.iSpeed += num;
			
			var H = obj.offsetHeight + obj.iSpeed;
			
			if( (H > iTarget && num > 0) || (H < iTarget && num < 0) ){
				
				obj.iNow++;
				
				H = iTarget;
				obj.iSpeed *= -1;
				obj.iSpeed *= 0.55;
				
				if(obj.iNow==2){
					clearInterval(obj.timer);
				}				
			}
			else{
				
				obj.iNow = 0;
			}
			
			obj.style.height = H + 'px';
			
		},30);	
	}
	
	document.onscroll = function(){  

		for(var i=0; i<rightbox.length; i++){   //  当滚动条发生移动时，rightbox的offsetWidth等于0，做碰撞弹性运动
			if(rightbox[i].offsetWidth != 0){
				txtCon[i].style.display = 'block';
				icon[i].style.display = 'block';
				pzMoveW(rightbox[i],0);
				startMove(txtCon[i],{left: 0});
				startMove(icon[i],{left: 0});
			}
		}
		var bjCor = getByClass('bjCor',document);
		for(var i=0; i<bjCor.length-1; i++){         //  滚动条控制navLi的背景变化
			if(scrollY() >=oBox[0].offsetHeight*i && scrollY() <= oBox[0].offsetHeight*(i+1)){
				bjCor[i].style.top =(scrollY() - oBox[0].offsetHeight * i )*(navLi[0].offsetHeight/oBox[0].offsetHeight) + 'px';
				bjCor[i].style.left = (scrollY() - oBox[0].offsetHeight * i )*(10/oBox[0].offsetHeight) + 'px';
				bjCor[i+1].style.top =( oBox[0].offsetHeight * (i+1) - scrollY())*(navLi[0].offsetHeight/oBox[0].offsetHeight) + 'px';
				bjCor[i+1].style.left =( oBox[0].offsetHeight * (i+1) - scrollY())*(10/oBox[0].offsetHeight) + 'px';
			}else if(scrollY() <oBox[0].offsetHeight*i){
				bjCor[i+1].style.top = oBox[0].offsetHeight * (i+1) + 'px';
			}else if(scrollY() > oBox[0].offsetHeight*(i+1)){
				bjCor[i].style.top = oBox[0].offsetHeight * (i+1) + 'px';
			}
		}
				
		for(var i=0; i<oBox.length-2; i++){     // 滚动条控制box中的两层背景
			navLi[i].index =i;
			bjMove(oBox[i],i);
		}
	}
	
	function bjMove(obj,i){
		var oBj = getByClass('bj',obj);
		oBj[0].style.top =arrBj1[i] + -scrollY()/2 + 'px';
		oBj[1].style.top =arrBj2[i] + scrollY()/2.6 + 'px';
	}
}


function scrollY(){  // 获取滚动条的高度
	return document.body.scrollTop || document.documentElement.scrollTop;
}

function getByClass(sClass,parent){     //用className来获取元素的函数
	
	var aEles = (parent||document).getElementsByTagName('*');
	var arr = [];
	
	for(var i=0; i<aEles.length; i++){
		
		var aClass = aEles[i].className.split(' ');
	
		for(var j=0; j<aClass.length; j++){
			
			if(aClass[j] == sClass){
			
				arr.push(aEles[i]);	
				break;			
			}			
		}	
	}
	return arr;
}
