window.onload = function () {
    slider();
    switchOver();
    clearInputText(document.getElementsByClassName('clear-text'));
    var oinput = document.getElementsByClassName("item-select-input");
    var oul = document.getElementsByClassName("select-content");
    for (var k = 0; k < oinput.length; k++) {
        selectItem(oinput[k], oul[k]);
    }
};

function slider() {
    var obox = document.getElementsByClassName("hs-time-list")[0];
    var onext = document.getElementsByClassName("hs-next-btn")[0];
    var oprev = document.getElementsByClassName("hs-prev-btn")[0];
    var moving = false;

    onext.onclick = function () {
        if (obox.offsetLeft > -345 && !moving) {
            move(obox.offsetLeft - 115);
        }
    };
    oprev.onclick = function () {
        if (obox.offsetLeft < 0 && !moving)
            move(obox.offsetLeft + 115);
    };

    function move(iTarget) {
        var timer = null;
        moving = true;

        timer = setInterval(function () {
            var iSpeed = (iTarget - obox.offsetLeft) / 8;

            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (obox.offsetLeft == iTarget) {
                clearInterval(timer);
                moving = false;
            }
            else {
                obox.style.left = obox.offsetLeft + iSpeed + "px";
            }
        }, 30);
    }
}


function switchOver() {
    var oitem = document.getElementsByClassName("nav-item");
    var otab = document.getElementsByClassName("tab");
    var on_focus_item = 0;
    var on_show_tab = 0;

    for (var i = 0; i < oitem.length; i++) {
        oitem[i].onclick = function (inow) {
            return function () {
                addClass(oitem[inow], "on-focus");
                removeClass(oitem[on_focus_item], "on-focus");
                // replaceClass(oitem[on_focus_item],"nav-item on-focus","nav-item");
                on_focus_item = inow;

                addClass(otab[inow], "on-show");
                removeClass(otab[on_show_tab], "on-show");
                on_show_tab = inow;
            };
        }(i)
    }

}

function addClass(element, iclass) {
    var eclass = element.getAttribute("class");

    eclass = eclass + " ";
    eclass = eclass.concat(iclass);
    element.setAttribute("class", eclass);

}

function removeClass(element, iclass) {
    var eclass = element.getAttribute("class");

    eclass = eclass.replace(iclass, "");
    element.setAttribute("class", eclass);
}

// 顺手写个替换的,以备将来之用
// function replaceClass(element, iclass_name, to_class_name) {
//     var eclass = element.getAttribute("class");
//
//     eclass = eclass.replace(iclass_name, to_class_name);
//     element.setAttribute("class", eclass);
// }


function clearInputText(oinput) {
    for (var i = 0; i < oinput.length; i++) {
        inputTextChange(oinput[i], oinput[i].value);
    }

    function inputTextChange(oinput, str) {
        oinput.onfocus = (function () {
            if (this.value == str) {
                this.value = '';
            }
        });
        oinput.onblur = (function () {
            if (this.value == '') {
                this.value = str;
            }
        });
    }
}


function selectItem(oinput, oul) {
    var changing_opacity = false;
    var oli=oul.getElementsByTagName("li");

    oinput.onclick = function () {
        if (!changing_opacity)
            showOrHideSelect();
    };

    //显示选中的选项
    for (var i = 0; i < oli.length; i++) {
        oli[i].onclick = function (_i) {
            return function () {
                if (!changing_opacity) {
                    oinput.setAttribute("value", oli[_i].getAttribute("title"));
                    showOrHideSelect();
                }
            }
        }(i);
    }

    //渐变地显示-消失列表项
    function showOrHideSelect() {
        changing_opacity = true;
        var timer = null;
        var now_opacity = 0;

        //如果未显示则渐变显示
        if (oul.style.display == "none") {
            now_opacity = Number(oul.style.opacity);

            oul.style.display = "block";
            timer = setInterval(function () {
                if ((1 - now_opacity) <= 0.1) {
                    clearInterval(timer);
                    oul.style.opacity = 1;
                    changing_opacity = false;
                }
                else {
                    now_opacity = now_opacity + 0.1;
                    oul.style.opacity = now_opacity;
                }
            }, 30);
        }

        //如果已经显示则渐变隐藏
        else {
            changing_opacity = true;
            now_opacity = Number(oul.style.opacity);

            timer = setInterval(function () {
                if ((1 - now_opacity) >= 0.9) {
                    clearInterval(timer);
                    oul.style.opacity = 0;
                    oul.style.display = "none";
                    changing_opacity = false;
                }
                else {
                    now_opacity = now_opacity - 0.1;
                    oul.style.opacity = now_opacity;
                }
            }, 30);
        }
    }
}
