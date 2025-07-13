# SSE流式传输

与`websocket`一样, SSE(Server-Sent Events)是处理实时数据的一种常用解决方案

## 技术背景

### HTTP 请求-响应模型的局限性
传统的 HTTP 请求-响应模型是无状态的，每次请求都是独立的，服务器在响应后就会关闭连接。这种模型在处理静态内容时非常高效，但在需要实时更新的场景中显得力不从心。为了实现实时通信，开发者通常会使用轮询（Polling）或长轮询（Long Polling）技术。

- 轮询（Polling）：客户端定期向服务器发送请求，检查是否有新数据。这种方法简单但效率低下，因为大多数请求都会返回空结果。
- 长轮询（Long Polling）：客户端发送请求后，服务器保持连接直到有新数据可用。这种方法比轮询更高效，但仍然存在延迟和资源占用问题。

### WebSocket
WebSocket 是一种全双工通信协议，允许客户端和服务器之间建立持久连接，双方可以随时发送数据。WebSocket 解决了 HTTP 请求-响应模型的局限性，适用于需要频繁双向通信的场景。然而，WebSocket 的实现相对复杂，且在某些情况下可能过于重量级。

### Server-Sent Events (SSE)
Server-Sent Events（SSE）是一种 **基于 HTTP 协议**的单向通信技术，允许服务器向客户端推送实时更新。SSE 通过保持 HTTP 连接并持续发送数据来实现实时通信，适用于需要频繁更新但不需要客户端频繁响应的场景。

## 技术原理

浏览器默认支持API [EventSource](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource/EventSource) 构建函数生成一个SSE流

```javascript
var source = new EventSource("server-endpoint");

    source.onmessage = function(event) {
        console.log("New message: " + event.data);
    };

    source.onerror = function(event) {
        console.error("Error occurred: ", event);
    };
```
> 参考资料
> https://juejin.cn/post/7404739357083156516