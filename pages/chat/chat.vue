<template>
	<view class="box">
		<view class="container">
			<Header :obj="objDate">
				<template #right>
					<text @click="goInfo" class="iconfont">&#xe6dd;</text>
				</template>
			</Header>
		</view>
		<scroll-view class="scroll" scroll-y="true" :style="{height: wh+'px'}">
			<view v-for="item in emoji">{{item}}</view>
		</scroll-view>
		<view class="popul" :style="{bottom: keyboardHeight+'rpx' }">
			<text class="iconfont size">&#xe6e0;</text>
			<textarea @input="handleInput" placeholder="请输入内容" :adjust-position="false" class="input"
				@keyboardheightchange="closeKeyBorder" @focus="getInputHeight" :focus="foucsFlag" :value="newMessage"
				auto-height />
			<text class="iconfont second size" v-if="!emojiFlag" @click="openPopup">&#xe688;</text>
			<text class="iconfont second size" @click="openPopup" v-if="emojiFlag">&#xe652;</text>
			<text class="iconfont size" v-if="newMessage.length==0" @click="openOption">&#xe726;</text>
			<view v-else class="btn" @click="sendMessage">
				发送
			</view>
		</view>
		<!-- 表情包合集 -->
		<uv-popup ref="popup" :overlay="false">
			<scroll-view scroll-y="true" :style="{height:emojiHeight+'rpx'}">
				<view class="list">
					<view class="item" v-for="(item,i) in emoji" :key="i" @click="addEmoji(i)">
						{{item}}
					</view>
				</view>
			</scroll-view>
		</uv-popup>
		<!-- 多功能合集 -->
		<uv-popup ref="options" :overlay="false">
			<view class="list" :style="{height:emojiHeight+'rpx'}">
				哈哈哈哈哈哈哈
			</view>
		</uv-popup>
	</view>
</template>

