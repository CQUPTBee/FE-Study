function displayCitations() {
	// if (!document.getElementsByTagName) {return false;}
	// if (!document.createElement) {return false;}
	// if (!document.createTextNode) {return false;}
	//简便写法
	if (!document.getElementsByTagName || !document.createTextNode || !document.createElement) {return false;}
	//获取节点
	var quotes = document.getElementsByTagName('blockquote');
	//遍历节点
	for (var i = 0; i < quotes.length; i++) {
		//如果没有cite属性，继续循环
		if (!quotes[i].getAttribute("cite")) {continue;}
		//保存cite属性
		var url = quotes[i].getAttribute("cite");
		//取得引用中的所有元素节点引用
		var quoteChildren = quotes[i].getElementsByTagName('*');
		//如果没有元素节点，继续循环
		if (quoteChildren.length < 1) {continue;}
		//取得引用中的最后一个节点
		var elem = quoteChildren[quoteChildren.length-1];
		//创建标记
		var link = document.createElement("a");
		var link_text = document.createTextNode("source");
		link.appendChild(link_text);
		link.setAttribute("href",url);
		var superscript = document.createElement("sup");
		superscript.appendChild(link);
		//把标记添加到引用的最后一个节点
		elem.appendChild(superscript);
	}
}
addLoadEvent(displayCitations);