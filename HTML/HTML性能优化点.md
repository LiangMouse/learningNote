# HTML 性能优化相关

## img 设置 Loading=“lazy”

- 作用：原生懒加载，推迟非视口内图片的网络请求与解码，降低首屏开销。
- 基本用法：在 `img` 标签上添加 `loading="lazy"`，现代浏览器大多已支持。
- 注意事项：
  - 为图片提供明确的 `width`/`height` 或 CSS 尺寸，避免 CLS（布局抖动）。
  - 首屏关键图不要懒加载（首屏内通常应及时加载，可用 `fetchpriority="high"` 提示）。
  - 懒加载与响应式图片可同时使用（`srcset`/`sizes`）。
  - 非关键、折叠区图片可设置 `fetchpriority="low"`，进一步降低竞争。
  - 可配合 `decoding="async"` 将解码放到异步任务，减少主线程阻塞。

示例（基础懒加载与避免 CLS）：

```html
<img
  src="/images/hero-placeholder.jpg"
  alt="示例图片"
  width="800"
  height="450"
  loading="lazy"
  decoding="async"
  fetchpriority="low"
/>
```

示例（响应式图片 + 懒加载）：

```html
<img
  src="/images/photo-800.jpg"
  srcset="
    /images/photo-400.jpg   400w,
    /images/photo-800.jpg   800w,
    /images/photo-1600.jpg 1600w
  "
  sizes="(max-width: 768px) 90vw, 800px"
  alt="风景图"
  width="800"
  height="450"
  loading="lazy"
  decoding="async"
  fetchpriority="low"
/>
```

拓展：`iframe` 同样支持原生懒加载（`<iframe loading="lazy">`）。

## script 标签延时执行

默认情况下当 HTML 解析到 script 标签会阻碍 HTML 的解析并转而下载 JS 脚本，下载后执行，执行后才去解析 HTML

- `script` ：会阻碍 HTML 解析，只有下载好并执行完脚本才会继续解析 HTML。
- `async script` ：解析 HTML 过程中进行脚本的异步下载，下载成功立马执行，有可能会阻断 HTML 的解析。
- `defer script`：完全不会阻碍 HTML 的解析，解析完成之后再按照顺序执行脚本。
  ![三种script的差异](/script标签01.png)

### 总结

- 如果脚本不依赖于 DOM，可以使用 async 属性来避免阻塞。
- 如果脚本之间有依赖关系，或者需要在 DOM 完全解析后执行，使用 defer 属性。
- 对于内联脚本（即直接在 `script`标签中编写 JavaScript 代码），通常不需要 async 或 defer 属性，除非脚本非常短，且不依赖于页面其他部分的执行。

## Link 的 rel="preload"和"prefetch"

- 概念区别：

  - `preload`：表示“当前页面渲染必需或高优先级的资源”，提前请求与缓存，尽早参与布局/渲染。
  - `prefetch`：表示“未来页面或后续时刻可能用到的资源”，浏览器会在空闲时低优先级获取。

- 适用场景：

  - `preload`：首屏关键 CSS、关键字体、首屏首个大图、关键路由的首包 JS；
  - `prefetch`：下一步交互可能跳转的路由包、次级图片资源、非关键时段使用的脚本。

- 常见 `as` 类型：`style`、`script`、`font`（配合 `crossorigin`）、`image`、`fetch`、`video`、`audio`。

- 注意事项：
  - `preload` 必须配合正确的 `as`，否则可能被忽略或重复下载；
  - 预加载字体需加 `crossorigin` 与 `font-display`（在 CSS 中）；
  - 不要滥用 `preload`，过多会与首屏关键资源竞争带宽；
  - `prefetch` 是低优先级且可被浏览器丢弃的提示，不保证一定下载。

示例：预加载关键 CSS 与字体

```html
<link rel="preload" as="style" href="/styles/critical.css" />
<link
  rel="preload"
  as="font"
  href="/fonts/Inter.woff2"
  type="font/woff2"
  crossorigin
/>
```

示例：预加载首屏 hero 图（确保非懒加载且会尽快展示）

```html
<link
  rel="preload"
  as="image"
  href="/images/hero.jpg"
  imagesrcset="/images/hero@1x.jpg 1x, /images/hero@2x.jpg 2x"
  imagesizes="100vw"
/>
```

示例：预获取下一个路由的 JS 包

```html
<link rel="prefetch" href="/assets/chunk-about.abcd1234.js" as="script" />
```

拓展：还可结合 `modulepreload`（ESM 预加载）用于现代打包产物的依赖预热。
