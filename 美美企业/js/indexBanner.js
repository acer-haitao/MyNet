(function(){
	$(".XiaoMain ul li").hover(function(){
		$(this).find("img").stop().animate({marginTop:"-168px"})
	},function(){
		$(this).find("img").stop().animate({marginTop:"0"})
	})
	$("#arrowButton span img").first().animate({marginTop:'-23px'})
	$(function(){
				var oDiv = $("#Banner div");
				var oImgLen = oDiv.length;/*图片个数*/
				var oImgWidth = oDiv.width();/*图片宽度*/
				var SpanBtn = $("#arrowButton span img");/*每一个小按钮*/
				$("#Banner").css({width:oImgLen*oImgWidth});/*设置容器宽度*/
				var num = 0;
				var n2 = 0;
				var timer = null;
				var timer2 = null;
				var offon = true;
				$('.prevArrow').stop().animate({opacity:0});
				/*往下点击*/
				$('.nextArrow').click(function(){
					clearInterval(timer);
					num++;
					if(num>oImgLen-1)
					{
						num = oImgLen-1;
					}
					$("#arrowButton span img").stop(true,true).animate({marginTop:"-23px"});
					StyleM()
					IconNum(num);
				});
				
				
				/*往上点击*/
				$(".prevArrow").click(function(){
					clearInterval(timer);
					num--;
					if(num<0)
					{
						num = 0;
					}
					StyleM()
					IconNum(num);
				})
				/*循环每个小按钮*/
				SpanBtn.each(function(t,elem){
					clearInterval(timer)
					$(this).click(function(){
						num = t;
						IconNum(t);/*改变当前小按钮值*/
						n2 = t;
					})
				})
				
				$("#arrowButton").hover(function(){
						clearInterval(timer);
						
					},function(){
						clearInterval(timer)
						timer=setInterval(function(){
							Paly();
						},3000)
				})
				/*第一张banner图片效果*/
				IconNum(num)
				/*封装当前小按钮*/
				function IconNum(){
					/*改变当前小按钮*/
					$("#arrowButton span img").stop(true,true).animate({marginTop:"0"})
					SpanBtn.eq(num).stop(true,true).animate({marginTop:"-23px"});
					/*左右箭头显示与消失*/
					if(num == $("#arrowButton span img").length-1){
						$('.nextArrow').stop(true,true).css({opacity:0.5,cursor:'auto'});
					}else{
						$('.nextArrow').stop(true,true).css({opacity:1,cursor:'pointer'});
					}	
					if(num == 0)
					{
						$('.prevArrow').stop(true,true).css({opacity:0.5,cursor:'auto'});
					}else{
						$('.prevArrow').stop(true,true).css({opacity:1,cursor:'pointer'});
					}
					StyleM()
					/*图片运动*/	
					if(num == 0)
					{
						
						/*第一张banner图片效果*/
						$("#item_1").find('.TitleImg').css({top:139})
						$("#item_1").find('.TitleTxt').css({left:0});
						$("#item_1").find('.ImgBig').css({WebKitTransformOrigin:' right',WebkitTransform:'rotate(-360deg)',top:0,right:0})
					}	
					
					if(num == 1)
					{
						/*第二张banner图片效果*/
						$("#item_2").find('.TitleImg').css({top:139,TransformOrigin:'0 0',WebkitTransform:'rotate(0deg)'});
						$("#item_2").find('.TitleTxt').css({top:150,TransformOrigin:'0 0',WebkitTransform:'rotate(0deg)'})			
						$("#item_2").find('.ImgBig').css({top:0,right:0})
					}
					
					if(num == 2)
					{
						/*第三张banner图片效果*/
						$("#item_3").find('.TitleImg').css({top:139,WebkitTransform:'scale(1)'});
						$("#item_3").find('.TitleTxt').css({left:0,WebkitTransform:'scale(1) rotate(360deg'})			
						$("#item_3").find('.ImgBig').css({top:0,right:0,WebkitTransform:'scale(1.1) rotate(360deg'})						
					}	
					
					
					$("#Banner").stop(true,true).animate({left:-(num*oImgWidth)+'px'})
					
				}
				/*banner默认样式*/
				function StyleM(){
					$("#item_1").find('.TitleImg').css({top:89})
					$("#item_1").find('.TitleTxt').css({left:-50});
					$("#item_1").find('.ImgBig').css({top:-500,right:200})
					
					$("#item_2").find('.TitleImg').css({top:220});
					$("#item_2").find('.TitleTxt').css({top:200})			
					$("#item_2").find('.ImgBig').css({top:-100,right:100})
					
					$("#item_3").find('.TitleImg').css({top:109});
					$("#item_3").find('.TitleTxt').css({left:200})			
					$("#item_3").find('.ImgBig').css({top:-60,right:100})
				}
				
				/*三秒自动轮播*/
				clearInterval(timer);
				timer = setInterval(function(){
					Paly();
				},3000)
				
				function Paly(){
					num++;
					if(num>oImgLen-1)
					{
						num = 0;
					}
					StyleM();
					IconNum(num);
				}
			})
})()