<script setup>
	import Header from "@/component/header.vue";
	import request from "@/utils/request.js"
	import emoji from "@/utils/emojs.js"
	// import {
	// 	connect,
	// 	io
	// } from "socket.io-client";
	import io from 'weapp.socket.io'
	//import io from "@/utils/socket.js"
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";
	import {
		ref,
		onMounted,
		getCurrentInstance
	} from "vue";
	import {
		userStore
	} from "@/pinia/userInfo/userInfo.js"
	import {
		debounce
	} from "@/utils/ablilty.js"
	// 滚动栏的高度
	let wh = ref()
	import {
		mainUrl
	} from "@/utils/config.js"
	const userInfo = userStore();
	let foucsFlag = ref(false); //判断是否聚焦
	let emojiFlag = ref(false); //判断是否是表情包
	let optionFlag = ref(false); //判断是否是多功能
	const messages = ref([]);
	let socket = null; // 提前声明socket变量

	let newMessage = ref(''); //发送内容
	let keyboardHeight = ref(0); //键盘高度
	let popup = ref(); //表情包实例
	let options = ref(); //多功能实例
	onLoad(async (option) => {
		getHeight();
		console.log(option);
		itemId.value = option.id
		objDate.value.title = option.remarked;
	})
	let itemId = ref()
	let objDate = ref({
		leftFont: 'icon-zuojiantou',
		title: '',
		path: '/pages/home/home'
	})


	let emojiHeight = ref(531); //即是表情包弹出层的高度，也是功能选项弹出层高度
	// 获取键盘高度
	function getInputHeight(e) {
		if (e.detail.height != 0) {
			keyboardHeight.value = parseInt(e.detail.height) * 2 - 25;
			//console.log(parseInt(e.detail.height) * 2 - 25);
			emojiHeight.value = parseInt(e.detail.height) * 2 - 25;
			//emojiHeight.value = parseInt(e.detail.height) * 2 - 60;
		}
	}
	// 获取消息列表高度
	function getHeight() {
		const val = uni.getSystemInfoSync()
		wh.value = val.windowHeight - 130
	}
	// 判断键盘的状态
	function closeKeyBorder(e) {
		console.log(e);
		if (e.detail.height == 0) {
			getHeight()
			if (emojiFlag.value) {
				emojiFlag.value = false;
				popup.value.close();
			}
			if (optionFlag.value) {
				optionFlag.value = false;
				options.value.close()
			}
			keyboardHeight.value = 10;
			// 必须弄个定时器，不然发送按钮的点击事件会被覆盖掉
			setTimeout(() => {
				foucsFlag.value = false;
			}, 100)
		} else {
			if (optionFlag.value) {
				options.value.open("bottom")
			} else if (emojiFlag.value) {
				popup.value.open('bottom');
			}
			keyboardHeight.value = parseInt(e.detail.height) * 2 - 25;
			wh.value = 440
		}
	}
	onShow(() => {
		connectSocket()
	})
	const connectSocket = () => {
		const app = getCurrentInstance()
		const socket = io("http://192.168.23.20:3000")
		// socket = io("http://192.168.23.20:3000")
		console.log(socket);
		socket.on("connect", () => {
			console.log(socket.connected); // true
			console.log('客服端连接成功'); // 在连接成功后打印连接状态
		});

		socket.on("init", (msg) => {
			console.log(msg);
		});
		setInterval(() => {
			socket.emit("chat", "我是客户端推送过来的")
		}, 1000)

	}
	// onMounted(() => {
	// 	console.log('进来这个页面。。。');
	// 	// socket = io("ws://192.168.23.20:5173")
	// 	// socket.on("connect", () => {
	// 	// 	console.log(socket.connected); // true
	// 	// 	console.log('客服端连接成功'); // 在连接成功后打印连接状态
	// 	// });
	// 	// socket.on("init", (msg) => {
	// 	// 	console.log(msg);
	// 	// });
	// 	// socket.emit("chat", "我是客户端推送过来的")
	// 	// setInterval(() => {
	// 	// 	socket.emit("chat", "我是客户端推送过来的")
	// 	// }, 500)
	// });

	const sendMessage = () => {
		if (socket) {
			socket.emit("msgs", newMessage.value);
			console.log(newMessage.value)
			newMessage.value = "";

		}
	};

	const debouncedInputChange = debounce(function inputChange(val) {
		newMessage.value = val
	}, 800); // 使用防抖函数包装inputChange
	const handleInput = (e) => {
		debouncedInputChange(e.detail.value); // 调用防抖函数处理@input事件
	};

	// 点击右上角进入界面
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
	// 打开表情包弹出层
	function openPopup() {
		if (emojiFlag.value == false) {
			foucsFlag.value = false;
			foucsFlag.value = false;
			emojiFlag.value = true;
			options.value.close();
			keyboardHeight.value = 531;
			popup.value.open('bottom');
			wh.value = 440
		} else {
			emojiFlag.value = false;
			keyboardHeight.value = 10;
			foucsFlag.value = true;
			popup.value.close();
		}
	}
	// 打开多功能弹出层
	function openOption() {
		if (optionFlag.value == false) {
			foucsFlag.value = false;
			emojiFlag.value = false;
			optionFlag.value = true;
			popup.value.close();
			keyboardHeight.value = 531;
			options.value.open('bottom');
			wh.value = 440
		} else {
			options.value.close();
			optionFlag.value = false;
			keyboardHeight.value = 10;
			foucsFlag.value = true;
		}
	}
	// 添加表情包
	function addEmoji(index) {
		newMessage.value += emoji[index]
		console.log(emoji[index]);
	}
</script>

<style lang="less" scoped>
	.box {
		height: 100vh;
		box-sizing: border-box;
		padding: 15rpx 30rpx 0;
		background-color: #f5f5f5;
		font-family: STKaiti;

		.container {
			.iconfont {
				font-size: 50rpx;
			}
		}

		.scroll {
			background: pink;

		}

		.popul {
			position: fixed;
			left: 0;
			right: 0;
			border-top: 1rpx solid #eeeeee;
			font-family: STKaiti;
			padding: 15rpx 30rpx;
			display: flex;
			align-items: center;
			background-color: #f2f2f2;

			.size {
				font-size: 50rpx;
			}

			.input {
				padding: 15rpx;
				margin: 0 5rpx 0 7rpx;
				background-color: #fff;
				border-radius: 10rpx;
				width: 530rpx;
			}

			.second {
				margin: 0 8rpx 0 7rpx;
			}

			.btn {
				width: 120rpx;
				height: 60rpx;
				line-height: 60rpx;
				margin-left: 10rpx;
				text-align: center;
				background-color: #1aa5fc;
				border-radius: 15rpx;
				color: #fff;
				z-index: 99;
				font-size: 25rpx;
			}
		}

		.list {
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			border-top: 1rpx solid #d3d3d3;
			padding: 15rpx 20rpx;
			overflow-x: scroll;
			background-color: #f1f1f1;

			.item {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 12.5%;
				height: 80rpx;
				font-size: 50rpx;
			}
		}
	}
</style>