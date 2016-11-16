var oCity = document.getElementById('city');
var oTime = document.getElementById('time');
var oDay = document.getElementById('oneday');
var aCh = document.getElementsByClassName('change');
var aTemp = document.getElementsByClassName('temp');
var aRain = document.getElementsByClassName('rain');
var aDay = document.getElementsByClassName('day');
var aMin = document.getElementsByClassName('min');
var aMax = document.getElementsByClassName('max');
var aNight = document.getElementsByClassName('night');
var aEve = document.getElementsByClassName('eve');
var aMorn = document.getElementsByClassName('morn');
var oWeek = document.getElementById('week');
var aweek = oWeek.getElementsByTagName('ul');
var aDate = document.getElementsByClassName('date');
var aPre = document.getElementsByClassName('pressure');
var iNow = new Date();
var t = '';
var weather;
var timer1 = 0;
var timer2 = 0;
var timer3 = 0;
var timer4 = 0;
var timer5 = 0;
var timer6 = 0;
ajax("http://openweathermap.org/data/2.5/forecast/daily?id=1814906&appid=b1b15e88fa797225412429c1c50c122a", success, function () { 
		return undefined;
	});
function success(str) {
	
	weather = JSON.parse(str);
	var aWea = weather.list;

	oCity.innerHTML = weather.city.name;
	function showtime() {
		t = iNow.getHours() + ':' + iNow.getMinutes();
	    oTime.innerHTML = t;
    }
    showtime();
    setInterval(showtime, 60000);
    oDay.style.width = aCh[0].offsetWidth * aCh.length + 'px';
    for (var i = 0; i < aCh.length; i++) {
    	aTemp[i].innerHTML = aWea[i].temp.day + '℃';;
    	aRain[i].innerHTML = aWea[i].rain;
    	aDay[i].innerHTML = aWea[i].temp.day + '℃';
    	aMin[i].innerHTML = aWea[i].temp.min + '℃';
    	aMax[i].innerHTML = aWea[i].temp.max + '℃';
    	aNight[i].innerHTML = aWea[i].temp.night + '℃';
    	aEve[i].innerHTML = aWea[i].temp.eve + '℃';
    	aMorn[i].innerHTML = aWea[i].temp.morn + '℃';
    	aPre[i].innerHTML = 'pressure' + '<br/ >' + aWea[i].pressure;
    }  
    aTemp[6].innerHTML = aWea[0].temp.day + '℃';
    aRain[6].innerHTML = aWea[0].rain;
    aDay[6].innerHTML = aWea[0].temp.day + '℃';
    aMax[6].innerHTML = aWea[i].temp.max + '℃';
    aMax[6].innerHTML = aWea[0].temp.max + '℃';
    aNight[6].innerHTML = aWea[0].temp.night + '℃';
    aEve[6].innerHTML = aWea[0].temp.eve + '℃';
    aMorn[6].innerHTML = aWea[0].temp.morn + '℃';
    aPre[6].innerHTML = 'pressure' + '<br/ >' + aWea[0].pressure;
    for (var n = 0; n < aDate.length; n++) {
    	aDate[n].innerHTML = aWea[n].temp.day + '℃';
    } 
    function showtemp() {
    	oDay.style.left = oDay.offsetLeft - 20 +'px';
    	if (oDay.offsetLeft < -(oDay.offsetWidth - aCh[0].offsetWidth)) {
    		oDay.style.left = -20 + 'px';
    	}
    }
    timer1 = setInterval(showtemp,50);
    function stop1() {
    	clearInterval(timer1);
    }
    function start1() {
    	timer1 = setInterval(showtemp,50);
    }
    stop1();
    timer2 = setInterval(stop1,1050);
    timer3 = setInterval(start1,3153);
    for(var m = 0; m < aweek.length; m++) {
    	aweek[m].index = m;
    	aweek[m].onclick = function () {
    		// clearInterval(timer1);
    		// clearInterval(timer4);
    		for (var m = 0; m < aweek.length; m++) {
    			aweek[m].className = '';
    			this.className = 'active';console.log(this.index);
    		}
    		switch(this.index) {
    			case 0 :oDay.style.left = 0 + 'px';
    			break;
    			case 1 :oDay.style.left = -400 + 'px';
    			break;
    			case 2 :oDay.style.left = -800 + 'px';
    			break;
    			case 3 :oDay.style.left = -1200 + 'px';
    			break;
    			case 4 :oDay.style.left = -1600 + 'px';
    			break;
    			case 6 :oDay.style.left = -2000 + 'px';
    			break;
    			case 6 :oDay.style.left = -2400 + 'px';
    			break;
    		}
    		
    	};
    }
}