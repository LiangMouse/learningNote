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

  分为真值和假值，假值: false,0,'',nan,null,undefined

- null

  表示空值或无值

- undefined

  表示变量已声明但未赋值
  关于这两个关键字的释义和区别——[null 和 undefined 的区别](JavaScript/null和undefined的区别.md)

- Symbol

  es6 新增类型，表示唯一的标识符，通常用于对象的键
  `let sym = Symbol("id");`

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
	[Set常用方法](JavaScript/Set常用方法)
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
