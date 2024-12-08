# JS 深浅拷贝

基本数据类型存的是值，而引用类型存的是地址，直接进行两变量的引用拷贝`let obj1 = obj2`会导致他们实际指向同一个内容，因此对于引用数据类型有了深浅拷贝的说法

浅拷贝和深拷贝的差别就在"深浅"上。浅拷贝实现对单层引用类型的属性拷贝，而深拷贝会递归解引用实现多层引用类型的属性拷贝(复制引用类型指向堆中的属性内容并开拓一个新内存空间)

## 实现浅拷贝的方法

一 `...`展开运算符

```JavaScript
let obj1 = { name: "ls", age: 21, details: { city: "Xuan Cheng" } };
let obj2 = { ...obj1 }; // 浅拷贝

obj2.details.city = "Hang Zhou";
obj2.name = "liang mouse";
console.log(obj1.details.city); // 输出 "Hang Zhou"，因为 details 对象是引用拷贝
console.log(obj1.name); // 输出"ls"
```

二`Object.assign()`

```JavaScript
let obj1 = { name: "ls", details: { age: 25, city: "XC" } };
let obj2 = Object.assign({}, obj1);

obj2.name = "sl";
obj2.details.city = "CX";

console.log(obj1.name); // 输出 "ls"，因为 name 是基本类型，进行了值复制
console.log(obj1.details.city); // 输出 "CX"，因为 details 是引用类型，复制了引用
```

# 实现深拷贝的方法

`JSON.parse(JSON.stringfy(obj))`

```JavaScript
let a = [1, 2, 3, [3, 4, { name: 'jack' }]];
let b = JSON.parse(JSON.stringify(a));
// 序列化为JSON，反序列化为对象
a[3][1] = 5;
a[3][2].name = 'amy';

console.log(a);
console.log(b);
```

虽然容易写，但问题在于当`a`里边有函数,那么`b`实际上是接收不到的

#### 基础版本的手写深拷贝

```JavaScript
function deepCLone(oldData) {
  if (typeof oldData !== "object" || oldData === null) return oldData;
  let res = Array.isArray(oldData) ? [] : {};
  for (const k in oldData) {
    if (oldData.hasOwnProperty(k)) {
      res[k] = deepClone(oldData[k]);
    }
  }
  return res;
}

```

以上代码较容易理解但是存在一定缺陷。第一他用`[]`或`{}`来承载拷贝内容，丢失了拷贝内容的原型链。第二，如果深拷贝的对象带有循环引用，类似`obj.self = obj`，那么将造成栈溢出的错误

#### 支持原型继承和循环调用的版本

```JavaScript
function deepClone(obj, map = new WeakMap()) {
  // 使用weakmap来记录每个访问的对象，避免循环调用。并且WeakMap 中的键是弱引用，如果没有其他引用指向键，会自动释放内存
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // 检查循环引用
  if (map.has(obj)) {
    return map.get(obj);
  }

  const res = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
  // 继承对象的原型链

  map.set(obj, res);
  // obj为引用,如果指向同一个引用(循环调用)，代码会在上边直接return
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = deepClone(obj[key], map);
    }
  }

  // 如果拷贝对象中存在Symbol属性的键
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  for (const sym of symbolKeys) {
    res[sym] = deepClone(obj[sym], map);
  }

  return res;
}
```
