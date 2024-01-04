<template>
	<view class="container">
		<Header :obj="objDate"></Header>
	</view>
	<view class="list">
		<template v-for="(item,index) in groupUserList" :key="item.id">
			<view class="userItem" v-if="index<17">
				<image :src="item.avatar" mode="" lazy-load></image>
				<text>{{item.remarked?item.remarked:item.nickname}}</text>
			</view>
		</template>
		<view class="userItem" @click="invite">
			<view class="content">
				<text class="iconfont size">&#xeb4f;</text>
			</view>
		</view>
		<view class="userItem" @click="removeFriend" v-if="groupLeaderId==userInfo.id">
			<view class="content">
				<text class="iconfont size">&#xe68e;</text>
			</view>
		</view>
	</view>
	<view class="divide">

	</view>
	<view class="introduce">
		<view class="item" @click="editInfo(1)">
			<text class="title">群名称</text>
			<view class="detail iconfont">
				<view class="default">
					{{groupInfo?.nickname}}
				</view>
				<text>&#xe612</text>
			</view>
		</view>
		<view class="item">
			<text class="title">群头像</text>
			<view class="detail iconfont">
				<uni-file-picker :del-icon="false" limit="1" :imageStyles="imageStyles" file-mediatype="image"
					@select="select" disable-preview return-type="object">
					<view class="photograph">
						&#xe634;
					</view>
				</uni-file-picker>
				<text>&#xe612</text>
			</view>
		</view>
		<view class="notice" @click="editInfo(2)">
			<text class="title">群公告</text>
			<view class="detail iconfont">
				<view class="default intro">
					{{groupInfo.intro}}
				</view>
				<text>&#xe612</text>
			</view>
		</view>
	</view>
	<view class="divide">

	</view>
	<view class="operate">
		<uv-button @click="warn" text="清空聊天记录" :customStyle="customStyle"></uv-button>
		<uv-button @click="removeGroup" text="解散群聊" :customStyle="customStyle"
			v-if="groupLeaderId==userInfo.id"></uv-button>
		<uv-button @click="exitGroup" text="退出群聊" :customStyle="customStyle" v-else></uv-button>
	</view>
	<!-- 输入框示例 -->
	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog ref="inputClose" mode="input" title="编辑群信息" placeholder="请输入"
			@confirm="dialogInputConfirm"></uni-popup-dialog>
	</uni-popup>
</template>

