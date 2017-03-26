function nav() {
	var nav = document.getElementsByClassName('nav')[0];
	var aLi = nav.getElementsByClassName('lis');
	var aA = [];
	var aUlli = [];
	var oTimer = null;
	var i = 0;
	for(i=0;i<aLi.length;i++){
		aA.push(aLi[i].getElementsByTagName('a')[0]);
		aUlli.push(aLi[i].getElementsByTagName('ul')[0]);
	}
	for (i = 0; i < aLi.length; i++) {
		aA[i].miaovIndex = i;
		aA[i].onmouseover = function(){
			if (oTimer) {
				clearTimeout(oTimer);
				oTimer = null;
			}
			for (var i = 0; i < aLi.length; i++) {
				aA[i].className='';
				aUlli[i].style.display='none';
			}
			aA[this.miaovIndex].className='hovered';
			aUlli[this.miaovIndex].style.display = 'block';
		};
		aA[i].onmouseout = function(){
			var index = this.miaovIndex;
			oTimer = setTimeout(function(){
				aUlli[index].style.display='none';
				oTimer=null;
			},1000);
		};
		aUlli[i].miaovIndex = i;
		aUlli[i].onmouseover=function(){
			if (oTimer) {
				clearTimeout(oTimer);
				oTimer=null;
			}
		};
		aUlli[i].onmouseout=function(){
			var index=this.miaovIndex;
			oTimer=setTimeout(function(){
				aUlli[index].style.display='none';
				aA[index].className='';
				oTimer=null;
			},1000);
		}
	}
}
addLoadEvent(nav);