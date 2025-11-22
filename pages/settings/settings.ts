Page({
  data: {
    engineOptions: ['auto', 'deepseek', 'kimi'],
    engineIndex: 0
  },
  onLoad() {
    const app = getApp();
    const defaultEngine = app.globalData.defaultEngine || 'auto';
    const idx = this.data.engineOptions.indexOf(defaultEngine);
    this.setData({ engineIndex: idx >= 0 ? idx : 0 });
  },
  onEngineChange(e: any) {
    const idx = Number(e.detail.value);
    const app = getApp();
    app.globalData.defaultEngine = this.data.engineOptions[idx];
    wx.setStorageSync('defaultEngine', this.data.engineOptions[idx]);
    this.setData({ engineIndex: idx });
    wx.showToast({ title: '已更新默认引擎', icon: 'success' });
  }
});
