function ajax(url,fnSucc,fnFaild)
{
	//创建ajax对象
	var oAjax=null;

	if(window.XMLHttpRequest)
	{
		oAjax=new XMLHttpRequest();
	}
	else
	{
		oAjax=new ActiveXobject("Microsoft.XMLHTTP");
	}
	//连接服务器
	//open(方法，url,是否异步)
	oAjax.open('GET',url,true);
	//发送请求
	oAjax.open();
	//返回
	oAjax.onreadystatechange=function()
	{
		if(oAjax.readyState==4){
			if (oAjax.status==200)
			{
				fuSucc(oAjax.responseText);
			}else{
				if(fnFaild)
				{
					fnFaild();
				}

			};
		}
	}
}
