<template>
	<view class="container">
		<Header :obj="headObj"></Header>
		<view class="none" v-if="applyList.length==0">
			<view class="plane icon-zhifeiji_fabu iconfont">
			</view>
			暂无好友申请
		</view>

		<scroll-view class="scroll" v-else scroll-y="true" :style="{height: wh+'px'}">
			<!-- <view class="detail" > -->
				<uni-swipe-action>
					<uni-swipe-action-item v-for="item in applyList" :right-options="options2" :show="item.isOpened"
						:auto-close="false" @click="bindClick($event,item)">
						<view class="itemContent">
							<view class="left">
								<view class="avatar">
									<image class='img' :src="item.avatar"></image>
								</view>
								<view class="descript">
									<text class="chat">{{item.content}}</text>
									<text>{{item.username}}&nbsp;&nbsp;<text
											style="color: #939393;font-size: 25rpx;">{{dayFormat(item.createTime)}}</text>
									</text>
								</view>
							</view>
							<view class="right" v-if="item.status==0">
								<text @click="reject(item)">拒绝</text>
								<text @click="validate(item)">同意</text>
								{{formatStatus(item)}}
							</view>
							<view class="right" v-else>
								{{formatStatus(item)}}
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
	<!-- 		</view> -->
		</scroll-view>

		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog mode="input" title="同意该好友申请" :value="nickname" placeholder="请输入备注"
				@confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<script setup>
	import Header from "@/component/header.vue"
	import request from "@/utils/request.js"
	import {
		dayFormat
	} from "@/utils/format.js"
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
	import {
		statusStore
	} from "@/pinia/userInfo/status.js"
	let nickname = ref(); //备注名
	let applyList = ref([])
	let infoValue = ref(); //备注名信息
	// 编辑框的实例对象
	let inputDialog = ref();
	// let isOpened = ref("none")
	let options2 = ref([{
		text: '删除',
		style: {
			backgroundColor: '#E93535',
		}
	}])
	let headObj = ref({
		leftFont: 'icon-zuojiantou',
		title: '新朋友',
		path: '/pages/linkman/linkman'
	})
	const user = userStore();
	const statusInfo = statusStore();
	// 滚动栏的高度
	let wh = ref()

	function getHeight() {
		const val = uni.getSystemInfoSync()
		// 要减去tabbar的高度和搜索栏的高度
		// #ifdef APP-PLUS
		wh.value = val.windowHeight - 90
		// #endif
		// #ifdef H5
		wh.value = val.windowHeight - 50;
		// #endif
	}
	onLoad((option) => {
		getHeight()
		// 获取好友申请列表信息
		getApplyList();
	})
	// 获取申请列表数据
	async function getApplyList() {
		let {
			data: res
		} = await request("/user/getApplyList", 'get', {
			userId: user.id
		})
		if (res.code != 200 || res.code == 404) return false;
		res.data.forEach(item => {
			item.isOpened = "none"
		})
		applyList.value = res.data
	}

	async function bindClick(e, info) {
		if (e.content.text == "删除") {
			let {
				data: res
			} = await request("/user/deleteApplyRecord", "delete", {
				sendId: info.sendId,
				acceptId: info.acceptId
			})
			console.log(res);
			if (res.code == 200) {
				showMsg("已成功删除该条记录", 1000, "loading")
				getApplyList()
			}
		}

	}

	function formatStatus(item) {
		if (item.status == -1) {
			return "已拒绝该请求"
		} else if (item.status == 1) {
			return "已添加"
		}
	}
	// 选择的申请项
	let seletedDate = ref([])
	// 点击同意赋值
	function validate(data) {
		seletedDate.value = data
		inputDialog.value.open()
	}
	// 点击拒绝赋值
	async function reject(data) {
		let {
			data: res
		} = await request("/user/rejectApply", "put", {
			myId: user.id,
			friendId: data.sendId
		})
		if (res.code == 200) {
			getApplyList()
			showMsg("已拒绝该请求", 500, "loading");
			seletedDate.value = [];
		}
	}
	async function dialogInputConfirm(val) {
		//如果点击了确定
		if (val) {
			let obj = {
				fromUid: seletedDate.value.sendId,
				toUid: user.id,
				message: seletedDate.value.content,
				type: 0,
				status: 0,
				createTime: Date.now()
			}
			statusInfo.socket?.emit("chat", obj);
			let {
				data: res
			} = await request("/user/createShip", "post", {
				myId: user.id,
				friendId: seletedDate.value.sendId,
				friendName: val
			})

			if (res.code == 200) {
				showMsg("添加好友成功", 1000, "loading");
				seletedDate.value = [];
				uni.switchTab({
					url: "/pages/home/home"
				})
			}
		}
	}
</script>

<style scoped lang="less">
	* {
		overflow-x: scroll !important;
	}

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

		.scroll {
			.uni-swipe {
				display: block;
				height: 100% !important;
			}

			.itemContent {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 10rpx 20rpx 5rpx;
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
						}
					}

					.descript {
						height: 100%;
						margin-left: 30rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-around;

						.chat {
							width: 300rpx;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}
					}
				}

				.right {
					display: flex;

					text {
						display: block;
						padding: 8rpx 20rpx;
						border-radius: 10rpx;
						color: #fff;

						&:first-child {
							background-color: #E93535;
						}

						&:last-child {
							background-color: #3E6FAC;
							margin-left: 20rpx;
						}
					}

					color: #939393;
				}

			}
		}
	}
</style>