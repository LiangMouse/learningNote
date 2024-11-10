# TS 类型

## 基础类型

- Number,boolean,String
- 枚举 enum
  一组具有名称的常量的特殊类型

  ```TypeScript
  enum Direction {
    Up,       // 0,默认从0开始
    Down = 2,     // 2
    Left,     // 3
    Right,    // 4
  }

  // 使用
  let dir: Direction = Direction.Up;
  console.log(dir); // 输出：0
  console.log(Direction[1]) // 输出：Down  反向映射
  ```

- any,unknown,void

  - any 属于任意类型
  - unknown:可以被任意类型属性赋值，但 unknown 类型赋值其他值需要类型检查
  - void: 一般用于对函数上下文表示为无返回值，当作用在普通变量时，变量值只能为 undefined

- never

永远不存在值的类型

- 数组类型[]

- 元组类型 tuple

定义一组固定长度、已知类型的元素。

```TypeScript
let person: [string, number];
person = ["Alice", 25]; // 正确
person = [25, "Alice"]; // 错误：类型不匹配
// person就是一个元组类型的变量
```

## 函数类型

函数需要定义参数类型和返回值类型，其中参数支持可选参数和默认值，返回值可以被推断。

根据参数的不同同名函数可以同载

## 接口类型

接口类型是为了定义对象,由关键字`interface`来声明
支持类型可选和只读属性设置。
为一个对象添加接口，会有 ide 的补全提示

## 联合类型

`|`

## 交叉类型

`&`
