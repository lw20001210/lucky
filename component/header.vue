<template>
  <statusBar></statusBar>
  <view class="header">
    <view class="left" @click="goBack">
    <slot name="left"><text class="iconfont" :class="obj.leftFont"></text></slot>
    </view>
    <view class="center">
   <slot name="center">{{obj.title}}</slot>
    </view>
    <view class="right">
      <slot name="right">{{obj.rightFont}}</slot>
    </view>
  </view>
</template>

<script setup>
import { defineProps} from 'vue';
  import {
      showMsg
    } from '@/utils/Toast.js'
  import statusBar from "@/component/statusBar.vue";
   const props = defineProps(['obj'])
   // console.log(props.obj);
  // 返回上一级
  function goBack() {
    uni.reLaunch({
      url: props.obj.path
    });
  }
</script>

<style scoped lang="scss">
  .header {
   font-family: STKaiti;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .center {
      width: 200rpx;
      text-align:center;
    }
    .iconfont {
      font-size: 50rpx;
    }
  }
</style>