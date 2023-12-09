<template>
	<view class="container">
		<view class="bg">
			<stastuBar class="important"></stastuBar>
			<view class="content">
				<Header :obj="headObj">
					<template #left>
						<text class="iconfont size">&#xeb4e;</text>
					</template>
					<template #right>
						<text class="iconfont icon-xiangji" style="font-size: 50rpx;"></text>
					</template>
				</Header>
				<view class="avatar">
					<text>{{nickname}}</text>
					<view class="imgBg">
						<image :src="avatar"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="none" v-if="List.length==0">
			<view class="plane icon-zhifeiji_fabu iconfont">
			</view>
			暂无动态发布
		</view>
		<view class="detail" v-else>
			<scroll-view scroll-y="true" :style="{height: wh+'px'}">
				<view class="spaces" v-for="(item,index) in List" :key="item.id">
					<view class="left" @click="goInfo(item.uid)">
						<image :src="item.avatar" mode=""></image>
					</view>
					<view class="right">
						<text class="remarked">{{item.remarked}}</text>
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
									</view>
								</view>
								<view class="boxRt iconfont" @click="editContent(index)">
									&#xe6dd;
								</view>
							</view>
						</view>
						<view class="showInfo" v-if="item.likes.length!=0">
							<text class="iconfont pad">&#xeb47;</text> <text v-for="(val, index) in item.likes"
								:key="val.id">
								{{ index > 0 ? ',' : '' }} {{ val.remarked }}
							</text>
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
</template>

<script setup>
	import Header from "@/component/header.vue";
	import stastuBar from '@/component/statusBar.vue';
	import {
		userStore
	} from "@/pinia/userInfo/userInfo.js"
	import request from "@/utils/request.js"
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		dayFormat
	} from "@/utils/format.js"
	import {
		showMsg
	} from "../../utils/Toast";
	let List = ref([])
	// 传递给header组件的数据
	let headObj = ref({
		leftFont: 'icon-zuojiantou-copy',
		title: '',
		rightFont: '',
		path: '/pages/star/star'
	});
	const userPower = new userStore();
	import {
		storeToRefs
	} from 'pinia';
	const {
		avatar,
		nickname,
		id
	} = storeToRefs(userPower);
	let flag = ref('a'); //控制编辑按钮的开关
	function goInfo(uid) {
		uni.navigateTo({
			url: `/pages/detail/detail?id=${uid}`
		})
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
	onLoad(() => {
		getHeight();
		getList()
	})
	async function getList() {
		let {
			data: res
		} = await request("/user/getFriendDynamicList", "get", {
			id: userPower.id
		})
		if (res.code != 200) {
			return showMsg()
		} else {
			if (res.data.length != 0) {
				List.value = res.data.reverse()
			}
		}
		//console.log(List.value, 55);
	}
	// 滚动栏的高度
	let wh = ref()

	function getHeight() {
		const val = uni.getSystemInfoSync()
		wh.value = val.windowHeight - 270
	}
	// 判断点击了哪个编辑框
	function editContent(index) {
		//console.log(index);
		if (flag.value == index) {
			flag.value = 'a'
		} else {
			flag.value = index;
		}
	}
	// 更新点赞状态
	async function changeLike(spaceId) {
		let {
			data: res
		} = await request("/user/updateLike", "post", {
			id: spaceId,
			uid: id.value
		})
		// console.log(res);
		if (res.code == 200) {
			getList()
		}
	}

	function prepare(status) {
		//console.log(status,19);
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
</script>

<style scoped lang="scss">
	.container {
		position: relative;

		.size {
			font-size: 55rpx;
		}

		.bg {
			height: 450rpx;
			width: 100%;
			background: url('@/static/images/bgg.jpg') no-repeat;
			background-size: cover;
			margin-bottom: 40rpx;
		}

		.content {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			padding: 15rpx 30rpx 0;

			.avatar {
				z-index: 99;
				display: flex;
				position: fixed;
				top: 380rpx;
				right: 30rpx;

				text {
					margin-right: 10rpx;
					margin-top: 20rpx;
					color: white;
					font-size: 28rpx
				}

				.imgBg {
					width: 115rpx;
					height: 115rpx;
					position: relative;
					overflow: hidden;
					// background-color: #3e6fac;
					border-radius: 15rpx;

					image {
						width: 100%;
						height: 100%;
						object-fit: cover;
						position: absolute;
					}
				}
			}
		}

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
			padding: 0 25rpx;
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
								width: 350rpx;
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
								transform: translateX(200rpx);
							}

							.imp {
								transform: translateX(0);
								transition: all .5s;
								width: 200rpx;
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
									{
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
					background-color: #f7f7f7;
					padding: 12rpx 15rpx;
					width: 100%;
					font-weight: bold;
					font-size: 28rpx;
					color: #746ba7;

					pad {
						padding-left: 0 5rpx;
					}
				}
			}
		}
	}
	}
</style>