function moveMessage() {
	if (!document.getElementById) {return false;}
	if (!document.getElementById('message')) {return false;}
	var elem=document.getElementById('message');
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	if (xpos==200&&ypos==100) {
		return true;
	}

	if (xpos<200) {
		xpos++;
	}
	if (xpos>200) {
		xpos--;
	}
	if (ypos<100) {
		ypos++;
	}
	if (ypos>100) {
		ypos--;
	}
	elem.style.top=ypos+"px";
	elem.style.left=xpos+"px";
	movement=setTimeout("moveMessage()",10);
}