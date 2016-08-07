window.onload = function(){
	var oDiv = document.getElementById('miaovSlide');
	var oUl = oDiv.getElementsByTagName('ul')[0];
	var oLi = oUl.getElementsByTagName('li');

	var oUp = oDiv.getElementsByTagName('div')[0];
    var oDown = oDiv.getElementsByTagName('div')[1];

	oUl.innerHTML += oUl.innerHTML;

	oUp.onmousedown = function (){
		tiemr=setInterval(doMove, 30);
		ispeed=-5;
	}; 
	oDown.onmousedown = function (){
		tiemr=setInterval(doMove, 30);
		ispeed=5;
	}; 
	oUp.onmouseup = function (){
		clearInterval(timer);
	}; 
	oUp.onmouseup = function (){
		clearInterval(timer);
	}; 

	function doMove(){
		oUl.style.top = oUl.offsetTop+ispeed+'px';

		if(oUl.offsetTop<-oUl.offsetHeight/2){
			oUl.style.top = '0px';
		}

		else if(oUl.offsetTop>0){
			oUl.style.top = -oUl.offsetHeight/2+'px';
		}
	}
};