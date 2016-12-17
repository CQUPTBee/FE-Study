var oUl = document.getElementsByTagName('ul')[0];
var oBtn = document.getElementById('start');
var oLi = document.getElementsByTagName('li');
var timer = null;
oUl.innerHTML += oUl.innerHTML;
oUl.style.height = oLi[0].offsetHeight * oLi.length + 'px';
function move() {
	var iSpeed = document.getElementById('speed');
	var oDire = document.getElementById('direction');
	if (oDire.value == '上') {
		oUl.style.top = oUl.offsetTop - iSpeed.value + 'px';
		if (oUl.offsetTop < -oUl.offsetHeight / 2) {
			oUl.style.top = 0 + 'px';
		}
	}
	if (oDire.value == '下') {
		oUl.style.top = oUl.offsetTop + iSpeed.value + 'px';
		if (oUl.offseTOp > 0) {
			oUl.style.top = -oUl.offsetHeight / 2 + 'px';
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