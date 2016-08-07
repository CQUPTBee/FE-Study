

window.onload=function(){
	start();
}

function start(){
	var num,sub,flag;
	var btn=document.getElementsByClassName("start")[0];
	var sub=document.getElementsByTagName("p")[0];
	flag=1;

	btn.onclick=function(){
		num=document.getElementsByClassName("set")[0].value;

		if(num==''){
			alert("请您设置时间!");
		}
		else if(isNaN(Number(num))||(num<0)){
			alert("请输入一个正整数！");
		}
		else{
				sub.innerHTML=num;
				var timer=setInterval(function(){
					if(num>0)
					{
						num--;
						sub.innerHTML=num;
					}
					else{
						sub.innerHTML='';
						clearInterval(timer);

					}
				},1000);
		}
	};
}