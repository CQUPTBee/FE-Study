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

function func(){
    var oIn=document.getElementById('introduce');
    var aLi=oIn.getElementsByTagName('li');
    var aSum=document.getElementsByClassName('sum');
    var timer=null;
    var i=0;
    var index=null;

    for(i=0; i<aSum.length; i++)
    {
    aSum[i].style.display='none';
  }


  // for(i=0; i<aLi[i].length; i++)
  //   {
  //       aLi[i].index=i;
  //       aLi[i].onmouseover=function (){
  //           aSum[aLi[i].index].style.display='none';
  //       }
        
  //   }
  //    for(i=0; i<aLi[i].length; i++)
  //   {
  //       aLi[i].index=i;
  //        aLi[i].onmouseout=function (){
  //           aSum[aLi[i].index].style.display='block';
  //       }
  //   


  //怎么错了？？？page3.js:53 Uncaught TypeError: Cannot read property 'index' of undefined
//   for(i=0; i<aLi.length; i++){  
//          function show(){
//             aSum[i].style.display= 'block';
//             clearTimeout(timer);
//         }
//         function hidden()
//         {   
//             timer=setTimeout(function(){
//             aSum[i].style.display = 'none';
//         }
//             ,300);
            
//         }
//         aLi[i].onmouseover=show();

//         aLi[i].onmouseout=hidden();
//         aSum[i].onmouseover=show();

//         aSum[i].onmouseout=hidden();
// }


//分散
         function show1(){
            aSum[0].style.display= 'block';
            clearTimeout(timer);
           // aSum[0].style.margin-top="-203+'px'";
        }
        function hidden1()
        {   timer=setTimeout(function(){aSum[0].style.display = 'none';},0)
            
        }
        aLi[0].onmouseover=show1;

        aLi[0].onmouseout=hidden1;
        aSum[0].onmouseover=show1;

        aSum[0].onmouseout=hidden1;


        function show(){
            aSum[1].style.display= 'block';
            clearTimeout(timer);
        }
        function hidden()
        {   timer=setTimeout(function(){aSum[1].style.display = 'none';},0)
            
        }
        aLi[1].onmouseover=show;

        aLi[1].onmouseout=hidden;
        aSum[1].onmouseover=show;

        aSum[1].onmouseout=hidden;



        function show2(){
            aSum[2].style.display= 'block';
            clearTimeout(timer);
        }
        function hidden2()
        {   timer=setTimeout(function(){aSum[2].style.display = 'none';},0)
            
        }
        aLi[2].onmouseover=show2;

        aLi[2].onmouseout=hidden2;
        aSum[2].onmouseover=show2;

        aSum[2].onmouseout=hidden2;



        function show3(){
            aSum[3].style.display= 'block';
            clearTimeout(timer);
        }
        function hidden3()
        {   timer=setTimeout(function(){aSum[3].style.display = 'none';},0)
            
        }
        aLi[3].onmouseover=show3;

        aLi[3].onmouseout=hidden3;
        aSum[3].onmouseover=show3;

        aSum[3].onmouseout=hidden3;



        function show4(){
            aSum[4].style.display= 'block';
            clearTimeout(timer);
        }
        function hidden4()
        {   timer=setTimeout(function(){aSum[4].style.display = 'none';},0)
            
        }
        aLi[4].onmouseover=show4;

        aLi[4].onmouseout=hidden4;
        aSum[4].onmouseover=show4;

        aSum[4].onmouseout=hidden4;


        function show5(){
            aSum[5].style.display= 'block';
            clearTimeout(timer);
        }
        function hidden5()
        {   timer=setTimeout(function(){aSum[5].style.display = 'none';},0)
            
        }
        aLi[5].onmouseover=show5;

        aLi[5].onmouseout=hidden5;
        aSum[5].onmouseover=show5;

        aSum[5].onmouseout=hidden5;


        function show6(){
            aSum[6].style.display= 'block';
            clearTimeout(timer);
        }
        function hidden6()
        {   timer=setTimeout(function(){aSum[6].style.display = 'none';},0)
            
        }
        aLi[6].onmouseover=show6;

        aLi[6].onmouseout=hidden6;
        aSum[6].onmouseover=show6;

        aSum[6].onmouseout=hidden6;



//回到顶部
        var oCqBtn1=document.getElementById('cqbtn1');
        var bSys=true;
        var timer=null;

    
    //如何检测用户拖动了滚动条
    window.onscroll=function ()
    {
        if(!bSys)
        {
            clearInterval(timer);
        }
        bSys=false;
    };
    
    oCqBtn1.onclick=function ()
    {
        timer=setInterval(function (){
            var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
            var iSpeed=Math.floor(-scrollTop/8);
            
            if(scrollTop==0)
            {
                clearInterval(timer);
            }
            
            bSys=true;
            document.documentElement.scrollTop=document.body.scrollTop=scrollTop+iSpeed;
        }, 30);
    };

}