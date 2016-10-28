var oBox1=document.getElementById('box1');
var oBox2=document.getElementById('box2');
var timer=null;

	oBox1.onmouseover=function () {
	
		oBox2.style.display='block';
		clearTimeout(timer);
	};

	oBox1.onmouseout=function () {
		
		
		timer=setTimeout(function() {

			oBox2.style.display='none';
		},600)
	};

	oBox2.onmouseover=function () {

		clearTimeout(timer);
	}

	oBox2.onmouseout=function () {

		timer=setTimeout(function() {

			oBox2.style.display='none';
		},600)
	}
