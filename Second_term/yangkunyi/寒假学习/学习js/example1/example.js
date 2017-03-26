function showPic(whichpic){
	var source = whichpic.getAttribute("href");
	var pic5 = document.getElementById("pic5");
	pic5.setAttribute("src",source);
	var text = whichpic.getAttribute("title");
	var description = document.getElementById("description");
	description.firstChild.nodeValue = text;
	// description.innerHTML=text;
}
// window.onload=showPic;