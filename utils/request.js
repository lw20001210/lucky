  import {mainUrl} from "@/utils/config.js";
import {
  getLocal
} from "@/utils/local.js";
import {
  showMsg
} from '@/utils/Toast.js';
const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: mainUrl + url,
      method,
      data,
      timeout: 2000,
      header: {
        authorization: getLocal('token') ? getLocal('token') : ""
      },
      success: res => {
        resolve(res)
      },
      fail: (err) => {
        showMsg('请求失败');
        reject(err)
      },
      complete: () => {}
    });
  })
}
export default request