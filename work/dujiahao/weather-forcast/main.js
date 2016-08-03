window.onload=function () {
	addData();

}

function addData(){
	var weather;
	var oUl=document.getElementById('list');
	var oDay=oUl.getElementsByClassName('day');
	var oTime=oUl.getElementsByClassName("time");
	var prev=document.getElementsByClassName("prev")[0];
	var next=document.getElementsByClassName("next")[0];
	var oShow=document.getElementById("show");
	var aTime=oShow.getElementsByClassName("showdate");
	var aEve=show.getElementsByClassName("eve");
	var aHum=show.getElementsByClassName("humidity");
	var aTem1=show.getElementsByClassName("tem1");
	var aTem2=show.getElementsByClassName("tem2");
	var eve=[];
	var night=[];
	var morn=[];
	var hum=[];
	var flag=0;//判断是否在详情页面，默认不在为0
	var oFirstDay=new Date();
	var aDate=[];



	ajax("http://openweathermap.org/data/2.5/forecast/daily?id=1814906&appid=b1b15e88fa797225412429c1c50c122a",fSunc,function(){
		return undefined;
	});

	function fSunc(str) {
		weather=JSON.parse(str);
		var factuDay=weather.list;
		var i,j;

		for(i=0;i<oDay.length;i++){

			oDay[i].getElementsByClassName('hum')[0].innerHTML="湿度："+factuDay[i].humidity;
			oDay[i].getElementsByClassName('min')[0].innerHTML=factuDay[i].temp.min;
			oDay[i].getElementsByClassName('max')[0].innerHTML=factuDay[i].temp.max+"℃";
			oDay[i].getElementsByClassName('time')[0].innerHTML=oFirstDay.getFullYear()+"-"+(oFirstDay.getMonth()+1)+"-"+(oFirstDay.getDate()+i);
			night.push(factuDay[i].temp.night);
			eve.push(factuDay[i].temp.eve);
			morn.push(factuDay[i].temp.morn);
			hum.push(factuDay[i].humidity);
			switch(factuDay[i].weather[0].description){
				case "heavy intensity rain":oDay[i].getElementsByClassName('weather')[0].innerHTML="暴雨";
					break;
				case "light rain":oDay[i].getElementsByClassName('weather')[0].innerHTML="小雨";
					break;
				case "moderate rain":oDay[i].getElementsByClassName('weather')[0].innerHTML="中雨";
					break;
				case "Clouds":oDay[i].getElementsByClassName('weather')[0].innerHTML="多云";
					break;
				default:
					oDay[i].getElementsByClassName('weather')[0].innerHTML=factuDay[i].weather[0].main;
			}
		}


	show.innerHTML+=show.innerHTML;
	var i=0;
	for (i=0;i<oDay.length;i++){

		oDay[i].index=i;
		oDay[i].onclick=function(){

			oUl.style.display="none";
			show.style.display="block";

			for(i=0;i<10;i++){
				aTime[i].innerHTML=oTime[i].innerHTML;
				aEve[i].innerHTML=eve[i]+"℃";
				aHum[i].innerHTML=hum[i]+"%";
				aTem1[i].innerHTML=morn[i]+"℃";
				aTem2[i].innerHTML=night[i]+"℃";
			}
			show.style.left=-468*(this.index)+"px";
			flag=1;

			Time();
		}
	}



	prev.onclick=function()
	{
		if (flag) {
			clearTimeout(timer);
			show.style.left=show.offsetLeft+468+'px';
			Time();
		}
		else {

			oUl.style.left=0+'px';
		}
	};

	//不在详情页面，点击可向后翻页。在详情页面，清定时器向后翻页
	next.onclick=function()
	{
		if (flag) {
			clearTimeout(timer);
			show.style.left=show.offsetLeft-468+'px';
			Time();
		}
		else {

			oUl.style.left=-468+'px';
		}
	};

function Time(){
	 	// var range=0;
	 	// var timer2;
	 	timer=setInterval(function(){
			show.style.left=show.offsetLeft-468+'px';
			// if(range<=12){
			// 	timer=setInterval(function(){
			// 	show.style.left=show.offsetLeft-39+'px';
			// 	range++;
			// },100)}
			// 	else{
			// 		range=0;
			// 	}
			// clearTimeout(timer2);
			// debugger
			if(show.offsetLeft<=-4212 )
			{
				show.style.left="0px";
			}
		},2000);
	};
	}

}