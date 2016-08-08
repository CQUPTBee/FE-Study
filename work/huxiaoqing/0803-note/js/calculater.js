
	//鼠标点击效果

	//获取class
	function getByClass (oParent, sClass) {

		var aEL=oParent.getElementsByTagName('*');
		var aResult=[];
		var i=0;

		for (i=0; i<aEle.length; i++) {

			if( aEle[i].className == sClass) {

				aResult.push(aEle[i]);
			}
		}
		return aResult;
	};


	var oDiv=document.getElementsByTagName('*');
	var aBtn= getByClass(oDiv,'btn');
	var oPre= getByClass(oDiv,'opretor');
	var i=0;
	var innum=0;	//第一次输入值
	var onnum=0;	//保存第一次输入值
	var res=0;	//转换Number类型
	var opre=" ";	//保存输入的操作符

	//获取数字键的值
	aBtn.onclick=function () {
		for (i=0; i< aBtn.length; i++) {
			innum=this.aBtn[i].value;
		}
	};

	//获取运算符
	oPre.onclick=function () {
		for (i=0; i< oPre.length; i++) {
			opre=this.oPre[i].value;
		}
	}

	//输入数字
	function InputNum(innum) {
		if(document.getElementById('in').value== "0") {
			document.getElementById('in').value=innum;
		}
		else {
			document.getElementById('in').value+=innum;
		}
		return 	document.getElementById('in').value;	
	};
	
	//加减乘除运算
	function way (opre) {
		
		onnum = document.getElementById('in').value;
		if(innum=="0") {
			if(opre =="+" || opre=="-") {
				innum=onnum;
			}
			else {
				innum="0"
			}
		}	
		else {
			switch (opre) {
			case "+":
				innum += parseFloat(onnum);
				break;
			case "+":
				innum -= parseFloat(onnum);
				break;
			case "+":
				innum *= parseFloat(onnum);
				break;
			default 
				innum /= parseFloat(onnum);
		}
		document.getElementById('in').value = innum;
		}
		
	};

	//AC键
	function ClearAll () {
		innum = 0;
		opre= " ";
		document.getElementById('in').value = "0";
	};

	//小数点
	function point () {

	};

	// % 计算
	function percent () {
		document.getElementById('in').value = (parseFloat(document.getElementById('in').value)/100);

	};



	
