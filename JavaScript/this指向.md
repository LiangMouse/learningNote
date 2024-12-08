# this 指向

### 为什么 JavaScript 要有 this

```javascript
var obj = {
  foo() {
    this.a = 11111;
  },
  fun() {
    console.log(this.a);
  },
};
obj.foo();
setTimeout(obj.fun, 0);
```

`setTimeout` 函数的回调函数中，this 指向 全局对象 window，而不是 obj
