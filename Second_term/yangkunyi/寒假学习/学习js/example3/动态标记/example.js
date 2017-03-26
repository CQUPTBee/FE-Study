//第七章（编程艺术）
//例一
// function insertParagraph(text) {
// 	var str="<p>";
// 	str += text;
// 	str += "</p>";
// 	document.write(str);
// }

//例二
// window.onload = function() {
// 	var testdiv=document.getElementById("testdiv");
// 	alert(testdiv.innerHTML);
// }

//例三
// window.onload = function() {
// 	var testdiv = document.getElementById("testdiv");
// 	testdiv.innerHTML = "<p> I inserted <em>this<em> content.</p>";
// }

//例四验证
// window.onload = function() {
// 	var para = document.createElement("p");
// 	var info = "nodeName:";
// 	info+=para.nodeName;
// 	info+=" nodeType:";
// 	info+=para.nodeType;
// 	alert(info);
// }


//例五添加元素(顺序可以改变)
// window.onload = function() {
// 	var para=document.createElement("p");
// 	var testdiv = document.getElementById("testdiv");
// 	testdiv.appendChild(para);
// 	var txt = document.createTextNode("Hello World!");
// 	para.appendChild(txt);
// }

//例六复杂组合
window.onload = function() {
	var para = document.createElement("p");
	var txt1 = document.createTextNode("This is ");
	var emphasis = document.createElement("em");
	var txt2 = document.createTextNode("my");
	var txt3 = document.createTextNode(" content.");
	para.appendChild(txt1);
	emphasis.appendChild(txt2);
	para.appendChild(emphasis);
	para.appendChild(txt3);
	var testdiv = document.getElementById("testdiv");
	testdiv.appendChild(para);
}