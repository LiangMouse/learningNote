# CSS 选择器权重判断

一般来讲，优先级为 `!important > style > id > class`

复杂的多个类应用场景下则是类似四位数，数字 **ABCD** 的处理

如果存在内联样式，那么 A = 1，否则 A = 0 ；
B 的值等于 ID 选择器（#id） 出现的次数；
C 的值等于 类选择器（.class） 和 属性选择器（a[href="https://example.org"]） 和 伪类（:first-child） 出现的总次数；
D 的值等于 标签选择器（h1,a,div） 和 伪元素（::before,::after） 出现的总次数。

从左至右比较，如果一样大，取右值
