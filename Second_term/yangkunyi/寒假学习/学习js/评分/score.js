var aData=['很差','较差','一般','推荐','力荐'];
function score() {
	var oDiv= document.getElementsByClassName('score')[0];
	var aLi=oDiv.getElementsByTagName('li');
	var oP=oDiv.getElementsByTagName('p')[0];
	var i=0;

	for (i = 0; i < aLi.length; i++) {
		aLi[i].index=i;
		aLi[i].onmouseover=function(){
			oP.style.display='block';
			oP.innerHTML=aData[this.index];
			for (i = 0; i <= this.index; i++) {
				aLi[i].className="active";
			}
		};
		aLi[i].onmouseout=function(){
			oP.style.display='none';

			for (i = 0; i < aLi.length; i++) {
				aLi[i].className="";
			}
		};
		aLi[i].onclick=function(){
			alert('评分成功，'+(this.index+1)+'分');	
		};
	}
}
addLoadEvent(score);