<template>
  <view class="container">
    <Header :obj="headObj"></Header>
    <view>
      <uni-search-bar class="uni-mt-10" radius="5" placeholder="搜索" clearButton="auto" cancelButton="none" />
    </view>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  import Header from "@/component/header.vue"
  // 传递给header组件的数据
  let headObj = ref({
    leftFont: 'icon-zuojiantou',
    title: '我的群聊',
    rightFont: '创建',
    path: '/pages/linkman/linkman'
  })
</script>

<style scoped lang="scss">
  .container {
    padding: 15rpx 20rpx 0;

  }
</style>