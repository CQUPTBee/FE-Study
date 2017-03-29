

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

function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}
	else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

//添加元素
function preparePlaceholder() {
	if (!document.createElement) {return false;}
	if (!document.createTextNode) {return false;}
	if (!document.getElementById) {return false;}
	if (!document.getElementById("imagegallery")) {return false;}
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","pic5");
	placeholder.setAttribute("src","images/5.jpg");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	// var gallery = document.getElementById("imagegallery");
	insertAfter(placeholder,imagegallery);
	insertAfter(description,placeholder);
}

//开始
addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);