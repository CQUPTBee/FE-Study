function Tabchange() {
	if (!document.getElementsByTagName) {return false;}
	var tabs = document.getElementsByClassName("tab_top");
	var tabs_top = tabs[0].getElementsByTagName("a");
	var contents = document.getElementsByClassName("tab_content");
	var tabs_contents = contents[0].getElementsByTagName("li");
	for (var i = 0; i < tabs_top.length; i++) {
		tabs_top[i].index = i;
		tabs_top[i].onclick = function(){
			for (var j = 0; j < tabs_top.length; j++) {
				tabs_top[j].className = '';
				tabs_contents[j].style.display = 'none';
			}
			this.className = "hov";
			tabs_contents[this.index].style.display="block"; 
		}
	}
}
addLoadEvent(Tabchange);