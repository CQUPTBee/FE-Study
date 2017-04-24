/*使一位数变成两位数*/
function toDouble(num) {
    if (num == "0") {
        return "00";
    } else if (num < 10 && !(num == "0")) {
        return "0" + num;
    } else {
        return "" + num;
    }
}

/*使一位数和两位数变成三位数*/
function toTreble(num) {
    if (num == "0") {
        return "000";
    } else if (num < 10) {
        return "00" + num;
    } else if (num < 100) {
        return "0" + num;
    } else {
        return "" + num;
    }

}

/*改变图片函数*/
function changeImg(img, time) {
    //遍历图片并改变路径
    for (var i = 0; i < img.length; i++) {
        img[i].src = 'images/' + time.charAt(i) + '.png';
    }
}

/*当前时间函数*/
function nwTime() {

    //获取图片路径
    var aTime = document.getElementsByClassName("nowtime")[0];
    var aImg = aTime.getElementsByTagName("img");

    //更新时间函数
    function updateTime() {
        //创建一个新的日期对象并获取当前时间
        var oDate = new Date();

        //分别获取当前时间的年月日并保存到一个字符串中
        var nowTimeOne = oDate.getFullYear() + toDouble(oDate.getMonth() + 1) + toDouble(oDate.getDate()) + toDouble(oDate.getHours()) + toDouble(oDate.getMinutes()) + toDouble(oDate.getSeconds());

        //改变图片路径显示现在时间
        changeImg(aImg, nowTimeOne);

        //在这里调用倒计时函数以减少一个定时器优化页面
        edTime();
    }

    /*刷新页面，定时器有一秒延迟，此时调用函数使时间连续*/
    updateTime();

    /*打开定时器 1秒调用一次函数*/
    setInterval(updateTime, 1000);

}

/*倒计时函数*/
function edTime() {
    //创建一个新的日期对象并获取当前时间
    var nowTimeTwo = new Date();

    //如果今年儿童节过了后，就目光放向明年儿童节 只适用于目标时间为每月1号的情形
    if (nowTimeTwo.getMonth() >= 5) {
        var newYear = (nowTimeTwo.getFullYear() + 1);
    } else {
        var newYear = nowTimeTwo.getFullYear();
    }

    //定义结束时间
    var endTime = new Date(newYear + "/6/1");

    //计算时间毫秒差
    var t = endTime.getTime() - nowTimeTwo.getTime();
    //计算倒计时具体时间*/
    var d = toTreble(Math.floor(t / 1000 / 60 / 60 / 24));
    var h = toDouble(Math.floor(t / 1000 / 60 / 60 % 24));
    var m = toDouble(Math.floor(t / 1000 / 60 % 60));
    var s = toDouble(Math.floor(t / 1000 % 60) + 1);
    //使倒计时连接
    var lastTime = "" + d + h + m + s;

    //定义倒计时图片路径
    var oTime = document.getElementsByClassName("lasttime")[0];
    var lastImg = oTime.getElementsByTagName("img");
    //改变图片路径显示倒计时
    changeImg(lastImg, lastTime);

    //一秒调用一次自身更新时间  //调用自身会使得页面卡顿，因为每次轮回一次
    //setInterval(edTime, 1000);
}

/*清除定时器函数*/
function clearInt(timer) {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}


