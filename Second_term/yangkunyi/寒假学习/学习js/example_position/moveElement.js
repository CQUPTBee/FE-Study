function moveElement(elementID,final_x,final_y,interval) {
	//参数解释：1，打算移动的函数的id 2.目的地的左位置 3.目的地的上位置 4.两次移动之间的停顿时间

	if (!document.getElementById) {return false;}
	if (!document.getElementById(elementID)) {return false;}
	var elem=document.getElementById(elementID);

	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	if (xpos==final_x&&ypos==final_y) {
		return true;
	}

	if (xpos<final_x) {
		xpos++;
	}
	if (xpos>final_x) {
		xpos--;
	}
	if (ypos<final_y) {
		ypos++;
	}
	if (ypos>final_y) {
		ypos--;
	}
	elem.style.top=ypos+"px";
	elem.style.left=xpos+"px";
	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	movement=setTimeout(repeat,interval);
}