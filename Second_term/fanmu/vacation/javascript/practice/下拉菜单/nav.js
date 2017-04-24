window.onload = function () {
    var timer;
    var nav = document.getElementsByTagName('li');

    for (i = 0;i < nav.length; i++ )
    {       
        nav[i].onmouseover = function () {
            var self = this;
                clearTimeout(timer);
                timer = setTimeout( function() {
                    self.className = "ahover";
            },500 );
            }

        nav[i].onmouseout = function () {
            var self = this;
            clearTimeout(timer);
            timer = setTimeout(function (){
                self.className = "";
            },300);
        }
    }
}