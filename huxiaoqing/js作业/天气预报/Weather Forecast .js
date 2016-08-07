window.onload = function () {
	WeForecast();
}

	function WeForecast() {
		var oTime = document.getElementById('time');
		var oDate = document.getElementById('date');
		var oUl = document.getElementById('content_right');
		var aDay1 = oUl.getElementsByClassName('day');
		var aTemp = oUl.getElementsByClassName('temp');
		var aWeather = oUl.getElementsByClassName('weather');

		var oBottom = document.getElementById('bottom');
		var aDay2 = oBottom.getElementsByClassName('day');
		var aWind = oBottom.getElementsByClassName('wind');
		var aHum = oBottom.getElementsByClassName('hum');
		var aMin = oBottom.getElementsByClassName('min');
		var aMax = oBottom.getElementsByClassName('max');

		//获取时间、日期
		function fnTime () {

			var myTime = new Date();

			var iYear = myTime.getFullYear();
			var iMonth = myTime.getMonth()+1;
			var iDate = myTime.getDate();
			var iWeek = myTime.getDay();
			var iHours = myTime.getHours();
			var iMin = myTime.getMinutes();
			var str1 = '';
			var str2 = '';

			switch(iWeek) {
				
				case 0:
					iWeek = 'Sun';
					break;
				case 1:
					iWeek = 'Mon';
					break;
				case 2:
					iWeek = 'Tuse';
					break;
				case 3:
					iWeek = 'Wen';
					break;
				case 4:
					iWeek = 'Thur';
					break;
				case 5:
					iWeek = 'Fri';
					break;
				case 6:
					iWeek = 'Sar';
			}
			
			function toTwo(n) {
						return n < 10 ? '0' + n : '' + n;
			}

			str1 = toTwo(iHours)+' : ' + toTwo(iMin) ;
			str2 = iYear + ' . ' + iMonth + '.' + iDate + ' . ' + iWeek;

			oTime.innerHTML = str1;
			oDate.innerHTML = str2;

		}

		setInterval(fnTime,1000);
			fnTime (); 

		//调用ajax函数
		ajax ('http://openweathermap.org/data/2.5/forecast/%20daily?id=1814906&appid=b1b15e88fa797225412429c1c50c122a',fnSucc,function() {
			return undefined;
		});
		//获取温度
			function fnSucc(str) {
				var data = JSON.parse(str);
				var forecast = data.list;


				for(var i=0; i<aDay1.length; i++) {
					aTemp[i].innerHTML=forecast[i].main.temp+'℃';
					aWeather[i].innerHTML=forecast[i].weather[0].description;
				}
				

				var timer1 = null;
				var timer2 = null;
				var timer3 = null;
				// var timer4 = null;
				// var timer5 = null;
				// var timer6 = null;
				var iSpeed = -3;

				oUl.innerHTML += oUl.innerHTML;
				aTemp[5].innerHTML=forecast[0].main.temp+'℃';

				oUl.style.width= aDay1[0].offsetWidth*aDay1.length+'px';
				function show1 () {
					oUl.style.left = oUl.offsetLeft+iSpeed +'px';

					if (oUl.offsetLeft < -oUl.offsetWidth/2) {
						oUl.style.left='0';
					}
				}
				timer1=setInterval(show1,30);
				function stop1() {
					clearInterval(timer1);
				}
				function start1() {
					timer1=setInterval(show1,30);
				}

				stop1();
				timer2=setInterval(stop1,3030);
				timer3=setInterval(start1, 6060);
				

				for(var i=0; i<aDay2.length; i++)
					aWind[i].innerHTML=forecast[i].wind.speed;console.log(forecast[i].main.humidity);
					aHum[i].innerHTML=forecast[i].main.humidity;
					aMin[i].innerHTML=forecast[i].main.temp_min+'℃';
					aMax[i].innerHTML=forecast[i].main.temp_max+'℃';
				}

				var timer4 = null;
				var timer5 = null;
				var timer6 = null;
				var iSpeed = -100;

				oBottom.innerHTML += oBottom.innerHTML;
				aWind[5].innerHTML=forecast[0].wind.speed;console.log(forecast[i].main.humidity);
				aHum[5].innerHTML=forecast[0].main.humidity;
				aMin[5].innerHTML=forecast[0].main.temp_min+'℃';
				aMax[5].innerHTML=forecast[0].main.temp_max+'℃';

				oBottom.style.width = aDay2[0].offsetWidth*aDay2.length+ 'px';console.log(oBottom.style.width);
				function show2 () {
					oBottom.style.left = oBottom.offsetLeft+iSpeed+'px';
					console.log(oBottom.style.left);

					if (oBottom.offsetLeft < -oBottom.offsetWidth/2) {
						oBottom.style.left='0';
					}
					else if(oBottom.offsetLeft > 0){
						oBottom.style.left=-oBottom.offsetWidth/2 + 'px';
					}
				}
				// timer4=setInterval(show2,30);console.log(timer4);
				// function stop2() {
				// 	clearInterval(timer4);
				// }
				// function start2() {
				// 	timer4=setInterval(show2,30);
				// }

				// stop2();
				// timer5=setInterval(stop2,60);console.log(timer5);
				// timer6=setInterval(start2, 1060);console.log(timer6);

	}




