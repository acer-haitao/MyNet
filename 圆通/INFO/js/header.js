/**
 * header的js
 */

selectNav();
//loadAffiche();

//公告用计时器
var t;

/* 选中页面所属的导航菜单   控制头部选项的函数 */
function selectNav(){
	var headerMenuInput = $("#headerMenu").val();
	if(headerMenuInput != null && headerMenuInput != ""){
		var headerMenuInputArray = headerMenuInput.split(" ");
		if(headerMenuInputArray.length == 2){                    //如果那个input-hidden 中的value值有两个
			var headerMenu = headerMenuInputArray[0];
			var headerSubMenu = headerMenuInputArray[1];
			$(".nav-select").removeClass("nav-select");
			$("#" + headerMenu).addClass("nav-select");
			$("#" + headerSubMenu).addClass("nav-select");
			$("#" + headerMenu + "SubMenu").show();        // 套有二级菜单的 宽为960的div
			if($("#" + headerMenu + "SubMenu .nav-select").length > 0){
				$("#" + headerMenu + "SubMenu").find(".underline").css({width:$("#" + headerMenu + "SubMenu .nav-select").css("width"),left:($("#" + headerMenu + "SubMenu .nav-select").offset().left - $("#" + headerMenu + "SubMenu").offset().left)},"fast");
			}
			$(".sub-nav").show();                                       //  .sub-nav 二级菜单所在的div
		}else if(headerMenuInputArray.length == 1){
			var headerMenu = headerMenuInputArray[0];
			$("#" + headerMenu).addClass("nav-select");
			$(".sub-nav").hide();
		}else{
			$(".sub-nav").hide();
		}
	}else{
		$(".sub-nav").hide();
	}

	$(".sub-nav-box").delegate("a","mouseenter",function(){
		$(this).siblings(".underline").stop().animate({width:$(this).css("width"),left:($(this).offset().left - $(this).parent().offset().left)},"fast");
	}).mouseleave(function(){
		if($(this).find(".nav-select").length > 0){
			$(this).find(".underline").stop().animate({width:$(this).find(".nav-select").css("width"),left:($(this).find(".nav-select").offset().left - $(this).offset().left)},"fast");
		}else{
			$(this).find(".underline").stop().css({width:"0px",left:"0px"});
		}
	});
	
	if(getcookie("hideIndexQr") != 1 && $(window).width() > 1100){
		$("#wxqr").show();
	}
	$("#qrClose").click(function () {
		$("#wxqr").hide();
		setcookie("hideIndexQr", 1);
	});
}

/* 根据是否登录判断我的订单页面链接 */
function orderPageLink(){
	var cookieValue = $("#loginStatus").val();
	var ftype = getcookie("ftype");
	
	if(cookieValue != "1"){//未登录
		location.href="/user/login.html";
	}else if(ftype == "" || ftype == null){
		location.href = "/user/history.html";
	}else if(ftype == "buyer" || ftype == "seller"){
		location.href = "http://" + ftype + ".yicha138.com/index.html";
	}else{
		location.href = "http://" + ftype + ".yicha138.com/index.html";
	}
}

function setWelcomeLogin(account){
	var ftype = getcookie("ftype");
	$("#welcome").html("[&nbsp;<span class=\"login\"><a href=\"http://" + ftype + ".yicha138.com/setinfo.html\">" + account + "</a></span>&nbsp;|&nbsp;<a href=\"/user/\" onclick=\"logout();return false;\" class=\"logout\">退出</a>&nbsp;]");
}

function setWelcomeLogout(){
	$("#welcome").html("[&nbsp;<a href=\"/user/login.html\">登录</a>&nbsp;|&nbsp;<a href=\"/user/regByTel.html\">注册</a>&nbsp;]");
}

function setTopCookieTips(){
	var jsoncookie=getCookieTojson();
	if(_ToJSON(jsoncookie)!="{}"){
	  var history= jsoncookie["history"];
	  $("#cookieTips").html("<a href=\"/user/login.html?from=banner\">已为您保存&nbsp;" + history.length + "&nbsp;条查询记录，点此查看&gt;&gt;</a>").show();
	  $("#cookieTips2").html("[" + history.length + "]").show();
	}
}

function setUncheckTips(){
	$.ajax({
		type:"post",
		url:"/userquery/query",
		data:"method=querycount&transstatus=1",
		success:function(responseText){
			var resultJson = eval("(" + responseText + ")");
			if(resultJson.status == 200){
				$("#uncheckTips").html("<a href=\"/user/login.html?from=banner\">您还有&nbsp;" + resultJson.totalsize + "&nbsp;个未签收快递</a>");
				$("#uncheckTips2").html("[" + resultJson.totalsize + "]").show();
	  			$("#cookieTips2").html("[" + resultJson.totalsize + "]").show();
				$("#uncheckTips2").parent().mouseenter(function(){$("#uncheckTips").show();}).mouseleave(function(){$("#uncheckTips").hide();});
			}
		}
	});
}

