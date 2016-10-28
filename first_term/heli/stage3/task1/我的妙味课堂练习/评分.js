window.onload = function (){ 
	var oDiv = document.getElementById('restimate');
	var oLi = document.getElementsByTagName('li'); 
  var oData=['极差','较差','一般','推荐','力荐'];
  var i=0;
  for(var i=0;i<oLi.length;i++){
  	oLi[i].index = i;
  	oLi[i].onmouseover = function(){
  		oDiv.style.display = 'block';
  		oDiv.innerHTML = oData[this.index];
  		for(i=0;i<this.index;i++){
  			oLi[i].className = 'active';  			
  		}
  	};
  	oLi[i].onmouseout = function(){
  		oDiv.style.display = 'none';
  		for(i=0;i<oLi.length;i++){
  			oLi[i].className = ' ';
  		}
  	};
  }
};