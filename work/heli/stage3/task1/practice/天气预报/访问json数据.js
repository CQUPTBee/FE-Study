/* //JSON.parse()将json数据解析为js对象
  //JSON.stringify()将js数据转换为json格式的数据
  //利用Ajax技术访问在线json数据

		//发送同步请求
		 var xhr = new XMLHttpRequest();//原生的XHR对象
		xhr.open("get","http://openweathermap.org/data/2.5/forecast/daily?id=1814906&appid=b1b15e88fa797225412429c1c50c122a",flase);//启动请求以备发送
		xhr.send(null);//在收到响应后，响应的数据会自动填充XHR对象的属性。

		if((xhr.status >= 200 && xhr.status <300) || xhr.status == 304){
		console.log(xhr.responseXML);//这里是json文件啊？？？
		} else {
		console.log("unsuccessful:"+ xhr.status);
		}

	//通常情况下，发送的是异步请求，可以检测XHR对象的readyState属性：
	//0：未初始化，尚未调用open()方法；  1：启动。已经open(),未调用send()
	//2: 发送。已经调用send()，但未响应；3：接收。已收到部分响应数据。
	//4： 完成，已接受到全部响应数据，可以在客户端使用了。
*/
//访问数据：
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4){
		if((xhr.status >= 200 && xhr.status <300) || xhr.status == 304){		
			var json = xhr.responseText;
			//debugger;
			var obj = jsonParse(json);
			var i = 0;
			var temp = new Array();
				for(i=0;i<5;i++){
				 	temp[i] = obj.list[i];
			    }				
			setHtml(temp);
		} else {
			console.log("unsuccessful:"+ xhr.status);
		}
	}
};
var url = "http://openweathermap.org/data/2.5/forecast/daily?id=1814906&appid=b1b15e88fa797225412429c1c50c122a";
xhr.open("get", url, true);
xhr.send(null);

function jsonParse(txt){
	var js = JSON.parse(txt);
	return js;
}

function setHtml(atemp){
	var tempD = document.getElementsByClassName("temp");
	//console.log(tempD);
	var temp1 = document.getElementsByClassName("tempDetail1");
	var temp2 = document.getElementsByClassName("tempDetail2");
	var temp3 = document.getElementsByClassName("tempDetail3");
	var temp4 = document.getElementsByClassName("tempDetail4");
	var temp5 = document.getElementsByClassName("tempDetail5");
	var temp6 = document.getElementsByClassName("tempDetail6");
	var temp7 = document.getElementsByClassName("tempDetail7");		

	for(var i=0;i<tempD.length;i++){
		tempD[i].innerHTML = atemp[i].temp.day; 
		temp1[i].innerHTML = atemp[i].temp.min; 
		temp2[i].innerHTML = atemp[i].temp.max; 
		temp3[i].innerHTML = atemp[i].temp.night; 
		temp4[i].innerHTML = atemp[i].temp.eve; 
		temp5[i].innerHTML = atemp[i].temp.morn; 
		//temp6[i].innerHTML = atemp[i].weather[i].description
		temp7[i].innerHTML = atemp[i].clouds; 
	}
}













