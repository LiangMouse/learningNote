前端工程作用
1. 模块化，提供统一模块加载方案
2. 资源编译(新语法新工具编译成浏览器兼容)
3. 产物质量(代码体积，代码性能) ->无用代码剔除，tree-shaking产物压缩
4. 开发效率，本地服务器热更新
什么是Vite
No-bundle： 源文件无需导报
生产环境基于Rollup的Bundler
**特点**
1. 高性能，dev启动速度和热更新速度非常快
2. 开箱即用
传统的打包工具，启动缓慢编译时间久；修改代码后更新慢
	bundle带来的性能开销
	JavaScript的性能瓶颈
浏览器对原生ESM的普遍支持，esbuild是基于Golang编写的前端编译工具链，Rust编写的SWC对标Babel，速度快几十倍。
什么是原生ESM支持
	script标签增加type="module“属性，在这个标签中支持ESM的导出导入语法
Vite的dev Server就用了浏览器ESM的支持，实现文件的按需编译，可以利用文件级的浏览器缓存
Esbuild
	具备Bundler打包器，编译器对标babel和压缩器功能，Vite深度使用Esbuild
	缺点：不支持类型检查,Vite在生成环境构建要调用一次tsc,Esbulid只支持语法降级到ES6
开箱即用
	配置简单，开箱即有
	webpack,webpack-dev-server,css-loader,style-loader,less-loader,sass-loader,postcss-loader,file-loader,HTMLWebpackPlugin
	![[Pasted image 20241123190225.png]]
### Vite实战
静态资源在Vite中可以直接Import,编译后是一个绝对定位，路径给Vite dev server发送请求，然后dev Server会把内容返回给浏览器
生产环境Tree Shaking
	代码没有用到的地方删除掉，原理是基于ESM的import/export依赖关系，与运行时状态无关
Vite插件机制
	开发阶段：模拟Rollup插件机制
	生产阶段：直接使用Rollup