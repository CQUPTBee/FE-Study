window.onload=function ()
		{
            getTime();
			setInterval(getTime, 600000);
            _roll();

		};


function _roll()
{
    var oDiv=document.getElementById('content');
    var oUl=oDiv.getElementsByTagName('ul')[0];
    var aLi=oDiv.getElementsByTagName('li');
    var aBtn=oDiv.getElementsByTagName('a');
    var iSpeed=-1;
    var timer=null;
    var i=0;

    oUl.innerHTML+=oUl.innerHTML;
    oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';

    timer=setInterval(rolling, 50);

    aBtn[0].onclick=function ()
    {
        iSpeed=-1;
    };

    aBtn[1].onclick=function ()
    {
        iSpeed=1;
    };

    for(i=0; i<aLi.length; i++)
    {
        aLi[i].onmouseover=function ()
        {
            clearInterval(timer);
        };

        aLi[i].onmouseout=function ()
        {
            timer=setInterval(rolling, 50);
        };
    }

    function rolling()
        {
            oUl.style.left=oUl.offsetLeft+iSpeed+"px";
            if(oUl.offsetLeft<-oUl.offsetWidth/2)
            {
                oUl.style.left='0px';
            }
            else if(oUl.offsetLeft>0)
            {
                oUl.style.left=-oUl.offsetWidth/2+'px';
            }
        };
}


function getTime()
{
	ajax('http://openweathermap.org/data/2.5/forecast/daily?id=1814906&appid=b1b15e88fa797225412429c1c50c122a',
		function (str)
			{
				//获取数据
				// var oContent=document.getElementById('content');
				var aH3=document.getElementsByTagName('h3');
				var aH4=document.getElementsByTagName('h4');
				var aTemperRange=document.getElementsByClassName('temperRange');
				var aCloud=document.getElementsByTagName('cloud');
				var aWea_pic=document.getElementsByClassName('wea_pic');
				var aWind=document.getElementsByClassName('wind');
				var aTemper=document.getElementsByClassName('temper');
				var aHumidity=document.getElementsByClassName('humidity');


				var jsonlist = JSON.parse(str);
				var i=0;
				for(i=0;i<aH3.length;i++)
				{
					var oDate=new Date(jsonlist.list[i].dt*1000);
		    		// var year =oDate.getFullYear();
		    		var month=(oDate.getMonth()+1);
		    		var day=oDate.getDate();
		    		var week=toCh(oDate.getDay());
					aH3[i].innerHTML=month+'月'+day+'日';
					aH4[i].innerHTML=week;
					aTemperRange[i].innerHTML=jsonlist.list[i].temp.min+'~'+jsonlist.list[i].temp.max+'℃';
					aWea_pic.src='images/'+picChange(jsonlist.list[i].weather.description)+'.png';
					// aCloud[i].innerHTML=weatherChange(jsonlist.list[i].weather.description);
					aWind[i].innerHTML=jsonlist.list[i].speed+'m/s';
					aTemper[i].innerHTML=jsonlist.list[i].temp.day+'℃';
					aHumidity[i],innerHTML=jsonlist.list[i].temp.humidity+'%';



				}

			});
}

// week转化
function toCh(day)
{
    switch(day)
    {
        case 0:
            return '星期日';
        case 1:
            return '星期一';
        case 2:
            return '星期二';
        case 3:
            return '星期三';
        case 4:
            return '星期四';
        case 5:
            return '星期五';
        case 6:
            return '星期六';
    }
}

//天气转化
function weatherChange(des)
{
	switch(des)
    {
        case 'light rain':
            return '小雨';
        case 'moderate rain':
            return '中雨';
        case 'clear sky':
            return '晴天';
        // case 3:
        //     return '星期三';
        // case 4:
        //     return '星期四';
        // case 5:
        //     return '星期五';
        // case 6:
        //     return '星期六';
    }
}

function picChange(des)
{
	switch(des)
    {
        case 'light rain':
            return '4';
        case 'moderate rain':
            return '5';
        case 'clear sky':
            return '1';
    }
}