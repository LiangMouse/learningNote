# Git 版本回退

### git reset

重置到某个提交，改变当前分支的提交历史

三种模式

- --soft: 保留回退的更改，直接进入暂存区
- --mixed: 保留回退的更改，但从暂存区移除
- --hard:彻底删除回退后的所有更改

```bash
# 回退到指定的提交（保留更改到暂存区）
git reset --soft <commit-hash>

# 回退到指定的提交（保留更改到工作区，但清空暂存区）
git reset --mixed <commit-hash>

# 回退到指定的提交（丢弃所有更改，无法恢复）
git reset --hard <commit-hash>
```

---

### git revert

`git revert`会创建一个新的提交，用于撤销某个提交的更改，而**不会修改提交历史**

假设有一个 A - B - C - D (HEAD)的提交历史，其中 C 有问题需要撤销

执行`git revert C`,执行后 A - B - C - D - E (HEAD)。
其中 E 是新生成的撤销更改，内容是撤销 C 的更改，但 C 本身仍在提交历史中，未被修改或删除

---

### git checkout

暂时切换到某个提交状态，但不会修改当前分支

```bash
# 切换到指定提交（进入分离 HEAD 状态）
git checkout <commit-hash>

# 回到最新的提交
git checkout main
```

### git restore

还原某个特定文件到一提交状态

```bash
# 将指定文件还原到最近一次提交的状态
git restore <filename>

# 将指定文件还原到某个提交的状态
git restore --source=<commit-hash> <filename>
```
