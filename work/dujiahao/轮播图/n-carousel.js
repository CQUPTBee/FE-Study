window.onload=function(){
	carousel();
}

function carousel(){
	var roll=document.getElementsByClassName('wrap')[0];
	var oUl=roll.getElementsByTagName('ul')[0];
	var cli=oUl.getElementsByTagName('li');
	var left=document.getElementsByClassName('btn_left')[0];
	var right=document.getElementsByClassName('btn_right')[0];
	var speed=-3;
	var timer;

	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=cli[0].offsetWidth*cli.length+"px";

	 function Time(){
	 	timer=setInterval(function(){
			oUl.style.left=oUl.offsetLeft+speed+"px";

			if(oUl.offsetLeft<-oUl.offsetWidth/2)
			{
				oUl.style.left="0";
			}
		 	else if(oUl.offsetLeft>=0)
		 	{
		 		oUl.style.left=-oUl.offsetWidth/2+"px";
		 	}
		},30);
	};
	Time();

	 // 向左滑动
	left.onclick=function()
	{
		speed=-3;
	};

	// 向右滑动
	right.onclick=function()
	{
		speed=3;
	};

	for(var i=0;i<cli.length;i++){

		cli[i].onmouseover=function()
		{
			// 清定时器
			clearInterval(timer);
		}
		cli[i].onmouseout=function(){

			// 启用定时器
			Time();
		}
	}

}
