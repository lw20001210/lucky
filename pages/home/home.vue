<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <statusBar></statusBar>
    <view class="navBar">
      <view class="left">
        <view class="avatar">
          <image class='img' :src="userPower.avatar"></image>
        </view>
        <view class="header_title">
          <text class="header_logo">{{userPower.nickname}}</text>
        </view>
      </view>
      <view class="right"><text class="iconfont size" @click="openPopup">&#xe615</text>
      </view>
    </view>
    <!-- 下拉菜单 -->
    <view class="header_downup" @click="close" :animation="animationData">
      <view class="wrap">
        <view class="downup_item" @click="goSearch">
          <view class="iconfont">&#xe75c</view>
          <text>添加好友</text>
        </view>
        <view class="downup_item">
          <view class="iconfont">&#xe616</view>
          <text>创建群聊</text>
        </view>
        <view class="downup_item">
          <view class="iconfont">&#xe605</view>
          <text>创建小组</text>
        </view>
        <view class="downup_item">
          <view class="iconfont">&#xe8b5</view>
          <text>扫一扫</text>
        </view>
      </view>
    </view>
    <scroll-view class="scroll" scroll-y="true" :style="{height: wh+'px'}">
      <!-- 搜索区域 -->
      <view @click="goSearch">
        <uni-search-bar placeholder="搜索" :readonly="true"></uni-search-bar>
      </view>
      <uni-list :border="false">
        <!-- 显示圆形头像 -->
        <uni-list-chat :avatar-circle="true" :title="userPower.nickname" :avatar="userPower.avatar" note="您收到一条新的消息"
          time="2020-02-02 20:20"></uni-list-chat>
        <!-- 右侧带角标 -->
        <uni-list-chat title="uni-app" avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          note="您收到一条新的消息" time="2020-02-02 20:20" badge-text="12"></uni-list-chat>
        <!-- 头像显示圆点 -->
        <uni-list-chat title="uni-app" avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          note="您收到一条新的消息" time="2020-02-02 20:20" badge-positon="left" badge-text="dot"></uni-list-chat>
        <!-- 头像显示角标 -->
        <uni-list-chat title="uni-app" avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          note="您收到一条新的消息" time="2020-02-02 20:20" badge-positon="left" badge-text="99"></uni-list-chat>
        <!-- 显示圆形头像 -->
        <uni-list-chat :avatar-circle="true" title="uni-app"
          avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" note="您收到一条新的消息"
          time="2020-02-02 20:20"></uni-list-chat>
        <!-- 右侧带角标 -->
        <uni-list-chat title="uni-app" avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          note="您收到一条新的消息" time="2020-02-02 20:20" badge-text="12"></uni-list-chat>
        <!-- 头像显示圆点 -->
        <uni-list-chat title="uni-app" avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          note="您收到一条新的消息" time="2020-02-02 20:20" badge-positon="left" badge-text="dot"></uni-list-chat>
        <!-- 头像显示角标 -->
        <uni-list-chat title="uni-app" avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          note="您收到一条新的消息" time="2020-02-02 20:20" badge-positon="left" badge-text="99"></uni-list-chat>
        <!-- 显示圆形头像 -->
        <uni-list-chat :avatar-circle="true" title="uni-app"
          avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" note="您收到一条新的消息"
          time="2020-02-02 20:20"></uni-list-chat>
        <!-- 右侧带角标 -->
        <uni-list-chat title="uni-app" avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          note="您收到一条新的消息" time="2020-02-02 20:20" badge-text="12"></uni-list-chat>
        <!-- 头像显示圆点 -->
        <uni-list-chat title="uni-app" avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          note="您收到一条新的消息" time="2020-02-02 20:20" badge-positon="left" badge-text="dot"></uni-list-chat>
        <!-- 头像显示角标 -->
        <uni-list-chat title="uni-app" avatar="https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          note="您收到一条新的消息" time="2020-02-02 20:20" badge-positon="left" badge-text="99"></uni-list-chat>
      </uni-list>
    </scroll-view>
  </view>
</template>
<script setup>
  import {
    setLocal,
    getLocal
  } from '@/utils/local.js'
  import {
    ref,
    onMounted,
    watch,
    watchEffect
  } from 'vue';
  import statusBar from "@/component/statusBar.vue"
  // import searchModel from '@/component/searchModel.vue';
  import friendItem from "@/component/friendItem.vue"
  import {
    userStore
  } from '@/pinia/userInfo/userInfo.js';
  import loginVue from '../login/login.vue';
  import {
    onLoad
  } from '@dcloudio/uni-app';
  let animationData = ref({}) //响应动画数据
  let animation = ref(null); //创建动画对象
  let isShow = ref(false); //判断下拉框
  const userPower = new userStore();
  // 打开菜单
  function openPopup() {
    if (!animation.value) {
      animation.value = uni.createAnimation({
        duration: 200,
        transformOrigin: 'top right',
        timingFunction: 'ease',
      });
    }
    const animationValue = animation.value;
    if (isShow.value) {
      animationValue.opacity(0).width(0).height(0).step();
      isShow.value = false;
    } else {
      animationValue.opacity(1).width('300rpx').height('428rpx').step();
      isShow.value = true;
    }
    animationData.value = animationValue.export();
  }
  // 关闭菜单
  function close() {
    if (!animation.value) return;
    animation.value.opacity(0).width(0).height(0).step();
    animationData.value = animation.value.export();
    isShow.value = false;
  }
  // 滚动栏的高度
  let wh = ref()

  function getHeight() {
    const val = uni.getSystemInfoSync()
    // 要减去tabbar的高度和搜索栏的高度
    wh.value = val.windowHeight - 80
  }
  onMounted(() => {
    getHeight();
  })
  const goSearch = () => {
    uni.navigateTo({
      url: '/pages/search/search',
    });
  }
  onLoad(() => {
    userPower.getUserInfo()
  })
</script>
<style scoped lang="scss">
  .container {
    margin: 0 30rpx;
    height: 100%;

    .navBar {
      margin-top: 15rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }

    .left {
      display: flex;
      align-items: center;
      margin-left: 9rpx;

      .avatar {
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        overflow: hidden;

        .img {
          width: 100%;
          height: 100%;
          background-color: red;
        }
      }

      .header_title {
        padding-left: 10rpx;

        .header_logo {
          font-size: 25rpx;
          font-weight: normal;
          font-stretch: normal;
          color: #707070;
          font-family: STKaiti;
        }
      }
    }

    .size {
      font-size: 40rpx;
    }

    .header_downup {
      position: absolute;
      top: 150rpx;
      right: 21rpx;
      z-index: 99;
      background-color: #fff;
      text-align: left;
      padding-left: 40rpx;
      box-sizing: border-box;
      background-color: rgba(76, 76, 76);
      width: 0;
      height: 0;
      opacity: 0;
      // width: 300rpx;
      // height: 428rpx;
      // opacity: 1;
      border-radius: 20rpx;
      box-shadow: 10rpx 10rpx 40rpx #ccc;
      overflow: hidden;

      .wrap {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }

      .downup_item {
        display: flex;
        align-items: center;
        font-family: '华文楷体';
        font-size: 32rpx;
        font-weight: normal;
        color: #fff;
        text-overflow: ellipsis;
        white-space: nowrap;

        view {
          font-size: 42rpx;
        }

        text {
          margin-left: 10rpx;
        }
      }
    }

    .scroll {
      margin-top: 10rpx;
      overflow: hidden;
      padding: 0;
    }
  }
</style>