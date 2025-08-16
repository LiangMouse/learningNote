# CSS 盒子模型

HTML 中的每一个元素在 CSS 可以被视为一个盒子，分为外边距 margin,border,padding 和 content

### 属性值解析

`margin`: 一个盒子对盒子之外的"排挤"距离
`border`: 盒子的边框,`border: 1px solid red` 顺序固定为大小，边线样式和边框颜色
`padding`: `content`到`border`的内边距
`content`: 狭义的内容区

### 盒子类型

CSS 属性`box-sizing`可以指定盒模型的类型，分为两种——标准盒模型和 IE 盒模型

```CSS
.box1 {
  box-sizing: content-box;
  /* 默认值，width和height仅指content部分,意味着包括边框之内的视觉宽度实际更大 */
}
.box2 {
  box-sizing: border-box;
  /* width和height为content+padding+border */
}
```

由于 box2 的大小设置很多时候更符合直觉更容易控制,项目中有时会`* {box-sizing: border-box}`

### 一些注意项

- `margin` 坍塌: 两个垂直方向上的盒子（例如两个段落元素 `<p>`）相邻时，margin 会发生合并，即两个盒子之间的间距并不是两个 margin 的总和，而是两者之中较大的那个。可以使用`BFC`来避免坍塌
- 背景色范围: `background`的作用范围是`padding`+`content`
- `margin`和`padding`的百分比: 这两个属性可以用百分比设定值，其中 `padding` 不论方位，他的 100%的大小等同于当前盒子的宽度。可以用这个特性来作**矩形**。而`margin`的百分比值则与父盒子绑定
