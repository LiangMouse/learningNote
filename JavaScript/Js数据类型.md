# Js 数据类型

`JavaScript`根据数据存储的不同区分为**基本数据类型**(栈存储值)，和**引用数据类型**(栈存储引用，堆内存存储内容)

## 基本数据类型

- Number
  常见问题:

  - [0.1+0.2 的值?](JavaScript/0.1+0.2不等于0.3？)
  - 包含 NaN.Infinity.-Infinity 这样的特殊值
    - 其中 NaN 与 NaN 比较为 false，需要用`Number.isNaN`判断。而 Infinity 在 IEEE754 中指数全为 1，尾数全为 0，可以用常规等号判断

- String

  表示文本数据，由单引号、双引号或反引号包裹。

- Boolean

  分为真值`true`和假值`false`，假值: false,0,'',nan,null,undefined

- null

  表示空值或无值

  [null 和 undefined 的区别](JavaScript/null和undefined的区别.md)

- undefined

  表示变量已声明但未赋值
  关于这两个关键字的释义和区别——[null 和 undefined 的区别](JavaScript/null和undefined的区别及两者详解.md)

- Symbol

  es6 新增类型，表示唯一的标识符，通常用于对象的键
  `let sym = Symbol("id");`

  值得注意的是,`Symbol`类型的键不可枚举，使用`for in`或`Object.keys()`时不会遍历到`Symbol`类型的值。必须单独使用 `Object.getOwnPropertySymbols()` 来处理。

- BigInt
  能表示任意大小的数字，但不支持小数，不能直接与`Number`做运算。不能直接转成`JSON`数据。BigInt 之间可以做加减乘除

## 引用数据类型

- Object

  通用的对象类型，用于存储键值对，包含普通对象`{}`,数组`[]`,函数，日期，正则等，注意引用数据类型只存储在堆中的说法是错误的

- Array
  [常用数组方法](JavaScript/常用数组方法)
- Function
  表示可调用的代码块 JS 引擎内置一个[[call]]方法, 支持()来调用这个内置的`call`,但倘若不是一个 function 属性,()运算则会报错
- Set
  可支持迭代的有序列表，去重且元素唯一
  - delete 删除集合中给定的值
  - add 添加一个元素
  - has 判断某个元素是否在集合中，返回 boolean 值
- Map
  与 Object 的区别

  - map 元素顺序由插入顺序决定，而不是键的 ASCII 码顺序
  - map 在数据量大时相较于 object，在性能上有所优化
  - 不同于 Obj, Map 的键可以是任意类型，值可以是任意类型
  - 键必须唯一，值可以重复
  - map 无原型链

- WeakMap
  - 键必须是对象：WeakMap 的键只能是对象（或函数），不能是原始类型（如字符串、数字等）。
  - 弱引用：WeakMap 的键是 弱引用，如果没有其他引用指向这个键，对应的键值对会被自动垃圾回收。
  - 无迭代能力：WeakMap 不支持遍历，无法枚举键或值。

## 其他分类

### 是否可迭代

一个变量是否可迭代，取决于它是否实现了 `ECMAScript` 的 **“迭代器协议（iterator protocol）**”——即是否拥有 `Symbol.iterator` 方法。

具体如下代码

```javascript
const obj = {
  [Symbol.iterator]() {
    // 必须返回一个“迭代器对象”
    return {
      next() {
        return { value: 任意值, done: true / false };
      },
    };
  },
};
```

判断是否可迭代

```javascript
// 判断是否是可迭代对象
function isIterable(value) {
  // 排除[]取值时出现报错
  return (
    value !== undefined &&
    value !== null &&
    typeof value[Symbol.iterator] === "function"
  );
}
```

**可迭代类型**

- Array
- String
- Map
- Set
- arguments(类数组对象)
- NodeList
- Generater

需要注意的是`Object` **不是可迭代对象**

**可迭代类型可使用方法**

- Array.from(iterable)
- ...解构操作符
- for...of 遍历
- Promise.all, Promise.race...
- new Map(iterable)/Set/WeakMap/WeakSet

### 是否可枚举

可枚举关注的是对象的属性 (Keys) 是否对外“可见”。

**可枚举带来的可使用方法**

- for...in 循环（会遍历原型链上的可枚举属性）。
- Object.keys()（仅遍历自身可枚举属性）。
- JSON.stringify()。
- Object.assign()

## 数据类型转换

主要分为显示数据类型转换和隐式数据转换

**隐式**

- 计算中
- 对基本数据类型进行`.`和`[]`操作时的装箱