/*自己设置倒计时函数*/
function myTime() {
    //获取我的时间
    var aMyTime = document.getElementsByClassName("mytime")[0];
    //获取start按钮
    var oBtn = aMyTime.getElementsByTagName("button")[0];
    //存储一个定时器空对象
    var timer = null;
    //存储警告事件状态和值
    var moreP = null;
    var aP = 1;

    /*警告函数*/
    function warn(oP) {
        console.log(aP);
        var oSection = document.getElementsByTagName("section")[0];
        if (aP == 1) {
            aP = 2;
            console.log(aP);
            moreP = document.createElement("p");
            moreP.setAttribute("style", "color:red;display:inline-block;font-size:20px;");
            moreP.setAttribute("class", "morep");
            var morePT = document.createTextNode(oP);
            moreP.appendChild(morePT);
            oSection.appendChild(moreP);
        } else if (aP == 2) {
            aP = 3;
            moreP.lastChild.nodeValue = "你手痒吗？";
        } else if (aP == 3) {
            aP = 4;
            moreP.lastChild.nodeValue = "傻逼!";
        } else if (aP == 4) {
            aP = 1; //无限集傻逼彩蛋
        }
    }

    /*start按钮点击事件*/
    oBtn.onclick = function() {
        //获取输入的年月日
        var myYear = aMyTime.getElementsByTagName("input")[0].value;
        var myMonth = aMyTime.getElementsByTagName("input")[1].value;
        var myDay = aMyTime.getElementsByTagName("input")[2].value;
        //将输入的年月日换成Date对象
        var aDate = parseInt(myYear) + "/" + toDouble(myMonth) + "/" + toDouble(myDay);
        var myDate = new Date(aDate);
        //清空定时器
        clearInt(timer);
        //判断是否执行计算
        var play = true;

        //计算函数
        function finallyTime() {
            //打开计算状态
            play = true;
            //创建一个新的日期对象并获取当前时间
            var nowTimeThree = new Date();
            //获取当前时间成字符串
            var nowTimeFour = nowTimeThree.getFullYear() + toDouble(nowTimeThree.getMonth() + 1) + toDouble(nowTimeThree.getDate());
            //计算输入时间与当前时间毫秒差
            var t = myDate.getTime() - nowTimeThree.getTime();

            //无聊的判断
            if (t < 0) {
                play = false;
                //清空定时器
                clearInt(timer);
                warn("你是不是想搞一个大新闻！请重新输入");
                return; //目标时间早于当前时间
            } else if ((myYear % 400 == 0 || myYear % 4 == 0) && myMonth == 2 && myDay > 29) {
                play = false;
                //清空定时器
                clearInt(timer);
                warn("蛤？闰年2月只有29号？请重新输入");
                return; //闰年
            } else if (!(myYear % 400 == 0 || myYear % 4 == 0) && myMonth == 2 && myDay > 28) {
                warn("蛤？平年2月只有28号？请重新输入");
                play = false;
                //清空定时器
                clearInt(timer);
                return; //平年
            } else if ((myMonth == 1 || myMonth == 3 || myMonth == 5 || myMonth == 7 || myMonth == 8 || myMonth == 10 || myMonth == 12) && myDay > 31) {
                warn("我有句MMP不知当讲不当讲。请重新输入");
                play = false;
                //清空定时器
                clearInt(timer);
                return; //31日
            } else if (!(myMonth == 1 || myMonth == 3 || myMonth == 5 || myMonth == 7 || myMonth == 8 || myMonth == 10 || myMonth == 12) && myDay > 30) {
                warn("我有句MMP现在就要讲，MMP。请重新输入");
                play = false;
                //清空定时器
                clearInt(timer);
                return; //30日
            } else if (myYear < 0) {
                warn("蛤？你说得公元前吗？请重新输入");
                play = false;
                //清空定时器
                clearInt(timer);
                return; //公元前
            } else if (myMonth < 0 || myMonth > 12 || myDay < 0) {
                warn("请重新输入，呵呵");
                play = false;
                //清空定时器
                clearInt(timer);
                return; //月份
            } else {
                //计算倒计时具体时间
                var d = toTreble(Math.floor(t / 1000 / 60 / 60 / 24));
                var h = toDouble(Math.floor(t / 1000 / 60 / 60 % 24));
                var m = toDouble(Math.floor(t / 1000 / 60 % 60));
                var s = toDouble(Math.floor(t / 1000 % 60) + 1);
                //使倒计时连接
                var finalTime = "" + d + h + m + s;

                //定义倒计时图片路径
                var myImg = aMyTime.getElementsByTagName("img");
                //改变图片路径显示倒计时
                changeImg(myImg, finalTime);
            }

        }
        //在计算状态则循环计算
        if (play) {
            //一秒调用一次计算函数更新时间
            timer = setInterval(finallyTime, 1000);
        }
    }
}

/*  打开页面时加载函数  */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

/*开局调用函数*/
addLoadEvent(nwTime);
addLoadEvent(myTime);
//addLoadEvent(edTime);
