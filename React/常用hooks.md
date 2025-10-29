# React 原生 hooks

## **useState**

状态是变化的数据，是组件甚至前端应用的核心。useState 有传入值和函数两种参数，返回的 setState 也有传入值和传入函数两种参数。

### 什么时候使用

在 React 中，当一个组件的某个值需要在多次渲染中保持不变，并且当这个值发生变化时需要触发组件重新渲染时，就应该使用 `useState` 钩子来管理它。

### setState 函数式更新

`React`哲学中讲述了他是一个倡导函数式的库,数据驱动 UI,状态不变视图就不变。相似地，`setState`也提倡使用函数式更新。比如你是否清楚`setNum(prev => prev +1)`和`setNum(num + 1)`的区别？作为生产中常用到的东西，面试中常考的问题，一定要清楚两者的区别。😤

直接下**结论** :
当属性的新状态不依赖旧状态时，直接`setState(data)`，如获取网络请求返回的结果。

当属性的新状态依赖旧状态，需要函数式更新`setState(prev => prev+1)`,如计数器以及开关。

源码中**原理**:

### `setState` 函数式更新的精妙之处：新旧状态的“时空差”

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

### 实际数据与心智不同问题

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

## **useEffect**

副作用 `effect` 函数是在渲染之外额外执行的一些逻辑。它是根据第二个参数的依赖数组是否变化来决定是否执行 effect，可以返回一个清理函数，会在下次 effect 执行前执行。

具体可查阅[官方文档](https://zh-hans.react.dev/reference/react/useEffect)

## **useLayoutEffect**

和`useEffect`使用方法(参数)一致，场景也非常相像，下边主要讲两者区别

**两者差别**

`useEffect`是在页面渲染后再执行, 后者在 dom 渲染后立即执行，然后再进行页面绘制。实际上，`useLayoutEffect`相当于每次会在对应类组件`componentDidMount`的
阶段执行，而`useEffect`在源码中是相当于会在 `commit`阶段 完成后，通过 `Scheduler` 模块或浏览器的 `MessageChannel` 安排一个异步回调，
把 useEffect 的逻辑放进去等待执行。

```shell
render → commit → paint → effect
render → commit → effect → paint
```

## **useReducer**

封装一些修改状态的逻辑到 reducer，通过 action 触发，相较于 `useState` 更适合在逻辑复杂的情况下使用。当修改深层对象的时候，创建新对象比较麻烦，可以结合 `immer`

## **useRef**

useRef 创建一个特殊的“盒子”，这个盒子本身（即你用 const myRef = useRef(...) 声明的变量）在组件的整个生命周期中是恒定不变的。这个盒子有一个唯一的属性，叫 `current`。

可以理解为一个不受 React 影响的对象，这个对象有一个 current 属性可以被赋值改变，适合

## **forwardRef + useImperativeHandle**

通过 forwardRef 可以从子组件转发 `ref` 到父组件，如果想自定义 ref 内容可以使用 useImperativeHandle

## **useContext**

跨层组件之间传递数据可以用 Context。用 createContext 创建 context 对象，用 Provider 修改其中的值， function 组件使用 useContext 的 hook 来取值，class 组件使用 Consumer 来取值

## **React.memo + useMemo + useCallback**

memo 包裹的组件只有在 props 变(浅比较)的时候才会重新渲染，`useMemo`、`useCallback` 对组件中高计算性的内容基于`props`不变时进行缓存，区别在于 memo 缓存普通属性，`callback` 缓存函数
