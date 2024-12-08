# Js 数据类型

`JavaScript`根据数据存储的不同区分为**基本数据类型**(栈存储值)，和**引用数据类型**(栈存储引用，堆内存存储内容)

#### 基本数据类型

- Number
  常见问题:
  [0.1+0.2 的值?](JavaScript/0.1+0.2不等于0.3？)
  包含 NaN.Infinity.-Infinity 这样的特殊值

- String

  表示文本数据，由单引号、双引号或反引号包裹。

- Boolean

  分为真值`true`和假值`false`，假值: false,0,'',nan,null,undefined

- null

  表示空值或无值

  [null 和 undefined 的区别](JavaScript/null和undefined的区别及两者详解.md)

- undefined

  表示变量已声明但未赋值
  关于这两个关键字的释义和区别——[null 和 undefined 的区别](JavaScript/null和undefined的区别及两者详解.md)

- Symbol

  es6 新增类型，表示唯一的标识符，通常用于对象的键
  `let sym = Symbol("id");`

  值得注意的是,`Symbol`类型的键不可枚举，使用`for in`或`Object.keys()`时不会遍历到`Symbol`类型的值。必须单独使用 `Object.getOwnPropertySymbols()` 来处理。

- BigInt
  能表示任意大小的数字，但不支持小数，不能直接与`Number`做运算。不能直接转成`JSON`数据。BigInt 之间可以做加减乘除

---

#### 引用数据类型

- Object

  通用的对象类型，用于存储键值对，包含普通对象`{}`,数组`[]`,函数，日期，正则等

- Array
  [常用数组方法](JavaScript/常用数组方法)
- Function
  表示可调用的代码块，是一种特殊函数
- Set
  用于数组去重
  [Set 常用方法](JavaScript/Set常用方法)
- Map
  与 Object 的区别
  - 元素顺序由插入顺序决定，而不是键的 ASCII 码顺序
  - 不同于 Obj, Map 的键可以是任意类型，值可以是任意类型
  - 键必须唯一，值可以重复
- WeakMap
  - 键必须是对象：WeakMap 的键只能是对象（或函数），不能是原始类型（如字符串、数字等）。
  - 弱引用：WeakMap 的键是 弱引用，如果没有其他引用指向这个键，对应的键值对会被自动垃圾回收。
  - 无迭代能力：WeakMap 不支持遍历，无法枚举键或值。

### 常用类型转换

- 字符串转数字: `+`

```JavaScript
var arr = [0];
if(arr) { // arr转换成boolean的true
  console.log(arr == true); // 对象和数字或字符串或布尔值比较，对象会先转换成原始值(先valueOf()再toString())arr的toString相当于arr的join，转换成了0.然后0与true比较，true转换成1,0不等于1返回false
} else {
  console.log(a);
}
```

### 隐式数据类型转化

1. 数字加 bool 会把 bool 转换成数字
