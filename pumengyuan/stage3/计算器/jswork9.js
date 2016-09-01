var oText = document.getElementsByTagName('input')[0];
var oTable= document.getElementById('table1');
var aBtn = oTable.getElementsByClassName('btn');
var aOPera = oTable.getElementsByClassName('operation');
var aNum = document.getElementsByClassName('num');
var change = false;
var Result = 0;
var operation = '';
function shownum() {
	for (var i = 0; i < aNum.length; i++) {
		aNum[i].index = i;
		aNum[i].onclick = function () {
			if (change) {
				oText.value = aNum[this.index].value;
				change = false;
			}
			else{
				if (oText.value == '0') {
					oText.value = aNum[this.index].value;
				}
				else {
					oText.value += aNum[this.index].value;
				}
			}
			
		};
	}
}
shownum();
function showoperation() {
	for (var i = 0; i < aOPera.length; i++) {
		aOPera[i].index = i;
		aOPera[i].onclick = function () {
			showoperation();
			var some = oText.value;
            var sign = aOPera[this.index].value;
            if(change && operation != '=');
            else {
				if (operation == '÷') {
					Result /= parseFloat(some);
				}
				else if (operation == '×') {
					Result *= parseFloat(some);
				}
				else if (operation == '-') {
					Result -= parseFloat(some);
				}
				else if (operation == '+') {
					Result += parseFloat(some);
				}
				else  {
					Result = parseFloat(some);
				}
            oText.value = Result;
            operation = sign;
			change = true;
            }
		};
	}
}
showoperation();
function showbtn() {
	for (var i = 0; i < aBtn.length; i++) {
		aBtn[i].index = i;
		aBtn[i].onclick = function () {
			var sign = aBtn[this.index].value;
			if (sign == '%') {
				oText.value = parseFloat(oText.value) / 100;
			}
			else if (sign == 'AC') {
				Result = 0;
				operation = '';
				oText.value = 0;
				change = true;
			}
			else if (sign == '.') {
				if (oText.value == '0') {
				oText.value = '0.';
				}
				else if (oText.value.indexOf('.') == -1) {
				oText.value += '.'
				}
			}
		};
	}
}
showbtn();
// aBtn[1].onclick = function () {

// 	Result = 0;
// 	operation = '';
// 	oText.value = 0;
// 	change = true;
// };
