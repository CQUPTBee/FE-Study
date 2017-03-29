
function Time() {

	//定义时间差
	var disTime=0;

	//显示当前时间
	setInterval(getNewTime,1000);
	getNewTime();

	//按钮触发事件
	var start=document.getElementById('start');
	start.onclick=function(){
		if(!setTimgInterval){clearInterval(setTimgInterval);}
		//获取用户输入时间
		var Year=document.getElementById('year').value;
		var Month=document.getElementById('month').value;
		var Day=document.getElementById('day').value;
		// var Hour=document.getElementById('hour').value;
		// var Minute=document.getElementById('minute').value;
		// var Second=document.getElementById('second').value;
		var setTime=new Date();

		if (Month>12||Month<1||Day<1) {
			alert("您输入的时间不正确。");
			Year="";
			Month="";
			Day="";
		}

		if (Month==2) {
			if ((Year%4==0)||(Year%100==0)) {
				if (Day>29) {
					alert("您输入的时间不正确。");
					Year="";
					Month="";
					Day="";
				}
			}
			else if(Day>28){
				alert("您输入的时间不正确。");
				Year="";
				Month="";
				Day="";
			}
		}
		if ((Month==1||Month==3||Month==5||Month==7||Month==8||Month==10||Month==12) && Day>31){
			alert("您输入的时间不正确。");
			Year="";
			Month="";
			Day="";
		}
		if ((Month==4||Month==6||Month==9||Month==11) && Day>30) {
			alert("您输入的时间不正确。");
			Year="";
			Month="";
			Day="";
		}

		setTime.setFullYear(Year);
		setTime.setMonth(Month);
		setTime.setDate(Day);
		// setTime.setHours(Hour);
		// setTime.setMinutes(Minute);
		// setTime.setSeconds(Second);

		//span处填的时间
		var str=Year+"年"+Month+"月"+Day+"日"+"到现在的时间还有：";
		var oSpan=document.getElementsByClassName('Times')[0].getElementsByTagName('span')[0];
		oSpan.innerHTML=str;

		var setTimgInterval=setInterval(count,1000);
		count();
		function count(){
			//获取计算机现在的时间
			var ntime=new Date();
			var computerTime=ntime.getTime();
			//计算出相差的毫秒数
			if (Year!==""||Month!==""||Day!=="") {
				if (setTime.getTime()<computerTime) {
					alert("您输入的时间不正确。");
					Year="";
					Month="";
					Day="";
					clearInterval(setTimgInterval);
				}
				else{
					disTime=setTime.getTime()-computerTime;
				}
			}
			
			//计算出年月日
			// var ss = 1000;  
			// var mi = ss * 60;  
			// var hh = mi * 60;  
			// var dd = hh * 24; 
			var day=0;
			var hour=0;
			var minute=0;
			var second=0; 
			// var day = parseInt(disTime / dd);
			// var hour = parseInt((disTime - day * dd) / hh);  
			// var minute = parseInt((disTime - day * dd - hour * hh) / mi);  
			// var second = parseInt((disTime - day * dd - hour * hh - minute * mi) / ss);
			

			second=parseInt(disTime/1000%60);

			minute=parseInt(disTime/1000/60%60);

			hour=parseInt(disTime/1000/60/60%24);

			day=parseInt(disTime/1000/60/60/24);
			// alert(disTime/1000/60/60/24); 

			//打印出当前时间
			var endTimes=document.getElementsByClassName('Times')[0].getElementsByTagName('span')[1];;
			endTimes.innerHTML="";
			endTimes.innerHTML+=day+"天";
			endTimes.innerHTML+=hour+"时";
			endTimes.innerHTML+=minute+"分";
			endTimes.innerHTML+=second+"秒";
		}
	}
}


function getNewTime(){
	var time=new Date();
	var nowtime=document.getElementsByClassName('nowTime')[0];
	nowtime.innerHTML="现在的时间是：";
	nowtime.innerHTML+=time.getFullYear()+"年";
	nowtime.innerHTML+=(time.getMonth()+1)+"月";
	nowtime.innerHTML+=time.getDate()+"日";
	nowtime.innerHTML+=time.getHours()+"时";
	nowtime.innerHTML+=time.getMinutes()+"分";
	nowtime.innerHTML+=time.getSeconds()+"秒";
}


addLoadEvent(Time);