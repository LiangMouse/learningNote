# Monorepo 工程化实践指南

## 1. 什么是 Monorepo

**Monorepo**（Monolithic Repository，单体仓库）是一种将多个项目（Projects/Packages）的代码存储在同一个 Git 仓库中的软件开发策略。与之相对的是 **Polyrepo**（或 MultiRepo，多仓模式）。

### 为什么选择 Monorepo？

在一个业务团队中，往往存在“前后端代码关联”、“组件库复用”、“工具函数共享”的需求。

| **维度**     | **优势 (Pros)**                                                       | **挑战 (Cons)**                                                              |
| ------------ | --------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **代码复用** | 抽取公共逻辑（UI、Utils）非常容易，无需发 npm 包即可在项目间引用。    | **依赖幽灵**：容易出现子包错误引用根目录依赖（Phantom Dependencies）。       |
| **依赖管理** | 统一管理依赖版本（如 React 版本），避免不同项目版本不一致导致的 Bug。 | **体积膨胀**：`node_modules` 和 `.git` 体积巨大，初次拉取慢。                |
| **原子提交** | 一个 Feature 若涉及组件库改动和业务改动，可在一个 Commit 中完成。     | **构建性能**：改动底层库可能导致所有上层应用需要重新构建（需配合缓存工具）。 |
| **工程统一** | 统一 ESLint、TSConfig、CI/CD 流程，降低基建维护成本。                 | **权限控制**：难以对特定团队隐藏仓库内的某些目录。                           |

## 2. 技术选型体系

现代 Monorepo 不是单打独斗，而是由三层工具共同支撑的：

### A. 包管理器 (Package Manager)

负责依赖安装 (`install`) 和 软链链接 (`link`)。

- **pnpm (推荐)**: 依靠 `Workspace` 机制和硬链接技术，速度最快，磁盘占用最小，且能天然防止幽灵依赖。
- **Yarn Berry (v2+)**: 也支持 Workspace，功能强大但配置稍复杂。
- **npm (v7+)**: 原生支持 Workspace，但性能稍弱。

### B. 构建系统/任务编排 (Build System)

负责拓扑排序、缓存和并行执行任务。

- **Turborepo (推荐)**: Vercel 出品，配置简单，基于 Go 编写，速度极快。
- **Nx**: 功能极其强大，不仅是构建工具，更像是一个框架，上手曲线较陡。

### C. 版本控制与发布 (Versioning)

负责自动化生成 Changelog 和发版。

- **Changesets (推荐)**: 专注于 Monorepo 的发版工具，不仅管理版本号，还能自动生成变更日志。
- **Lerna**: 老牌工具，目前主要用于版本管理（很多构建功能已被 pnpm/Turbo 取代）。

## 3. 标准目录结构

一个生产级的 Monorepo 目录结构如下：

```
my-monorepo/
├── apps/                   # 【应用层】业务入口 (只消费，不产出复用代码)
│   ├── web/                # e.g. Next.js 官网
│   └── admin/              # e.g. Vite 后台管理系统
│
├── packages/               # 【基建层】共享库 (被 apps 依赖)
│   ├── ui/                 # UI 组件库 (React/Vue components)
│   ├── core/               # 核心业务逻辑 (Hooks, Context)
│   ├── utils/              # 纯函数工具库
│   ├── tsconfig/           # 共享 TS 配置 (Base config)
│   ├── eslint-config/      # 共享 ESLint 配置
│   └── types/              # 共享类型定义
│
├── .changeset/             # (Changesets) 发版日志存储
├── .husky/                 # Git Hooks 配置
├── package.json            # 根依赖 (DevDependencies: turbo, prettier, changesets)
├── pnpm-workspace.yaml     # 定义工作区范围
├── turbo.json              # 定义构建管道和缓存策略
└── .npmrc                  # pnpm 配置文件 (重要)
```

---

