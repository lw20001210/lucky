<template>
	<view class="menuList">
		<view class="imgBg">
			<image :src="avatar" mode=""></image>
		</view>
		<view class="describe">
			<text style="font-size: 28rpx;">{{nickname}}</text>
			<text class='username'>在线<text class="autograph">
					<slot>别让自己在该奋斗的年纪选择安逸</slot>
				</text></text>
		</view>
	</view>
</template>

<script setup>
	import {
		userStore
	} from '@/pinia/userInfo/userInfo.js';
	const userPower = new userStore();
	import {
		storeToRefs
	} from 'pinia';
	const {
		avatar,
		nickname
	} = storeToRefs(userPower)
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