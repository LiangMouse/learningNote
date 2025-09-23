import { defineConfig } from "vitepress";

export default defineConfig({
  title: "LiangMouseBlog",
  description:
    "LiangMouse 的前端技术博客，分享 JavaScript、Vue、React 等前端开发经验和学习笔记",

  // 站点配置
  base: "/",
  lang: "zh-CN",

  // 忽略死链接检查（临时解决方案）
  ignoreDeadLinks: true,

  // 构建配置
  build: {
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          "vue-vendor": ["vue", "@vue/runtime-dom"],
          "vitepress-vendor": ["vitepress"],
        },
      },
    },
  },
  // 站点地图配置
  sitemap: {
    hostname: "https://blog.lsself.xyz",
  },
  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: "首页", link: "/" },
      { text: "GitHub", link: "https://github.com/LiangMouse" },
    ],
    // 侧边栏
    sidebar: [
      {
        text: "HTML",
        collapsed: false,
        items: [
          { text: "HTML的性能优化部分", link: "/HTML/HTML性能优化点" },
          { text: "语义化", link: "/HTML/语义化" },
        ],
      },
      {
        text: "CSS",
        collapsed: true,
        items: [
          { text: "CSS常见面试题", link: "/CSS/CSS常见面试题" },
          { text: "多种居中布局实现", link: "/CSS/水平垂直居中布局" },
          { text: "CSS 盒子模型", link: "/CSS/CSS盒子模型" },
          { text: "Flex 布局", link: "/CSS/Flex布局" },
          { text: "Grid布局", link: "/CSS/Grid布局" },
          { text: "块级格式化上下文", link: "/CSS/块级格式上下文" },
          { text: "z-index 层叠上下文", link: "/CSS/z-index的深入理解" },
          { text: "CSS动画", link: "/CSS/CSS动画" },
          { text: "CSS选择器及权重", link: "/CSS/CSS选择器及权重" },
          { text: "重绘和回流", link: "/CSS/重绘和回流" },
        ],
      },
      {
        text: "JavaScript",
        collapsed: true,
        items: [
          { text: "JS常见面试题", link: "/JavaScript/JS常见面试题" },
          { text: "ES6 新特性", link: "/JavaScript/ES6新特性" },
          { text: "原型与原型链", link: "/JavaScript/原型与原型链" },
          { text: "事件循环", link: "/JavaScript/事件循环" },
          { text: "常用数组方法", link: "/JavaScript/常用数组方法" },
          { text: "闭包", link: "/JavaScript/闭包" },
          {
            text: "箭头函数与普通函数区别",
            link: "/JavaScript/箭头函数和普通函数的区别",
          },
          { text: "apply,bind 和 call", link: "/JavaScript/apply,bind和call" },
          { text: "new 操作符", link: "/JavaScript/new操作符" },
          { text: "深浅拷贝", link: "/JavaScript/JS深浅拷贝" },
          { text: "promise", link: "/JavaScript/Promise" },
          { text: "async/await", link: "/JavaScript/async函数的原理" },
          { text: "Js 数据类型", link: "/JavaScript/Js数据类型" },
          { text: "判断数据类型", link: "/JavaScript/判断数据类型" },
          {
            text: "null 和 undefined 的区别",
            link: "/JavaScript/null和undefined的区别",
          },
          {
            text: "0.1+0.2 不等于 0.3?",
            link: "/JavaScript/0.1+0.2不等于0.3？",
          },
          { text: "==和===的差别", link: "/Javascript/==和===的差别" },
          { text: "this指向", link: "/JavaScript/this指向" },
          { text: "模块化", link: "/JavaScript/模块化" },
        ],
      },
      {
        text: "Browser",
        collapsed: true,
        items: [
          { text: "跨域问题与解决方案", link: "/Browser/跨域问题" },
          {
            text: "GET 和 POST 的区别",
            link: "/Browser/GET和POST区别与其他请求",
          },
          {
            text: "从输入域名到页面显示发生了什么",
            link: "/Browser/从输入域名到页面显示发生了什么",
          },
          { text: "浏览器存储", link: "/Browser/浏览器存储" },
          { text: "登录鉴权", link: "/Browser/登录鉴权" },
          { text: "浏览器的进程和线程", link: "/Browser/浏览器上进程架构" },
          { text: "HTTP 常见状态码", link: "/Browser/常见状态码" },
          { text: "长连接和短连接", link: "/Browser/长连接和短连接" },
        ],
      },
      {
        text: "TypeScript",
        collapsed: true,
        items: [
          { text: "Ts 类型基础", link: "/TypeScript/TS类型" },
          {
            text: "type 和 interface 的区别",
            link: "/TypeScript/type和interface",
          },
          { text: "泛型", link: "/TypeScript/泛型" },
        ],
      },
      {
        text: "Vue",
        collapsed: true,
        items: [
          { text: "Vue 中 key 的作用", link: "/Vue/Vue中Key的作用" },
          { text: "Vue 响应式原理", link: "/Vue/Vue响应式原理" },
          { text: "MVVM 模式的理解", link: "/Vue/MVVM模式的理解" },
          { text: "v-if 与 v-show 的区别", link: "/Vue/v-if和v-show的区别" },
          { text: "Vue2 与Vue3 的区别", link: "/Vue/Vue2和Vue3的区别" },
          { text: "computed和watch的区别", link: "/Vue/computed和watch的区别" },
          { text: "组件通信", link: "/Vue/组件通信" },
        ],
      },
      {
        text: "React",
        collapsed: true,
        items: [
          {
            text: "类组件和函数组件的不同",
            link: "/React/类组件和函数组件的不同",
          },
          { text: "常用 hooks", link: "/React/常用hooks" },
          { text: "Fiber 算法", link: "/React/Fiber架构" },
          { text: "JSX与React的关系", link: "/React/JSX与React的关系" },
          { text: "redux", link: "/React/redux" },
          { text: "React版本升级里程碑", link: "/React/React版本升级里程碑" },
        ],
      },
      {
        text: "前端工程化",
        collapsed: true,
        items: [
          {
            text: "为什么要使用构建工具",
            link: "/Engineering/为什么要用构建工具",
          },
          { text: "Babel", link: "/Engineering/Babel" },
          { text: "Webpack 基础", link: "/Engineering/Webpack基础配置" },
          {
            text: "Vite 为什么比 Webpack 快",
            link: "/Engineering/WebPack和Vite对比",
          },
          { text: "深入webpack插件", link: "/Engineering/深入webpack插件" },
          { text: "SourceMap", link: "/Engineering/SourceMap" },
          { text: "git基础", link: "/Engineering/git基础" },
          { text: "前端安全问题", link: "/Engineering/前端安全问题" },
          { text: "JS模块化方案", link: "/Engineering/JS模块化方案" },
          { text: "BFF中间层", link: "/Engineering/BFF中间层" },
        ],
      },
      {
        text: "计算机基础",
        collapsed: true,
        items: [
          { text: "OSI 七层模型", link: "/计算机基础/OSI七层模型" },
          { text: "CDN作用与原理", link: "/计算机基础/CDN的作用和原理" },
          { text: "操作系统基础扫盲", link: "/计算机基础/操作系统基础扫盲" },
          { text: "HTTPS协议", link: "/计算机基础/HTTPS协议" },
          { text: "HTTP协议", link: "/计算机基础/HTTP协议" },
          { text: "HTTP常见状态码", link: "/计算机基础/HTTP常见状态码" },
          { text: "HTTP缓存", link: "/计算机基础/HTTP缓存" },
          { text: "UDP和TCP的区别", link: "/计算机基础/UDP和TCP的区别" },
          { text: "WebSocket", link: "/计算机基础/WebSocket" },
        ],
      },
      {
        text: "场景沉淀",
        collapsed: true,
        items: [
          { text: "前端一站式发布", link: "/场景沉淀/前端一站式发布平台" },
          { text: "网络请求的门道", link: "/场景沉淀/请求竞态等网络请求门道" },
          { text: "大数据渲染", link: "/场景沉淀/大数据渲染" },
        ],
      },
      {
        text: "设计模式",
        collapsed: true,
        items: [
          { text: "单例模式", link: "/设计模式/单例模式" },
          { text: "概述", link: "/设计模式/概述" },
        ],
      },
      {
        text: "框架快速上手",
        collapsed: true,
        items: [
          { text: "Nextjs入门", link: "/快速上手/Nextjs入门" },
          { text: "Vitepress快速上手", link: "/快速上手/Vitepress快速上手" },
          { text: "eggjs快速上手", link: "/快速上手/eggjs快速上手" },
          { text: "jenkins入门", link: "/快速上手/jenkins入门" },
          { text: "Jest 基础", link: "/Engineering/Jest" },
        ],
      },
    ],

    // 社交链接
    socialLinks: [{ icon: "github", link: "https://github.com/LiangMouse" }],
    // 搜索
    search: {
      provider: "local",
    },

    // 页脚
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024 LiangMouse",
    },

    // 编辑链接
    editLink: {
      pattern: "https://github.com/LiangMouse/learningNote/edit/main/:path",
      text: "在 GitHub 上编辑此页",
    },
    // 最后更新时间
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },
  },

  // Markdown 配置
  markdown: {
    lineNumbers: true,
  },

  // 头部配置 - SEO 优化
  head: [
    ["link", { rel: "icon", href: "/icon.png" }],
    ["meta", { name: "theme-color", content: "#3c8772" }],
    [
      "meta",
      {
        name: "keywords",
        content: "前端,JavaScript,React,Vue,技术博客,开发经验,LiangMouse",
      },
    ],
    ["meta", { name: "author", content: "LiangMouse" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "LiangMouseBlog" }],
    [
      "meta",
      {
        property: "og:description",
        content: "LiangMouse 的个人技术博客，分享前端开发经验和技术心得",
      },
    ],
    ["meta", { property: "og:url", content: "https://blog.lsself.xyz" }],
    [
      "meta",
      { property: "og:image", content: "https://blog.lsself.xyz/icon.png" },
    ],
    ["meta", { name: "twitter:card", content: "summary" }],
    ["meta", { name: "twitter:title", content: "LiangMouseBlog" }],
    [
      "meta",
      { name: "twitter:description", content: "LiangMouse 的个人技术博客" },
    ],
    [
      "meta",
      { name: "twitter:image", content: "https://blog.lsself.xyz/icon.png" },
    ],
    ["link", { rel: "canonical", href: "https://blog.lsself.xyz" }],
    // 预加载关键资源
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "dns-prefetch", href: "https://cdn.jsdelivr.net" }],
  ],
});
