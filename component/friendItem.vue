<template>
	<view class="menuList">
		<view class="imgBg" @click="goDetail(obj)">
			<image :lazy-load="true" :src="obj.avatar" mode=""></image>
		</view>
		<view class="describe">
			<text style="font-size: 28rpx;">{{obj.remarked}}</text>
			<text class='username'>{{obj.status==1?'在线':'离线'}}<text class="autograph">
					{{obj.signature}}
				</text></text>
		</view>
	</view>
</template>

<script setup>
	
	import {defineProps} from 'vue';
	const props = defineProps(['obj'])
	// console.log(props.obj.status);
	function goDetail(obj){
		//console.log(obj);
		uni.navigateTo({
			url: `/pages/detail/detail?id=${obj.id}`
		})
	}
</script>
<style scoped lang="scss">
	.menuList {
		display: flex;
		height: 100rpx;
		padding: 0 10rpx;
		align-items: center;
		justify-content: flex-start !important;
		margin: 25rpx 0;
		font-family: STKaiti;
		// background-color: #4867bf;

		.imgBg {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100rpx;
			height: 100rpx;
			overflow: hidden;
			border-radius: 20rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.describe {
			height: 100rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-left: 20rpx;

			.username {
				font-size: 28rpx;
				color: #4867bf;
			}

			.autograph {
				color: #939393;
				font-size: 25rpx;
				padding-left: 10rpx;
			}
		}
	}
</style>