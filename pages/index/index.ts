import { formatDateTime, truncate } from '../../utils/format';

Page({
  data: {
    recentList: [] as any[]
  },
  onShow() {
    // 读取最近分析记录
    const history = wx.getStorageSync('recentAnalyses') || [];
    const mapped = history.slice(0, 5).map((item: any) => ({
      ...item,
      timeText: formatDateTime(item.createdAt),
      summaryShort: truncate(item.summaryShort || item.summary || '')
    }));
    this.setData({ recentList: mapped });
  },
  goSelect() {
    wx.navigateTo({ url: '/pages/experiment/select/select' });
  },
  goInput() {
    wx.navigateTo({ url: '/pages/experiment/input/input' });
  },
  goDetail(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/experiment/result/result?id=${id}` });
  }
});
