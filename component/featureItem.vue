<template>
  <view class="menuList">
    <view class="left">
      <view class="imgBg" :style="{backgroundColor:objData.bgColor?objData.bgColor:''}">
        <view class="iconfont size" :class="objData.textFont"></view>
      </view>
      <text>{{objData.title}}</text>
    </view>
    <view class="right">
      <view class="iconfont">&#xe612</view>
    </view>
  </view>
</template>
<script setup>
  const props = defineProps(['objData']);
</script>

<style scoped lang="scss">
  .menuList {
    display: flex;
    height: 100rpx;
    padding: 0 10rpx;
    justify-content: space-between;
    align-items: center;
    margin: 25rpx 0;
    background-color: white;
    .left {
      display: flex;
      align-items: center;
      width: 250rpx;
      justify-content: space-between;

      .imgBg {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100rpx;
        height: 100rpx;
        border-radius: 20rpx;

        .size {
          font-size: 48rpx;
        }
      }
    }

    .right {
      .iconfont {
        font-size: 56rpx
      }
    }
  }
</style>