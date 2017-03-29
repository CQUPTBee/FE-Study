//检查特定的属性
function elementSupportAtrribute(elementName,attribute){
	if (!document.createElement) {return false;}
	var temp=document.createElement(elementName);
	return(attribute in test);
}