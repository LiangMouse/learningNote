# Diff 算法

**Diff 算法**：在 Fiber 更新时，处于 `update` 阶段的组件会把当前组件与上次更新时对应的 `Fiber` 节点比较，这一过程称作 diff，并据此生成新的 Fiber 节点。

## 源码视角

React 源码中将新 Fiber 称作 `workInProgress Fiber`，当前屏幕上渲染的 Fiber 称作 `current Fiber`。生成新 Fiber 的过程需要通过对比旧 Fiber 来降低性能开销，并依赖 React 组件返回的 **JSX 对象**，可用如下伪代码表示

```js
workInProgrssFiber = diff(jsx, currentFiber);
```

## 性能

React 应用会频繁改动数据来驱动 UI 更新，也就意味着 diff 算法被高频调用，关键在于让性能开销可控。

常规对**树**这一数据结构进行比对的算法时间复杂度是 `O(n³)`，开销巨大。

> **O(n³) 由来**
>
> 左树中任意节点都可能出现在右树，所以在遍历左树时必须同步遍历右树以找到对应关系，这一步的时间复杂度约为 `O(n²)`；随后仍需对各节点执行增删移操作，相当于再套一层循环，最终达到 `O(n³)`。

### React diff 的剪枝策略

- 只对同级元素进行 Diff。如果一个 `DOM` 节点在前后两次更新间跨越了层级，React 不会尝试复用它。
- 不同类型的元素会生成不同的子树。如果元素由 `div` 变为 `p`，React 会销毁 `div` 及其子孙节点，并新建 `p` 子树。
- 使用 `key` 来表征列表元素的稳定性，从而决定是否可以复用。

#### `key` 的作用示例

```md
1. 加 key

<div key="1">1</div>             <div key="1">1</div>
<div key="2">2</div>             <div key="3">3</div>
<div key="3">3</div>  ========>  <div key="2">2</div>
<div key="4">4</div>             <div key="5">5</div>
<div key="5">5</div>             <div key="4">4</div>
操作：节点 2 移动到索引 2，节点 4 移动到索引 4。

2. 不加 key

<div>1</div>             <div>1</div>
<div>2</div>             <div>3</div>
<div>3</div>  ========>  <div>2</div>
<div>4</div>             <div>5</div>
<div>5</div>             <div>4</div>
操作：需要修改第 1～5 个节点的 innerText。
```

## mini-diff

```typescript
// 根据newChild类型选择不同diff函数处理
function reconcileChildFibers(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  newChild: any
): Fiber | null {
  const isObject = typeof newChild === "object" && newChild !== null;

  if (isObject) {
    // object类型，可能是 REACT_ELEMENT_TYPE 或 REACT_PORTAL_TYPE
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE:
      // 调用 reconcileSingleElement 处理
      // // ...省略其他case
    }
  }

  if (typeof newChild === "string" || typeof newChild === "number") {
    // 调用 reconcileSingleTextNode 处理
    // ...省略
  }

  if (isArray(newChild)) {
    // 调用 reconcileChildrenArray 处理
    // ...省略
  }

  // 一些其他情况调用处理函数
  // ...省略

  // 以上都没有命中，删除节点
  return deleteRemainingChildren(returnFiber, currentFirstChild);
}
```

## 参考资料

- [官方博客](https://zh-hans.legacy.reactjs.org/docs/reconciliation.html#the-diffing-algorithm)

- [React 解密 -- 卡颂](https://react.iamkasong.com/diff/prepare.html)
