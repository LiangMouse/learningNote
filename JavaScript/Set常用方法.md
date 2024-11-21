#### Set.add
增加元素，返回增加后的内容，但重复添加会被忽略
```javascript
const mySet = new Set();
mySet.add(1);            // 数字
mySet.add('hello');      // 字符串
mySet.add({ a: 1 });     // 对象
mySet.add([1, 2, 3]);    // 数组
mySet.add(1);            // 不会被添加

console.log(mySet);
// 输出: Set(4) { 1, 'hello', { a: 1 }, [ 1, 2, 3 ] }
```
#### Set.delete
删除元素
#### Set.has
参数接受一个值，如果有返回true，没有返回false