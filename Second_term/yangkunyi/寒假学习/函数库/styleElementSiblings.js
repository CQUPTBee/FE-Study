function getNextElement(node) {
	if (node.nodeType == 1) {
		return node;
	}
	if (node.nextSibling) {
		return getNextElement(node.nextSibling);
	}
	return null;
}
function addClass(element,value){
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
function styleElementSiblings(tag,theclass) {
	if (!document.getElementsByTagName) {return false;}
	var headers = document.getElementsByTagName("h1");
	var elem;
	for (var i = 0; i < headers.length; i++) {
		elem = getNextElement(headers[i].nextSibling);
		//不直接与style属性打交道
		// elem.style.fontWeight = "bold";
		// elem.style.fontSize = "1.2em";
		//只需去修改.intro类的样式
		//elem.className="intro";
		//当elem有calssName的时候
		//elem.className+=" intro";

		//将上面的东西封装进函数
		addClass(elem,"intro");
	}
}
addLoadEvent(styleHeaderSiblings); 