<template>
	<view class="container">
		<web-view src="https://www.iqiyi.com/" :webview-styles="webviewStyles" :fullscreen="true"></web-view>
	</view>
</template>
<script setup>
	import {
		ref,
		onMounted
	} from "vue"
	let webviewStyles = ref({
		height: 500
	})
	onMounted(async () => {
		let height = 0;
		let statusbar = 0;
		// 使用 async/await 来获取系统信息
		const sysinfo = await uni.getSystemInfo();
		statusbar = sysinfo.statusBarHeight;
		height = sysinfo.windowHeight;
		//获取webview
		let pages = getCurrentPages();
		let page = pages[pages.length - 1];
		let currentWebview = page.$getAppWebview();
		setTimeout(function() {
			var wv = currentWebview.children()[0];
			wv.setStyle({ //设置web-view距离顶部的距离以及自己的高度，单位为px
				top: statusbar, //此处是距离顶部的高度，应该是你页面的头部
				height: height - statusbar, //webview的高度
			})
			// webviewStyles.value.height=300
		}, 200); //如页面初始化调用需要写延迟
	});
</script>

<style scoped lang="scss">
</style>