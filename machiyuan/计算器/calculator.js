//获取keys
var aKeys=document.querySelectorAll('#calculator span');
var operators=['+','-','x','÷'];
var bDecimalAdded=false;
//添加鼠标点击事件
for (var i = 0; i < aKeys.length; i++)
{
 aKeys[i].onclick=function(e)
 {
 	//获取输入值和键盘值
 	var oInput=document.querySelector('.screen');
 	var aInputVal=oInput.innerHTML;//屏幕输入
 	var sBtnVal=this.innerHTML;//点击值
 	//clear键清除
 	if (sBtnVal=='C')
 	{
 		oInput.innerHTML='';
 		bDecimalAdded=false;
 	}

 	 else if (sBtnVal=='=')
 	{

 		var equation=aInputVal;//方程式
 		var lastChar=equation[equation.length-1]//lastchar

			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

			if(operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');
			if(equation)
				oInput.innerHTML = eval(equation);
			bDecimalAdded = false;
	}

    	else if(operators.indexOf(sBtnVal) > -1)
    	{

			// 从表达式获取最后一个字符
			var lastChar = aInputVal[aInputVal.length - 1];

			//只有当输入不为空切最后一位不是运算符时可以加入运算符
	 		if (aInputVal!=''&& operators.indexOf(lastChar)==-1 )
	 			oInput.innerHTML+=sBtnVal;

	 		//字符串为空允许'-'
	 		else if(aInputVal==''&& sBtnVal=='-')
	 			oInput.innerHTML+=sBtnVal;

	 		//更新操作符
	 		if(operators.indexOf(lastChar)>-1 && aInputVal.length>1)
	 		{

	 			oInput.innerHTML=aInputVal.replace(/.$/,sBtnVal);
	 		}
	 		bDecimalAdded=false;
 		}

 	else if(sBtnVal=='.')
 	{
 		if (!bDecimalAdded) {
 			oInput.innerHTML +=sBtnVal;
 			bDecimalAdded=true;
 		};
 	}
 	else{
 		oInput.innerHTML+=sBtnVal;
 	}
 	//
 	e.preventDefault();
 }
};
