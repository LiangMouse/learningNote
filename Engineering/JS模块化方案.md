# JS 模块化

## CommonJS

## AMD

## UMD

## EsModule

## 工程化落地要点（建议先读：`JavaScript/模块化.md`）

### 产物格式选择

- 浏览器直接引入：优先 `esm`（现代浏览器）或 `iife/umd`（老环境、无打包器）。
- NPM 包发布：推荐双入口/多入口。
  - `exports` 字段区分：`import` 走 ESM，`require` 走 CJS。
  - 保留类型声明：`types` 指向 `.d.ts`，并避免仅 CJS 场景下的 `default` 互操作问题。

### Tree Shaking 与副作用

- 采用 ESM 源码组织；
- 在 `package.json` 标注 `sideEffects`：
  - 精确标注副作用文件数组；
  - 或设为 `false`，确保无全局副作用（如样式导入、原型扩展等需谨慎）。

### 代码分割与按需加载

- 使用 `import()` 触发动态分包；
- 命名分包（以 Webpack 为例）：`/* webpackChunkName: "chunk-x" */`；
- 注意公共依赖抽取与预加载/预获取策略（`<link rel="preload|prefetch">`）。

### 在主流工具中的配置要点

#### Webpack

- `output.libraryTarget`：`umd`/`var`/`module`（需 `experiments.outputModule`）。
- `optimization.splitChunks`：抽取公共模块；
- `experiments`：开启 `outputModule` 与 `topLevelAwait`（按需）；
- `resolve.exportsFields` 与 `mainFields`：控制优先解析 `module`（ESM）或 `main`（CJS）。

#### Rollup

- 多格式打包：`output: [{ format: 'esm' }, { format: 'cjs' }, { format: 'umd' }]`；
- `preserveModules`：保持模块结构，利于二次 Tree Shaking；
- 常用插件：`@rollup/plugin-node-resolve`、`@rollup/plugin-commonjs`、`rollup-plugin-terser`。

#### Vite（含库模式）

- `build.lib`：配置 `entry`、`name`、`formats: ['es','cjs','umd']`；
- `build.rollupOptions.external`：外部化依赖，避免重复打包；
- `optimizeDeps.exclude/include`：控制预构建，对混合 CJS 依赖更稳定。

### Node.js 互操作与发布

- 在 `package.json`：
  - 设置 `type: module` 或在文件扩展名上区分（`.mjs`/`.cjs`）；
  - 使用 `exports` 精准导出入口，避免深层路径耦合；
- 测试互操作：确保 `require()` 与 `import` 均能正常消费；
- CLI/工具链：注意 `bin` 产物的 shebang 与 ESM 加载限制。

### 最佳实践清单

- 源码使用 ESM，发布同时提供 ESM 与 CJS 产物；
- 标注 `sideEffects` 并最小化副作用；
- 谨慎使用默认导出，倾向命名导出，减少互操作坑；
- 按需加载与代码分割结合路由/功能边界；
- 对外部依赖进行 external 处理，避免重复打包与版本冲突。
