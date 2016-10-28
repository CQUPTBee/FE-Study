(function(){

/*课程列表及分页模块*/
var course_module = (function(){

    var url = "http://study.163.com/webDev/couresByCategory.htm";
    var pageSize = 20;
    var pageType = 10;

    var mnav = document.querySelector('.nav');
    var mnavTag = mnav.getElementsByTagName('a');
    var mpager = document.querySelector('.pager');

    delegateEvent(mnav,'a','click',
        function(target,event){
            if(pageType != target.getAttribute('data')){
                for(i=0;i<mnavTag.length;i++){
                    removeClass(mnavTag[i],'selected');
                }
                addClass(target,'selected');
                pageType = target.getAttribute('data');
                mpager.innerHTML = '';
                getPageNum(1);
            }
            preventDefault(event);
        }
    );

    //获取分页器总页数以及课程列表第一页
    function getPageNum(now){
        var options = {pageNo:now,psize:pageSize,type:pageType};
        get(url,options,function(response){
                initPager(response,now);
            }
        );
    }
    //初始化分页和课程列表
    function initPager(response,now){
        var res = JSON.parse(response);
        var option = {id:mpager,nowNum:now,allNum:res.totalPage,childLength:8,callback:getCourse};
        //初始化课程列表
        drawCourse(response);
        //初始化分页
        page(option);
    }
    //获取课程列表
    function getCourse(now,all){
        console.log('分页器：'+now);

        var options = {pageNo:now,psize:pageSize,type:pageType};
        get(url,options,drawCourse);
    }
    //生成课程列表
    function drawCourse(response){
        var data = JSON.parse(response);
        console.log(data);
        console.log('获取的页码：'+data.pagination.pageIndex);

        var boo = document.querySelectorAll('.cover');
        for(var i=boo.length-1;i>0;i--){
            boo[i].parentNode.removeChild(boo[i]);
        }

        var templete = document.querySelector('.data-lists .f-templete');

        for(var i=0,list=data.list;i<list.length;i++){
            var cloned = templete.cloneNode(true);
            removeClass(cloned,'f-templete');
            var aLink = cloned.querySelector('.wrap');
            var imgpic = cloned.querySelector('.imgpic');
            var title = cloned.querySelector('.tt');
            var writer = cloned.querySelector('.writer');
            var hot = cloned.querySelector('.hot');
            var pri = cloned.querySelector('.pri');
            var kindname = cloned.querySelector('.kindname');
            var disc = cloned.querySelector('.disc');

            aLink.href = list[i].providerLink;
            imgpic.src = list[i].middlePhotoUrl;
            imgpic.alt = list[i].name;
            title.innerText = list[i].name;
            writer.innerText = list[i].provider;
            hot.innerText = list[i].learnerCount;
            pri.innerText = '￥' + list[i].price + '.00';
            kindname.innerText = list[i].categoryName;
            if(!kindname.innerText){
                kindname.innerText="未分类";
            }
            disc.innerText = list[i].description;
            templete.parentNode.appendChild(cloned);
        }
    }

    getPageNum(1);

})();

/*热门推荐及滚动模块*/
var top_module = (function(){

    var url = 'http://study.163.com/webDev/hotcouresByCategory.htm';

    var oUl = document.querySelector('.toplit');
    var aLi = oUl.getElementsByTagName('li');

    //获取热门排行课程数据
    get(url,null,initTop);

    //初始化热门课程列表
    function initTop(response,now){
        var list = JSON.parse(response);
        console.log(list);

        var templete = document.querySelector('.toplit .f-templete');

        for(var i=0;i<list.length;i++){
            var cloned = templete.cloneNode(true);
            removeClass(cloned,'f-templete');
            var aLink = cloned.querySelector('.f-cb');
            var imgpic = cloned.querySelector('.imgpic');
            var title = cloned.querySelector('.tt');
            var num = cloned.querySelector('.num');

            aLink.href = list[i].providerLink;
            imgpic.src = list[i].smallPhotoUrl;
            imgpic.alt = list[i].name;
            title.innerText = list[i].name;
            num.innerText = list[i].learnerCount;
            templete.parentNode.appendChild(cloned);
        }

        setInterval(scroll,5000);

        function scroll(){
            var oLi = aLi[20].cloneNode(true);
            oUl.insertBefore(oLi,aLi[1]);
            startMove(oUl,{bottom:-990},function(){
                oUl.removeChild(aLi[21]);
                oUl.style.bottom = '-900px';
            });
        }
    }

})();

/*运动*/
var startMove = (function(){
    return function(obj,json,times,fx,fn){

        if( typeof times == 'undefined' ){
            times = 400;
            fx = 'linear';
        }

        if( typeof times == 'string' ){
            if(typeof fx == 'function'){
                fn = fx;
            }
            fx = times;
            times = 400;
        }
        else if(typeof times == 'function'){
            fn = times;
            times = 400;
            fx = 'linear';
        }
        else if(typeof times == 'number'){
            if(typeof fx == 'function'){
                fn = fx;
                fx = 'linear';
            }
            else if(typeof fx == 'undefined'){
                fx = 'linear';
            }
        }

        var iCur = {};

        for(var attr in json){
            iCur[attr] = 0;

            if( attr == 'opacity' ){
                iCur[attr] = Math.round(getStyle(obj,attr)*100);
            }
            else{
                iCur[attr] = parseInt(getStyle(obj,attr));
            }

        }

        var startTime = now();

        clearInterval(obj.timer);

        obj.timer = setInterval(function(){

            var changeTime = now();

            var t = times - Math.max(0,startTime - changeTime + times);

            for(var attr in json){

                var value = Tween[fx](t,iCur[attr],json[attr]-iCur[attr],times);

                if(attr == 'opacity'){
                    obj.style.opacity = value/100;
                    obj.style.filter = 'alpha(opacity='+value+')';
                }
                else{
                    obj.style[attr] = value + 'px';
                }

            }

            if(t == times){
                clearInterval(obj.timer);
                if(fn){
                    fn.call(obj);
                }
            }

        },13);

        function getStyle(obj,attr){
            if(obj.currentStyle){
                return obj.currentStyle[attr];
            }
            else{
                return getComputedStyle(obj,false)[attr];
            }
        }

        function now(){
            return (new Date()).getTime();
        }

        var Tween = {
            linear: function (t, b, c, d){  //匀速
                return c*t/d + b;
            }
        }

    }
})();

/*分页模块，妙味分页*/
var page = (function(){
    return function(opt){
        if(!opt.id){
            return false;
        };
        var obj = opt.id;
        var nowNum = opt.nowNum || 1;
        var childLength = opt.childLength;
        var allNum = opt.allNum || childLength;
        var callback = opt.callback || function(){};
        // 可显示页数二分之一+1的位置
        var point = Math.floor(childLength/2) + 1;
        // 页数生成
        var pageInit = function(i){
            var oA = document.createElement('a');
            oA.setAttribute('index',i);
            oA.className = 'pg';
            oA.innerText = i;
            if(nowNum == i){
                addClass(oA,'selected');
            }
            return oA;
        }
        //当前页不等于1时上一页可选
        var oA = document.createElement('a');
        oA.innerText = '上一页';
        oA.setAttribute('index',nowNum - 1);
        if(nowNum != 1){
            oA.className = 'prv';
        }
        else{
            oA.className = 'prv f-dis';
        }
        obj.appendChild(oA);

        //生成具体页数，总页数小于等于可显示页数的情况
        if(allNum <= childLength){
            for(var i=1; i <= allNum; i++){
                var oA = pageInit(i);
                obj.appendChild(oA);
            }
        }
        //生成具体页数，总页数大于可显示页数的情况
        else{
            for(var i=1; i <= childLength; i++){
                //当前页是小于一半+1的可显示页数
                if(nowNum < point){
                    var oA = pageInit(i);
                }
                //当前页是倒数第1或倒数第2
                else if(allNum - nowNum <= point){
                    var oA = pageInit(allNum - childLength +i);
                }
                //当前页在可显示页数一半+1的位置显示，例如可以显示8页，当前页就在第5个位置
                else{
                    var oA = pageInit(nowNum - point + i);
                }
                obj.appendChild(oA);
            }
        }
        //当前页不是最后一页时显示下一页
        var oA = document.createElement('a');
        oA.innerText = '下一页';
        oA.setAttribute('index',nowNum + 1);
        if(allNum != nowNum){
            oA.className = 'nxt';
        }
        else{
            oA.className = 'nxt f-dis';
        }
        obj.appendChild(oA);

        //用addevent会重复注册
        var aA = obj.getElementsByTagName('a');
        for(var i=0;i<aA.length;i++){
            aA[i].onclick=function(){
                if(nowNum != parseInt(this.getAttribute('index'))){
                    var nowNum = parseInt(this.getAttribute('index'));
                    obj.innerHTML = '';
                    page({
                        id:opt.id,
                        nowNum:nowNum,
                        allNum:allNum,
                        childLength:childLength,
                        callback:callback
                    });
                    callback(nowNum,allNum);
                }
                return false;
            }
        }
    }
})();
})();

