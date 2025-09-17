# Nextjs上手指南

## 创建项目

脚手架命令

```shell 
npx create-next-app {project-name}

pnpm dlx create-next-app 

yarn create next-app
```
执行上述命令后，你可以选择是否启用以下功能：

- 使用 TypeScript
- 使用 ESLint
- 使用 Tailwind CSS
- 使用实验性的 app/ 目录
- 使用 src/ 目录结构
- 使用 App Router（推荐）

## APP Router

不同于传统React项目，使用React router自定义组件与路由映射管理路由。**Nextjs**在V13后默认采用**App router**强约束文件系统映射的方式定义路由，直观且自然进行组件定义和代码分割

`App Router`定义了两种组件
- 服务器组件 (Server Components) : 这是默认的组件类型。它们在服务器上运行，完成数据获取和渲染后，将生成的 HTML 发送给浏览器。
- 客户端组件 (Client Components) : 这类组件需要在文件顶部明确声明 "use client" 。它们会在服务器上进行一次预渲染（生成初始HTML），然后相关的 JavaScript 代码会发送到浏览器，在浏览器中“激活”（hydrate），变得可交互。

为了表现对SSR的支持, Nextjs项目默认不引入index.html, 而是使用app/layout.tsx 对文件元数据等内容作修改，将服务端渲染贯彻始终

## 服务端能力

一般有两种写服务端可调用API的方式

- server action
- api router

这两种方式，取决于是否有第三方调用，如果没有使用前者，否则后者。另外像websocket这种必须建立网络链接的就得使用`api router`