window.onload=function () {
	addData();

}
/*主函数*/
function addData(){
	var weather;
	var oUl=document.getElementById('list');
	var oDay=oUl.getElementsByClassName('day');
	var oTime=oUl.getElementsByClassName("time");
	var prev=document.getElementsByClassName("prev")[0];
	var next=document.getElementsByClassName("next")[0];
	var oShow=document.getElementById("show");
	var aTime=oShow.getElementsByClassName("showdate");
	var aEve=oShow.getElementsByClassName("eve");
	var aHum=oShow.getElementsByClassName("humidity");
	var aTem1=oShow.getElementsByClassName("tem1");
	var aTem2=oShow.getElementsByClassName("tem2");
	var showlist=oShow.getElementsByClassName("show-list");
	var eve=[];//平均气温存储数组
	var night=[];//夜温
	var morn=[];//日wen
	var hum=[];//湿度
	var flag=0;//判断是否在详情页面，默认不在为0
	var oFirstDay=new Date();//获取当前时间
	var aDate=[];


	ajax("http://openweathermap.org/data/2.5/forecast/daily?id=1814906&appid=b1b15e88fa797225412429c1c50c122a",fSunc,function(){
		return undefined;
	});//调用Ajax

/*处理函数*/
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
			showlist[this.index].style.opacity=1;
			showlist[this.index].style.fliter='alpha(opacity=1)';
			flag=1;
			Time(this.index);
		}
	}
/*轮播效果-----淡入淡出*/
	function Time(str) {

		var iNow=str;
		console.log(iNow);
		var timer=setInterval(auto,3000);

	function auto(){
		if(iNow==showlist.length-1){
			iNow=0;
		}
		else{
			iNow++;
		}
		for(var i=0;i<showlist.length;i++){
			fadeOut(showlist[i]);
		}
		fadeIn(showlist[iNow]);
	}

};


	}

}