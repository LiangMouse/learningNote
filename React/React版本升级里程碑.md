# React 版本升级里程碑

## V 16

- Fiber 架构重写：引入可中断/可恢复的渲染与更新优先级，为并发能力奠基。
- Portals：`ReactDOM.createPortal` 将子节点渲染到父层次之外的 DOM 节点，常用于模态框/悬浮层。
- Fragments：`<React.Fragment>` 与短语法 `<>...</>`，不额外生成 DOM 包装元素。
- 新版 Context：`React.createContext` 提供稳定高性能的上下文传递方案，替代旧 context API。
- StrictMode：开发期帮助发现副作用/不安全生命周期等潜在问题。
- 生命周期调整（v16.3）：弃用 `componentWillMount/ReceiveProps/Update`（引入 `UNSAFE_` 前缀），新增 `getDerivedStateFromProps` 与 `getSnapshotBeforeUpdate`。
- 代码分割（v16.6）：`React.lazy` 与 `<Suspense fallback>` 简化按需加载组件（数据 Suspense 稳定在更后）。
- 性能与复用（v16.6）：`React.memo` 用于函数组件的浅比较优化。
- Hooks（v16.8）：`useState/useEffect/useContext/useMemo/useCallback/useReducer/useRef` 等，让函数组件成为一等公民，复用逻辑更简单。

## V 17

- 引入渐进式更新
- React v17 支持了全新的 [JSX 转换](https://zh-hans.legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)
  - 使得无需**显式导入** React 即可单独使用 JSX
  - JSX 运行时编译由：

```javascript
import React from "react";
React.createElement("h1", null, "Hello");
```

    改为：

```javascript
import { jsx as _jsx } from "react/jsx-runtime";
const element = _jsx("h1", { children: "Hello" });
```

- 事件委托
  React v17 中，React 不会再将事件处理添加到 document 上，而是将事件处理添加到渲染 React 树的根 DOM 容器中

  ```jsx
  const rootNode = document.getElementById("root");
  ReactDOM.render(<App />, rootNode);
  ```

  在 React 16 及之前版本，React 会对大多数事件进行 document.addEventListener() 操作。
  React v17 开始会通过调用 rootNode.addEventListener() 来代替

## V 18

- 正式支持 Concurrent Mode（并发模式）
  - 用户级特性，通过`createRoot`使用
- Render API
- 自动批处理
  - 在一次渲染周期内把多个 state 更新合并成一次渲染
- 新功能（新 API）：过渡（startTransition）
- 新的 Suspense 特性：支持 `Suspense` 的流式服务端渲染
- 服务端组件

## V 19

- 稳定的 `Server Components（RSC）`与 `Actions`：在服务端渲染与数据变更的协作模式更完善，支持表单/按钮直接触发服务器动作（Server Actions）。
- 表单改进与新 Hook：`useFormStatus`、`useActionState` 等，简化表单提交流程与挂起状态管理。
- 文档元数据（Document Metadata）：在组件中直接声明 `<title>`、`<meta>`、`<link>` 等，统一管理文档 head。
- 资源/脚本加载 API：提供 `preload`、`preconnect`、`preinit` 等资源提示能力，更好地控制关键资源加载顺序。
- Web Components 互操作增强：改进事件、属性/布尔属性、表单关联自定义元素的支持，集成成本更低。
- Ref 清理函数：Ref 回调可返回清理函数，组件卸载或依赖变化时进行资源回收。
- 默认并发能力与自动批处理优化：进一步减少不必要渲染，交互更流畅。
- [React compiler](https://zh-hans.react.dev/learn/react-compiler)，构建时的代码自动性能优化器，自动进行记忆化缓存提升性能。

代码片段：

```jsx
// 文档元数据（组件内声明 head 内容）
export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt} />
      <link rel="author" href={post.authorUrl} />
    </article>
  );
}
```

```jsx
// 表单与 useFormStatus（按钮感知提交状态）
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "提交中…" : "提交"}
    </button>
  );
}

export default function Form() {
  async function action(formData) {
    "use server";
    // 服务器动作
  }
  return (
    <form action={action}>
      <input name="q" />
      <SubmitButton />
    </form>
  );
}
```

```jsx
// use 等待 Promise（客户端可直接消费异步）
import { use } from "react";

function UserName({ promise }) {
  const user = use(promise);
  return <span>{user.name}</span>;
}
```
