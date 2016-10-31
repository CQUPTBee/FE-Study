function setCookie(name,value,iDay) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);
	document.cookie = name + '=' + value + ';expires=' + oDate;
}
function getCookie(name) {
	//'username=abc;password=123456;...'
	var arr = document.cookie.split(';');
	//arr->['username=abc', 'password=123456',...]
	var i = 0;
	for (var i = 0; i < arr.length; i++) {
		//arr2->['username', 'abc']
		var arr2 = arr[i].split('=');
		if (arr2[0] == name) {
			return arr2[1];
		}
	}
	//整个循环结束后也没找到东西
	return '';
}
function removeCookie(name) {
	setCookie(name,'1',-1);
}

$(function (){
	//顶部cookie
	$(".cookie-right").click(function() {
		$("#cookie-bg").hide();
		setCookie("tip","off",30 );
	})
	if (getCookie("tip")  == "off") {
		$(".cookie-bg").hide();
	}
	//登录cookie
	$(".concern button").click(function() {
		setCookie("username",$("#username").val(),30);
		setCookie("password",$("#password").val(),30);
		console.log($name);
	})
	if(getCookie("username") == "abc" && getCookie("password") == "123") {
		$(".concern").hide();
		$(".nav p").show();
	}
});
