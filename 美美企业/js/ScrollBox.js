(function(){
	var ScrollBox = document.getElementById('botton-scroll');/*图片滚动盒子*/
	var ScrolloUl = ScrollBox.getElementsByTagName('ul')[0];
	var aLi = ScrollBox.getElementsByTagName('li');/*每个滚动的li*/
	var aImg = ScrollBox.getElementsByTagName("img")/*每一个图片*/
	var len = aLi.length;/*个数*/
	var oW = aLi[0].offsetWidth/*大小*/
	var oM = 3;/*默认值*/
	var oBtnL = document.getElementById('prev');/*左按钮*/
	var oBtnR = document.getElementById('next');/*右按钮*/
	var n = 0;
	var timer = null;
	var bBtn = true;
	ScrolloUl.style.width =len*oW+'px';
	var iNum = 3;
	/*右点击往下*/
	oBtnR.onclick = function(){
		/*如果当前n大于图片的length 就做判断*/
		n++;		
		fn1(aLi);
	}

	oBtnL.onclick = function(){
		n--;
		fn1(aLi);
	}
	
	function getWidth(){
		ScrolloUl.style.width =len*oW+'px';
	}
	function fn1(obj){
		if(n == 0){
			obj[0].style.position = 'static';
		}
		if(n == obj.length-1){
			obj[obj.length-1].style.position = 'static';
		}
		
		if(n == obj.length){
			obj[0].style.position = 'relative';
			obj[0].style.left = oW * obj.length + 'px';
		}
		if(n > obj.length-3){
			obj[0].style.position = 'static';
			ScrolloUl.style.left = 0;
			n = 1;
		}
		if(n == -1){
			obj[obj.length-1].style.position = 'relative';
			obj[obj.length-1].style.left = -oW * obj.length-1+'px';
			
		}
		if(n < -1){
			obj[obj.length-1].style.position = 'static';
			ScrolloUl.style.left = -oW * (obj.length-3)+'px';
			n = obj.length-4;
		}
		move(ScrolloUl,{left : - n*oW},500,'linear');
	}	
	/*点击图片*/
	var oPageBox = document.getElementById('Outer');
	var OImgCont = document.getElementById('ImgCont');
	var OImgList = OImgCont.getElementsByTagName('img');
	var aImgAll = document.getElementById('ImgBox');
	var BtnLeft = document.getElementById('BtnLeft');
	var BtnRight = document.getElementById('BtnRight')
	var aImgPic = document.getElementById('Img');
	var EarrorBox = document.getElementById("ErrorBox");
	var Earror = document.getElementById("Error");
	var LoadBox = document.getElementById('LoadBox');/*加载*/
	var num = 0;
	var onoff = true;
	for(var i=0;i<aImg.length;i++)
	{
		aImg[i].index = i;
		aImg[i].onclick = function(){
			num = this.index;
			LoadBox.style.display = 'block';
			setTimeout(function(){
				LoadBox.style.display = 'none';
			},400)
			aImgEffect(num,function(){
				move(OImgCont,{'height':468},200,'linear');
				//OImgCont.style.height = '468px';
			});
			
		}
		//图片点击显示效果
		function aImgEffect(num,callback){
			GetImg(aImg[num]);
			oPageBox.style.display = 'block';
			aImgAll.style.display = 'block'
			move(aImgPic,{'opacity':1},200,'linear');
			callback && callback();
		}
		
		function GetImg(obj){
			var ImgSrc = obj.getAttribute('src')
			aImgPic.src = ImgSrc;
			
			LoadBox.style.display = 'block';
			setTimeout(function(){
				LoadBox.style.display = 'none';
			},400)
			
			//move(aImgPic,{'opacity':1},200,'linear');
//			setTimeout(function(){
//				move(aImgPic,{'opacity':1},200,'linear');
//			},400)
			move(aImgPic,{'opacity':0},200,'linear');
			setTimeout(function(){
				move(aImgPic,{'opacity':1},200,'linear');
			},600)
		}
		
		
		BtnLeft.onclick = function(){
			num--;
			if(num == -1)
			{
				num=-1;
				oPageBox.style.display = 'none';
				aImgAll.style.display = 'none';
			}
			GetImg(aImg[num]);
		}
		BtnRight.onclick = function(){
			num++;
			
			if(onoff)
			{
				move(aImgPic,{'opacity':0},200,'linear');
			}else{
				move(aImgPic,{'opacity':1},200,'linear');
			}
			//onoff = !onoff;
			//move(aImgPic,{'opacity':1},200,'linear');
			if(num>aLi.length-2)
			{
				num = aLi.length-2;
				oPageBox.style.display = 'none';
				aImgAll.style.display = 'none';
			}
			GetImg(aImg[num]);
		}
		/*关闭*/
		Earror.onclick = function(){
			oPageBox.style.display = 'none';
			aImgAll.style.display = 'none';
			move(aImgPic,{'opacity':0},200,'linear')
			move(OImgCont,{'height':448},200,'linear');
		}
		/*左右透明度*/
		var BtnLeftbox = document.getElementById("BtnLeftbox");
		var BtnRightbox = document.getElementById('BtnRightbox');
		BtnLeftbox.onmouseover = function(){
			this.style.opacity = 1;
		}
		BtnLeftbox.onmouseout = function(){
			this.style.opacity = 0;
		}
		
		BtnRightbox.onmouseover = function(){
			this.style.opacity = 1;
		}
		
		BtnRightbox.onmouseout = function(){
			this.style.opacity = 0;
		}
		
	}
})()