/* 添加到收藏夹 */
function addFavorites(setUrl){
	var title="快递查询-查快递，寄快递，上易查138";
    var url="http://"+document.domain;
	if(setUrl!="" && setUrl!=null){
		url = setUrl
	}

	try{
		window.external.addFavorite(url,title);
	}catch(e1){
		try{
			window.external.AddToFavoritesBar(url,title);
		}catch (e2){
			try{
				window.sidebar.addPanel(title,url);
			}catch (e3){
				alert("收藏失败，此操作被浏览器拒绝！\n请使用\"Ctrl+D\"进行收藏！");
			}
		}
	}
}

function feedbackInit(){
	$('.fb-finish').hide();
	$('.fb-box').hide();
	$('#fb-input2').hide();
	$('#fb-input1').show();
	$('#fb-checkbox').attr('checked',false);
	$("#fb-context").val("");
	$("#fb-error").hide();
}

function submitFeedback(){
	$("#fb-error").hide();
	var context = $("#fb-context").val();
	var fbsender = $("#fb-sender").val();
	var fbchecked = $("#fb-checkbox").attr("checked");
	var isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(fbsender);
	var isQQ = /^[0-9]+$/.test(fbsender);

	if(fbchecked && fbsender == ''){
		$("#fb-error").html("请输入您的邮箱或者QQ。");
		$("#fb-error").show();
		$("#fb-sender").select();
		return false;
	}else if(fbchecked && !(isEmail || isQQ)){
		$("#fb-error").html("请输入正确的邮箱或者QQ。");
		$("#fb-error").show();
		$("#fb-sender").select();
		return false;
	}else if(context == ''){
		$("#fb-error").html("请输入您的建议。");
		$("#fb-error").show();
		$("#fb-context").select();
		return false;
	}else if(context.length < 10){
		$("#fb-error").html("填写的建议请不少于10个字。");
		$("#fb-error").show();
		$("#fb-context").select();
		return false;
	}else{
		context = "#用户体验建议#" + context + "from[" + window.location.href + "]";
		$.ajax({
			type:"POST",
			url:"/Mailsend",
			data:"context=" + encodeURIComponent(encodeURIComponent(context)) + "&sender=" + ((fbchecked&&isEmail)?fbsender:"") + "&fqq=" + ((fbchecked&&isQQ)?fbsender:""),
			success:function(responseText){
				var resultData = eval('(' + responseText + ')');
				if(resultData.status == 200){
					$('.fb-box').hide();
					$('.fb-finish').show();
				}else{
					$("#fb-error").html("提交失败，请刷新后重试。");
					$("#fb-error").show();
				}
			}
		});
	}
}

function gototop(){
	acceleration = 0.3;
	time = 15;
	var x=0,y=0;

	if (document.documentElement) {
	   x = document.documentElement.scrollLeft || 0;
	   y = document.documentElement.scrollTop  || 0;
	}

	var speed = 1 + acceleration;
	window.scrollTo(x, Math.floor(y / speed));
	if(y > 0) {
		var invokeFunction = "gototop()";
		window.setTimeout(invokeFunction, time);
	}
}

function gotobottom(){
	window.scrollTo(document.documentElement.scrollLeft, document.documentElement.scrollHeight);
}

$(function(){
	$(".menu-top").mouseleave(function(){
		$("#moreList").hide();
		$("#weatherList").hide();
		$("#serviceList").hide(); 
		$("#serviceList2").hide();
		$(".menu-top").find(".tab-link").removeClass("link-open");
	});
	$("#serviceList").mouseleave(function(){
		$(this).hide();
		$("#serviceLink").removeClass("link-open");
	}).delegate("a", "click", function(){
		$("#serviceList").hide();
		$("#serviceLink").removeClass("link-open");
	});
	$("#serviceLink").mouseenter(function(){
		$("#moreList").hide();
		$("#serviceList").show(); 
		$("#serviceList2").hide();
		$(".menu-top").find(".tab-link").removeClass("link-open");
		$(this).addClass("link-open");
	});

	$("#serviceList2").mouseleave(function(){
		$(this).hide();
		$("#serviceLink2").removeClass("link-open");
	}).delegate("a", "click", function(){
		$("#serviceList2").hide();
		$("#serviceLink2").removeClass("link-open");
	});
	$("#serviceLink2").mouseenter(function(){
		$("#moreList").hide();
		$("#weatherList").hide();
		$("#serviceList").hide(); 
		$("#serviceList2").show();
		$(".menu-top").find(".tab-link").removeClass("link-open");
		$(this).addClass("link-open");
	});

	$("#moreList").mouseleave(function(){
		$(this).hide();
		$("#moreLink").removeClass("link-open");
	}).delegate("a", "click", function(){
		$("#moreList").hide();
		$("#moreLink").removeClass("link-open");
	});
	$("#moreLink").mouseenter(function(){
		$("#moreList").show();
		$("#weatherList").hide();
		$("#serviceList").hide();
		$("#serviceList2").hide();
		$(".menu-top").find(".tab-link").removeClass("link-open");
		$(this).addClass("link-open");
	});
	
	$("#weatherList").mouseleave(function(){
		$(this).hide();
		$("#weatherLink").removeClass("link-open");
	}).delegate("a", "click", function(){
		$("#weatherList").hide();
		$("#weatherLink").removeClass("link-open");
	});
	$("#weatherLink").mouseenter(function(){
		$("#weatherList").show();
		$("#serviceList").hide(); 
		$("#serviceList2").hide();
		$(".menu-top").find(".tab-link").removeClass("link-open");
		$(this).addClass("link-open");
	});
});

