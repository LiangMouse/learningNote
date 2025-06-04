npm是node的包管理工具
## npm安装流程

1. 查找项目(若没有则是全局)的.npmrc配置文件
2. 比较package.json和package-lock.json进而生成依赖树
3. 根据依赖树下载依赖资源(此处会进行缓存比较)，并将资源下载到本地的node_modules文件夹
4. 生成package-lock.json,保证像^版本符号不同下载版本一致并保存下载链接，减少安装时间

## npm缓存机制

1. 在安装资源的时候，npm 会根据 lock 中的 integrity、version、name 信息生成一个唯一的 key。
2.  然后用这个 key 经过 SHA256 算法生成一个 hash，根据这个 hash 在 `index-v5` 中找到对应的缓存文件，该缓存文件中记录着该包的信息。
3. 根据该文件中的信息我们在 `content-v2` 中去找对应的压缩包，这样就找到了对应的缓存资源了。
4. 最后再将该压缩包解压到 `node_modules` 中，节省了网络开销和安装时间