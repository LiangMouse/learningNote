# type 和 interface 的区别

在 TypeScript 中，`type` 和 `interface` 都可以用来定义对象的结构和类型，但它们有一些细微的区别和各自的适用场景：

### 1. **定义对象类型**

- **`type`** 和 **`interface`** 都可以定义对象类型，但语法稍有不同：

```typescript
// 使用 type
type Person = {
  name: string;
  age: number;
};

// 使用 interface
interface Person {
  name: string;
  age: number;
}
```

### 2. **扩展方式**

- **`type`** 使用交叉类型（`&`）扩展类型：
  ```typescript
  type Animal = { species: string };
  type Dog = Animal & { breed: string };
  ```
- **`interface`** 使用 `extends` 关键字扩展：
  ```typescript
  interface Animal {
    species: string;
  }
  interface Dog extends Animal {
    breed: string;
  }
  ```

### 3. **声明合并**

- **`interface`** 支持声明合并（同名的接口会自动合并）：
  ```typescript
  interface User {
    name: string;
  }
  interface User {
    age: number;
  }
  // 合并后的 User
  // { name: string; age: number; }
  ```
- **`type`** 不支持声明合并：
  ```typescript
  type User = { name: string };
  type User = { age: number }; // 报错，重复定义
  ```

### 4. **可用场景**

- **`type`** 更灵活，可用于定义：
  - 基本类型的别名：
    ```typescript
    type ID = string | number;
    ```
  - 元组：
    ```typescript
    type Point = [number, number];
    ```
- **`interface`** 主要用于定义对象结构和类的契约，适合定义复杂的对象或与类配合使用。

### 5. **类型联合和交叉**

- **`type`** 支持联合类型和交叉类型：
  ```typescript
  type Shape = Circle | Square; // 联合
  type Position = { x: number } & { y: number }; // 交叉
  ```
- **`interface`** 不支持联合类型，但可以通过扩展实现类似功能。

### 6. **性能**

- **`type`** 在编译阶段的性能可能略快，因为它更轻量级。
- **`interface`** 是 TypeScript 更推荐的方式，尤其是在定义 API 和模块时。

### 选择建议

- 如果是 **定义简单对象或类的结构**，优先使用 **`interface`**，因为它支持声明合并，扩展性更强。
- 如果需要 **更灵活的类型定义**（如联合类型、交叉类型、基本类型别名），使用 **`type`**。
