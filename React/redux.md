# redux

---

### 1. **Store**

- **作用**：存储整个应用的状态树。
- **特点**：

  - Redux 应用只有一个单一的 Store。
  - 包含整个应用程序的状态（是一个对象）。
  - 提供以下核心方法：
    - `getState()`：获取当前状态。
    - `dispatch(action)`：触发动作，更新状态。
    - `subscribe(listener)`：订阅状态变化，状态更新时调用监听器。
  - 通过 `createStore` 方法创建：

    ```javascript
    import { createStore } from "redux";

    const store = createStore(reducer);
    ```

---

### 2. **Reducer**

- **作用**：定义如何根据 `action` 更新状态。
- **特点**：

  - 是一个纯函数 `(state, action) => newState`。
  - 接受当前状态和动作，返回一个新的状态对象。
  - 不能直接修改原来的状态，必须返回一个新状态。
  - 通常会使用 `combineReducers` 将多个小的 reducer 组合成一个主 reducer。

  示例：

  ```javascript
  const reducer = (state = { count: 0 }, action) => {
    switch (action.type) {
      case "INCREMENT":
        return { ...state, count: state.count + 1 };
      default:
        return state;
    }
  };
  ```

---

### 3. **Action**

- **作用**：描述状态变化的事件。
- **特点**：

  - 是一个普通的 JavaScript 对象，必须包含 `type` 字段（表示动作类型）。
  - 可以携带额外数据作为 `payload`。

  示例：

  ```javascript
  const incrementAction = { type: "INCREMENT" };
  const setNameAction = { type: "SET_NAME", payload: "John" };
  ```

---

### 4. **Dispatch**

- **作用**：触发动作，将 `action` 发送到 reducer。
- **特点**：

  - 通过 `store.dispatch(action)` 调用。
  - `dispatch` 会将动作传递给 reducer，更新状态。

  示例：

  ```javascript
  store.dispatch({ type: "INCREMENT" });
  ```

---

### 5. **Subscribe**

- **作用**：监听状态变化。
- **特点**：

  - 使用 `store.subscribe(listener)` 注册监听器，当状态发生变化时，自动调用监听器。
  - 返回一个函数，调用它可以取消订阅。

  示例：

  ```javascript
  const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
  });

  // 取消订阅
  unsubscribe();
  ```

---

### 6. **Middleware**（中间件，可选）

- **作用**：扩展 Redux 的 `dispatch` 功能，用于处理异步操作或其他副作用。
- **特点**：

  - 常见中间件：`redux-thunk`、`redux-saga` 等。
  - 在动作到达 reducer 之前拦截并处理它。

  示例（`redux-thunk` 用于处理异步操作）：

  ```javascript
  const fetchUser = () => async (dispatch) => {
    const response = await fetch("/api/user");
    const user = await response.json();
    dispatch({ type: "SET_USER", payload: user });
  };
  ```

---

### 7. **CombineReducers**（用于模块化管理状态）

- **作用**：将多个 reducer 合并成一个主 reducer。
- **特点**：

  - 使得不同模块的状态管理逻辑更加清晰。
  - 每个 reducer 只负责管理自己模块的状态。

  示例：

  ```javascript
  import { combineReducers } from "redux";

  const userReducer = (state = {}, action) => {
    /* ... */
  };
  const postReducer = (state = [], action) => {
    /* ... */
  };

  const rootReducer = combineReducers({
    user: userReducer,
    posts: postReducer,
  });
  ```

---

### 8. **DevTools（开发工具，可选）**

- **作用**：帮助调试 Redux 应用。
- **特点**：

  - 可以回放状态变化。
  - 通过浏览器插件查看状态树和动作。
  - 配置：

    ```javascript
    import { createStore } from "redux";
    import { composeWithDevTools } from "redux-devtools-extension";

    const store = createStore(reducer, composeWithDevTools());
    ```

---

### Redux 组成关系图

```text
    UI Component
         ↓
      Dispatch
         ↓
      Action
         ↓
      Middleware (可选)
         ↓
      Reducer
         ↓
      Store
         ↓
      State (更新后通知 UI)
```

---

### 总结

Redux 的核心组成部分和职责：

1. **Store**：存储状态。
2. **Reducer**：定义状态如何更新。
3. **Action**：描述事件。
4. **Dispatch**：触发状态变化。
5. **Subscribe**：监听状态变化。
6. **Middleware**（可选）：扩展 `dispatch`，处理异步。
7. **CombineReducers**：模块化状态管理。
8. **DevTools**（可选）：帮助调试。

这些部分共同实现了一个高效、可预测的状态管理系统。
