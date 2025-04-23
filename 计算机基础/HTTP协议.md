### 请求头响应头

| **常用请求头**                          | **说明**                                                                                        |
| ---------------------------------- | --------------------------------------------------------------------------------------------- |
| Accept                             | 接收类型，表示浏览器支持的 MIME 类型（对标服务器返回的 Content-Type）                                                  |
| Content-Type                       | 客户端发送出去实体内容的类型                                                                                |
| Cache-Control                      | 指定请求和响应遵循的缓存机制，如 no-cache                                                                     |
| If-Modified-Since                  | 对应服务端的 Last-Modified，用来匹配看文件是否变动，只能精确到 1s 之内                                                  |
| Expires                            | 缓存控制，在这个时间内不会请求，直接使用缓存，服务端时间                                                                  |
| Max-age                            | 代表资源在本地缓存多少秒，有效时间内不会请求，而是使用缓存                                                                 |
| If-None-Match                      | 对应服务端的 ETag，用来匹配文件内容是否改变（非常精确）                                                                |
| Cookie                             | 有 cookie 且同域访问时会自动带上                                                                          |
| Referer                            | 该页面的来源 URL（适用于所有类型的请求，会精确到详细页面地址，CSRF 拦截常用到这个字段）                                              |
| Origin                             | 最初的请求是从哪里发起的（只会精确到端口），Origin 比 Referer 更尊重隐私                                                  |
| User-Agent                         | 用户客户端的一些必要信息，如 UA 头部等                                                                         |
| **常用响应头**                          | **说明**                                                                                        |
| Content-Type                       | 服务端返回的实体内容的类型                                                                                 |
| Cache-Control                      | 指定请求和响应遵循的缓存机制，如 no-cache                                                                     |
| Last-Modified                      | 请求资源的最后修改时间                                                                                   |
| Expires                            | 应该在什么时候认为文档已经过期，从而不再缓存它                                                                       |
| Max-age                            | 客户端的本地资源应该缓存多少秒，开启了 Cache-Control 后有效                                                         |
| ETag                               | 资源的特定版本的标识符，Etags 类似指纹用于协商缓存                                                                       |
| Set-Cookie                         | 设置和页面关联的 cookie，服务器通过这个头部把 cookie 传给客户端                                                       |
| Server                             | 服务器的一些相关信息                                                                                    |
| Access-Control-Allow-Origin        | 服务器端允许的请求 Origin 头部（譬如为 * ）                                                                   |
