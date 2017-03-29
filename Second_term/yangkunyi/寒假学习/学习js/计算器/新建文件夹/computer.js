var values=[];
var j=0;
for (j = 3; j>0; j--) {
	values[j]="";
}

function computer() {
	
	var oUl=document.getElementsByTagName('ul')[0];
	var oInputs=oUl.getElementsByTagName('input');
	var clean=document.getElementById('clean');
	var oValue=document.getElementsByClassName('computer')[0].getElementsByTagName('input')[0];
	
	clean.onclick=function(){
		oValue.value="";
		for (j = 3; j>0; j--) {
			values[j]="";
		}
	};

	for (var i = 0; i < oInputs.length; i++) {
		this.value=oInputs[i].value;

		oInputs[i].onclick=function(){
			
			if (this.value=="=") {
				values[j]=oValue.value;
				oValue.value=count();
			}
			else if (j>1) {
				if (!isNaN(parseInt(this.value))  &&  !isNaN(parseInt(oValue.value))) {
					
					if (values[2]=="") {
						oValue.value+=this.value;
					}

					else if((oValue.value.indexOf('.',0)>0)  && (!values[0]==oValue.value)){

						oValue.value+=this.value;
					}

					else if (this.value==".") {
						oValue.value+=this.value;
					}
					else {
						oValue.value=this.value;
					}
				}

				else if((oValue.value.indexOf('.',0)>0)&&(parseInt(this.value)>=0 && parseInt(this.value)<=9)){
					oValue.value+=this.value;
				}

				else if (oValue.value=="+" || oValue.value=="-" || oValue.value=="×" || oValue.value=="/" || !isNaN(parseInt(this.value))) {
					oValue.value=this.value;
				}

				else if (this.value==".") {
					oValue.value+=this.value;
				}
				// else if(oValue.value.indexOf('.',0)>0){
				// 	oValue.value+=this.value;
				// }

				// else if(parseInt(oValue.value)>=0 && parseInt(oValue.value)<=9){
				// 	oValue.value=this.value;
				// }

				else if (this.value=="+" || this.value=="-" || this.value=="×" || this.value=="/") {
					values[3]=this.value;
					values[j]=oValue.value;
					oValue.value=count();
				}

				
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
		if (values[3]!=="") {
			values[1]=values[3];
			values[3]="";
			values[0]=sum;
			j=2;
			return sum;
		}
		else{
			j=0;
			values[j]="";
			return sum;
		}
	}
	
	else if (values[1]=="×") {
		var sum=parseFloat(values[0])*parseFloat(values[2]);
		if (values[3]!=="") {
			values[1]=values[3];
			values[3]="";
			values[0]=sum;
			j=2;
			return sum;
		}
		else{
			j=0;
			values[j]="";
			return sum;
		}
	}
	
	else if (values[1]=="/") {
		var sum=parseFloat(values[0])/parseFloat(values[2]);
		if (values[3]!=="") {
			values[1]=values[3];
			values[3]="";
			values[0]=sum;
			j=2;
			return sum;
		}
		else{
			j=0;
			values[j]="";
			return sum;
		}
	}
	
	else if (values[1]=="-") {
		var sum=parseFloat(values[0])-parseFloat(values[2]);
		if (values[3]!=="") {
			values[1]=values[3];
			values[3]="";
			values[0]=sum;
			j=2;
			return sum;
		}
		else{
			j=0;
			values[j]="";
			return sum;
		}
	}
	
		// if (values[3]!=="") {
		// 	values[2]=values[3];
		// 	values[3]="";
		// 	j=2;
		// 	return sum;
		// }
		// else{
		// 	j=0;
		// 	values[j]="";
		// 	return sum;
		// }
}


addLoadEvent(computer);