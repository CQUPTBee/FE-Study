//练习
// function ajax(url,fnSucc,fnFaild)
// {
// 	//创建ajax对象
// 	var aAjax=null;

// 	if(window.XMLHTTPRequest)
// 	{
// 		oAjax=new XMLHTTPRequest();
// 	}
// 	else
// 	{
// 		oAjax=new ActiveXObject("Microsoft.XMLHTTP");
// 	}
// 	//2.连接服务器
// 	//open(方法。url，是否异步)
// 	oAjax.open('GET',url,true);
// 	//3,发送请求
// 	oAjax.send();
// 	//4接受返回值
// 	oAjax.onreadystatechange=function()
// 	{
// 		if(oAjax.readystate==4)
// 		{
// 			if(oAjax.status==200)
// 			{
// 				fnSucc(oAjax.responseText);
// 			}
// 			else
// 			{
// 				if(fnFailed)
// 				{
// 					fnFailed();
// 				}
// 			}
// 		}
// 	}
// };



function ajax(url, fnSucc, fnFaild)
{
	//1.创建ajax对象
	var oAjax=null;
	
	if(window.XMLHttpRequest)
	{
		oAjax=new XMLHttpRequest();
	}
	else
	{
		oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	//2.连接服务器
	//open(方法, url, 是否异步)
	oAjax.open('GET', url, true);
	
	//3.发送请求
	oAjax.send();
	
	//4.接收返回
	//OnReadyStateChange
	oAjax.onreadystatechange=function ()
	{
		if(oAjax.readyState==4)
		{
			if(oAjax.status==200)
			{
				//alert('成功：'+oAjax.responseText);
				fnSucc(oAjax.responseText);
			}
			else
			{
				if(fnFaild)
				{
					fnFaild();
				}
			}
		}
	};
}