window.onload=function ()
{
	var oDiv=document.getElementById('time-record');
	var oPrev=document.getElementById('prev');
	var oNext=document.getElementById('next');
	var iSpeed=-1;
    var timer=null;
    timer=setInterval(function(){
    		console.log(oDiv.offsetLeft);
oDiv.style.left=oDiv.offsetLeft+iSpeed+'px';
    		if(oDiv.offsetLeft<-690)
    		{
    			oDiv.style.left='0px';
    		}
    		else if(oDiv.offsetLeft>0)
    		{
    			oDiv.style.left=-690+'px';
    		}
    	},30);
    oPrev.onclick=function()
    {
         iSpeed=-1;
    };
    oNext.onclick=function()
    {
         iSpeed=1;
    };
    oDiv.onmouseover=function()
    {
    	clearInterval(timer);
    };
    oDiv.onmouseout=function()
    {
    	timer=setInterval(function(){
    		console.log(oDiv.offsetLeft);
oDiv.style.left=oDiv.offsetLeft+iSpeed+'px';
    		if(oDiv.offsetLeft<-690)
    		{
    			oDiv.style.left='0px';
    		}
    		else if(oDiv.offsetLeft>0)
    		{
    			oDiv.style.left=-690+'px';
    		}
    	},30);
    };
};



