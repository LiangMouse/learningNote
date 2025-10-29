# Promise 基础

## 基本概念

`Promise` 对象表示异步操作最终的完成（或失败）以及其结果值。一个 `Promise` 有三种状态，分别是 `pending`（待结束）、`fulfilled`（成功）、`rejected`（失败）。使得 JavaScript 的异步编程可以像同步一样进行 `return`。

## Promise 状态

### 三种状态

```javascript
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

### 状态转换

`Promise` 构造函数的参数是最多两个，`resolve` 和 `reject` 的回调函数，来修改 `Promise` 状态（此外还可以通过 `throw` 关键字抛出异常修改状态），从 `pending` 状态到含有处理结果的 `fulfilled` 或 `rejected` 值。并且 `Promise` 对象状态在修改一次（敲定）后就不能再次修改。

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

## Promise 方法

### 链式调用

`Promise.prototype.then()`、`Promise.prototype.catch()` 和 `Promise.prototype.finally()` 等方法用于将进一步的操作与已敲定的 Promise 相关联。由于这些方法返回 Promise，因此它们可以被链式调用，避免原生 `AJAX` 的回调地狱。

#### then() 方法

`.then()` 方法最多接受两个参数：第一个参数是 Promise 兑现时的回调函数，第二个参数是 Promise 拒绝时的回调函数。每个 `.then()` 返回一个新生成的 Promise 对象，这个对象可被用于链式调用。

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

#### catch() 方法

`catch` 可以看做是没有预留正确处理结果回调函数参数位置的 `.then`，实际 `.catch` 是 `.then(undefined, onRejected)` 的语法糖，专门用于处理 `rejected` 状态。

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

// output: Step 1 Success: First success  Step 2 Error in .then: Error: Step 1 failed
```

#### finally() 方法

只要 `Promise` 被 settle，就会执行的回调，不会影响 `fulfilled` 和 `rejected` 的值。

### 静态方法

#### Promise.all()

执行全部的 Promise，并返回 Promise 值的数组。如果任何一个 Promise 被拒绝，整个 Promise.all() 就会被拒绝。

```javascript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values); // [3, 42, "foo"]
});
```

#### Promise.race()

一系列 Promise 中返回第一个完成的 Promise 实例值，返回它的 Promise 结果。

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value); // "two"
});
```

#### Promise.any()

等待第一个 `fulfilled` 的 Promise，并返回它。如果均为 rejected，那么将返回一个错误信息的数组（race 是第一个敲定的）。

```javascript
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, "quick"));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, "slow"));

Promise.any([promise1, promise2, promise3]).then((value) => {
  console.log(value); // "quick"
});
```

#### Promise.allSettled()

等待全部的 `Promise` 状态敲定，返回一个数组，每个元素都是一个对象，包含 `status` 和 `value` 属性，分别表示 Promise 的状态和值。

```javascript
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "foo")
);

Promise.allSettled([promise1, promise2]).then((results) => {
  results.forEach((result) => console.log(result.status));
  // "fulfilled"
  // "rejected"
});
```

> 参考资料
>
> - [A+规范-生肉]https://promisesaplus.com/
