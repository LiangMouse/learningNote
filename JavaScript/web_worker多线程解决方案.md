# Web Worker 基础

## 是什么

Web Worker 提供在浏览器中创建后台线程的能力，用于在不阻塞主线程（UI 线程）的情况下执行计算/IO 等任务。Worker 与主线程相互独立，通过消息传递通信。

类型概览：

- Dedicated Worker：单页面独占；
- Shared Worker：可被多个页面共享；
- Service Worker：介于页面与网络之间的代理层（离线、缓存、拦截请求），不在本文展开。

## 通信与限制

- 通信：`postMessage` + `onmessage`，数据使用结构化克隆（或 Transferable 转移所有权，如 ArrayBuffer）；
- 环境限制：Worker 不能直接操作 DOM/`window`，但可使用计时器、`fetch`、`WebCrypto`、`IndexedDB` 等；
- 同源限制：`new Worker(url)` 需同源（或设置合适的 CORS 头）。

## 常见应用场景

- 计算密集：图像/音频处理、数据压缩/加密、复杂算法；
- 大数据解析：日志解析、CSV/JSON 大文件增量处理；
- 富编辑/可视化：代码高亮、Diff 计算、地理计算；
- 流式处理：与 `ReadableStream`/`TransformStream` 配合，边读边算；
- 不中断 UI 的长任务：避免卡顿，保障交互流畅。

## 极简示例

main.js：

```js
const worker = new Worker("/worker.js");

worker.onmessage = (e) => {
  console.log("result:", e.data);
};

worker.postMessage({ type: "sum", payload: [1, 2, 3, 4] });
```

worker.js：

```js
self.onmessage = (e) => {
  const { type, payload } = e.data;
  if (type === "sum") {
    const result = payload.reduce((a, b) => a + b, 0);
    self.postMessage(result);
  }
};
```

> 参考资料 [mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)
