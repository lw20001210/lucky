<template>
	<view class="container">
		<view class="bg">
			<stastuBar class="important"></stastuBar>
			<view class="content">
				<Header :obj="headObj">
					<template #left>
						<text class="iconfont size">&#xeb4e;</text>
					</template>
					<template #center>
						<text style="font-size: 30rpx;color: #fff;">个人空间</text>
					</template>
					<template #right>
						<text @click="goSendDynamic" class="iconfont icon-xiangji color"
							style="font-size: 50rpx"></text>
					</template>
				</Header>
				<view class="avatar">
					<text class="rootName">{{nickname}}</text>
					<view class="imgBg">
						<image :src="avatar"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="none">
			<view class="default">
				<view class="left">
					<text>今天</text>
				</view>
				<view class="right">
					<view class="rImg">
						<text @click="goSendDynamic" class="color iconfont icon-xiangji"></text>
					</view>
					<text class="vir">今天写点什么呢...</text>
				</view>
			</view>
		</view>
		<view class="detail" v-if="totalList!=[]">
			<scroll-view scroll-y="true" :style="{height: wh+'px'}">
				<view class="spaces" v-for="(item,index) in totalList" :key="item.id">
					<view class="left">
						<image :src="avatar" mode=""></image>
					</view>
					<view class="right">
						<text class="remarked">{{nickname}}</text>
						<text>{{item.content.title}}</text>
						<view class="imgs" v-if="item.content.imgArr.length!=0">
							<template v-for="(img,inde) in item?.content?.imgArr" :key="inde">
								<image @click="preView(inde,item?.content.imgArr)" :src="img" :style="{ 
					      width: item?.content.imgArr.length == 1 ? '90%' : (item?.content.imgArr.length == 2 ? '38%' : '32%'),
					   height: item?.content.imgArr.length <= 3 ? '100%' : (item?.content.imgArr.length <= 6 ? '48%' : '32%'),
					  }">
								</image>
							</template>
						</view>
						<view class="options">
							<view class="desc">
								<text>{{dayFormat(item.createTime)}}</text>
								<text v-if="item.position">{{item.position}}</text>
							</view>
							<view class="editBox">
								<view class="boxLt" :class="{imp:index==flag}">
									<view class="optionContent">
										<view class="l" @click="changeLike(item.id)">
											赞<text class="iconfont"
												:class="[prepare(item.likes)?'icon-aixin1':'icon-aixin']"></text>
										</view>
										<view class="c" @click="validate(item)">
											评论<text class="iconfont">&#xe66c</text>
										</view>
										<view class="r" @click="removeItem(item.id,item.uid)">
											删除<text class="iconfont">&#xe8b6;</text>
										</view>
									</view>
								</view>
								<view class="boxRt iconfont" @click="editContent(index)">
									&#xe6dd;
								</view>
							</view>
						</view>
						<view class="showInfo" v-if="item.likes.length!=0">
							<text class="iconfont pad">&#xeb47;</text>
							<text v-for="(val, index) in item.likes" :key="val.id">{{ index > 0 ? ',' : '' }}
								{{ val.remarked }}</text>
						</view>
						<!-- 	<view class="showInfo" v-if="commentList.length!=0">
							<view class="comments" v-for="(item,i) in commentList">
							<text v-for="(val,key) in item">{{key}} : {{val}}</text>
							</view>
						</view> -->
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
	<!-- 评论功能弹窗 -->
	<view class="popul" v-if="foucsFlag" :style="{bottom: keyboardHeight+'rpx' }">
		<input @input="handleInput" maxlength="500" placeholder="评论" class="input"
			@keyboardheightchange="closeKeyBorder" type="text" @focus="getInputHeight" :adjust-position="false"
			:focus="foucsFlag" :value="comment" />
		<view class="btn" @click="acheveComment">
			发送
		</view>
	</view>

