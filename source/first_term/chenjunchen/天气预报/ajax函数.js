function Ajax(url,fnsucc,fnfail){
    var oajax=null;
        if(window.XMLHttpRequest)
            oajax=new XMLHttpRequest();
        else
            oajax=new ActiveXobject("Microsoft.XMLHttp");
        oajax.open("get",url,"ture");
        oajax.send();
        oajax.onreadystatechange=function(){
            if(oajax.readyState==4&&oajax.status==200){
                fnsucc(oajax.responseText);
            } 
            else if(oajax.status==404){
                fnfail();
            }
        }
}