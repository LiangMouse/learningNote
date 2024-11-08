# Grid 布局

响应式的二维子元素排布,又叫网格布局
给父元素设置`display:grid`，子元素应用网格上下文

## 如何确定在一个二维方格中子元素"领土"

- 第一步先给父盒子划分网格

`grid-template-columns`:100px 1fr 30%
若容器宽 1000px,第一列固定 100，第三列 900/3，第二列为剩余的一份为 600px
`grid-template-rows`:类似语法，几个数值就是分成几个行块

- 第二步根据网格线给子元素分配位置
  起始部分的线下标为 1，n 个块就有 n+1 个线
  对于一个有两个列块，四个行块的容器，如果让 a 类的子元素占据上半部分，可以表示为
  ```CSS
  .a {
    grid-row-start: 1;
    grid-column-start:1;
    grid-row-end: 3;
    grid-column-end: 3;
  }
  // 或是下方简写
  .a {
    grid-area : 1/1/3/3;
  }
  ```
