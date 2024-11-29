# Vue 的 data 为什么是函数

Vue 中的 data 属性为什么是函数而不是一个对象

### 变量污染

vue 组件可能会创建多个实例，采用函数返回一个全新 data 形式，使每个实例对象的数据不会受到其他实例对象数据的污染

下边代码模仿源码中的 data 构建函数

```javascript
function Component() {}
Component.prototype.data = {
  count: 0,
};
// 创建两个组件实例
const componentA = new Component();
const componentB = new Component();
console.log(componentB.data.count); // 0
componentA.data.count = 1;
console.log(componentB.data.count); // 1
// 两者共用一个地址
```

但是如果使用调用函数，返回一个对象的方法，如下代码则可以避免这一点

```javascript
function Component() {
  this.data = this.data();
}
Component.prototype.data = function () {
  return {
    count: 0,
  };
};
```

实际上，根实例对象 data 可以是对象也可以是函数（根实例是单例），不会产生数据污染情况

组件实例对象 data 必须为函数，目的是为了防止多个组件实例对象之间共用一个 data，产生数据污染。采用函数的形式，initData 时会将其作为工厂函数都会返回全新 data 对象
