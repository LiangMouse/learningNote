# Vue2 和 Vue3 的区别

## 生命周期部分

- Vue2 中的 `beforeCreate`（实例创建前）和 `created`（实例创建后）在 Vue3 中被 `setup()` 函数替代。setup() 在 beforeCreate 之前执行，覆盖了这两个钩子的功能。 因此 Vue3 中不再需要显式使用 beforeCreate 和 created。

#### 多根节点

vue2 在模版中使用多个根节点会报错，而 Vue3 支持这个写法

## API 风格

Vue2 是选项 API，data,props,computed,watch,生命周期钩子散乱摆放
Vue3 组合式 API 将同一逻辑内容写在一起，增加代码可读性，内聚性
对于 this 的依赖程度不同，同一功能模块的代码组织性

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

## 响应式原理

Vue2 的响应式原理基础是`Object.defineProperty`,Vue3 的响应式基础是`Proxy`

详见[专门的 Vue 响应式章节](./Vue响应式原理.md)

## 支持树摇

`Tree-shaking`:模块打包中的概念，移除 JavaScript 上下文未引用的代码，主要依赖于`import`和`export`语句，来检测代码模块是否被导出，导入且未引用。
在 Vue2 中全局 API 暴露在 `Vue` 实例上，即使未使用也无法通过**tree-shaking**进行消除
Vue3 考虑到`tree-shaking`支持，API 只能使用 ES 模块构建的命名导出进行访问

```javascript
//vue2
import Vue from "vue";
Vue.nextTick(() => {}); // 一些和DOM有关的东西 });
//Vue3
import { nextTick } from "vue"; // 显式导入
nextTick(() => {}); // 一些和DOM有关的东西 });
```

## TypeScript 支持

Vue3 用 TypeScript 重写，有更好的 TS 支持
