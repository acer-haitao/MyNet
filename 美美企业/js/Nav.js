(function(){
		var oBoxul = document.getElementById('NavBox');
				var oLi = oBoxul.children;
				var oBg = document.getElementById('NavLine');
				
				for(var i=0;i<oLi.length;i++)
				{
					oLi[i].onmouseover = function(){
						starmove(oBg,this.offsetLeft)
					}
				}
				
		
			var iSpeed = 0;
			var left1 = 0;
			function starmove(obj,target){
				clearInterval(obj.timer);
				obj.timer = setInterval(function(){
					iSpeed += (target-obj.offsetLeft)/5;
					iSpeed *= 0.7;
					left1 += iSpeed;
					if(Math.abs(iSpeed)<1 && Math.abs(target)<1)
					{
						clearInterval(obj.timer);
						obj.style.left = target+'px';
					}else{
						obj.style.left = left1+'px';
					}
				},30)
			}	
	})()	