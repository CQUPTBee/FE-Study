function prepareSlideshow() {
	//确保浏览器支持DOM方法
	if (!document.getElementsByTagName) {return false;}
	if (!document.getElementById) {return false;}
	//确保元素存在
	if (!document.getElementById('linklist')) {return false;}
	// if (!document.getElementById('preview')) {return false;}
	//为图片应用样式
	// var preview=document.getElementById('preview');
	// preview.style.position="absolute";
	//动态创建元素
	var slideshow=document.createElement("div");
	slideshow.setAttribute("id","sildeshow");
	var preview=document.createElement("img");
	preview.setAttribute("src","images/topics.jpg");
	preview.setAttribute("alt","building blocks of web design");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);

	//取得列表的所有链接
	var list=document.getElementById('linklist');
	//让新创建的链接紧跟在列表后面
	insertAfter(slideshow,list);

	var links=list.getElementsByTagName('a');
	links[0].onmouseover=function(){

		moveElement("preview",-100,0,10);
	}
	links[1].onmouseover=function(){
		moveElement("preview",-200,0,10);
	}
	links[2].onmouseover=function(){
		moveElement("preview",-300,0,10);
	}

	

}
addLoadEvent(prepareSlideshow);