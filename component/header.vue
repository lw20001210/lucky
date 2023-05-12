<template>
  <statusBar></statusBar>
  <view class="header">
    <view class="left" @click="goBack">
      <text class="iconfont" :class="obj.leftFont"></text>
    </view>
    <view class="center">
    {{obj.title}}
    </view>
    <view class="right iconfont" :class="obj.rightFont?obj.rightFont:''">
    </view>
  </view>
</template>

<script setup>
  import statusBar from "@/component/statusBar.vue";
  // 返回上一级
  function goBack() {
    uni.switchTab({
      url: '/pages/star/star'
    });
  }
  const props = defineProps(['obj'])
  
  console.log(props.obj)
</script>

<style scoped lang="scss">
  .header {
     font-family: STKaiti;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .center {
      width: 200rpx;
    }

    .iconfont {
      font-size: 50rpx;
    }
  }
</style>