</template>
<script setup>
	import Header from "@/component/header.vue";
	import stastuBar from '@/component/statusBar.vue';
	import {
		userStore
	} from "@/pinia/userInfo/userInfo.js"
	import {
		ref,
		computed,
	} from 'vue';
	import {
		showMsg
	} from "../../utils/Toast"
	import request from "@/utils/request.js"
	import {
		dayFormat
	} from "@/utils/format.js"
	const userPower = new userStore();
	import {
		debounce
	} from "@/utils/ablilty.js"
	let comment = ref(''); //评论内容
	// 编辑框的实例对象
	let inputDialog = ref();
	let foucsFlag = ref(false)
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		storeToRefs
	} from 'pinia';

	const {
		avatar,
		nickname,
		id,
	} = storeToRefs(userPower);
	let flag = ref('a')
	let headObj = ref({
		leftFont: 'icon-zuojiantou-copy',
		title: '',
		rightFont: '',
		path: '/pages/star/star'
	});
	let totalList = ref([])

	function goSendDynamic() {
		uni.navigateTo({
			url: '/pages/sendDynamic/sendDynamic'
		});
	}
	// 滚动栏的高度
	let wh = ref()

	function getHeight() {
		const val = uni.getSystemInfoSync()
		wh.value = val.windowHeight - 360
	}

	function prepare(status) {
		if (status.length == 0) return false;
		let result = status.find(item => {
			return item.uid == id.value
		})
		if (result == undefined) {
			return false
		} else {
			return true
		}
	}
	// 发起请求
	onLoad(() => {
		getHeight();
		userPower.getUserInfo()
		getmySpaceInfo()
	})
	async function getmySpaceInfo() {
		let {
			data: res
		} = await request('/user/getMySpaceInfo', 'get', {
			id: userPower.id
		})
		totalList.value = res.data.reverse()
		// console.log(totalList.value, 888);
	}
	// 判断点击了哪个编辑框
	function editContent(index) {
		if (flag.value == index) {
			flag.value = 'a'
		} else {
			flag.value = index;
		}
	}
	// 改变点赞的状态
	async function changeLike(spaceId) {
		let {
			data: res
		} = await request("/user/updateLike", "post", {
			id: spaceId,
			uid: id.value
		})
		// console.log(res);
		if (res.code == 200) {
			getmySpaceInfo()
			flag.value = 'a'
		}
	}
	// 删除朋友圈
	async function removeItem(spaceId, spaceUid) {
		let {
			data: res
		} = await request('/user/deleteSpace', 'delete', {
			id: spaceId,
		});
		if (res.code == '200') {
			showMsg(res.msg, 1500, 'loading');
			this.getmySpaceInfo(spaceUid)
		} else {
			return showMsg('删除动态失败')
		}
	}
	// 图片预览
	function preView(index, imgArr) {
		uni.previewImage({
			current: index,
			urls: imgArr,
			loop: true,
			indicator: "default"
		})
	}
	let temporary = ref({})
	//点击了评论 让键盘聚焦显示
	function validate(info) {
		console.log(info, 66666);
		temporary.value=info;
		foucsFlag.value = true;
		flag.value = 'a'
	}
	let keyboardHeight = ref(0)
	// 获取键盘高度
	function getInputHeight(e) {
		if (e.detail.height != 0) {
			keyboardHeight.value = parseInt(e.detail.height) * 2 - 20;
			console.log(keyboardHeight.value);
		}
	}
	// 判断键盘的关闭
	function closeKeyBorder(e) {
		console.log(e.detail);
		flag.value = 'a'
		if (e.detail.height == 0) {
			foucsFlag.value = false;
			keyboardHeight.value = 10;
		}
	}

	const debouncedInputChange = debounce(function inputChange(val) {
		console.log(val);
		comment.value=val
	}, 1000); // 使用防抖函数包装inputChange
	const handleInput = (e) => {
		debouncedInputChange(e.detail.value); // 调用防抖函数处理@input事件
	};
	let commentList = ref([]);
 function acheveComment() {
		//如果点击了确定
		if (comment.value=="") {
			showMsg("评论不能为空")
		}else{
			let obj={
				uid:temporary.value.uid,
				commentId:temporary.value.uid,
				spaced:temporary.id
			}
			console.log(2);
		}
			
	}
</script>

