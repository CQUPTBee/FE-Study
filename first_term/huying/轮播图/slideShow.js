
window.onload=function ()
{
	var oDiv=document.getElementById('content');
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oDiv.getElementsByTagName('li');
	var aBtn=oDiv.getElementsByTagName('a');
	var iSpeed=-2;
	var timer=null;
	var i=0;

	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';

	timer=setInterval(rolling, 30);

	aBtn[0].onclick=function ()
	{
		iSpeed=-2;
	};

	aBtn[1].onclick=function ()
	{
		iSpeed=2;
	};

	for(i=0; i<aLi.length; i++)
	{
		aLi[i].onmouseover=function ()
		{
			clearInterval(timer);
		};

		aLi[i].onmouseout=function ()
		{
			timer=setInterval(rolling, 30);
		};
	}

	function rolling()
		{
			oUl.style.left=oUl.offsetLeft+iSpeed+"px";
			if(oUl.offsetLeft<-oUl.offsetWidth/2)
			{
				oUl.style.left='0px';
			}
			else if(oUl.offsetLeft>0)
			{
				oUl.style.left=-oUl.offsetWidth/2+'px';
			}
		};
};