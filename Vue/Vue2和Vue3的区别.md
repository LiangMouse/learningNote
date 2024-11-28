# Vue2 和 Vue3 的区别

#### 生命周期部分

虽然两个都是创建，挂载，更新，卸载。但是 Vue3 在每个生命周期钩子前添加 on 标明是生命周期。
并且 Vue3 的 setup 语法糖围绕

#### 多根节点

vue2 在模版中使用多个根节点会报错，而 Vue3 支持这个写法

#### API 风格

Vue2 是选项 API，data,props,computed,watch,生命周期钩子散乱摆放
Vue3 组合式 API 将同一逻辑内容写在一起，增加代码可读性，内聚性
对于 this 的依赖程度不同，同一功能模块的代码组织性，对 TS 的支持性

#### Vue3 异步组件

Vue3 提供 Suspense 组件，在模板中使用，允许程序在异步组件加载完成渲染兜底内容。

```html
<tempalte>
	<suspense>
		<template #default>
			 <List />
		</template>
		<template #fallback>
			<div> Loading... </div>
		</template>
	</suspense>
</template>
```

#### 响应式原理

Vue2 的响应式原理基础是`Object.defineProperty`,Vue3 的响应式基础是`Proxy`
前者的缺陷：
无法监听对象或数组新增、删除的元素。
Vue2 通过`hack`处理重写数组的 push、pop、shift、reverse 等方法进行重写，以拦截修改操作
通过 Vue.set 方法动态为对象的属性添加响应式能力
使用 Vue3 的 Proxy 可以监听引用数据(基本类型被包装成引用类型)以及对象的新增和删除,length 变化。且数据量较大时无需递归处理引用数据，性能更友好

#### 打包优化

`Tree-shaking`:模块打包中的概念，移除 JavaScript 上下文未引用的代码，主要依赖于`import`和`export`语句，来检测代码模块是否被导出，导入且未引用。
在 Vue2 中全局 API 暴露在 VUe 实例上，即使未使用也无法通过**tree-shaking**进行消除
Vue3 考虑到`tree-shaking`支持，API 只能使用 ES 模块构建的命名导出进行访问

```javascript
import Vue from "vue";
Vue.nextTick(() => {}); // 一些和DOM有关的东西 });

//vue2
import { nextTick } from "vue"; // 显式导入
nextTick(() => {}); // 一些和DOM有关的东西 });
//Vue3
```

#### TypeScript 支持

Vue3 用 TypeScript 重写，有更好的 TS 支持
