<template>
	<view class="container">
		<Header :obj="headObj"></Header>
		<view class="none" v-if="applyList.length==0">
			<view class="plane icon-zhifeiji_fabu iconfont">
			</view>
			暂无好友申请
		</view>
		<view class="detail" v-else>
			<view class="itemContent" v-for="item in applyList">
				<view class="left">
					<view class="avatar">
						<image class='img' :src="item.avatar"></image>
					</view>
					<view class="descript">
						<text>{{item.content}}</text>
						<text>{{item.username}}</text>
					</view>
				</view>
				<view class="right">
					{{desctipt}}
				</view>
			</view>
		</view>
			<!-- <uni-popup ref="inputDialog" type="dialog">
						<uni-popup-dialog ref="inputClose"  mode="input" title="备注" value="我是"
							placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
					</uni-popup> -->
	</view>
</template>
<script setup>
	import Header from "@/component/header.vue"
	import request from "@/utils/request.js"
	import {
		userStore
	} from "@/pinia/userInfo/userInfo.js"
	import {
		ref,
		computed
	} from 'vue'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		showMsg
	} from "../../utils/Toast"
	let applyList = ref([])
	let infoValue = ref();//备注名信息
	let headObj = ref({
		leftFont: 'icon-zuojiantou',
		title: '好友申请列表',
		path: '/pages/linkman/linkman'
	})
	const user = userStore();
	onLoad(async (option) => {
		// 获取申论列表信息
		let {
			data: res
		} = await request("/user/getApplyList", 'get', {
			userId: user.id
		})
		if (res.code != 200) return showMsg()
	  console.log(res.data,11111);
		applyList.value = res.data
	})
	const desctipt = computed(() => {
		return applyList.value.status ? "已添加" : "待通过"
	})
</script>

<style scoped lang="scss">
	.container {
		padding: 15rpx 20rpx 0;
		font-family: STKaiti;

		.none {
			color: gray;
			margin-top: 30%;
			text-align: center;

			.plane {
				font-size: 220rpx;
				color: gray;
			}
		}

		.detail {
			padding: 0 10rpx;

			.itemContent {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 0;
				font-size: 28rpx;

				.left {
					display: flex;
					align-items: center;
					height: 100rpx;

					.avatar {
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						overflow: hidden;

						.img {
							width: 100%;
							height: 100%;
							background-color: red;
						}
					}

					.descript {
						height: 100%;
						margin-left: 30rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
					}
				}

				.right {
					color: #939393;
				}

			}
		}
	}
</style>