# Flex 布局

CSS3 新推出的排版上下文，

对父盒子使用`display: flex`进行创建

## 作用

可以控制子盒子摆放流向，空间分布，水平垂直对齐等功能

- 摆放流向

容器设置`flex-direction`默认值是 row,即从左到右摆放，常用值还有 row-reverse(从右到左)，collumn(列),column-reverse(从下到上)

除摆放顺序以外，`flex-direction`还控制了**主轴**方向，默认的 row 值也就是主轴默认水平。而侧轴方向为主轴的垂直方向。主轴方向的不同影响了其他的属性值效果

- 空间分布

  `justify-content`控制了子元素在主轴的对齐方式
  常见属性值的含义

  - flex-start:在主轴开始排列(默认)
  - flex-end:在主轴末尾排列元素
  - center:在主轴上居中对齐，两侧留出等距空白
  - space-between:子元素平均分布，首尾元素位于容器两侧
  - space-evenly:子元素之间及子元素和容器之间都有相等的间距

  `align-items`控制了子元素在侧轴的对齐方式
  常见属性值的含义

  - stretch: 子元素在侧轴方向若不是固定大小，则会被拉伸成容器大小
  - flex-start: 子元素在侧轴沿起点对齐
  - -flex-end: 子元素在侧轴沿末端对齐
  - center: 居中对齐(主轴 row 即垂直居中)
  - baseline: 子元素文本沿极限对齐
    对于侧轴，还可以对子元素使用`align-self`和`order`来控制单个的排列

- Flexibility 特点
  Flex 布局下的子元素可以视为一个"弹簧"
  - `flex-grow` : 剩余空间的拉伸能力，子元素宽度总和小于容器宽度时起作用.例如三个子元素 flex 上下文宽度都是 100px,a 的 f-g 是 2，b 的 f-g 是 1，c 是 0.a 的实际宽度就是 100+(100%-300)\*2/3
  - `flex-shrink`:容器不足的收缩能力
  - `flex-basis`: 没有伸展收缩的基础长度
    这三个值可以用`flex`属性表示,如 flex:1 含义为 `f-grow:1;f-shrink:1;f-basis:auto`;
