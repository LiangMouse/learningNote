# React-hook

**hook 简介**: 函数组件 生命周期 依赖数组 回调函数

## hook 原理

**为什么 hook 不能被条件执行？**

#### 从日常生活的书架说起

想象一下，你有一个书架，每个位置都有一个固定的编号（1 号、2 号、3 号...）。每次你去取书，你都按照这个固定的顺序：第 1 个位置总是放《JavaScript 高级程序设计》，第 2 个位置总是放《React 技术揭秘》，第 3 个位置总是放《算法导论》。

突然有一天，你决定：**如果今天是周一，就跳过第 2 个位置，直接从第 1 个跳到第 3 个**。结果会怎样？

- 周一：你拿到了《JavaScript》和《算法导论》，但没有《React》——还算正常
- 周二：你按照原顺序，却发现原本在 2 号位置的《React》跑到了 3 号位置！
- 你拿起 3 号位置的书，以为是《算法导论》，结果却是《React》——**混乱了！**

这就是为什么 Hook 不能被条件执行的原因。React 的 Hook 系统就像一个"固定编号的书架"，每个 Hook 必须**始终在同一个位置、同一个顺序**被调用。

#### 错误示例：当条件让 Hook "消失"时

```jsx
function MyComponent({ isLoggedIn }) {
  // ❌ 错误：Hook 在条件语句中
  if (isLoggedIn) {
    const [user, setUser] = useState(null); // 有时候这个 Hook 存在
  }

  const [count, setCount] = useState(0); // 有时候在位置1，有时候在位置2

  // 问题：当 isLoggedIn 从 true 变成 false，Hook 的顺序变了！
}
```

**会发生什么？**

1. **第一次渲染**（`isLoggedIn = true`）：

   - 位置 1：`useState(null)` → 创建了 `user` 状态
   - 位置 2：`useState(0)` → 创建了 `count` 状态

2. **第二次渲染**（`isLoggedIn = false`）：
   - 位置 1：`useState(0)` → React 以为这是 `user`，但实际是 `count`！
   - **结果**：`count` 的值被误认为是 `user`，状态完全错乱了！

#### React 如何追踪 Hook：一个隐形的链表

React 内部使用一个**链表（LinkedList）**来存储每个 Hook 的状态。这个链表就像一串珠子，每个珠子代表一个 Hook：

```
[useState] → [useEffect] → [useState] → [useMemo] → ...
  珠子1        珠子2         珠子3        珠子4
```

每次组件渲染时，React 会**按照调用顺序**遍历这个链表：

```jsx
function Component() {
  // React 创建链表：珠子1
  const [name, setName] = useState("");

  // React 继续添加：珠子2
  useEffect(() => {}, []);

  // React 继续添加：珠子3
  const [age, setAge] = useState(0);
}
```

React 的遍历逻辑大概是这样的：

```javascript
// 伪代码：React 内部的 Hook 遍历逻辑
let currentHook = fiber.memoizedState; // 链表的第一个节点
let hookIndex = 0;

while (currentHook) {
  // 根据 hookIndex 找到对应的 Hook
  // 如果顺序变了，就找错了！
  hookIndex++;
  currentHook = currentHook.next;
}
```

#### 条件执行如何破坏这个系统

当 Hook 被条件执行时，就像链表中的某个珠子"消失"了：

```jsx
// 第一次渲染：isVisible = true
function Component({ isVisible }) {
  const [a, setA] = useState(0); // 链表位置1
  if (isVisible) {
    const [b, setB] = useState(0); // 链表位置2
  }
  const [c, setC] = useState(0); // 链表位置3
}

// 第二次渲染：isVisible = false
function Component({ isVisible }) {
  const [a, setA] = useState(0); // React 认为这是位置1 ✓
  // b 的 Hook 不执行了，但 React 仍然会查找位置2
  const [c, setC] = useState(0); // React 以为这是位置2，实际应该是位置3！
  // 结果：c 的状态值被误存到了 b 的位置
}
```

#### 正确做法：条件逻辑放在 Hook 内部

```jsx
function MyComponent({ isLoggedIn }) {
  // ✅ 正确：Hook 始终在顶层
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);

  // 条件逻辑放在 Hook 的参数或内部
  useEffect(() => {
    if (isLoggedIn) {
      // 做一些登录相关的事情
    }
  }, [isLoggedIn]);
}
```

或者使用**早期返回**，但必须在所有 Hook 之后：

