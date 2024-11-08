# git 基础方法

## 最基础用法

```shell
git clone 'url'
```

**git clone**复制远端项目文件及同步 git 地址

```shell
git add .
```

将本地文件改动添加至 git 暂存区，被 git 跟踪，临时存储，不会保留历史

```shell
git commit -m ''
# -m参数是对本次提交的描述
```

将暂存区的改动内容提交到本地仓库，生成版本号和当前快照，支持回溯

```shell
git push origin main
# origin指最初git clone的地址,main是远程仓库的分支
```
