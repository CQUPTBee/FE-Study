function Ajax(url,fnSucc,fnFaild) {
	//1.创建ajax对象
	//IE6以上
	//var oAjax=new XMLHttpRequest();
	//IE6
	//var oAjax=new ActiveXObject("Microsoft.XMLHttp");
	//兼容
	var oAjax=null;
	if (window.XMLHttpRequest) {
		oAjax=new XMLHttpRequest();
	}
	else{
		oAjax=new ActiveXObject("Microsoft.XMLHttp");
	}

	//2.链接服务器
	oAjax.open('GET',url,true);
	
	//3.发送请求
	oAjax.send();

	//4.接受返回
	oAjax.onreadystatechange=function(){
		if (oAjax.readyState==4) {
			if (oAjax.status==200) {
				fnSucc(oAjax.responseText);
			}
			else{
				fnFaild();
			}
		}
		
	}
}