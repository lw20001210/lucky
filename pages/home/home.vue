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
				<view class="downup_item" @click="goCreateGroup">
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
				<uni-list-chat :clickable="true" v-for="(item,index) in friendList" :key="index" :avatar-circle="true"
					:title="item.adminId?item.nickname:item.remarked"
					:avatar="item.adminId?(item.avatar?item.avatar:'../../static/images/groupAvatar.jpg'):item.avatar"
					@click="goChat(item)" :note="item.message?item.message:item.intro" :time="item.createTime"
					:showBadge="true" :badge-text="item.adminId?'':item.total"></uni-list-chat>
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
		getTimeFormat
	} from "@/utils/format.js"
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
		statusStore
	} from "@/pinia/userInfo/status.js"
	import {
		userStore
	} from '@/pinia/userInfo/userInfo.js';
	import loginVue from '../login/login.vue';
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	import {
		mainUrl
	} from "@/utils/config.js"
	import io from '@hyoga/uni-socket.io';
	let animationData = ref({}) //响应动画数据
	let animation = ref(null); //创建动画对象
	let isShow = ref(false); //判断下拉框
	let socket = ref(null); // 提前声明socket变量
	const userPower = new userStore();
	const statusInfo = statusStore();

	function goCreateGroup() {
		uni.navigateTo({
			url: '/pages/search/search?url=group',
		});
	}
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
		// #ifdef APP-PLUS
		wh.value = val.windowHeight - 82
		// #endif
		// #ifdef H5
		wh.value = val.windowHeight - 40;
		// #endif

	}
	onMounted(() => {
		getHeight();
	})

	function goInfo() {
		uni.navigateTo({
			url: `/pages/detail/detail?id=${userPower.id}`
		})
		close()
	}
	const goSearch = () => {
		uni.navigateTo({
			url: '/pages/search/search',
		});
		close()
	}

	function goChat(item) {
		if (item.adminId) {
			uni.navigateTo({
				url: `/pages/chat/chat?groupId=${item.id}&groupName=${item.nickname}`
			})
		} else {
			console.log(35356);
			statusInfo.avatar = item.avatar
			uni.navigateTo({
				url: `/pages/chat/chat?id=${item.id}&remarked=${item.remarked}`
			})
		}
		close()
	}
	// 扫码加好友功能
	function scanCode() {
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
	let friendList = ref([])
	// 获取消息列表数据
	async function getData() {
		// 私聊列表
		let {
			data: res
		} = await request("/user/getFriendList", "get", {
			id: userPower.id
		})
		if (res.code != 200) return showMsg("获取数据失败")
		res.data.forEach(item => {
			if (item.id == userPower.id) {
				item.createTime = getTimeFormat(Number(userPower.createTime))
				item["remarked"] = item.nickname
			}
		})
		let {
			// 获取朋友列表最新消息的状态
			data: otherData
		} = await request("/user/getFriendStatus", "get", {
			id: userPower.id
		})
		res.data.forEach(item => {
			item.total = 0
			otherData.data.total.forEach(val => {
				if (userPower.id == val.toUid) {
					if (item.id == val.fromUid) {
						item.total += 1
					}
				}
			})
		})
		let categorizedArr = {};
		//只留最后一条消息
		otherData.data.datas.forEach(item => {
			let key = item.fromUid < item.toUid ? `${item.fromUid}-${item.toUid}` :
				`${item.toUid}-${item.fromUid}`;
			categorizedArr[key] = item;
		});

		let result = Object.values(categorizedArr);
		res.data.forEach((item => {
			item.message = ''
			result.forEach(val => {
				if ((userPower.id == val.fromUid && item.id == val.toUid) || (userPower.id == val
						.toUid && item.id == val.fromUid)) {
					item.createTime = val.createTime
					if (val.type == 0) {
						item.message = val.message
					} else if (val.type == 1) {
						item.message = "图片"
					} else if (val.type == 2) {
						item.message = "语音"
					} else if (val.type == 3) {
						item.message = "位置"
					} else if (val.type == 4) {
						item.message = "视频"
					} else {
						item.message = ''
					}
				}
			})
		}))
		let {
			data: groups
		} = await request("/user/getGroupList", "get", {
			uid: userPower.id
		})
		groups.data.forEach(item => [
			groups.endMsgs.forEach(val => {
				if (item.id == val.groupId) {
					item.createTime = val.createTime
					if (val.type == 0) {
						item.message = val.message
					} else if (val.type == 1) {
						item.message = "图片"
					} else if (val.type == 2) {
						item.message = "语音"
					} else if (val.type == 3) {
						item.message = "位置"
					} else if (val.type == 4) {
						item.message = "视频"
					} else {
						item.message = ''
					}
				}
			})
		])
		res.data = [...res.data, ...groups.data];
		res.data.sort(function(a, b) {
			return b.createTime - a.createTime
		})
		console.log(res.data,777);
		// 处理私聊
		res.data.forEach(item => {
			result.forEach(val => {
				if (!item.adminId&&(userPower.id == val.fromUid && item.id == val.toUid) ||!item.adminId&& (userPower.id == val
						.toUid && item.id == val.fromUid)) {
					item.createTime = getTimeFormat(Number(val.createTime))
				}
			})
		})
		console.log(groups.endMsgs,999);
		// 处理群聊
		res.data.forEach(item=>{
			groups.endMsgs.forEach(val=>{
				if(item.adminId&&(item.id==val.groupId)){
					item.createTime= getTimeFormat(Number(item.createTime))
				}
			})
		})
		friendList.value = res.data;
	}
	

	function socketIo() {
		socket.value = io(mainUrl, {
			transports: ['websocket', 'polling'],
			timeout: 5000,
			query: {
				id: userPower.id
			},
		})
		statusInfo.socket = socket.value;
		socket.value.on("connect", () => {

		});
		// 接收在线的用户
		socket.value.on("init", (msg) => {
			statusInfo.userList = msg;
		});
	}
	onShow(() => {
		userPower.getUserInfo();
		getData();
		socketIo()
	})
	onLoad(() => {
		socketIo()
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