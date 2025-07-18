# 常见 HTTP 状态码

## 概述

- 1xx: 协议处理的中间状态 不常见
- 2xx: 报文已收到并成功处理
  - 200： 最常见的正常状态码，服务器正常收到请求报文并返回响应
  - 204： 正确响应，但是响应报文中不包含`body`字段
  - 206： 应用于HTTP的断点续传或分块续传，表示当前收到的响应body字段并不是全部的相应内容
- 3xx: 重定向，资源发生变动，需要重新发送请求
  - 301： 永久重定向，表示当前请求的资源已经永久迁移到另一个位置, 会在响应头中的`Location`字段指明迁移后的url, 浏览器进行自动跳转
  - 302： 临时重定向, 表示当前请求的资源临时迁移到另一个位置，通用会用`Location`自动重定向
  - 304:  Not Modified, 表示协商缓存过程中发现远程服务器内容与缓存到本地的上次响应一致，重定向请求到缓存资源
  - 307： 临时重定向(HTTP 1.1引入)， 这里和302的差别在于 `HTTP/1.0` 定义的 302 响应允许客户端将原本是 `POST` 请求的行为改为 `GET` 请求去访问新地址（称为“不安全降级”）而307客户端应当使用**与原始请求相同的 HTTP 方法和请求体** 来访问新的 URL  使用场景有HTTP转HTTPS， 表单提交等
  - 308： 308与301的区别就像307之于302， 308保留了重定向前的请求方法与载荷
- 4xx: 客户端错误，请求报文有误，服务器无法处理
  - 400： 客户端的请求报文发生错误，但不清楚具体原因
  - 401： Unauthorized 缺少身份凭证信息 token过期需要重新登录等场景出现 需要前端捕获401状态并跳转到登录页
  - 403： Forbidden 表示已认证但无权限 服务器禁止访问
  - 404： 请求访问的资源找不到
- 5xx: 服务器处理请求时发生错误
  - 500： 服务器发生错误，但不知道具体原因
  - 501： 客户端请求功能暂不支持，”敬请期待。。。“
  - 502： 服务器作为网关或代理出现的错误码，服务器自身工作正常，访问
  - 503： 服务器当前繁忙，暂时无法响应


