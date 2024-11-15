# git 基础

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
git push origin ls
# origin指最初git clone的地址,ls是远程仓库的一个分支
```

## 多人协作

在公司项目中，通常每个人在远程仓库中有自己负责的分支。

```shell
git branch -r
#查看远端所有分支
git checkout -b feature-new-feature && git push -u origin feature-new-feature
#新建自己的分支，开始coding~
```

当完成开发并推送后，需要提交 Pull Request 合并到主分支。
为了避免冲突，如果你的开发文件也被其他人修改过，可能会产生合并冲突。为此，建议在主分支有改动时，定期执行` git pull --rebase origin main`(这里--rebase 参数可以使 git 日志清晰)，拉取主分支的最新更改并合并到自己的分支中，确保自己的分支保持最新，从而减少最终合并到主分支时发生冲突的风险。

拉取代码也可能会产生冲突，此时可能会先 `git stash -u`，然后拉取，然后 `git stash pop` 弹出自己原有代码来处理冲突(**注意**:不带-u 参数的 git stash 不会暂存新建的文件)

进行 `git commit`之后想要撤销当前的提交，可以使用`git reset`命令

<hr />
据说可以通过git log查看提交日志，来推测公司的真实下班时间？
