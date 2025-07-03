# HTML性能优化相关


## img设置Loading=“lazy”


## script 标签延时执行

默认情况下当 HTML 解析到 script 标签会阻碍 HTML 的解析并转而下载 JS 脚本，下载后执行，执行后才去解析 HTML

- `script` ：会阻碍 HTML 解析，只有下载好并执行完脚本才会继续解析 HTML。
- `async script` ：解析 HTML 过程中进行脚本的异步下载，下载成功立马执行，有可能会阻断 HTML 的解析。
- `defer script`：完全不会阻碍 HTML 的解析，解析完成之后再按照顺序执行脚本。
  ![三种script的差异](./img/script标签01.png)

### 总结

- 如果脚本不依赖于 DOM，可以使用 async 属性来避免阻塞。
- 如果脚本之间有依赖关系，或者需要在 DOM 完全解析后执行，使用 defer 属性。
- 对于内联脚本（即直接在 `script`标签中编写 JavaScript 代码），通常不需要 async 或 defer 属性，除非脚本非常短，且不依赖于页面其他部分的执行。
