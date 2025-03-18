## React设计理念
>  .  我们认为，React 是用 JavaScript 构建**快速响应**的大型 Web 应用程序的首选方式。  

那么什么会制约快速响应呢？
- JS运行时计算量与用户设备性能带来的`CPU`问题
	本质上，浏览器使用帧来承载计算JS进程和渲染进程，如果一个帧都在执行JS进程而没有时间执行渲染进程自然会造成掉帧，卡顿。
	React在这里的解决方法是使用`时间分片`来解决。也就是预留部分时间来更新组件，源码中为5ms，即使没有更新完成，React仍会被控制权交还给浏览器用于渲染UI，减少掉帧可能。
	一句话概括：将**同步的更新**变为**可中断的异步更新**。
- 发送网络请求后，需要等待返回的`IO`问题
	网络延迟是前端开发无法解决的，但在网络延迟存在而保证交互友好是一个重要的命题
	理想的解决方案是发送API后在`React`实现了[Suspense](https://zh-hans.reactjs.org/docs/concurrent-mode-suspense.html)功能及配套的`hook`——[useDeferredValue](https://zh-hans.reactjs.org/docs/concurrent-mode-reference.html#usedeferredvalue)。
