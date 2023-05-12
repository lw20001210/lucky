const BASE_URL = 'http://192.168.242.20:3000'
const request = (url,method,data) => {
	return new Promise((resolve,reject) => {
		uni.request({
			url: BASE_URL + url,
			method,
			data,
			timeout:3000,
			header:{
				authorization: uni.getStorageSync('userinfo').Token
			},
			success: res => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {}
		});
	})
}

export default request