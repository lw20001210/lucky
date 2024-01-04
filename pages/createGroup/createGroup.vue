<template>
	<view class="container">
		<Header :obj="objDate"></Header>
		<view class="title">
			<image class="img" src="../../static/images/groupAvatar.jpg" mode=""></image>
			<uv-input maxlength="30" fontSize="22+'rpx'" placeholderStyle="{fontSize:22+'rpx'}" placeholder="填写群名称" border="bottom" v-model="searchValue" @input="input"></uv-input>
		</view>
	</view>
	<view class="divide"></view>
	<view class="type" @click="warn">
		<view class="left">
			群类型:	<text>暂无选择</text>
		</view>
		<view class="right">
			<text class="iconfont size">&#xe612;</text>
		</view>
	</view>
	<view class="divide"></view>
	<view class="introduce">
		<view class="descirpt">群简介</view>
		<uv-textarea textStyle="fontSize:30rpx;color:black"  placeholderStyle="fontSize:26rpx" v-model="areaValue" @input="areaInput" count placeholder="介绍一下自己群吧"></uv-textarea>
	</view>
	<view class="operate">
		<uv-button @click="createGroup" shape="circle" color="#3e6fac" text="创建" :customStyle="customStyle"></uv-button>
	</view>
</template>

<script setup>
	import {ref,computed} from "vue";
	import Header from "@/component/header.vue";
	import {debounce} from "@/utils/ablilty.js";
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
	const statusInfo = statusStore();
	const userInfo=userStore();
	let objDate = ref({
		leftFont: 'icon-zuojiantou',
		title: '创建群聊',
	})
	let searchValue = ref('');//输入框的值
	let areaValue=ref('');//文本域的值
	// 自定义样式
	const customStyle = computed(() => {
		return {
			width: "250rpx"
		}
	})
	const input=debounce((e)=>{
		//console.log(e,"我是输入框");
		//console.log(searchValue.value,33);
	},1000)
	const areaInput=debounce((e)=>{
		// console.log(e,"我是文本域");
		// console.log(areaValue.value,44);
	},1000)
	function warn(){
		showMsg("此功能尚未开发!")
	}
	async function createGroup(){
		let obj={
			nickname:searchValue.value,
			adminId:userInfo.id,
			intro:areaValue.value,
			groupUserIds:statusInfo.groupUserIds
		}
		let {data:res}=await request("/user/createGroup","post",obj);
		if(res.code!=200) return showMsg("创建失败")
		uni.switchTab({
			url:"/pages/home/home"
		})
	}
</script>

<style scoped lang="less">
	.container {
		padding: 15rpx 15rpx 0;
		font-family: STKaiti;
		.title{
			margin:30rpx 20rpx 20rpx;
			display: flex;
			.img{
				width: 90rpx;
				height: 100rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}
			:deep(.uv-input){
				align-items: flex-end;
			}
		}
	}
	.divide {
		height: 10rpx;
		background-color: #f2f2f2;
	}
	.type{
		font-family: STKaiti;
		padding: 0 35rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.left{
			text{
				font-size: 27rpx;
				color: #8d8d8d;
			}
		}
		.right{
			.size{
				font-size: 45rpx;
			}
		}
	}
	.introduce{
		font-family: STKaiti;
			padding: 15rpx 35rpx 0;
			.descirpt{
				margin-bottom: 10rpx;
			}
	}
	.operate{
		font-family: STKaiti;
		display: flex;
		justify-content: center;
		margin-top: 100rpx;
	}
</style>