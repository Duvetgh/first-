// 大模型调用入口，当前使用 mock，未来可替换为真实 API
export async function callModelEngine(engine, payload) {
  const prompt = buildPrompt(payload);
  switch (engine) {
    case 'deepseek':
      return callDeepSeek(prompt);
    case 'kimi':
      return callKimi(prompt);
    default:
      return mockSummary(prompt);
  }
}

export async function callDeepSeek(prompt) {
  // TODO: 替换为真实 DeepSeek API
  // 示例：fetch('https://api.deepseek.com/v1/chat', { headers: { Authorization: 'Bearer <API_KEY>' } })
  return Promise.resolve(`【Mock】DeepSeek 总结：根据数据，均值与离群点已标记。提示：${prompt.slice(0, 60)}...`);
}

export async function callKimi(prompt) {
  // TODO: 替换为真实 Kimi API
  return Promise.resolve(`【Mock】Kimi 分析：数据总体趋势平稳，异常点需复核。提示：${prompt.slice(0, 60)}...`);
}

async function mockSummary(prompt) {
  return Promise.resolve(`自动总结：检测到 ${payloadCount(prompt)} 条数据，已计算基础统计并标记异常。`);
}

function buildPrompt({ experimentType, stats, outliers, meta }) {
  return `实验类型: ${experimentType}\n统计: ${JSON.stringify(stats)}\n异常: ${JSON.stringify(outliers)}\n元信息: ${JSON.stringify(meta)}`;
}

function payloadCount(text) {
  return Math.max(1, Math.round(text.length / 40));
}
