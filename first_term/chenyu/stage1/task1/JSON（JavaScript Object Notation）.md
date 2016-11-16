# JSON（JavaScript Object Notation）





---

JSON是JavaScript的一个严格子集，利用一些JavaScript中的一些模式来表示结构化数据，
`注意： `
1. 它是一种数据格式，不是一种编程语言
2. 它并不属于JavaScript，很多编程语言都有应用到它，有针对Json的解析器和序列化器
## 语法
1. 简单值：使用与js相同的语法，在json中表示，字符串，数值，布尔值，null，但不支持undefined
2. 对象：复杂数据类型，表示的是一组无序的键值对，键值对中可以使简单值，也可以是复杂数据类型
3. 数组：复杂数据类型，表示一组有序值的列表，可以通过数组索引来访问其中的值，数组值，可以是简单值，对象，数组
`注意：`json不支持变量，函数，对象实例，它就是一种表示结构化数据的格式
### 简单值
`注意：`js字符串与json的最大区别：json字符串必须使用双引号（单引号将导致语法错误）
### 对象

    js中对象字面量：
    var person={
        name:"Lili",
        age:29
    }；
    或者
    var Object={
        name:"Lili",
        age:29
    };
    json中对象表示：
    {
         "name":"Lili",
        "age":29
    }
 `两者的区别：`
 1. json对象中没有声明变量的概念
 2. json对象中没有末尾的分号
 3. 对象属性必须加上双引号
 4. 同一个对象中绝对不应该出现两个同名属性
### 数组

    js中数组：
    var values=[25,"h1",true];
    json中的数组：
    [25,"h1",true]

`两者的而区别：`json数组没有变量和分号
## 解析与序列化
1. eval()函数可以解析，解释并返回js对象和数组
2.  json对象有两个方法：stringify()和parse()
stringify()用于把json对象序列化为json字符串
parse()用于把字符串解析为原生的js值
`注意：`
1. 默认情况下，JSON.stringify()输出的字符串不包括任何空格字符或缩进
2. 如过传给JSON.parse()不是有效的json，该方法会报错
### 序列化选项
JSON.stringify(序列化对象，过滤器，选项)
过滤器：可以使数组，可以是函数
选项：表示是否在json中保留缩进
1. 过滤结果
    过滤器为数组：

    var book={
        "title":"javaScript";
        "authors":
        [
        "Hellen"
        ],
        edition:3,
        year:2011 };
        var jsonText=JSON.stringify(book,["title","edition"]);
过滤器为函数：
        


    var book={
        "title":"javaScript";
        "authors":
        [
        "Hellen"
        ],
        edition:3,
        year:2011 };
        var jsonText=JSON.stringify(book,function(key,value){
        switch(key){
        case "authors":
        return value.join(",");
        case "year":
        return 5000;
        case "edition":
        return undefined;
        default:
        return value;
        }
        });

2. 字符串缩进
JSON.stringify()方法的而第三个参数用于结果中的缩进和空白符，如果这个参数是一个数值，那它表示每个级别缩进的空格数
var jsonText=JSON.stringify(book,null,4);
`注意：` 
* 只要传入有效的缩进参数，结果字符串就会包含换行符，
* 最大缩进的而空格数为10，所有大于10的数值都会自动转换为10
缩进参数
* 缩进参数可以为非数值（制表符，两个短横线等任意字符）
3.  toJSON()方法
可以给任何对象添加 toJSON()方法,返回自身的JSON数据格式



         var book={
        "title":"javaScript";
        "authors":
        [
        "Hellen"
        ],
        edition:3,
        year:2011 
        toJSON:function(){
        return this.title;
        }
        };
        var jsonText=JSON.stringify(book);
4.  序列化的内部顺序：
假设把一个对象传入JSON.stringify()，序列化该对象的顺序如下：
（1）如果存在toJSON()而且能通过它取得有效值，则调用该方法，否则返回对象本身
（2）如果提供第二个参数，应用这个函数过滤器。传入函数过滤器的值是第（1）步返回的值
（3）对第（2）步返回的每一个值进行相应的序列化
（4）如果提供第三个参数，执行相应的格式化
## 解析选项
JSON.stringify()方法接收的函数（称替换或过滤函数）
JSON.parse()方法可以接收另一个参数（称还原函数）

     var book={
        "title":"javaScript";
        "authors":
        [
        "Hellen"
        ],
        edition:3,
        year:2011 
        releaseDate:new Date(2011,11,1)
        };
        var jsonText=JSON.stringify(book);
        var bookCopy=JSON.parse(jsonText,function(key,value){
        if(key=="releaseDate"){
        return new Date(value);
        }else{
        return vlaue;
        }
        });
        console.log(bookCopy.releaseDate.getFullYear());
        






    
    




