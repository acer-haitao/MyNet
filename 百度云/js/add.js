var oNewFloder=document.getElementById("newFloder");
var oFileWrap=document.getElementById("fileWrap");
var toolbar=document.getElementById("toolbar");
var aLink=toolbar.getElementsByTagName("a");
var oFileContWrap = document.getElementById('fileContWrap');
var oSelectNum=document.getElementById("selectNum");
var oInitialize=document.getElementById("initialize");
var aNewDiv=[]; //存放新建的item

newFolder();
function newFolder(){
	if(!localStorage.getItem("newItem")){ //如果没有就创建4个空文件夹
		for( var t=0;t<4;t++ ){
			var sourceFolder='<div class="thumb thumb-large"><span class="item-chk"></span></div><div class="file-name"><a href="javascript:;" style="display: block;">新建文件夹'+(t+1)+'</a></div>';
			aNewDiv.push(sourceFolder);
		}
		aNewDiv.reverse(); //反转一下
		localStorage.setItem('newItem',aNewDiv);		
	}
};

/*localStorage*/
var aItem=[];  //必须放这里 先清空 否则清除localStorage还会存在 原因未知
var str=localStorage.getItem("newItem"); //获取本地存储 返回的是字符串 本地ie打开会报错
if(str) aItem=str.split(","); //拆分为多个数组
aNewDiv=aItem;
for( var i=0;i<aItem.length;i++ ){
	var NewDiv2=document.createElement("div"); //item 最外层的DIV	
	NewDiv2.className="item";	
	NewDiv2.innerHTML=aItem[i];
	oFileContWrap.insertBefore(NewDiv2,oFileContWrap.children[0]);
}
lee.operateFolder();

/*清除localStorage*/
oInitialize.onclick=function(){ 
	localStorage.clear();
	location.reload();		
}

/*新增*/
bindEvent(newFloder,"click",function(){
	add();	
	lee.operateFolder(); //重新统计
})

/*删除*/
aLink[2].onclick=function(){
	aNewDiv=[];  //必须清空 否则会重复之前的数据
	localStorage.removeItem('newItem'); //清除localStorage  因为aNewDiv=aItem
	var active=getElsByClass(oFileWrap,"span","active")
	for(var i=0;i<active.length;i++ ){
		if( active[i] ){
			oFileContWrap.removeChild(active[i].parentNode.parentNode);	
		}		
	}	
	/*重新写入localstorage*/
	for(var j=0;j<oFileContWrap.children.length;j++ ){
		aNewDiv.unshift(oFileContWrap.children[j].innerHTML);		
		localStorage.setItem('newItem',aNewDiv);
	 }
	 lee.operateFolder();
	 oSelectNum.innerHTML=0;
	 iSelectNum=0;	
}	

/*重命名*/
aLink[3].onclick=function(){
	alter();
}

var bOff=false;
function add(){ //新增
	if( bOff ){
		var oInp=oFileContWrap.getElementsByTagName("input")[0]
		shake(oFileContWrap.children[0],'left',10,function(){
			oInp.focus();
		})
		return;
	}
	bOff=true;
	var input=document.createElement("div"); //修改框	
	input.className="edit-name";
	input.innerHTML='<input type="text" class="box" value="新建文件夹"><span class="sure"></span><span class="cancel"></span>';	
	var NewDiv=document.createElement("div"); //item 最外层的DIV	
	NewDiv.className="item";	 
	NewDiv.innerHTML='<div class="thumb thumb-large"><span class="item-chk"></span></div><div class="file-name"><a style="display:none" href="javascript:;">新建文件夹</a></div>';
	NewDiv.children[1].appendChild(input);
	oFileContWrap.insertBefore(NewDiv,oFileContWrap.children[0]); //存储位置
	input.children[0].select();
	
	input.children[1].onclick=function(){  //确定
		sure()
	};
	
	document.onkeydown=function(ev){  //键盘事件
		var ev=ev||event;
		if( ev.keyCode==13 ){
			sure()
		}		
	}

function sure(){ //确定
	var val=input.children[0].value;
	var FileName=input.children[1].parentNode.parentNode.children[0]; 
	var oldVal=FileName.innerHTML//保存文件原来的名字
	FileName.innerHTML=val;
	if( FileName.innerHTML=="" ){ //如果为空 则用老名字或默认
		FileName.innerHTML=oldVal||"新建文件夹"; 
	};
	FileName.style.display="block"; //显示		
	input.children[1].parentNode.parentNode.removeChild(input);//移除修改框
	aNewDiv.push(NewDiv.innerHTML);//outerHTML
	localStorage.setItem('newItem',aNewDiv); //写入本地存储
	bOff=false;	
}
	input.children[2].onclick=function(){ //取消
		oFileContWrap.removeChild(NewDiv);
		bOff=false;
	};
}

