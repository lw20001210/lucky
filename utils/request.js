const BASE_URL = 'http://192.168.212.20:3000';
import {getLocal} from "@/utils/local.js";
import {
  showMsg
} from '@/utils/Toast.js';
const request = (url,method,data) => {
	return new Promise((resolve,reject) => {
		uni.request({
			url: BASE_URL + url,
			method,
			data,
			timeout:2000,
			header:{
				authorization: getLocal('token')? getLocal('token'):""
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