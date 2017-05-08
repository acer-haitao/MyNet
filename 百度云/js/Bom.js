var iSelectNum = 0 //单选
var lee = (function(){
	var oFileWrap = document.getElementById('fileWrap');   // 文件内容区外框布局
	var oFileContWrap = document.getElementById('fileContWrap'); // 文件内容区
	var aItem = getElsByClass(oFileWrap,'div','item'); // 文件夹视图布局
	var aItemThumb = getElsByClass(oFileWrap,'div','thumb'); // 文件夹缩略图
	var aItemChk = getElsByClass(oFileWrap,'span','item-chk'); // 文件夹视图内的选择框
	var oChkAll = document.getElementById('chkAll');  //  全选反选复选框
	var oMp=document.getElementById("mp"); //上下移动的P
	var oSelectNum = document.getElementById('selectNum'); // 选中文件数量
	var oSelectNum2 = document.getElementById('selectNum2'); // 选中文件数量
	var oRightMenu = document.getElementById('rightMenu'); // 右键菜单
	var totalItem = 0;// 选中文件个数 //当前文件夹总个数
	var oLeftAside=document.getElementById("leftAside");
	var oHeader=document.getElementById("hd");
	oFileContWrap.style.height = (view()["h"] - 173) + 'px';  // 给文件内容高度	
	oLeftAside.style.height = document.documentElement.clientHeight-oHeader.offsetHeight + 'px';
	
	var oClose=document.getElementById("close");
	var oMsg=document.getElementById("msg2");
	var mouseover=document.getElementById("mouseover");
	
	
	setTimeout(function(){
		oMsg.style.display='block';
		move(oMsg,{right:0},1111,'easeOut');	
	},5000)	
	
	oClose.onclick=function(){
		move(oMsg,{right:-450},1111,'bounceOut');	
	}
	
	oClose.onmouseenter=function(){
		oClose.style.background='url(../baidu/imgs/easyicon2.png) no-repeat';	
	}
	oClose.onmouseleave=function(){
		oClose.style.background='url(../baidu/imgs/easyicon.png) no-repeat';
	}
	
	mouseover.onmouseenter=function(){
		move(oMsg,{right:0},1111,'easeOut');
	}
	
	
	
	
	function dragFrame(){ //拖拽
		oFileWrap.onmousedown=function(ev){
			var ev = ev || event;
			var X = ev.clientX; 
			var Y = ev.clientY; 
			var aItem = getElsByClass(oFileContWrap,'div','item'); //重新获取文件缩略视图，因为可能有删除添加操作
			var newDiv = document.createElement('div'); // 创建选择框
			newDiv.style.cssText = 'position:absolute;z-index:1000;background-color:#00F;'+'\n'+'opacity:0.3;filter:alpha(opacity:30);';
			document.body.appendChild(newDiv);			
			oMp.style.top='0px'; //和运动有关
			if(oFileWrap.setCapture) oFileWrap.setCapture()
			ev.preventDefault?ev.preventDefault():ev.returnValue=false;//阻止拖拽默认事件
			
			document.onmousemove=function(ev){
				var ev = ev || event;			
				var posX = ev.clientX;
				var posY = ev.clientY;
				if(newDiv){ // 选择框，代表鼠标按下焦点不在.item身上
					newDiv.style.left = (posX > X ? X : posX) + 'px'; //鼠标移动的位置大于点击的位置 就是用点击的位置
					newDiv.style.top = (posY > Y ? Y : posY) + 'px';
					newDiv.style.width = Math.abs(posX - X) + 'px';
					newDiv.style.height = Math.abs(posY - Y) + 'px';
					//var aItem = getElsByClass(oFileWrap,'div','item'); //重新获取文件缩略视图，因为有删除添加操作
					var num = aItem.length;
					var arr = []; 
					for(var i=0;i<aItem.length;i++){
						removeClass(aItem[i].children[0],'active');
						removeClass(aItem[i].children[0].children[0],'active');
						 //碰撞检测
						if(collision(newDiv,aItem[i])){
							addClass(aItem[i].children[0],'active');
							addClass(aItem[i].children[0].children[0],'active');
							arr.push(aItem[i]);//判断数量
						}else{
							removeClass(aItem[i].children[0],'active');
							removeClass(aItem[i].children[0].children[0],'active');
						}
					}
					iSelectNum = arr.length;  //给数量
					oSelectNum.innerHTML = iSelectNum;				
					num==arr.length?addClass(oChkAll,'active'):removeClass(oChkAll,'active') //判断全选
				};
				
			};
				
			document.onmouseup=function(){	
				if(oFileWrap.releaseCapture) oFileWrap.releaseCapture();	
				if(newDiv) 	document.body.removeChild(newDiv);
				document.onmouseup=document.onmousemove = null;
			};
		};
	}

//鼠标全局右键菜单函数
function rightMenu(){
	oFileWrap.oncontextmenu=function(ev){ //右击
		var ev = ev || event;
		var oTarget = ev.target || ev.srcElement;
		var posX = ev.clientX;
		var posY = ev.clientY;
		oRightMenu.style.display = 'block';
		var l =posX - getPos(oFileWrap).left;
		var t = posY - getPos(oFileWrap).top;
		if(l>oFileWrap.offsetWidth-oRightMenu.offsetWidth){
			l = posX - oRightMenu.offsetWidth-getPos(oFileWrap)["left"];
		}
		if(t>oFileWrap.offsetHeight - oRightMenu.offsetHeight){
			t = posY - oRightMenu.offsetHeight-getPos(oFileWrap)["top"];
		}
		oRightMenu.style.left = l + 'px';
		oRightMenu.style.top = t + 'px';
		
		document.onclick=function(){  //隐藏
		  oRightMenu.style.display ="";
		}

		var aRightMenuLi = oRightMenu.getElementsByTagName('li');  //右键里的菜单项目
		for(var i=0;i<aRightMenuLi.length;i++){
			aRightMenuLi[i].onmouseover=function(){
				this.style.backgroundColor = '#E6F3FE';
			}
			aRightMenuLi[i].onmouseout=function(){
				this.style.backgroundColor = '';
			}
		}
		var oThumbTypeU = document.getElementById('thumbType');
		var aNewFolder=document.getElementById("r_newFolder");
		var newFolder=aNewFolder.getElementsByTagName("li");
		
		newFolder[0].onclick=function(){ //新建
			add();
			operateFolder();
		};	
		newFolder[1].onclick=function(){ //刷新页面
			location.reload(); //默认为 false，从客户端缓存里取当前页。true, 则以 GET 方式，从服务端取最新的页面, 相当于客户端点击 F5("刷新") 
		};
		
		newFolder[2].onclick=function(){ //上传
			fileBtn.click();
			fileBtn.onchange=function(){
				upload();
			}
		};		
		//后面写排序	
		return false;
	};
};

//文件缩略图的单击选中,全选函数
function operateFolder(){
	var aItem = getElsByClass(oFileWrap,'div','item'); //重新获取文件缩略视图，因为有删除添加操作
	var aItemThumb = getElsByClass(oFileWrap,'div','thumb'); // 文件夹缩略图
	var aItemChk = getElsByClass(oFileWrap,'span','item-chk'); // 文件夹视图内的选择框
	for(var i=0;i<aItemThumb.length;i++){
		//最外层文件夹缩略图，鼠标移入出现边框，同时出现小选项框
		aItemThumb[i].onmouseover=function(){
			var oItemChk = this.children[0];
			addClass(this,'active');
		};
		//最外层文件夹缩略图，鼠标移出消除边框，同时消失小选项框
		aItemThumb[i].onmouseout=function(){
			var oItemChk = this.children[0];
			var names = oItemChk.className;
			if(names.indexOf('active')==-1){
				removeClass(this,'active');
			}
		};
		//每个缩略图下的选择框
		aItemChk[i].onclick=function(){			
			var names = this.className;
			if(names.indexOf('active')==-1){
				addClass(this,'active');
				if(isChecked()){
					addClass(oChkAll,'active');
				}
				iSelectNum++;
				numMoveUp();					
			}else{
				iSelectNum--;
				removeClass(this,'active');
				removeClass(oChkAll,'active');
				numMoveDown();					
			};
		};
	};
	
	// 全选判断
	function isChecked(){
		var aItem = getElsByClass(oFileWrap,'div','item'); //重新获取文件缩略视图，因为有删除添加操作
		for(var i=0;i<aItem.length;i++){
			if(!(aItemChk[i].className.indexOf('active')+1)){
				return false;
			}
		}
		return true;
	};
	
	//全选反选框
	oChkAll.onclick=function(){
		var aItem = getElsByClass(oFileWrap,'div','item'); //重新获取文件缩略视图，因为有删除添加操作
		var aItemThumb = getElsByClass(oFileWrap,'div','thumb'); // 文件夹缩略图  (重新获取)
		var aItemChk = getElsByClass(oFileWrap,'span','item-chk'); // 文件夹视图内的选择框(重新获取)
		var names = this.className;
		if(names.indexOf('active')==-1){
			addClass(this,'active');
			for(var i=0;i<aItem.length;i++){
				addClass(aItemThumb[i],'active');
				addClass(aItemChk[i],'active');
			}			
			iSelectNum = aItem.length;
			numMoveUp();
		}else{
			removeClass(this,'active');
			for(var i=0;i<aItem.length;i++){
				removeClass(aItemThumb[i],'active');
				removeClass(aItemChk[i],'active');
			}
			iSelectNum = 0;	
			numMoveDown();
		};
	};	
};

function numMoveUp(){
	oMp.style.top='0px';
	oSelectNum2.innerHTML=iSelectNum
	move(oMp,{top:-20},500,'easeOut',function(){
		oSelectNum.innerHTML = iSelectNum;
		oMp.style.top=0;					
	})				
}

function numMoveDown(){
	oMp.style.top='-20px';
	oSelectNum.innerHTML = iSelectNum;
	move(oMp,{top:0},500,'easeOut',function(){
		oSelectNum2.innerHTML = iSelectNum;
		oMp.style.top='-20px';				
	})
}


window.onresize=function(){  //移动框
	var oFileContWrap = document.getElementById('fileContWrap');
	var h = view()["h"] - 173;
	var H = oFileContWrap.offsetHeight;
	if(h < H){
		oFileWrap.style.overflowY = 'auto';
	}
	oFileWrap.style.height = h + 'px';
};

dragFrame(); // 鼠标拖动选择文件夹函数
rightMenu(); // 鼠标右键菜单函数	
return { 
	operateFolder: operateFolder	
}//文件缩略图操作
})()

