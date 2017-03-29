function moveElement(elementID,final_x,final_y,interval) {
	//参数解释：1，打算移动的函数的id 2.目的地的左位置 3.目的地的上位置 4.两次移动之间的停顿时间

	if (!document.getElementById) {return false;}
	if (!document.getElementById(elementID)) {return false;}
	var elem=document.getElementById(elementID);
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.top) {
		elem.style.top="0px";
	}
	if (!elem.style.left) {
		elem.style.left="0px";
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	var dist=0;
	
	if (xpos==final_x&&ypos==final_y) {
		return true;
	}

	if (xpos<final_x) {
		dist=Math.ceil((final_x-xpos)/10);
		xpos=xpos+dist;
	}
	if (xpos>final_x) {
		dist=Math.ceil((xpos-final_x)/10);
		xpos=xpos-dist;
	}
	if (ypos<final_y) {
		dist=Math.ceil((final_y-ypos)/10);
		ypos=ypos+dist;
	}
	if (ypos>final_y) {
		dist=Math.ceil((ypos-final_y)/10);
		ypos=ypos-dist;
	}
	elem.style.top=ypos+"px";
	elem.style.left=xpos+"px";
	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);
}