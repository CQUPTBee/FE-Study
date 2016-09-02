var oAll = document.getElementById('all');
var oSec = document.getElementById('second');
var oFee = document.getElementsByTagName('li');
var oPho = document.getElementsByTagName('div');
var i = 0;
oAll.onclick = function () {
    if (oSec.style.display == 'none') {
        oSec.style.display = 'block';
        for (i = 0; i < oFee.length; i++) {
            oFee[i].index = i;
            oFee[i].onmouseover = function () {
                for (i = 0; i < oFee.length; i++) {
                    oFee[i].className = '';
                    oPho[i].style.display = 'none';
                }
                oPho[this.index].style.display = 'block';
                this.className = 'active';
            };
        }
    }
    else {
        oSec.style.display = 'none';
        for (i = 0; i < oFee.length; i++) {
            oPho[i].style.display = 'none';
        }
    }
};