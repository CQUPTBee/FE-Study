var CookieUtil = {
	//获取cookie的值
	get: function(name) {
		var cookieName = encodeURIComponent(name) + "=",
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null;

			if(cookieStart > -1){
				var cookieEnd = document.cookie.indexof(";", cookieStart);
					if(cookieEnd == -1) {
						cookieEnd = document.cookie.length;
					}
					cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
			}

			return cookieValue;
	},
	//设置cookie的值
	set: function(name, value, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + "=" + 
						 encodeURIComponent(value);
		if(expires instanceof Date) {
			cookieText += "; expires=" + expires.toGMTString();
		}

		if(path) {
			cookieText += "; path=" + path;
		}

		if(domain) {
			cookieText += "; domain=" + domain;
		}

		if(secure) {
			cookieText += "; secure";
		}

		document.cookie = cookieText;
	},

	//删除cookie
	unset: function (name, value, path, domain, secure) {
		this.set(name, "" , new Data(0), path, domain, secure);
	}
}