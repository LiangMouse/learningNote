# CSS 动画

一般有两种方式: 过渡动画`transition`和自定义动画`animation`

## 1 transition

### 1.1 解释

为元素样式的变化添加动画效果。它可以在属性变动时自动生成平滑过渡

### 1.2 应用场景

- 用户交互事件：例如鼠标悬停（:hover）、焦点（:focus）、激活状态（:active）等，这些伪类可以触发样式的变化，从而导致过渡效果。
- 类的切换：通过 JavaScript 修改元素的样式类，导致样式变化。
- 直接样式修改：使用 JavaScript 直接改变元素的样式属性值。

### 1.3 基本语法

```CSS
/* 基本语法 */
transition: property duration timing-function delay;
```

- property: 指定需要变化的 CSS 属性。如果设置为 all，所有支持动画的属性都会有过渡效果。
- duration: 指定过渡效果的时长，单位为秒 (s) 或毫秒 (ms)。
- timing-function: 定义过渡效果的速度曲线。常用的值有 ease, linear, ease-in, ease-out, ease-in-out。
- delay: 指定过渡效果的延迟时间（可选），通常以秒或毫秒体现。

### 1.4 示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .button {
        background-color: blue;
        color: white;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
        transition: background-color 0.4s, transform 0.4s;
      }

      .button:hover {
        background-color: green;
        transform: scale(1.1);
      }
    </style>
    <title>hover后会丝滑转变颜色和大小</title>
  </head>
  <body>
    <button class="button">Hover me!</button>
  </body>
</html>
```

## 2 transform

### 2.1 解释

对元素进行二维或三维的变换操作。通过 transform，可以转换元素的位置、大小、形状和旋转等。

### 2.2 基本语法

1. 对元素进行位移变化 `transform: translate(100px, 50px)` 右、下移动
2. 对元素进行旋转 `transform: rotate(45deg);`
3. 放大缩小 `transform: scale(1.5);`
4. 倾斜 `transform: skewX(30deg)`
5. 组合联动变换 `transform: translate(100px, 50px) rotate(45deg) scale(1.5)` 会依次生效

### 2.3 示例代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Transform Button Example</title>
    <style>
      #moveButton {
        padding: 10px 20px;
        font-size: 16px;
        background-color: lightblue;
        border: none;
        cursor: pointer;
        transition: transform 0.5s ease;
        position: relative; /* Ensures element can be visually moved. */
      }
    </style>
  </head>
  <body>
    <button id="moveButton">Click to Move</button>

    <script>
      document
        .getElementById("moveButton")
        .addEventListener("click", function () {
          this.style.transform = "translate(100px, 50px)";
        });
    </script>
  </body>
</html>
```

## 3 animation

### 3.1 解释

通过@keyframes 定义关键帧，animation 属性让元素按照关键帧描述的样式变化，实现复杂的自定义动画。可控制动画的时长、次数、播放方式等。

### 3.2 基本语法

/_ 基本语法 _/
`animation: name duration timing-function delay iteration-count direction fill-mode;`
属性值分别是@keyframes 的名字 持续时间 动画曲线执行函数(ease) 延时执行时间 执行次数(可以是具体次数) 动画执行方向(默认正向)

#### 3.3 示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Animation Example</title>
    <style>
      @keyframes moveAndFade {
        0% {
          transform: translateX(0);
          opacity: 1;
        }
        50% {
          transform: translateX(100px);
          opacity: 0.5;
        }
        100% {
          transform: translateX(200px);
          opacity: 1;
        }
      }
      .animate {
        width: 100px;
        height: 40px;
        background: orange;
        color: #fff;
        line-height: 40px;
        text-align: center;
        border-radius: 8px;
        animation: moveAndFade 2s ease-in-out infinite alternate;
      }
    </style>
  </head>
  <body>
    <div class="animate">动画效果</div>
  </body>
</html>
```