```jsx
function MyComponent({ isLoggedIn }) {
  // ✅ 正确：所有 Hook 都在顶部
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  const data = useMemo(() => compute(), []);

  // 条件返回放在所有 Hook 之后
  if (!isLoggedIn) {
    return <div>请登录</div>;
  }

  return <div>...</div>;
}
```

#### 深入源码：Fiber 节点的 memoizedState

在 React Fiber 架构中，每个函数组件对应一个 Fiber 节点。Hook 的状态存储在 `Fiber.memoizedState` 中，这是一个链表：

```javascript
// React 内部结构（简化版）
type Fiber = {
  memoizedState: Hook | null, // 指向第一个 Hook 的链表头
  // ...
};

type Hook = {
  memoizedState: any, // Hook 的状态值
  next: Hook | null, // 指向下一个 Hook
  // ...
};
```

当你调用 `useState(initialValue)` 时，React 会：

1. **首次渲染**：创建新的 Hook 节点，挂到链表末尾
2. **后续渲染**：按照 `hookIndex` 遍历链表，找到对应的 Hook，复用状态

如果 Hook 的调用顺序变了，`hookIndex` 就会错位，导致状态错乱。

#### 总结

**为什么 Hook 不能被条件执行？**

1. **Hook 依赖固定的调用顺序**：React 用链表按顺序存储每个 Hook 的状态
2. **条件执行会改变顺序**：导致 React 在错误的链表位置查找或更新状态
3. **结果是状态错乱**：不同渲染之间，Hook 的状态值会被"张冠李戴"

记住：**Hook 就像书架上的书，位置必须固定。条件逻辑可以控制"读不读这本书"，但不能控制"这本书要不要放在书架上"。**

## 常用 hook

### **useState**

状态是变化的数据，是组件甚至前端应用的核心。useState 有传入值和函数两种参数，返回的 setState 也有传入值和传入函数两种参数。

#### 什么时候使用

在 React 中，当一个组件的某个值需要在多次渲染中保持不变，并且当这个值发生变化时需要触发组件重新渲染时，就应该使用 `useState` 钩子来管理它。

#### setState 函数式更新

`React`哲学中讲述了他是一个倡导函数式的库,数据驱动 UI,状态不变视图就不变。相似地，`setState`也提倡使用函数式更新。比如你是否清楚`setNum(prev => prev +1)`和`setNum(num + 1)`的区别？作为生产中常用到的东西，面试中常考的问题，一定要清楚两者的区别。😤

直接下**结论** :
当属性的新状态不依赖旧状态时，直接`setState(data)`，如获取网络请求返回的结果。

当属性的新状态依赖旧状态，需要函数式更新`setState(prev => prev+1)`,如计数器以及开关。

源码中**原理**:

#### `setState` 函数式更新的精妙之处：新旧状态的"时空差"

相信你和我一样，在 React 项目中都离不开 `setState`。但你是否清楚 `setNum(prev => prev + 1)` 和 `setNum(num + 1)` 的区别？作为生产中常用到的东西，我们一定要清楚两者的区别。

直接下**结论**：

- 当属性的新状态**不依赖旧状态**时，直接 `setState(data)`。比如从网络请求返回的结果来更新状态。
- 当属性的新状态**依赖旧状态**时，需要函数式更新 `setState(prev => prev + 1)`。比如计数器以及开关的切换。

**深入原理**：为什么会产生这个区别？

这两种写法的根本差异，源于 React **更新队列**中的一个关键“时空差”问题。

1. 直接传入属性：被“定格”的旧值

当你调用 `setState({ count: this.state.count + 1 })` 时，React 并不会立刻执行状态更新。由于 `setState` 的**异步**和**批量**特性，它会把这个更新请求放入一个队列。

问题就出在这里：队列中存放的是一个已经计算好的**“快照”**。

`this.state.count + 1` 在 `setState` 被调用的那一刻就**立即**完成了计算。如果当时的 `count` 是 `0`，那么队列中保存的就是一个写死的 `{ count: 1 }`。如果这时有另一个 `setState` 紧随其后，它同样会基于过时的 `count` (`0`) 计算出 `1`，并把 `{ count: 1 }` 存入队列。

当 React 最终处理队列时，它会取出这两个 `{ count: 1 }`，导致状态从 `0` 更新到 `1`，然后又停留在 `1`。因为它被**过时的状态“定格”**了，根本不知道后面还有其他更新。

