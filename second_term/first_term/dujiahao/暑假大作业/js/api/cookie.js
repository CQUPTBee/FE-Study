define(function(){

		return {
			get:function(name){
				var cookieName = unescape(name) + "=",
				cookieStart = document.cookie.indexOf(cookieName),
				cookieValue = null;

				if(cookieStart > -1){
					var cookieEnd = document.cookie.indexOf(";",cookieStart);
					if(cookieEnd == -1){
						cookieEnd = document.cookie.length;
					}
					cookieValue = unescape(document.cookie.substring(cookieStart + cookieName.length,cookieEnd));

				}
				return cookieValue;
				// if (document.cookie.length>0)
				// {
				//   c_start=document.cookie.indexOf(name + "=")
				//   if (c_start!=-1)
				//     {
				// 	    c_start=c_start + name.length+1;
				// 	    c_end=document.cookie.indexOf(";",c_start);
				// 	    if (c_end==-1) c_end=document.cookie.length;
				// 	    return unescape(document.cookie.substring(c_start,c_end));
				//     }
				//   }
				// return "";
			},
			set:function(name,value,expires,path,domain,secure){
				var cookieText = escape(name) + "=" +
								escape(value);
				if(expires instanceof Date) {
					cookieText += ";expires" + expires.toGMTString();
				}
				if(path) {
					cookieText += "; path=" +path;
				}
				if(domain){
					cookieText += "; domain=" +domain;
				}
				if(secure){
					cookieText +="; secure";
				}
				// var exdate=new Date();
				// exdate.setDate(exdate.getDate()+expiredays);
				// document.cookie=name+ "=" +escape(value)+
				// ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
			},
			remove:function(name,path,domain,secure){
				this.set(name, "", new Date(0), path, domain, secure);
			}
		};
})