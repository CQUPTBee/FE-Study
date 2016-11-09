window.onload = function(){
	var oDiv = document.getElementById('nav');;
	var aLi = oDiv.getElementsByTagName('li');

	var i=0;
	for( i=0;i<length;i++){
		if(aLi[i].className=='nav_li'){
			aLi[i].onmouseover=function(){
				var oH2=this.getElementsByTagName('h2')[0];
				var oDivList=this.getElementsByTagName('div')[0];

				oH2.className = 'active';
				oDivList.style.display = 'block';
			};

			aLi[i].onmouseout=function(){
				var oH2=this.getElementsByTagName('h2')[0];
				var oDivList=this.getElementsByTagName('div')[0];

				oH2.className = ' ';
				oDivList.style.display = 'none';
			};
		}

		else if(aLi[i].className=='list_li'){
			aLi[i].onmouseover=function(){
				var oDiv=this.getElementsByTagName('div')[0];
				var oDiv.style.display='block';
			};
			aLi[i].onmouseout=function(){
				var oDiv=this.getElementsByTagName('div')[0];
				var oDiv.style.display='none';
			};
		}
	}
};