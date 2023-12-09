<template>
	<view class="container">
		<stastuBar></stastuBar>
		<view class="title">
			<text>我的好友</text>
		</view>
		<!-- 搜索区域 -->
		<view @click="goSearch">
			<uni-search-bar placeholder="搜索" :readonly="true"></uni-search-bar>
		</view>
		<template v-for="item in obj" :key="item.title">
			<featureItem :objData="item" @click="goDetail(item.title)"></featureItem>
		</template>
		<view class="divide">
			<uni-badge v-if="friendNum!=0" class="uni-badge-left-margin fixed" :text="friendNum" />
		</view>
		<view class="friendList">
			<!-- <scroll-view class="scroll" scroll-y="true">	</scroll-view> -->
			<uni-collapse ref="collapse" v-model="value" @change="change">
				<uni-collapse-item title="我的好友">
					<view class="content">
						<friendItem v-for="item in friendList" :key="item.id" :obj="item"></friendItem>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>
<script setup>
	import stastuBar from '@/component/statusBar.vue';
	import friendItem from "@/component/friendItem.vue";
	import featureItem from "@/component/featureItem.vue";
	import {
		userStore
	} from "@/pinia/userInfo/userInfo.js";
	import request from "../../utils/request.js"
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app"
	import {
		ref
	} from 'vue'
	import {
		showMsg
	} from '../../utils/Toast.js';
	const userInfo = userStore();
	let friendList = ref(['0'])
	const goSearch = () => {
		uni.navigateTo({
			url: '/pages/search/search',
		});
	}
	let obj = ref([{
		textFont: 'icon-tianjiahaoyou1',
		title: '好友申请',
		bgColor: 'rgb(255, 166, 102)'

	}, {
		textFont: 'icon-chuangjianqunliao',
		title: '创建群聊',
		bgColor: ' rgb(61, 203, 242)'
	}])

	function goDetail(val) {
		if (val == '好友申请') {
			uni.navigateTo({
				url: '/pages/apply/apply',
			});
		} else if (val == '创建群聊') {
			uni.navigateTo({
				url: '/pages/groupChat/groupChat',
			});
		}
	}
	// 控制折叠面板的开闭
	let value = ref(['0']);

	let friendNum = ref(0); //角标人数
	// 获取好友列表数据
	async function getData() {
		let {
			data: res
		} = await request("/user/getFriendList", "get", {
			id: userInfo.id
		})
		if (res.code != 200) return showMsg("获取数据失败")
		friendList.value = res.data;
		friendList.value.forEach(item => {
			if (item.id == userInfo.id) {
				item["remarked"] = item.nickname
			}
		})
		let {
			data: result
		} = await request("/user/getFriendNum", "get", {
			id: userInfo.id
		})
		if (result.code != 200) return showMsg("获取数据失败")
		return friendNum.value = result.data.length
		// 获取申请表暂未处理人数
	}
	onLoad((option) => {
		getData()
	})
	onShow((option) => {
		getData()
	})
	// 监听折叠面板的变化
	function change(e) {
		// console.log(e);
		getData()
	}
</script>
<style scoped lang="scss">
	image {
		will-change: transform
	}

	.container {
		overflow-x: hidden;
		padding: 15rpx 20rpx 0;
		font-family: STKaiti;

		.title {
			text-align: center;
			margin: 12rpx 0 22rpx;
		}

		.menuList {
			display: flex;
			height: 100rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;
			margin: 25rpx 0;

			.left {
				display: flex;
				align-items: center;
				width: 250rpx;
				justify-content: space-between;

				.imgBg {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100rpx;
					height: 100rpx;
					border-radius: 20rpx;

					.size {
						font-size: 48rpx;
					}
				}
			}

			.right {
				.iconfont {
					font-size: 56rpx
				}
			}
		}

		.divide {
			position: relative;
			box-sizing: border-box;
			height: 20rpx;
			margin: 0 -20px;
			background-color: rgb(248, 248, 248);

			.fixed {
				z-index: 999;
				position: absolute;
				top: -260rpx;
				left: 130rpx;
			}
		}
	}
</style>