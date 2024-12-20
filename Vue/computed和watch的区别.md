# computed 和 watch 的区别

#### 语义

computed: 一个数据受其他数据的影响，随他的变化而变化，也就是计算属性
watch: 监听数据或者状态路由等内容的变化，之后执行某一段逻辑

`computed`支持缓存，相依赖的数据发生改变才会重新计算；watch 不支持缓存，只要监听的数据变化就会触发相应操作

`computed`不支持异步，一般用于返回一个值。而`watch`支持异步，适合监听数据变化并进行副作用的异步操作

`computed`属性的属性值是一函数，函数返回值为属性的属性值，computed 中每个属性都可以设置 set 与 get 方法。watch 监听的数据必须是 data 中声明过或父组件传递过来的 props 中的数据，当数据变化时，触发监听器

computed 在组件挂载时就会调用一次，前提是在`template`中使用 computed 依赖数据
watch 不依赖数据是否在模板中使用，始终监听数据变化，数据变化就会触发
