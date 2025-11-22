import express from 'express';
import { summarizeData, detectOutliers, buildChartData } from '../services/statService.js';
import { callModelEngine } from '../services/modelEngine.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { data = [], experimentType = 'general', engine = 'auto', meta = {} } = req.body || {};
  // 基础统计
  const numericValues = Array.isArray(data)
    ? data
        .map((row) => Object.values(row || {}))
        .flat()
        .map(Number)
        .filter((v) => !Number.isNaN(v))
    : [];
  const stats = summarizeData(numericValues);
  const outliers = detectOutliers(numericValues);
  const chartData = buildChartData(data);

  // 模型调用（当前使用 mock，后续替换）
  const modelSummary = await callModelEngine(engine, {
    experimentType,
    stats,
    outliers,
    meta
  });

  res.json({
    id: req.body.mockId || `${Date.now()}`,
    stats,
    outliers,
    chartData,
    modelSummary,
    suggestions: [
      '建议复核异常点的原始记录，确认是否存在操作误差。',
      '可增加重复实验数量，提高统计可靠性。'
    ],
    meta: {
      ...meta,
      experimentType
    }
  });
});

export default router;
