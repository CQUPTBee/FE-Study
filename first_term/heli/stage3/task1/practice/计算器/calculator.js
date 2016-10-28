	var num=0,result=0,numshow='0';
	var operate=0;//判断输入状态的标志，0表示输入的非运算符，1表示输入一个运算符
	var calcul=null;//判断计算状态的标志，数值对应相应的运算符
	var quit=0;//防止重复按键的标志

	var oTd = document.getElementsByTagName('td');
	var oBox = document.getElementById('result');
	var n = document.getElementsByClassName('number');
	var i = 0;

window.onload = function(){
	debugger;
	var dot = document.getElementById('dot');
	var oBox = document.getElementById('result');
	for(var i=0;i<n.length;i++){
			n[i].onclick = function(){
			num = this.innerHTML;
		var str = String(oBox.value);
			str = (str != '0')?((operate = 0) ? str : ' '):' ';
			str = str + String(num);
			oBox.value = str;
			operate = 0;
			quit = 0;
		};
	}

	dot.onclick = function(){
		var str = String(oBox.value);
			str = (str != '0')?((operate = 0) ? str : ' '):' ';
		for(var i=0;i<length;i++){
			if(str.substr(i,1) == '.'){
				return false;
			}
		}
		str = str + '.';
		oBox.value = str;
		operate = 0;
	};
	operat();
};

function operat(){
	var prst = document.getElementById('persent');		
	var d = document.getElementById('divide');
	var t = document.getElementById('times');
	var m = document.getElementById('minus');		
	var p = document.getElementById('plus');
	var e = document.getElementById('equal');
	var clrs = document.getElementById('clearscreen');

	prst.onclick = d.onclick = t.onclick = m.onclick = p.onclick = changeState(this);
	e.onclick = equal;
	clrs.onclick = clearS;
}

/*function changeState(obj){
	calculate();
	operate = 1;
	calcul = obj.innerHTML.toString();
}*/
function equal(){
	calculate();
	operate = 1;
	num = 0;
	result = 0;
	numshow = '0';
}
function clearS(){
	var oBox = document.getElementById('result');
	num = 0;
	result = 0;
	numshow = '0';
	oBox.value = '0';
}
debugger;
function calculate(){
	var oBox = document.getElementById('result');
	numshow=Number(oBox.value);
	if(quit!= 1){
		switch(calcul){
			case '%': result = num % numshow; break;
			case '÷': 
				if(numshow != 0 ){
					result = num / numshow;
				} 
				else { 
					alert("被除数不能为零！");
				} break;
			case '×': result = num * numshow; break;
			case '-': result = num - numshow; break;
			case '+': result = num + numshow; break;
		}
		equit = 1;//这里要避免按两次运算符键
	}		
	else {
		result = numshow;
	}	
numshow = String(result);
oBox.value = numshow;
}

