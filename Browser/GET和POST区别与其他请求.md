# GET 和 POST 区别与其他请求

## 请求方法概述

HTTP 定义了一组请求方法，用来表明要对给定资源执行的操作。每个请求方法都有特定的语义和用途。

主要有`GET`、`OPTION`、`POST`、`PUT`、`DELETE`、`PATCH`、`DELETE`等
### GET
- **用途**：从服务器获取资源
- **特点**：安全、幂等、可缓存
- **语义**：请求获取由 Request-URI 所标识的资源
- **示例**：
```javascript
// 使用 fetch API
fetch('/api/users?page=1&limit=10')
  .then(response => response.json())
  .then(data => console.log(data));

// 使用 axios
axios.get('/api/users', {
  params: {
    page: 1,
    limit: 10
  }
});
```

### POST
- **用途**：向服务器提交数据，通常会导致服务器状态变化
- **特点**：不安全、非幂等、不可缓存
- **语义**：请求服务器接受请求中的实体作为请求资源的新的从属实体
- **示例**：
```javascript
// 创建新用户
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
});
```

### PUT
- **用途**：创建或完全替换目标资源
- **特点**：不安全、幂等、不可缓存
- **语义**：请求服务器存储一个资源，并用 Request-URI 作为其标识
- **示例**：
```javascript
// 更新用户信息（完全替换）
fetch('/api/users/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: 123,
    name: 'Jane Doe',
    email: 'jane@example.com',
    age: 30
  })
});
```

### PATCH
- **用途**：对资源进行部分修改
- **特点**：不安全、非幂等、不可缓存
- **语义**：请求服务器对资源进行部分修改
- **示例**：
```javascript
// 部分更新用户信息
fetch('/api/users/123', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'newemail@example.com'
  })
});
```

### DELETE
- **用途**：删除指定的资源
- **特点**：不安全、幂等、不可缓存
- **语义**：请求服务器删除 Request-URI 所标识的资源
- **示例**：
```javascript
// 删除用户
fetch('/api/users/123', {
  method: 'DELETE'
});
```

### HEAD
- **用途**：获取资源的元信息，不带请求体
- **特点**：安全、幂等、可缓存
- **语义**：类似于 GET 请求，但服务器不返回消息体
- **示例**：
```javascript
// 检查资源是否存在或获取元信息
fetch('/api/users/123', {
  method: 'HEAD'
}).then(response => {
  console.log('Content-Length:', response.headers.get('Content-Length'));
  console.log('Last-Modified:', response.headers.get('Last-Modified'));
});
```

### OPTIONS
- **用途**：获取目标资源所支持的通信选项
- **特点**：安全、幂等、不可缓存
- **语义**：请求服务器返回该资源所支持的所有 HTTP 请求方法
- **应用场景**：CORS 预检请求
- **示例**：
```javascript
// CORS 预检请求（浏览器自动发送）
fetch('/api/users', {
  method: 'OPTIONS'
}).then(response => {
  console.log('Allow:', response.headers.get('Allow'));
  console.log('Access-Control-Allow-Methods:', response.headers.get('Access-Control-Allow-Methods'));
});
```

## GET和POST区别
以下是 `GET` 和 `POST` 请求方法的主要区别：

| 特性         | GET                                   | POST                                |
| ------------ | ------------------------------------- | ----------------------------------- |
| **用途**     | 用于获取资源或请求数据                | 用于提交数据或执行操作              |
| **参数传递** | 参数通过 URL 传递，显示在浏览器地址栏 | 参数通过请求体传递，不显示在 URL 中 |
| **安全性**   | 安全性较低，数据可被查看              | 安全性较高，数据不显示在 URL 中     |
| **缓存性**   | 支持缓存                              | 不支持缓存                          |
| **长度限制** | URL 长度有限，通常是 2048 个字符      | 没有严格限制，取决于服务器配置      |
| **幂等性**   | 幂等（相同的请求返回相同结果）        | 非幂等（请求可能产生不同结果）      |
| **性能**     | 性能较高，因可以缓存                  | 性能较低，因数据会被提交到服务器    |
| **用途示例** | 获取网页、获取数据                    | 提交表单数据、上传文件              |

## HTTP 方法特性总结

### 安全性（Safe）
安全的方法不会修改服务器状态，只用于获取信息：
- **安全**：GET, HEAD, OPTIONS
- **不安全**：POST, PUT, PATCH, DELETE

### 幂等性（Idempotent）
幂等的方法多次执行产生相同的结果：
- **幂等**：GET, HEAD, PUT, DELETE, OPTIONS
- **非幂等**：POST, PATCH

### 可缓存性（Cacheable）
可缓存的方法响应可以被存储以供后续使用：
- **可缓存**：GET, HEAD, POST（在特定条件下）
- **不可缓存**：PUT, PATCH, DELETE, OPTIONS

## 常见问题和最佳实践

### 1. 何时使用 PUT vs PATCH？
- **PUT**：当你要完全替换资源时使用
- **PATCH**：当你只需要更新资源的部分字段时使用

### 2. POST vs PUT 创建资源？
- **POST**：服务器决定资源 ID，如 `POST /users`
- **PUT**：客户端指定资源 ID，如 `PUT /users/123`
