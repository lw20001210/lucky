<template>
	<view class="">
		<statusBar></statusBar>
		<view class="header">
			<view class="left" @click="goBack">
				<slot name="left"><text class="iconfont" :class="obj.leftFont"></text></slot>
			</view>
			<view class="center">
				<slot name="center">{{obj.title}}</slot>
			</view>
			<view class="right">
				<slot name="right">{{obj.rightFont}}</slot>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue';
	import {
		showMsg
	} from '@/utils/Toast.js'
	import statusBar from "@/component/statusBar.vue";
	const props = defineProps(['obj'])
	// console.log(props.obj);
	// 返回上一级

	//  || (page.$page.path=="/pagesfriendInfo/friendInfo")
	function goBack() {
		// let pages = getCurrentPages();
		// let currentPage = pages[pages.length - 1];//当前跳过来的路由
		// let prePage = pages[pages.length - 2];//上一个页面跳过来的路由
		// // console.log(currentPage);
		// // console.log(prePage);
		// console.log(currentPage.$page.fullPath, 1);
		// console.log(prePage.$page.fullPath, 2);
		// // console.log(prePage.$page.fullPath, 2);
		// if (prePage?.$page.path == "/pages/detail/detail") {
		// 	//	console.log(1);
		// 	let paths = prePage.$page.fullPath
		// 	uni.reLaunch({
		// 		url: paths
		// 	});
		// } else {
		// 	uni.reLaunch({
		// 		url: props.obj.path
		// 	});
		// }
		uni.navigateBack();
	}
</script>

<style scoped lang="scss">
	.header {
		font-family: STKaiti;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.center {
			width: 200rpx;
			text-align: center;
		}

		.iconfont {
			font-size: 50rpx;
		}
	}
</style>