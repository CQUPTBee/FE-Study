
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];

	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
};



function fadeIn(obj){
	var iCur=getStyle(obj,'opacity');
	if(iCur==1){
		return false;
	}

	var value=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var Speed=5;
		if(value==100){
			clearInterval(obj.timer);
		}
		else{
			value+=Speed;
			obj.style.opacity=value/100;
			obj.style.fliter='alpha(opacity='+value+')';
		}
	},30);
};

function fadeOut(obj){
	var iCur=getStyle(obj,'opacity');
	if(iCur==0){
		return false;
	}

	var value=100;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var Speed=-5;
		if(value==0){
			clearInterval(obj.timer);
		}
		else{
			value+=Speed;
			obj.style.opacity=value/100;
			obj.style.fliter='alpha(opacity='+value+')';
		}
	},30);
};