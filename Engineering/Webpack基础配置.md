# Webpack 基础配置

**做了什么事情**

指定一个文件为起点，引入其他的文件，建立引入树，最终建立一个 js 文件

---

#### 常见配置

**必填项**

- entry: 从哪个文件开始(可以多入口)
- output:最终产出 js 的配置,产出文件的名字
- mode(Webpack4 以后必填): 指定打包模式，dev Or prod

**非必填项**

- devServer： 用于简化开发
- module: loader 编写的地方
- plugins: 插件
- optimization: 优化相关(代码压缩，分割)
- resolve: 提供简化功能(别名)

---

#### 实践部分

Webpack 自 4.0 以后需要安装 webpack 和 webpack-cli
项目中新建`webpack.config.js`来配置(CreateReactApp 脚手架不对外暴露),该文件名及在项目的根路径为默认配置。执行`npx webpack`命令自动找这个路径，可以通过`webpack --config webpack.fonfig1.js`来修改文件名

整个的配置写在一个对象里，使用`module.exports = {}`把他暴露出去,编写配置使用`CommonJs`规范即`Node`环境的模块化规范。`Webpack`在`Node`中运行(vite 使用 es6 的模块化，提升性能)

- **entry**: 多入口为一个对象写法(单入口也推荐一个对象)，名字和对应文件地址

```javascript
entry: {
    app1: './app1',
    app2: './app2'
}
// 单入口： entry: './app1'
// 单入口多文件同时作为一个入口: entry: ['./app1.js','./app2.js']
```

- **output**: 

​	写成绝对路径

```javascript
output: {
	path: __dirname+ "./dist"
    filename: "[name].[hash:4].bundle.js"
}//path是生成的文件夹,__dirname是node环境的一个全局变量，代表项目当前路径
// 根据入口命令+每次生成的哈希值前四位+bundle.js为文件名的输出文件
```

- **mode**

  分为production: 简化压缩代码
  	development:包含webbpack运行代码

  ​	none: 直接进行打包

  `mode: "production"`

- **loader**&**plugin**&**devServer**格式

  ```javascript
  // 格式，写在rules的数组中
  module: {
      rules: [
         
      ]
  },
  optimization: {
          
  },
  devServer: {
      
  },
  resolve: {
      
  },
  plugins: [
      new // 插件名，需要在头部引入
  ]
  ```

  

- loader编写

  loader是webpack对某种类型文件的处理方案

  数组中单个loader是一个对象

  ```javascript
  {
      test: /\.js$/, //匹配后缀名正则
      loader: "babel-loader"
      // 或是use,loader只能跟一个字符串，use可以跟一个对象(loader: 指定是用什么loader,options:{}进行配置)或
      //(数组对一个文件用多个loader处理)
  }
  ```

  
#### eslint
自身不定义规范，根据webpack的配置eslint，在eslint定义规范
属于插件，需要安装后再webpack.config中`require`引入
可以直接在new eslintPlugin({})中声明代码规范
但更推荐新建.eslintrc.js文件