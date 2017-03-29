//在需要的时候，给一个元素追加一个新的class
function addClass(element,value){//第一个是需要添加新class的元素（element），第二个是新的class设置值（value）
	if (!element.className) {
		element.className=value;
	}
	else{
		newClassName=element.className;
		newClassName+=" ";
		newClassName+=value;
		element.className=newClassName;
	}
}

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

//insertAfter函数
function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}
	else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}