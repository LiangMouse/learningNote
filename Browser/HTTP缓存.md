# HTTP 缓存

分为强缓存和协商缓存两种

#### 强缓存

如果本地有，可以直接用
HTTP 请求头
Expires: 时间戳，绝对时间
Cache-Control
可缓存性
no-cache: 需要协商缓存验证
no-store: 不使用任何缓存
持续时间 `max-age`: 存储的最大时间，相对请求的单位秒的时间
重新验证 `must-revalidate`: 一旦资源过期，必须要向原始服务器发起验证

#### 协商缓存

需要先与服务端通信验证来确认是否使用缓存
协商缓存头
`Etag/IF-None-Match`:资源的特定版本标识符，前者是响应头后者是请求头
`Last-Modified/if-Modified-Since`: 最后修改的时间戳
