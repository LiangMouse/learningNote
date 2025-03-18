# React 和 Vue 区别
- Vue使用模版语法，React用JSX渲染语法，Vue性能相对更好，Vue性能更好，点对点更新，Map存储了每个ref/reactive变量，变量更新只会通知特定的变量Render,而非react的组件为单位render。jsx更多依赖运行时，模版可以在编译时
- Vue响应式给予对象基本操作的拦截，进行依赖追踪和应用。而React基于状态，需要开发者手动使用set更新状态，数据不可变的函数式，进行组件级的更新。
