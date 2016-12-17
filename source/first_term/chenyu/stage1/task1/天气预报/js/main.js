window.onload=function(){
 
        var oFt=document.getElementById('forecast_content');
        var oUl=oFt.getElementsByTagName('ul')[0];
        var aLi=oUl.getElementsByTagName('li');
        var aBtn=oFt.getElementsByTagName('span');
        var timer=null;
        var iSpeed=-2;
        oUl.innerHTML+=oUl.innerHTML;
    //复制一份放在后面
        oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
        //动态计算ul的宽度，不管有多少个li;
        timer=setInterval(function(){
             
            oUl.style.left=oUl.offsetLeft+iSpeed+'px';
            if(oUl.offsetLeft<-oUl.offsetWidth/2)
            {
                oUl.style.left='0px';
            //ul滚动到一半的时候将其拉回到原来的位置，此处
            //注：此时offsetleft的为负值
            }
            else if(oUl.offsetLeft>=0)
            {
                oUl.style.left=-oUl.offsetWidth/2+'px';
            }
        },30);

        aBtn[0].onmouseover=function(){
            iSpeed=-2;
                //加一个负数即为往左走
        };
        aBtn[1].onmouseover=function(){
            iSpeed=2;
                
        };
        
        
        oUl.onmouseover=function(){
            clearInterval(timer);
        };
        oUl.onmouseout=function()

    {
            timer=setInterval(function(){

            oUl.style.left=oUl.offsetLeft+iSpeed+'px';
            
            if(oUl.offsetLeft<-oUl.offsetWidth/2)
            {
                oUl.style.left='0px';
            }else if(oUl.offsetLeft>0)
            {

                oUl.style.left=-oUl.offsetWidth/2+'px';

            }

        },30);
    };


               
               function ajax(url,fnsuccess,fnfailed){
                //1.创建Ajax对象
                var oAjax=null;
                if(window.XMLHttpRequest){
              
    
                    oAjax=new XMLHttpRequest();

                }else{
                    oAjax=new ActiveXObject("Microsoft.XMLHTTP");
                }
                //alert(oAjax);


                //2.连接服务器
                //open(方法，url,是否异步);
                oAjax.open('GET',url,true);
                //3.发送请求
                oAjax.send();
                //4.接收返回
                oAjax.onreadystatechange=function(){
                    if(oAjax.readyState==4){
                        if(oAjax.status==200){
                            //console.log('成功！'+oAjax.responseText);
                            //oAjax.responseText文件里面的内容
                            fnsuccess(oAjax.responseText);
                            //服务器的返回值

                        }else{
                            //console.log('失败！');
                            if(fnfailed){//是否关心失败
                                fnfailed();
                            }
                            

                        }
                    }


                }


            
            }

 ajax("http://openweathermap.org/data/2.5/forecast/%20daily?id=1814906&appid=b1b15e88fa797225412429c1c50c122a", fnsuccess,fnfailed);
     



function fnsuccess(str){
    var jsonText=JSON.parse(str);
    var Time=document.getElementById('time');
    Time.innerHTML=jsonText.list[0].dt_txt;
    var Time1=document.getElementById('time1');
    Time1.innerHTML=jsonText.list[1].dt_txt;
   var Time2=document.getElementById('time2');
    Time2.innerHTML=jsonText.list[2].dt_txt;
     var Time3=document.getElementById('time3');
    Time3.innerHTML=jsonText.list[3].dt_txt;

    var Temperature=document.getElementById('temperature');
    Temperature.innerHTML=jsonText.list[0].main.temp_min+'℃'+'/'+jsonText.list[0].main.temp_max+'℃';
}


function fnfailed(){


}


};
