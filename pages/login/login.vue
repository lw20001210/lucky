<template>
  <view class="container">
    <view class="welcome">
      <text class="w1">欢迎回来</text>
       <text class="w2">登录你的账号</text>
    </view>
   <view class="userInfo">
   <view class="username">
     <text  class="mark">账号:</text>
     <input type="text" v-model="userInfo.username" placeholder="请输入你的账号">
   </view>
   <view class="password">
     <text class="mark">密码:</text>
     <input type="password" v-model="userInfo.password" placeholder="请输入你的密码">
   </view>
   </view>
   <text class="forget">忘记密码？</text>
   <view class="ability">
    <button type="primary" @click="goHome">登录</button>
  <button plain @click="goRegister">注册</button>
   </view>
   <view class="distance">
     <text>第三方登录</text>
   </view>
   <view class="other_login_icon">
   	<view class="wx ">
   		<view class="iconfont">&#xe607</view>
   	</view>
   	<view class="qq">
   		<view class="iconfont">&#xe66a</view>
   	</view>
   	<view class="wb">
   		<view class="iconfont">&#xe619</view>
   	</view>
   </view>
  </view>
</template>
<script setup>
import { reactive } from 'vue';
  let userInfo=reactive({
    username:'',
    password:''
  })
    // 跳转到注册页
  function goRegister(){
   uni.navigateTo({
   	url: '/pages/register/register'
   });
  }
  // 点击登录跳转到主页
function goHome(){
  uni.switchTab({
  	url: '/pages/home/home'
  })
}
</script>

<style scoped lang="less">
  .container{
  padding: 60rpx 80rpx 0;
   .welcome {
     margin-top: 220rpx;
   	display: flex;
   	flex-direction: column;
   	text-align: center;
   	.w1 {
   		font-family: FangSong;
   		font-size: 66rpx;
   		font-weight: normal;
   		color: #707070;
   		margin-bottom: 12rpx;
   	}
   	.w2 {
   		font-family: FangSong;
   		font-size: 32rpx;
   		font-weight: normal;
   		font-stretch: normal;
   		color: #707070;
   	}
   }
   .userInfo{
     margin-top: 110rpx;
     display: flex;
     flex-direction: column;
     align-items: center;
     .password,.username{
       position: relative;
       display: flex;
       flex-direction: row;
       width: 580rpx;
       height: 90rpx;
       border-radius: 16rpx;
       border: solid 2rpx #707070;
       align-items: center;
       padding-left: 15rpx;
       
       input{
           padding-left: 100rpx;
       }
       .mark{
       position: absolute;
       left: 10rpx;
       }
     }
     .password{
       margin-top: 30rpx;
     }
   }
   .forget{
     color: #707070;
     margin-left: 72%;
     font-family: FangSong;
   }
   .ability{
      margin-top: 65rpx;
     button{
       border-radius: 90rpx;
       margin: 15rpx 0;
     }
   }
   .distance{
     margin: 65rpx 0;
     text-align: center;
   }
     
   .other_login_icon{
     display: flex;
      justify-content: space-around;
     .iconfont{
       font-size: 90rpx;
     }
   }
   
  }
</style>