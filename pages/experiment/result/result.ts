import { API_BASE, request } from '../../../utils/request';
import { truncate } from '../../../utils/format';

Page({
  data: {
    id: '',
    engine: '',
    stats: {} as any,
    outliers: [] as any[],
    chartData: {} as any,
    modelSummary: '',
    suggestions: [] as string[],
    meta: {} as any,
    loading: true,
    error: ''
  },
  onLoad(query: any) {
    const { id, engine } = query;
    this.setData({ id, engine });
    this.fetchResult();
  },
  async fetchResult() {
    this.setData({ loading: true, error: '' });
    try {
      const res = await request<any>({ url: `${API_BASE}/api/analyze`, method: 'POST', data: { mockId: this.data.id } });
      // 映射接口数据到 UI
      this.setData({
        stats: res.stats,
        outliers: res.outliers,
        chartData: res.chartData,
        modelSummary: res.modelSummary,
        suggestions: res.suggestions || [],
        meta: res.meta || {},
        loading: false
      });
      // 更新本地历史，补充摘要信息
      const history = wx.getStorageSync('recentAnalyses') || [];
      const updated = history.map((item: any) =>
        item.id === this.data.id ? { ...item, summaryShort: truncate(res.modelSummary || '') } : item
      );
      wx.setStorageSync('recentAnalyses', updated);
    } catch (err) {
      this.setData({ error: '分析失败，请稍后重试或检查网络。', loading: false });
    }
  },
  reload() {
    this.fetchResult();
  },
  goBack() {
    wx.navigateBack();
  },
  save() {
    wx.showToast({ title: '已保存到历史', icon: 'success' });
  }
});
