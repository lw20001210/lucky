<script>
	import {
		getLocal
	} from "@/utils/local.js";
	import {
		userStore
	} from '@/pinia/userInfo/userInfo.js';
	import {
		showMsg
	} from '@/utils/Toast.js';
	import request from "@/utils/request.js"
	export default {
		onLaunch: function(options) {
			// if (getLocal('login')) {
			//   console.log('防止手机上选择头像的时候触发下面代码直接进入到登录页');
			// } else if (getLocal('edits')) {
			//   console.log('防止更换手机头像的时候触发下面代码直接进入到登录页');
			// } else if (getLocal('token')) {
			if (getLocal('token')) {
				const userPower = new userStore();
				// 判断token是否过期
				request('/user/userInfo', 'get', {
						username: userPower.username
					})
					.then(response => {
						const res = response.data;
						// console.log(res);
						// 处理返回的数据
						if (res.code == '401') {
							return showMsg(res.msg)
						} else {
							uni.switchTab({
								url: '/pages/home/home'
							})
						}
					})
			} else {
				uni.redirectTo({
					url: "/pages/login/login",
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
			console.log('App Launch');
		},
		onShow: function(options) {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>
<style>
	/*每个页面公共css */
	@import '@/static/iconfont/font/iconfont.css';
	@import '@/static/css/touch.css';
	/* 引入iconfont */
	@import url('@/static/iconfont/iconfont.css');

	/* 这个高度我们得手动去掉，否则纵向滚动做不了，它会撑开盒子高度导致两个滚动条 */
	:deep(.uni-app--showtabbar uni-page-wrapper::after) {
		display: none !important;
		height: 0 !important;
	}

	/* 隐藏滚动条 */
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
		color: transparent;
	}
</style>