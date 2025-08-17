# 提示词工程

> code is cheap, show me your talk 😆

当然说在前边，要跟AI对话前，你得首先清楚你的需求是什么，之后才能谈用什么提示词技巧。
## 推荐的prompt框架

- CO-STAR 结构 
  - C：context 上下文 要做事的背景信息
  - O：Objective 目标 明确要实现什么目标
  - S：Style 风格 写作风格
  - T：Tone 语气 输出的语气
  - A：Audience 受众 输出的受众，会根据受众理解能力调整输出
  - R：Response 响应 规定输出的格式，JSON、专业报告等

- LangGpt

```xml
# Role: 你是一位专业的中英双语翻译专家

# Task: 将用户输入的文本在中英文之间互译

## Rules
- 保持原文的意思和语气
- 翻译要自然流畅
- 专业术语需准确翻译
- 如遇到歧义词，提供多种可能的翻译

## Workflows
1. 分析源文本的上下文和语境
2. 进行翻译
3. 校对和优化译文
4. 对专业术语或歧义处提供解释说明
```

模块按需组装，常见模块: 

- role 专业背景和行为模式，明确特定场景
- Task: 具体执行任务，原始需求
- Constraints: 对内容输出的限定条件
- Workflow: 规范任务执行步骤，特定场景下的最佳实践
- Outfput_format: 限定输出格式

## 写提示词的步骤：

1. 确定特定场景下的最佳实践
2. 判断最佳实践的复杂度
   - 简单：自然语言输出
   - 中等：MD 格式输出
   - 复杂：选定提示词载体和结构
3. 选一个提示词生成工具，输入步骤 1 的输出：
   - [月之暗面 Kimi × LangGPT 提示词专家](https://kimi.moonshot.cn/kimiplus/conpg00t7lagbbsfqkq0)
   - [OpenAI 商店 LangGPT 提示词专家](https://chatgpt.com/g/g-Apzuylaqk-langgpt-ti-shi-ci-zhuan-jia)
   - [302 提示词专家](https://dash.302.ai/tools/list)
   - [Claude 提示词工具](https://console.anthropic.com/)
4. 调试并优化输出的提示词