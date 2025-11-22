import { experimentTemplates } from '../../../config/experimentTemplates';

Page({
  data: {
    templates: experimentTemplates
  },
  goInput(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/experiment/input/input?experimentType=${id}` });
  }
});
