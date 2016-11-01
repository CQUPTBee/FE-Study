window.onload = function(){
	//banner轮播
	//获取元素
	var banner = document.getElementById("banner");
	var list = document.getElementById("list");
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var bg = document.getElementById("bg");
	var index = 1;
	var animated = false;//动画函数运行状态存放
	var timer;//存放定时器
	//设置偏移量
	function animate(offset) {
		animated = true;
		var newLeft = parseInt(list.style.left) + offset;
		var reLeft = parseInt(bg.style.left) + offset;
		var time = 300;//位移总时间(单位为毫秒)
		var interval = 10;//位移间隔时间
		var speed = offset/(time/interval);//每次位移量
		//位移的判断
		function go() {
			if ((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left) < newLeft)) {
				list.style.left = parseInt(list.style.left) + speed + "px";
				setTimeout(go, interval);//递归调用，实现动画效果
			}
		    else {
		    	animated = false;
				list.style.left = newLeft + "px";
				//无限滚动
				if (newLeft > -1920) {
					list.style.left = -5760 + "px";
				}
				if (newLeft < -5760) {
					list.style.left = -1920 + "px";
				}
			}
		}
		go();
		function run() {
			if ((speed < 0 && parseInt(bg.style.left) > reLeft) || (speed > 0 && parseInt(bg.style.left) < reLeft)) {
				bg.style.left = parseInt(bg.style.left) + speed + "px";
				setTimeout(run, interval);//递归调用，实现动画效果
			}
		    else {
		    	animated = false;
				bg.style.left = reLeft + "px";
				//无限滚动
				if (reLeft > -1920) {
					bg.style.left = -3840 + "px";
				}
				if (reLeft < -3840) {
					bg.style.left = -1920 + "px";
				}
			}
		}
		run();
	}
	//自动播放
	function play() {
		timer = setInterval(function () {
			next.onclick();
		},3000);
	}
	//停止播放
	function stop() {
		clearInterval(timer);
	}
	//点击右键头
	next.onclick = function() {
	if (!animated) {
		if (index == 3) {
			index = 1;
		}
		else {
			index += 1;
		}
		animate(-1920);
		}
	}
	//点击左键头
	prev.onclick = function() {
	if (!animated) {
		if (index == 1) {
			index = 3;
		}
		else {
			index -= 1;
		}
		animate(1920);
		}
	}
	banner.onmouseover = stop;
	banner.onmouseout = play;
	play();
	//
}