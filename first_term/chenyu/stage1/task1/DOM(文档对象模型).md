# DOM(文档对象模型)
-------
## 文档节点的知识点
* 文档节点是每个文档的根节点，称文档元素，为文档的最外层元素
*  每个文档只能有一个文档元素
*  在html页面中，文档元素始终都是`<html>`元素
*  在xml中任何元素都能成为文档元素
## Node类型
1. 除了IE外，其他所有浏览器都能访问到这个类型
2. js中所有类型都继承自Node类型
3. 每个节点都有一个nodeType属性，用于表明节点类型
###  nodeName和nodeValue属性
* 在使用前先检测节点类型
###  节点关系：
* 每个节点有一个childNodes属性，其中保存有一个NodesList对象（一种类数组对象），
`注意：`它不是Array的实例，具有length属性，保存在NodesList中的节点可以通过方括号，也可以使用item()方法访问


  ` 
        function covertToArray(){
		var array=null;
			try{
				array=Array.prototype.slice.call(nodes,0);
				//针对非IE浏览器		

			}catch(ex){
					array=new Array();
					for(i=0;len=nodes.length;i<len;i++){
						array.push(nodes[i]);
			}
			return array;
		}
`

### 操作节点
 1.appendChild()，用于向childNodes列表的末尾加入一个节点
` 注意： `如果传入到appendChild()中的节点已经是文档的一部分，那结果就是将该节点从文档的原位置转移到新位置
 2.  insertBefore(要插入的节点，作为参照的节点)
 3.  relaceChild(要插入的节点，要替换的节点)
`注意：`尽管从技术的角度，被替换的节点仍然还在文档当中，但它已失去在文档中的位置
 4.  removeChild(要移除的节点)移除节点而不是替换节点
`注意：`与replaceChild()一样尽管从技术的角度，被替换的节点仍然还在文档当中，但它已失去在文档中的位置
5. 其他方法:cloneNode()与normalLize()是所有类型的节点都有的
*  cloneNode()用于创建调用这个方法的节点的一个完全相同的副本
 cloneNode(true)执行深复制，也就是复制节点及其整个子节点树
 cloneNode(false)执行浅复制，即只复制节点本身，复制后返回的节点副本属于文档所有，但没有为它指定父节点
 `注意：`cloneNode()方法不会复制添加到DOM节点中的js属性，如事件处理程序等，这个方法只复制特性，（在明确指定的情况下也复制）子节点，其他一切都不会复制，IE也存在bug，它会复制事件的处理程序，建议在复制之前将处理程序移除
 normalLize()方法唯一的作用就是处理文档中的文本节点，
 `注意:`可能会出现的两种情况：由于解析器的实现和DOM的操作等原因，可能出现（文本节点不包含文本，接连出现两个文本节点的情况）
 当某节点调用此方法时候：就会查找上述两种情况，找到空文本节点则删除它，若找到相邻的两个文本节点，则将它们合并为一个文本节点
## Document 类型
js通过Document 类型表示文档，在浏览器中document对象是继承自Document的一个实例
1. 文档的子节点：DocumentType,Element,ProcessingInstruction 或Commet
2. 文档信息：URL,domain,referrer
3. 查找和元素：
        document.getElementById("要取得元素的id");
        `注意：`如果不存在带有相应元素的id则返回null
        document.getElementsByTagName("元素标签名");
        `注意：`返回的是带有包含零个或多个元素NodeList
        要想取得文档中所有元素，可向geTElementsByTagName('＊')
        document.getElementByName()此方法返回带有name特性的所有元素
        也会返回一个HTMLCollection
###  Element类型
