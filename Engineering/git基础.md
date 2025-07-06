# git 基础

## 最基础SOP

```shell
git clone 'url'
```

**git clone**复制远端项目文件及同步 git 分支以及log日志

```shell
git checkout -b {new-branch-name}
```
在本地新建当前需求的分支 [分支命名最佳实践链接](https://graphite.dev/guides/git-branch-naming-conventions)

```shell
git add .
```

将本地需求涉及改动添加至 git 暂存区，被 git 跟踪，临时存储，不会保留历史

```shell
git commit -m ''
# -m参数是对本次提交的描述
```

将暂存区的改动内容提交到本地仓库，生成版本号和当前快照，支持回溯

```shell
git push origin {branch-name}
# origin指最初git clone的地址,ls是远程仓库的一个分支
```
将所有本地的新commit提交到远端

## 常用命令

### git branch



