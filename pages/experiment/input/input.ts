import { findTemplate } from '../../../config/experimentTemplates';
import { API_BASE, request } from '../../../utils/request';

Page({
  data: {
    experimentType: '',
    currentTemplate: {} as any,
    rows: [] as any[],
    meta: {
      experimentName: '',
      date: '',
      operator: '',
      note: ''
    },
    engineOptions: ['auto', 'deepseek', 'kimi'],
    engineIndex: 0,
    preprocess: {
      dropNull: true,
      normalize: false
    },
    loading: false
  },
  onLoad(query: any) {
    const { experimentType } = query;
    if (experimentType) {
      this.setTemplate(experimentType);
    }
    const app = getApp();
    const defaultEngine = app.globalData.defaultEngine || 'auto';
    const idx = this.data.engineOptions.indexOf(defaultEngine);
    if (idx >= 0) {
      this.setData({ engineIndex: idx });
    }
  },
  setTemplate(type: string) {
    const tpl = findTemplate(type);
    this.setData({ experimentType: type, currentTemplate: tpl || {} });
  },
  onRowsChange(e: any) {
    this.setData({ rows: e.detail });
  },
  onMetaInput(e: any) {
    const key = e.currentTarget.dataset.key;
    this.setData({ meta: { ...this.data.meta, [key]: e.detail.value } });
  },
  onEngineChange(e: any) {
    this.setData({ engineIndex: Number(e.detail.value) });
  },
  toggleDropNull(e: any) {
    this.setData({ preprocess: { ...this.data.preprocess, dropNull: e.detail.value.length > 0 } });
  },
  toggleNormalize(e: any) {
    this.setData({ preprocess: { ...this.data.preprocess, normalize: e.detail.value.length > 0 } });
  },
  previewData() {
    wx.showModal({
      title: '数据预览',
      content: JSON.stringify(this.data.rows).slice(0, 500) || '暂无数据',
      showCancel: false
    });
  },
  async analyze() {
    if (!this.data.meta.experimentName) {
      wx.showToast({ title: '请填写实验名称', icon: 'none' });
      return;
    }
    this.setData({ loading: true });
    const engine = this.data.engineOptions[this.data.engineIndex];
    try {
      const res = await request<{ id: string } & any>({
        url: `${API_BASE}/api/analyze`,
        method: 'POST',
        data: {
          experimentType: this.data.experimentType,
          engine,
          data: this.data.rows,
          meta: this.data.meta,
          preprocess: this.data.preprocess
        }
      });
      // 将摘要保存到本地历史
      const history = wx.getStorageSync('recentAnalyses') || [];
      const record = {
        id: res.id || `${Date.now()}`,
        experimentName: this.data.meta.experimentName,
        experimentType: this.data.experimentType,
        createdAt: Date.now(),
        engine,
        summaryShort: res.modelSummary || ''
      };
      wx.setStorageSync('recentAnalyses', [record, ...history].slice(0, 20));
      wx.navigateTo({ url: `/pages/experiment/result/result?id=${record.id}&engine=${engine}` });
    } catch (err) {
      wx.showToast({ title: '分析失败，请稍后重试', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  }
});
