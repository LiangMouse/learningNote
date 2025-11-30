# OAuth

## 一、作用、组成

**倘若没有 Oauth**

如果一个应用，他需要读取其他应用的信息。没有 Oauth 前，我们需要手动提供给他账号密码供他访问。这显然是很危险的行为，自然地获得账密的应用会得到另一个应用所有权限，除非他不能工作你必须得无条件信任他

`Oauth`的出现，就是**为了创造一种“代客泊车钥匙” (Valet Key)：** 当你去酒店停车，给服务员的是一把**只能**用来开车门和点火的钥匙（Token），这把钥匙**打不开后备箱**（保护隐私），且**随时可以作废**，而原本的**主钥匙**（密码）始终在你手里。

Oauth 的**核心组成**

举例一个具体的场景: **我要用微信账号来登录 QQ 音乐**

| **角色名称 **  | **英文术语**             | **角色定义**                                       | **在场景中的身份**    |
| -------------- | ------------------------ | -------------------------------------------------- | --------------------- |
| **资源拥有者** | **Resource Owner**       | 能够授予访问权限的人（通常就是**用户**）。         | **你**                |
| **客户端**     | **Client**               | 想要访问用户数据的**第三方应用**                   | **QQ 音乐**           |
| **授权服务器** | **Authorization Server** | 负责验证用户身份并颁发“令牌”的服务器。它是守门员。 | **微信的登录服务器**  |
| **资源服务器** | **Resource Server**      | 存放用户数据（如头像、昵称、好友列表）的服务器。   | **微信的 API 服务器** |

Oauth 的核心过程就是通过**授权服务器给到客户端拿到令牌**， 而这个令牌就是所谓的`Access Token`

## 二、授权码模式

授权码模式是最主流的用户第三方登录场景所使用的技术。简单说就是一个用户先获得授权服务器提供的`Code`， 然后在后端静默获得`Access Token`的流程。

**为什么不直接 Token，而是需要中间的 Code?**

`Token`就像一张**真正的电影票**。谁捡到了，谁就能进场看电影。

`Code`就像你在美团上买到的**取票码**。

- 你把取票码写在手背上走在大街上（Code 会暴露在浏览器 URL 中），别人看到了也没用。
- 因为要兑换电影票，不仅需要**取票码 (Code)**，还需要在电影院的自助机上输入**手机后四位 (Client Secret)**。

Code 是临时的、可暴露的；Token 是长期的、保密的。中间多这一步，就是为了把 Token 藏在后端，不经过浏览器。

**流程**

1. 前端发起请求，进行重定向（用户点击“使用 github 登录”，网站带一些参数重定向到 github 特定界面）

   ```http
   GET https://github.com/login/oauth/authorize?
     response_type=code       <-- 告诉 GitHub：我要“取票码”，先别给我Token
     &client_id=MY_APP_ID     <-- 我是 MyData 网站
     &redirect_uri=https://mydata.com/callback  <-- 完事了把人送回这儿
     &scope=read:user         <-- 我只想读用户信息，不干坏事
   ```

2. 用户在 Github 的页面上通过鉴权后进行确认，同意登录

3. github 回调到原网站并给到 Code。 生成一个临时的 Code，并重定向到

   ```md
   Location: https://mydata.com/callback?code=abc123456
   ```

4. 后端靠`Code`（”公钥“）和`CLient Secret`（只有双方知道）向授权服务器 github 发起请求

   ```HTTP
   POST /login/oauth/access_token HTTP/1.1
   Host: github.com
   Accept: application/json
   Content-Type: application/json

   {
     "client_id": "YOUR_APP_ID",           // 你的应用身份证
     "client_secret": "YOUR_APP_SECRET",   // 你的应用密钥（绝密！）
     "code": "abc123456",                  // 刚才拿到的临时授权码
     "grant_type": "authorization_code",   // 告诉 GitHub：我是来换票的
     "redirect_uri": "https://mydata.com/callback" // 安全校验，必须和第一步一模一样，避免是中间人攻击
   }
   ```

5. 授权服务器验证无误后，颁发`Token`

   ```JSON
   {
     "access_token": "e72e16c7e42f292c6912e7710c838347ae178b4a",
     "scope": "read:user",
     "token_type": "bearer"
   }
   ```

6. 拿到这个 `access_token` 后，你的后端通常会做两件事：

   1. **拿着它**去 GitHub 获取用户信息（比如用户名、头像）。

   2. **建立自己的会话**（比如生成一个你自己网站的 Session 或 JWT），让用户在你的系统里算作“已登录”。

## 三、PKCE
