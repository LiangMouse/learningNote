# HTTPS 协议

## 与HTTP的差异

- HTTPS 通过在HTTP与TCP层间加入了TLS/SSL 层解决了一些网络传输中安全的需求，这也是HTTPS的最大作用
- HTTP的连接相对简单，TCP三次握手便可进行HTTP传输，而HTTPS需要在TCP三次握手后进行TLS的握手才能进行加密报文的传输
- HTTP的默认端口是80，HTTPS的默认端口是443
- 外部依赖，HTTPS需要向CA (证书权威机构) 申请数字证书，以确保身份可信

## 解决安全问题

HTTP 属于明文传输，存在一些安全问题
- 窃听风险， 中间人可以监听通信内容
- 篡改风险，传输过程中恶意插入/篡改信息
- 冒充风险，恶意伪装网站进行信息窃取

## 实现原理

分别使用混合加密，校验机制，数字证书，解决了上述问题

### 混合加密

SSL采取既使用非对称加密又用对称加密的方式的**混合加密方式**

- 连接建立前，采取非对称加密的方式保证信息的机密性， 防止窃听的风险
- 连接建立后，使用计算出的唯一安全密钥进行对称加密，运算速度快

非对称加密: 非对称加密的核心是双方用各自的私钥和共同的公钥协商出中间人无法监听得到的共享秘钥对数据加密

### 校验机制

HTTPS采用 **摘要算法** + **数字签名** 的方式实现校验机制保证传输内容不被中间人篡改。

**摘要算法**实现原理： 服务端传递内容时根据发送内容计算Hash(Hash值无法反推内容)，然后客户端再根据收到内容计算Hash，如果相等则可以认为无误

上述流程中存在问题： 倘若黑客直接把内容与哈希整个替换掉，，客户端便无法检查出是否有篡改，此时就用到了数字签名

**数字签名** ： 使用非对称加密对哈希值进行加密，在哈希值发送与收到校验的过程中，用到了私钥加密公钥解密的方式确保信息的身份，这个过程被称为数字签名算法

通过校验机制和数字证书就解决了HTTP传输数据会被中间人篡改的风险

### 数字证书

只差最后一步———当前的公钥私钥是可以被攻击人伪造的，为解决这一点，将服务端的公钥用公信机构的私钥进行加密，并用公信机构CA颁发的数字证书来保证公钥的可信性

数字证书的工作流程

1. 服务器把自己的公钥注册到CA
2. CA用自己的私钥将公钥进行数字签名并颁发数字证书
3. 在与客户端通信过程中服务端把服务器公钥与CA数字签名一起发给客户端
4. 客户端拿到服务器数字证书后用CA的公钥验证数字证书真实性
5. 从数字证书拿到服务器公钥后对报文加密，发送给服务端

通过公信机构CA颁发数字证书解决冒充的风险

## 连接过程

1. 客户端向服务端索要身份证书并验证服务器公钥
2. 双方协商生成 **会话秘钥**
3. 此时连接成功，双方采用会话秘钥进行通信

### SSL握手过程