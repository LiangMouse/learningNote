# CSS 面试题

## 判断一个元素是否在视图中

可以通过 JavaScript 的 `getBoundingClientRect()` 方法判断元素是否在视口内。例如：

```js
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
```

## 画一个三角形/0.5px 线/圆形

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

### 0.5px 线

移动端高分屏下可以用 transform 缩放实现：

```css
.half-px-line {
  width: 100%;
  height: 1px;
  background: #333;
  transform: scaleY(0.5);
}
```

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

## CSS 盒子模型

[点我](./CSS盒子模型.md)

## CSS 选择器及其权重

[点我](./CSS选择器及权重.md)

## Flex 布局

[点我](./Flex布局.md)

## 设置元素隐藏

| 隐藏方式                      | 原理/表现                | 是否占空间 | 是否可交互 | 是否触发重排 | 常见场景                     |
| ----------------------------- | ------------------------ | ---------- | ---------- | ------------ | ---------------------------- |
| display: none                 | 完全移除，元素不存在     | 否         | 否         | 是           | 切换内容、表单错误提示       |
| visibility: hidden            | 元素不可见但保留空间     | 是         | 否         | 否           | 占位符、临时隐藏             |
| opacity: 0                    | 元素透明但保留空间和事件 | 是         | 是         | 否           | 动画过渡、渐隐效果           |
| position: absolute + 移出视口 | 绝对定位移出可视区域     | 视情况     | 是         | 否           | SEO 隐藏、可操作但不可见内容 |

## 常见属性以及其属性值

### display

常见的有

- block：块级元素，独占一行，宽度默认占满父元素。
- inline：行内元素，多个元素可以在同一行，宽度根据内容自动调整。
- inline-block：行内块元素，多个元素可以在同一行，宽度根据内容自动调整，但是可以设置宽度和高度。
- none：元素不存在，不占用空间，也不会触发事件。
- flex：弹性布局，元素可以根据容器大小自动调整大小和位置。
- grid：网格布局，元素可以根据容器大小自动调整大小和位置。

此外还有 Inline-flex、flow-root、table...等布局方式。该属性主要影响盒子的 **外部表现以及内部表现**，其中`block`和`inline`等内容影响元素位置是否独占一行。 `flow`,`flex`,`grid`等内容规定了元素的内部显示类型

### position

- static：静态定位，元素位置由文档流决定，不可以使用 top、bottom、left、right 等属性。
- relative：相对定位，元素位置相对于其正常位置偏移，不脱离文档流。`top`等属性相对于自身偏移，并且当`z-index`不是`auto`时，会创建新的层叠上下文
- absolute：绝对定位，元素位置相对于**最近的非静态定位祖先元素**偏移，脱离文档流。
- fixed：固定定位，元素位置相对于视口偏移，脱离文档流。如返回顶部的按钮
- sticky：粘性定位，最初是文档流`static`定位，但是当元素滚动到视口顶部时，会固定在顶部，类似`fixed`效果。
