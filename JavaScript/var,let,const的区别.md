# var.let.const

1. var 是函数作用域，let,const 是块级作用域

```javascript
for (var i = 1; i < 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, 100);
}
// output: 10个10
	//相当于i在顶层,每次循环都使用同一个i变量引用,setTimeout被放入执行栈时均为10，而const,let块级作用域会生成独立变量，并用闭包在setTimeout中捕获
```


2. var 命令会发生“变量提升”现象，即变量可以在声明之前使用，值为 undefined。

```javascript
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

3. 暂时性死区，let,const 变量的特点

```javascript
var tmp = 123;

if (true) {
  tmp = "abc"; // ReferenceError
  let tmp;
}
```

一个块中有 let 或 const 声明的属性，那么就不会受外部作用域同名属性的影响

```javascript
typeof x; // ReferenceError
let x;
```

为表示“死区”，上方代码会报错，而`typeof` 对一个未声明过的变量只会返回`undefined`

`let`不允许重复声明同一变量，而`var`可以重复声明同一变量，并用后边的值替代前边的值

4. `const`声明的值不能变，也意味着只声明不赋值对于`const`命令是非法的，一般用于引用类型，存储数据的引用。如果想实现引用类型内容的不可变，可以使用`object.freeze()`

```javascript
const obj = Object.freeze({
  name: "Alice",
  age: 25,
});

// 尝试修改属性
obj.name = "Bob"; // 无效操作，不会修改
console.log(obj.name); // 'Alice'
```

但是只能对第一层生效
