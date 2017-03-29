
var classes=document.getElementById('classes');
var Id=classes.getElementsByClassName('id');
var Name=classes.getElementsByClassName('name');
var BigPhotoUrl=classes.getElementsByClassName('bigPhotoUrl');
var MiddlePhotoUrl=classes.getElementsByClassName('middlePhotoUrl');
var SmallPhotoUrl=classes.getElementsByClassName('smallPhotoUrl');
var Provider=classes.getElementsByClassName('provider');
var LearnerCount=classes.getElementsByClassName('learnerCount');
var Price=classes.getElementsByClassName('price');
var Description=classes.getElementsByClassName('description');
var g_oTimer=null;
var g_bPause=true;
var g_iPauseTime=3000;
var g_iSpeed=10;
var g_bMoveleft=true;
var g_oTimerOut=null;


var Class;



getNewContent("http://study.163.com/webDev/hotcouresByCategory.htm",success, Faild);

function Faild() {
	alert('Sorry,you browser does\'t support XMLHttpRquest');
}

function success(str){
	Class=JSON.parse(str);
	// alert(Class[0].id);
	var i;

	//填数据
	for(i=0;i<Class.length;i++){
		Id[i].lastChild.nodeValue=Class[i].id;
		Name[i].lastChild.nodeValue=Class[i].name;
		var srcBigPhotoUrl=BigPhotoUrl[i].getElementsByTagName('a')[0];
		srcBigPhotoUrl.href=Class[i].bigPhotoUrl;
		var srcMiddlePhotoUrl=MiddlePhotoUrl[i].getElementsByTagName('a')[0];
		srcMiddlePhotoUrl.href=Class[i].middlePhotoUrl;
		// var srcSmallPhotoUrl=SmallPhotoUrl[i].getElementsByTagName('a')[0];
		var srcSmallPhotoUrl=SmallPhotoUrl[i].getElementsByTagName('img')[0];

		srcSmallPhotoUrl.src=Class[i].smallPhotoUrl;
		Provider[i].lastChild.nodeValue=Class[i].provider;
		Price[i].lastChild.nodeValue=Class[i].price;
		var textDescription=Description[i].getElementsByTagName('textarea')[0];
		textDescription.value=Class[i].description;
	}
}

//轮播
function roll(){
	var rMoll=document.getElementsByClassName('move')[0];
	var rUl=rMoll.getElementsByTagName('ul');
	var aB=document.getElementsByTagName('button');


	var i=0;
	var str=rMoll.innerHTML+rMoll.innerHTML;
	rMoll.innerHTML=str;
	rMoll.style.width=rUl[0].offsetWidth*rUl.length+'px';
	for (i = 0; i < rUl.length; i++) {
		rUl[i].onmouseover=function(){
			clearInterval(g_oTimer);
			g_oTimer=null;
			stopMove();
		};
		rUl[i].onmouseout=function(){
			clearInterval(g_oTimer);
			g_oTimer=null;
			startMove(g_bMoveleft);
		};
	}
	aB[0].onclick=function(){startMove(false);};
	aB[1].onclick=function(){startMove(true);};
	startMove(true);
}

function startMove(bLeft){
	g_bMoveLeft=bLeft;
	if (g_oTimer) {clearInterval(g_oTimer);g_oTimer=null;}
	// alert(g_oTimer);
	g_oTimer=setInterval(doMove,30);
}
function stopMove(){
	clearInterval(g_oTimer);
	g_oTimer=null;
}

function doMove(){
	var rMoll=document.getElementsByClassName('move')[0];
	var rUl=rMoll.getElementsByTagName('ul');
	var l=rMoll.offsetLeft;

	if (g_bMoveLeft) {
		l=l-g_iSpeed;
		if (l<=-rMoll.offsetWidth/2) {
			l=l+rMoll.offsetWidth/2;
		}
	} 
	else{
		l=l+g_iSpeed;
		if(l>=0){
			l=l-rMoll.offsetWidth/2;
		}
	}
	if (g_bPause) {
		if (Math.abs(l-Math.round(l/rUl[0].offsetWidth)*rUl[0].offsetWidth)<Math.ceil(g_iSpeed/2)) {
			stopMove();
			g_oTimerOut=setTimeout(function(){startMove(g_bMoveLeft);},g_iPauseTime);
			l=Math.round(l/rUl[0].offsetWidth)*rUl[0].offsetWidth;
		}
	}
	rMoll.style.left=l+'px';
}
addLoadEvent(roll);





