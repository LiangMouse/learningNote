开发需求
#### 1.13 15:50
路由页面，页面引用component，component无状态，页面进行useEffect,组件通信到component
#### 1.14
理解需求，在当前固定resourceType的基础上，支持三种不同内容services, accesspoints, tessfederatedaccesspoints，支持
https://tessvipmigui.muse.qa.ebay.com/object/migrate/130/nmei-test-ns/nmeinginx-standalone-test-migrate 如以上网站内容
Available Migration Options的migrate下进行动态表单的展示，然后点击button使用post请求
获得工作流flow
然后进行可视化展示
#### 1.15
明天下午四点前做完
路由的三种情况——
select框下四个options，不同options的不同内容
![[Pasted image 20250115143235.png]]
根据serviceType进行case的APi调用
#### 1.16
写好的静态表格配成import NiceForm from '@ebay/nice-form-react';的动态表单
[[
]]然后pages下发送/task(post)=
静态代码
通过modal的设置发现项目的antd版本是<4.23的。。
git push时出现冲突。当多次commit被push到origin时，会出现squash(压扁)成一条commit，此时本地与远端就存在冲突。选择是切到本地master，pull origin，然后在本地新建一个分支
#### 1.17
增加task/post的权限，先前用不了，报401
#### 1.20
**任务** ：新增完成URL中serviceType为ap的内容，根据task/post渲染表单和流程flow
降低耦合，不写重复代码
https://ant.design/components/descriptions-cn
能否安装antd版本到5

---
#### 1.23
Todo
- 把ap,tfap集合到pages中。使用meta，description.map
- auto checkbox设置成默认为true
- 提交过程中的disabled
- 提交之后定时刷新获取getTask
	![[Pasted image 20250123170006.png]]
	
- Modal中alias是输入
- taskDetail的右侧内容是空白的
-       为什么从services变成了service
#### 2.6
core/数据
ap的cluster在dev环境就是fcp-dev prod就是fcp-prod

