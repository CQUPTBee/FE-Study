function ajax(url, fnSucc, fnFaild) {//url,文件地址 fnSucc，一个函数
	//1、创建ajax对象
    var oAjax = new XMLHttpRequest();
    //2、连接服务器
  	oAjax.open('GET',url,true);
 	 //3、发送请求
 	oAjax.send();
 	 //4、接收返回
 	oAjax.onreadystatechange = function(){
 	    if (oAjax.readyState == 4) {
  	  		if(oAjax.status == 200) {
       			fnSucc(oAjax.responseText);
       	    }
       	    else {
       	    	fnFaild();
       	    }
    	}
    };
}