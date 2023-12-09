<template>
	<view class="container">
		<statusBar></statusBar>
		<uni-search-bar :focus="true" v-model="searchValue" @input="input" @cancel="cancel">
		</uni-search-bar>
		<view class="itemList" v-if="userList.length!=0">
			<view class="title">
				<view class="active">联系人</view>
				<view class="fixed" @click="showMore"><text>更多 </text>
					<text class="iconfont size">&#xe612</text>
				</view>
			</view>
			<view class="content">
				<view class="itemContent" v-for="item in moreContent">
					<view class="left">
						<view class="avatar">
							<image mode="aspectFill" :src="item.avatar"></image>
						</view>
						<view class="descript">
							<text>{{item.nickname}}</text>
							<text>账号:{{item.username}}</text>
						</view>
					</view>
					<view class="right" @click="apply(item)">
						{{formatContent(item)}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script setup>
	import statusBar from '@/component/statusBar.vue'
	import request from "@/utils/request.js"
	import {
		userStore
	} from "@/pinia/userInfo/userInfo.js"
	import {
		showMsg
	} from "@/utils/Toast.js"
	import {
		ref,
		computed
	} from 'vue'
	const userPower = new userStore();
	import {
		storeToRefs
	} from 'pinia';
	const {
		id
	} = storeToRefs(userPower);
	let searchValue = ref()
	let userList = ref([])
	let flag = ref(false);
	import {
		onLoad
	} from "@dcloudio/uni-app";
	onLoad((option) => {
		// 获取好友申请列表信息
		getApplyList();
	})
	let idList = ref([]); //判断是否是添加还少发信息
	// 获取申请列表数据
	async function getApplyList() {
	let {
		data: res
	} = await request("/user/getFriendList", "get", {
		id:id.value
	})
		if (res.code != 200 || res.code == 404) return false;
		idList.value = res.data.map(item => {
			return item.id
		})
		// console.log(idList.value);
		// console.log(res.data);
	}
	const moreContent = computed(() => {
		return flag.value ? userList.value : userList.value.filter((item, i) => {
			return i < 3
		})
	})
	async function input(inputUser) {
		if (inputUser == '') {
			userList.value = []
		} else {
			let {
				data: res
			} = await request('/user/searchAllUser', 'get')
			if (res.code != 200) return showMsg()
			userList.value = res.data.filter(item => {
				return item.username.includes(inputUser) && id.value != item.id
			})
			if (userList.value.length == 0) {
				showMsg("暂无更多搜索结果", 2000, 'loading')
			} else {
				showMsg('加载中...', 500, 'loading')
			}
		}
	}

	function cancel(res) {
		uni.switchTab({
			url: '/pages/home/home'
		});
	}

	function formatContent(item) {
		if (Object.values(idList.value).includes(item.id)) {
			return "发信息"
		} else {
			return "加好友"

		}
	}
	// 是否展示更多
	function showMore() {
		flag.value = true;
	}
	//进入申请页面
	function apply(item) {
		uni.navigateTo({
			url: `/pages/addFriend/addFriend?username=${item.username}`
		});
	}
</script>

<style scoped lang="less">
	.container {
		margin-left: 15rpx;
		margin-right: 15rpx;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 25rpx;
			padding-bottom: 18rpx;
			border-bottom: 1px solid #e3e3e3;

			.fixed {
				display: flex;
				align-items: center;
				color: #939393;
				font-size: 26rpx;

				.size {
					font-size: 33rpx;
				}
			}
		}

		.itemList {
			padding-right: 8rpx;
		}

		.content {
			.itemContent {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 0;
				font-size: 24rpx;

				.left {
					display: flex;
					align-items: center;

					.avatar {
						width: 90rpx;
						height: 90rpx;
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

				.right {
					margin-right: 5rpx;
					padding: 7rpx 18rpx;
					background-color: #1492E6;
					border-radius: 10rpx;
					color: #fff;
				}

			}

		}
	}
</style>