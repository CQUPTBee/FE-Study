function ajax (url, fnSucc, fnFaild) {

	//创建Ajax对象
	var oAjax = new XMLHttpRequest();

	//连接服务器
	oAjax.open('GET', "http://openweathermap.org/data/2.5/forecast/%20daily?id=1814906&appid=b1b15e88fa797225412429c1c50c122a", true);

	//发送请求
	oAjax.send();

	//接收服务器的返回
	oAjax.onreadystatechange = function () {

		if(oAjax.readyState == 4){

			if(oAjax.status==200){
				
				fnSucc(oAjax.responseText);
			}
			else{
				
				if(fnFaild)
					fnFaild(oAjax.status);
			}

		}
	};
}

