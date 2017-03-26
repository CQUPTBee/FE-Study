function getNewContent() {
	var request = getHTTPObject();
	if (request) {
		request.open("GET","http://open.weibo.com/wiki/%E5%BE%AE%E5%8D%9AAPI",true);

		request.send(null);

		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				alert("Respons Recevied");
				// var para = document.createElement("p");
				// var txt = document.createTextNode(request.value);
				// para.appendChild(txt);
				// document.getElementById('oDiv').appendChild(para);
				success(request.responseText);
			}
		};	
	}
	else {
		alert('Sorry,you browser does\'t support XMLHttpRquest');
	}
}

function success(str){
	// debugger
	var weather=JSON.parse(str);

	var para = document.createElement("p");
	var txt = document.createTextNode(weather.weatherinfo.city);
	para.appendChild(txt);
	document.getElementById('oDiv').appendChild(para);
}

function getHTTPObject() {
	if (typeof XMLHttpRequest == "undefined") 
		XMLHttpRequest =function () {
			try {return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
				catch (e) {}
			try {return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
				catch (e) {}
			try {return new ActiveXObject("Msxml2.XMLHTTP");}
				catch (e) {}
			return false;
		}
	return new XMLHttpRequest();
}
addLoadEvent(getNewContent);