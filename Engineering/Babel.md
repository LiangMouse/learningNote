# Babel

Babel 是一个 JavaScript 编译器，主要用于将最新版本的 JavaScript（包括 ES6+、TypeScript 等）代码转化为兼容性更好的旧版本 JavaScript，以支持更多的浏览器环境。

## 核心功能

**语法转换**：Babel 可以将 ES6+（如箭头函数、解构赋值、模块化等）转成 ES5 代码，以兼容旧版浏览器。
**Polyfill 填充**：Babel 可以通过引入 core-js 等库，将新的 API（如 Promise、Array.from 等）添加到旧浏览器中，使其支持这些特性。
**插件和预设**：Babel 提供了许多插件（plugins）和预设（presets）以定制编译需求。比如，@babel/preset-env 是一个常用的预设，它可以根据目标环境自动选择合适的插件进行转码。

## 工作流程

- **解析**：将 JavaScript 代码解析为抽象语法树（AST）。
- **转换**：根据配置的插件和预设，对 AST 进行修改。
- **生成**：将修改后的 AST 重新生成 JavaScript 代码。