<style scoped lang="scss">
	.container {
		.icon-aixin1 {
			color: red;
		}

		.size {
			font-size: 55rpx;
		}

		.bg {
			position: relative;
			height: 450rpx;
			width: 100%;
			background: url('@/static/images/spaceBg.jpg') no-repeat;
			background-size: cover;
			overflow: visible;
		}

		.content {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			padding: 15rpx 30rpx 0;
			overflow: visible;

			.avatar {
				display: flex;
				position: absolute;
				top: 380rpx;
				right: 30rpx;

				.rootName {
					margin-right: 10rpx;
					margin-top: 20rpx;
					color: white;
					font-size: 28rpx
				}

				.imgBg {
					width: 115rpx;
					height: 115rpx;
					position: relative;

					image {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						border-radius: 15rpx;
						object-fit: cover;
					}
				}
			}
		}

		.none,
		.detail {
			font-family: '华文楷体';
			margin: 70rpx 30rpx 0;

			.default {
				height: 100rpx;
				display: flex;

				.left {
					text {
						font-size: 50rpx;
						font-family: '华文楷体';
					}
				}

				.right {
					margin-left: 50rpx;
					display: flex;

					.rImg {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 100rpx;
						height: 100rpx;
						border-radius: 10rpx;
						background-color: #2680eb;
						flex-shrink: 0;

						text {
							font-size: 60rpx
						}
					}

					.vir {
						color: rgb(102, 102, 102);
						font-size: 30rpx;
						margin: 5rpx 0 0 15rpx;
					}
				}
			}
		}

		.detail {
			margin-top: 20rpx;
			font-family: STKaiti;


			.spaces {
				display: flex;
				margin: 70rpx 0;

				.left {
					width: 90rpx;
					height: 90rpx;
					border-radius: 10rpx;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.right {
					margin-left: 10rpx;
					flex: 1;
					display: flex;
					flex-direction: column;

					text {
						font-size: 30rpx;
					}

					.remarked {
						font-size: 30rpx;
						color: #746ba7;
						font-weight: bold;
					}

					.imgs {
						height: 500rpx;

						image {
							margin: 2rpx 5rpx -6rpx 0;
						}
					}

					.options {
						margin-top: 25rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.desc {
							display: flex;
							flex-direction: column;

							text {
								color: #797979;
								font-size: 28rpx;
								width: 300rpx;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
						}

						.editBox {
							display: flex;
							justify-content: space-between;
							align-items: center;
							height: 70rpx;

							.boxRt {
								font-size: 40rpx;
								background-color: #f7f7f7;
								padding: 1rpx 5rpx;
								display: flex;
								justify-content: center;
								height: 50rpx;
								align-items: center;
								margin-top: 5rpx;
							}

							.boxLt {
								transform: translateX(220rpx);
							}

							.imp {
								transform: translateX(0);
								transition: all .5s;
								width: 220rpx;
								height: 70rpx;
								color: #fff;
								background-color: rgba(76, 76, 76);
								border-radius: 10rpx;
								font-size: 20rpx;

								.optionContent {
									display: flex;
									align-items: center;
									height: 100%;

									.l,
									.c,
									.r {
										flex: 1;
										display: flex;
										flex-direction: column;
										justify-content: center;
										align-items: center;
										// width: 50%;
										// text-align: center;
									}
								}

							}

						}
					}

					.showInfo {
						overflow: hidden;
						background-color: #f7f7f7;
						padding: 12rpx 15rpx;
						box-sizing: border-box;
						width: 100%;
						font-weight: bold;
						font-size: 28rpx;
						color: #746ba7;
						margin-top: 10rpx;
						border-radius: 10rpx 10rpx 0 0;

					}
				}
			}
		}
	}

	.popul {
		position: fixed;
		left: 0;
		right: 0;
		// bottom: 500rpx;
		font-family: STKaiti;
		padding: 10rpx 30rpx;
		display: flex;
		align-items: center;
		background-color: #f2f2f2;

		.input {
			padding: 15rpx;
			background-color: #fff;
			border-radius: 10rpx;
			width: 600rpx;
		}

		.btn {
			width: 120rpx;
			height: 70rpx;
			line-height: 70rpx;
			margin-left: 10rpx;
			text-align: center;
			background-color: #1aa5fc;
			border-radius: 15rpx;
			color: #fff;
		}
	}
</style>