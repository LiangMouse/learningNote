# React设计理念
>  .  我们认为，React 是用 JavaScript 构建**快速响应**的大型 Web 应用程序的首选方式。  

## 那么什么会制约快速响应呢？
- JS运行时计算量与用户设备性能带来的`CPU`问题
	本质上，浏览器使用帧异步更新，如果一个帧都在执行JS线程而没有时间执行渲染进程自然会造成掉帧，卡顿。
	React在这里的解决方法是使用`时间分片`来解决。也就是预留部分时间来更新组件，源码中为5ms，即使没有更新完成，React仍会被控制权交还给浏览器用于渲染UI，减少掉帧可能。
	一句话概括：将**同步的更新**变为**可中断的异步更新**。
- 发送网络请求后，需要等待返回的`IO`问题
	网络延迟是前端开发无法解决的，但在网络延迟存在而保证交互友好是一个重要的命题
	理想的解决方案是发送API后在`React`实现了[Suspense](https://zh-hans.reactjs.org/docs/concurrent-mode-suspense.html)功能及配套的`hook`——[useDeferredValue](https://zh-hans.reactjs.org/docs/concurrent-mode-reference.html#usedeferredvalue)。
	在原有页面上保留一小会时间来等待网络返回,看上去就会丝滑很多~，这里实质上仍然是同步的更新变为可中断的异步更新的思想

## v15->v16的重构

React的理念是快速响应, 16 相比于15重构了整个架构, 那了解架构知其所以然就得知道v16为什么更加‘快速响应’

- Reactv15
	- React15主要由两部分组成
		- Reconciler（协调器）—— 负责找出变化的组件
			每当有更新就调用函数组件、或 class 组件的`render`方法，将返回的 JSX 转化为虚拟 DOM
			将虚拟 DOM 和上次更新时的虚拟 DOM 对比
			通过对比找出本次更新中变化的虚拟 DOM
			通知`Renderer`将变化的虚拟 DOM 渲染到页面上
		- Renderer（渲染器）—— 负责将变化的组件渲染到页面上
			- 由于React支持跨平台, 所以包含`ReactDOM`(浏览器)、`ReactNative`（移动端）、`ReactTest`(渲染出纯 Js 对象用于测试)、`ReactArt`(渲染到 Canvas, SVG 或 VML (IE8)).
			- 每次更新发生时，`Renderer`接到`Reconciler`通知，将变化的组件渲染在当前宿主环境。

	- React15的缺点
		- 在Reconciler中，`mount`的组件会调用`mountComponent`，`update`的组件会调用`updateComponent`。这两个方法都会递归更新子组件。
		- 由于递归执行，所以更新一旦开始，中途就无法中断。本质上属于前边提到过的不可中断的同步更新, 当层级很深时，递归更新时间超过了 16ms（浏览器主进程时），用户交互就会卡顿。

	- React16支持异步更新
		- React16在原有的协调器和渲染器的基础上新增一个用于控制调度任务优先级的调度器—— `Scheduler`, 他来保证仅高优任务进入协调器,浏览器主进程空闲触发回调
		- 此时v16的协调器从递归改为循环, 并在每次循环都判断是否进行中断
		- 调度器把任务交给协调器后, 协调器会为变化的虚拟dom打上对应变化的标签
		- 当所有组件都完成协调器的工作, 渲染器才会根据虚拟dom中打上的标签进行重渲染更新
		- 此时协调器采用的是`Fiber`架构
	- Fiber架构
		- 计算机科学中, `Fiber` 是一种最轻量化的线程。它是一种用户态线程（user thread），让应用程序可以独立决定自己的线程要如何运作。
		- React Fiber: React内部实现的一套状态更新机制。支持任务不同优先级，可中断与恢复，并且恢复后可以复用之前的中间状态。其中每个任务更新单元为React Element对应的Fiber节点。
			- 作为架构来说，之前React15的Reconciler采用递归的方式执行，数据保存在递归调用栈中，所以被称为stack Reconciler。React16的Reconciler基于Fiber节点实现，被称为Fiber Reconciler。
			- 作为静态的数据结构来说，每个Fiber节点对应一个React element，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。
			- 作为动态的工作单元来说，每个Fiber节点保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。
		- 详见-[](./Fiber架构.md)







