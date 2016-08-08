function toDouble (num){
			if(num<10){
				return '0'+num;
			}
			else {
				return ''+num;
			}
		};
		window.onload=function ()
		{
			var aBtn=document.getElementById('btn');
			var aImag=document.getElementsByTagName('img');
			var i=0;
			
			function updateTime () {
				
				var oDate=new Date();
				var str=toDouble(oDate.getHours())+toDouble(oDate.getMinutes())+toDouble(oDate.getSeconds());
				
				for(i<0; i<aImag.length; i++){
					aImag[i].src='image/'+str.charAt(i)+'.png';
				}
				
			};
			setInterval(updateTime, 1000);
			updateTime();
		};