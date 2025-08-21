# CSS面试题

## 判断一个元素是否在视图中

可以通过 JavaScript 的 `getBoundingClientRect()` 方法判断元素是否在视口内。例如：

```js
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
```

## 画一个三角形/0.5px线/圆形

### 三角形

利用 border 实现：

```css
.triangle {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid #333;
}
```

### 0.5px线

移动端高分屏下可以用 transform 缩放实现：

```css
.half-px-line {
  width: 100%;
  height: 1px;
  background: #333;
  transform: scaleY(0.5);
}
```
或者：
```css
.half-px-line {
  border-bottom: 0.5px solid #333;
}
```

**补充说明：**
- 在标准 web 端（PC 浏览器）中，CSS 的 px 最小单位为 1px，`border-bottom: 0.5px` 实际渲染出来还是 1px。
- 在移动端高分屏（如 Retina 屏，devicePixelRatio > 1）下，浏览器会根据设备像素比自动渲染出更细的线条，0.5px 可以显示为物理像素的一半，看起来就是 0.5px 效果。
- 如果需要兼容所有设备，可以用 transform 缩放法（如 scaleY(0.5)），或者用 SVG、Canvas 绘制更细的线条。
- 实际开发中，建议根据目标设备选择合适方案。

### 圆形

利用 border-radius 实现：

```css
.circle {
  width: 40px;
  height: 40px;
  background: #333;
  border-radius: 50%;
}
```

## CSS盒子模型

[点我](./CSS盒子模型.md)

## CSS选择器及其权重

[点我](./CSS选择器及权重.md)

## Flex布局

[点我](./Flex布局.md)

## 设置元素隐藏

| 隐藏方式                | 原理/表现                          | 是否占空间 | 是否可交互 | 是否触发重排 | 常见场景                         |
|------------------------|------------------------------------|------------|------------|--------------|----------------------------------|
| display: none          | 完全移除，元素不存在                | 否         | 否         | 是           | 切换内容、表单错误提示           |
| visibility: hidden     | 元素不可见但保留空间                | 是         | 否         | 否           | 占位符、临时隐藏                 |
| opacity: 0             | 元素透明但保留空间和事件            | 是         | 是         | 否           | 动画过渡、渐隐效果               |
| position: absolute + 移出视口 | 绝对定位移出可视区域              | 视情况     | 是         | 否           | SEO隐藏、可操作但不可见内容      |
