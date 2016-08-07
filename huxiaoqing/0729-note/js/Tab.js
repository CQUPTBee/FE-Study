window.onload = function () {
	var aNav = document.getElementsByTagName('li');
	var aUl = document.getElementsByTagName('ul');
	var i=0;

	for (i=0; i < aNav.length; i++){

		aNav[i].index=i;
		aNav[i].onclick=function () {
			for(i=0; i< aNav.length; i++){
				aNav[i].className='';
				aUl[i].style.display='';
			}
			this.className='active';
			aUl[this.index].style.display='block';
		};
		
	}

};
	
