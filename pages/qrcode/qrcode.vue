<template>
  <view class="body" :style="{backgroundImage:`url(${codeImg})`,backgroundSize: 'cover'}">
    <view class="container">
      <Header :obj="headObj">
      <!--  slot="right"这种用法已经被废弃 -->
      <template #right >
          <button @click="warning" style="border: 0; font-size: 30rpx; color: black; margin-left:-30rpx;" plain>分享</button>
      </template>
      </Header>
      <view class="qrcode">
        <view class="info">
         <view class="img">
            <image :src="avatar"></image>
         </view>
          <div class="content">
            <text class="t">{{nickname}}</text>
            <text class="b">账号：{{username}}</text>
          </div>
        </view>
        <view class="show">
          <image :src="qrcode" mode=""></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import request from "@/utils/request.js"
  import {
    userStore
  } from '@/pinia/userInfo/userInfo.js';
  import Header from "@/component/header.vue";
import {
    showMsg
  } from '@/utils/Toast.js'
  import {
    onLoad
  } from '@dcloudio/uni-app';
  import {
    ref
  } from 'vue';
  // 传递给header组件的数据
  let headObj = ref({
    leftFont: 'icon-zuojiantou',
    title: '我的二维码',
    rightFont: '分享',
    path: '/pages/star/star'
  });
  let userPower = new userStore();
  import {
    storeToRefs
  } from 'pinia';
  const {
    avatar,
    nickname,
    username,
    id
  } = storeToRefs(userPower);
  let qrcode = ref()
  function warning() {
    // console.log(1);
     showMsg('该功能尚未开发')
  }
  onLoad(async () => {
    let {
      data: res
    } = await request('/user/createQrcode', 'post', {
      username: username.value
    })
    // console.log(res);
    qrcode.value = res.data
  })
  // 直接存标签上给图片手机上是获取不到的。所以我们用js获取
  import img from "@/static/img/bg.jpg"
  let codeImg=ref()
  codeImg.value=img
 
</script>

<style scoped lang="scss">
  page {
   .body{
     width:100vw;
     height: 100vh;
   }
  }
  .container {
    padding: 15rpx 20rpx 0;

    .qrcode {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 700rpx;
      width: 600rpx;
      border-radius: 30rpx;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;


      .info {
        margin-left: 80rpx;
        margin-top: 30rpx;
        display: flex;
        height: 100rpx;

        .img{
          width: 90rpx;
          height: 90rpx;
          image{
            width: 100%;
            height: 100%;
            border-radius: 10rpx;
          }
        }

        .content {
          margin-left: 20rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .t {
            font-weight: bolder;
            font-size: 30rpx;
          }

          .b {
            font-size: 25rpx;
            color: gray;
          }
        }
      }
      .show{
      width: 600rpx;
      height: 600rpx;
   position: relative;
      image{
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
      }
      }
    }
  }
</style>