```yaml
- target: luczhang-hlb-svc.luczhang-dev.svc.140.tess.io

adminState: enable

monitors:

- tcp

weight: 1

availabilityZone: slcaz03

- target: luczhang-hlb-svc.luczhang-dev.svc.130.tess.io

adminState: enable

monitors:

- tcp

weight: 1

availabilityZone: lvsaz03
```
![[Pasted image 20250207145144.png]]
{
    "ID": "205fe828-b096-451c-b11b-d031d002e0f5",
    "Strategy": "migrate_ap",
    "StrategySpecifics": "{\"new-ap-name\":\"sopstest1-hlb-slb\",\"apname\":\"sopstest1-hlb-slb\",\"nameservice\":\"sopstest1-hlb-igtm\",\"nsvcname\":\"sopstest1-hlb-igtm\",\"provider\":\"udns\"}",
    "State": "failed",
    "Stage": 5,
    "Target": "accesspoints/fcp-dev/sopstest1-dev/sopstest1-hlb",
    "Owner": "yutcao",
    "Mode": "manual",
    "ChangeID": "385c8d5b-b820-4772-a3a9-f7913fdbc265",
    "CreatedAt": "2025-02-10T06:09:27.024Z",
    "StartedAt": null,
    "FinishedAt": null,
    "HeartBeatAt": "2025-02-10T06:27:19.341Z",
    "WorkerID": "vipmig-core-web-generic-dc4787c78-vcnk4",
    "Version": 3,
    "CRName": "CHG44975862",
    "HealthMonitorInfo": "",
    "Stages": [
        {
            "TaskID": "205fe828-b096-451c-b11b-d031d002e0f5",
            "ID": 1,
            "Name": "Preparation",
            "State": "done",
            "StageData": "",
            "Info": "",
            "Log": "",
            "MetaData": "",
            "CreatedAt": "2025-02-10T06:27:19.431750597Z",
            "RunningAt": null,
            "DoneAt": null,
            "SubStages": [
                {
                    "TaskID": "205fe828-b096-451c-b11b-d031d002e0f5",
                    "ID": 1,
                    "Name": "PreCheck",
                    "State": "done",
                    "StageData": "",
                    "Info": "{\"type\":\"link\",\"value\":\"https://console.sherlock.io/d/c9e28bad-4ab6-4491-9e85-5fe67be1b4b9/hlb2slb-migration?orgId=1\\u0026refresh=30s\\u0026var-hlb_ip=10.148.18.187\\u0026var-slb_ip=\"}",
                    "Log": "2025-02-10 06:09:28 Start to run pre check stage in ap migration task.\n2025-02-10 06:09:28 start to pre check if it is supported to migrate to SLB\n2025-02-10 06:09:28 related nameservices: [sopstest1-hlb-igtm]\n2025-02-10 06:09:28 start to get sherlock link to show traffic\n2025-02-10 06:09:28 Sherlock Metrics Link: https://console.sherlock.io/d/c9e28bad-4ab6-4491-9e85-5fe67be1b4b9/hlb2slb-migration?orgId=1\u0026refresh=30s\u0026var-hlb_ip=10.148.18.187\u0026var-slb_ip=\n\n\n\n",
                    "MetaData": "",
                    "CreatedAt": "2025-02-10T06:09:27.043Z",
                    "RunningAt": null,
                    "DoneAt": "2025-02-10T06:09:28.778Z"
                },
                {
                    "TaskID": "205fe828-b096-451c-b11b-d031d002e0f5",
                    "ID": 2,
                    "Name": "Backup",
                    "State": "done",
                    "StageData": "",
                    "Info": "",
                    "Log": "2025-02-10 06:09:28 Start to run backup stage in ap migration task.\n2025-02-10 06:09:28 Start to backup ap\n2025-02-10 06:09:29 Backed up AP to DB successfully!\n2025-02-10 06:09:29 Start to backup nameservice\n2025-02-10 06:09:29 Nameservice backed up to DB successfully!\n\n\n\n",
                    "MetaData": "",
                    "CreatedAt": "2025-02-10T06:09:27.062Z",
                    "RunningAt": null,
                    "DoneAt": "2025-02-10T06:09:29.468Z"
                },
                {
                    "TaskID": "205fe828-b096-451c-b11b-d031d002e0f5",
                    "ID": 3,
                    "Name": "CreateChange",
                    "State": "done",
                    "StageData": "",
                    "Info": "{\"type\":\"instant\",\"value\":\"CR: CHG44975862\"}",
                    "Log": "",
                    "MetaData": "",
                    "CreatedAt": "2025-02-10T06:09:27.08Z",
                    "RunningAt": null,
                    "DoneAt": "2025-02-10T06:09:35.593Z"
                }
            ]
        },
        {
            "TaskID": "205fe828-b096-451c-b11b-d031d002e0f5",
            "ID": 2,
            "Name": "Create SLB AP",
            "State": "ready",
            "StageData": "",
            "Info": "",
            "Log": "",
            "MetaData": "",
            "CreatedAt": "2025-02-10T06:27:19.431753123Z",
            "RunningAt": null,
            "DoneAt": null,
            "SubStages": [
                {
                    "TaskID": "205fe828-b096-451c-b11b-d031d002e0f5",
                    "ID": 4,
                    "Name": "RequestQuota",
                    "State": "done",
                    "StageData": "",
                    "Info": "",
                    "Log": "2025-02-10 06:09:48 RequestQuota stage started\n2025-02-10 06:10:41 RequestQuota stage done\n\n\n\n",
                    "MetaData": "",
                    "CreatedAt": "2025-02-10T06:09:27.099Z",
                    "RunningAt": null,
                    "DoneAt": "2025-02-10T06:10:41.118Z"
                },
                {
                    "TaskID": "205fe828-b096-451c-b11b-d031d002e0f5",
                    "ID": 5,
                    "Name": "CreateAP",
                    "State": "ready",
                    "StageData": "",
                    "Info": "",
                    "Log": "",
                    "MetaData": "",
                    "CreatedAt": "2025-02-10T06:09:27.117Z",
                    "RunningAt": null,
                    "DoneAt": null
                }
            ]
        },
        {
            "TaskID": "205fe828-b096-451c-b11b-d031d002e0f5",
            "ID": 3,
            "Name": "PreMigrate",
            "State": "ready",
            "StageData": "",
            "Info": "",
            "Log": "",
            "MetaData": "",
            "CreatedAt": "2025-02-10T06:27:19.431770561Z",
            "RunningAt": null,
            "DoneAt": null,
            "SubStages": [
                {
                    "TaskID": "205fe828-b096-451c-b11b-d031d002e0f5",
                    "ID": 6,
                    "Name": "CheckFirewall",
                    "State": "ready",
                    "StageData": "",
                    "Info": "",
                    "Log": "",
                    "MetaData": "",
                    "CreatedAt": "2025-02-10T06:09:27.135Z",
                    "RunningAt": null,
                    "DoneAt": null
                },
                {
                    "TaskID": "205fe828-b096-451c-b11b-d031d002e0f5",
                    "ID": 7,
                    "Name": "CheckPort",
                    "State": "ready",
                    "StageData": "",
                    "Info": "",
                    "Log": "",
                    "MetaData": "",
                    "CreatedAt": "2025-02-10T06:09:27.154Z",
                    "RunningAt": null,
                    "DoneAt": null
                },
                {
                    "TaskID": "205fe828-b096-451c-b11b-d031d002e0f5",
                    "ID": 8,
                    "Name": "CreateHM",
                    "State": "ready",
                    "StageData": "",
                    "Info": "",
                    "Log": "",
                    "MetaData": "",
                    "CreatedAt": "2025-02-10T06:09:27.172Z",
                    "RunningAt": null,
                    "DoneAt": null
                }
            ]
        },
        {
            "TaskID": "205fe828-b096-451c-b11b-d031d002e0f5",
            "ID": 9,
            "Name": "Migrate",
            "State": "ready",
            "StageData": "",
            "Info": "",
            "Log": "",
            "MetaData": "",
            "CreatedAt": "2025-02-10T06:09:27.191Z",
            "RunningAt": null,
            "DoneAt": null,
            "SubStages": null
        },
        {
            "TaskID": "205fe828-b096-451c-b11b-d031d002e0f5",
            "ID": 10,
            "Name": "PostMigrate",
            "State": "ready",
            "StageData": "",
            "Info": "",
            "Log": "",
            "MetaData": "",
            "CreatedAt": "2025-02-10T06:09:27.209Z",
            "RunningAt": null,
            "DoneAt": null,
            "SubStages": null
        }
    ],
    "CurrentStage": 5
}
https://tessvipmigui.muse.qa.ebay.com/object/migrate/hlbeol/accesspoints/sopstest1-dev/sopstest1-hlb
https://local.cloud.ebay.com:3030/object/migrate/hlbeol/accesspoints/luczhang-dev/luczhang-hlb
---
### 3.3
TODO
- app-dashboard/History Table的筛选 owner strategy state
- app-dashboard/resourceTable的To cloud console变成单独一列，给个按钮
- 分步表单
LEARN
- label， value在前端自己的业务也要区分好，避免改需求改字段，牵一发动全身
## 3.4
TODO
- 名字： ap->v3✅
- button View连续点会显示卡顿✅
- rollback前先pst cancel✅      
- 子任务只有一个的时候不显示点击子任务    =>问题不存在
- task/taskDetail进入后刷新TOKEN ✅
- 修改handleMigrate的type错误 ✅
- page/taskDeatil已经是rollback不显示rollback按钮  => 等待后端
## 3.5
TODO
- 时间展示处理成UTC时间
- 分步表单
	- 设置isLoading为true，根据selected的type和Name筛选precheck的item并展示他的CheckErrors
	- 如果非error右下角next按钮，error则给个图标，onClick=>重新发起preCheck
