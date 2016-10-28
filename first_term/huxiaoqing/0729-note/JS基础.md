#JS基础
###JS组成
####ECMAScript
解释器，翻译的作用
定义变量、函数
几乎没有兼容性问题
####DOM
Document Object Model文档对象模型
####BOM
Browser Object Model浏览器对象类型
几乎不兼容
-window open
- window location
###变量类型
####typeof运算符
- 用法
- 返回值
- 常见类型：
 - number：数字，基本类型
  - string：字符串，基本类型
  - boolean：布尔  true/ false，基本类型
  - undefined：未定义类型  （未定义或为初始化）基本类型
   - object：对象，符合类型
   - function：函数
- 一个变量只存放一个类型

####数据类型转换
**显示类型转换**（强制转换）
1.**parseInt( ) **
 从字符串中提取数字，从左往右每个数字核对
```
var a='abc12';
alert(parseInt(a));  //返回NaN不是一个数字（Not A Number）
```
2.**parseFloat**
 提取小数
3.检测NaN：NaN与任何数据都是不相等的
 `isNaN`：返回true / false
 **隐示类型转换**
 1.`==`把两边的数据转换成相同类型 `===`不会自动转换
2.`-`、`*`、`/`自发把数据转换成数字
3.`+` 可做字符串连接；数字相加
###变量
####变量作用域
 局部变量：函数块作用域，定义在函数内
 全局变量：定义在函数之外
####闭包
函数存在嵌套关系，子函数和使用父函数定义的变量
###命名规范
注意可读性，规范性
匈牙利命名法：
- 类型前缀
|类型   |  前缀  |  类型	 |  实例 |
|:------:| :------: | :------: |:------:|
| 数组 | a | Array | aItem |
| 布尔值 | b | Boolean | bIsComlete|
| 浮点数 | f | Float | fPrice    |
| 函数 | fn |  Function | fnHandler |
| 整数 | i | Integer | iItenCount |
| 对象 | o | Object | oDiv1 |
| 正则表达式 | re | RegExp | reEmailCheck |
| 字符串 | s | String | sUserName|
| 变体变量 | v | Variant | vAnything |
- 首字母大写
函数和变量的命名都适用
### 运算符
**算术**
`+`,`-`,`*`,`/`,`%`（取模，求余）
隔行变色：用`%`可是偶数与基数行颜色相间
秒转分钟：`parseInt(n%60)+'分'+n%60+'秒'`
**赋值**
`=`,`+=`,`-=`,`*=`,`/=`,`%=`
**关系**
`<`,`>`,`<=`,`>=`,`==`,`===`,`!=`(会转换类型再比较),`!==`
**逻辑**
`&&`与,`||`或,`!`非,
**运算符优先级**

###程序流程控制语句
**判断**----if、switch、？
- if
```
if（条件）{
...
}
else if {
}
```
- switch
```
switch(值或变量){
	case 值1： ...
				break;
	case 值2： ...
				break;
	...
	default:  ...
}
```
- 条件？语句1：语句2

**循环**----while、for
**跳出**break、continue
- break：终止整个循环
- continue ：终止本次循环，继续下一次循环
**真假**true、false
- 真：true，非零数字，非空字符串，非空对象
- 假：false，零，空字符串，空对象，undefined
###JSON数据交换格式
1.JSON和数组可交换
2.for...in  跟数组的作用类似
```
var obj={1,2,3,4,5}
var attr='';
for (sttr in obj){
	alert(attr+''+obj[attr]);
}
```