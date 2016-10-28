var oDate = document.getElementsByTagName('input');
var oBtn = oDate[2];


oBtn.onclick = function () {
	var iNew = new Date(oDate[0].value);
	oDate[1].value = '';
	var t = 0;
	var timer = null;
	var str = '';
	timer = setInterval(function () {
    var iNow = new Date();
	t = Math.floor(iNew - iNow) / 1000;
	if (t >= 0) {
	    str = Math.floor(t / 86400) + '天' + Math.floor(t % 86400 / 3600) + '时' + Math.floor(t % 86400 % 3600 / 60) + '分' + Math.floor(t % 60) + '秒';
	    oDate[1].value = str;
	} 
	else {
		clearInterval(timer);
	}
}, 1000);
}
