##DOM文档对象模型
####创建DOM元素
1.`document.creatElement('')`创建元素
2.appendChild在父级最后插入子节点
```
var oTxt= document.gerElementById('txt1');
vat oBtn=document.getElementBYId('btn1')

oBtn.onclick = function () {
	var oLi=document.creatElement('li');

oLi.innerHTML = oTxt.value;
oUl.appendChild(oLi);	//追加
}
```
3.insertBefore(子节点， 谁之前 )在父级

####删除、插入
**删除**
在父级下删除一个子节点`removeChild`
```
var aA=document.getELemtsByTagName('a');
var oUl=document.getElements.()
var i=10;

for(i=0; i<aA.length; i++) {
	aA[i].onclick = function () {
		oUl.removeChild(this.parentNode);
		}//parentNode
}
```
###DOM节点
**获取子节点**
- childNodes（获取子节点，子节点只有一层）       nodeType
- children：取子节点，兼容
**父节点**
- parentNode   元素的结构父节点
- offsetParent  寻找当前元素定位父级
**首尾子节点**
- firstChild、firstElementChild
- lastChild、lastElementChild
火狐存在兼容性问题，解决方法：
1.判断
2.定义一个变量，将对象存起来
**兄弟节点**（取同级元素）
- nextSibling、nextElementSibling
- previousSibling、 previousElementSibling

###操纵元素属性
**元素属性操纵**
- oDiv.style.display= ' block ';
- oDiv.style[ "display" ] = "block";
**DOM方式操纵元素属性**
- 获取：getArrtibute( 名称 )
- 设置：setAttribute( 名称，值 )
- 删除：removeAttribute( 名称 )
###DOM元素查找
**用className选择元素**
- 选择元素
 - 选出所有元素
 - 通过className条件筛选
- 封装成函数
`getBy()`
####文档碎片
1.提高DOM操作性能
2.原理 
3.创建文档碎片
`document.creatDocument.Fragment( )

##BOM
####window对象
- open
`window.open()`
 - 需要四个参数：要加载的URL，窗口目标，一个特性字符串，新页面是否取代当前页面的Boolean
 - 窗口目标targert: `_self`、`_blank`、`_parent`、`_top`
  >`document.write()`清空当前页面，并输出

 - 会返回一个新窗口的引用
- close
只能关闭有open打开的窗口
####属性
**navigateor对象**
`window.navigator.userAgent` 当前浏览器版本

**location对象**
 1. `window.location`当前页面地址，可以解析URL
 2. 是window和document的属性，即`window.location`和`document.location`引用的是同一对象
####尺寸及坐标
**可视区尺寸**
- `document.documentElement.clientWidth`
- `document.documentElement.clientHeight`

**滚动距离**
-` document.body.scrollTop`
- `document.documentElement.scrollTop`
####常用方法和事件
**系统对话框**
- 警告框：`alert（"内容"）`，没有返回值；
- 选择框：`confirm（"提问内容"）`，返回Boolean；
- 输入框：`prompt（`，返回字符串或null

**window对象常用事件**
- onload
- onscroll
- onresize

 侧边栏广告：
```
window.onresize = window.onload = window.onscroll = function () {
	var oDiv=document.getElementById('div1');
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	var t= (document.documentElement.clientHeight-oDiv.offsetHeight)/2;

	oDiv.style.top = scrollTop+t+'px';
    //starMove(oDiv,{top:scrollTop+t});
```
回到顶部的按钮
```
window.onload = function () {
	var oBtn = document.getElementById('btn1');
	var bSys=true;
	var timer=null; 
	
	//检测用户是否拉滚动条
	window.onscroll = function () {
		if (!bSys) {
		clearInterval(timer);
		}
		bSys = false;
	};


	oBtn.onclick = function () {

		timer=serInterval(function () {

		var scrollTop =document.documentElement.scrollTop||document.body.scrollTop;
		var iSpeed = Math.floor(-scrollTop/8);	//兼容谷歌

		//回到顶部，关闭定时器	
		if (scrollTop==0) {			
			clearInterval(timer);
		}

		bSys = true;
		document.documentElement.scrollTop = document.body.scrollTop = scrollTop+iSpeed;
	}, 30);
};
```