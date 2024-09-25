<template>
	<view class="container">
		<live-pusher id='livePusher' :class="{'video_box':isSwitch}" ref="livePusher" class="livePusher"
			:url="'rtmp://192.168.136.20/live/video' " mode="SD" :muted="true"
			:style="{ width: (!isSwitch ? windowWidth + 'px' : '175px'), height: (!isSwitch ? windowHeight + 'px' : '500rpx') }"
			:enable-camera="enableCamera" :auto-focus="true" :beauty="1" whiteness="2" aspect="9:16"
			audio-quality="high" @statechange="statechange" @netstatus="netstatus" @error="error"></live-pusher>
		<!-- 远程视频 -->
		<view :class="{'video_box':!isSwitch}">
			<video @click="isSwitch=true" :src="`http://192.168.136.20:8000/live/video.flv`" autoplay="true"
				controls="false" object-fit="fill" muted="false"
				:style="{width: (isSwitch?windowWidth : '175') + 'px',height: isSwitch? (windowHeight  + 'px') : '500rpx'}"></video>
		</view>
		<!-- 背景图 -->
		<view class="bg" v-if="false">
			<image
				src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-24edd85fa1d6b50e8776b4adcbc83e6b_r.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669447309&t=35e8d08727552f533d7550d9ec4e9131"
				mode="aspectFill" style="flex: 1;"></image>
			<view class="image_bg"></view>
		</view>

		<!-- 头部区域 -->
		<view class="head" :style="{marginTop:statusNav+'px'}">
			<text class="iconfont">&#xe648;</text>
			<text class="head_msg">等待好友接收邀请...</text>
			<text></text>
		</view>
		<!-- 按钮区域 -->
		<view class="btn">
			<view class="btn_wrap">
				<view class="box" @click="handUp">
					<view class="item item1">
						<text class="iconfont">&#xe852;</text>
					</view>
					<text class="item_text">结束</text>
				</view>
				<view class="box" @click.prevent="switchCamera">
					<view class="item item2">
						<text class="iconfont">&#xe648;</text>
					</view>
					<text class="item_text">切换语音通话</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onReady,
		onShow
	} from "@dcloudio/uni-app";
	import {
		ref,
		getCurrentInstance
	} from "vue";
	import {
		statusStore
	} from "@/pinia/userInfo/status.js"
	let context = ref(null); //实例对象
	let windowWidth = ref(0) //手机宽度
	let windowHeight = ref(0) //手机高度
	let statusNav = ref(0) //状态栏高度
	let fromUid = ref(); //我的id
	let toUid = ref(); //朋友的id
	let avatar = ref(''); //朋友的头像
	let type = ref(''); //消息类型
	let isSwitch = ref(false) //远程是否为大窗口，
	let enableCamera = ref(true); //是否开启摄像头
	let livePusher = ref(null)
	const statusInfo = statusStore()
	onLoad((option) => {
		let sys = uni.getSystemInfoSync();
		windowWidth.value = sys.windowWidth;
		windowHeight.value = sys.windowHeight;
		statusNav.value = sys.statusBarHeight
		// console.log(livePusher.value);
		try {
			fromUid.value = option.fromUid;
			toUid.value = option.toUid;
			avatar.value = statusInfo.avatar;
			type.value = option.type;
			// context.value = uni.createLivePusherContext("livePusher", livePusher.value);//vue2
			context.value = uni.createLivePusherContext('livePusher', getCurrentInstance().proxy); //vue3
			// console.log(context.value, 8);
		} catch (error) {
			console.error('Error in onLoad:', error);
		}
	});
	onShow(()=>{
		console.log(context.value,'6');
		startPreview()
		start()
	})
	function handUp() {
		stopPreview()
		uni.navigateBack()
	}

	function statechange(e) {
		console.log("statechange:" + JSON.stringify(e));
	}

	function netstatus(e) {
		console.log("netstatus:" + JSON.stringify(e));
	}

	function error(e) {
		console.log("error:" + JSON.stringify(e));
	}
	//开始推流
	function start() {
		console.log('开始推流');
		context.value.start({
			success: (a) => {
				console.log("livePusher.start:" + JSON.stringify(a));
			},
		complete(err){
			console.log('失败',err);
		}
			
		})
	}
	//关闭推流
	function close() {
		context.value.close({
			success: (a) => {
				console.log("livePusher.close:" + JSON.stringify(a));
			}
		})
	}
	// 快照
	function snapshot() {
		context.value.snapshot({
			success: (e) => {
				console.log(JSON.stringify(e));
			}
		})
	}

	function resume() {
		context.value.resume({
			success: (a) => {
				console.log("livePusher.resume:" + JSON.stringify(a));
			}
		})
	}
	// 暂停推流
	function pause() {
		context.value.pause({
			success: (a) => {
				console.log("livePusher.pause:" + JSON.stringify(a));
			}
		})
	}
	// 停止推流
	function stop() {
		context.value.stop({
			success: (a) => {
				console.log(JSON.stringify(a));
			}
		})
	}
	//切换前摄像头
	function switchCamera() {
		console.log(88);
		context.value.switchCamera({
			success: (a) => {
				console.log("切换摄像头" + JSON.stringify(a));
			}
		})
	}
	// 开启摄像头预览
	function startPreview() {
		context.value.startPreview({
			success: (a) => {
				console.log("livePusher.startPreview:" + JSON.stringify(a));
			}
		})
	}
	// 关闭摄像头预览
	function stopPreview() {
		console.log('关闭摄像头预览');
		context.value.stopPreview({
			success: (a) => {
				console.log("livePusher.stopPreview:" + JSON.stringify(a));
			}
		})
	}
</script>

<style scoped lang="less">
	.container {
		width: 100%;
		height: 100%;
		display: flex;

		.video_box {
			position: fixed;
			top: 180rpx;
			right: 30rpx;
		}

		.bg {
			flex: 1;

			image {
				position: relative;
			}

			.image_bg {
				position: absolute;
				flex: 1;
				background: rgba(0, 0, 0, .5);
			}
		}



		.head {
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 88rpx;
			line-height: 88rpx;
			padding: 0 30rpx;
			justify-content: space-between;

			.head_msg {
				color: #ddd;
				color: red;
				font-size: 32rpx;
				margin-left: 170rpx;
			}
		}
	}





	.avatar_box {
		position: fixed;
		top: 300rpx;

	}

	.avatar {
		width: 150rpx;
		height: 150rpx;
		border-radius: 100rpx;
	}

	.avater_wrap {
		width: 750rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.btn {
		z-index: 999;
		position: fixed;
		bottom: 200rpx;
		background-color: pink;

		.btn_wrap {
			width: 750rpx;
			display: flex;
			background-color: pink;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;

			.box {
				background-color: pink;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.item {
					display: flex;
					background-color: pink;
					align-items: center;
					justify-content: center;
					width: 120rpx;
					height: 120rpx;
					border-radius: 100rpx;
				}

				.item_text {
					color: #E4DEDE;
					color: red;
					font-size: 28rpx;
					margin-top: 8rpx;
					background-color: pink;
				}

				.item1 {
					background-color: #FF5D5B;
				}

				.item2 {
					background: rgba(0, 0, 0, .3);
				}
			}

		}
	}
</style>