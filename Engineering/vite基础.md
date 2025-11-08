# vite 基础

vite 是一个志在更快和更精简的前端构建工具，配置更少，开箱即用的下一代 [前端构建工具](https://cn.vite.dev/)（虽然他的周 [npm](https://www.npmjs.com/package/vite) 下载量已经超过了 webpack）。

## 快速上手

```shell
npm create vite@latest
```

然后 Vite 会使用交互式命令完成你项目中关于 Vite 配置项的简单搭建，使你能直接运行 React/Vue 等 UI 框架的模版代码与构建发布。

Vite 是非常开箱即用的，这也是特点之一。详细的使用方法可以见 [官网](https://cn.vite.dev/guide/#scaffolding-your-first-vite-project)。

## 原理初探

Vite 在开发环境与生产环境有着不同的表现。在设计初期，Vite 是为解决 `webpack` 在大型项目中 HMR 与启动开发服务器慢而生，采用了——

### 开发环境

也就是经常开发阶段用到`run dev`命令，通常在`package.json`中映射为`vite dev`。之后 Vite 会启动一个本地 Web 服务器，它以原生 ESM 的方式按需提供你的源代码。

#### 大致步骤

1. 启动服务器：`vite` 命令启动一个 Web 服务器，该服务器会监听你的文件。
2. esbuild 辅助（启动时）：在第一次启动时，Vite 使用 esbuild 对你的 `node_modules` 依赖进行预构建，将 CJS/UMD 模块转换并打包成高效的原生 ESM 缓存起来。（这是它的第一个辅助角色：Bundler）
3. esbuild 辅助（运行时）：当你（的浏览器）请求你自己的源代码时（例如 `src/main.ts`），Vite 服务器会即时地使用 esbuild 将这个单个文件从 TypeScript 转译成 JavaScript（ESM）。如果是 `.vue` 文件，则会使用 Vue 插件来处理。（这是 esbuild 的第二个辅助角色：Transpiler），简而言之将浏览器不能直接识别的资源转成可识别内容。
4. 按需提供原生 ESM：服务器将转译后的原生 ESM 代码发送给浏览器。
5. 浏览器接管：浏览器负责“加载”这些 ESM 模块。当它遇到 `import` 语句时，它会再次向 Vite 服务器发起新的请求（例如请求 `import App from './App.vue'`），Vite 再重复第 3 步。显而易见地，虽然多次请求，但发生在本地的进程间通信，不会带来网络延迟。
6. 渲染：最终，“渲染”这个动作是由加载到浏览器的客户端 JavaScript（例如你的 Vue 或 React 代码）来完成的，而不是 Vite 服务器。

#### HMR 热更新

Vite 的热更新响应极快，是在开发过程中修改代码后可即刻作用于本地前端页面，且不需要刷新不丢失状态。 不同于`webpack`在开发环境热更新需要重新执行打包，Vite 接收到一个文件变时，只去重新请求与这个变化文件相关的文件，充分利用了浏览器原生 ESM 特性
**原理**

- Vite 的 HMR 系统由三个紧密协作的部分组成：

  1.  服务器端（Node.js）：

  **文件系统监听器（File System Watcher）**： 使用高性能的库（如 chokidar）来监听你的源代码文件变动。
  **HMR 模块图（HMR Module Graph）**： Vite 在内存中维护一个模块依赖图。它清楚地知道哪个文件 import 了哪个文件（例如 App.vue 导入了 Button.vue）。
  **WebSocket 服务器**： 一个在 Vite 服务器和浏览器客户端之间建立的“热线电话”。

  2.  客户端（浏览器）：
      **HMR 客户端（vite/client）**： 这是一小段自动注入到你应用中的 JavaScript 代码。
      **WebSocket 客户端**： HMR 客户端的一部分，负责接收来自服务器的 HMR 消息。
      **HMR 运行时（HMR Runtime）**： 客户端代码中真正执行“热替换”逻辑的部分。

  3.  框架插件（例如 @vitejs/plugin-vue）：
      它们为 HMR 提供了“上层逻辑”。例如，Vue 插件知道如何替换一个 Vue 组件的 <script> 或 <template> 部分，同时保留其内部状态（state）。

- 步骤:

  1. 文件监听（服务器端）
     Vite 在 Node.js 中启动一个高性能的文件系统监听器（如 `chokidar`）。这个监听器会“监视”您项目中的所有源代码文件（如 `.js`, `.vue`, `.css` 等）。

  2. 检测到变更（服务器端）
     当您在编辑器中按下保存键（例如修改了 `src/Button.vue`），文件系统监听器会立即捕捉到这个文件变更事件，并通知 Vite 服务器。

  3. 分析依赖（服务器端）
     Vite 服务器在内存中维护了一个**模块依赖图（Module Graph）**。当 `Button.vue` 发生变化时，Vite 会立即查询这个图：
     - 这个文件被谁 `import` 了？（例如 `App.vue`）
     - 这个变动会影响哪些模块？
  4. 发送通知（服务器 -> 浏览器）
     Vite 通过 **WebSocket**（在服务器和浏览器之间建立的一条长连接“热线”）向浏览器客户端发送一条 JSON 消息。这条消息会精确地告诉浏览器哪个文件被更新了。
  5. 接收消息（浏览器端）
     浏览器中自动注入的 Vite 客户端（`vite/client`）通过 WebSocket
     接收到这条更新消息。

  6. 智能更新（浏览器端）

     这是最关键的一步，Vite 客户端会根据**文件类型**和**变动内容**，执行不同的策略：

     - 如果是 CSS 变动
       Vite 客户端**不会**重新请求 JS，它只会拉取最新的 CSS 内容。然后，它会动态地找到页面中对应的 `<style>`标签，并用**新样式替换旧样式**。
     - 如果是 JS/组件 变动（如 `.js` 或 `.vue` 的 `<script>`等，会采取以下策略

       1. **失效旧模块：** HMR
          客户端首先在内存中将旧的 `Button.vue`
          模块标记为“已失效”。
       2. **拉取新模块：** 客户端使用**原生的动态 `import()`**功能，向 Vite 服务器重新请求这个模块。请求会带上一个**时间戳查询参数**（如 `?t=123456`），这是为了**强制浏览器跳过缓存**，确保获取到的是服务器刚刚转译好的最新代码。

       3. **HMR 边界处理：** HMR 运行时会查找“能接受更新的边界”。框架插件（如 Vue/React）会接管这个新模块，用新模块的逻辑**替换**掉旧模块的逻辑，并触发该组件的**重新渲染（re-render）**，而不是整个页面刷新。

  7. 完全重载（Fallback）

     如果一个变动**无法**被 HMR（例如，您修改了一个没有设置 HMR 边界的普通 JS 文件，或者修改了 `index.html`），Vite 客户端会放弃 HMR，并执行一次**完整的页面刷新**（`location.reload()`），以确保您能看到最新的代码状态。

### 生产环境

Vite 的生产环境构建是一个精心编排的、以性能为导"的流程。它以 Rollup 为核心打包器，并巧妙地利用 esbuild 来完成 CPU 密集型的“脏活累活”（如转译和压缩），以实现最佳的构建速度和产物质量。

#### 步骤

以下是当你运行 `vite build` 时，Vite 所执行的所有关键步骤：

1. 第 1 步：加载配置  
   Vite 首先会读取并解析你的 `vite.config.js` 文件，然后将其与它内部的默认生产环境配置进行合并。这个合并后的配置将指导后续的所有构建步骤。

2. 第 2 步：解析入口（以 HTML 为中心）  
   与 Webpack 或纯 Rollup 不同，Vite（默认）以 `index.html` 作为构建的入口。  
   它会识别出其中引用的 JavaScript 入口（例如 `<script type="module" src="/src/main.ts"></script>`）和 CSS 入口（例如 `<link rel="stylesheet" href="/src/style.css">`）。  
   它会把 `src/main.ts` 作为 Rollup 的打包入口点（entry）。

3. 第 3 步：运行 Vite 插件与预处理  
   在 Rollup 正式开始打包之前，Vite 的插件系统会率先启动。

   - 框架插件：`@vitejs/plugin-vue` 或 `@vitejs/plugin-react` 会启动，将 `.vue` 或 `.jsx` 文件转换为标准的 JavaScript。
   - CSS 预处理器：如果你使用了 SASS/LESS，它们会在这里被编译成普通 CSS。
   - esbuild（转译器）：这是 esbuild 的第一个角色。Vite 会使用 esbuild 极速地将你所有的 `.ts`/`.tsx` 源码批量转译成 `.js`。这些 `.js` 文件随后才会被交给 Rollup。

4. 第 4 步：Rollup 核心打包  
   这是构建的核心。Vite 将第 3 步处理过的 JS 入口文件交给 Rollup。Rollup 会执行它最擅长的所有优化：

   - 构建依赖图：从入口文件开始，递归地跟踪所有 `import` 语句，构建一个完整的模块依赖图。
   - Tree-Shaking（摇树）：Rollup 会静态分析代码，移除所有“已导入但未被使用”的函数、变量或模块。这是 Rollup 的核心优势。
   - 代码分割（Code Splitting）：Rollup 会自动根据动态 `import()`（例如 `() => import('./views/About.vue')`）将代码分割成多个“chunks”（即 JS 文件）。这确保了用户在访问首页时，不需要下载“关于”页面的代码。
   - 作用域提升（Scope Hoisting）：这是 Rollup 的另一个王牌。它会尽可能地将所有模块的代码“拉平”到同一个函数作用域中，而不是像 Webpack 那样用函数包裹每个模块。这大大减少了产物体积和运行时的模块开销。

5. 第 5 步：CSS 处理与优化  
   在 Rollup 打包 JS 的同时，Vite 会对 CSS 进行精细处理：

   - 合并与提取：Vite 会将所有（包括从 `.vue` 文件中提取的）CSS 代码合并。
   - PostCSS：运行 PostCSS 插件（例如 Autoprefixer 来自动添加浏览器前缀）。
   - CSS 代码分割：这是 Vite 的一个亮点。如果某个 JS chunk（例如 `About.js`）是异步加载的，那么它所依赖的 CSS（例如 `About.css`）也会被自动分离成一个单独的文件，只在 `About.js` 加载时才被按需加载。

6. 第 6 步：压缩  
   Rollup 生成了 JS Chunks，Vite 也生成了 CSS Chunks。现在需要对它们进行压缩。

   - esbuild（压缩器）：这是 esbuild 的第二个角色。Vite（默认）不使用 Rollup 生态中常见的 Terser（它很慢），而是调用 esbuild 来压缩 JS 和 CSS。
   - esbuild 的压缩速度比 Terser 快 20-40 倍，极大地缩短了整个构建流程的时间。

7. 第 7 步：生成资源清单与文件哈希  
   构建进入尾声：

   - Vite 为所有生成的 JS、CSS 和其他资源（如图片、字体）根据其文件内容计算出内容哈希（Content Hash） ——依靠 SHA256、MD5 这样的哈希算法。
   - 文件会被重命名，例如 `index.a1b2c3d4.js` 和 `style.b4d5e6.css`。
   - 为什么？这用于实现“永久缓存”。只要文件内容不变，哈希就不变，浏览器就可以永久缓存这个文件。当你下次部署新版本时，只有内容被修改过的文件，哈希才会改变，浏览器才需要下载新文件。
   - Vite 还会生成一个 `manifest.json` 文件，映射了原始文件名和哈希后的文件名。

8. 第 8 步：HTML 注入与收尾  
   还记得第 2 步的 `index.html` 吗？现在 Vite 会重写它：

   - Vite 会将第 7 步中生成的、带有哈希值的 `<script>` 和 `<link>` 标签自动注入到 `index.html` 中，替换掉开发时使用的 `src/main.ts` 引用。

9. 第 9 步：拷贝 `public` 目录  
   最后，Vite 会将你项目根目录下的 `public` 文件夹中的所有内容（例如 `favicon.ico`、`robots.txt`）原封不动地复制到 `dist` 目录的根。

## 参考资料

- [vite 纪录片](https://www.youtube.com/watch?v=bmWQqAKLgT4)
