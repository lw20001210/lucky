<template>
  <statusBar></statusBar>
  <view class="header">
    <view class="left" @click="goBack">
      <text class="iconfont" :class="obj.leftFont"></text>
    </view>
    <view class="center">
    {{obj.title}}
    </view>
    <view class="right">
      {{obj.rightFont}}
    </view>
  </view>
</template>

<script setup>
  import statusBar from "@/component/statusBar.vue";
   const props = defineProps(['obj'])
   console.log(props.obj);
  // 返回上一级
  function goBack() {
    uni.switchTab({
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