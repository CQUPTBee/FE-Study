// var g_bMoveLeft=true;
// var g_oTimer=null;
// var g_oTimerOut=null;

// var g_iSpeed=3;

// window.onload=function ()
// {
// 	var oDiv=document.getElementById('roll');
// 	var oUl=oDiv.getElementsByTagName('ul')[0];
// 	var aLi=oUl.getElementsByTagName('li');
// 	var aA=oDiv.getElementsByTagName('a');
	
// 	var i=0;
	
// 	var str=oUl.innerHTML+oUl.innerHTML;
	
// 	oUl.innerHTML=str;
	
// 	oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
	
// 	for(i=0;i<aLi.length;i++)
// 	{
// 		aLi[i].onmouseover=function ()
// 		{
// 			stopMove();
// 		};
		
// 		aLi[i].onmouseout=function ()
// 		{
// 			startMove(g_bMoveLeft);
// 		};
// 	}
	
// 	aA[0].onmouseover=function ()
// 	{
// 		startMove(true);
// 	};
	
// 	aA[1].onmouseover=function ()
// 	{
// 		startMove(false);
// 	};
	
// 	startMove(true);
// };

// function startMove(bLeft)
// {
// 	g_bMoveLeft=bLeft;
	
// 	if(g_oTimer)
// 	{
// 		clearInterval(g_oTimer);
// 	}
// 	g_oTimer=setInterval(doMove, 30);
// }

// function stopMove()
// {
// 	clearInterval(g_oTimer);
// 	g_oTimer=null;
// }

// function doMove()
// {
// 	var oDiv=document.getElementById('roll');
// 	var oUl=oDiv.getElementsByTagName('ul')[0];
// 	var aLi=oUl.getElementsByTagName('li');
	
// 	var l=oUl.offsetLeft;
	
// 	if(g_bMoveLeft)
// 	{
// 		l-=g_iSpeed;
// 		if(l<=-oUl.offsetWidth/2)
// 		{
// 			l+=oUl.offsetWidth/2;
// 		}
// 	}
// 	else
// 	{
// 		l+=g_iSpeed;
// 		if(l>=0)
// 		{
// 			l-=oUl.offsetWidth/2;
// 		}
// 	}
	
// 	oUl.style.left=l+'px';
// }

/*自己做的*/
window.onload=function()
{
	var oDiv=document.getElementById('roll');
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=document.getElementsByTagName('li');
	var aBtn=document.getElementsByTagName('a');
	var iSpeed=-5;
	var timer=null;

	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
	
	timer=setInterval(function(){oUl.style.left=oUl.offsetLeft+iSpeed+'px';
	if(oUl.offsetLeft<-oUl.offsetWidth/2)
	
		oUl.style.left="0px";
	else if(oUl.offsetLeft>0)
		oUl.style.left=-oUl.offsetWidth/2+'px';//控制不出现白条
	}, 30);
	oUl.onmouseover=function()
	{
		clearInterval(timer);
	}
	oUl.onmouseout=function()
	{
		timer=setInterval(function(){oUl.style.left=oUl.offsetLeft+iSpeed+'px';
	if(oUl.offsetLeft<-oUl.offsetWidth/2)
	
		oUl.style.left="0px";
	else if(oUl.offsetLeft>0)
		oUl.style.left=-oUl.offsetWidth/2+'px';//控制不出现白条
	}, 30);
	aBtn[0].onmouseover=function()//onclick
	{
		iSpeed=-5;
	}
	aBtn[1].onmouseover=function()//onclick
	{
		iSpeed=5;
	}
	}
};