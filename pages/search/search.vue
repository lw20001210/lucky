<template>
  <view class="container">
    <statusBar></statusBar>
    <uni-search-bar :focus="true" v-model="searchValue" @input="input" @cancel="cancel">
    </uni-search-bar>
  </view>
</template>
<script setup>
  import statusBar from '@/component/statusBar.vue'
  import {
    ref
  } from 'vue'
  let searchValue = ref()

  function input(res) {
    console.log('----input:', res)
  }
  function cancel(res) {
    console.log(1);
   uni.navigateBack()
  }
</script>

<style scoped lang="scss">
  .container{
    margin-left: 15rpx;
    margin-right: 15rpx;
  }
</style>