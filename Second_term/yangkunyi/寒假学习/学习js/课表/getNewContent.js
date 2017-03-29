
function getNewContent(url, fnSucc, fnFaild) {//url是地址，fnSuss是成功执行的函数，fnFaild是失败执行的函数
	//创建Ajax对象
	var request = getHTTPObject();
	if (request) {
		//连接服务器
		request.open("GET",url,true);
		//发送请求
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				// alert("Respons Recevied");
				// var para = document.createElement("p");
				// var txt = document.createTextNode(request.responseText);
				// para.appendChild(txt);
				// document.getElementById('new').appendChild(para);
				fnSucc(request.responseText);
			}
		};
		//接收返回
		request.send(null);
	}
	else {
		fnFaild();
	}
}


// function ajax(url, fnSucc, fnFaild) {//url,文件地址 fnSucc，一个函数
// 	//1、创建ajax对象
//     var oAjax = new XMLHttpRequest();
//     //2、连接服务器
//   	oAjax.open('GET',url,true);
//  	 //3、发送请求
//  	oAjax.send();
//  	 //4、接收返回
//  	oAjax.onreadystatechange = function(){
//  	    if (oAjax.readyState == 4) {
//   	  		if(oAjax.status == 200) {
//        			fnSucc(oAjax.responseText);
//        	    }
//        	    else {
//        	    	fnFaild();
//        	    }
//     	}
//     };
// }