/*获取cookies*/
function getcookie(cookieName) {
  var cookieValue="";if (document.cookie && document.cookie != '') {var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {var cookie = cookies[i].replace(/(^\s*)|(\s*$)/g, "");
  if(cookie.substring(0, cookieName.length + 1) == (cookieName + '=')){cookieValue = unescape(cookie.substring(cookieName.length + 1));break;}}}return cookieValue;
}

//设置永久cookies
function setcookie(cookieName, cookieValue) {
  var expires = new Date();
  var now = parseInt(expires.getTime());
  var et = (86400 - expires.getHours() * 3600 - expires.getMinutes() * 60 - expires.getSeconds());
  expires.setTime(now + 1000000 * (et - expires.getTimezoneOffset() * 60));
  document.cookie = escape(cookieName) + "=" + escape(cookieValue) + ";expires=" + expires.toGMTString() + ";path=/;domain=yicha138.com";
}

//设置临时cookies
function setcookie2(cookieName, cookieValue) {
  document.cookie = escape(cookieName) + "=" + escape(cookieValue) + ";path=/;domain=yicha138.com";
}

function deleteCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getcookie(name);
  document.cookie = escape(name) + "=" + escape(cval) + "; expires=" + exp.toGMTString() + ";path=/;domain=yicha138.com";
}

function getCookieTojson() {
  var tempstr = getcookie('toolbox_urls');
  if (tempstr == null || tempstr == "") {
    return {};
  }
  //alert(_ToJSON(tempstr));
  var jsoncookietemp = eval("(" + _ToJSON(tempstr) + ")");
  return jsoncookietemp;

}

