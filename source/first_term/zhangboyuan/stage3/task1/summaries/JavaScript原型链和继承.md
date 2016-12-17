---
title: JavaScript原型链和继承详解
date: 2016-08-05 19:30:11
categories:
- 前端
tags: 
- JavaScript
- 原生js
---
Created by Boyuan on 2016.8.2

转载请注明出处`http://t.cn/RtakVbK`

## 啥是对象？
ECMAScript给对象的定义是：”无序属性的集合，其属性可以包含基本值，对象或者函数“

在JavaScript中一切皆对象

## 属性类型

属性分为两类：`数据属性`和`访问器属性`

属性的特性是为了实现JS引擎而设计的，所以在代码中不能直接访问，但理解这些概念对理解JavaScript对象非常有帮助

可以通过`Object.defineProperty()`方法来修改属性的特性

###  数据属性

1.`[[Configurable]]` 

描述属性是否可修改 

**注意**：一旦将属性的`[[Configurable]]`置为`false`，就搞不回来了！

```javascript
var o = {};
Object.defineProperty(o, "name", {
    configurable: false,
    value: "123"
});

//报错!
Object.defineProperty(o, "name", {
    configurable: true,
    value: "123"
});


```


2.`[[Enumerable]]`

是否可被枚举。（能否通过`for in`循环返回属性）

3.`[[Writable]]`

表示能否修改属性的值

4.`[[Value]]`

很简单，就是属性的值，默认为undefined

### 访问器属性

访问器简单说就是用来访问对象中的属性的一个工具，所以这个工具肯定也有一些属性

**注意**：访问器属性不能直接定义，必须通过`Object.defineProperty()`定义


1.`Configurable`

表示能否被delete、能否修改这些特性、能否变成数据属性

2.`[[Enumerable]]`

表示是否可被枚举

3.`Get`

读取属性时所调用的函数（或者说所使用的方法）

4.`Set`

写入属性时所调用的函数

**看一个栗子**

```javascript
 var boyuan = {
    birth: 1996,
    age: 20
};

Object.defineProperty(boyuan, "_birth", {
    get: function () {
        return this.birth;
    },
    set: function (newValue) {
        this.birth = newValue;
        this.age = new Date().getFullYear() - newValue;
    }
});

boyuan._birth = 2000;
alert(boyuan.age);   //16
```
<!-- more -->
使用访问器属性的常见方式就是设置一个属性的值会导致其他属性发生变化。

> 注意：以上所说的`Object.defineProperty()`只在IE9、FF4+、Safari 5+、Opera12+和Chrome中支持。


## 创建对象

1. 工厂模式
2. 构造函数模式
3. 原型模式
4. **组合使用构造函数模式和原型模式**   
	- 动态原型模式
5. 寄生构造函数模式
6. 稳妥构造函数模式


### 一、工厂模式

直接看栗子

```javascript
function createPerson(name) {
    var o = new Object();

    o.name = name;
    o.sayName = function () {
        alert(this.name);
    };

    return o;
}

var boyuan = createPerson("Zhangboyuan");

boyuan.sayName();
alert(boyuan instanceof createPerson); 



```

工厂模式字如其名：只要给它材料，它就能给我们生产出我们所需的东西（对象）

**但问题来了：** 在上面的栗子中，如何确定`boyuan`这个对象是一个人呢？他也有可能是一个外星人？我们甚至连他是从哪个工厂生产出来的都不知道（刚生下来就找不到妈了）

所以说这种模式只能造出来一个个的对象，每一个对象都独立存在，且不属于任何一个类（但也会继承自Object对象）。

### 二、构造函数模式

#### a.可解决工厂模式中对象类型的识别问题

```javascript

function Person(name){
    this.name=name;
    
    this.sayName = function(){
        alert(this.name);
    };

}

var boyuan = new Person("ZhangBoyuan");
var xinlei = new Person("YangXinlei");

boyuan.sayName();
xinlei.sayName();

//alert(boyuan instanceof Person);
//alert(xinlei instanceof Person);
```

- 没有显式地创建对象
- 直接将属性和方法赋给了this对象
- 无return		

在上面的栗子中，可以发现用`instanceof`检测`boyuan`和`xinlei`这两个对象的原型均为`Person`，所以我们就知道`boyuan`和`xinlei`是两个人类，而不是外星人。这是因为在这两个对象的原型都是`Person.prototype`，后文详说。

#### b.构造函数的用法

