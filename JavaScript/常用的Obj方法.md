# Obj 常用方法

#### assign()

`Object.assign()` 静态方法将一个或者多个源对象中所有可枚举的自有属性复制到目标对象，并返回修改后的目标对象。

```javascript
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target);
// Expected output: true
```

#### create()

用于创建一个对象类型属性，参数可以指定一个对象作为他的原型，如果不指定默认是`null`，创建一个没有任何默认方法（如 toString、hasOwnProperty 等）的新对象。

字面量对象语法 const obj = {} 创建对象时，该对象的默认原型链是 Object.prototype

#### hasOwnProperty(key)

找一个对象上不包括原型链中是否存在此 key 的元素，存在返回 true,不返回 false
判断对象上是否有一个下标，还可以通过访问索引查看这个索引值是否是`undefined`来确认

#### keys()

返回一个对象中所有**自身**原型上属性组成的数组

#### freeze()

冻结一个对象，使其不可变，不能添加、删除、修改属性，只能读取属性。参数是对象本身，返回冻结后的对象。`const`声明对象仅是引用不可变，`freeze`可以实现值的不可变
