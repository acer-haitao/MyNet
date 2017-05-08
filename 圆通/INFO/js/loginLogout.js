/**
 * 登录注销js
 * cookie中loginAccount为当前登录帐号，loginStatus为登录状态
 */
 
var logoutDone = 0;

isAutoLogin();

function isAutoLogin(){//自动登录
	var loginAccount = getcookie("loginAccount");
	var loginStatus = getcookie("loginStatus");
	var loginSession = getcookie("loginSession");

	if(loginStatus == "1" && loginSession == "1"){ //已登录
		$("#loginAccount").val(loginAccount);
		$("#loginStatus").val("1");
		setWelcomeLogin(loginAccount);
		//setUncheckTips();
		if($.isFunction(window.logged)){
		  logged();
		}
	}else if(loginStatus == "1"){
		login();
	}else{
		deleteCookie("loginAccount");
		deleteCookie("loginStatus");
		deleteCookie("loginSession");
		deleteCookie("password");
		deleteCookie("ischeck");
		deleteCookie("phone");
		deleteCookie("ftype");
		setWelcomeLogout();
		setTopCookieTips();
		$("#loginAccount").val("");
		$("#loginStatus").val("0");
		if($.isFunction(window.unLogged)){
			unLogged();
		}
	}
}

function login(){//登录操作
	var account = getcookie("loginAccount");
	var password = getcookie("password");
	password = rc4(password, "yicha138");
	
	if(account && account != "" && password && password != ""){ //有帐号有密码
		$("#welcome").html("<img src=\"http://www.yicha138.com/images/ajax-loader.gif\" />正在自动登陆");
		$.ajax({
			type:"post",
			url:"/user/login",
			data:"account=" + account + "&password=" + password,
			success:function(responseText){
				var resultJson = eval("(" + responseText + ")");
				var account = resultJson.account;
				if(resultJson.status == "200"){ //登录成功
					if(resultJson.ischeck=="1"){//手机验证状态
					  setcookie("ischeck","1");
					  setcookie("phone",resultJson.telephone);
					}else{
					  deleteCookie("ischeck");
					}
					setWelcomeLogin(resultJson.account);
					//setUncheckTips();
					$("#loginAccount").val(account);
					$("#loginStatus").val("1");
					setcookie2("loginSession","1");
					
					if($.isFunction(window.logged)){
						logged();
					}
				}else if(resultJson.status == "302"){
					window.location.href = resultJson.url;
				}else if(resultJson.status == "410"){//个性域名不存在，跳转到登录状态。
					deleteCookie("loginAccount");
					deleteCookie("loginStatus");
					deleteCookie("loginSession");
					deleteCookie("password");
					deleteCookie("ischeck");
					deleteCookie("phone");
					deleteCookie("ftype");
					location.href="/user/login.html";
				}else{ //登录失败
					deleteCookie("loginAccount");
					deleteCookie("loginStatus");
					deleteCookie("loginSession");
					deleteCookie("password");
					deleteCookie("ischeck");
					deleteCookie("phone");
					deleteCookie("ftype");
					setWelcomeLogout();
					setTopCookieTips();
					$("#loginAccount").val("");
					$("#loginStatus").val("0");
					if($.isFunction(window.unLogged)){
						unLogged();
					}
				}
			}
		});
	}else{ //无帐号显示登录
		setWelcomeLogout();
		setTopCookieTips();
		$("#loginAccount").val("");
		$("#loginStatus").val("0");
		if($.isFunction(window.unLogged)){
			unLogged();
		}
	}
}

function logout(){//注销 
  var outAccount = getcookie("loginAccount");
  if(outAccount && outAccount != ""){ //有登录
	var logoutUrl = "/user/logout";
	var sendData = "account=" + escape(outAccount);
	try{
		$.post(logoutUrl,{outAccount: outAccount},
		function(responseText){
			var resultJson = eval("(" + responseText + ")");
			if(resultJson.status == "200" || resultJson.status == "420"){ //注销成功(或未登录)，注销时把记住我账号销毁
				deleteCookie("loginAccount");
				deleteCookie("loginStatus");
				deleteCookie("loginSession");
				deleteCookie("password");
				deleteCookie("phone");
				deleteCookie("ischeck");
				deleteCookie("ftype");
				logoutDone = 0;
				doPost("http://www.yicha138.com/user/logout?temp=" + Math.random());
			}
		});
	}catch(e){
		window.location.replace(location.href);
	}
  }
}

function logoutFinish(){
	logoutDone ++;
	if(logoutDone >= 5){
		window.location.reload();
	}
}

function doPost(url){			
	var frame = $("<iframe width=\"0\" height=\"0\" frameborder=\"0\" scrolling=\"0\"></iframe>");
	frame.appendTo('body');  
	frame.attr("src", url);
	frame.load(logoutFinish);
}

function rc4(data, key){
	var seq = Array(256);
	var das = Array(data.length);
	var j = 0;
	for (var i=0; i<256; i++){
		seq[i] = i;
	}
	for (var i=0; i<256; i++){
		j=(j+seq[i]+key.charCodeAt(i % key.length)) % 256;
		var temp = seq[i];
		seq[i] = seq[j];
		seq[j] = temp;
	}
	for(var i=0; i<data.length; i++){
	   das[i] = data.charCodeAt(i);
	}
	var i = 0, j = 0;
	for(var x = 0; x < das.length; x++){
		i = (i+1) % 256;
		j = (j+seq[i]) % 256;
		var temp = seq[i];
		seq[i] = seq[j];
		seq[j] = temp;
		var k = (seq[i] + seq[j]) % 256;
		das[x] = String.fromCharCode( das[x] ^ seq[k]);
	}
	return das.join('');
}
