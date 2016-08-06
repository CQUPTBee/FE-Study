/*
 *     Created by Boyuan on 2016.7.28
 */

window.onload = (function () {
    var banner_container = document.getElementsByClassName('banners-container')[0];
    var next = document.getElementsByClassName('next')[0];
    var prev = document.getElementsByClassName('prev')[0];
    var small_dots = document.getElementsByClassName('buttons')[0].getElementsByTagName('span');  //小圆点标识

    slideImg(banner_container, next, prev, small_dots);
});


function slideImg(container, next, prev, small_dots) {
    var img_width = -parseInt(container.style.left);
    var moving = false;
    var timer = null;

    next.onclick = rightClick;
    prev.onclick = leftClick;

    //模拟左右点击动作
    function rightClick() {
        if (!moving) {
            if (container.offsetLeft <= -3540)  //模拟无限滚动
            {
                container.style.left = 0 + "px";
            }
            startMove(container.offsetLeft - img_width);
        }
    }
    function leftClick() {
        if (!moving)
            if (container.offsetLeft >= -1180) {
                container.style.left = -4720 + "px";
            }
        startMove(container.offsetLeft + img_width);
    }

    //绑定点击小圆点切换事件
    for (var i = 0; i < small_dots.length; i++) {
        small_dots[i].onclick = function (temp) {
            return function () {
                if (!moving)
                    startMove((temp + 1) * -1180);
            }
        }(i)
    }

    //移动到指定位置
    function startMove(target) {
        var speed = 0;

        switchDot((target / -1180) - 1);        //  -1180 -2360 -3540

        clearInterval(timer); //解决重复点击的定时器叠加bug

        timer = setInterval(function () {
            speed = (target - container.offsetLeft) / 10; //速度

            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (target == container.offsetLeft) {
                clearInterval(timer);
                moving = false;
            }
            else {
                container.style.left = container.offsetLeft + speed + "px";
                moving = true;
            }
        }, 30);
    }

    //切换到指定的小圆点
    function switchDot(dot_index) {
        for (var i = 0; i < small_dots.length; i++) {
            if (small_dots[i].className == 'on') {
                small_dots[i].className = '';
                break;
            }
        }
        small_dots[dot_index].className = 'on';
    }

    var clearAutoPlay = null;
    //自动播放
    function autoPlay() {
        clearAutoPlay = setInterval(function () {
            rightClick();
        }, 1500);
    }

    container.onmouseover = function () {
        clearInterval(clearAutoPlay);
    };
    container.onmouseout=function () {
        autoPlay();
    };

    autoPlay();
}
