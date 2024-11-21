# React 基础

### React 设计思想--组件化

**定义**

1. 组件是组件的组合或是一个原子组件
2. 组件内拥有状态，外部不可见
3. 父组件可将状态传入组件内部(兄弟组件要共享数据找公共父组件，复用性会降低，整个调用 diff,这也是状态管理的必然性)
   React 是单向数据流，永远是父组件给子组件传参，子组件执行函数，可以改变父组件状态，实现共享状态的改变
   **特点**
   组件声明了状态和 UI 的映射，通过给定状态可以出现 UI
   组件有 props/State 两种状态，自己的私有状态以及父组件的传参
   组件可由多个组件组合而成
   **demo**

```jsx
function Component(props) {
	// 由该组件的父组件传入的状态
	const {url} = props; // 状态设置
	this.text = '点击我';
	return (<div>
		   <SubComponent props={{color: 'red}}></SubComponent>
		   // 调用子组件并传入状态
		   <img src={url}></img> // 状态->UI
		   <button>text</button>
	   </div>)
}
```

**生命周期**

1. 挂载 render
2. 更新组件函数
3. 卸载

### hooks

**定义**：挂到 React 组件生命周期上去执行的函数
不要在循环，条件或嵌套函数中调用，会直接报错

1. useEffect
   副作用，例如外部网络请求，本地 localStorage 做改变。对外部数据做改变
   只在挂载或是特定状态改变的时候执行一次
   `useEffect(() => document.title = `other`)`
2. useState
   挂载到 onUpdateState 中

### React 实现

1. JSX 不符合 JS 标准
   转译
   ![[Pasted image 20241121204548.png]]
2. 返回 JSX 改变时，怎么更新 DOM -如果把整个浏览器 DOM 进行替换，将会很耗费性能，不利于用户体验，于是有了 diff 算法，算出具体是哪里的内容发生了改变，来进行具体内容的替换。但是另一方面 diff 算法本身时间复杂度不能太高，于是创建 Virtual DOM 对象以空间复杂度换时间
   虚拟 DOM 用于和真实 DOM 同步，在 JS 内存中维护的对象，由和 DOM 类似的树状结构，并和 DOM 有一一对应关系，确保实现 JS 声明式语法、 1.不同标签类型元素进行替换。2.同类型的 DOM 元素更新 3。同类型的组件元素：递归
3. State/Props 改变要重新触发 render 函数

### 状态管理库

核心思想——将组件状态抽离到 UI 外部进行统一管理，也可以理解为所有组件的根组件的 State
缺点：这个组件的复用性较差，和外部内容强耦合
**哪些适合放在状态管理库**
状态是被整个组件的拥有还是别单独组件
例如：currentUser，头像 id 这些可以被状态管理
