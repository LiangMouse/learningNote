# Jest 学习笔记

`JavaScript`测试框架,所以取名为 J 开头的 test?能用来测试 JavaScript、TypeScript、React、Vue 等项目，检查代码运行是否符合预期

`Jest`运行在 Node 环境中(也支持浏览器环境使用)，默认使用`CommonJs`模块系统

需要修改项目的`package.json`

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

把当前项目的测试工具指定为`jest`,类似地如果项目使用`vitest`等其他测试工具，也首先需要配置这里

这里我的包管理工具是`pnpm`,终端输入`pnpm test`后执行后缀为`.test.js`的文件，比较`expect`和`tobe`测试用例的结果以及检查语法错误

### 配置文件的生成

运行`pnpm create jest@latest`。这会安装最新的`jest`同时用类似`vite`搭建`Vue3`环境的询问配置偏好的方式，来初始化生成一个`jest.config.js`文件

```shell
√ Would you like to use Typescript for the configuration file?
# 是否希望使用 TypeScript 来编写 Jest 的配置文件。
√ Choose the test environment that will be used for testing
# 选择测试时运行的环境，也就是 Jest 模拟的运行环境。 jsdom Or Node
√ Do you want Jest to add coverage reports?
# 是否希望 Jest 生成代码覆盖率报告。哪些被覆盖哪些没有覆盖
√ Which provider should be used to instrument code for coverage? »
# 选择生成覆盖率报告时的插桩工具（Provider）。插桩是指在代码中插入额外的逻辑，用于统计哪些部分被执行过。 Babal Or V8
√ Automatically clear mock calls, instances, contexts and results before every test?
# 是否希望在每次测试之前自动清除所有的 mock 调用、实例、上下文和结果。
```

### 测试种类

- **单元测试**:测试一个函数
- **集成测试**：测试依赖关系
- **端到端测试**：在交互中输入文本得到预定结果
- **UI 测试**:页面视图显示正常，功能正确且性能符合预期(多数为人工测试)
-

### demo

```JavaScript
// ./sum.test.js
const sum = require("./add");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
  // toBe是判断基本类型值是否相等或是是否指向同一个对象，使用toEqual()来对
});
// test函数是jest提供的全局API，第一个参数为测试描述，第二个为测试的回调函数代码
```

### 常用方法

- `toBe`: `expect`和`toBe`参数的字面量值是否相等
- `toEqual`: 适用于对引用类型数据作测试，返回值是实际内容而不是引用
- `not`: 对判断结果取反
- `mock`: mock 的作用是模拟函数或模块的行为，帮助你控制测试环境，使测试独立且可控，同时还可以验证代码的调用方式和次数。
