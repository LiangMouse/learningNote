### useEffect
   副作用，例如外部网络请求，本地 localStorage 做改变。对外部数据做改变
   只在挂载或是特定状态改变的时候执行一次
   `useEffect(() => document.title = `other`)`
### useState
   挂载到 onUpdateState 中
### useLayoutEffect

一般将`useLayoutEffect`称为有`DOM`操作的副作用`hooks`。作用是在`DOM`更新完成之后执行某个操作。执行时机：在`DOM`更新之后执行

与`useEffect`对比

- 相同点
    - 1.第一个参数，接收一个函数作为参数
    - 2.第二个参数，接收【依赖列表】，只有依赖更新时，才会执行函数
    - 3.返回一个函数，先执行返回函数，再执行参数函数
    - （所以说执行过程的流程是一样的）
- 不同点
    - 执行时机不同。`useLayoutEffect`在`DOM`更新之后执行；`useEffect`在`render`渲染结束后执行。执行示例代码会发现`useLayoutEffect`永远比`useEffect`先执行，这是因为`DOM`更新之后，渲染才结束或者渲染还会结束

  