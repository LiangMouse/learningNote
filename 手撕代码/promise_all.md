```javascript
function PromiseAll(arr) {
  if (!Array.isArray(arr)) {
    return Promise.reject(new TypeError("参数必须是数组"));
  }

  return new Promise((resolve, reject) => {
    const len = arr.length;
    if (len === 0) return resolve([]);

    const result = [];
    let succeeded = 0;

    for (let i = 0; i < len; i++) {
      Promise.resolve(arr[i])
        .then((value) => {
          result[i] = value;
          if (++succeeded === len) {
            resolve(result);
          }
        })
        .catch(reject);
    }
  });
}
function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "function" || typeof obj === "object") &&
    obj instanceof Promise
  ); //typeof obj.then
}
```