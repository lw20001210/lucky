<template>
	<view class="container">
		<Header :obj="headObj"></Header>
		<view class="list">
			<view class="content" @click="editInfo()">
				<view class="describe">
					备注
				</view>
				<view class="detail iconfont">
					<view class="default">
						{{infoDate.remarked}}
					</view>
					<text>&#xe612</text>
				</view>
			</view>
			<view class="content">
				<view class="describe">
					账号
				</view>
				<view class="detail iconfont">
					<view class="default">
						{{infoDate.username}}
					</view>
					<text>&#xe612</text>
				</view>
			</view>
			<view class="content">
				<view class="describe">
					签名
				</view>
				<view class="detail iconfont">
					<view class="default">
						{{infoDate.signature}}
					</view>
					<text>&#xe612</text>
				</view>
			</view>
		</view>
	</view>
	<view class="divide">
	</view>
	<view class="two">
		<view class="list">
			<view class="content">
				<view class="describe">
					性别
				</view>
				<view class="detail iconfont">
					<view class="default">
						{{formatSex}}
					</view>
					<text>&#xe612</text>
				</view>
			</view>
			<view class="content">
				<view class="describe">
					生日
				</view>
				<view class="detail iconfont">
					<view class="default">
						{{initBirthday}}
					</view>
					<text>&#xe612</text>
				</view>
			</view>
			<view class="content">
				<view class="describe">
					电话
				</view>
				<view class="detail iconfont">
					<view class="default">
						{{initTelephone}}
					</view>
					<text>&#xe612</text>
				</view>
			</view>
			<view class="content">
				<view class="describe">
					邮箱
				</view>
				<view class="detail iconfont">
					<view class="default">
						{{initEmail}}
					</view>
					<text>&#xe612</text>
				</view>
			</view>
		</view>
	</view>
	<view class="divide">
	</view>
	<view class="two">
		<view class="list">
			<view class="remove">
				<text @click="removeUser">删除</text>
			</view>
		</view>
	</view>
	<!-- 输入框示例 -->
	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog ref="inputClose" mode="input" :value="infoDate.remarked" title="请输入新的备注" placeholder="备注"
			@confirm="dialogInputConfirm"></uni-popup-dialog>
	</uni-popup>
	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog type="warn" cancelText="取消" confirmText="确定" title="" content="确定删除该好友吗?"
			@confirm="confirmDelete"></uni-popup-dialog>
	</uni-popup>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue';
	import Header from "@/component/header.vue";
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import request from "@/utils/request.js";
	import {
		userStore
	} from "@/pinia/userInfo/userInfo.js"
	import {
		storeToRefs
	} from 'pinia';
	const powerStore = userStore()
	let {
		id
	} = storeToRefs(powerStore)
	let keyId = ref(0); //
	let infoDate = ref({})
	// 传递给header组件的数据
	let headObj = ref({
		leftFont: 'icon-zuojiantou',
		title: '好友详情',
		path: `/pages/detail/detail?id=${keyId.value}`
	})

	import {
		showMsg
	} from '@/utils/Toast.js'

	async function getData(userId, friend) {
		let {
			data: res
		} = await request("/user/getFriendInfo", "get", {
			myId: userId,
			friendId: parseInt(friend)
		})
		if (res.code == 200) {
			// console.log(res.data, 111);
			infoDate.value = res.data
		} else {
			showMsg("获取数据失败")
		}
	}
	onLoad((option) => {
		// console.log(option);
		keyId.value = option.id
		getData(id.value, option.id)
	})
	const formatSex = computed(() => {
		return infoDate.value.sex == 0 ? '女' : '男'
	})
	const initBirthday = computed(() => {
		if (infoDate.value.birthday == "") {
			return "未设置"
		} else {
			return infoDate.value.birthday
		}
	});
	const initTelephone = computed(() => {
		if (infoDate.value.birthday == "") {
			return "未设置"
		} else {
			return infoDate.value.phone
		}
	});
	const initEmail = computed(() => {
		if (infoDate.value.email == "") {
			return "未设置"
		} else {
			return infoDate.value.email
		}
	});
	// 通过弹出框更新用户信息
	let info = ref(); //编辑信息popup-dialog提示1信息
	// 一个计算属性 ,默认显示的提示信息
	// 编辑框的实例对象
	let inputDialog = ref();
	let alertDialog = ref();

	function editInfo() {
		inputDialog.value.open()
	}
	async function dialogInputConfirm(val) {
		if (val == '') {
			showMsg("备注不能为空", 1500)
		} else {
			let {
				data: res
			} = await request("/user/updateFriendName", "put", {
				myId: id.value,
				friendId: keyId.value,
				remark: val
			})
			if (res.code != 200) return showMsg("更新失败")
			getData(id.value, keyId.value)
			showMsg("更新成功", 1500, "success")
		}
	}
	
	function removeUser() {
		alertDialog.value.open();

	}
	// 删除好友
	async function confirmDelete() {
		console.log(id.value, keyId.value);
		let {
			data: res
		} = await request("/user/removeFriend", "delete", {
			myId: id.value,
			friendId: keyId.value,
		})
		if (res.code != 200) return false;
		showMsg(res.msg, 2000, "loading")
		setTimeout(()=>{
			uni.switchTab({
				url: '/pages/home/home'
			});
		})

		console.log(res);
	}
</script>

<style scoped lang="scss">
	.container {
		padding: 20rpx 20rpx 0;
		font-family: STKaiti;
	}

	.list {
		margin: 10rpx 5px 0;
	}

	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 25rpx 0;
		height: 84rpx;

		.describe {
			width: 250rpx;
		}

		.detail {
			width: 500rpx;
			display: flex;
			justify-content: flex-end;
			font-size: 50rpx;
			align-items: center;
			color: #000;

			.photograph {
				width: 100rpx;
				height: 100rpx;
				border: 1px solid rgb(238, 238, 238);
				text-align: center;
				padding-left: 6rpx;
				line-height: 100rpx;
				border-radius: 50%;
			}

			.default {

				text-align: left;
				font-size: 31rpx;
				color: #7B7B7B;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

		:deep(.file-picker__progress) {
			display: none !important;
		}

		.special {
			display: flex;
			justify-content: flex-end;
			font-size: 50rpx;
			align-items: center;
			color: #000;
			width: 150rpx;

			:deep(.uni-file-picker__container[data-v-bdfc07e0]) {
				justify-content: flex-end !important;
			}
		}

	}

	.divide {
		height: 15rpx;
		background-color: #f2f2f2;
	}

	.two {
		padding: 0 20rpx;

		.remove {
			text-align: center;
			color: red;
			padding: 20rpx;
		}
	}

	.fixed {
		box-sizing: border-box;
	}
</style>