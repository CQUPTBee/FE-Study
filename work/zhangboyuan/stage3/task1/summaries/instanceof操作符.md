---
title: instanceof操作符详解
date: 2016-08-05 10:34:01
categories:
- 前端
tags: 
- JavaScript
---

我们先来看这样一个继承的栗子

```javascript
function Animal(){}
Animal.prototype = {};

function Cat(){}
Cat.prototype = Animal.prototype;

function Dog(){}
Dog.prototype = Animal.prototype;
```

很简单粗暴有木有，直接将父类的原型赋给子类的原型实现继承。然后我们创建一只猫（cat1）和一只狗(dog1)，最后得到如下蛋疼结果

```javascript
var cat1 = new Cat();
var dog1 = new Dog();

Console.log(cat1 instanceof Cat); //true  cat1是只猫，没错儿
Console.log(cat1 instanceof Dog); //true  cat1是只狗，什么鬼？

Console.log(dog1 instanceof Dog); //true  dog1是只狗，没错儿
Console.log(dog1 instanceof Cat); //true  dog1是只猫，我X见鬼了
```

这是因为当`instanceof`判断`cat1`是否为`Cat`的实例时，并不是判断`cat1`继承自`Cat`，而是判断`cat1`是否继承自`Cat.prototype`。因为在这里所有实例的原型都是`Animal`，所以检测返回的自然都是`true`

那么为什么之前讨论过的几种继承模式就没有出现这种情况？
是因为在实现继承的时候我们赋给子类原型的是父类的是个实例，而不是父类的原型。