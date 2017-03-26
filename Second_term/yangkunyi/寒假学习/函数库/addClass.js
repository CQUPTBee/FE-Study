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