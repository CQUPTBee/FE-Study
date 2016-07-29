/*
 *   Created by boyuan by 2016.7.27
 */

window.onload = function () {
    switchover();
};

function switchover() {
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