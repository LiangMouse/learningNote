# async/await

`async/await` 的原理是基于 `Promise` 对象和`生成器函数`的协作。

当 `async` 函数被调用时，它会立即返回一个 `Promise` 对象，(如果没有抛错和`await`的异常返回，会最终返回一个`fulfilled`状态值为函数执行结果，最初为`pending`),并且开始执行其中的代码。当遇到 await 表达式时，async 函数会暂停执行(await 类似 yield)并将控制权转交给迭代器对象，也就是`await`后的内容，该对象会执行一个 next() 方法来将获取到的 Promise 对象进一步传递。

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