function alter(){ //修改
	var active=getElsByClass(oFileWrap,"span","active");
	for(var i=0;i<active.length;i++ ){
		if( active.length >= 2 ){
			alert("一次只能修改一个");
			return;
		}else{
			if( bOff ){
				var oInp=oFileContWrap.getElementsByTagName("input")[0]
				shake(active[i].parentNode.parentNode,'left',10,function(){
					oInp.focus();
				})
				return;
			}
			bOff=true;
			var input=document.createElement("div"); //修改框	
			input.className="edit-name";
			input.innerHTML='<input type="text" class="box" value="新建文件夹"><span class="sure"></span><span class="cancel"></span>';
			active[i].parentNode.parentNode.children[1].children[0].style.display="none";
			active[i].parentNode.parentNode.children[1].appendChild(input);	
			var oldVal=active[i].parentNode.parentNode.children[1].children[0].innerHTML;
			input.children[0].value=oldVal;
			input.children[0].select();	
						
			input.children[1].onclick=function(){  //点击确定
				var val=input.children[0].value;
				var FileName=this.parentNode.parentNode.children[0]; 
				var oldVal=FileName.innerHTML//保存文件原来的名字
				FileName.innerHTML=val;
				if( FileName.innerHTML=="" ){ //如果为空 则用老名字或默认
					FileName.innerHTML=oldVal||"新建文件夹"; 
				}			
				FileName.style.display="block"; //显示
				removeClass(prev( this.parentNode.parentNode ),'active');  //移除外框
				removeClass(prev( this.parentNode.parentNode ).children[0],'active');  //移除勾号				
				this.parentNode.parentNode.removeChild(input);  //移除修改框
				oSelectNum.innerHTML=0;
				iSelectNum=0;				
				/*重新写入localstorage*/
				aNewDiv=[];  //必须清空 否则会重复之前的数据
				localStorage.removeItem('newItem'); //清除localStorage  因为aNewDiv=aItem				
				for(var j=0;j<oFileContWrap.children.length;j++ ){
					aNewDiv.unshift(oFileContWrap.children[j].innerHTML);	
					localStorage.setItem('newItem',aNewDiv);
				 }				
				bOff=false;		
			}
			
			input.children[2].onclick=function(){ //取消
				var FileName=this.parentNode.parentNode.children[0];
				if(FileName.innerHTML==""){
					FileName.innerHTML="新建文件夹";
				}
				removeClass(prev( this.parentNode.parentNode ),'active')
				removeClass(prev( this.parentNode.parentNode ).children[0],'active')
				this.parentNode.parentNode.removeChild(input);
				oSelectNum.innerHTML=0;
				iSelectNum=0;
				FileName.style.display="block";
				bOff=false;
			};
		}
	}
}


/* 添加的模型
<div class="item">
	<div class="thumb thumb-large">
			<span class="item-chk"></span>
	</div>
	<div class="file-name">
			<a href="javascript:;">网站PSD模板</a>
			<div class="edit-name">
					<input class="box" type="text" value="">
					<span class="sure">√</span>
					<span class="cancel">×</span>
			</div>
	</div>
</div>
*/
