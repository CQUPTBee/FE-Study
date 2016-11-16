var oWay = document.getElementById('ways');
var oInput = document.getElementById('input');
var oChange = document.getElementsByTagName('li');
var aWays = ['手写', '拼音', '输入法'];
var i = 0;
oInput.onclick = function show(ev) {
	if (oWay.style.display == 'none') {
		oWay.style.display = 'block';
		for (i = 0; i < oChange.length; i++) {
			oChange[i].index = i;
			oChange[i].onclick = function () {
				oInput.innerHTML = aWays[this.index];
				//oWay.style.display = 'none';
			};
		}
	} 
	else {
        oWay.style.display = 'none';
    }
    var oEvent = ev || event;
    oEvent.cancelBubble = true;
};
document.onclick = function () {
	oWay.style.display = 'none';
};