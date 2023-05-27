<template>
  <view class="container">
    <Header :obj="headObj"></Header>
  </view>
  <view class="content">
    <view class="have" v-if="List.length!=0">

    </view>
    <view class="none" v-else>
      <image :src="codeImg" mode="widthFix"></image>
      <text>空空如也</text>
      <text class='small'>这里好安静呀！等你的朋友躁动起来吧</text>
    </view>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  import Header from "@/component/header.vue"
  let headObj = ref({
    leftFont: 'icon-zuojiantou',
    title: '系统通知',
    path: '/pages/star/star'
  })
  let List = ref([])
  import img from "@/static/images/sys.png";
  let codeImg = ref()
  codeImg.value = img
</script>

<style scoped lang="scss">
  .container {
    padding: 20rpx 25rpx 0;
  }
  .none{
    display: flex;
    flex-direction: column;
    margin-top: 320rpx;
    text-align: center;
    image{
      margin: auto;
      width: 330rpx;
    }
    text{
      margin-top: 10rpx;
      font-weight: 600;
    }
    .small{
       font-weight:normal;
      font-size:27rpx;
      color: #A6A6A6;
    }
  }
</style>