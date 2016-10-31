var oUl = document.getElementsByTagName('ul')[0];
var oBtn = document.getElementsByTagName('a');
var oLi = document.getElementsByTagName('li');
var iSpeed = -3;
var timer = null;
oUl.innerHTML += oUl.innerHTML;
oUl.style.width = oLi[0].offsetWidth * oLi.length + 'px';
function move() {
	oUl.style.left = oUl.offsetLeft + iSpeed + 'px';
	if (oUl.offsetLeft < -oUl.offsetWidth / 2) {
		oUl.style.left = 0 + 'px';
	}
	else if (oUl.offsetLeft > 0) {
		oUl.style.left = -oUl.offsetWidth / 2 + 'px';
	}
}
timer = setInterval(move,30);
oBtn[0].onmouseover = function() {
	iSpeed = -3;
}
oBtn[1].onmouseover = function() {
	iSpeed = +3;
};
oUl.onmouseover = function() {
	clearInterval(timer);
};
oUl.onmouseout = function() {
	timer = setInterval(move,30);
}
move();