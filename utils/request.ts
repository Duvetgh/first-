// 封装请求，统一处理加载与错误
export function request<T = any>({ url, method = 'GET', data }: { url: string; method?: 'GET' | 'POST'; data?: any }) {
  return new Promise<T>((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header: { 'Content-Type': 'application/json' },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data as T);
        } else {
          reject(res);
        }
      },
      fail: reject
    });
  });
}

export const API_BASE = 'http://localhost:3000';
