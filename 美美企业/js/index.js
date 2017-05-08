(function(){
	$(".XiaoMain ul li").hover(function(){
		$(this).find("img").stop().animate({marginTop:"-168px"})
	},function(){
		$(this).find("img").stop().animate({marginTop:"0"})
	})
	
	$("#botton-scroll ul li").each(function(y){
		$(this).hover(function(){
			$("#botton-scroll ul li").find(".Txt").stop(true,true).animate({top:-334},400,'easeOutElastic');
			$("#botton-scroll ul li").find(".Txt").eq(y).stop(true,true).animate({top:0},400,'easeOutElastic');
		},function(){
			$("#botton-scroll ul li").find(".Txt").stop(true,true).animate({top:-334},400,'easeOutElastic');
		})
	})
	
	$(".MeassageCont table tr").each(function(y){
			$(this).hover(function(){
				$(".MeassageCont table tr").find("th span").removeClass("cur");
				$(".MeassageCont table tr").find("th span").eq(y).addClass("cur");
			},function(){
			
			})
		})


	$('.Input').focus(function(){
			  if($(this).val() ==this.defaultValue){  
                $(this).val("");           
			  } 
		}).blur(function(){
			 if ($(this).val() == '') {
              $(this).val(this.defaultValue);
           }
	})
		
})()
