# 常用 hooks

#### useState

对应类组件的 `onUpdateState`。语义是创建组件的状态数据。参数可以是一个初始值，也可以是一个函数，函数会在组件首次挂载时进行计算并返回值。

useState 返回一个数组，包含 state 和 setXxx 的 api，一般我们都是用解构语法取。

#### useEffect

副作用，例如外部网络请求，本地 localStorage 做改变。对外部数据做改变
只在挂载或是特定状态改变的时候执行一次

```javascript
useEffect(() => {
  queryData().then((data) => {
    setNum(data);
  });
}, []);
```

第二个参数这个数组叫做依赖数组，react 是根据它有没有变来决定是否执行 effect 函数，如果不传组件的每次重新渲染都会执行函数

#### useLayoutEffect

一般将`useLayoutEffect`称为有`DOM`操作的副作用`hooks`。作用是在`DOM`更新完成之后执行某个操作。执行时机：在`DOM`更新之后执行

与`useEffect`对比

useEffect 是在组件渲染完成后异步执行的，它不会阻塞组件的渲染过程，适用于大多数情况。而 useLayoutEffect 是在组件渲染完成后同步执行的，它会阻塞组件的渲染，适用于需要准确获取布局信息或进行 DOM 操作的场景。

#### useReducer

在修改组件状态之前执行一些固定的逻辑，封装`reducer`函数，

```javascript
import { useEffect, useRef } from "react";

function App() {
  const inputRef = useRef < HTMLInputElement > null;

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <div>
      <input ref={inputRef}></input>
    </div>
  );
}

export default App;
```

用于保存`React`组件的`DOM`引用

#### useContext

跨任意层传递组件

```javascript
import { createContext, useContext } from "react";

const countContext = createContext(111);

function Aaa() {
  return (
    <div>
      <countContext.Provider value={222}>
        // 修改 context 的值
        <Bbb></Bbb>
      </countContext.Provider>
    </div>
  );
}

function Bbb() {
  return (
    <div>
      <Ccc></Ccc>
    </div>
  );
}

function Ccc() {
  const count = useContext(countContext);
  return <h2>context 的值为：{count}</h2>;
}

export default Aaa;
```
