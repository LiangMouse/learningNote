# webPack插件

插件 是 webpack 的 支柱 功能。Webpack 自身也是构建于你在 webpack 配置中用到的 相同的插件系统 之上！

插件目的在于解决 `loader`无法实现的其他事。Webpack 提供很多开箱即用的 [插件](https://webpack.docschina.org/plugins/)。

## 工作原理

webpack 插件是一个具有 `apply` 方法的 `JavaScript` 对象。apply 方法会被 `webpack compiler` 调用，并且在 整个编译生命周期都可以访问 `compiler` 对象。

```javascript
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      // 现在可以通过 compilation 对象绑定各种钩子
      compilation.hooks.optimize.tap('ConsoleLogOnBuildWebpackPlugin', () => {
        console.log('资源已经优化完毕。');
      });
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
```


由于插件可以携带参数/选项，你必须在 `webpack` 配置中，向 `plugins` 属性传入一个 new 实例
```javascript
module.exports = {
  entry: './path/to/my/entry/file.js',
  ...
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
  ...
};
```
Webpack 启动后，在读取配置的过程中会先执行 `new HtmlWebpackPlugin({ template: './src/index.html' })` 初始化一个` HtmlWebpackPlugin` 获得其实例。 在初始化 `compiler` 对象后，再调用 `HtmlWebpackPlugin.apply(compiler)` 给插件实例传入 compiler 对象。 插件实例在获取到 compiler 对象后，就可以通过`compiler.plugin(事件名称, 回调函数)` 监听到 Webpack 广播出来的事件。 并且可以通过 compiler 对象去操作 Webpack。

## 手写plugin
一个简单的示例插件，生成一个叫做 assets.md 的新文件；文件内容是所有构建生成的文件的列表

```javascript
class FileListPlugin {
  static defaultOptions = {
    outputFile: 'assets.md',
  };

  // 需要传入自定义插件构造函数的任意选项
  //（这是自定义插件的公开API）
  constructor(options = {}) {
    // 在应用默认选项前，先应用用户指定选项
    // 合并后的选项暴露给插件方法
    // 记得在这里校验所有选项
    this.options = { ...FileListPlugin.defaultOptions, ...options };
  }

  apply(compiler) {
    const pluginName = FileListPlugin.name;

    // webpack 模块实例，可以通过 compiler 对象访问，
    // 这样确保使用的是模块的正确版本
    // （不要直接 require/import webpack）
    const { webpack } = compiler;

    // Compilation 对象提供了对一些有用常量的访问。
    const { Compilation } = webpack;

    // RawSource 是其中一种 “源码”("sources") 类型，
    // 用来在 compilation 中表示资源的源码
    const { RawSource } = webpack.sources;

    // 绑定到 “thisCompilation” 钩子，
    // 以便进一步绑定到 compilation 过程更早期的阶段
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      // 绑定到资源处理流水线(assets processing pipeline)
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,

          // 用某个靠后的资源处理阶段，
          // 确保所有资源已被插件添加到 compilation
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          // "assets" 是一个包含 compilation 中所有资源(assets)的对象。
          // 该对象的键是资源的路径，
          // 值是文件的源码

          // 遍历所有资源，
          // 生成 Markdown 文件的内容
          const content =
            '# In this build:\n\n' +
            Object.keys(assets)
              .map((filename) => `- ${filename}`)
              .join('\n');

          // 向 compilation 添加新的资源，
          // 这样 webpack 就会自动生成并输出到 output 目录
          compilation.emitAsset(
            this.options.outputFile,
            new RawSource(content)
          );
        }
      );
    });
  }
}

module.exports = { FileListPlugin };
```











