# Webpack 基础

#### 组成部分

1. Entry（入口）：Webpack 在打包时需要从哪个文件开始构建依赖关系图，就是入口。可以设置多个入口文件，以生成多个输出文件。

2. Output（输出）：打包后的文件放在哪里，以及如何命名这些文件。可以指定输出目录、文件名、公共路径等。

3. Loader（模块加载器）：Webpack 只能处理 JavaScript 文件，而其他类型的文件如 CSS、图片等需要通过 Loader 转换才能被 Webpack 处理。Loader 用于对模块内容进行转换处理。

4. Plugin（插件）：Plugin 可以用于执行各种任务，例如打包优化、错误处理和环境变量注入等。Webpack 本身只提供了一些基本的 Plugin，但社区中有很多第三方 Plugin 可供使用。

5. Mode（模式）：Webpack 提供了三种模式：development、production 和 none。不同的模式会启用不同的 Webpack 内置 Plugin 和 Loader，以便于开发和生产环境的优化。

6. Chunk（代码块）：Webpack 在打包时会把所有相关联的模块组成一个 Chunk。可以通过 Code Splitting 技术将代码拆分成多个 Chunk，以实现按需加载。

7. Module（模块）：Webpack 把每个文件都看作一个模块，它可以是 JavaScript、CSS、图片等。这些模块通过依赖关系进行组合，构成整个应用程序。

#### 打包过程

1. 读取 webpack 的配置参数；
2. 启动 webpack，创建 Compiler 对象并开始解析项目；
3. 从入口文件（entry）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；
4. 对不同文件类型的依赖模块文件使用对应的 Loader 进行编译，最终转为 Javascript 文件；
5. 整个过程中 webpack 会通过发布订阅模式，向外抛出一些 hooks，而 webpack 的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的。
