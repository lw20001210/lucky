<template>
  <view class="container">
    <stastuBar class="important"></stastuBar>
    <view class="bg">
      <view class="menuList">
        <view class="left">
          <div class="imgBg">
            <image :src="avatar"></image>
          </div>
          <view class="describe">
            <text>{{nickname}}</text>
            <text class='username'>签名:巅峰留不住</text>
          </view>
        </view>
        <view class="right">
          <view class="iconfont">&#xe6e5</view>
        </view>
      </view>
    </view>
  </view>
  <view class="divide">
  </view>
  <view class="content">
    <template v-for="(item,i) in obj" :key="item.title">
      <featureItem @click="ability(item.title)" class="itmes" :objData="item"></featureItem>
      <view class="divide" v-if="i%2!=1">
      </view>
    </template>
  </view>
</template>

<script setup>
  import stastuBar from '@/component/statusBar.vue'
  import featureItem from '@/component/featureItem.vue'
  import {
    userStore
  } from '@/pinia/userInfo/userInfo.js';
  import {
    showMsg
  } from '@/utils/Toast.js'
  const userPower = new userStore();
  import {
    storeToRefs
  } from 'pinia';
  const {
    avatar,
    nickname
  } = storeToRefs(userPower);
  import {
    ref
  } from 'vue'
  let obj = ref([{
    textFont: 'icon-icon6',
    title: '编辑资料',
    bgColor: '#1db856'

  }, {
    textFont: 'icon-tubiaozhizuomoban-',
    title: '好友动态',
    bgColor: ' #5a69f1'
  }, {
    textFont: 'icon-dongtai',
    title: '个人空间',
    bgColor: '#1db856'

  }, {
    textFont: 'icon-tongzhizhongxin',
    title: '系统通知',
    bgColor: '#1db856'
  }, {
    textFont: 'icon-tuichu',
    title: '退出登录',
    bgColor: '#f15a8a'
  }]);

  function ability(val) {
    switch (val) {
      case '退出登录':
        uni.showModal({
          title: '提示',
          content: '是否退出登录?',
          cancelText: '关闭',
          confirmText: '同意',
          success: function(res) {
            if (res.confirm) {
              showMsg('退出登录中', 1000, 'loading')
              setTimeout(()=>{
                uni.navigateTo({
                  url: `/pages/login/login?username=${userPower.username}`,
                  animationType: 'pop-in',
                  animationDuration: 200
                });
              },500)
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
        break;
      case '编辑资料':
        uni.navigateTo({
          url: '/pages/editUser/editUser'
        });
    }
  }
</script>

<style scoped lang="scss">
  .container {
    padding: 15rpx 25rpx 0;
    background-color: #3e6fac;
    font-family: STKaiti;
    .important {
      background-color: #3e6fac;
    }

    .bg {
      width: 100%;
      height: 358rpx;
      background: url('@/static/images/bg.png') no-repeat;
      background-size: cover;
    }

    .title {
      text-align: center;
      margin: 12rpx 0 22rpx;
    }

    .menuList {
      display: flex;
      height: 112rpx;
      padding: 0 10rpx;
      justify-content: space-between;
      align-items: center;
      margin-top: 200rpx;

      .left {
        display: flex;
        align-items: center;
        width: 600rpx;

        .imgBg {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 112rpx;
          height: 112rpx;
          background-color: #3e6fac;
          border-radius: 15rpx;
          border: 0;

          image {
            width: 100%;
            height: 100%;
          }

          .size {
            font-size: 48rpx;
          }
        }

        .describe {
          display: flex;
          flex-direction: column;
          margin-left: 30rpx;
          color: #fff;
          z-index: 99;
          width: 300rpx;
          justify-content: space-around;

          .username {
            font-size: 26rpx;
            /* 块级元素;  也可以是 inline-block */
            display: block;
            /* 设置超出内容隐藏 */
            overflow: hidden;
            /* 设置文本超出内容隐藏 */
            text-overflow: ellipsis;
            /*  溢出不换行 */
            white-space: nowrap;
          }
        }
      }

      .right {
        .iconfont {
          font-size: 56rpx
        }
      }
    }
  }
  .content {
    // background-color: #f2f2f2;
    font-family: STKaiti;
    // padding: 0 30rpx;
    .divide {
      height: 20rpx;
      background-color: #f2f2f2;
    }
  }

  // :deep(.menuList .left .imgBg[data-v-887da2a3]){方
  //   border-radius: 50%;
  // }
  .itmes{
    padding: 0 30rpx;
    margin-left: 5rpx;
  }

  :deep(.uni-modal__bd) {
    color: #6C6C6C;
    font-size: 28rpx;
  }
  :deep(.uni-modal__title) {
    font-size: 32rpx;
    color: #999999;
  }
</style>