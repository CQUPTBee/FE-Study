function convertToGS (img) {
	//如果浏览器不支持<canvas>就返回
	if (!Modernizr.canvas) {return};

	//储存原始色彩版
	img.color=img.src;

	//创建灰度版
	img.grayscale=createGSCanvas(img);

	//在mouseover/out事件发生时切换图片
	img.onmouseover=function () {
		this.src=this.color;
	}
	img.onmouseout=function(){
		this.src=this.grayscale;
	}
	img.onmouseout();
}
function createGSCanvas (img) {
	var canvas=document.createElement('canvas');
	canvas.width=img.width;
	canvas.height=img.height;

	var ctx=canvas.getContext("2d");
	ctx.drawImage(img,0,0);

	//注意：getImageData只能操作与脚本位于同一个域中的图片
	var c=ctx.getImageData(0,0, img.width, img.height);
	for (var i = 0; i < c.height; i++) {
		for (var j = 0; j < c.width; i++) {
			var x=(i*4)*c.width+(j*4);
			var r=c.data[x];
			var g=c.data[x+1];
			var b=c.data[x+2];
			c.data[x]=c.data[x+1]=c.data[x+2]=(r+g+b)/3;
		}
	}

	ctx.putImageData(c,0,0,0, c.width, c.height);
	return canvas.toDataURL();
}
window.onload=function () {
	convertToGS(document.getElementById('avatar'));
}