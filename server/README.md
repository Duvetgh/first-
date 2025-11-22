# 雅欣科研助手后端（Mock）

## 启动
```bash
cd server
npm install
npm run start
```
默认监听 `http://localhost:3000`。

## 接口
- `POST /api/analyze`
  - 入参：experimentType, engine, data, meta
  - 出参：stats, outliers, chartData, modelSummary, suggestions

大模型调用使用 mock，可在 `services/modelEngine.js` 中替换真实 API。
