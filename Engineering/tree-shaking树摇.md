# tree-shaking 树摇（易懂版）

本文基于对 bundler 实践的整理，重点参考了讨论贴（含 webpack/rspack、rollup、esbuild 差异）以更通俗的方式总结原理与落地要点。参考来源：[Bundler Tree Shaking 原理及差异](https://github.com/orgs/web-infra-dev/discussions/28)。

## 它到底在做什么？

- 含义：把“没被用到”的代码（“枯叶”）在构建阶段摇掉，减小体积、提升加载与执行性能。
- 前提：依赖“静态分析”判断哪些导出/语句被使用、哪些语句有副作用（side effects）。

## 核心概念先搞清

- side effects（副作用）：模块被导入或执行时，除了导出值以外对外界产生影响的行为（如改全局、注入原型、注册事件、立即执行逻辑等）。
- 静态 vs 动态：ESM 静态可分析更友好；CommonJS/动态 import 在可静态化的场景下也能被分析，但覆盖度有限。
- 产物与优化：bundler 负责跨模块分析与删除；minifier（如 terser/swc）负责进一步对已生成代码做语义/语法层的消除与压缩。

## webpack / rspack 的做法（分层优化）

> rspack（v1.4）与 webpack 原理一致，下文统一描述。

1. 模块级（module-level）

- 依据 `optimization.sideEffects` 删除“未使用且无副作用”的整个模块。
- 典型：barrel file（纯重导出）。若最终没有任何导出被用到且文件无副作用，则整文件可删。

2. 导出级（export-level）

- `optimization.providedExports`：分析模块“有哪些导出”。
- `optimization.usedExports`：分析“哪些导出被用到”。未用到的导出在生成阶段移除，剩余声明再交由 minifier 清理。

3. 代码级（code-level）

- `optimization.minimize`：由 swc/terser 等对产物做“内联/折叠/消除/压缩”。这些属于对 bundler 产物的后处理。

额外关键优化

- `optimization.innerGraph`：建立模块内“顶层语句之间”的依赖图，避免“未被使用的导出间接引用，导致连带保留”的情况。
- `optimization.concatenateModules`（scope hoisting）：把模块合并到同一作用域，使 minifier 更容易消除与改名，体积更小。
- `optimization.mangleExports`：允许对导出名做短名混淆，进一步缩小体积。
- Rspack 特性如 `experiments.inlineConst`：对常量内联，帮助后续消除。

## esbuild 的做法（以语句块为单位）

- 将每个模块按“顶层语句”切分为多个 part，建立“定义/使用”关系和导入导出的链接（linking）。
- 从入口出发，自顶向下标记有用的 part（IsLive=true）：
  - 被别人使用，或自身有副作用 → 标记存活。
- 仅为存活的 part 生成代码，其他被删除。

## rollup 的做法

- vite 的 tree-shaking 主要依赖 rollup（正逐步向 rolldown 迁移）。
- 过程（简化）：
  1. 从模块开始 include()；
  2. 自顶层 AST 节点判断 side effects，决定是否 include；
  3. 对相关节点递归进行副作用判定与 include；
  4. 若出现新 include 的节点，重复遍历，直到收敛。

## 实战落地清单（重要）

- 使用 ESM：优先 `import/export`，避免难以静态分析的动态模式。
- 标注 sideEffects：库/应用在 `package.json` 正确配置 `sideEffects` 字段，或在 bundler 中显式配置。
- 避免意外副作用：顶层尽量只做导出，避免修改全局/原型或执行逻辑；确需执行的代码放到显式函数调用里。
- 避免“间接使用导致保留”：减少“未被使用的导出引用另一个导出”的情形；必要时借助 `innerGraph`/手动拆分模块。
- 让 minifier 发挥：尽量启用模块连接（scope hoisting），便于消除与改名；开启 minimize；保持常量可内联。
- 小心 barrel file：重导出文件若无实际使用，确保可被视为无副作用从而整文件删除。
- CJS/动态 import：尽可能使用可静态化的写法，便于分析；复杂动态逻辑尽量用显式分包和手动拆分。

## 一句话对比

- webpack/rspack：以“模块/导出/代码”三级和多项辅助优化（innerGraph、concatenate、mangleExports）确保正确性与体积平衡。
- rollup：更偏向库打包的细粒度 AST include，产物常更小。
- esbuild：按顶层语句为单位的“活性标记”，速度快、效果稳定。

## 参考

- [rspack 团队做的树摇原理盘点](https://github.com/orgs/web-infra-dev/discussions/28)
