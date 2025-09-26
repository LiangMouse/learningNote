# 原型、原型链与 Js 对象继承

#### 一句话

JS 最初没有类机制，所以采用了基于原型的继承模式，每个对象都可以通过原型链共享属性和方法。**原型**就是所有 Js 对象中全部存在的`__proto__`属性，当在 Js 中访问一个对象的属性时，在本对象没有的情况下，会沿着原型一步步向上找，从而构成了**原型链**，也是一个对象的属性委托链。

## 为什么要有原型链

不同于`C++`, `Java`这些面向对象编程的语言。 `JS` 为保证类的继承特性与灵活快速，选择了**原型链**作为解决方案

原型作为继承解决方案的好处

- 每个对象都能直接从另一个对象“克隆”或“委托”行为，不需要类的模板。

- 节省内存：方法共享在 `prototype` 上，不是每个实例都拷贝一份。

- 灵活：对象在运行时还能动态修改原型链。

## 核心释义

#### 原型

- 每个对象都会在其内部初始化一个属性，就是`__proto__`，称为隐式原型（不推荐直接使用，而是用`Object.getPrototypeOf`获取隐式原型）
- 同时在函数对象中，还有一个`prototype`对象，默认指向一个对象：`F.prototype = { constructor: F }`，在这个对象上又有隐式原型属性，指向更上层
- 特点: JavaScript 对象是通过引用来传递的，当修改原型时，与之相关的对象也会继承这一改变

#### 原型链

当我们需要一个属性的时，Javascript 引擎会先看当前对象中是否有这个属性， 如果没有的话，就会去自己 `[__proto__]` 关联的`prototype` 对象，如此递推下去，一直检索到 `null`

#### construcor

`constructor` 是原型对象(prototype)上的属性，默认指向对应的构造函数。它的主要作用是帮助我们从实例回溯到构造函数。它不是实例本身的属性，而是通过原型链继承来的。

### 关系

```javascript
instance.constructor.prototype === instance.__proto__; // true

// 上下两段代码的含义是相同的
let obj = new Obj();
obj.__proto__ === Obj.prototype; // true 实例的隐式原型指向构造函数的原型对象
```

## Js 如何实现继承

在 JavaScript 中，实现继承的方式有多种，包括构造继承、原型继承、实例继承和拷贝继承等。其中，使用构造函数与原型混合方式是较常用和推荐的方式。

```javascript
function Parent() {
  this.name = "poetry";
}

function Child() {
  this.age = 28;
}

// 使用构造函数继承
Child.prototype = new Parent();
Child.prototype.constructor = Child;

var demo = new Child();
console.log(demo.age); // 输出: 28
console.log(demo.name); // 输出: poetry
console.log(demo.constructor); // 输出: Child
```
