<template>
	<view class="">

		<view class="container">
			<Header :obj="objDate">
				<template #left>
					<text class="iconfont size">&#xeb4e;</text>
				</template>
				<template #right>
					<text @click="goInfo" class="iconfont size">&#xeb48;</text>
				</template>
			</Header>
			<view class="bg">
				<image :src="spaceInfo?.avatar"></image>
			</view>
		</view>
		<view class="content">
			<view class="descript">
				<view class="title">
					{{spaceInfo.nickname}} <text v-if="itemId!=userInfo.id">({{spaceInfo.remarked}})</text>
				</view>
				<view class="account">
					<text>心语号: {{spaceInfo?.username}}</text>
				</view>
			</view>
			<view class="options">
				<view class="item">
					<text class="iconfont">&#xeb4c;</text>
					<text class="text">发信息</text>
				</view>
				<view class="item">
					<text class="iconfont">&#xeb49;</text>
					<text class="text">语音</text>
				</view>
				<view class="item">
					<text class="iconfont icon-post_video-copy-copy"></text>
					<text class="text">视频</text>
				</view>
			</view>
		</view>
		<view class="title">
			最新动态
		</view>
		<view class="space">
			<view class="info" v-if="spaceInfo&&flag">
				<image :src="spaceInfo&&spaceInfo.avatar"></image>
				<view class="infoDetail">
					<text>{{spaceInfo&&spaceInfo.nickname}} <text v-if="itemId!=userInfo.id">({{spaceInfo.remarked}})</text> </text>
					<text class="size">{{dayFormat(spaceInfo?.result[0]?.createTime)}}</text>
				</view>
			</view>
			<view class="spaceContent" v-if="spaceInfo&&flag">
				<text>{{spaceInfo.result[0].content?.title}}</text>
				<view class="imgs" v-if="spaceInfo.result[0].content?.imgArr!=[]">
					<template v-for="(img,inde) in spaceInfo.result[0].content?.imgArr" :key="inde">
						<image @click="preView(inde,spaceInfo.result[0].content?.imgArr)" :src="img" :style="{ 
				      width: spaceInfo.result[0].content?.imgArr.length == 1 ? '90%' : (spaceInfo.result[0].content?.imgArr == 2 ? '38%' : '32%'),
				   height: spaceInfo.result[0].content?.imgArr.length <= 3 ? '100%' : (spaceInfo.result[0].content?.imgArr.length <= 6 ? '48%' : '32%'),
				  }">
						</image>
					</template>
				</view>
				<view class="size">{{spaceInfo.result[0]?.position}}</view>
			</view>
			<view class="none" v-if="!flag">
				<image :src="codeImg" mode="widthFix"></image>
				<text>空空如也</text>
				<text class='small'>这里好安静呀!躁动起来吧</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import Header from "@/component/header.vue";
	import request from "@/utils/request.js"
	import {
		ref,
	} from "vue"
	import {
		dayFormat
	} from "@/utils/format.js"
	import {
		userStore
	} from "@/pinia/userInfo/userInfo.js"
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		showMsg
	} from "../../utils/Toast";

	const userInfo = userStore()
	let flag = ref(false)
	let objDate = ref({
		leftFont: 'icon-zuojiantou-copy',
		path: '/pages/home/home'
	})
	let spaceInfo = ref({})
	let itemId = ref()
	onLoad(async (option) => {
		try {
			itemId.value = option.id
			// 获取最新动态信息
			if(!itemId.value) return
			let {
				data: res
			} = await request("/user/getNewSpace", "get", {
				id: itemId.value
			})
			if (res.code != 200) return showMsg()
			if (res.data && res.data.result.length == 0) {
				spaceInfo.value = res.data;
			 console.log(spaceInfo.value,444);
				flag.value = false;
			} else {
				flag.value = true;
				spaceInfo.value = res.data;
				//console.log(spaceInfo.value,666);
			}
		} catch (e) {
			console.log(e);
			//TODO handle the exception
		}
	})
	// 图片预览
	function preView(index, imgArr) {
		uni.previewImage({
			current: index,
			urls: imgArr,
			loop: true,
			indicator: "default"
		})
	}
	import img from "@/static/images/sys.png";
	let codeImg = ref()
	codeImg.value = img

	function goInfo() {
		if (itemId.value == userInfo.id) {
			uni.navigateTo({
				url: "/pages/editUser/editUser"
			})
		} else {
			uni.navigateTo({
				url: `/pages/friendInfo/friendInfo?id=${itemId.value}`
			})
		}
	}
</script>

<style scoped lang="less">
	.container {
		padding: 15rpx 25rpx 0;
		background-color: #3e6fac;
		font-family: STKaiti;

		.important {
			background-color: #3e6fac;
		}

		.size {
			font-size: 60rpx;
			color: #fff !important;
		}

		.bg {
			position: relative;
			width: 100%;
			height: 350rpx;
			background: url('@/static/images/bg.png') no-repeat;
			background-size: contain;
			color: #fff;

			image {
				position: absolute;
				left: 50%;
				bottom: 0%;
				transform: translate(-70rpx, 70rpx);
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
			}

		}
	}

	.content {
		font-family: STKaiti;
		height: 300rpx;
		background-color: #fff;

		.descript {
			margin-top: 80rpx !important;
			text-align: center;

			.title {
				font-weight: 550;
			}

			.account {
				color: #847F7F;
				font-size: 28rpx;
			}
		}

		.options {
			display: flex;
			justify-content: space-around;
			margin-top: 40rpx;
			padding: 0 10rpx;

			.item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.text {
					font-size: 25rpx;
					padding-top: 6rpx;
				}

				.iconfont {
					display: block;
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					line-height: 100rpx;
					text-align: center;
					font-size: 40rpx;
					color: #fff !important;
				}

				// &:first-child .iconfont {
				// 	background-color: #1DB856;


				// }

				&:nth-child(1) .iconfont {
					background-color: #FEC4C7;
				}

				&:nth-child(2) .iconfont {
					background-color: #BB9860;
				}

				&:nth-child(3) .iconfont {
					background-color: #1F1724;
				}
			}

		}
	}

	.title {
		text-align: center;
		font-family: STKaiti;
	}

	.space {
		font-family: STKaiti;
		padding: 30rpx;

		.info {
			display: flex;

			image {
				width: 110rpx;
				height: 110rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 30rpx;
			}

			.infoDetail {
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 28rpx;
				font-weight: 550;

				.size {
					color: #9F9595;
					font-size: 25rpx;
					font-weight: normal;
				}
			}
		}

		.spaceContent {
			overflow: hidden;
			margin-top: 15rpx;

			.imgs {
				height: 400rpx;
				object-fit: cover;
				margin-bottom: 15rpx;

				image {
					margin-right: 5rpx;
					margin-bottom: 5rpx;
				}
			}

			.size {
				color: #9F9595;
				font-size: 25rpx;
				font-weight: normal;
			}
		}

		.none {
			display: flex;
			flex-direction: column;
			margin-top: 15rpx;
			text-align: center;

			image {
				margin: auto;
				width: 330rpx;
			}

			text {
				margin-top: 10rpx;
				font-weight: 600;
			}

			.small {
				font-weight: normal;
				font-size: 27rpx;
				color: #A6A6A6;
			}
		}
	}
</style>