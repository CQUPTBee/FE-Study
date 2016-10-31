//闭包：父元素，子元素
//命名规范：可读性，规范性（w3c规范）
//json 和 数组(混着来)
var obj = {a:5, b:6,c:'abc'};

//arguments参数
arguments[0].style[arguments[1]]=arguments[2];

//style一般用来取行间样式。
//如何取非行间的样式：
//获取计算后的样式IE：currentStyle
//FF：getComputedStyle(
//)

//获取样式的兼容性问题IE、FF

function getStyle(obj,attr){
if(obj.currentStyle){
	alert(obj.currentStyle[attr]);
}
else{
	getComputedStyle(obj,false)[attr];
}
}

//数组定义方法：
var arr=[1,2,3,4];
push();unshift();pop();
//数组排序
sort(function (num1,num2){
	return num1-num2;
});//都是按字符串排序,比较函数做参数，可按数字排序。

concat();//连接数组arr1.concat(arr2);
var str = arr.join("-");//中间的分隔符。Ajax时比较常用。数组变字符串
split();//字符串变数组。与join作用相反，如var arr=str.split('-');

reverse();

//1.从数组中间删除元素
//2.从中间插入元素
//3.替换
//其实就是先删除，再插入
splice(开始的位置，长度);//强大的数组方法。

