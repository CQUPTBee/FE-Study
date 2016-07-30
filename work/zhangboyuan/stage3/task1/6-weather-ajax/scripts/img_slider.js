/*
 *     Created by Boyuan on 2016.7.29
 */

function active_slideImg() {
    var banner_container = document.getElementsByClassName('banners-container')[0];
    var next = document.getElementsByClassName('next')[0];
    var prev = document.getElementsByClassName('prev')[0];
    var small_dots = document.getElementsByClassName('buttons')[0].getElementsByTagName('span');  //小圆点标识

    slideImg(banner_container, next, prev, small_dots);
}
function slideImg(container, next, prev, small_dots) {
    var img_width = 600;
    var moving = false;
    var timer = null;

    next.onclick = rightClick;
    prev.onclick = leftClick;

    //模拟左右点击动作
    function rightClick() {
        if (!moving) {
            if (container.offsetLeft == -2400) {
                startMove(0);
            }
            else {
                startMove(container.offsetLeft - img_width);
            }
        }
    }

    function leftClick() {
        if (!moving) {
            if (container.offsetLeft == 0) {
                startMove(-2400);
            }
            else {
                startMove(container.offsetLeft + img_width);
            }
        }
    }

    //小圆点切换事件
    for (var i = 0; i < small_dots.length; i++) {
        small_dots[i].onclick = function (temp) {
            return function () {
                if (!moving)
                    startMove((temp) * -600);
            }
        }(i)
    }

    //移动到指定位置
    function startMove(target) {
        var speed = 0;

        switchDot((target / -600));

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
            }
        }, 30);
        moving = true;
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

    //自动播放
    var clearAutoPlay = null;
    function autoPlay() {
        clearAutoPlay = setInterval(function () {
            rightClick();
        }, 5000);    //自动播放时间间隔
    }

    container.onmouseover = function () {
        clearInterval(clearAutoPlay);
    };
    next.onmouseover = function () {
        clearInterval(clearAutoPlay);
    };
    prev.onmouseover = function () {
        clearInterval(clearAutoPlay);
    };
    container.onmouseout = function () {
        autoPlay();
    };
    next.onmouseout = function () {
        autoPlay();
    };
    prev.onmouseout = function () {
        autoPlay();
    };

    // autoPlay();
}

addLoadEvent(active_slideImg);
