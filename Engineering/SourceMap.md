# SourceMap

## 是什么

`Soucre map`顾名思义是一个资源映射文件， 作为JSON描述文件(通常文件名为`{filename}.js.map`的格式)存储了代码打包转换后的位置信息，维护打包前后的代码映射关系。

## 为什么需要Source Map
工程中源码需要经过转换才能投入生产
    1. 压缩，减小体积。比如jQuery 1.9的源码，压缩前是252KB，压缩后是32KB。
    2. 多个文件合并，减少HTTP请求数。
    3。 其他语言编译成JavaScript，如jsx,ts

转换后的代码混淆程度高，如果线上有调试需求，非常困难，于是可以在打包工具中通过配置引入`Source Map`引入





> 参考资料

- https://juejin.cn/post/7023537118454480904
- https://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html