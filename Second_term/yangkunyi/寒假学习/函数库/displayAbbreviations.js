function displayAbbreviations() {
	if (!document.getElementsByTagName) {return false;}
	if (!document.createTextNode) {return false;}
	if (!document.createElement) {return false;}
	//取得缩略词
	var abbreviations = document.getElementsByTagName('abbr');
	if (abbreviations < 1) {return false;}
	var defs = new Array();
	//遍历这些缩略词
	for (var i = 0; i < abbreviations.length; i++) {
		// var current_abbr = abbreviations[i];
		var definition = abbreviations[i].getAttribute("title");
		var key = abbreviations[i].lastChild.nodeValue;
		defs[key] = definition;
		// defs[abbreviations[i].lastChild.nodeValue] = abbreviations[i].getAttribute("title");
	}
	//创建定义列表
	var dlist = document.createElement("dl");
	//遍历定义
	for (key in defs) {
		var definition = defs[key];
		//创建定义标题
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		//创建定义描述
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definition);
		dtitle.appendChild(dtitle_text);
		ddesc.appendChild(ddesc_text);
		//把他们添加到定义的列表
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	//创建标题
	var header = document.createElement("h2");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	//把标题添加到主页面
	document.body.appendChild(header);
	//把定义的列表添加到页面主体
	document.body.appendChild(dlist);
}
addLoadEvent(displayAbbreviations);