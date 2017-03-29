var values=[];
var j=0;
values[j]=0;

function computer() {
	
	var oUl=document.getElementsByTagName('ul')[0];
	var oInputs=oUl.getElementsByTagName('input');
	var clean=document.getElementById('clean');

	clean.onclick=function(){
		var oValue=document.getElementsByClassName('computer')[0].getElementsByTagName('input')[0];
		oValue.value="";
	};

	for (var i = 0; i < oInputs.length; i++) {
		this.value=oInputs[i].value;

		oInputs[i].onclick=function(){
			var oValue=document.getElementsByClassName('computer')[0].getElementsByTagName('input')[0];
			if (this.value=="=") {
				values[j]=oValue.value;
				oValue.value=count();
			}
			if (j>1) {
				if (oValue.value=="+" || oValue.value=="-" || oValue.value=="×" || oValue.value=="/") {
					oValue.value="";
				}
				oValue.value+=this.value;
			}
			else if (this.value=="." || (parseInt(this.value)>=0 && parseInt(this.value)<=9)) {
				oValue.value+=this.value;
			}
			else if(this.value=="+" || this.value=="-" || this.value=="×" || this.value=="/"){
				values[j]=oValue.value;
				oValue.value=this.value;//此处为何用this
				j++;
				values[j]=this.value;
				j++
			}
			
		};
	}
}

function count(){
	if (values[1]=="+") {
		var sum=parseFloat(values[0])+parseFloat(values[2]);
		j=0;
		return sum;
	}
	if (values[1]=="×") {
		var sum=parseFloat(values[0])*parseFloat(values[2]);
		j=0;
		return sum;
	}
	if (values[1]=="/") {
		var sum=parseFloat(values[0])/parseFloat(values[2]);
		j=0;
		return sum;
	}
	if (values[1]=="-") {
		var sum=parseFloat(values[0])-parseFloat(values[2]);
		j=0;
		return sum;
	}
}


addLoadEvent(computer);