LEARN
- 通过柯里化的时间处理函数在antd上学习到适配器设计模式的应用
## 3.6
TODO
- ![[Pasted image 20250306095049.png]]去掉无用的分页器=>✅
- 根据isrollback判断是否展示rollback，cancel按钮=>✅
- 分步表单样式
	- ![[Pasted image 20250306111227.png]]
	- ![[Pasted image 20250306144540.png]]
	- ![[Pasted image 20250306155454.png]]
- a标签解析成HTML而不是文本 =>✅
- retry后get一下，Processing按钮loading时闪 => ✅
- ![[Pasted image 20250306220349.png]]
## 3.7
TODO
- precheck失败的弹窗给个retry的icon， 发送retry
- taskDetail中precessing的'抽动'UI异常 ✅
LEARN
- React.memo组件缓存函数组件避免重复渲染导致Button的isLoading从1->0的抽动
## 3.10
TODO
- dashboard三个主表 Can filter NameSpace, Context, Status ✅
- New AP Name in [task](https://tessvipmigui.muse.qa.ebay.com/object/migrate/task/0d29b6a4-50e1-4034-8bc7-d886dde7b043) -> AccessPoint ✅
- 错误情况下的retry ✅
- Modal第二步的提交加两个Checkbox
    - Latency may increase for cross-colo traffic during migration. (for AP and TFAP)
    - Request and response header size will increase post-migration. (for Service)
- taskDashboard中rollback的strategy移除rollback的按钮. =>✅
- Precheck error message - start with upper case 大写字母开头 ✅
- nameService 返回值不符预期？
## 3.11
- 修复旧的serviceMigrate
- 修复Nameservice
## 3.12
- 修复retry后precheck数据格式不适配
- 老页面点inplace/delete/disable不发送strategyspecifics&打开新页面
## 3.13
- Task Submission Checkbox
    - Latency may increase for cross-colo traffic during migration. (for AP and TFAP)
    - Request and response header size will increase post-migration. (for Service)
- precheck retry后的正常情况测试 ？
## 3.14
LEARN
- 当我渲染从后端传来的包含HTML的文本时，在JSX中使用
	```HTML
	<div

	style={{ padding: '4px 24px' }}

	dangerouslySetInnerHTML={{ __html: capitalizeFirstLetter(item.reason) }}

	/>
	```
	而这个属性命名为“危险的”是因为他绕过了React内置的HTML转义，直接将原始HTML插入dom，存在XSS(跨站脚本攻击风险)
	而React内部转义机制如何防范XSS攻击呢？ 当使用{}这些JSX语法时，React会自动转换HTML特殊字符：< 变成 &lt;> 变成 &gt;& 变成 &amp; 所有即使有恶意注入script标签，也会被当做纯文本显示而不会被执行
## 3.17
TODO
- 提示warning框，悬浮来看
- 初次进入app-dashboard时token没有获取到导致network fail？
- 加一个tab dev/prod 点击后 发不同的host
## 3.20
TODO
- ![[Pasted image 20250320100233.png]]
- utils的监听token改变的高阶函数
- rollback的处理 application参数和跳转正常与否
LEARN
**Token**
监听token时，window.addEventListener的storage事件只会在同源的其他窗口改变才能捕获到。也就是说a页面的窗口token改变a页面不会触发相应的eventListener
较为通用的解决方案是axios请求拦截器？
## 3.25
TODO
- 修复每输入一个字符，输入框就失去对焦的问题
- merge Prod和Dev页面
LEARN
- 通过配置axios请求拦截器实现Dev和Prod前置API的控制切换