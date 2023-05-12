<template>
  <view class="menuList">
    <view class="left">
      <div class="imgBg">
        <image :src="avatar" mode=""></image>
      </div>
      <view class="describe">
        <text>{{nickname}}</text>
        <text class='username'>在线</text>
      </view>
    </view>
    <view class="right">
      <view class="iconfont">&#xe612</view>
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
    justify-content: space-between;
    align-items: center;
    margin: 25rpx 0;
    font-family: STKaiti;

    .left {
      display: flex;
      align-items: center;
      width: 240rpx;
      justify-content: space-between;

      .imgBg {
        display: flex;
        justify-content: center;
        align-items: center;
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
        display: flex;
        flex-direction: column;
        justify-content: center;

        .username {
          font-size: 28rpx;
          color: #4867bf;
        }
      }
    }

    .right {
      .iconfont {
        font-size: 56rpx
      }
    }
  }
</style>