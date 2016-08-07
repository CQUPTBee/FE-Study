/*Ajax调用函数*/
function ajax(url,fSunc,fnFaild) {
	var oAjax=new XMLHttpRequest();

	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if((oAjax.status>=200&&oAjax.status<300) ||oAjax.status == 304){
				fSunc(oAjax.responseText);
			}
			else{
				fnFaild();
			}
		}
	};
	oAjax.open("GET",url,false);
	oAjax.send(null);
 }