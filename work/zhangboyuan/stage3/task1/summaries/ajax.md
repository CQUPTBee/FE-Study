## ajax入门学习
通过看[视频](http://pan.baidu.com/s/1slUZl5j)学习了ajax的基本原理、概念和实际应用。

<br>
知识点总结如下
### ajax基础
1. 什么是AJAX  
2. 什么是服务器
3. 使用AJAX，读取服务器环境下的文件
4. 读取文件时注意编码一致
5. 运用AJAX读取服务器文件实例
6. 缓存及其影响
7. 用 new Date().getTime() 方式消除缓存的影响
8. 读取服务器文件中的数据全是字符串
9. eval() 方法
10. 用eval() 方法解析字符串
11. 文件的扩展名与AJAX的关系
12. 读取数组里的json
13. AJAX 分页实例，创建数据
14. 布局、ajax 读取、生成 li 元素，读取数据，预先清空数据
15. AJAX 原理、http请求：GET \ POST，两种方式的区别

### ajax中级
1. 编写 Ajax 库，AJAX 请求步骤
2. 创建 ajax 对象：XMLHttpRequest
3. 在 IE6 下兼容 XMLHttpRequest 的解决方案：ActiveXObject("Microsoft.XMLHTTP")
4. window属性与变量的关系
5. 用 window 属性来处理 IE6 的兼容性问题
6. 连接服务器：oAjax.open()
7. 同步与异步的区别
8. 发送请求：oAjax.send()
9. 接收返回：oAjax.onreadystatechange、readyState 属性、oAjax.status、oAjax.responseText
10. 封装 AJAX 函数

### ajax应用实例
使用 Callback 函数
callback 函数是一种以参数形式传递给另一个函数的函数。
如果您的网站上存在多个 AJAX 任务，那么您应该为创建 XMLHttpRequest 对象编写一个标准的函数，并为每个 AJAX 任务调用该函数。
该函数调用应该包含 URL 以及发生 onreadystatechange 事件时执行的任务（每次调用可能不尽相同）：

```javascript
<html>
<head>
<script type="text/javascript">
var xmlhttp;
function loadXMLDoc(url,cfunc)
{
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=cfunc;
xmlhttp.open("GET",url,true);
xmlhttp.send();
}
function myFunction()
{
loadXMLDoc("/ajax/test1.txt",function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  });
}
</script>
</head>
<body>

<div id="myDiv"><h2>Let AJAX change this text</h2></div>
<button type="button" onclick="myFunction()">通过 AJAX 改变内容</button>

</body>
</html>

```