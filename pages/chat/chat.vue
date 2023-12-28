<template>
	<view class="box">
		<view class="container">
			<Header :obj="objDate">
				<template #right>
					<text @click="goInfo" class="iconfont">&#xe6dd;</text>
				</template>
			</Header>
		</view>
		<view class="divide" @click="playVoice">
		</view>
		<view class="infoList">
			<!-- height: wh+'px' -->
			<scroll-view refresher-background="#f5f5f5" :refresher-enabled="refreshFlag" :refresher-threshold="40"
				:refresher-triggered="triggered" :scroll-top="scrollTop" class="scroll" scroll-y="true"
				:style="{ height: wh+'px' }" @scrolltoupper="onSrcollTop">
				<view v-for="(item,index) in messages" class="messageList" :key="index">
					<view class="time" v-if="getTime(item.createTime,index)">
						<view class="time_text">{{getTime(item.createTime,index)}}</view>
						<view class="time_text" v-if="index==0">你们已经成功添加为好友,现在可以开始聊天了</view>
					</view>
					<view class="info right" v-if="item.fromUid==userInfo.id">
						<!-- 文字消息 -->
						<view class="content" v-if="item.type==0">
							<text>{{item.message}}</text>
						</view>
						<!-- 图片消息 -->
						<view class="contentImg" v-if="item.type==1">
							<image :lazy-load="true" class="imgMsg" @click="previewImg(item.message)"
								:src="item.message" mode="">
							</image>
						</view>
						<!-- 语音消息 -->
						<view class="content" v-if="item.type==2">
							<!-- <image @click="changeStatus(item.message, index)"
								:src="index === audioIndex ? '../static/images/voice.gif' : '../static/images/voice_shop.png'"
								:lazy-load="true"></image> -->
							<text>{{item.audioTime}}</text>
							<image @click="changeStatus(item.message,index)"
								:src="index === audioIndex ? audioImg : audioShowImg" :lazy-load="true"></image>
						</view>
						<!-- 位置 -->
						<view class="mapBox" v-if="item.type === 3">
							<map @tap="openMap(item)" :scale="12" :latitude="item.latitude" :longitude="item.longitude"
								:markers="item.address.markers" style="width: 500rpx; height: 300rpx;"></map>
						</view>

						<image :lazy-load="true" class="img" :src="item.avatar"></image>
					</view>
					<view class="info" v-else>
						<image :lazy-load="true" class="img" :src="item.avatar" @click="goDetail"></image>
						<!-- 文本 -->
						<view class="content" v-if="item.type==0">
							<text>{{item.message}}</text>
						</view>
						<!-- 图片 -->
						<view class="contentImg" v-if="item.type==1">
							<image :lazy-load="true" @click="previewImg(item.message.img)" class="imgMsg"
								:src="item.message" mode="">
							</image>
						</view>
						<!-- 语音 -->
						<view class="content" v-if="item.type==2">
							<!-- 	<image @click="changeStatus(item.message, index)"
								:src="index === audioIndex ? audioImg : audioShowImg" :lazy-load="true"></image> -->

							<image @click="changeStatus(item.message,index)"
								:src="index === audioIndex ? audioImg : audioShowImg" :lazy-load="true"></image>
							<text>{{item.audioTime}}</text>
							<!-- 	<image @click="changeStatus(item.message, index)" :src="index === audioIndex ? '../static/images/voice.gif' : '../static/images/voice_shop.png'" :lazy-load="true"></image> -->
						</view>
						<!-- 位置 -->
						<view class="mapBox" v-if="item.type === 3">
							<map @tap="openMap(item)" :scale="12" :latitude="item.latitude" :longitude="item.longitude"
								:markers="item.address.markers" style="width: 470rpx; height: 300rpx;"></map>
						</view>

					</view>
				</view>
			</scroll-view>
		</view>
		<view class="popul" :style="{bottom: keyboardHeight+'rpx' }">
			<text class="iconfont size" v-if="isVoice" @click="transForm">&#xe652;</text>
			<text class="iconfont size" v-else @click="transForm">&#xe6e0;</text>
			<textarea v-if="!isVoice" @input="handleInput" placeholder="请输入内容" :adjust-position="false" class="input"
				@keyboardheightchange="closeKeyBorder" @focus="getInputHeight" :focus="foucsFlag" :value="newMessage"
				auto-height />
			<block v-else>
				<view class="input" style="display: flex;justify-content: center;flex-direction: row; "
					@touchstart="startRecord" @touchend.prevent="touchEnd">
					<text style="color: #707070;">按住说话</text>
				</view>
			</block>
			<text class="iconfont second size" v-if="!emojiFlag" @click="openPopup">&#xe688;</text>
			<text class="iconfont second size" @click="openPopup" v-if="emojiFlag">&#xe652;</text>
			<text class="iconfont size" v-if="sendFlag" @click="openOption">&#xe726;</text>
			<view v-if="!sendFlag" class="btn" @click="sendMessage">
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
			<view class="list more" :style="{height:emojiHeight+'rpx'}">
				<view class="optionItem" @click="optionClick(1)">
					<view class="icon">
						<text class="iconfont">&#xe7be;</text>
					</view>
					<text class="item_text">相册</text>
				</view>
				<view class="optionItem" @click="optionClick(2)">
					<view class="icon">
						<text class="iconfont">&#xe601;</text>
					</view>
					<text class="item_text">拍摄</text>
				</view>
				<view class="optionItem" @click="optionClick(3)">
					<view class="icon">
						<text class="iconfont">&#xe662;</text>
					</view>
					<text class="item_text">位置</text>
				</view>
				<view class="optionItem" @click="optionClick(4)">
					<view class="icon">
						<text class="iconfont">&#xe66b;</text>
					</view>
					<text class="item_text">视频通话</text>
				</view>
				<view class="optionItem" @click="optionClick">
					<view class="icon">
						<text class="iconfont">&#xe656;</text>
					</view>
					<text class="item_text">红包</text>
				</view>
				<view class="optionItem" @click="optionClick">
					<view class="icon">
						<text class="iconfont">&#xe608;</text>
					</view>
					<text class="item_text">转账</text>
				</view>
				<view class="optionItem" @click="optionClick">
					<view class="icon">
						<text class="iconfont">&#xe61c;</text>
					</view>
					<text class="item_text">语音输入</text>
				</view>
			</view>
		</uv-popup>
		<uv-popup bgColor="none" class="audioBg" ref="audioAni">
			<view class="bg">
				<image class="img" :src="audioImg" mode="" :lazy-load="true"></image>
			</view>
		</uv-popup>
	</view>
