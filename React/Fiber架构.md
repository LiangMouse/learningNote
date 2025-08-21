# Fiber 架构

#### 背景

在 `React v15` 以及之前版本中，React 应用是通过递归遍历组件树实现的。当组件状态发生变化时，React 会重新计算并渲染整个组件树，然后将变化的部分更新到 DOM 上。这种算法虽然简单易懂，但是也存在一些缺点：

当组件树非常庞大时，递归遍历整个组件树的开销很大，导致应用性能下降。
如果某个组件在更新过程中发生了阻塞，那么整个组件树的更新也会被阻塞，用户体验不佳。
为了解决这些问题，React 团队在 v16 中引入了一种新的**协调算法**——`React Fiber`。

### 设计原理

- React Fiber 的核心思想是将组件树的遍历变成了可中断的异步任务。具体来说，`React Fiber` 会将整个组件树拆分成多个小的任务单元（Fiber），并按照优先级顺序依次执行这些任务单元。每当执行完一个任务单元时，`React Fiber` 就会检查当前是否有更高优先级的任务需要执行。如果有，则立即暂停当前任务，并开始执行更高优先级的任务，直到完成后再回来继续执行原来的任务。这样一来，`React Fiber` 可以让应用更加灵活地响应用户交互和其他事件。

### Fiber结构代码

```javascript
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // 作为静态数据结构的属性
  this.tag = tag; // 组件类型Function/Class/Host
  this.key = key; // node唯一标识
  this.elementType = null; // 大多数情况下和type一致(函数组件包Memo后有不同等)
  this.type = null; // 根据不同的tag, 可能是函数名/类名/DOM节点名
  this.stateNode = null; // 对应的真实node节点

  // 用于连接其他Fiber节点形成Fiber树
  this.return = null;
  this.child = null;
  this.sibling = null; // 指向右边第一个兄弟Fiber节点
  this.index = 0;

  this.ref = null;

  // 保存本次更新造成的状态改变信息
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;
  // 保存当前操作造成的DOM更新
  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
}
```

```javascript
function App() {
  return (
    <div>
      i am
      <span>KaSong</span>
    </div>
  )
}
```
上述的React应用可以这样表示
-[](/FiberTreeExample.png)

### DOM关系

React使用“双缓存”来完成Fiber树的构建与替换——对应着DOM树的创建与更新。

双缓存也就是说在React中最多同时存在两颗`Fiber`树, 当前屏幕显示的和正在内存构建的。 React应用的根节点通过`current`指针在不同`Fiber`树的`rootFiber`间切换来完成两种树的切换。 每次状态更新都会产生新的workInProgress Fiber树，通过current与workInProgress的替换，完成DOM更新。

为什么需要双缓存?
1. **异步更新**：React Fiber的设计目的是支持异步渲染，允许在工作之间中断和恢复。这种双缓存机制有助于在不阻塞主线程的情况下进行异步更新，避免因长时间的渲染不间断影响用户交互。
2. **工作与提交阶段分离**：`React Fiber`分为“工作阶段”和“提交阶段”。在工作阶段，React可以在“当前树”（current tree）基础上异步构建“工作树”（work-in-progress tree）。一旦工作树构建完毕，它会在提交阶段作为新的“current tree”，这样可以确保整个渲染过程的一致性和稳定性。

Fiber生成过程
首次执行ReactDOM.render会创建`fiberRoot` 和`rootFiber`。其中`fiberRoot`是整个应用的根节点，`rootFiber`是<App/> 所在组件树的根节点。`fiberRoot`的`current`会指向当前页面上已渲染内容对应Fiber树，即current Fiber树。

`fiberRootNode.current = rootFiber;`

接下来进入render阶段，根据组件返回的JSX在内存中依次创建Fiber节点并连接在一起构建Fiber树，被称为workInProgress Fiber树。（下图中右侧为内存中构建的树，左侧为页面显示的树）。这个过程中会尝试复用current Fiber树中已有的Fiber节点内的属性，在首屏渲染时只有rootFiber存在对应的current fiber（即rootFiber.alternate）。

在`alternate fiber`构建完成时，commit阶段渲染到页面，当前fiberRootNode的current指针指向workInProgress Fiber树使其变为current Fiber 树。当触发setState钩子时， 会进入update状态重新生成一个fiber树，和mount时一样，workInProgress fiber的创建可以复用current Fiber树对应的节点数据。

这里决定是否复用的过程也就是`diff`算法

`Reconciler`工作的阶段被称为render阶段。因为在该阶段会调用组件的`render`方法。
`Renderer`工作的阶段被称为commit阶段。就像你完成一个需求的编码后执行`git commit`提交代码。commit阶段会把render阶段提交的信息渲染在页面上。
render与commit阶段统称为`work`，即React在工作中。相对应的，如果任务正在Scheduler内调度，就不属于work。
