# async/await

`async/await` 的原理是基于 `Promise` 对象和`生成器函数`的协作,同时用到了操作系统协程的思想。

当 `async` 函数被调用时，它会立即返回一个 `Promise` 对象，(如果没有抛错和`await`的异常返回，会最终返回一个`fulfilled`状态值为函数执行结果，最初为`pending`),并且开始执行其中的代码。

当遇到 `await expression` 时：

1. 同步执行 expression：引擎立即开始执行 await 后面的表达式（例如 async2()）。如果 async2() 内部全是同步代码，这些代码会 立即 运行完毕。

2. 暂停并入队：无论 expression 立即完成还是需要异步等待，await 都会做两件事：

- 暂停 当前 async 函数的执行。

- 将函数中 await 之后的代码 (await 后续代码块) 封装成一个 微任务，并将其推入 微任务队列 的末尾。

- 控制权立即交还 给外部的同步代码。

同时 await 后边的内容必须是个 Promise 对象，如果不是比如 `await 3`会转成`Promise.resolve(3)`
来段代码，看懂或许就明白了

```javascript
async function example() {
  console.log("Start"); // 同步操作

  const promise = new Promise((resolve) => {
    console.log("Inside Promise"); // 同步操作
    setTimeout(() => {
      console.log("Promise resolved"); // 异步操作
      resolve("Result from Promise");
    }, 2000);
  });

  console.log("After creating Promise"); // 同步操作

  const result = await promise; // 等待 promise 被 resolved
  console.log("After await:", result); // 继续执行代码，异步操作完成

  console.log("End"); // 同步操作
}

example();
```
