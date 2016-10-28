var oUl = document.getElementsByTagName('ul')[0];
var oBtn = document.getElementById('start');
var oLi = document.getElementsByTagName('li');
var timer = null;
oUl.innerHTML += oUl.innerHTML;
oUl.style.width = oLi[0].offsetWidth * oLi.length + 'px';
function move() {
	var iSpeed = document.getElementById('speed');
	var oDire = document.getElementById('direction');
	if (oDire.value == '左') {
		oUl.style.left = oUl.offsetLeft - iSpeed.value + 'px';
		if (oUl.offsetLeft < -oUl.offsetWidth / 2) {
			oUl.style.left = 0 + 'px';
		}
	}
	if (oDire.value == '右') {
		oUl.style.left = oUl.offsetLeft + iSpeed.value + 'px';
		if (oUl.offsetLeft > 0) {
			oUl.style.left = -oUl.offsetWidth / 2 + 'px';console.log(oUl.offsetLeft);
		}
	}
	
}
oBtn.onclick = function () {
	clearInterval(timer);
	timer = setInterval(move,30);
	oUl.onmouseover = function() {
		clearInterval(timer);
	};
	oUl.onmouseout = function() {
		timer = setInterval(move,50);
	};
}
