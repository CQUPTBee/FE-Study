/*tab选项卡函数*/
window.onload = function() {
    /*遍历导航*/
    var nav = document.getElementsByClassName("sm-nav")[0];/*注意，数组*/
    var nava = nav.getElementsByTagName("a");
    /*遍历内容*/
    var news = document.getElementsByClassName("news");

    /**/
    for (var i = 0; i < nava.length; i++) {
        /*增加索引值*/
        nava[i].index = i;

        /*鼠标浮动时调用函数*/
        nava[i].onmouseover = function() {

            for (var i = 0; i < nava.length; i++) {
                /*再增加class="active"之前先使所有class清空*/
                nava[i].className = "";
                /*再增加class="active"之前先使所有display变none*/
                news[i].style.display = "none";
            }
            /*使鼠标浮动项class变active，对应内容display变block*/
            this.className = "active";
            news[this.index].style.display = "block";
        }
        /*当鼠标移除后选项选中效果不会消失*/
        nava[i].onmouseout = function() {
            this.className = "active";
        }
    }
}