要创建Person的实例必须使用`new`操作符，创建对象的过程实际上会经历以下4个步骤：		

1. 创建一个新的匿名对象		
2. 将构造函数的作用域赋给这个匿名对象		
3. 执行构造函数中的代码		
4. 返回新对象

[new操作符（点击链接查看动态图）](http://o6x2vif88.bkt.clouddn.com/new%E6%93%8D%E4%BD%9C%E7%AC%A6.gif)

构造函数也是函数，所以也不存在定义构造函数的特殊语法。任何函数，只要通过`new`操作符调用，那它就可以作为构造函数。反之，任何函数如果不以`new`操作符调用，那它就是个普通函数。


```javascript
function Person(name){
    this.name=name;

    this.sayName = function(){
        alert(this.name);
    };
}

var boyuan = new Person("ZhangBoyuan");
person.sayName();   //"ZhangBoyuan"

Person("Boyuan");
window.sayName();   //"Boyuan"

var o = new Object();
Person.call(o, "Xinlei");
o.sayName();    //"Xinlei"
```

#### 问题又来了

```javascript
function Person(name) {
    this.name = name;

    this.sayName = function () {
        alert(this.name);
    };

}

var person1 = new Person("person1");
var person2 = new Person("person2");

console.log(person1);
console.log(person2);
console.log(person1.sayName == person2.sayName);
```

可以发现，对象实例`person1`里的`sayName`方法和`person2`里的虽然名字相同，但却是两个完全独立的对象。

> 面向对象的核心思想就是就是让我们尽可能地去编写低耦合，高聚合的代码

所以改一下上述栗子

```javascript
function Person(name) {
    this.name = name;
    this.sayName = sayName;
}

function sayName() {
        alert(this.name);
```

现在就可以让每个实例都共享这一方法了。

**缺点：** 如果对象要定义很多方法那么就要定义很多个全局函数，这样就丝毫没有封装性可言。

好在这些问题可以通过原型模式来解决

### 三、原型模式

#### a.什么是原型？

> 我们创建的每个函数都有一个`prototype`（原型）属性，它是一个指针，指向一个对象，而这个对象的用途是包含实例共享的属性和方法。

```javascript
function Person() {
    Person.prototype.name = "ZhangBoyuan";
    Person.prototype.sayName = function () {
        alert(this.name);
    };
}

var boyuan = new Person();
boyuan.sayName();

```
[图解原型（点击链接查看动态图）](http://o6x2vif88.bkt.clouddn.com/%E4%BB%80%E4%B9%88%E6%98%AF%E5%8E%9F%E5%9E%8B.gif)

#### b.有关原型的两个方法

1. `Object.getPrototypeOf()`方法

ECMAScript5新增加的方法，这个方法可以获取到一个对象的`prototype`的值。例如

```javascript
alert(Object.getPrototypeOf(boyuan) == Person.prototype); //ture
alert(Object.getPrototypeOf(boyuan).name); //ZhangBoyuan
```

2. `A.isPrototyoeOf(B)`方法

用来确定A是否是B的原型

`alert(Person.prototype.isPrototypeOf(boyuan)); //ture`

#### c.不能通过实例对象重写原型中的值，只能利用作用域链屏蔽

```javascript
//bad
function Person() {
    Person.prototype.name = "ZhangBoyuan";
    Person.prototype.sayName = function () {
        alert(this.name);
    };
}

var boyuan = new Person();
boyuan.prototype.name = "YangXinlei"; //报错
```

想要更改原型中的值直接利用作用域链屏蔽覆盖即可⬇️

```javascript
//good
function Person() {
    Person.prototype.name = "ZhangBoyuan";
    Person.prototype.sayName = function () {
        alert(this.name);
    };
}

var boyuan = new Person();
boyuan.name = "YangXinlei"; //屏蔽了原型中的name
alert(boyuan.name); //YangXinlei
```

可以用`delete`操作符删除对象属性（前提该属性的`[[configurable]]`为true）

```javascript
function Person() {
    Person.prototype.name = "ZhangBoyuan";
    Person.prototype.sayName = function () {
        alert(this.name);
    };
}

var boyuan = new Person();
boyuan.name = "YangXinlei"; //屏蔽了原型中的name
alert(boyuan.name); //YangXinlei
delete boyuan.name;
alert(boyuan.name); //ZhangBoyuan
```

#### d.如何确定一个属性是在对象中还是在原型中

- `hasOwnProperty()`方法可以检测一个属性是否存在于实例中。但是，它不能检测这个属性是否在原型中。

所以要检测属性是否在原型中就要结合`in`操作符判断

```javascript
function hasPrototypeProperty(object,name){
	//属性是否在原型中？
    return !object.hasOwnProperty(name) && (name in object);
}
```

####f. 使用对象字面量定义原型时需要注意的点

还是举一个🌰看看

```javascript
//bad 
function Person(){
}

var boyuan = new Person();

Person.prototype = {
    name : "ZhangBoyuan",
    sayName : function () {
        alert(this.name);
    }
};

boyuan.sayName();   //error

```

使用对象字面量方法定义原型相当于重写整个原型，由此会产生两个常见的问题，需要我们注意：

1. 实例化对象必须在放在定义原型属性之后进行
2. 使用对象字面量定义原型属性时最好让`constructior`属性重新指向构造方法

[图解问题一（点击链接查看动态图）]([实例化对象必须在放在定义原型属性之后进行](http://o6x2vif88.bkt.clouddn.com/%E5%AE%9E%E4%BE%8B%E5%8C%96%E5%AF%B9%E8%B1%A1%E6%94%BE%E5%9C%A8%E5%AE%9A%E4%B9%89%E5%8E%9F%E5%9E%8B%E5%B1%9E%E6%80%A7%E5%90%8E%E9%9D%A2.gif))

改正后代码如下

```javascript
//good
function Person(){
}

Person.prototype = {
    constructor : Person,  //重新指向构造方法函数
    name : "ZhangBoyuan",
    sayName : function () {
        alert(this.name);
    }
};

var boyuan = new Person();  //实例化对象放在定义原型属性后面
boyuan.sayName();   //ZhangBoyuan

```

#### e.原型模式的缺陷

对于引用类型属性的过度共享

举一个很简单的🌰

```javascript
function Person(){
}

Person.prototype = {
    constructor : Person, 
    friends : ["A","B"],
};

var boyuan = new Person();  //创建了一个张博元
var xinlei = new Person();  //创建了一个杨新雷

boyuan.friends.push("C");  //张博元交了一个朋友名字叫C

alert("张博元的朋友"+boyuan.friends);    //张博元的朋友: A,B,C   面无表情:-|
alert("杨新雷的朋友"+xinlei.friends);    //杨心雷的朋友: A,B,C   一脸懵逼:-o
```

### 四、组合使用构造函数模式和原型模式

创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。构造函数模式用于定义实例属性，而原型模式用于定义方法和公共属性。

```javascript
//组合使用构造函数模式和原型模式
function Person(name,friends){
	//把实例属性放在构造函数里
	this.name = name,
	this.friends = friends
}

Person.prototype = {
	//把要共享的方法（或属性）放在原型里
    constructor : Person, 
    sayName : function() {
    	alert(this.name);
    }
};

var boyuan = new Person("ZhangBoyuan",["A"]);   //创建了一个张博元，有一个朋友A
var xinlei = new Person("YangXinlei",["B,C"]);  //创建了一个杨新雷，有两个朋友B和C

boyuan.friends.push("D");  //张博元新交了一个朋友D

alert("张博元的朋友"+boyuan.friends);    //张博元的朋友: A,D   
alert("杨新雷的朋友"+xinlei.friends);    //杨心雷的朋友: B,C   
```

这种构造函数与原型混成的模式，是目前在ECMAScript中使用最广泛、认同度最高的一种创建自定义类型的方法。

#### 动态原型模式


我们可以看到上面的这种方式虽然解决了原型模式引用类型共享的问题。但是封装性比较差。下面我们不妨就把它封装一下⬇️

```javascript
function Person(name) {
    this.name = name;

    if (typeof this.sayName != "function") {
        Person.prototype.sayName = function () {
            alert(this.name);
        }
    }
}

var boyuan = Person("zhangboyuan");
boyuan.sayName();
```

其中，`if`语句检查的可以是初始化之后应该存在的任何属性或方法——不必用一大堆if语句检查每个属性和每个方法；只要检查其中一个即可。即所谓动态创建原型模式。

**注意：**使用动态原型模式时不能使用对象字面量重写原型。因为这时的原型定义放到了构造函数里，字面量定义法会重写原型从而会切断构造函数和原型的联系。

### 五、寄生构造函数模式

该模式的基本思想是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象。

```javascript
function Person(name){
    var o = new Object();
    
    o.name = name;
    o.sayName = function(){
        alert(this.name);
    };
    
    return o;
}

var boyuan = new Person("zhangboyuan");
boyuan.sayName();  
alert(boyuan instanceof Person);  //false
```

有人可能要问了，这不就是工厂模式吗?

其实它和工厂模式唯一的区别就是在实例化对象的时候使用`new`操作符来调用构造函数

在前面说过
> 任何函数，只要通过new操作符调用，那它就可以作为构造函数。反之，任何函数如果不以new操作符调用，那它就是个普通函数。

[寄生构造函数模式（点击链接查看动态图）](http://o6x2vif88.bkt.clouddn.com/new%E6%93%8D%E4%BD%9C%E7%AC%A62.gif)

在这里`Person`显然是一个构造函数。构造函数在不返回值的情况下，默认会返回新对象实例。而通过在构造函数的末尾添加一个return语句，就可以重写调用构造函数时返回的值。

实际应用

```javascript
function SpecialArray(){

    //创建一个默认数组
    var values = new Array();

    //添加值
    values.push.apply(values, arguments);

    //添加方法
    values.toPipedString = function(){
        return this.join("|");
    };

    //返回新的数组
    return values;
}

var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString()); //"red|blue|green"

alert(colors instanceof SpecialArray);  //false

```

由于返回的对象与构造函数的原型没有联系，所以也不能利用instanceof操作符来确定对象类型。所以如果能用别的模式尽量不要使用此模式。

### 六、稳妥构造函数模式

特点：

- 没有公共属性
- 方法中不使用`this`
- 实例化对象时不使用`new`操作符


```javascript
function Person(name){
	//Person.prototype.name = "zhangboyuan" ; //没有公共属性
    var o = new Object();

    o.sayName = function(){
        alert(name);
    };

    return o;
}

var boyuan = Person("zhangboyuan");
alert(boyuan.name); //undefined
boyuan.sayName(); //zhangboyuan
```

以这种方式创建的对象中，除了使用对象内定义的方法以外，没有其他办法可以访问到`name`的值，因为`name`是在构造函数的原始数据中作为参数传入的属性。

该模式适合在某些安全执行环境下使用（禁止使用this和new）


## 继承

1. 原型链继承

2. 借用构造函数继承
3. **组合继承**
4. 原型式继承
5. 寄生式继承


### 一、原型链继承

#### a.原型链概念

ECMAScript只支持实现继承，而且其实现继承主要依靠原型链来实现。不支持接口继承。

```javascript
function Person() {}
Person.prototype.sayName = function () {
    alert(this.name);
};

function Student(name,school) {
    this.name = name;
    this.school = school;
}

//子类继承父类
Student.prototype = new Person();

// -----------
var boyuan = new Student("Zhangboyuan","CQUPT");
boyuan.sayName(); //Zhangboyuan
```
原型链继承是通过创建`Person`的实例，并将该实例赋给`Student.prototype`实现。

不使用`Student`默认提供的原型，而是给它换了一个新原型；这个新原型就是`Person`的实例。 于是，新原型不仅具有了作为一个`Person`的实例所拥有的全部属性和方法，而且其内部还有一个指针`[[Prototype]]`，指向了`Person`的原型。

[原型链继承原理（点击链接查看动态图）](http://o6x2vif88.bkt.clouddn.com/%E5%8E%9F%E5%9E%8B%E9%93%BE%E7%BB%A7%E6%89%BF%E5%8E%9F%E7%90%86.gif)

#### b.给原型定义方法和属性时常需注意的两个坑

1.[给子类原型添加方法的代码要放在替换原型(继承)之后（点击链接查看动态图）](http://o6x2vif88.bkt.clouddn.com/%E7%BB%99%E5%8E%9F%E5%9E%8B%E6%B7%BB%E5%8A%A0%E6%96%B9%E6%B3%95%E7%9A%84%E4%BB%A3%E7%A0%81%E6%94%BE%E5%9C%A8%E6%9B%BF%E6%8D%A2%E5%8E%9F%E5%9E%8B%E4%B9%8B%E5%90%8E.gif)

```javascript
function Person() {}
Person.prototype.sayName = function () {
    alert(this.name);
};

function Student(name, school) {
    this.name = name;
    this.school = school;
}
Student.prototype.saySchool = function(){  //放到了继承的前面定义没卵用，要放到后面去。
	alert(this.school);
};

//子类继承父类
Student.prototype = new Person();

// -----------
var boyuan = new Student("Zhangboyuan","CQUPT");
boyuan.saySchool(); //报错
```

2.[通过原型链实现继承不能使用对象字面量定义原型（点击链接查看动态图）](http://o6x2vif88.bkt.clouddn.com/%E9%80%9A%E8%BF%87%E5%8E%9F%E5%9E%8B%E9%93%BE%E5%AE%9E%E7%8E%B0%E7%BB%A7%E6%89%BF%E4%B8%8D%E8%83%BD%E4%BD%BF%E7%94%A8%E5%AF%B9%E8%B1%A1%E5%AD%97%E9%9D%A2%E9%87%8F%E5%AE%9A%E4%B9%89%E5%8E%9F%E5%9E%8B.gif)

```javascript
function Person() {}
Person.prototype.sayName = function () {
    alert(this.name);
};

function Student(name, school) {
    this.name = name;
    this.school = school;
}

//子类继承父类
Student.prototype = new Person();

Student.prototype = {
	saySchool : function(){
		alert(this.school);
	}
};

// -----------
var boyuan = new Student("Zhangboyuan","CQUPT");
boyuan.sayName(); //报错
```

#### c.原型链的问题

1. 通过原型链实现继承时，原型实际上会变成另一个类的实例。于是，原先的实例属性也就顺理成章地变成了现在的原型属性了。
2. 在创建子类型的实例时，没有办法给父类型的构造函数传递参数。

```javascript
function Person(){
    this.friends = ["A", "B"];
}

function Student(){
}

Student.prototype = new Person();

var boyuan = new Student();
boyuan.friends.push("C");
alert(boyuan.friends);    //A,B,C

var xinlei = new Student();
alert(xinlei.friends);    //A,B,C
```

### 二、借用构造函数实现继承

中文讲的太含蓄，该方法英文名为`constructor stealing` 所以它叫`偷来构造函数实现继承`

那是怎么偷得呢？其实思路很简单，即在子类型构造函数的内部通过`call`或`apply`调用超类型构造函数。

```javascript
function Person(name) {
    this.name = name;
}

function Student(name,school) {
     Person.apply(this, arguments); //这行代码就等价于: this.name = name;
    this.school = school;
}

Student.prototype = new Person();

var boyuan = new Student("Zhangboyuan","CQUPT");
alert(boyuan.name);  //Zhangboyuan
```

上面的栗子中第6行，即在`Student`中调用`Person`函数（这时的`Person()`只代表一个普通函数，并非构造函数），通过`call()`方法将`Person()`方法作用域拉到当前的`Student`域下并执行。**简单说就是把`Person`中的代码偷来，放到`Student`里执行一遍，即所谓借用构造函数**

#### 缺陷和问题

只是单纯地使用借用构造函数时，方法和属性都在构造函数中定义，函数复用就无从谈起了。

```javascript
//定义Person类
function Person(name) {
    this.name = name;
    this.sayName = function(){
    	alert(this.name);
    }
}

//定义Student类
function Student(name, school) {
    Person.apply(this, arguments);
    this.school = school;
}

//让Student类继承Person
Student.prototype = new Person();

var boyuan1 = new Student("Zhangboyuan", "CQUPT");
var boyuan2 = new Student("Zhangboyuan","CQUPT");

console.log(boyuan1);
console.log(boyuan2);
console.log(boyuan1.sayName == boyuan2.sayName);
```

### 三、组合继承

思想：通过原型链实现对原型属性和方法的继承，通过借用构造函数实现对实例属性的继承

```javascript
function Person(name) {
    this.name = name;
}
Person.prototype.sayName = function () {
    alert(this.name);
};

function Student(name, school) {
	//继承属性
    Person.apply(this, arguments);
    
    this.school = school;
}

//继承方法
Student.prototype = new Person();

//给子类再添加一个方法
Student.prototype.saySchool = function(){
	alert(this.school);
};

var boyuan = new Student("Zhangboyuan", "CQUPT");
boyuan.sayName(); 
boyuan.saySchool(); 
```

组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点，是JavaScript中最常用的继承模式。

而且 `instanceof`或`isPrototypeOf()`也能够用于识别基于组合继承创建的对象。

END

<br>
<br>
- - -
补充内容
### 一、原型式继承
待续
### 二、寄生式继承
待续
### 三、寄生组合式继承
待续