<script setup>
	import {
		ref,
		computed
	} from "vue";
	import {
		mainUrl
	} from "@/utils/config.js"
	import {
		onLoad,
		onShow,
	} from "@dcloudio/uni-app";
	import Header from "@/component/header.vue";
	import {
		debounce
	} from "@/utils/ablilty.js";
	import request from "@/utils/request.js";
	import {
		userStore
	} from "@/pinia/userInfo/userInfo.js"
	import {
		showMsg
	} from "@/utils/Toast.js"
	import {
		statusStore
	} from "@/pinia/userInfo/status.js"
	import {
		getLocal
	} from "@/utils/local.js";
	const statusInfo = statusStore();
	const userInfo = userStore();
	const inputDialog = ref();
	// 上传选中图片的样式数据
	let imageStyles = ref({
		width: 50,
		height: 50,
		border: {
			"radius": "50%"
		}
	})
	let objDate = ref({
		leftFont: 'icon-zuojiantou',
		title: '',
	})
	let searchValue = ref(''); //输入框的值
	let areaValue = ref(''); //文本域的值
	let groupId = ref(); //群Id
	let groupLeaderId = ref(); //群主id
	let groupUsers = ref([]); //群友列表
	let groupUserList = ref([]); //群友展示列表信息
	let groupInfo = ref({}); //群信息
	// 获取群友简单数据
	const getGroupUsers = async (groupId) => {
		let {
			data: res
		} = await request("/user/getGroupUsers", "get", {
			groupId,
			myId:userInfo.id
		})
		if (res.code != 200) {
			return showMsg("获取数据失败")
		} else {
			groupUsers.value = res.data;
			return res.data
		}
	}
	// 获取群友列表信息
	const getGroupUserList = async (groupId) => {
		let {
			data: res
		} = await request("/user/groupUserList", "get", {
			groupId,
			myId: userInfo.id
		})
		if (res.code != 200) {
			return showMsg("获取数据失败")
		} else {
			res.data.sort(function(a, b) {
				return a.createTime - b.createTime
			})
			console.log(res.data,566);
			groupUserList.value = res.data;
			return res.data
		}
	}
	// 获取群信息
	async function getGroupInfo(id) {
		let {
			data: res
		} = await request("/user/getGroupInfo", "get", {
			groupId: id
		})
		if (res.code != 200) return showMsg("数据获取失败")
		groupInfo.value = res.data;
		groupLeaderId.value = res.data?.adminId;
		console.log(1111);
	}
	onLoad(async (option) => {
		groupId.value = option.groupId;
		await getGroupInfo(option.groupId)
		await getGroupUsers(option.groupId);
		let userList = await getGroupUserList(option?.groupId);
		objDate.value.title = `群聊信息（${userList.length}）`;
	})
	// 自定义样式
	const customStyle = computed(() => {
		return {
			width: "100%",
			height: "100rpx",
			color: 'red'
		}
	})
	// 警告信息
	function warn() {
		showMsg("此功能尚未开发!")
	}

	function invite() {
		let ids = groupUserList.value.map(item => {
			return item.id
		})
		uni.navigateTo({
			url: `/pages/search/search?url=group&ids=${JSON.stringify(ids)}&groupId=${groupId.value}&count=${groupUserList.value.length}`
		})
	}

	function removeFriend() {
		let ids = groupUserList.value.map(item => {
			return item.id
		})
		uni.navigateTo({
			url: `/pages/search/search?remove=true&url=group&ids=${JSON.stringify(ids)}&groupId=${groupId.value}&count=${groupUserList.value.length}`
		})
	}
	// 选择头像
	function select(res) {
		console.log(res.tempFilePaths[0], 666);
		editInfo(3, res.tempFilePaths[0])
	}
	let typed = ref(0); //修改类型
	// 编辑群聊
	function editInfo(type, fileUrl) {
		if (type == 1) {
			// 群名
			typed.value = 1
			inputDialog.value.open()
		} else if (type == 2) {
			// 群公告
			if (groupLeaderId.value != userInfo.id) return showMsg("仅群主可编辑")
			typed.value = 2
			inputDialog.value.open()

		} else {
			let param = {
				groupId: groupId.value
			}
			console.log(fileUrl, 999);
			// 头像
			uni.uploadFile({
				url: `${mainUrl}/user//updateAvatar`,
				filePath: fileUrl,
				name: 'avatar',
				timeout: 1500,
				header: {
					authorization: getLocal('token') ? getLocal('token') : ""
				},
				formData: param,
				success: (res) => {
					showMsg('更新成功', 1000, 'loading')
					console.log(res);
				},
				fail: () => {
					showMsg('更新失败')
				}
			})

		}
	}
	// 确认编辑信息
	async function dialogInputConfirm(e) {
		console.log(e, typed.value);

		let obj = {
			groupId: groupId.value,
			typed: typed.value,
			message: e
		}
		let {
			data: res
		} = await request("/user/updateGroup", "put", obj)
		if (res.code != 200) return showMsg();
		getGroupInfo(groupId.value)
		inputDialog.value.close()
	}
	// 退出群聊
	async function exitGroup() {
		let {
			data: res
		} = await request("/user/exitGroup", "delete", {
			uid: userInfo.id,
			groupId: groupId.value
		})
		if (res.code != 200) return showMsg("退出群聊失败")
		showMsg("退出群聊成功", 1000, 'loading')
		uni.switchTab({
			url: "/pages/home/home"
		})
	}
	// 解散群聊
	async function removeGroup(){
		let {data:res}=await request("/user/removeGroup","delete",{
			groupId:groupId.value
		})
		if (res.code != 200) return showMsg("解散群聊失败")
		showMsg("解散群聊成功", 1000, 'loading')
		uni.switchTab({
			url: "/pages/home/home"
		})
	}
</script>

<style scoped lang="less">
	.container {
		padding: 15rpx 15rpx 0;

	}

	.divide {
		height: 12rpx;
		background-color: #f2f2f2;
	}

	.list {
		font-family: STKaiti;
		margin: 30rpx 0 10rpx;
		display: flex;
		flex-wrap: wrap;

		.userItem {
			width: 20%;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 25rpx;
			margin-bottom: 20rpx;

			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;
			}

			text {
				font-weight: bold;
			}
		}

		.userItem:nth-last-child(-n+2) {
			.content {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;
				background: #3e6fac;

				.size {
					font-size: 75rpx;
					color: #fff;
					font-weight: normal;
				}
			}

		}
	}

	.introduce {
		font-family: STKaiti;
		padding: 15rpx 30rpx 0;

		.title {
			font-size: 34rpx;
		}

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 30rpx 0;

			.detail {
				display: flex;
				align-items: center;

				.default {
					font-size: 28rpx;
					color: #818181;
				}

				text {
					font-size: 45rpx;
				}
			}
		}

		.notice {
			margin-bottom: 20rpx;

			.notice {
				margin-bottom: 10rpx;
			}

			.detail {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.default {
					font-size: 28rpx;
					color: #818181;
				}

				.intro {
					font-size: 26rpx;
				}

				text {
					text-align: right;
					width: 80rpx;
					font-size: 45rpx;
				}
			}
		}
	}

	.operate {
		font-family: STKaiti;
	}
</style>