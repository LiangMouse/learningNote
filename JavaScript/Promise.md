# Promise

首先给一个问题，问下边这段代码的执行结果？

```javaScript
const promise1 = new Promise((resolve, reject) => {
  console.log("promise1");
  resolve("resolve1");
});
const promise2 = promise1.then((res) => {
  console.log(res);
});
console.log("1", promise1);
console.log("2", promise2);
```

创建 promise1,并在回调函数中打印`promise1`,并把该 promise 实例`fulfilled`给定值为 resolve1,创建 promise2,并将`promise.then`回调函数放在微任务队列中，打印`1 Promise {<fulfilled>,"resolve1"}`,由于 promise2 状态仍依赖 promise.then 执行所以打印`2 Promise {<pending>}`，执行栈清空执行微任务，打印 promise1 的返回值`resolve1`
要彻底理解这个问题，首先得知道`Promise`是什么

`Promise` 对象表示异步操作最终的完成（或失败）以及其结果值。一个`Promise`有三种状态，分别是`pending`(待结束),`fulfilled`(成功),`rejected`(失败)。

### promise 的值

```javaScript
// Pending Promise
const pendingPromise = new Promise(() => {});
console.log("Pending:", pendingPromise); // Promise { <pending> }

// Fulfilled Promise
const fulfilledPromise = new Promise((resolve) => {
  resolve("Success");
});
console.log("Fulfilled:", fulfilledPromise); // Promise { <fulfilled>: "Success" }

// Rejected Promise
const rejectedPromise = new Promise((resolve, reject) => {
  reject("Failure");
});
console.log("Rejected:", rejectedPromise); // Promise { <rejected>: "Failure" }
```

`Promise`构造函数的参数是最多两个，`resolve`和`rejected`的回调函数，来异步返回 promise 状态，从`pending`状态到含有处理结果的`fulfilled` 或`rejected`值

改变 promise 状态，还可以通过 Promise

```javascript
const innerPromise = new Promise((_, reject) => {
  setTimeout(() => reject("Inner rejected"), 1000); // 1秒后 innerPromise 变为 rejected
});

const outerPromise = new Promise((resolve) => {
  resolve(innerPromise); // outerPromise 的状态由 innerPromise 决定
});

outerPromise
  .then((result) => {
    console.log("Success:", result); // 不会执行
  })
  .catch((error) => {
    console.error("Error:", error); // 输出: Error: Inner rejected
  });
```

和`throw`抛出异常直接调用 rejected 的回调来触发

### 链式调用

`Promise.prototype.then()`、`Promise.prototype.catch()` 和 `Promise.prototype.finally()` 方法用于将进一步的操作与已敲定的 Promise 相关联。由于这些方法返回 Promise，因此它们可以被链式调用,避免原生`AJAX`的回调地狱

- `then`:

  .then() 方法最多接受两个参数；第一个参数是 Promise 兑现时的回调函数，第二个参数是 Promise 拒绝时的回调函数。每个 .then() 返回一个新生成的 Promise 对象，这个对象可被用于链式调用，例如：

  ```javascript
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("foo");
    }, 300);
  });
  myPromise
    .then(handleFulfilledA, handleRejectedA)
    .then(handleFulfilledB, handleRejectedB)
    .then(handleFulfilledC, handleRejectedC);
  ```

即使 `.then()` 缺少返回 `Promise` 对象的回调函数，处理程序仍会继续到链的下一个链式调用。因此，在最终的 `.catch()` 之前，可以安全地省略每个链式调用中处理已拒绝状态的回调函数。

- `catch`:

  `catch`可以看做是没有预留正确处理结果回调函数参数位置的`.then`,实际`.catch` 是 `.then(undefined, onRejected)` 的语法糖,专门用于处理`rejected`状态.

  ```javascript
  const promise = new Promise((resolve, reject) => {
    resolve("First success");
  });
  // 使用 .then 的第二个参数 vs .catch
  promise
    .then(
      (result) => {
        console.log("Step 1 Success:", result);
        throw new Error("Step 1 failed");
      },
      (error) => {
        console.log("Step 1 Error:", error); // 当前.then出现的错误，第二个不会捕获到这个错误
      }
    )
    .then(
      (result) => {
        console.log("Step 2 Success:", result); // 当前promise状态rejected而非fulfilled
      },
      (error) => {
        console.log("Step 2 Error in .then:", error); // 捕获 Step 1 的错误
      }
    )
    .catch((error) => {
      console.log("Final catch:", error); // 捕获链中剩余未处理的错误
    });
  //output: Step 1 Success: First success  Step 2 Error in .then: Error: Step 1 failed
  ```

- `finally`

  只要`promise`被 settle,就会执行的回调，不会影响`fulfilled`和`rejected`的值

### 其他的静态方法

- `promise.race` 一系列 promise 中返回第一个完成的 promise 实例值,返回它的 promise 结果
- `promise.all` 执行全部的 promise，并返回 promise 值的数组
- `promise.any` 等待第一个`fulfilled`的 promise,并返回他，如果均为 rejected,那么将返回一个错误信息的数组

---

axios 和 Async await 基于 Promise 实现
