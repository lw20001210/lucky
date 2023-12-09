<template>
	<view class="container">
		<!-- 自定义导航栏 -->
		<statusBar></statusBar>
		<view class="navBar">
			<view class="left">
				<view class="avatar" @click="goInfo">
					<image class='img' :src="userPower.avatar"></image>
				</view>
				<view class="header_title">
					<text class="header_logo">{{userPower.nickname}}</text>
				</view>
			</view>
			<view class="right"><text class="iconfont size" @click="openPopup">&#xe615</text>
			</view>
		</view>
		<!-- 下拉菜单 -->
		<view class="header_downup" @click="close" :animation="animationData">
			<view class="wrap">
				<view class="downup_item" @click="goSearch">
					<view class="iconfont">&#xe75c</view>
					<text>添加好友</text>
				</view>
				<view class="downup_item">
					<view class="iconfont">&#xe616</view>
					<text>创建群聊</text>
				</view>
				<view class="downup_item">
					<view class="iconfont">&#xe605</view>
					<text>创建小组</text>
				</view>
				<view class="downup_item" @click="scanCode">
					<view class="iconfont">&#xe8b5</view>
					<text>扫一扫</text>
				</view>
			</view>
		</view>
		<scroll-view class="scroll" scroll-y="true" :style="{height: wh+'px'}">
			<!-- 搜索区域 -->
			<view @click="goSearch">
				<uni-search-bar placeholder="搜索" :readonly="true"></uni-search-bar>
			</view>
			<uni-list :border="false">
				<!-- 显示圆形头像 -->
				<uni-list-chat v-for="item in friendList" :key="item.id" :avatar-circle="true" :title="item.remarked"
					:avatar="item.avatar" note="您收到一条新的消息" :time="item.createTime"></uni-list-chat>
			</uni-list>
		</scroll-view>
	</view>
</template>
<script setup>
	import {
		setLocal,
		getLocal
	} from '@/utils/local.js'
	import {
		ref,
		onMounted,
		watch,
		watchEffect
	} from 'vue';
	import statusBar from "@/component/statusBar.vue"
	import request from "@/utils/request.js"
	import friendItem from "@/component/friendItem.vue"
	import {
		userStore
	} from '@/pinia/userInfo/userInfo.js';
	import loginVue from '../login/login.vue';
	import {
		onLoad,onShow
	} from '@dcloudio/uni-app';
	let animationData = ref({}) //响应动画数据
	let animation = ref(null); //创建动画对象
	let isShow = ref(false); //判断下拉框
	const userPower = new userStore();
	// 打开菜单
	function openPopup() {
		if (!animation.value) {
			animation.value = uni.createAnimation({
				duration: 200,
				transformOrigin: 'top right',
				timingFunction: 'ease',
			});
		}
		const animationValue = animation.value;
		if (isShow.value) {
			animationValue.opacity(0).width(0).height(0).step();
			isShow.value = false;
		} else {
			animationValue.opacity(1).width('300rpx').height('428rpx').step();
			isShow.value = true;
		}
		animationData.value = animationValue.export();
	}
	// 关闭菜单
	function close() {
		if (!animation.value) return;
		animation.value.opacity(0).width(0).height(0).step();
		animationData.value = animation.value.export();
		isShow.value = false;
	}
	// 滚动栏的高度
	let wh = ref()

	function getHeight() {
		const val = uni.getSystemInfoSync()
		// 要减去tabbar的高度和搜索栏的高度
		wh.value = val.windowHeight - 80
	}
	onMounted(() => {
		getHeight();
	})

	function goInfo() {
		uni.navigateTo({
			url: `/pages/detail/detail?id=${userPower.id}`
		})
	}
	const goSearch = () => {
		uni.navigateTo({
			url: '/pages/search/search',
		});
	}

	// 扫码加好友功能
	function scanCode() {
		console.log(1);
		uni.scanCode({
			success: function(res) {
				// console.log('条码类型：' + res.scanType);
				console.log('条码内容：' + res.result);
				uni.navigateTo({
					url: `/pages/addFriend/addFriend?username=${res.result}`
				});
			}
		});
	}
	let friendList = ref(['0'])
	async function getData() {
		let {
			data: res
		} = await request("/user/getFriendList", "get", {
			id: userPower.id
		})
		if (res.code != 200) return showMsg("获取数据失败")
		friendList.value = res.data;
		friendList.value.forEach(item => {
			if (item.id == userPower.id) {
				item["remarked"] = item.nickname
			}
		})
	}
	onLoad(() => {
		userPower.getUserInfo();
		getData();
	})
	onShow(() => {
		getData();
	})
</script>
<style scoped lang="scss">
	.container {
		box-sizing: border-box;
		margin: 0 30rpx;
		padding-top: 20rpx;
		height: 100%;

		image {
			will-change: transform
		}

		.navBar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
		}

		.left {
			display: flex;
			align-items: center;
			margin-left: 9rpx;

			.avatar {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				overflow: hidden;

				.img {
					width: 100%;
					height: 100%;
				}
			}

			.header_title {
				padding-left: 10rpx;

				.header_logo {
					font-size: 25rpx;
					font-weight: normal;
					font-stretch: normal;
					color: #707070;
					font-family: STKaiti;
				}
			}
		}

		.size {
			font-size: 40rpx;
		}

		.header_downup {
			position: absolute;
			top: 150rpx;
			right: 21rpx;
			z-index: 99;
			background-color: #fff;
			text-align: left;
			padding-left: 40rpx;
			box-sizing: border-box;
			background-color: rgba(76, 76, 76);
			width: 0;
			height: 0;
			opacity: 0;
			// width: 300rpx;
			// height: 428rpx;
			// opacity: 1;
			border-radius: 20rpx;
			box-shadow: 10rpx 10rpx 40rpx #ccc;
			overflow: hidden;

			.wrap {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}

			.downup_item {
				display: flex;
				align-items: center;
				font-family: '华文楷体';
				font-size: 32rpx;
				font-weight: normal;
				color: #fff;
				text-overflow: ellipsis;
				white-space: nowrap;

				view {
					font-size: 42rpx;
				}

				text {
					margin-left: 10rpx;
				}
			}
		}

		.scroll {
			margin-top: 10rpx;
			overflow: hidden;
			padding: 0;
		}
	}
</style>