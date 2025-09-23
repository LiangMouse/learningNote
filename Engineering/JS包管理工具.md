# JS 包管理工具

**写在前面的**： 操作系统的文件系统管理方式——[软链接与硬链接](https://www.runoob.com/note/29134)。简单说，软链接是指向另一个文件或目录的快捷方式。删除原文件后，软链接会失效。

主流的 JS 包管理工具包含`npm` , `pnpm`, `yarn`等

## npm

### npm 依赖安装流程

1. 查找项目(若没有则是全局)的.npmrc 配置文件
2. 比较 package.json 和 package-lock.json 进而生成依赖树
3. 根据依赖树下载依赖资源(此处会进行缓存比较)，并将资源下载到本地的 node_modules 文件夹
4. 生成 package-lock.json,保证像^版本符号不同下载版本一致并保存下载链接，减少安装时间

### npm 缓存机制

1. 在安装资源的时候，npm 会根据 lock 中的 integrity、version、name 信息生成一个唯一的 key。
2. 然后用这个 key 经过 SHA256 算法生成一个 hash，根据这个 hash 在 `index-v5` 中找到对应的缓存文件，该缓存文件中记录着该包的信息。
3. 根据该文件中的信息我们在 `content-v2` 中去找对应的压缩包，这样就找到了对应的缓存资源了。
4. 最后再将该压缩包解压到 `node_modules` 中，节省了网络开销和安装时间

## pnpm

`pnpm` 通过软链接与硬链接结合的方式管理依赖

```bash
node_modules/
  .pnpm/
    react@18.2.0/
    lodash@4.17.21/
  react -> .pnpm/react@18.2.0/node_modules/react  (软链接)
  lodash -> .pnpm/lodash@4.17.21/node_modules/lodash (软链接)
```

如上图，`pnpm`安装的 react.lodash 依赖会形成软链接，也就是类似快捷方式那样指向`node_modules/.pnpm`。里边的内容是扁平化处理后的硬链接，硬链接就像给一块数据起了多个名字，根本的完整解压后的数据块存到`pnpm store`全局存储中。

**硬链接&软链接**

#### 📌 软链接（Symbolic Link）

- 像**快捷方式**。
- 存的只是“目标文件的路径”。
- 如果目标文件删掉，软链接就失效了（变成死链）。
- 跨分区可以用（因为就是个路径）。

例子：

```
node_modules/react -> .pnpm/react@18.2.0/node_modules/react
```

这里的 react 就是个软链接。

---

#### 📌 硬链接（Hard Link）

- 像**同一个文件的多个名字**。
- 文件系统中，一个文件 = inode（数据块）+ 文件名。硬链接就是给同一个 inode 起多个名字。
- 所有硬链接共享同一份实际数据。
- 只要还有一个硬链接存在，文件数据就不会被删除。
- 不能跨分区。

例子：

```
.pnpm/react@18.2.0/node_modules/react/index.js
```

这个文件不是复制的，而是硬链接到全局 store 缓存里的 `react/index.js`。

所以一个文件在磁盘里只存一份，多个项目共享。

## yarn

## 常见问题

### 不同包管理工具混用造成报错

以下拿 npm 和 yarn 混用报错举例

结论是无论任何时候不要混用
