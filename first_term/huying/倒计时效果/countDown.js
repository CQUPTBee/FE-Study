// 0补位
function toDouble(num)
{
    if(num<10)
    {
      return '0'+num;
    }
    else
    {
      return ''+num;
    }
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

// 更新当前时间
function updateTime()
{
    var oDate=new Date();
    var yearStr=oDate.getFullYear()+' 年 '+toDouble((oDate.getMonth()+1))+' 月 '+toDouble(oDate.getDate())+' 日 '+toCh(oDate.getDay());
    var timeStr=toDouble(oDate.getHours())+toDouble(oDate.getMinutes())+toDouble(oDate.getSeconds());
    var aSpan=document.getElementById('time').getElementsByTagName('span');
    var oNowTime=document.getElementById('now');
    var i=0;

    oNowTime.innerHTML=yearStr;

    for(i=0; i<aSpan.length; i++)
    {
        aSpan[i].innerHTML=timeStr.charAt(i);
    }
}

window.onload=function ()
{
    var oBtn=document.getElementById('btn');
    var timer=null;

    timer=setInterval(updateTime,0);
    oBtn.onclick=begin;
};

// 开始倒计时
function begin()
    {
        setInterval(lost_Time,0);
    }

// 剩余时间
function lost_Time()
{
    var oT_year=document.getElementById('t_year');
    var oT_month=document.getElementById('t_month');
    var oT_day=document.getElementById('t_day');
    var oT_hour=document.getElementById('t_hour');
    var oT_minute=document.getElementById('t_minute');

    // if(oT_year.value < 1970 || oT_month.value < 0 || oT_month.value > 12 || oT_day.value < 0
    // || oT_day.value > 31 || oT_hour.value < 0 || oT_hour.value > 24 || oT_minute.value < 0 || oT_minute.value > 60)
    // {
    //     oT_year.value=oT_month.value=oT_day.value=oT_hour.value=oT_minute.value=null;
    //     alert(您的输入有误！！！请重新输入！！！);
    // }

    var str=oT_year.value+'/'+oT_month.value+'/'+oT_day.value+' '+oT_hour.value+':'+oT_minute.value+':'+'00';
    var end_Time= new Date(str);
    var now_Time= new Date();
    var t =end_Time.getTime() - now_Time.getTime();

    var d=Math.floor(t/1000/60/60/24);
    var h=Math.floor(t/1000/60/60%24);
    var m=Math.floor(t/1000/60%60);
    var s=Math.floor(t/1000%60);

    document.getElementById("t_d").innerHTML = d;//+ " 天"
    document.getElementById("t_h").innerHTML = h;//+ " 时"
    document.getElementById("t_m").innerHTML = m;//+ " 分"
    document.getElementById("t_s").innerHTML = s;//+ " 秒"
}
