
window.onload=function(){
	calculater();

}
//
function calculater(){
	//[7,8,9,4,5,6,1,2,3,0,.]
	var num=document.getElementsByClassName('num');
	//[%,/,*,-,+]
	var opera=document.getElementsByClassName('opera');
	var reset=document.getElementById('reset');//重置
	var equal=document.getElementById('equal');//等于
	var show=document.getElementById('show');//展示栏
	var j ,sum = "0",figure = "0", symbol;
	var aOpera=['%','÷','×','-','+'] ,aNum = ['7','8','9','4','5','6','1','2','3','0','.'];
	var flag1 = 1,flag2 = 1,flag3=1,flag4=1;//默认为1，,0输入结束，1未输入或未输入结束。
					//flag1为第一个数（仅用于第一次计算），flag2为第-个数判断个位（重复使用）
//flag3用于判断第二个数的第一位输入情况,flag4判断符号重复,默认1可输入0不可输入；

	show.innerHTML = "0";
	getNumber();
	getOpera();
	getAnswer();
	Reset();

/*获得数*/
function getNumber() {
	for(j=0;j<num.length;j++){

		num[j].index = j;
		num[j].onclick = function(){
			j=this.index;
			switch(j){
				/*7*/

				case 0:judge();

				break;
                 /*8*/

				case 1:judge();
				break;
                 /*9*/
				case 2:judge();
				break;
                 /*4*/

				case 3:judge();
				break;
                 /*5*/

				case 4:judge();
				break;
                 /*6*/

				case 5:judge();
				break;
                 /*1*/

				case 6:judge();
				break;
                 /*2*/

				case 7:judge();
				break;
                 /*3*/

				case 8:judge();
				break;
                 /*0*/

				case 9:judge();
				break;

				case 10:judge();
				break;


			}
		}
	}
};
//获取每个数
function judge(){
	//输入第一个数
	if(flag1){
	//判断第一次输入的数 0输入完毕
		if(flag2){
			if(aNum[j]!='0'&&aNum[j]!='.'){
				sum=aNum[j];flag2=0;
				show.innerHTML=aNum[j];
		}
			else if(aNum[j] == '.'){
				sum+=aNum[j];flag2=0;
				show.innerHTML+=aNum[j];
				}
	}
	else{
		if(aNum[j]!='0'&&aNum[j]!='.'){//如果不是0或者.就直接加上
				sum+=aNum[j];
				show.innerHTML+=aNum[j];
		}
		else if(aNum[j]=='0'){
			sum+=aNum[j];show.innerHTML+=aNum[j];
		}
		else if(aNum[j]=='.'){
			if(sum.indexOf('.')==-1){
				sum+=aNum[j];show.innerHTML+=aNum[j];
			}
		}
	}
}
	//输入第二个数
	else{
		//判断第一次输入的数 0输入完毕
		if(flag3){
			if(aNum[j]!='0'&&aNum[j]!='.'){
				figure=aNum[j];flag3=0;
				show.innerHTML+=aNum[j];
		}
			else if(aNum[j] == '.'){
				figure+=aNum[j];flag3=0;
				show.innerHTML+='0'+aNum[j];
				}
			else if(aNum[j]=='0'){
				show.innerHTML+=aNum[j];flag3=0;
			}
	}
	else{

		if(aNum[j]!='0'&&aNum[j]!='.'){//如果不是0或者.就直接加上
				figure+=aNum[j];
				show.innerHTML+=aNum[j];
			}
		else if(aNum[j]=='0'){
			figure+=aNum[j];show.innerHTML+=aNum[j];
			}
		else if(aNum[j]=='.'){
			if(figure.indexOf('.')==-1){
				figure+=aNum[j];show.innerHTML+=aNum[j];
				}
			}
		}
	}
};


/*获得操作符*/
function getOpera(){
		for( j=0;j<opera.length;j++){

		opera[j].index=j;
		/*获得点击事件 */
		opera[j].onclick=function(){
			j=this.index;
			switch(j){
					case 0:
							if(flag1){sum=(parseFloat(sum)/100).toString()};
							flag1=0;//使其不可在输入
							figure=(parseFloat(figure)/100).toString();
							show.innerHTML+=aOpera[j];
							break;

					case 1:if(flag4){
							symbol=aOpera[j];flag4=0;flag1=0;//使其不可在输入
							show.innerHTML+=aOpera[j];}
							break;
					case 2:if(flag4){
							symbol=aOpera[j];flag4=0;flag1=0;//使其不可在输入
							show.innerHTML+=aOpera[j];}
							break;
					case 3:if(flag4){
							symbol=aOpera[j];flag4=0;flag1=0;//使其不可在输入
							show.innerHTML+=aOpera[j];}
							break;
					case 4:if(flag4){
							symbol=aOpera[j];flag4=0;flag1=0;//使其不可在输入
							show.innerHTML+=aOpera[j];}
							break;
			}
		}
	}
};
function getAnswer() {

	equal.onclick = function(){
		console.log(sum);console.log(figure);
		switch(symbol){
			case '+' :sum=add(parseFloat(sum),parseFloat(figure));
			break;
			case '-' :sum=sub(parseFloat(sum),parseFloat(figure));
			break;
			case '÷' :sum=div(parseFloat(sum),parseFloat(figure));
			break;
			case '×' :sum=mul(parseFloat(sum),parseFloat(figure));
			break;

		}


		show.innerHTML = '=' + sum;
		flag2 = 1;flag4=1,flag3=1;
		figure = "0";

	}
};

function Reset() {

	reset.onclick = function(){
		show.innerHTML = "0";sum = "0";figure = "0",symbol = '',j=0;
		flag1 = 1,flag2 = 1,flag3 = 1,flag4 = 1;
		}
	};
}