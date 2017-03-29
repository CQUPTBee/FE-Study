//addLoadEvent函数
//解决共享onLoad事件的函数，可以同时启动多个函数。
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	}
	else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}