//检查浏览器是否支持某种类型的输入控件
function inputSupportsType(type){
	if(!document.createElement){return false};
	var input=document.createElement('input');
	input.setAttribute('type',type);
	if (input.type=='text'&&type!='text') {
		return false;
	}
	else{
		return true;
	}
}