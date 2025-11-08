# Vue 响应式原理

Vue 响应式原理是实现数据驱动视图的核心机制，即当数据发生变化时，视图会自动更新。因为从 Vue2 到 Vue3 的迭代中，整个响应式原理有很大的变化，下边分开来说，两者的原理以及区别都是面试中常考的内容

## 一、Vue2 的响应式原理

Vue2 的响应式基于**`Object.defineProperty()`** 实现，核心逻辑是：  
对数据对象的**每个属性**进行遍历，通过`Object.defineProperty()`为属性添加`getter`（获取属性时触发，也就是依赖收集）和`setter`（修改属性时触发，也就是派发更新）。

- 当属性被访问（如在模板中使用），`getter`会将当前组件的依赖（Watcher）收集到“依赖管理器 `dep`”中；
- 当属性被修改，`setter`会通知依赖管理器，触发所有相关依赖（组件）重新渲染。

但`Object.defineProperty`的`setter`只能监听到值的内容,存在无法感知对象属性增删等操作。Vue2 不得不采取不那么优雅的方式，重写 Vue 作用域中的数组方法，如`push`、`pop`、`splice`等，以触发依赖更新。 见[源码](https://github.com/vuejs/vue/blob/v2.6.14/src/core/observer/array.js)

## 二、Vue3 的响应式原理

Vue3 的响应式基于**`Proxy`** 实现，核心逻辑是：  
通过`Proxy`创建数据对象的“代理对象”，直接拦截对**整个对象**的操作（如属性访问、修改、新增、删除等），并配合`Reflect`（反射）完成原始操作的执行。这也是 Vue3 即使是对基本数据类型作`ref`响应式包裹，也得用`.value`才能访问的原因。

- 当对代理对象进行任何操作（如`obj.foo`访问、`obj.foo = 1`修改、`delete obj.foo`删除、`obj.newKey = 2`新增），`Proxy`的拦截器（如`get`、`set`、`deleteProperty`）会触发；
- 拦截时会收集依赖或触发更新，实现数据与视图的联动。

## 三、核心区别

| 维度              | Vue2（Object.defineProperty）                                                                                                                      | Vue3（Proxy）                                                         |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 监听对象粒度      | 监听**对象的单个属性**，需要遍历对象所有属性初始化响应式                                                                                           | 监听**整个对象**，无需遍历属性，直接代理对象本身                      |
| 新增/删除属性支持 | 不支持。新增属性（如`obj.newKey = 1`）或删除属性（如`delete obj.key`）不会触发更新，需通过`this.$set`/`this.$delete`手动处理                       | 原生支持。直接新增/删除属性会被`Proxy`拦截，自动触发更新              |
| 数组监听方式      | 需重写数组的 7 个方法（`push`/`pop`/`splice`等），通过包装方法触发更新；无法监听通过索引修改数组（如`arr[0] = 1`）或修改长度（如`arr.length = 0`） | 无需重写数组方法。`Proxy`可直接拦截数组的索引修改、长度修改等所有操作 |
| 深层嵌套对象处理  | 初始化时递归遍历所有深层属性，立即转为响应式（无论是否使用）                                                                                       | 懒加载处理：仅当访问深层属性时，才递归为其创建代理（按需处理）        |
| 数据类型支持      | 仅支持对象和数组，对`Map`/`Set`等复杂类型支持有限                                                                                                  | 原生支持`Object`/`Array`/`Map`/`Set`等所有内置对象类型                |

## 四、Vue3 响应式升级带来的好处

1. **更全面的响应式覆盖**  
   无需依赖`$set`/`$delete`，新增/删除属性、通过索引修改数组等操作可直接触发更新，开发更自然。

2. **更好的性能**

   - 懒加载处理深层对象：避免初始化时递归所有属性（尤其数据量大时），减少初始性能消耗；
   - 直接代理对象而非遍历属性：初始化速度更快，内存占用更低。

3. **更完善的类型支持**  
   对`Map`/`Set`等复杂数据类型的原生支持，满足更多业务场景（如需要频繁添加/删除键值对的场景）。

4. **更简洁的代码逻辑**  
   无需重写数组方法，响应式实现代码更简洁，维护成本更低。

## 实操篇

**Vue2 的更新响应收集**

```javascript
function defineReactive(obj) {
  // 1. 判断是否为对象，如果不是对象或者为 null，则直接返回
  if (typeof obj !== "object" || obj === null) {
    return;
  }
  // 2. 遍历对象的所有属性
  Object.keys(obj).forEach((key) => {
    // 内部保留一个变量来存储属性的实际值
    let value = obj[key];

    // 3. 递归处理：如果属性值仍然是一个对象，则继续使其响应式
    defineReactive(value);

    // 4. 使用 Object.defineProperty 重新定义属性
    Object.defineProperty(obj, key, {
      enumerable: true, // 可枚举（允许 for...in 循环）
      configurable: true, // 可配置（允许再次 defineProperty）

      /**
       * 拦截“读”操作
       */
      get() {
        console.log(`[依赖收集]：正在访问属性 ${key}，值为：${value}`);
        // 在 Vue 的真实实现中，这里会执行依赖收集（比如 Dep.depend()）
        return value;
      },

      /**
       * 拦截“写”操作
       */
      set(newValue) {
        // 5. 如果新值和旧值相同，则不执行任何操作
        if (newValue === value) {
          return;
        }

        console.log(
          `[派发更新]：正在修改属性 ${key}，旧值：${value}，新值：${newValue}`
        );
        value = newValue; // 更新内部保留的值

        // 6. 递归处理：如果新赋的值是一个对象，也需要将其变为响应式
        defineReactive(newValue);

        // 在 Vue 的真实实现中，这里会执行派发更新（比如 Dep.notify()）
      },
    });
  });
}
```

**Vue3 响应式对象**

```javascript
/**
 * 使一个对象变为响应式（Vue 3 Proxy 实现）
 * @param {object} target - 需要变为响应式的原始对象
 */
function reactive(target) {
  // 1. 同样，只处理对象
  if (typeof target !== "object" || target === null) {
    return target;
  }

  // 2. 创建 Proxy 处理器（handler）
  const handler = {
    /**
     * 拦截“读”操作
     * @param {object} target - 原始对象
     * @param {string|symbol} key - 访问的属性名
     * @param {object} receiver - 代理对象本身
     */
    get(target, key, receiver) {
      console.log(`[依赖收集]：正在访问属性 ${String(key)}`);

      // 使用 Reflect.get 来安全地获取原始值（this指向代理对象），与Proxy搭配使用
      const value = Reflect.get(target, key, receiver);

      // 3. 核心：递归与懒处理
      // 如果访问的属性值仍然是一个对象，则递归地将其也变为 reactive
      if (typeof value === "object" && value !== null) {
        return reactive(value);
      }

      return value;
    },

    /**
     * 拦截“写”操作（包括修改和新增）
     * @param {object} target - 原始对象
     * @param {string|symbol} key - 修改的属性名
     * @param {*} newValue - 新的属性值
     * @param {object} receiver - 代理对象本身
     */
    set(target, key, newValue, receiver) {
      // 4. 判断是“修改”还是“新增”
      const hadKey = Object.prototype.hasOwnProperty.call(target, key);
      const action = hadKey ? "修改" : "新增";

      const oldValue = Reflect.get(target, key, receiver);

      // 5. 只有值真正改变时才触发更新
      if (oldValue === newValue) {
        return true; // set 必须返回一个布尔值
      }

      // 使用 Reflect.set 来安全地设置新值
      const result = Reflect.set(target, key, newValue, receiver);

      console.log(
        `[派发更新]：正在 ${action} 属性 ${String(key)}，新值为：${newValue}`
      );
      // 在 Vue 真实实现中，这里会执行派发更新（trigger）

      return result;
    },

    /**
     * 拦截“删除”操作
     * @param {object} target - 原始对象
     * @param {string|symbol} key - 删除的属性名
     */
    deleteProperty(target, key) {
      console.log(`[派发更新]：正在删除属性 ${String(key)}`);

      // 使用 Reflect.deleteProperty 来安全地删除属性
      const result = Reflect.deleteProperty(target, key);
      // 派发更新...
      return result;
    },
  };

  // 3. 返回这个对象的代理
  return new Proxy(target, handler);
}
```