/*

元素选择器

*/
function $$(selector) {
    return document.querySelector(selector);
}

/*

绑定一个针对event事件的响应，响应函数为listener，兼容IE

 */
function addEvent(element, event, listener) {
    if (!!element.addEventListener){
        element.addEventListener(event,listener,!1);
    }else{
        element.attachEvent('on'+event,listener);
    }
}

/**

移除element对象对于event事件发生时执行listener的响应

 */
function removeEvent(element, event, listener) {
    if (!!element.removeEventListener){
        element.removeEventListener(event,listener,!1);
    }else{
        element.detachEvent('on'+event,listener);
    }
}

/**

 * 实现对click事件的绑定

 */
function addClickEvent(element, listener) {
    addEvent(element,"click",listener);
}

/**

* 实现对于按Enter键时的事件绑定

 */
function addEnterEvent(element, listener) {
    addEvent(element,"keyup",function(event){
        if (event.ctrlKey) {
            listener();
        };
    });
}

/*

 * [innerText的FF兼容]

 */
if (!('innerText' in document.body)) {
  HTMLElement.prototype.__defineGetter__('innerText', function(){
    return this.textContent;
  });
  HTMLElement.prototype.__defineSetter__('innerText', function(s) {
    return this.textContent = s;
  });
}

/*

 * [preventDefault 对IE的兼容]

 */
