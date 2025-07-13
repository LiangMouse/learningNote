# Nextjs上手指南

## 创建项目

脚手架命令

```shell 
npx create-next-app {project-name}

pnpm dlx create-next-app 

yarn create next-app
```
执行上述命令后，你可以选择是否启用以下功能：

- 使用 TypeScript
- 使用 ESLint
- 使用 Tailwind CSS
- 使用实验性的 app/ 目录
- 使用 src/ 目录结构
- 使用 App Router（推荐）

## 文件规范

**Nextjs**在V13后采用文件目录进行映射的方式定义路由，直观且自然进行代码分割和懒加载，但因此开发Nextjs应用学习APP路由目录规则就变得非常重要