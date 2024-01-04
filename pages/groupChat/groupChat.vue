<template>
	<view class="container">
		<Header :obj="headObj">
			<template #right>
				<text @click="goSearch">创建</text>
			</template>
		</Header>
		<view>
			<uni-search-bar class="uni-mt-10" radius="5" placeholder="搜索" clearButton="auto" cancelButton="none" />
		</view>
		<view class="groupList" :style="{height: wh+'px'}">
			<view class="groupItem" v-for="(item,index) in groupList" :key="index" @click="goChat(item)">
				<image :lazy-load="true" class="img" :src="item.avatar?item.avatar:groupAvatar"  mode=""></image>
				<view class="info">
					<text>{{item.nickname}}</text>
					<text>{{item.intro}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import Header from "@/component/header.vue"
	import {
		ref
	} from 'vue';
	import request from "@/utils/request.js"
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	import {
		showMsg
	} from "../../utils/Toast";
	import {
		userStore
	} from '@/pinia/userInfo/userInfo.js';
	import groupAvatar from "@/static/images/groupAvatar.jpg";
	const userInfo = userStore()
	// 传递给header组件的数据
	let headObj = ref({
		leftFont: 'icon-zuojiantou',
		title: '我的群聊',
	})
	let groupList = ref([])
	let wh=ref('')
	function getHeight() {
		const val = uni.getSystemInfoSync()
		// 要减去tabbar的高度和搜索栏的高度
		// #ifdef APP-PLUS
		wh.value = val.windowHeight - 140
		// #endif
		// #ifdef H5
		wh.value = val.windowHeight - 120;
		// #endif
	}
	onLoad(async () => {
		getHeight() 
		let {
			data: res
		} = await request("/user/getGroupList", "get", {
			uid: userInfo.id
		})
		if (res.code != 200) return showMsg()
		console.log(res.data, 999);
		groupList.value=res.data;
	})
	const goSearch = () => {
		uni.navigateTo({
			url: '/pages/search/search?url=group',
		});
	}
	const goChat=(item)=>{
		uni.navigateTo({
			url: `/pages/chat/chat?groupId=${item.id}&groupName=${item.nickname}`
		})
	}
</script>

<style scoped lang="scss">
	.container {
		padding: 15rpx 20rpx 0;
		.groupList{
			.groupItem{
				display: flex;
				padding: 15rpx 0;
				.img{
					width: 100rpx;
					height: 100rpx;
					border-radius: 10rpx !important;
					overflow: hidden;
				}
				.info{
					flex:1;
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					//background-color: skyblue;
					font-size: 30rpx;
					text{
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
				text:last-child{
					font-size: 26rpx;
					color: #585858;
				}
			}
		}
	}
</style>