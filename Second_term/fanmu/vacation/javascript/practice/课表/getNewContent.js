function getNewContent(url, fnSucc, fnFaild) { //url是地址，fnSuss是成功执行的函数，fnFaild是失败执行的函数
    //创建Ajax对象
    var request = getHTTPObject();
    if (request) {
        //连接服务器
        request.open("GET", url, true);
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
    } else {
        fnFaild();
    }
}
	