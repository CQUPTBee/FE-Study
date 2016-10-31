##Js预热
首先，js没有什么基础，通过视频总结的一些知识点，肯定是没有什么条理逻辑的，知识点也不够完整。
###密码提示框
`<input type="checkbox" onmouseover=''>`
####移入移出事件
- 当.....的时候
鼠标移上时 &nbsp;&nbsp;onmouseover
鼠标移出时 &nbsp;&nbsp;onmouseout
- alert 弹窗

**元素获取**
document.getElementById(' ')
括号中写类名
**属性操作**
obj.style.display='  ';将元素显示为‘  ’效果
- 赋值 `=`等号右边的内容赋给左边
- 点`.`是“的”的意思
- 引号`''`
- 使用class,js中class要用`className`的形式
####点击事件
点击时 &nbsp; &nbsp;onclick

####函数
 1.函数中，可用变量来简化代码
 `<script></script>`
2.函数的定义
`function 函数名 { ... }`
3.函数调用，一般只用函数名即可，但必须跟（）
4.windon.onload窗口加载完成后即显示
####收缩菜单
使用if条件判断
如：
```
	<script type="text/javascript">
		window.onload=function () 
		{
			var oBtn=document.getElementById('btn');
			var oList=document.getElementById('list');
			oBtn.onclick=function ()
			{

				if(oList.style.display=='block')
				{
					oList.style.display='none';
				}
				else 
				{
				oList.style.display='block';
				};
			};
		};
	</script>
```
**if判断条件**
单条件判断
```
if(   ) ...  else ...
```
多重条件判断
```
if(   ) ...  
     else if ...
       else  if ...
 else ... 
```
####全选框
复选框
`<input type="checkbox">`
`getElementsByTagName('...')` 选择一组元素,括号内是标签名
**for循环**
`for（i=0; 1<a.length; i++）`
`aBtn[i].onclick=function ()`
for循环和事件
this 当前发生事件的元素(类似于指针)
####选项卡
**原理**点击头部按钮时，改变`class`和`style.display`
**头部标签**
- 所有按钮的`className`为空
- 当前按钮的classNations为`active` - `this`
**选项卡内容**
- 所有div的display都为none
- 当前div的display为block
```
<script type="text/javascript">
		window.onload=function ()
		{
			var aBtn=document.getElementsByTagName('input');
			var oBtn=document.getElementsByTagName('div')
			var i=0;

			for (var i = 0;i<aBtn.length; i++) 
			{
					aBtn[i].index=i;/* 索引 */
					aBtn[i].onclick=function ()  /* 定义点击事件的函数 */
					{
						for(i=0; i<aBtn.length; i++)
						{
							aBtn[i].className=' ';
							oBtn[i].style.display='none';
						}   /* 将点击之后的状态清除 */
						this.className='active';  /* this当前发生事件的元素 */
						oBtn[this.index].style.display='block';
					};
				}	
		};
	</script>
```
初始状态选项卡
`style="display:block";`
###简易年历
innerHTML：获取对象内容或者向对象插入内容
可以实现HTML标签的效果
数组：存储数据的容器
###定时器
1.定时器的作用
2.开启定时器
- setInterval
`setInterval(function,time);`
time的单位是毫秒（ms）
- setTimeout 延时型

- 区别
setTimeout 只执行一次；setInterval不断执行
3.停止定时器
- clearInterval
`clearInterval()`
- clearTimeout
方法：
1.定义变量 `timer=null;`储存定时器
```
oBtn1.onclick=function ()  //开启定时器
{
	timer=setInterval(show, 1000);
};
oBtn2.onclick=function ()
{
	clearInterval(timer);
}
```
###数码时钟
思路：
1.获取系统时间
- Date对象
初始化对象`var oDate=new Date();`
- getHours, getMinutes, getSeconds

2.显示系统时间
 - 字符串连接
 - 空位补零

3.设置图片路径
 - charAt方法:


###延时提示


###无缝滚动
运动原理：
1.让div移动
2.offsetLeft： 元素左边距
&nbsp; &nbsp;offsetTop: 上边距 
 &nbsp; &nbsp;offsetWidth： 宽度
 &nbsp; &nbsp;offsetHeight：高度
3.用定时器让物体连续运动
```
setInterval (function() {
	
},time);
```
无缝滚动原理：
1.让ul一直向左移动，ul有绝对定位（滚动速度）
- `oUl.style.left=oUl.offsetLeft-5+'px'`
向左`-` 向右`+`
- 计算ul的宽度,修改ul的width
`oUl.style.width=aLi[0].offsetWidth*aLi.length+' px';`

2.复制li
- innerHTML和+=
`oUl.innerHTML+=oUl.innerHTML;`相当于做一次自加运算

3.滚动过界后，重置位置
- 检测ul的位置
```
if (oUl.offsetLeft<oUl.offsetWidth/2)
{
	oUl.style.left='0px';
}
```
**扩展**
1.改变滚动方向
- 修改iSpeed
`oUl.style.left=oUl.offsetLeft-iSpeed+'px';`
- 修改判断条件
向右滚动时，会超过边框
```
if(oUl.offsetLeft=oUl.offsetWidth/2)
{
	oUl.style.left.left='0px';
}
else if (oUl.offsetLeft>0)
{
	oUl.style.left=oUl.offsetWidth/2;
}
```
2.鼠标移入暂停
- 移入关闭定时器
关闭定时器`clearInterval(timer);`
- 移出重新开启定时器

方法：
1.用timer保存定时器数据
定义变量 ` var timer=null;`
赋值`timer=setInterval(function () {...}, time) `
2.加鼠标移入事件（在父级）
```
oUl.onmouseover=function ( ) {
	clearInterval(timer);
};  /* 鼠标移入关闭定时器 */
```
3.鼠标移出事件
```
oUl.onmouseout=function ( ) {
	timer=setInterval(function (){
	oUl.style.left=oUl.offsetLeft-iSpeed+'px';
	if(oUl.offsetLeft=oUl.offsetWidth/2)
{
	oUl.style.left.left='0px';
}
else if (oUl.offsetLeft>0)
{
	oUl.style.left=oUl.offsetWidth/2;
}
},30);
};  /* 鼠标移出开启定时器 */
```