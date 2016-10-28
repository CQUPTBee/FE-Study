function addLoadEvent(func) {
    var old_func = window.onload;

    if (typeof (window.onload) != "function") {
        window.onload = func;
    }
    else{
        window.onload=function () {
            old_func();
            func();
        }
    }
}