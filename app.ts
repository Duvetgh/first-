// app.ts 全局应用配置与状态
App({
  globalData: {
    defaultEngine: 'auto',
    recentAnalyses: [] as any[]
  },
  onLaunch() {
    // 读取本地存储的默认配置
    const savedEngine = wx.getStorageSync('defaultEngine');
    if (savedEngine) {
      this.globalData.defaultEngine = savedEngine;
    }
    const history = wx.getStorageSync('recentAnalyses');
    if (history) {
      this.globalData.recentAnalyses = history;
    }
  }
});
