
window.onload=function ()
{
	var aTopMenu=document.getElementsByTagName('span');
	var aSecMenu=document.getElementById('mainMenu').getElementsByTagName('ul');
	var i=0;
	var timer=null;
	for(i=0; i<aTopMenu.length; i++)
	{
		aTopMenu[i].index=i;

		aTopMenu[i].onmouseover=function ()
		{
			for(i=0;i<aTopMenu.length; i++)
			{
				aSecMenu[i].style.display='none';
			}
			var that=this;
			clearTimeout(timer);
			aSecMenu[that.index].style.display='block';
		};

		aTopMenu[i].onmouseout=function ()
		{
			var that=this;
			timer=setTimeout(function ()
			{
				aSecMenu[that.index].style.display='none';
			}, 300);
		};

		aSecMenu[i].onmouseover=function ()
		{
			clearTimeout(timer);
		};

		aSecMenu[i].onmouseout=function ()
		{
			var that=this;
			timer=setTimeout(function ()
			{
				that.style.display='none';
			}, 300);
		};
	}
};