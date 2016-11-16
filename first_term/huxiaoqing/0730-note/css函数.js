function getStyle () {
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj, false)[attr];
	}
}

function css(obj, attr, value){
	if (arguments.length==2){
		return getStyle(obj, attr);
	}
	else if(arguments.length===3){
		obj.style[attr]=value;
	}
}