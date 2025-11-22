// 统计与异常点检测
export function summarizeData(values = []) {
  if (!values.length) {
    return { mean: 0, std: 0, min: 0, max: 0, count: 0 };
  }
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / values.length;
  const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / values.length;
  const std = Math.sqrt(variance);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return { mean: round(mean), std: round(std), min: round(min), max: round(max), count: values.length };
}

export function detectOutliers(values = []) {
  if (values.length < 4) return [];
  const sorted = [...values].sort((a, b) => a - b);
  const q1 = quantile(sorted, 0.25);
  const q3 = quantile(sorted, 0.75);
  const iqr = q3 - q1;
  const lower = q1 - 1.5 * iqr;
  const upper = q3 + 1.5 * iqr;
  return values
    .map((v, index) => ({ v, index }))
    .filter(({ v }) => v < lower || v > upper)
    .map(({ v, index }) => ({ index, value: v, reason: v < lower ? '低于下界' : '高于上界' }));
}

export function buildChartData(rows = []) {
  // 简化图表数据结构，前端可直接接入 ECharts
  const categories = rows.map((_, i) => `样本${i + 1}`);
  const series = rows.map((row) => Number(Object.values(row || {})[0] || 0));
  return {
    xAxis: categories,
    series: [
      {
        name: '数值',
        type: 'bar',
        data: series
      }
    ]
  };
}

function quantile(arr, p) {
  const pos = (arr.length - 1) * p;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (arr[base + 1] !== undefined) {
    return arr[base] + rest * (arr[base + 1] - arr[base]);
  }
  return arr[base];
}

function round(num) {
  return Math.round(num * 100) / 100;
}
