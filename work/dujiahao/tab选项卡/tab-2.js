window.onload=function(){
	tab();
}

function tab(){
	var naver=document.getElementsByClassName("nav")[0];
	var cli=naver.getElementsByTagName("li");
	var pic=document.getElementsByClassName("box");

	for(var i=0;i<cli.length;i++)
	{
		cli[i].index=i;
		cli[i].onclick=function(){
		for(var i=0;i<cli.length;i++){
				cli[i].className='';
				pic[i].style.display='none';
			}
			this.className='active';
			pic[this.index].style.display='block';

		};
	}
}