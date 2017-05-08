var zbp = new ZBP({
	bloghost: "http://www.wuyublog.com/",
	ajaxurl: "http://www.wuyublog.com/zb_system/cmd.php?act=ajax&src=",
	cookiepath: "/",
	lang: {
		error: {
			72: "名称不能为空或格式不正确",
			29: "邮箱格式不正确，可能过长或为空",
			46: "评论内容不能为空或过长"
		}
	}
});

var bloghost = zbp.options.bloghost;
var cookiespath = zbp.options.cookiepath;
var ajaxurl = zbp.options.ajaxurl;
var lang_comment_name_error = zbp.options.lang.error[72];
var lang_comment_email_error = zbp.options.lang.error[29];
var lang_comment_content_error = zbp.options.lang.error[46];

$(function () {

	zbp.cookie.set("timezone", (new Date().getTimezoneOffset()/60)*(-1));
	var $cpLogin = $(".cp-login").find("a");
	var $cpVrs = $(".cp-vrs").find("a");
	var $addinfo = zbp.cookie.get("addinfo");
	if (!$addinfo){
		zbp.userinfo.output();
		return ;
	}
	$addinfo = JSON.parse($addinfo);

	if ($addinfo.chkadmin){
		$(".cp-hello").html("欢迎 " + $addinfo.useralias + " (" + $addinfo.levelname  + ")");
		if ($cpLogin.length == 1 && $cpLogin.html().indexOf("[") > -1) {
			$cpLogin.html("[后台管理]");
		} else {
			$cpLogin.html("后台管理");
		}
	}

	if($addinfo.chkarticle){
		if ($cpLogin.length == 1 && $cpVrs.html().indexOf("[") > -1) {
			$cpVrs.html("[新建文章]");
		} else {
			$cpVrs.html("新建文章");
		}
		$cpVrs.attr("href", zbp.options.bloghost + "zb_system/cmd.php?act=ArticleEdt");
	}

});

document.writeln("<script src='http://www.wuyublog.com/zb_users/plugin/UEditor/third-party/prism/prism.js' type='text/javascript'></script><link rel='stylesheet' type='text/css' href='css/prism.css'/>");$(function(){var compatibility={as3:"actionscript","c#":"csharp",delphi:"pascal",html:"markup",xml:"markup",vb:"basic",js:"javascript",plain:"markdown",pl:"perl",ps:"powershell"};if(document.querySelectorAll){var runFunction=function(doms,callback){for(var i=0;i<doms.length;i++){var preDom=doms.item(i);var codeDom=document.createElement("code");if(callback)callback(preDom);codeDom.innerHTML=preDom.innerHTML;codeDom.className="language-"+function(classObject){if(classObject===null)return"markdown";var className=classObject[1];return compatibility[className]?compatibility[className]:className}(preDom.className.match(/prism-language-([0-9a-zA-Z]+)/))+" prism-line-numbers";preDom.innerHTML="";preDom.appendChild(codeDom)}};runFunction(document.querySelectorAll("pre.prism-highlight"));runFunction(document.querySelectorAll('pre[class*="brush:"]'),function(preDom){var original;if((original=preDom.className.match(/brush:([a-zA-Z0-9\#]+);/))!==null){preDom.className="prism-highlight prism-language-"+original[1]}})}});
