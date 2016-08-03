
window.onload=function(){
	calculater();

}
//
function calculater(){
	//[7,8,9,4,5,6,1,2,3,0,.]
	var num=document.getElementsByClassName('num');
	//[%,/,*,-,+]
	var opera=document.getElementsByClassName('opera');
	var reset=document.getElementById('reset');//
	var equal=document.getElementById('equal');//
	var show=document.getElementById('show');//
	var sum='0',flag=1,flag2=1,flag1=1,flag3=0,symbol;
	var figure='0';
	var Sum=0;

	for(var i=0;i<num.length;i++){
		num[i].index=i;
		num[i].onclick=function(){

			switch(this.index){
				case 0: 	if(flag==1||flag2==1){
							    if(flag2==1&&flag==1){
							    	show.innerHTML='7';
							    	sum='7';
							    }
							    else{
							    	show.innerHTML+='7';
							    	sum+='7';
							    }
						     }
						     else{
						     	show.innerHTML+='7';
						     	figure+='7';
						     }
						     break;

				case 1: 	if(flag==1||flag2==1){
							    if(flag2==1&&flag==1){
							    	show.innerHTML='8';
							    	sum='8';
							    }
							    else{
							    	show.innerHTML+='8';
							    	sum+='8';
							    }
						     }
						     else{
						     	show.innerHTML+='8';
						     	figure+='8';
						     }
						     break;

				case 2: 	if(flag==1||flag2==1){
							     if(flag2==1&&flag==1){
							    	show.innerHTML='9';
							    	sum='9';
							    }
							    else{
							    	show.innerHTML+='9';
							    	sum+='9';
							    }
						     }
						     else{
						     	show.innerHTML+='9';
						     	figure+='9';

						     }
						     break;
				case 3: 	if(flag==1||flag2==1){
							    if(flag2==1&&flag==1){
							    	show.innerHTML='4';
							    	sum='4';
							    }
							    else{
							    	show.innerHTML+='4';
							    	sum+='4';
							    }
						     }
						     else{
						     	show.innerHTML+='4';
						     	figure+='4';
						     }
						     break;
				case 4: 	if(flag==1||flag2==1){
							    if(flag2==1&&flag==1){
							    	show.innerHTML='5';
							    	sum='5';
							    }
							    else{
							    	show.innerHTML+='5';
							    	sum+='5';
							    }
						     }
						     else{
						     	show.innerHTML+='5';
						     	figure+='5';
						     }
						     break;
				case 5: 	if(flag==1||flag2==1){
							    if(flag2==1&&flag==1){
							    	show.innerHTML='6';
							    	sum='6';
							    }
							    else{
							    	show.innerHTML+='6';
							    	sum+='6';
							    }
						     }
						     else{
						     	show.innerHTML+='6';
						     	figure+='6';
						     }
						     break;
				case 6: 	if(flag==1||flag2==1){
							    if(flag2==1&&flag==1){
							    	show.innerHTML='1';
							    	sum='1';
							    }
							    else{
							    	show.innerHTML+='1';
							    	sum+='1';
							    }
						     }
						     else{
						     	show.innerHTML+='1';
						     	figure+='1';
						     }
						     break;
				case 7: 	if(flag==1||flag2==1){
							    if(flag2==1&&flag==1){
							    	show.innerHTML='2';
							    	sum='2';
							    }
							    else{
							    	show.innerHTML+='2';
							    	sum+='2';
							    }
						     }
						     else{
						     	show.innerHTML+='2';
						     	figure+='2';
						     }
						     break;
				case 8: 	if(flag==1||flag2==1){
							    if(flag2==1&&flag==1){
							    	show.innerHTML='3';
							    	sum='3';
							    }
							    else{
							    	show.innerHTML+='3';
							    	sum+='3';
							    }
						     }
						     else{
						     	show.innerHTML+='3';
						     	figure+='3';
						     }
						     break;
				case 9: 	if(flag==1||flag2==1){
							    if(flag2==1&&flag==1){
							    	show.innerHTML='0';
							    	sum='0';
							    	flag4=1;
							    }
							    else{
							    	if (flag4) {
							    		sum='0';
							    	} else {
							    		show.innerHTML+='0';
							    		sum+='0';
							    	}
							    }
						     }
						     else{
						     	show.innerHTML+='0';
						     		figure+='0';
						     }
						     break;
				case 10: if(flag==1||flag2==1){
							if(flag2==1&&flag==1){
							    	show.innerHTML='.';
							    	sum='0.';
							    }
							    else{
							    	show.innerHTML+='.';
							    	sum+='.';
							    }
							}
						else{
							show.innerHTML+='.';
							figure+='.';
							}
							break;

				}
			flag=0;
		}
	}

	for(var j=0;j<opera.length;j++){

		opera[j].index=j;
		opera[j].onclick=function(){

			switch(this.index){
					case 0: show.innerHTML+='%';
							symbol='%';
							break;

					case 1: show.innerHTML+='÷';
							symbol='÷';
							break;
					case 2: show.innerHTML+='×';
							symbol='×';
							break;
					case 3: show.innerHTML+='-';
							symbol='-';
							break;
					case 4: show.innerHTML+='+';
							symbol='+';
							break;
			}
			if(flag2){
				Sum=parseFloat(sum);}
			flag=0;
			flag2=0;
			figure='0';
			sum='0';
		}
	}

	// 重置
	reset.onclick=function(){
		show.innerHTML='0';
		flag=1;
		flag2=1;
		sum='0';
	}
//触发计算
	equal.onclick=function(){
		show.innerHTML='=';
		switch(symbol){
			case '+': Sum=add(Sum,parseFloat(figure));
					  break;
			case '-': Sum=sub(Sum,parseFloat(figure));
					  break;
			case '×': Sum=mul(Sum,parseFloat(figure));
					  break;
			case '÷': Sum=div(Sum,parseFloat(figure));
					  break;
			case '%': flag3=1;
					  break;
		}
		if (flag3) {
			show.innerHTML+=Sum+'%';
		} else {
			show.innerHTML+=Sum;
		}
		figure='0';
		flag1=1;
		flag3=0;
		flag4=0;
	}
//加法
function add(a, b) {
    var c, d, e,g;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    finally{
    	e = Math.pow(10, Math.max(c,d));
    }
    return	(mul(a,e) + mul(b,e))/e;
	}

	//减法
function sub(a, b) {
    var c, d, e;
    try {
        c=a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d=b.toString().split(".")[1].length;
    } catch (f) {
        d=0;
    }
    finally{
    	e=Math.pow(10, Math.max(c, d));
    }
    return  (mul(a, e)-mul(b, e)) / e;
}
//乘法
function mul(a,b) {
    var c=0,d=a.toString(),e=b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
//除法
function div(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
	}


}

