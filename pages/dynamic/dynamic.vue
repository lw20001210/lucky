<template>
  <view class="container">
    <view class="bg">
      <stastuBar class="important"></stastuBar>
      <view class="content">
        <Header :obj="headObj">
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
    <view class="none" v-if="List">
      <view class="plane icon-zhifeiji_fabu iconfont">
      </view>
      暂无好友申请
    </view>
    <view class="detail" v-else>
      有
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
    ref
  } from 'vue';
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
  } = storeToRefs(userPower);
</script>

<style scoped lang="scss">
  .container {
    position: relative;

    .bg {
      height: 450rpx;
      width: 100%;
      background: url('@/static/images/bgg.jpg') no-repeat;
      background-size: cover;
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
          // display: flex;
          // justify-content: center;
          // align-items: center;
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
  }
</style>