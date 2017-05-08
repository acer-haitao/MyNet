var oProgress=document.getElementById("uploadBorder");
var fileBtnBox=document.getElementById("fileBtn");
var fileBtn=fileBtnBox.getElementsByTagName("input")[0];
fileBtn.onmousedown=function(){ fileBtnBox.style.background="orange"; } //背景
fileBtn.onmouseup=function(){ fileBtnBox.style.background=""; }
fileBtn.onchange=function(){ upload(); }

function upload(){	
	var s = fileBtn.value;
	if( !s ) return;
	var re=/[\u4e00-\u9fa5]/
	if( re.test(fileBtn.files[0].name) ){
		alert("上传的文件名不能包含中文~~~~(>_<)~~~~");
		return;		
	};
	oProgress.style.display="block";
	var xhr=null;
	if( window.XMLHttpRequest ){ //第一步建立对象
		xhr=new XMLHttpRequest();  //标准下创建ajax对象的方法	
	}else{
		xhr=new ActiveXObject("Microsoft.XMLHTTP") //兼容IE低版本	
	}
	
	xhr.onreadystatechange=function(){ //第四五步监控状态及回调
		if( xhr.readyState===4 ){
			if(xhr.status===200){			
				//console.log(xhr.responseText)					
				var Text=JSON.parse(xhr.responseText) //因为返回的是json数据 所以要解析
				oProgress.children[0].innerHTML=Text.msg;				
				oProgress.children[0].style.letterSpacing=0;				
				/*创建文件缩略图*///url: "../uploads/2015-05-06.zip" url: "../uploads/xmall.jpg"
				var type=Text.url.split(".").pop().toLowerCase(); //获取后缀
				var name=Text.url.split("/").pop();  //获取名字					
				switch(type){
					case 'jpg':case 'jpeg':case 'png':case 'gif':
					newItem('background:url(baidu/'+Text.url+') center no-repeat;background-size:cover;',name)
					break;		
					case 'zip':
					newItem('background: url(./imgs/property_icon.png) -155px 0 no-repeat;',name);
					break;
					case 'rar':
					newItem('background: url(./imgs/property_icon.png) -2145px 0 no-repeat;',name);
					break;
					case 'mp3':
					newItem('background: url(./imgs/property_icon.png) -1840px 0 no-repeat;',name);
					break;
					case 'mp4':
					newItem('background: url(./imgs/property_icon.png) -1685px 0 no-repeat;',name);
					break;
					case 'rmvb':
					newItem('background: url(./imgs/property_icon.png) -1685px 0 no-repeat;',name);
					break;
					case 'doc':
					newItem('background: url(./imgs/property_icon.png) -460px 0 no-repeat;',name);
					break;
					case 'txt':
					newItem('background: url(./imgs/property_icon.png) -1070px 0 no-repeat;',name);
					break;
					case 'exe':
					newItem('background: url(./imgs/property_icon.png) -1380px 0 no-repeat;',name);
					break;
					default:
					newItem('background: url(./imgs/property_icon.png) no-repeat;',name);
				}
				lee.operateFolder(); //重新统计
				setTimeout(function(){	//两秒后隐藏 并把其他参数还原初始状态
					oProgress.style.display="none";					
					oProgress.children[0].innerHTML="";
					oProgress.children[0].style.letterSpacing="-1em";						
					oProgress.children[0].style.width=0;
					oProgress.children[1].style.left=0;
				},1500);										
			}else{
				alert("状态码："+xhr.readyState+"；"+"服务器返回码"+xhr.status);					
				oProgress.style.display="none";					
				oProgress.children[0].innerHTML="";
				oProgress.children[0].style.letterSpacing="-1em";						
				oProgress.children[0].style.width=0;
				oProgress.children[1].style.left=0;				
			}
		}	
	}
	
	xhr.upload.onprogress=function(ev){ //监控上传进度 IE9以下不支持
		var e=ev||event
		var scale=Math.round(e.loaded/e.total*100);			
		oProgress.children[0].style.width=scale+'%'; //背景
		oProgress.children[1].innerHTML=scale+'%'; //百分比
		oProgress.children[1].style.left=scale+'%';	//文字跟随背景动
	}
	xhr.open('post','./php/post_file.php',true) //建立数据连接
	var fd=new FormData(); //建立上传数据对象
	fd.append('file',fileBtn.files[0]) //添加上传的数据 'file'是后台接口
	xhr.send(fd);//发送请求
}

function newItem(bg,name){ //不放到外面火狐报错
	var NewDiv=document.createElement("div"); //item	
	NewDiv.className="item";
	NewDiv.innerHTML='<div style="'+bg+'" class="thumb thumb-large"><span class="item-chk"></span></div><div class="file-name"><a href="javascript:;">'+name+'</a></div>';
	oFileContWrap.insertBefore(NewDiv,oFileContWrap.children[0]);
	
	aNewDiv.push(NewDiv.innerHTML);
	localStorage.setItem('newItem',aNewDiv); //写入本地存储	
}