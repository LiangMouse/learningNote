# 常用 hooks

### useState

对应类组件的 `onUpdateState`。语义是创建组件的状态数据。参数可以是一个初始值，也可以是一个函数，函数会在组件首次挂载时进行计算并返回值。

useState 返回一个数组，包含 state 和 setXxx 的 api，一般我们都是用解构语法取。

### useEffect

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

### useLayoutEffect

一般将`useLayoutEffect`称为有`DOM`操作的副作用`hooks`。作用是在`DOM`更新完成之后执行某个操作。执行时机：在`DOM`更新之后执行

与`useEffect`对比

- 相同点
  - 1.第一个参数，接收一个函数作为参数
  - 2.第二个参数，接收依赖列表，只有依赖更新时，才会执行函数
  - 3.返回一个函数，先执行返回函数，再执行参数函数
- 不同点
  - 执行时机不同。`useLayoutEffect`在`DOM`更新之后执行；`useEffect`在`render`渲染结束后执行。`useLayoutEffect`永远比`useEffect`先执行，这是因为`DOM`更新之后，渲染才结束或者渲染还会结束

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
