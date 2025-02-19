# new 操作符

new 操作符是一个对构造函数生成对象原型的语法糖

## 手写 new

首先要知道`new操作符做了什么`

- **创建一个空对象**：new 会创建一个空的 JavaScript 对象 {}。

- **空对象的隐式原型指向构造函数的显式原型**：它将`{}`的`__proto__` 设置指向为构造函数的 `prototype` 属性，这样新对象就继承了构造函数的原型属性和方法。

- **执行构造函数,构造函数 this 指向新对象**：调用构造函数，将新创建的对象绑定到函数内部的 this，这样构造函数中的 this 指向新对象。

- **返回对象**：构造函数执行完成后，如果没有显式返回对象，则 new 操作符返回新创建的对象(如果 构造函数内部返回值是一个对象，那么 new 操作符会返回该对象而不是新创建的对象)

#### 让我们对应这四步给出代码

```JavaScript
function myNew(fn, ...arg){
  // 创建一个空对象
  const obj = {};
  // 空对象的隐式原型指向构造函数的显式原型
  Object.setPrototypeOf(obj,fn.prototype);
  // 执行构造函数,构造函数 this 指向新对象
  let ret = fn.apply(obj,arg);
  // 返回对象
  return ret && (typeof ret === 'object' || typeof ret === 'function') ? ret : obj;
}
```