## 4. 搭建与核心配置 (以 pnpm 为例)

### Step 1: 初始化与 Workspace

```
pnpm init
touch pnpm-workspace.yaml
```

**`pnpm-workspace.yaml`**:

```
packages:
  - 'apps/*'
  - 'packages/*'
```

### Step 2: 核心机制——内部依赖引用 (Linking)

这是 Monorepo 的灵魂。假设 `apps/web` 需要使用 `packages/ui`。

1. 子包命名：

   在 packages/ui/package.json 中定义名字：

   ```
   { "name": "@my-repo/ui", "version": "1.0.0" }
   ```

2. 应用引用：

   在 apps/web/package.json 中引用它。注意使用 workspace:\* 协议，这能确保永远使用本地最新代码，而不是去 npm 仓库找。

   ```
   {
     "dependencies": {
       "@my-repo/ui": "workspace:*"
     }
   }
   ```

### Step 3: 配置共享 (Config Sharing)

**场景：共享 TypeScript 配置**

1. 创建 `packages/tsconfig/base.json`:

   ```
   {
     "compilerOptions": {
       "strict": true,
       "module": "ESNext",
       "target": "ESNext"
       // ...其他通用配置
     }
   }
   ```

2. 在 `packages/tsconfig/package.json` 中导出：

   ```
   { "name": "@my-repo/tsconfig", "files": ["base.json"] }
   ```

3. 在子包（如 `apps/web/tsconfig.json`）中继承：

   ```
   {
     "extends": "@my-repo/tsconfig/base.json",
     "compilerOptions": {
       "baseUrl": "." // 子包特定配置
     }
   }
   ```

### Step 4: 依赖版本统一

防止 web 用了 React 18.0，而 admin 用了 React 18.2。

在根目录 `package.json` 使用 `pnpm.overrides`：

```
{
  "pnpm": {
    "overrides": {
      "react": "18.2.0",
      "react-dom": "18.2.0"
    }
  }
}
```

## 5. 任务编排 (Turborepo)

如果不使用 Turbo，你需要分别去每个目录 `npm run build`。使用 Turbo 可以并行处理且利用缓存。

**`turbo.json` 配置示例**:

```
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      // ^表示构建当前包之前，必须先构建它依赖的包 (拓扑排序)
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "lint": {},
    "dev": {
      "cache": false, // 开发模式不需要缓存
      "persistent": true
    }
  }
}
```

- **效果**：当你运行 `pnpm build` (调用 turbo)，它会自动分析出：先 Build `ui` 和 `utils`，等它们好了，再并行 Build `web` 和 `admin`。

## 6. 常用命令速查

| **场景**               | **原生 npm 方式 (繁琐)**     | **pnpm 方式 (推荐)**                    |
| ---------------------- | ---------------------------- | --------------------------------------- |
| **根目录安装开发依赖** | `npm i -D turbo`             | `pnpm add -wD turbo` (`-w` = root)      |
| **给特定子包安装依赖** | `cd apps/web && npm i axios` | `pnpm --filter web add axios`           |
| **给所有子包安装依赖** | (无法一步完成)               | `pnpm -r add lodash` (`-r` = recursive) |
| **运行特定包的脚本**   | `cd apps/web && npm run dev` | `pnpm --filter web dev`                 |
| **运行所有包的构建**   | -                            | `turbo build` (需配置 turbo)            |

## 7. 规范化与 Git 流程

这部分与单仓项目类似，但要注意 scope。

1. Commitlint: 建议开启 scope-enum 检查。

   Scope 应该是你的包名，如 feat(ui): add button 或 fix(web): login bug。

2. **Changesets 发版流程**:

   - 开发完功能后，运行 `npx changeset`，选择修改了哪些包，填写改动说明。
   - 这将生成一个 markdown 文件。
   - 合并到主分支后，CI 运行 `npx changeset version` 自动更新 `package.json` 版本号并生成 CHANGELOG。
