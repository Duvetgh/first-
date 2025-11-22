import { formatDateTime, truncate } from '../../utils/format';

Page({
  data: {
    filtered: [] as any[]
  },
  onShow() {
    const history = wx.getStorageSync('recentAnalyses') || [];
    const mapped = history.map((item: any) => ({
      ...item,
      timeText: formatDateTime(item.createdAt),
      summaryShort: truncate(item.summaryShort || '')
    }));
    this.setData({ filtered: mapped });
  },
  goDetail(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/experiment/result/result?id=${id}` });
  }
});
