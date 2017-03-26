window.onload = function() {
    /*获取整个轮播图*/
    var oall = document.getElementsByClassName("all")[0];
    /*获取图片库*/
    var oImages = document.getElementsByClassName("images")[0];
    /*获取左按钮*/
    var leftBtn = document.getElementsByClassName("left")[0];
    /*获取右按钮*/
    var rightBtn = document.getElementsByClassName("right")[0];
    /*获取小圆点*/
    var point = document.getElementsByTagName("span");
    /*设置次序，控制小圆点的class，初始圆点激活在图片三*/
    var index = 3;
    /*设置状态，判断是否在动画状态*/
    var oBtn = false;
    /*声明函数局部变量play存取定时器*/
    var play = null;

    /*为小圆点创建index属性*/
    for (var i = 0; i < point.length; i++) {
        point[i].setAttribute("index", (i + 1));
    }

    /*激活小圆点*/
    function showPoint() {
        //添加class前让所有小圆点class为"" 
        for (var i = 0; i < point.length; i++) {
            point[i].className = "";
        }
        //为目标小圆点添加class
        point[index - 1].className = "span-hover";
    }

    /*黑化小圆点*/
    function noPoint() {
        //让所有小圆点class为"" 
        for (var i = 0; i < point.length; i++) {
            point[i].className = "";
        }
    }

    /*按钮点击事件*/
    function btn(distance) {
        //将图片需要移动到的距离存入一个变量
        var newLeft = parseInt(oImages.style.left) + distance;
        //图片动画移动总时间 毫秒
        var aTime = 800;
        //图片动画每次移动时间
        var aInterval = 10;
        //图片移动速度 即一次移动多少
        var speed = distance / (aTime / aInterval);

        /*动画函数*/
        function go() {
            //只有未到位时函数执行一下命令
            if ((speed < 0 && parseInt(oImages.style.left) > newLeft) || (speed > 0 && parseInt(oImages.style.left) < newLeft)) {
                //打开动画状态
                oBtn = true;
                //让图片加一次速度的距离
                oImages.style.left = parseInt(oImages.style.left) + speed + "px";
                //黑化小圆点
                /*noPoint();*/
                //当隔移动时间后再次调用自身   递归函数
                setTimeout(go, aInterval);
            } else { //当函数到位后
                if (newLeft >= -140) {
                    //如果函数到达备用五则跳到真实五
                    newLeft = -1690;
                } else if (newLeft <= -2000) {
                    //如果函数到达备用一则跳到真实一
                    newLeft = -450;
                }
                //跳到改到位置
                oImages.style.left = newLeft + "px";
                //激活对应小圆点
                showPoint();
                //关闭动画状态
                oBtn = false;
            }
        }
        //执行一次go函数
        go();
    }

    /*左按钮点击事件*/
    leftBtn.onclick = function() {
        //如果在动画状态则不继续执行
        if (oBtn) {
            return;
        }
        //如果小圆点次序到1再左移就变次序为5
        if (index == 1) {
            index = 5;
        } else {  //小圆点次序减1
            index -= 1;
        }
        //执行按钮点击事件 移动距离为正310px
        btn(310);
        }
    /*右按钮点击执行按钮点击事件*/
    rightBtn.onclick = function() {
        //如果在动画状态则不继续执行
        if (oBtn) {
            return;
            }
        //如果小圆点次序到1再左移就变次序为5
        if (index == 5) {
            index = 1;
        } else {  //小圆点次序加1
            index += 1;
        }
        //执行按钮点击事件 移动距离为负310px
        btn(-310);
    }

    /*循环遍历小圆点*/
    for (var i = 0; i < point.length; i++) {
        //鼠标移入小圆点触发函数
        point[i].onmouseover = function() {
            //如果在动画状态则不继续执行
            if (oBtn) {
                return;
            }
            //如果指向自身圆点则不继续执行
            if (this.className == "span-hover") {
                return;
            }
            //计算指向圆点离原圆点个数
            var myIndex = parseInt(this.getAttribute("index"));
            //计算图片该移动的距离
            var distance = -310 * (myIndex - index);
            //调用图片移动函数
            btn(distance);
            //把小圆点次序改为鼠标指向圆点
            index = myIndex;
            //激活小圆点
            showPoint();
        }
    }

    /*开始自身移动函数*/
    function start() {
        //定时器  4秒调用一次右键按钮函数
        play = setInterval(function() {
            rightBtn.onclick();
        }, 4000);
    }
    //加载页面后调用一次自身移动函数
    start();

    /*停止自身移动函数*/
    function stop() {
        //关闭定时器
        clearInterval(play);
    }
    //当鼠标浮动到整个轮播图时调用停止函数
    oall.onmouseover = stop;
    //当鼠标浮动出整个轮播图时调用开始函数
    oall.onmouseout = start;

}
