/* 网点详细js */

var map;//百度地图
var myDis;//地图测距离
var viemport;//地图视图

$(document).ready(function(){
	networkDetailMap($.parseJSON($("#netWorkDetailJson").val()));

	if(!Modernizr.input.placeholder){
		$("#input-network-query").focus(function() {
		  var input = $(this);
		  if (input.val() == input.attr('placeholder')) {
			input.val('');
			input.removeClass('placeholder');
		  }
		}).blur(function() {
		  var input = $(this);
		  if (input.val() == '' || input.val() == input.attr('placeholder')) {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		  }
		}).val('').blur();
	}
});

function gotoChaxun(){
	var type = $("#kuaidiCom").val();
	var postid = $("#input-network-query").val();
	if(isNumberLetterFuhao(postid)){
		window.open("http://www.yicha138.com/chaxun?com=" + type + "&nu=" + postid);
	}else{
		alert("请输入正确的单号。");
	}
}


function isNumberLetterFuhao( ss ){//判断是否是数字或字母
  var regu="^[0-9a-zA-Z\@\#\$\]+$";
  var re=new RegExp(regu);
  if (re.test(ss)){
	return true;
  }else{
	return false;
  }
}

/*显示网点地图*/
function networkDetailMap(netWorkDetail){
	if($.trim(netWorkDetail.latitude)==""||$.trim(netWorkDetail.longitude)==""){
		$("#baidumap").hide();
		return;
	}else{
		$("#baidumap").show();
	}
	var center=new BMap.Point(netWorkDetail.longitude,netWorkDetail.latitude);
	var zoom=15;
	if(center.equals(new BMap.Point(0,0))){
		$("#baidumap").hide();
		return;
		/*center=new BMap.Point(110.08452,32.542193);
		zoom=4;*/
	}else{
		$("#baidumap").show();
	}
	map = new BMap.Map("baidumap");//初始化
	map.centerAndZoom(center,zoom);
	map.addControl(new BMap.NavigationControl());  //添加鱼骨
	map.enableScrollWheelZoom();//滚轮缩放
	myDis = new BMap.DistanceTool(map);//测距离

	if(netWorkDetail.latitude==0&&netWorkDetail.longitude==0){
		addDisControl();
		return;
	}
	var label=new BMap.Label("");
	label.setPoint(center);
	label.setStyle({position:"absolute",border:"none",background:"none",zIndex:"1"});
	var ct="<div style='float: left; white-space: nowrap; height: 28px;'>"
			+"<span style=\"height: 28px; width: 10px; background: url('images/m.png') no-repeat scroll left -269px transparent; display: inline-block; vertical-align: middle;\"></span>"
			+"<span style=\"display: inline-block; font-size: 12px; color: rgb(255, 255, 255); height: 28px; background: url('images/m.png') no-repeat scroll right -269px transparent; padding: 0pt 10px 0pt 0pt; line-height: 18px; vertical-align: middle;\">"+netWorkDetail.companyName+netWorkDetail.name+"</span></div>";
	label.setContent(ct);
	label.setOffset(new BMap.Size(-3,-28));
	var opts = {
			  width : 200,     // 信息窗口宽度
			  //height: 60,     // 信息窗口高度
			  title :"<div style='font-weight:bold;'>"+netWorkDetail.companyName+"</div>"  // 信息窗口标题
			}
	label.infoWindow=new BMap.InfoWindow("<div><a href='networkDt"+netWorkDetail.id+".htm'>"+netWorkDetail.name+"</a></div><div>"+netWorkDetail.address+"</div><div>"+netWorkDetail.tel+"</div>", opts);//创建信息窗口
	//label.setTitle("滑鼠或点击可放大");
	label.addEventListener("click",markClick);
	map.addOverlay(label);
	map.openInfoWindow(label.infoWindow,center);

	addDisControl();

	function markClick(e){
		map.openInfoWindow(e.target.infoWindow,e.target.point);
	}

	function addDisControl(){
		// 定义一个控件类,即function
		function DisControl(){
		  // 默认停靠位置和偏移量
		  this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
		  this.defaultOffset = new BMap.Size(10, 10);
		}
		// 通过JavaScript的prototype属性继承于BMap.Control
		DisControl.prototype = new BMap.Control();
		// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
		// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
		DisControl.prototype.initialize = function(map){
		  // 创建一个DOM元素
		  var btn = document.createElement("input");
		  // 添加文字说明
		  btn.type="button";
		  btn.id="disBtn";
		  btn.value="开启测量距离";
		  btn.style.width="85px";
		  btn.onclick = function(e){
			  if(this.value=="开启测量距离"){
				  myDis.open();
				  this.value="关闭测量距离";
			  }else{
				  myDis.close();
				  this.value="开启测量距离";
			  }
		  };
		  btn.onfocus=function(e){this.blur();};
		  // 添加DOM元素到地图中
		  map.getContainer().appendChild(btn);
		  // 将DOM元素返回
		  return btn;
		};
		// 创建控件
		var disCtrl = new DisControl();
		// 添加到地图当中
		map.addControl(disCtrl);

		map.addEventListener("rightclick",function(){
			$("#disBtn").val("开启测量距离");
		});
	}

}


