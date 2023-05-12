<template>
  <view class="container">
    <Header :obj="headObj"></Header>
    <view class="list">
      <view class="content">
        <view class="describe">
          头像
        </view>
        <view class="detail iconfont">
          <view class="photograph">
            &#xe634;
          </view>
          <text>&#xe612</text>
        </view>
      </view>
      <view class="content">
        <view class="describe">
          个性签名
        </view>
        <view class="detail iconfont">
          <view class="default">
            这个人很懒，什么都没有留下666
          </view>
          <text>&#xe612</text>
        </view>
      </view>
      <view class="content">
        <view class="describe">
          昵称
        </view>
        <view class="detail iconfont">
          <view class="default">

          </view>
          <text>&#xe612</text>
        </view>
      </view>
      <view class="content">
        <view class="describe">
          性别
        </view>
        <view class="detail iconfont">
          <view class="default">
            男
          </view>
          <text>&#xe612</text>
        </view>
      </view>
    </view>
  </view>
  <view class="divide">
  </view>
  <view class="two">
    <view class="list">
      <view class="content">
        <view class="describe">
        生日
        </view>
        <view class="detail iconfont">
          <view class="default">
            未设置
          </view>
          <text>&#xe612</text>
        </view>
      </view>
      <view class="content">
        <view class="describe">
          邮箱
        </view>
        <view class="detail iconfont">
          <view class="default">
           未设置
          </view>
          <text>&#xe612</text>
        </view>
      </view>
      <view class="content">
        <view class="describe">
          绑定手机号
        </view>
        <view class="detail iconfont">
          <view class="default">
            未绑定
          </view>
          <text>&#xe612</text>
        </view>
      </view>
      <view class="content" @click="Warn">
        <view class="describe">
          绑定第三方账号
        </view>
        <view class="detail iconfont">
          <view class="default">
          </view>
          <text>&#xe612</text>
        </view>
      </view>
      <view class="content">
        <view class="describe">
        修改密码
        </view>
        <view class="detail iconfont">
          <view class="default">
          </view>
          <text>&#xe612</text>
        </view>
      </view>
    </view>
  </view>
  <view class="divide">
  </view>
  <view class="two">
    <view class="list">
      <view class="content">
        <view class="describe">
       退出登录
        </view>
        <view class="detail iconfont">
          <view class="default">
          </view>
          <text>&#xe612</text>
        </view>
      </view>
      <view class="content" @click="removeUser">
        <view class="describe">
        注销账号
        </view>
        <view class="detail iconfont">
          <view class="default">
          </view>
          <text>&#xe612</text>
        </view>
      </view>
      </view>
      </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  import Header from "@/component/header.vue"
  import {showMsg} from "@/utils/Toast.js"
  // 传递给header组件的数据
  let headObj = ref({
    leftFont: 'icon-zuojiantou',
    title: '账号设置',
  })
  function Warn(){
    showMsg('该功能未开发')
  }
  function removeUser(){
    
  }
</script>

<style scoped lang="scss">
  .container {
    padding: 20rpx 25rpx 0; 
  }
  .list {
    margin: 10rpx 5px 0;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25rpx 0;
    height: 84rpx;
  
    .describe {
      width: 250rpx;
    }
  
    .detail {
      flex: 1;
      display: flex;
      justify-content: end;
      font-size: 50rpx;
      align-items: center;
      color: #000;
  
      .photograph {
        width: 80rpx;
        height: 80rpx;
        border: 1px solid rgb(238, 238, 238);
        text-align: center;
        line-height: 80rpx;
        border-radius: 50%;
      }
  
      .default {
        font-size: 31rpx;
        color: #7B7B7B;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .divide {
    height: 15rpx;
    background-color: #f2f2f2;
  }
  .two{
   padding: 0 25rpx;
  }
</style>