</template>

<script setup>
	import Header from "@/component/header.vue";
	import request from "@/utils/request.js"
	import {
		getTimeFormat
	} from "@/utils/format.js"
	import emoji from "@/utils/emojs.js"
	import {
		onLoad,
		onShow,
	} from "@dcloudio/uni-app";
	import {
		ref,
		computed,
		onMounted,
		watch
	} from "vue";
	import {
		userStore
	} from "@/pinia/userInfo/userInfo.js"
	import {
		statusStore
	} from "@/pinia/userInfo/status.js"
	import {
		debounce,
		pathToBase64
	} from "@/utils/ablilty.js"

	import {
		mainUrl
	} from "@/utils/config.js"
	import {
		showMsg
	} from "@/utils/Toast.js"
	//录音
	import audioImg from "@/static/images/voice.gif"
	import audioShowImg from "@/static/images/voice_shop.png"
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	const userInfo = userStore();
	const statusInfo = statusStore();
	let foucsFlag = ref(false); //判断是否聚焦
	let emojiFlag = ref(false); //判断是否是表情包
	let optionFlag = ref(false); //判断是否是多功能
	const messages = ref([]); //消息列表
	//发送内容
	let newMessage = ref('')
	const isVoice = ref(false); //是否准备录音
	let voicePath = ref(''); //录音地址
	// 滚动栏的高度
	let wh = ref()
	let keyboardHeight = ref(0); //键盘高度
	let popup = ref(); //表情包实例
	let options = ref(); //多功能实例
	let audioAni = ref(); //录音实例

	let itemId = ref(); //朋友id
	// let itemAvatar = ref(); //朋友头像
	let emojiHeight = ref(531); //即是表情包弹出层的高度，也是功能选项弹出层高度
	// 传给头部标签的数据
	let objDate = ref({
		leftFont: 'icon-zuojiantou',
		title: '',
		path: '/pages/home/home'
	})

	let audioIndex = ref(-1) //判断点击了哪个语音
	let scrollTop = ref(0); //滚动距离
	let refreshFlag = ref(true); //是否开启下拉刷新
	let triggered = ref(false); //是否处触发下拉刷新
	let page = ref(1)
	let pageNum = ref(30);
	let total = ref(0) //总消息数
	let obj = ref({
		fromUid: userInfo.id,
		toUid: itemId.value ? itemId.value : 0,
		page: page.value,
		pageNum: pageNum.value
	})

	let scrollHeight = ref(99999999)
	// 触底事件
	function scrollBottom() {
		setTimeout(() => {
			scrollHeight.value += 1;
			scrollTop.value += scrollHeight.value;
		}, 20)
	}
	// 点击头像去friend的detail页面
	function goDetail() {
		uni.navigateTo({
			url: `/pages/detail/detail?id=${itemId.value}`
		})
	}
	watch(messages, (val) => {
		messages.value.forEach(item => {
			if (item.type === 3) {
				item.address.markers = [{
					id: 1,
					width: 10,
					height: 10,
					latitude: item.latitude,
					longitude: item.longitude,
					iconPath: '/static/images/address.png'
				}];
			}
		});
	}, {
		deep: true,
		immediate: true
	});
	onShow(() => {
		recorderManager.onStop(function(res) {
			voicePath.value = res.tempFilePath;
			let objs = {
				fromUid: userInfo.id,
				toUid: itemId.value,
				message: voicePath.value,
				type: 2,
				createTime: Date.now(),
				status: 0,
				audioTime: ''
			}
			let time = Math.ceil((Date.now() - starTime.value) / 1000);
			objs.avatar = userInfo.avatar;
			objs.audioTime = time;
			messages.value.push(objs)
			pathToBase64(res.tempFilePath)
				.then(base64 => {
					objs.message = base64;
					statusInfo.socket?.emit("getChatVoice", objs);
					scrollBottom()
				}).catch(err => {
					showMsg("信息错误")
				})
		});
		scrollBottom();
	})

	// 触发下拉加载事件
	function onSrcollTop(e) {
		triggered.value = true;
		refreshFlag.value = true;
		let num = page.value * pageNum.value;
		if (messages.value.length > 20) { //这里给个判断，不然消息很少也会触发提示
			if (messages.value.length == 0 || num > total.value) {
				triggered.value = false;
				refreshFlag.value = false;
				return showMsg('已经没有数据了')
			}
		}
		page.value += 1;
		obj.value.page = page.value;
		getChatList(obj.value)
	}

	onLoad(async (option) => {
		getHeight();
		itemId.value = option.id; //toUserId
		objDate.value.title = option.remarked;
		obj.value.fromUid = userInfo.id
		obj.value.toUid = option.id
		obj.value.page = page.value;
		obj.value.pageNum = pageNum.value
		getChatList(obj.value);
		statusInfo.socket?.on('msgNotice', data => {
			//判断消息是否展示在当前页面
			if (data.toUid == userInfo.id && itemId.value == data.fromUid) {
				data.avatar = statusInfo.avatar
				messages.value.push(data)
				scrollBottom()
			}
		})
	})
	// 判断是否显示发送
	const sendFlag = computed(() => {
		if (newMessage.value == '') {
			return true
		} else {
			return false
		}
	})
	// 获取聊天数据
	function getChatList(obj) {
		statusInfo.socket?.emit("getMsgList", obj);
	}
	// 接收服务器返回来的数据
	statusInfo.socket?.on('msgList', (msgs) => {
		if (msgs.total == 0) {
			setTimeout(() => {
				triggered.value = false;
				refreshFlag.value = false;
			}, 1000)
		}
		total.value = msgs.total;
		msgs.data.forEach((item) => {
			if (item.fromUid == userInfo.id) {
				item.avatar = userInfo.avatar
			} else {
				item.avatar = statusInfo.avatar
			}
		})
		if (messages.value.length == 0) {
			messages.value = msgs.data;
			triggered.value = false;
			refreshFlag.value = false;
			return scrollBottom()
		} else {
			setTimeout(() => {
				messages.value = msgs.data;
				triggered.value = false;
				refreshFlag.value = false;
			}, 1000)
		}
	})


	// 处理时间日期显示
	function getTime(time, index) {
		if (index == 0) {
			return getTimeFormat(Number(time))
		} else {
			//上一条消息的时间戳
			let preTime = messages.value[index - 1].createTime
			let preT = (time - preTime) / 1000
			if (preT > 5 * 60) {
				return getTimeFormat(Number(time))
			} else {
				return ''
			}
		}
	}
	// 获取键盘高度
	function getInputHeight(e) {
		if (e.detail.height != 0) {
			keyboardHeight.value = parseInt(e.detail.height) * 2 - 25;
			emojiHeight.value = parseInt(e.detail.height) * 2 - 25;
		}
	}
	// 获取消息列表高度
	function getHeight() {
		const val = uni.getSystemInfoSync();
		// #ifdef APP-PLUS
		wh.value = val.windowHeight - 150;
		// #endif
		// #ifdef H5
		wh.value = val.windowHeight - 120;
		// #endif
	}
	// 判断键盘的状态
	function closeKeyBorder(e) {
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
			const val = uni.getSystemInfoSync()
			// #ifdef APP-PLUS
			wh.value = 420;
			// #endif
			// #ifdef H5
			wh.value = 300
			// #endif
		}
		scrollBottom();
	}

	// 点击功能合集里面的选项
	function optionClick(type) {
		if (type == 1) {
			// console.log('我是相册');
			selectImg('album')
		} else if (type == 2) {
			selectImg('camera')
			// console.log("我是拍摄");
		} else if (type == 3) {
			// console.log("我是位置");
			sendAddress()
		} else if (type == 4) {
			uni.navigateTo({
				url: `/pages/videoCall/videoCall?fromId=${userInfo.id}&toUid=${itemId.value}&type=4`
			})
			// console.log("我是视频通话");
		} else {
			showMsg("功能尚未开发")
		}
	}
	let starTime = ref(''); //录音开始时间
	// 改变语音标志
	function transForm() {
		isVoice.value = !isVoice.value
	}
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
			// #ifdef APP-PLUS
			wh.value = 420;
			// #endif
			// #ifdef H5
			wh.value = 300
			// #endif
		} else {
			emojiFlag.value = false;
			keyboardHeight.value = 10;
			foucsFlag.value = true;
			popup.value.close();
		}
		scrollBottom()
	}
	// 打开多功能弹出层
	function openOption() {
		scrollBottom()
		if (optionFlag.value == false) {
			foucsFlag.value = false;
			emojiFlag.value = false;
			optionFlag.value = true;
			popup.value.close();
			keyboardHeight.value = 531;
			options.value.open('bottom');
			// #ifdef APP-PLUS
			wh.value = 420;
			// #endif
			// #ifdef H5
			wh.value = 300
			// #endif

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
	//发送文本消息
	const sendMessage = () => {
		if (newMessage.value == '') return showMsg('你还未输入内容')
		let objs = {
			fromUid: userInfo.id,
			toUid: itemId.value,
			message: newMessage.value,
			type: 0, //0为文本，1为图片，2为语音，3为位置
			createTime: Date.now(),
			status: 0
		}
		statusInfo.socket?.emit("chat", objs);
		// statusInfo.socket.emit("chat", objs);
		objs.avatar = userInfo.avatar;
		if (messages.value.length % 30 == 0) {
			page.value += 1
		}
		messages.value.push(objs)
		newMessage.value = ''
		scrollBottom()
	};
	// 相册或拍摄
	function selectImg(type) {
		let objs = {
			fromUid: userInfo.id,
			toUid: itemId.value,
			message: '图片',
			type: 1,
			createTime: Date.now(),
			status: 0
		}
		uni.chooseImage({
			sizeType: ['compressed'], //这个不能写，否则手机端会出现问题
			sourceType: [type],
			success: function(res) {
				uni.getImageInfo({
					src: res.tempFilePaths[0],
					success: function(image) {
						pathToBase64(image.path)
							.then(base64 => {
								objs.message = base64;
								objs.avatar = userInfo.avatar;
								messages.value.push(objs);
								statusInfo.socket?.emit("getChatImg", objs);
								scrollBottom()
								newMessage.value = ''
							})
							.catch(error => {
								console.error(error)
							})

					}
				});
			}
		});

	}

	// 图片预览
	function previewImg(url) {
		// 预览和保存图片
		uni.previewImage({
			urls: [url],
			longPressActions: {
				itemList: ['保存图片'],
				success: function(data) {
					uni.saveImageToPhotosAlbum({
						filePath: url,
						success: function() {
							console.log('save success');
						}
					});
				},
				fail: function(err) {
					console.log(err.errMsg);
				}
			}
		});
	}


	/**
	 * 语音功能
	 * */
	//开始录音
	function startRecord(e) {
		starTime.value = Date.now()
		//console.log('开始录音');
		recorderManager.start();
		audioAni.value.open('center');
	}
	//录音结束
	function touchEnd(e) {
		recorderManager.stop();
		audioAni.value.close();
	}
	//播放录音
	function playVoice() {
		console.log('播放录音');
		if (voicePath.value) {
			innerAudioContext.src = voicePath.value;
			innerAudioContext.play();
		}
	}
	// 动态切换语音状态
	function changeStatus(message, index) {
		console.log(message, index);
		audioIndex.value = index;
		innerAudioContext.src = message;
		innerAudioContext.play();
		innerAudioContext.onEnded(() => {
			recorderManager.stop();
			audioIndex.value = -1;
		})
	}
	// 获取位置
	function sendAddress() {
		uni.chooseLocation({
			success: function(res) {
				let obj = {
					fromUid: userInfo.id,
					toUid: itemId.value,
					message:"位置",
					type: 3,
					createTime: Date.now(),
					status: 0,
					latitude: res.latitude,
					longitude: res.longitude,
					address: {
						descript: res.address
					}
				}
				messages.value.push(obj);
				statusInfo.socket?.emit('getLocal', obj)
				scrollBottom()
			}
		});
	}
	/**
	 * 地图位置
	 * */
	function openMap(info) {
		console.log(info);
		uni.openLocation({
			latitude: info.latitude, //要去的纬度-地址
			longitude: info.longitude, //要去的经度-地址
			address: info.address.descript
		})
	}
</script>

<style lang="less" scoped>
	:deep(.uni-scroll-view-refresh-inner) {
		background-color: transparent;
		box-shadow: none;
	}

	// :deep(.uni-scroll-view-refresh__spinner > circle) {
	// 	color: #d1d1d1 !important;
	// }

	.box {
		height: 100vh;
		box-sizing: border-box;
		padding: 15rpx 0;
		background-color: #f5f5f5;
		font-family: STKaiti;

		.container {
			padding: 8rpx 30rpx 0;

			.iconfont {
				font-size: 50rpx;
			}
		}

		.divide {
			margin: 10rpx 0 0;
			height: 1rpx;
			// height: 100px;
			background-color: #e6e6e6;
		}

		.infoList {
			padding: 10rpx 30rpx;
		}

		.scroll {
			box-sizing: border-box;

			.messageList {
				display: flex;
				flex-direction: column;
				color: #000;
				margin-bottom: 25rpx;

				.time {
					margin: 10rpx 0;

					.time_text {
						text-align: center;
						margin: 10rpx 0;
						font-size: 25rpx;
						color: #5e5e5e;
					}
				}

				.info {
					flex: 1;
					display: flex;

					.img {
						height: 80rpx;
						width: 80rpx;
						border-radius: 10rpx;
						overflow: hidden;
					}

					.content {
						position: relative;
						box-sizing: border-box;
						min-height: 80rpx;
						max-width: 70%;
						border-radius: 10rpx;
						margin-left: 20rpx;
						font-size: 30rpx;
						background-color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;

						&::before {
							display: block;
							content: "";
							position: absolute;
							left: -25rpx;
							top: 28rpx;
							width: 0;
							height: 0;
							border: 6px solid transparent;
							border-right: 12rpx solid #fff;
						}

						text {
							// padding: 10rpx 20rpx;
							padding: 10rpx 15rpx;
						}

						image {
							width: 35rpx;
							height: 30rpx;
							margin-right: 0rpx;
							margin-left: 15rpx;
						}
					}

					.contentImg {
						flex: 1;
						margin-left: 20rpx;
						min-height: 80rpx;
						max-width: 70%;
						min-width: 30%;

						.imgMsg {
							width: 100%;
						}
					}
				}

				.right {
					display: flex;
					justify-content: flex-end;

					.contentImg {
						flex: 1;
						margin-right: 20rpx;
					}

					.content {
						position: relative;
						margin-left: 0;
						margin-right: 20rpx;
						background-color: #95ec69;

						image {
							transform: rotateY(180deg);
							margin-right: 15rpx;
							margin-left: 0rpx;
						}

						&::before {
							left: 100%;
							border: 7px solid transparent;
							border-left: 14rpx solid #95ec69;
						}
					}
				}
			}

			// .menuList:last-child {
			// 	margin-bottom: 0;
			// }
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
			align-items: center;
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

		.more {
			padding-bottom: 20rpx;

			.optionItem {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 25rpx;

				.icon {
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #fff;
					width: 90rpx;
					height: 90rpx;
					border-radius: 20rpx;
					margin-bottom: 10rpx;

					.iconfont {
						font-size: 45rpx;
					}
				}
			}

			.optionItem:nth-child(n+5) {
				margin-bottom: 40rpx;
			}
		}
	}

	.audioBg {
		.bg {
			margin-top: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #55ffff;
			width: 400rpx;
			height: 150px;
			border-radius: 20rpx;

			.img {
				width: 50%;
				height: 50%;
			}
		}

	}
</style>