function preventDefault(event){
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue = false;
    }
}

/*

 * 判断parent是否element的祖先节点

 */
function isParent(element,parentName,stopElem){
    for (var node = element; node !== stopElem; node = node.parentNode) {
        if (node.nodeName.toLowerCase() === parentName) {
            return node;
        }
    }
    return false;
}

/*

 * 事件代理函数，实现对element里面所有tag的eventName事件进行响应

 */
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function(event){
        var event = event || window.event;
        var target = event.target || event.srcElement;
        var parent = isParent(target,tag,element);
        if (!!parent) {
            listener(parent,event);
        };
    })
}

$$.on = function(selector, event, listener) {
    addEvent($$(selector), event, listener);
}

$$.un = function(selector, event, listener) {
    removeEvent($$(selector), event, listener);
}

$$.click = function(selector, listener) {
    addClickEvent($$(selector), listener);
}

$$.enter = function(selector, listener) {
    addEnterEvent($$(selector),listener);
}

$$.delegate = function(selector, tag, event, listener) {
    delegateEvent($$(selector),tag,event,listener);
}

/*

 * get请求函数封装

 */
function get(url,options,callback){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                callback(xhr.responseText);
            } else {
                console.error('Request was unsuccessful: ' + xhr.status);
            }
        };
    }
    if (!!options) {
        var url = url + '?' + serialize(options);
    };
    xhr.open("get",url,true);
    xhr.send(null);

    function serialize(data){
        if (!data) {
            return "";
        };
        var pairs = [];
        for (var name in data) {
            if (!data.hasOwnProperty(name)) {
                continue;
            };
            if (typeof data[name] === "function") {
                continue;
            };
            var value = data[name].toString();
            name = encodeURIComponent(name);
            value = encodeURIComponent(value);
            pairs.push(name + '=' + value);
        };
        return pairs.join("&");
    }
}

/*

* 判断是否有某个className

*/
function hasClass(element, className) {
    var classNames = element.className;
    if (!classNames) {
        return false;
    }
    classNames = classNames.split(/\s+/);
    for (var i = 0, len = classNames.length; i < len; i++) {
        if (classNames[i] === className) {
            return true;
        }
    }
    return false;
}

/*

*添加className

*/
function addClass(element, className) {
    if (!hasClass(element, className)) {
        element.className = element.className ?[element.className, className].join(' ') : className;
    }
}

/*

* 删除元素className

*/
function removeClass(element, className) {
    if (className && hasClass(element, className)) {
        var classNames = element.className.split(/\s+/);
        for (var i = 0, len = classNames.length; i < len; i++) {
            if (classNames[i] === className) {
                classNames.splice(i, 1);
                break;
            }
        }
    element.className = classNames.join(' ');
    }
}