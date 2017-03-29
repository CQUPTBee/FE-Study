var g_oTimer=null;
var g_bPause=true;
var g_iPauseTime=3000;
var g_iSpeed=5;
var g_bMoveleft=true;
var g_oTimerOut=null;
function roll() {
	var oDiv=document.getElementsByClassName('roll')[0];
	var rUl=oDiv.getElementsByTagName('ul')[0];
	var rli=rUl.getElementsByTagName('li');
	var aB=oDiv.getElementsByTagName('button');

	
	var i=0;
	var str=rUl.innerHTML+rUl.innerHTML;
	rUl.innerHTML=str;
	rUl.style.width=(rli[0].offsetWidth+10)*rli.length+'px';
	for (i = 0; i < rli.length; i++) {
		rli[i].onmouseover=function(){stopMove();};
		rli[i].onmouseout=function(){startMove(g_bMoveleft);};
	}
	aB[0].onmouseover=function(){startMove(true);};
	aB[1].onmouseout=function(){startMove(false);};
	startMove(true);
}
function startMove(bLeft){
	g_bMoveLeft=bLeft;
	if (g_oTimer) {clearInterval(g_oTimer);}
	g_oTimer=setInterval(doMove,30);
}
function stopMove(){
	clearInterval(g_oTimer);
	g_oTimer=null;
}
function doMove(){
	var oDiv=document.getElementsByClassName('roll_images')[0];
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
	var l=oUl.offsetLeft;
	if (g_bMoveLeft) {
		l=l-g_iSpeed;
		if (l<=-oUl.offsetWidth/2) {
			l=l+oUl.offsetWidth/2;
		}
	} 
	else{
		l=l+g_iSpeed;
		if(l>=0){l=l-oUl.offsetWidth/2;}
	}
	if (g_bPause) {
		if (Math.abs(l-Math.round(l/aLi[0].offsetWidth)*aLi[0].offsetWidth)<Math.ceil(g_iSpeed/2)) {
			stopMove();
			g_oTimerOut=setTimeout(function(){
				startMove(g_bMoveLeft);
			},g_iPauseTime);
			l=Math.round(l/aLi[0].offsetWidth)*aLi[0].offsetWidth;
		}
	}
	oUl.style.left=l+'px';
}
addLoadEvent(roll);