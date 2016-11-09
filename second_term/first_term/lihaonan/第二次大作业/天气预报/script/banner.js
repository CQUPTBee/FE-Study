// var aWrap = document.getElementsByTagName("li");
// console.log("aWrap.length="+aWrap.length);
//bannerMove();


// var aWrap=document.getElementsByTagName("li");
 //console.log("aWrap.length="+aWrap.length);
// function bannerMove(){
// 	var iNow=0;
// 	var timer=setInterval(auto,3000);
// 	function auto(){
// 		if(iNow<2){
// 			// for(var i=0;i<aWrap.length;i++){
// 			// fadeOut(aWrap[i]);
// 			//}
// 			++iNow;
// 		}else{
// 			// fadeOut(aWrap[2]);
// 			//fadeIn(aWrap[0]);
// 			iNow=0;
// 		}
// 		console.log(iNow);
		// for(var i=0;i<aWrap.length;i++){
		// 	fadeOut(aWrap[i]);
		// }
		// setTimeout(fadeIn(aWrap[iNow]), 150);
//	}
//}


// function bannerMove(){
// 	var timer=setInterval(auto,3000)
// 	function auto(){
// 		for(var i=0;i<aWrap.length;i++)
// 	}
// }
var timer=null;

function fadeIn(obj){					//淡入效果
	var value=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var ispeed=5;
		if(value==100){
			clearInterval(obj.timer);
		}else{
			value+=ispeed;
			obj.style.opacity=value/100;
			obj.style.filter="alpha(opacity='+value+')";
		}
	},50)
}

function fadeOut(obj){					//淡出效果
	var value=100;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var ispeed=-5;
		if(value==0){
			clearInterval(obj.timer);
		}else{
			value+=ispeed;
			obj.style.opacity=value/100;
			obj.style.filter="alpha(opacity='+value+')";
		}
	},50)
}