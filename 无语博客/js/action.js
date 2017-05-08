$(document).ready(function(){
	var s=document.location;
	$(".nav a").each(function(){
	if(this.href==s.toString().split("#")[0]){$(this).addClass("action");return false;}
	});
	});