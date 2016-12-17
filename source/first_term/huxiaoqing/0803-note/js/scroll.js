var oBtn = document.getElementById('btn1');
var bSys=true;
var timer=null; 


//检测用户是否拉滚动条
window.onscroll = function () {
	if (!bSys) {
		clearInterval(timer);
	}
	bSys = false;
};


oBtn.onclick = function () {

	timer=serInterval(function () {

		var scrollTop =document.documentElement.scrollTop||document.body.scrollTop;
		var iSpeed = Math.floor(-scrollTop/8);	//兼容谷歌

		//回到顶部，关闭定时器	
		if (scrollTop==0) {			
			clearInterval(timer);
		}

		bSys = true;
		document.documentElement.scrollTop = document.body.scrollTop = scrollTop+iSpeed;
	}, 30);
};