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
- 所有div的displ都为none
- 当前div的displa为block
