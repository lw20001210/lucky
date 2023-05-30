<template>
  <view class="container">
    <stastuBar></stastuBar>
    <view class="header">
      我是视频页
    </view>
    <map style="width: 100%; height: 300px;" :latitude="59" :longitude="111" covers:="[{
				latitude: 39.909,
				longitude: 116.39742,
				iconPath: '../../../static/location.png'
			}, {
				latitude: 39.90,
				longitude: 116.39,
				iconPath: '../../../static/location.png'
			}]" ></map>
  </view>
</template>
<script setup>
  import stastuBar from '@/component/statusBar.vue'
</script>

<style scoped lang="scss">

</style>