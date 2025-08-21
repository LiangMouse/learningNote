# CSS 选择器与权重

## 权重

一般来讲，优先级为 `!important > style > id > class`

复杂的多个类应用场景下则是类似四位数，数字 **ABCD** 的处理

如果存在内联样式，那么 A = 1，否则 A = 0 ；
B 的值等于 ID 选择器（#id） 出现的次数；
C 的值等于 类选择器（.class） 和 属性选择器（a[href="https://example.org"]） 和 伪类（:first-child） 出现的总次数；
D 的值等于 标签选择器（h1,a,div） 和 伪元素（::before,::after） 出现的总次数。

从左至右比较，如果一样大，取右值。

**示例：**
- `#id .class span` 权重为 0,1,1,1
- `div` 权重为 0,0,0,1
- `a.active:hover` 权重为 0,0,2,1
- `style="color:red"` 权重为 1,0,0,0

## 组合选择器

### 多元素选择器

用于同时选中多个标签，例如：
```css
h1, h2, h3 {
  color: #333;
}
```

### 后代选择器

选中某元素下的所有指定后代元素，例如：
```css
div p {
  margin: 0;
}
```

### 子元素选择器

只选中某元素的直接子元素，例如：
```css
ul > li {
  list-style: none;
}
```

### 直接相邻元素选择器

选中紧跟在某元素后的第一个兄弟元素，例如：
```css
h2 + p {
  margin-top: 0;
}
```

### 普通相邻元素选择器

选中某元素后所有兄弟元素，例如：
```css
h2 ~ p {
  color: #666;
}
```

## 伪类选择器

用于选中特定状态的元素。

常见伪类选择器：
- `:hover` 鼠标悬停时
- `:active` 激活时
- `:focus` 获得焦点时
- `:first-child` 第一个子元素
- `:last-child` 最后一个子元素
- `:nth-child(n)` 第 n 个子元素

**示例：**
```css
a:hover {
  color: red;
}
ul li:first-child {
  font-weight: bold;
}
input:focus {
  border-color: blue;
}
