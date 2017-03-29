var direction=true;
var timer=null;
var speed=10;
var stoptime=3000;
var timeout=null;
var pause=true;

function roll() {
	var oDiv=document.getElementById('roll');
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var oLi=oUl.getElementsByTagName('li');

	var aB=document.getElementsByTagName('button');

	
	var i=0;
	var str=oUl.innerHTML+oUl.innerHTML;
	oUl.innerHTML=str;
	oUl.style.width=(oLi[0].offsetWidth)*oLi.length+'px';
	for (i = 0; i < oLi.length; i++) {
		oLi[i].onmouseover=function(){stopMove();};
		oLi[i].onmouseout=function(){startMove(direction);};
	}
	aB[0].onclick=function(){startMove(true);};
	aB[1].onclick=function(){startMove(false);};
	startMove(true);
}

function startMove(dir){
	direction=dir;
	if (timer) {clearInterval(timer);}
	timer=setInterval(Move,30);
}
function stopMove(){
	clearInterval(timer);
	timer=null;
}



function Move(){

	var oDiv=document.getElementById('roll');
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var oLi=oUl.getElementsByTagName('li');

	var l=oUl.offsetLeft;

	if (direction) {
		l-=speed;
		if (l<=-oUl.offsetWith/2) {
			l+=oUl.offsetWidth/2;
		}
	} 
	else{
		l+=speed;
		if (l>=0) {
			l-=oUl.offsetWidth/2;
		}
	}

	if (pause) {
		if(Math.abs(l-Math.round(l/oLi[0].offsetWidth)*oLi[0].offsetWidth)<Math.ceil(speed/2)){
			stopMove();
			timeout=setTimeout(function(){
					startMove(direction);
				},stoptime)
			l=Math.round(l/oLi[0].offsetWidth)*oLi[0].offsetWidth;
		}
	}
	
	// alert("haha");
	oUl.style.left=l+'px';
}
addLoadEvent(roll);