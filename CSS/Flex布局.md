# Flex 布局

Flex 布局（弹性布局）是一种一维布局模型，通过给父容器设置 `display: flex` 来创建弹性容器，可以灵活控制子元素的排列、对齐和空间分布。

首先，我就要推荐一个学习网站，[Flexbox Froggy](https://flexboxfroggy.com/)：通过游戏方式实践可视化学习 Flex 布局，操控 flex 属性让青蛙进入睡莲

## 基本概念

### 主轴与侧轴

Flex 布局中有两个重要概念：

- **主轴（Main Axis）**：由 `flex-direction` 定义的方向，默认是水平方向（从左到右）
- **侧轴（Cross Axis）**：与主轴垂直的方向

主轴方向的不同会影响其他属性的效果。例如，当 `flex-direction: row` 时，主轴是水平的，侧轴是垂直的；当 `flex-direction: column` 时，主轴是垂直的，侧轴是水平的。

## 容器属性（父元素）

### flex-direction：控制主轴方向

设置子元素的排列方向，即主轴的方向。

**常用值：**

- `row`（默认）：从左到右排列
- `row-reverse`：从右到左排列
- `column`：从上到下排列（列）
- `column-reverse`：从下到上排列

> **提示**：`reverse` 属性能够实现元素摆放的反置，如果需要更精细的控制，可以使用子元素的 `order` 属性。

### justify-content：主轴对齐方式

控制子元素在主轴方向上的对齐方式。

**常用值：**

- `flex-start`（默认）：在主轴开始位置排列
- `flex-end`：在主轴末尾排列
- `center`：在主轴上居中对齐，两侧留出等距空白
- `space-between`：子元素平均分布，首尾元素位于容器两侧
- `space-around`：子元素周围有相等的间距
- `space-evenly`：子元素之间及子元素和容器之间都有相等的间距

### align-items：侧轴对齐方式

控制子元素在侧轴方向上的对齐方式。

**常用值：**

- `stretch`（默认）：子元素在侧轴方向若不是固定大小，则会被拉伸填满容器
- `flex-start`：子元素在侧轴沿起点对齐
- `flex-end`：子元素在侧轴沿末端对齐
- `center`：居中对齐（当主轴为 `row` 时，即垂直居中）
- `baseline`：子元素文本沿基线对齐

## 子元素属性

### order：控制排列顺序

允许在不改变 HTML 结构的情况下，通过 CSS 改变元素的排列顺序。

**特点：**

- 应用于 Flex 布局的子元素
- 默认值为 `0`
- 值越小越靠近主轴起始方向，按升序排列
- 可以为负数（如 `-2`, `-1`）或正数（如 `1`, `2`）

**示例：**

```css
.item-1 {
  order: 2;
} /* 排在后面 */
.item-2 {
  order: 1;
} /* 排在中间 */
.item-3 {
  order: 0;
} /* 排在前面（默认） */
```

### align-self：单个元素侧轴对齐

对单个子元素设置**侧轴**对齐方式，会覆盖容器的 `align-items` 设置。

**常用值：**与 `align-items` 相同（`stretch`、`flex-start`、`flex-end`、`center`、`baseline`）

### flex：弹性属性（flex-grow、flex-shrink、flex-basis）

Flex 布局下的子元素可以视为"弹簧"，具有弹性伸缩的能力。弹性由三个属性控制：

#### flex-grow：拉伸能力

定义子元素在剩余空间中的拉伸比例。当子元素宽度总和小于容器宽度时起作用。

**示例：**

假设容器宽度为 400px，三个子元素基础宽度都是 100px：

- 元素 A：`flex-grow: 2`
- 元素 B：`flex-grow: 1`
- 元素 C：`flex-grow: 0`

剩余空间 = 400 - 300 = 100px

- 元素 A 实际宽度 = 100 + (100 × 2/3) ≈ 166.67px
- 元素 B 实际宽度 = 100 + (100 × 1/3) ≈ 133.33px
- 元素 C 实际宽度 = 100px（不拉伸）

#### flex-shrink：收缩能力

定义子元素在容器空间不足时的收缩比例。默认值为 `1`，表示可以收缩。

#### flex-basis：基础长度

定义子元素在分配剩余空间之前的基础长度。默认值为 `auto`，表示使用元素的内容宽度。

#### flex 简写属性

`flex` 是 `flex-grow`、`flex-shrink`、`flex-basis` 的简写形式。

**常用写法：**

- `flex: 1` 等同于 `flex-grow: 1; flex-shrink: 1; flex-basis: auto;`
- `flex: 0 1 auto` 等同于 `flex-grow: 0; flex-shrink: 1; flex-basis: auto;`（默认值）
- `flex: none` 等同于 `flex: 0 0 auto`（不伸缩）
