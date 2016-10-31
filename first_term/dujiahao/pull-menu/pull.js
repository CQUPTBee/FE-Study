    window.onload=function(){
     menu();
    }

function menu(){
    var oMenu=document.getElementById("menu");
    var oUl=document.getElementById("UL");
    var timer;

    oUl.onmouseover=oMenu.onmouseover=function(){
        clearTimeout(timer);
        oUl.style.display='block';
    };

      oUl.onmouseout=oMenu.onmouseout=function()
      {
        timer=setTimeout(function(){
            oUl.style.display='none';
        },300);
    };
}
