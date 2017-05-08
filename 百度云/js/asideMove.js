var oList=document.getElementById("aside_list");
var aLi = oList.getElementsByTagName("li");
var arr = [];
for( var i = 0; i < aLi.length; i++ ){		
	arr.push( {top:aLi[i].offsetTop} )//保存一下每一个li距离父级上面的距离
	fnMove( aLi[i] );
	if( localStorage.getItem("inHTML") ){
		var inHTML=JSON.parse(localStorage.getItem("inHTML"));
		aLi[i].children[0].children[1].innerHTML=inHTML[i].text; //如果是空 把整个分切为是一个数组
		aLi[i].children[0].className=inHTML[i].imgClass;
	}
};

for( var j = 0; j < aLi.length; j++ ){ //布局转换
	aLi[j].style.position = "absolute";
	aLi[j].style.top = arr[j].top + "px";
}

function fnMove( obj ){
	var aInput  = obj.getElementsByTagName("input");
	var arr=[];
	obj.onmouseover=function(){ //移入显示按钮
		for( var j=0;j<aInput.length;j++ ){
			aInput[j].style.display="block";
		}
	}
	
	obj.onmouseout=function(){ //移除
		for( var j=0;j<aInput.length;j++ ){
			aInput[j].style.display="";
		}			
	}
	
	aInput[0].onclick = function (){//上移
		var parent = this.parentNode; //当前的li	
		var prevNode = prev( parent ); //当前li的上一个兄弟节点
		parent.style.zIndex=2; //移动的在上面
		prevNode.style.zIndex=1;
		if( prevNode ){	
			move(parent,{top:prevNode.offsetTop},500,"elasticOut")	//	elasticOut	easeBoth
			move(prevNode,{top:parent.offsetTop},500,"elasticOut",function(){//offsettop是活的 所有不需要拽回来
				oList.insertBefore( parent, prevNode); //DOM交换真实数据			
				arr=[];
				for( var i=0;i<aLi.length;i++ ){										
					arr.push(JSON.stringify({'text':aLi[i].children[0].children[1].innerHTML,'imgClass':aLi[i].children[0].className})	);
					//解析成数组的字符串 保存文件和背景图片的class								
				}
				localStorage.setItem('inHTML','['+arr+']');			
			})			
		};
	};	
	
	aInput[1].onclick = function (){//下移
		var parent = this.parentNode;//当前的li
		var nextNode = next( parent ); //当前li下面的兄弟节点
		var firstNode = first( oList );//每次点击的时候，重新获取一下oList下的第一个子节点
		parent.style.zIndex=2;
		nextNode.style.zIndex=1;
		if( nextNode ){			
			move(parent,{top:nextNode.offsetTop},500,"easeBoth") //easeBoth backIn
			move(nextNode,{top:parent.offsetTop},500,"easeBoth",function(){
				oList.insertBefore( nextNode,parent ); //DOM交换真实数据
				arr=[];
				for( var i=0;i<aLi.length;i++ ){										
					arr.push(JSON.stringify({'text':aLi[i].children[0].children[1].innerHTML,'imgClass':aLi[i].children[0].className})	);
					//解析成数组的字符串 保存文件和背景图片的class								
				}
				localStorage.setItem('inHTML','['+arr+']'); //外面需要加一个中括号才能保存为数组				
			});
		};	
	};	
};