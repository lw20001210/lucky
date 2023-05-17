<template>
  <view class="container">
    <view class="none" v-if="applyList">
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
  import {
    ref
  } from 'vue'
  let applyList = ref([])
</script>

<style scoped lang="scss">
  .container {
    padding: 15rpx 20rpx 0;
    font-family: STKaiti;

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