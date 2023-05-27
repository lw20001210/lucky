<template>
  <view class="container">
    <view class="bg">
       <stastuBar class="important"></stastuBar>
      <view class="content">
        <Header :obj="headObj">
          <template #right>
            <text @click="goSendDynamic"  class="iconfont icon-xiangji" style="font-size: 50rpx;"></text>
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
 <view class="default">
   <view class="left">
     <text>今天</text>
   </view>
   <view class="right">
     <view class="rImg">
      <text @click="goSendDynamic" class="iconfont icon-xiangji"></text>
     </view>
     <text class="vir">今天写点什么呢...</text>
   </view>
 </view>
    </view>
    <view class="detail" v-else>
      有
    </view>
  </view>
</template>

<script setup>
  import Header from "@/component/header.vue";
  import stastuBar from '@/component/statusBar.vue';
  import {userStore} from "@/pinia/userInfo/userInfo.js"
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
    onLoad
  } from '@dcloudio/uni-app';
  onLoad(() => {
    userPower.getUserInfo()
  })
  import {
    storeToRefs
  } from 'pinia';
  const {
    avatar,
    nickname,
  } = storeToRefs(userPower);
  function goSendDynamic(){
    uni.navigateTo({
    	url: '/pages/sendDynamic/sendDynamic'
    });
  }
</script>

<style scoped lang="scss">
  .container {
    .bg {
       position: relative;
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
        position:fixed;
        top: 380rpx;
        right: 30rpx;
        text{
          margin-right: 10rpx;
          margin-top: 20rpx;
          color: white;
          font-size: 28rpx
        }
        .imgBg {
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
    .none,.detail {
       font-family:'华文楷体';
    margin: 30rpx;
    .default{
    height: 100rpx;
  display: flex;
  .left{
    text{
      font-size: 50rpx;
      font-weight: normal;
      font-family:'华文楷体';
    }
  }
  .right{
    margin-left: 50rpx;
   display: flex;
    .rImg{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100rpx;
      height: 100rpx;
      border-radius: 10rpx;
      background-color: #2680eb;
      flex-shrink: 0;
      text{
        font-size: 60rpx
      }
    }
    .vir{
      color: rgb(102, 102, 102);
      font-size: 30rpx;
      margin:5rpx 0 0 15rpx;
    }
  }
    }
    }
  }
</style>