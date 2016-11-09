var oDiv = document.getElementById('roll');
var oUl = oDiv.getElementsByTagName('ul')[0];
var aLi = oUl.getElementsByTagName('li');
var aBtn = oDiv.getElementsByTagName('a'); 
var timer=null;
var iSpeed=- 3;

oUl.innerHTML += oUl.innerHTML;
oUl.style.width= aLi[0].offsetWidth*aLi.length+'px';

timer=setInterval(function () {

	oUl.style.left = oUl.offsetLeft+iSpeed +'px';

    if (oUl.offsetLeft < -oUl.offsetWidth/2) {

		oUl.style.left='0';
	}
	else if(oUl.offsetLeft > 0){
		oUl.style.left=-oUl.offsetWidth/2 + 'px';
	}
}, 30);

 aBtn[0].onmouseover = function () {
	iSpeed= -5;
}

 aBtn[1].onmouseover = function () {
	iSpeed = 5;
}

oUl.onmouseover=function () {

	clearInterval(timer);
}

oUl.onmouseout=function () {
	timer=setInterval(function () {

	oUl.style.left = oUl.offsetLeft+iSpeed +'px';

    if (oUl.offsetLeft < -oUl.offsetWidth/2) {

		oUl.style.left='0';
	}
	else if(oUl.offsetLeft > 0){
		oUl.style.left=-oUl.offsetWidth/2 + 'px';
	}
}, 30);
}