# apply,bind 和 call

## call

函数的方法，作用

- 1.可以调用这个函数
- 2.可以改变函数 this 的指向
  this: this 是函数中的一个特殊对象，它指向调用该函数的上下文对象。具体指向哪个对象取决于函数是如何调用的。在全局作用域中，this 指向全局对象（浏览器环境中是 window 对象）。在对象方法中，this 指向调用该方法的对象。在构造函数中，this 指向新创建的对象。通过使用箭头函数，this 会捕获其外层作用域的 this 值，因此不会被改变。
- 3.给函数传入参数

```JavaScript
// 默认下 this 在 window，输出 undefined,传入 cat,此时输出喵喵
let dog = {
  function eat(food) {
  console.log(`我喜欢吃${food}`)
}
food = '骨头'
}
let cat = {
  name = '喵喵'
}
dog.eat.call(cat,'鱼')
```

如果在此种案例下，eat 函数需要多个参数 food1,food2.那么需要
`dog.eat.call(cat,'鱼','肉')`

## apply

apply 相较于 call,只有传参不同,对于上边的示例他用**数组**来传参其他部分完全相同,对于(...args)参数列表传参使用`apply`更有优越性
`dog.eat.apply(cat,['鱼','肉'])`

## bind

bind 相较于 call,区别在于他不会立即调用，而是仅仅返回修改后的函数

```JavaScript
dog.eat.call(cat,'鱼','肉')
//上下代码相同
let fun = dog.eat.bind(cat,'鱼','肉')
fun()
```

优点：多重继承 缺点：只能继承父类实例的属性和方法，不能继承原型上的属性和方法

> 参考资料:
> [bili - 三个的不同与应用](https://www.bilibili.com/video/BV1944y1q7N4/?spm_id_from=333.337.search-card.all.click&vd_source=39b8f20f3a6b36dba170ad1d5d767c9d)<a href="">
> [bili - 手写实现 call.apply](https://www.bilibili.com/video/BV1fP41197ow/?spm_id_from=333.337.search-card.all.click&vd_source=39b8f20f3a6b36dba170ad1d5d767c9d)
