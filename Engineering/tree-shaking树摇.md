# tree-shaking 树摇

**含义**: 什么是 tree shaking：你可以将应用程序想象成一棵树。绿色表示实际用到的源码和库，是树上活的树叶。灰色表示未引用代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动（shake）这棵树，使它们落下。

**目标** 在构建阶段优化代码，删除没有被引用或使用的代码，从而减小打包后的文件体积，提高加载性能。

## 不同工具的树摇原理

#### webpack/rspack

rspack(当前v1.4)的tree-shaking 原理与webpack保持一致，因此一块介绍

**webpack** 的treeshaking分为三部分

- module-level
    依赖**optimization.sideEffects** 配置项，值可以是布尔值或者是生效的文件后缀名组成的数组
    这个配置项的作用是删除没有用到任何导出且没有副作用的模块
    ```javascript
    // index.js
    import { a } from "./re-exports";
    console.log(a);
    // re-exports.js
    export * from "./module"; // index -(a)-> re-exports -(a)-> module 优化为 index -(a)-> module 后，re-exports.js 本身没有任何导出被用到，且无副作用，可以删除
    // module.js
    export const a = 42;
    ```



- export-level

- code-level

### 参考资料

- [rspack团队做的树摇原理盘点](https://mp.weixin.qq.com/s/wD9Sh1t9g9BOqDWTcwIQHg)