function _ToJSON(o) {
  if (o == null) return "null";
  switch (o.constructor) {
  case String:
    var s = o; // .encodeURI();
    if (s.indexOf("}") < 0) s = '"' + s.replace(/(["\\])/g, '\\$1') + '"';
    s = s.replace(/\n/g, "\\n");
    s = s.replace(/\r/g, "\\r");
    return s;
  case Array:
    var v = [];
    for (var i = 0; i < o.length; i++) v.push(_ToJSON(o[i]));
    if (v.length <= 0) return "\"\"";
    return "" + v.join(",") + "";
  case Number:
    return isFinite(o) ? o.toString() : _ToJSON(null);
  case Boolean:
    return o.toString();
  case Date:
    var d = new Object();
    d.__type = "System.DateTime";
    d.Year = o.getUTCFullYear();
    d.Month = o.getUTCMonth() + 1;
    d.Day = o.getUTCDate();
    d.Hour = o.getUTCHours();
    d.Minute = o.getUTCMinutes();
    d.Second = o.getUTCSeconds();
    d.Millisecond = o.getUTCMilliseconds();
    d.TimezoneOffset = o.getTimezoneOffset();
    return _ToJSON(d);
  default:
    if (o["toJSON"] != null && typeof o["toJSON"] == "function") return o.toJSON();
    if (typeof o == "object") {
      var v = [];
      for (attr in o) {
        if (typeof o[attr] != "function") v.push('"' + attr + '": ' + _ToJSON(o[attr]));
      }
      if (v.length > 0) return "{" + v.join(",") + "}";
      else return "{}";
    }
    //alert(o.toString());
    return o.toString();
  }
};

/*获取参数*/
function GetQueryString(name){
  var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)","i");
  var r=window.location.search.substr(1).match(reg);
  if(r!=null) return unescape(r[2]);return null;
}


/*配置广告图片*/
function AdBlockNetList(){
	$("#adPic img").attr("src", "http://cdn.yicha138.com/images/adm/68d92909gw1edvs2d1gqeg208c06ytbn.gif");// 300X250
	$("#adPic").attr("href", "http://s.click.taobao.com/t?e=m%3D2%26s%3DC8ZCvnnChSgcQipKwQzePCperVdZeJvipRe%2F8jaAHci5VBFTL4hn2Yw37%2Fzphwewc4zWPc6e822oxELBv1EI3ii1tegJbg%2B6eIg5EjiRTzYhCKoxjSkdP70CYBEjBf0rLxRPKN2FDAck%2FCKKDVvEs8YMXU3NNCg%2F").show();
}
function AdBlockFrame(){
	$("#adPic img").attr("src", "http://cdn.yicha138.com/images/adm/68d92909gw1edxracd99tg20d001ogly.gif"); // 468X60
	$("#adPic").attr("href", "http://s.click.taobao.com/t?e=m%3D2%26s%3DC8ZCvnnChSgcQipKwQzePCperVdZeJvipRe%2F8jaAHci5VBFTL4hn2Yw37%2Fzphwewc4zWPc6e822oxELBv1EI3ii1tegJbg%2B6eIg5EjiRTzYhCKoxjSkdP70CYBEjBf0rLxRPKN2FDAck%2FCKKDVvEs8YMXU3NNCg%2F").show();
}
function AdBlock(){
	$("#adPic img").attr("src", "http://cdn.yicha138.com/images/adm/68d92909gw1edwswp7s7dg20g406y0wj.gif"); // 580PX
	$("#adPic").attr("href", "http://s.click.taobao.com/t?e=m%3D2%26s%3DC8ZCvnnChSgcQipKwQzePCperVdZeJvipRe%2F8jaAHci5VBFTL4hn2Yw37%2Fzphwewc4zWPc6e822oxELBv1EI3ii1tegJbg%2B6eIg5EjiRTzYhCKoxjSkdP70CYBEjBf0rLxRPKN2FDAck%2FCKKDVvEs8YMXU3NNCg%2F").show();
}
function AdBlockALL(){
	$("#adOther").hide();
	$("#adPic img").attr("src", "http://cdn.yicha138.com/images/adm/68d92909gw1edwt43xu3og20gy06yjuf.gif"); //610PX
	$("#adPic").attr("href", "http://s.click.taobao.com/t?e=m%3D2%26s%3DC8ZCvnnChSgcQipKwQzePCperVdZeJvipRe%2F8jaAHci5VBFTL4hn2Yw37%2Fzphwewc4zWPc6e822oxELBv1EI3ii1tegJbg%2B6eIg5EjiRTzYhCKoxjSkdP70CYBEjBf0rLxRPKN2FDAck%2FCKKDVvEs8YMXU3NNCg%2F").show();
}
function AdBlockNet(){
	$("#adPic-right").show();
	$("#adOther").hide();
	$("#adPic img").attr("src", "http://cdn.yicha138.com/images/adm/68d92909gw1edwt43xu3og20gy06yjuf.gif"); // 610PX
	$("#adPic").attr("href", "http://s.click.taobao.com/t?e=m%3D2%26s%3DC8ZCvnnChSgcQipKwQzePCperVdZeJvipRe%2F8jaAHci5VBFTL4hn2Yw37%2Fzphwewc4zWPc6e822oxELBv1EI3ii1tegJbg%2B6eIg5EjiRTzYhCKoxjSkdP70CYBEjBf0rLxRPKN2FDAck%2FCKKDVvEs8YMXU3NNCg%2F").show();
	$("#adPic-right img").attr("src", "http://cdn.yicha138.com/images/adm/68d92909gw1edvs2d1gqeg208c06ytbn.gif"); // 300x250
	$("#adPic-right").attr("href", "http://s.click.taobao.com/t?e=m%3D2%26s%3DC8ZCvnnChSgcQipKwQzePCperVdZeJvipRe%2F8jaAHci5VBFTL4hn2Yw37%2Fzphwewc4zWPc6e822oxELBv1EI3ii1tegJbg%2B6eIg5EjiRTzYhCKoxjSkdP70CYBEjBf0rLxRPKN2FDAck%2FCKKDVvEs8YMXU3NNCg%2F").show();
}
function AdBlockNetMap(){
	$("#adPic img").attr("src", "http://cdn.yicha138.com/images/adm/68d92909gw1edwrrevtqjg20qe02iaa1.gif"); // 950X90
	$("#adPic").attr("href", "http://s.click.taobao.com/t?e=m%3D2%26s%3DC8ZCvnnChSgcQipKwQzePCperVdZeJvipRe%2F8jaAHci5VBFTL4hn2Yw37%2Fzphwewc4zWPc6e822oxELBv1EI3ii1tegJbg%2B6eIg5EjiRTzYhCKoxjSkdP70CYBEjBf0rLxRPKN2FDAck%2FCKKDVvEs8YMXU3NNCg%2F").show();
}