/*点击 马上注册快递100网点*/
function toMobileReg(my){
     //先取值
  var onlyGetCompanyName=$("#onlyGetCompanyName").html();   //快递公司名称 例如 龙邦物流
  var onlyGetName=delHtmlTag($("#onlyGetName").html());             //网点具体地址  如 赛格
  var onlyGetCompanyNumber=$("#onlyGetCompanyNumber").text();   //  例如： longbangwuliu
  var onlyGetId=$("#onlyGetId").text();    //页面id
  var onlyGetTel=$("#onlyGetTel").html();    //联系电话

	var dianName=encodeURIComponent(onlyGetCompanyName)+"&"+encodeURIComponent(onlyGetName)+"&"+onlyGetCompanyNumber+"&"+onlyGetId;   //依次为 快递公司名称+ 网点具体地址+ 快递公司code + 页面id

    var resultMobileArr=new Array();    //定义一个新数组
   	var reg = /1[0-9]{10}/g;
	while( reg.exec(onlyGetTel) != null ){		// 执行匹配操作，如果找到匹配则继续找下     从字符串中取得手机号
		resultMobileArr.push( RegExp.lastMatch );                 //构建数组
	}
    resultMobileArr=uniq(resultMobileArr);          //数组去重

	if ( reg.exec(onlyGetTel) == null ){
        gToHttp="/claim/noMobile.html?"+dianName;      //没手机号，去没手机号注册页面
	}

	var otherStrMobile=resultMobileArr.join("-");   //变成字符串
	if (resultMobileArr.length==1){      //如果只有一个手机号
        gToHttp="/claim/oneMobile.html?"+otherStrMobile+"&"+dianName;
	}else if (resultMobileArr.length > 1){
	   gToHttp="/claim/moreMobile.html?"+otherStrMobile+"&"+dianName;  //如果有多个手机号
	}
	$(my).attr("href",gToHttp);
    //window.open(gToHttp,'target');
 }



 /*过滤掉html标签*/
function delHtmlTag (resu01){
          var resu01=resu01.replace (/<\/?[^>]*>/gim, "");//去掉所有的html标签
         var resu02=resu01.replace(/(\s*)|(\s*$)/g, "");//去掉前后空格
         var resu03=resu02.replace(/\s/g, "");//去除文章中间空格
 	 return resu03;
}

/*数组去重*/
function uniq(arr) {
var a = [], o = {}, i, v, len = arr.length;
    if (len < 2) {
        return arr;
    }
    for (i = 0; i < len; i++) {
        v = arr[i];
        if (o[v] !== 1) {
            a.push(v);
            o[v] = 1;
        }
    }
    return a;
}
