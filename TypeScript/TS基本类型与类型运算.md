# 理解 TypeScript 类型系统：从内置类型到类型运算

## 内置类型

### JS 运行时类型

- 原始类型：number、boolean、string、object（非原始类型）、bigint、symbol、undefined、null
- 包装类型：Number、Boolean、String、Object

### 复合类型

- 数组：`Array<T>` 或简写为 `T[]`，例如 `(string | boolean)[]`、`Array<number>`
- 类：在 TypeScript 中，类声明同时创建两个实体——一个值（class 构造函数，存在于运行时）和一个类型，即 class 的实例形状，存在于编译时
  - `implements` 关键字：纯粹的编译时检查，`class MyClass implements IMyInterface` 强制 `MyClass` 的实例类型必须满足 `IMyInterface` 接口
- 元组（Tuple）：元素个数和类型固定的数组类型
  - 与数组的区别
    1. 长度：数组在类型定义上不限制长度，元组在类型定义上长度固定
    2. 元素类型：数组通常用于表示同种类型的集合，例如 `string[]`；元组用于表示已知类型和位置的元素序列

### 接口与类型别名

- 接口（Interface）：可以描述函数、对象、构造器的结构

  ```typescript
  // 描述函数
  interface SayHello {
    (name: string): string;
  }
  /* @input interface's key,
   *  @output string
   */
  const func: SayHello = (name: string) => {
    return "hello," + name;
  };
  ```

- Interface 与 type 的区别
  1. 声明合并：type 重复声明同名类型会报错，interface 重复声明会自动合并为单独声明
  2. 描述范围：interface 主要用于描述对象、类、函数，而 type 可以描述任何 TypeScript 类型，在 interface 基础上还能描述联合类型（`string | number`）、元组、原始类型别名 `type MyString = string;`、映射类型 `type MyMapped<T> = ...`
  3. 扩展方式：interface 使用 `extends` 关键字继承和扩展其他 interface；type 使用 `&` 操作符进行组合和扩展
  4. 使用方式：`interface I {...}`、`type Type = ...`

### 枚举

- 用于表示一组固定的值

  ```typescript
  enum Transpiler {
    Babel = "babel",
    Postcss = "postcss",
    Terser = "terser",
    Prettier = "prettier",
    TypeScriptCompiler = "tsc",
  }

  const transpiler = Transpiler.TypeScriptCompiler;
  ```

### 字面量类型

- 类似 `1111`、`'aaaa'`、`{ a: 1 }` 等字面量也可以作为类型
- 分为普通字符串字面量（如 `'aaa'`）和模板字面量（如 `aaa${string}`，表示以 `aaa` 开头后接任意字符串）

  ```typescript
  function func(str: `#${string}`) {}
  func("aa"); // error
  func("#aa");
  ```

### 实用工具类型

- `**Record<K, T>**`：将联合类型 `K` 映射为键，并把所有属性值统一为 `T`，常用于构造对象映射表。
- `**Partial<T> / Required<T>`\*\*：快捷地将类型 `T` 的所有属性改为可选或全部必填。
- `**Readonly<T> / Mutable<T>**`：强调属性只读，或通过自定义 `Mutable` 类型示例展示如何恢复可写属性。
- `**Pick<T, K> / Omit<T, K>**`：从类型 `T` 中挑选或排除 `K` 指定的属性。
- `**Exclude<T, U> / Extract<T, U> / NonNullable<T>**`：对联合类型执行集合运算，例如排除某些成员或提取非空类型。

### 其他常见类型

- `void`：表示“不关心”或“没有返回值”
- `never`：表示不可达，例如函数抛错后返回值为 `never`
- `any`：告诉编译器不要对该变量进行类型检查，如果到处使用 `any`，TypeScript 就退化为 JavaScript 了
- `unknown`：可以接受任何类型的值，但在作为右值使用前必须进行类型检查（类型守卫，如 `typeof` 或 `instanceof`）

## 类型的装饰

- 可选修饰符：`?`，如 `interface IPerson { readonly name: string; age?: number; }`
- 只读修饰符：`readonly`

  ```typescript
  interface IPerson {
    readonly name: string;
    age?: number;
  }

  type Tuple = [string, number?];
  ```

## 类型的运算

### 条件判断

- TypeScript 里的条件类型语法为 `extends ? :`

  ```typescript
  type IsTwo<T> = T extends 2 ? true : false;

  type Res = IsTwo<1>; // -> type Res = false;
  type Res2 = IsTwo<2>; // -> type Res2 = true;
  ```

- 其中 `extends` 的含义是：`A extends B` 表示 `A` 是 `B` 的子集，即 `A` 类型的变量是否可以安全赋值给 `B` 类型的变量

### 类型推导（infer）

- `infer` 操作符可以提取类型的一部分

  ```typescript
  // @description: 提取元组类型的第一个元素
  type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R]
    ? T
    : never;
  ```

  `type Res = First<[1, 2, 3]>; // type Res = 1;`

### 联合类型（|）

- 表示类型可以是多个候选之一：`type StringOrNumber = string | number;`

### 交叉类型（&）

- 表示对类型做合并运算：`type ObjType = { a: number } & { c: boolean };`
- 无法合并的类型交叉后返回 `never`

### 映射类型（keyof）

- 能对对象、class 等索引类型作修改

  ```typescript
  type MapType<T> = {
    [Key in keyof T]?: T[Key];
  };
  ```

- `in` 用于遍历联合类型
- 可以结合 `keyof` 修改值的形态

  ```typescript
  type MapType<T> = {
    [Key in keyof T]: [T[Key], T[Key], T[Key]];
  };

  type Res = MapType<{ a: 1; b: 2 }>;
  ```

### 重映射（as）

- 使用 `as` 运算符对索引进行操作变化，称为重映射

  ```typescript
  type MapType<T> = {
    [Key in keyof T as `${Key & string}${Key & string}${Key & string}`]: [
      T[Key],
      T[Key],
      T[Key]
    ];
  };

  type Res = MapType<{ a: 1; b: 2 }>;

  // Res => { aaa: [1, 1, 1], bbb: [2, 2, 2] }
  ```
