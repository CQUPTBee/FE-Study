//DOM：创建，插入，删除元素
//帮助js操作页面元素
//如何添加
oli=document.createElement('li');
oli.innerHTML = otxt.value;//放在这里性能好一点。
oul.appendChild(oli);//都插到后面去了

//insertBefore(子节点，在谁之前插入)
oul.insertBefore(oli,ali[0]);//在前面来插，当没有li时就会出问题。
//加判断
if(ali.length == 0){
	oul.appendChild(oli);
}
else
{
	oul.insertBefore(oli,ali[0]);
}

//如何删除removeChild();
oul.removeChild(this.parentNode);

//文档碎片(理论上)：可提高DOM操作的性能（相当于一个口袋）
//文档碎片原理document.createDocumentFragment()
var iStart=new Date().getTime();//做测试
alert(new Date().getTime()-iStart);

//子节点（只有一层）childNodes(有兼容性问题)可配合nodeType用
//在FF有问题：会将空文本节点也计算在内
//3：文本节点
//1：元素节点
//加判断：
if(oul.childNodes[i].nodeType == 1){
	oul.childNodes[i].style.background = 'red';
}
//children兼容版的childNodes
oul.children.length;

//父节点（隐藏实例）parentNode
this.parentNode.style.display = 'none';
//offsetParent寻找当前元素用于定位的父级
//
//firstChild,lastChild,lastElementChild;
chrom: oul.firstChild.style.background = 'red';
FF : oul.firstElementChild.style.background= "red";
//兄弟节点：previousSibling，nextSibling
//previousElementSibling，nextElementSibling同上

//设置元素属性
otxt.setAttribute('value','attr');
getAttribute(),removeAttribute()

//className
for (i=0;i<oli.length;i++){
	if(oli[i].className == 'number'){
		oli[i].onclick = ();
	}
}

//通用函数getClass();