

function showPic(whichpic){
	if (!document.getElementById("pic5")) {
		return false;
	}
	var source = whichpic.getAttribute("href");
	var pic5 = document.getElementById("pic5");
	if (pic5.nodeName != "IMG") {
		return false;
	}
	pic5.setAttribute("src",source);
	if (document.getElementById("description")) {
		var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
		var description = document.getElementById("description");
		if (description.firstChild.nodeValue == 3) {
			description.firstChild.nodeValue = text;
		}
	}
	return true;
}


function prepareGallery(){
	//第一种写法
	// if (!document.getElementsByTagName) return false;
	// if (!document.getElementById) return false;
	//第二种写法
	//if (!document.getElementById || !document.getElementsByTagName) return false;
	//第三种写法
	// var supported = document.getElementsByTagName && document.getElementById;
	// if (!supported) return false;

	//最棒的写法
	if (!document.getElementById) {
		return false;
	}
	if (!document.getElementsByTagName) {
		return false;
	}
	if (!document.getElementById("imagegallery")) {
		return false;
	}
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return showPic(this) ? false : true;
		}
	}

}

//addLoadEvent函数
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


//开始
addLoadEvent(prepareGallery);