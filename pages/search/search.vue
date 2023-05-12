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
  :deep(.uni-searchbar[data-v-f07ef577]){
    margin: 20rpx;
  }
:deep(.uni-searchbar__cancel[data-v-f07ef577]){
 width: 90rpx;
}
</style>