<template>
	<view class="container">
		<Header :obj="data"></Header>
		<view class="itemContent">
			<view class="left">
				<view class="avatar">
					<image :src="userInfo.avatar"></image>
				</view>
				<view class="descript">
					<text>{{userInfo.nickname}}</text>
					<text>账号:{{userInfo.username}}</text>
				</view>
			</view>
		</view>
		<view class="descript">
			<text>填写验证信息</text>
			<textarea class="area" @blur="bindTextAreaBlur" auto-focus />
		</view>
		<view class="descript">
			<text>备注</text>
			<textarea class="area second" @blur="bindTextArea" />
		</view>
		<button class="btn" @click="sendApply" type="primary">发送</button>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import Header from "@/component/header.vue";
	import request from "@/utils/request.js"
	import {
		userStore
	} from "@/pinia/userInfo/userInfo.js"
	import {
		showMsg
	} from "@/utils/Toast.js"
	import {
		ref
	} from 'vue';
	let user = userStore()
	let data = ref({
		leftFont: "icon-zuojiantou",
		title: '添加好友',
		path: '/pages/search/search'
	})
	let userInfo = ref({}); //接受方信息
	// 通过id建立连接
	let applyInfo = ref({
		status: false,
		sendId: 0,
		acceptId: '',
		avatar:"",
		username:'',
		nickname: '', //备注
		content: '我是', //验证信息
		createTime: Date.now()
	});
	// 退出登录到登录页或自动填充账号
	onLoad(async (option) => {
		let {
			data: res
		} = await request('/user/userInfo', 'get', {
			username: option.username
		});
		if (res.code != 200) return showMsg()
		showMsg('加载中...', 500, 'loading')
		userInfo.value = res.data;
	})
	// 验证信息
	function bindTextAreaBlur(e) {
		// console.log(e.detail.value);
		applyInfo.value.content = e.detail.value;
	}
	// 备注
	function bindTextArea(e) {
		// console.log(e.detail.value)
		applyInfo.value.nickname = e.detail.value;
	}
// 发送申请
	async function sendApply() {
		applyInfo.value.sendId = user.id;
		applyInfo.value.username = user.nickname;
		applyInfo.value.avatar = user.avatar;
		applyInfo.value.acceptId = userInfo.value.id;	
		let {
			data: res
		} = await request('/user/sendApply', 'post', applyInfo.value);
		if (res.code != 200) return showMsg("发送失败")
		
		// 添加备注表
		// request("/user/addRemark","post",{
		// 	myId:user.id,
		// 	friendId:userInfo.value.id,
		// 	nickName:applyInfo.value.nickname
		// })
		showMsg(res.msg, 500, 'loading')
		uni.switchTab({
			url: '/pages/home/home'
		});
	}
</script>

<style scoped lang="less">
	.container {
		padding: 15rpx 20rpx 0;
		font-family: STKaiti;

		.itemContent {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 0;
			font-size: 26rpx;

			.left {
				display: flex;
				align-items: center;

				.avatar {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.descript {
					margin-left: 30rpx;
					display: flex;
					flex-direction: column;

					text:first-child {
						color: red;
					}
				}
			}


		}

		.descript {
			text {
				font-size: 27rpx;
				color: #939393;
			}

			.area {
				background-color: #f6f6f9;
				padding: 5rpx;
				width: 100%;
				height: 200rpx;
				border-radius: 10rpx;
			}

			.second {
				height: 100rpx;
			}
		}

		.btn {
			position: fixed;
			left: 15rpx;
			right: 15rpx;
			bottom: 40rpx;
		}
	}
</style>