2. 函数式更新：动态的逻辑指令

而当你使用 `setState(prevState => ({ count: prevState.count + 1 }))` 时，你存入队列的不是一个结果，而是一条**指令**：**“拿到最新的 `count`，然后给它加 `1`”**。

这条指令是活的，它没有被“定格”。当 React 最终开始处理队列时，它会**按顺序**取出这些指令并执行。比如连续两次 `this.setState(prev => ({ num: prev.num + 1 }))` 执行时:

- **处理第一条指令：** React 获取当前最新的状态（`count` 为 `0`），将 `0` 作为参数传入函数，得到 `0 + 1`，结果为 `1`。
- **处理第二条指令：** React 会获取**此时此刻**最新的状态（`count` 已经变成 `1`），将 `1` 作为参数传入函数，得到 `1 + 1`，结果为 `2`。

`setState` 函数式更新的精妙之处在于，它让你的更新逻辑与执行时机的“时空”对齐了。它不像直接传入属性那样固化了旧值，而是始终能够获取到最即时的状态，确保了链式更新的**正确性**和**顺序性**。

#### 实际数据与心智不同问题

`useState`使用不好可能因为他的批量异步特性而造成与心智不符，出现`setState`后执行仍然是`null`的 bug。我已经出过两次这里的问题了 🥲

可参考[官网 FAQ](https://zh-hans.react.dev/reference/react/useState#ive-updated-the-state-but-logging-gives-me-the-old-value)

```jsx
function handleClick() {
  console.log(count); // 0

  setCount(count + 1); // 请求使用 1 重新渲染
  console.log(count); // 仍然是 0!

  setTimeout(() => {
    console.log(count); // 还是 0!
  }, 5000);
  // 解决方法
  const nextCount = count + 1;
  setCount(nextCount);
  console.log(count); // 0
  console.log(nextCount); // 1
}
```

### **useEffect**

副作用 `effect` 函数是在渲染之外额外执行的一些逻辑。它是根据第二个参数的依赖数组是否变化来决定是否执行 effect，可以返回一个清理函数，会在下次 effect 执行前执行。

具体可查阅[官方文档](https://zh-hans.react.dev/reference/react/useEffect)

### **useLayoutEffect**

和`useEffect`使用方法(参数)一致，场景也非常相像，下边主要讲两者区别

**两者差别**

`useEffect`是在页面渲染后再执行, 后者在 dom 渲染后立即执行，然后再进行页面绘制。实际上，`useLayoutEffect`相当于每次会在对应类组件`componentDidMount`的
阶段执行，而`useEffect`在源码中是相当于会在 `commit`阶段 完成后，通过 `Scheduler` 模块或浏览器的 `MessageChannel` 安排一个异步回调，
把 useEffect 的逻辑放进去等待执行。

```shell
render → commit → paint → effect
render → commit → effect → paint
```

### **useReducer**

封装一些修改状态的逻辑到 reducer，通过 action 触发，相较于 `useState` 更适合在逻辑复杂的情况下使用。当修改深层对象的时候，创建新对象比较麻烦，可以结合 `immer`

### **useRef**

useRef 创建一个特殊的“盒子”，这个盒子本身（即你用 const myRef = useRef(...) 声明的变量）在组件的整个生命周期中是恒定不变的。这个盒子有一个唯一的属性，叫 `current`。

可以理解为一个不受 React 影响的对象，这个对象有一个 current 属性可以被赋值改变，适合

### **forwardRef + useImperativeHandle**

通过 forwardRef 可以从子组件转发 `ref` 到父组件，如果想自定义 ref 内容可以使用 useImperativeHandle

### **useContext**

跨层组件之间传递数据可以用 Context。用 createContext 创建 context 对象，用 Provider 修改其中的值， function 组件使用 useContext 的 hook 来取值，class 组件使用 Consumer 来取值

### **React.memo + useMemo + useCallback**

memo 包裹的组件只有在 props 变(浅比较)的时候才会重新渲染，`useMemo`、`useCallback` 对组件中高计算性的内容基于`props`不变时进行缓存，区别在于 memo 缓存普通属性或函数执行结果，`callback` 缓存函数引用(本质上 useCallback 只是在缓存函数场景下 useMemo 的语法糖)

```javascript
// 缓存函数
useCallback(fn, deps); // better
useMemo(() => fn, deps);
```

> 除缓存提升性能外， `useMemo`还可以处理纯函数组件背景下的随机数问题
