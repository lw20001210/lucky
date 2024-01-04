<template>
	<view class="container">
		<statusBar v-if="!groupFlag"></statusBar>
		<Header :obj="objDate" v-if="groupFlag">
		</Header>
		<uni-search-bar :focus="true" v-model="searchValue" @input="input" @cancel="cancel">
		</uni-search-bar>
		<view class="itemList">
			<view class="title">
				<view class="active">联系人</view>
				<view class="fixed" @click="showMore" v-if="!groupFlag"><text>更多 </text>
					<text class="iconfont size">&#xe612</text>
				</view>
			</view>
		</view>
		<scroll-view v-if="userList.length!=0" class="scroll" scroll-y="true" :style="{height: wh+'px'}">
			<view class="content" v-if="!groupFlag">
				<view class="itemContent" v-for="item in moreContent">
					<view class="left">
						<view class="avatar">
							<image mode="aspectFill" :src="item.avatar"></image>
						</view>
						<view class="descript">
							<text v-if="item.id==userPower.id">{{item.nickname}}</text>
							<text v-else-if="!item.remarked">{{item.nickname}}</text>
							<text v-else>{{item.remarked}}</text>
							<text>账号:{{item.username}}</text>
						</view>
					</view>
					<view class="right" @click="apply(item)">
						{{formatContent(item)}}
					</view>
				</view>
			</view>
			<view class="groupContent" v-else>
				<uv-checkbox-group @change="change" v-model="resultDate" placement="column">
					<uv-checkbox v-for="item in moreContent" :name="item.id"
						:disabled="(inviteFlag || removeFlag) && optionCheck(item.id)" shape="circle" class="check"
						activeColor="#19be6b">
						<view class="avatar">
							<image mode="aspectFill" :src="item.avatar"></image>
						</view>
						<view class="descript">
							<text v-if="item.id==userPower.id">{{item.nickname}}</text>
							<text v-else-if="!item.remarked">{{item.nickname}}</text>
							<text v-else>{{item.remarked}}</text>
						</view>
					</uv-checkbox>
				</uv-checkbox-group>
			</view>
		</scroll-view>
		<view class="btns" v-if="groupFlag">
			<uv-button @click="createGroup" :customStyle="customStyle" color="#5ac725" class="btn" type="primary">完成
				<text v-if="selectObj!=0">({{selectObj}})</text></uv-button>
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
	import Header from "@/component/header.vue";
	import loginVue from '../login/login.vue'
	const userPower = new userStore();
	import {
		storeToRefs
	} from 'pinia';
	const {
		id
	} = storeToRefs(userPower);
	let searchValue = ref()
	let userList = ref([]); //所有用户数据
	let flag = ref(false);
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		statusStore
	} from "@/pinia/userInfo/status.js"
	const statusInfo = statusStore();
	let groupFlag = ref(false); //判断是否是搜索添加群聊好友
	let objDate = ref({
		leftFont: 'icon-zuojiantou',
		title: '创建群聊',
	})
	let allUser = ref([])
	const customStyle = computed(() => {
		return {
			height: "60rpx",
			padding: "0 20rpx"
		}
	})

	function change(e) {
		console.log(e, 4444);
	}
	// 滚动栏的高度
	let wh = ref()

	function getHeight() {
		const val = uni.getSystemInfoSync()
		// 要减去tabbar的高度和搜索栏的高度
		// #ifdef APP-PLUS
		if (groupFlag.value) {
			wh.value = val.windowHeight - 210;
		} else {
			wh.value = val.windowHeight - 160;
		}
		// #endif
		// #ifdef H5
		if (groupFlag.value) {
			wh.value = val.windowHeight - 160;
		} else {
			wh.value = val.windowHeight - 100;
		}
		// #endif
	}
	let inviteFlag = ref(false); //是否是邀请好友进群
	let removeFlag = ref(false)
	let groupId = ref();
	let count = ref();
	let checkedIds = ref([]); //群主邀请好友的初始数据
	onLoad(async (option) => {
		let {
			data: res
		} = await request('/user/searchAllUser', 'get');
		allUser.value = res.data;
		let result = await getList();
		// console.log(idList.value,222);
		if (option?.url == "group") {
			groupFlag.value = true;
			if (option?.ids) {
				if (option.remove) {
					removeFlag.value = true
				} else {
					inviteFlag.value = true;
				}

				groupId.value = option.groupId;
				count.value = option.count

				let result = JSON.parse(option.ids).filter(item => {
					return item != userPower.id
				})
				//let result = JSON.parse(option.ids)
			//	console.log(result,2223);
				resultDate.value = result;
				checkedIds.value = result;
				//	console.log(resultDate.value, 999);
			}
			getHeight()
		} else {
			getHeight()
		}
	// 如果不是群主邀请而是群员邀请
		if(groupId.value!==userPower.id){
			idList.value=idList.value.filter(item=>{
				return item!=userPower.id
			})
			let selectObj=[];
			checkedIds.value.forEach(item=>{
				if(idList.value.includes(item)){
					selectObj.push(item)
				}
			})
			resultDate.value = selectObj;
			checkedIds.value = selectObj;
		//	console.log(selectObj,999);
		}
	//	console.log(idList.value,222);
		if (groupFlag.value) {
			userList.value = result.filter(item => {
				return item.id != userPower.id
			})
			// console.log(userList.value, 8899);
		} else {
			userList.value = result;
		}

	})
	let idList = ref([]); //判断是否是添加还是发信息
	// 因为一进入页面要展示所有好友数据，所以我把它单独封装一下
	async function getList() {
		let {
			data: res
		} = await request("/user/getFriendList", "get", {
			id: id.value
		})
		if (res.code != 200 || res.code == 404) return false;
		idList.value = res.data.map(item => {
			return item.id
		})
		if (res.code != 200) return showMsg()
		return res.data
	}
	const moreContent = computed(() => {
		if (groupFlag.value) {
			return userList.value
		} else {
			return flag.value ? userList.value : userList.value.filter((item, i) => {
				return i < 4
			})
		}

	})

	async function input(inputUser) {
		if (inputUser == '') {
			let result = await getList()
			if (!groupFlag.value) {
				userList.value = result;
			}
		} else {
			let result = await getList()
			if (groupFlag.value) {
				userList.value = result.filter(item => {
					return item.username.includes(inputUser) && id.value != item.id
				})
				console.log(userList.value, 777);
			} else {
				// 所有用户
				// let firstData = [...allUser.value, ...res.data];
				let firstData = [...allUser.value, ...result];
				// console.log(firstData, 1111);
				let secondData = Array.from(firstData.reduce((map, obj) => map.set(obj.id, obj), new Map()).values());
				// console.log(secondData, 2222);
				userList.value = [...secondData].filter(item => {
					return item.username.includes(inputUser)
				})
				console.log(userList.value, 444);
			}
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
		flag.value = !flag.value;
	}
	//进入申请页面
	function apply(item) {
		if (Object.values(idList.value).includes(item.id)) {
			// console.log(item, 22);
			statusInfo.avatar = item.avatar;
			if (item.id == id.value) {
				uni.navigateTo({
					url: `/pages/chat/chat?id=${item.id}&remarked=${item.nickname}`
				})
			} else {
				uni.navigateTo({
					url: `/pages/chat/chat?id=${item.id}&remarked=${item.remarked}`
				})
			}

		} else {
			uni.navigateTo({
				url: `/pages/addFriend/addFriend?username=${item.username}`
			});
		}
	}
	let resultDate = ref([]); //群聊被选中的数据
	const selectObj = computed(() => {
		console.log(resultDate.value.length);
		return resultDate.value.length - checkedIds.value.length
	})
// 判断哪些禁选
	function optionCheck(id) {
		if (checkedIds.value.includes(id)) {
			if (removeFlag.value) {
				return false
			} else {
				return true
			}

		} else {
			if (removeFlag.value) {
				return true
			} else {
				false
			}

		}
	}
	// 邀请好友去重操作
	function getUniqueElements(arr1, arr2) {
		let uniqueArr = [...new Set([...arr1, ...arr2])];
		return uniqueArr.filter(x => !arr2.includes(x));
	}

	// 点击完成
	async function createGroup() {
		if (inviteFlag.value) {
			if (checkedIds.value.length == resultDate.value.length) return showMsg("你还未选择")
			let data = getUniqueElements(resultDate.value, checkedIds.value);
			let {
				data: res
			} = await request("/user/inviteFriend", "post", {
				groupId: groupId.value,
				data
			})
			console.log(res, 6666);
			uni.navigateTo({
				url: `/pages/groupInfo/groupInfo?groupId=${groupId.value}`
			})
		} else if (removeFlag.value) {
			if (checkedIds.value.length == resultDate.value.length) return showMsg("你还未选择")
			console.log("我是删除好友");
			let result = [];
			checkedIds.value.forEach(item => {
				if (!resultDate.value.includes(item)) {
					result.push(item)
				}
			})
			let {
				data: res
			} = await request("/user/removeGroupUser", "delete", {
				groupId: groupId.value,
				result
			})
			if (res.code != 200) return showMsg("踢出群聊失败")
			uni.navigateTo({
				url: `/pages/groupInfo/groupInfo?groupId=${groupId.value}`
			})
		} else {
			statusInfo.groupUserIds = [];
			statusInfo.groupUserIds = resultDate.value;
			uni.navigateTo({
				url: "/pages/createGroup/createGroup"
			});
		}
	}
</script>

<style scoped lang="less">
	.container {
		//	position: relative;
		padding: 15rpx 15rpx 0;

		.btns {
			background-color: #f5f5f5;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.btn {
				color: #5ac725;
				padding: 5rpx 10rpx;
				margin-right: 30rpx;
			}
		}

		.uni-searchbar {
			padding-left: 10rpx;
		}

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 25rpx;
			padding: 0 5rpx 18rpx 15rpx;
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

		.scroll {
			// background-color: pink;
		}

		.groupContent {
			padding: 0 20rpx;

			.avatar {
				margin: 0 20rpx;
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}

			}

			:deep(.uv-checkbox__label-wrap) {
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			.check {
				margin: 20rpx 0;
			}
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