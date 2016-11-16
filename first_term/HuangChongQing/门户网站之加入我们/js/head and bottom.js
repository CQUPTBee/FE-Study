function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload!='function'){
        window.onload=func;
    }
    else{
        window.onload=function(){
            oldonload();
            func();
        }
    }
}
addLoadEvent(func);

function func()
{
    var oUl=document.getElementById('top-ul1');
    var aLi=oUl.getElementsByTagName('li');
    var iMinZindex=2;
    var i=0;

    
    //1.布局转换
    for(i=0;i<aLi.length;i++)
    {
        //aLi[i].innerHTML='left:'+aLi[i].offsetLeft+', top:'+aLi[i].offsetTop;
        aLi[i].style.left=aLi[i].offsetLeft+'px';
        aLi[i].style.top=aLi[i].offsetTop+'px';
    }
    
    for(i=0;i<aLi.length;i++)
    {
        aLi[i].style.position='absolute';
        aLi[i].style.margin='0';
    }
    
    //2.加事件
    for(i=0;i<aLi.length;i++)
    {
        aLi[i].onmouseover=function ()
        {
            this.style.zIndex=iMinZindex++;
            startMove(this, {width: 10, height: 10, marginLeft: -4, marginTop: -4});
        };
        
        aLi[i].onmouseout=function ()
        {
            startMove(this, {width: 10, height: 10, marginLeft: 0, marginTop: 0});
        };
    }

    var oWeixin=document.getElementById('weixin1');
    var oCode=document.getElementById('code');

    oWeixin.onmouseover=function(){
            oCode.style.display="block";
    };
    oWeixin.onmouseout=function(){
            oCode.style.display="none";
    };
    
};