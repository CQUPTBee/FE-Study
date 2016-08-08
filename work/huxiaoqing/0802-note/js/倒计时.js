var aIn=document.getElementsByTagName('input');
var iNow=null;
var iNew=null;
var t=0;
var str='' ;
var timer=null;

aIn[i].onclick=function () {
	
	
	iNew=new Date(aIn[0].value);
	clearInterval(timer);

	timer=setInterval(function () {

		iNow=new Date();
		t=Math.floor((iNew-iNow)/1000);

		if( t>=0) {
		
			str=Math.floor(t/86400)+'天'+Math.floor(t%86400/3600)+':'+Math.floor(t%86400%3600/60)+':'+t%60;

			aIn=[1].value=str;
		}
		else {
			clearInterval(timer);
		}
	} ,1000);
console.log(timer);
};