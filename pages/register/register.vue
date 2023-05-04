<template>
  <view class="container">
    <view class="welcome">
      <text>欢迎来到思环!</text>
    </view>
    <view class="avatar">
      <uni-file-picker :del-icon="false" limit="1" :imageStyles="imageStyles" file-mediatype="image" @select="select"
        disable-preview return-type="object">
        <view class="content">
          <text class="iconfont">&#xe614</text>
          <text>选择头像</text>
        </view>
      </uni-file-picker>
    </view>
    <view class="user_info">
      <view class="item">
        <label for="">昵称</label>
        <input type="text" name="" v-model="userInfo.nickname" id="" placeholder="取个名字呀！">
      </view>
      <view class="item">
        <label for="">账号</label>
        <input type="text" name="" v-model="userInfo.username" id="" placeholder="请输入你的账号">
      </view>
      <view class="item">
        <label for="">密码</label>
        <input type="password" name="" v-model="userInfo.password" id="" placeholder="请输入你的密码">
      </view>
    </view>
    <!-- 按钮区域 -->
    <view class="btn">
      <view class="btn_submit" @click="addUser">
        <text>立即注册</text>
      </view>
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

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { showMsg } from '@/utils/Toast.js';
  import { userStore } from '@/pinia/userInfo/userInfo.js';
  const userPower = userStore()
  // 注册用户的数据
  let userInfo = reactive({
    username: '',
    password: '',
    nickname: '',
    avatar: ''
  })
  // 上传选中图片的样式数据
  let imageStyles = ref({
    width: 98,
    height: 98,
    border: {
      "radius": "50%"
    }
  })
  // 拿到所选头像后触发
  function select(res : any) {
    userInfo.avatar = res.tempFilePaths[0]
  }
  // 注册账号
  function addUser() {
    let passwordLimit = /^[a-zA-Z0-9_]{4,15}$/;
    let usernameLimit = /^[a-zA-Z0-9_]{4,}$/;
    if (userInfo.avatar == '') {
      return showMsg('你还未选择头像')
    } else if (userInfo.nickname == '') {
      return showMsg('昵称不能未空')
    } else if (userInfo.username == '') {
      return showMsg('账号不能未空')
    } else if (userInfo.password == '') {
      return showMsg('密码不能未空')
    } else {
      if (!passwordLimit.test(userInfo.password)) {
        return showMsg('密码格式有误')
      } else if (!usernameLimit.test(userInfo.username)) {
        return showMsg('账号格式有误')
      } else {
        // userPower.addUser(userInfo)
        upload()//这种方法也可以
      }
    }
  }
  // 注册导入图片
  function upload() {
    let param = {
      nickname: userInfo.nickname,
      username: userInfo.username,
      password: userInfo.password
    }
    uni.uploadFile({
      url: 'http://192.168.242.20:3000/user/register', //仅为示例，非真实的接口地址
      filePath: userInfo.avatar,
      name: 'avatar',
      timeout:1000,
      formData: param,
      success: (res) => {
        let result = JSON.parse(res.data);
        console.log(result);
        if (result.code == 200) {
          userPower.registeriUser(result.obj)
          showMsg(result.msg, 1000, 'loading')
          uni.reLaunch({
            url: '/pages/login/login'
          })
        } else {
          showMsg(result.msg, 1000)
        }
      }, fail: () => {
        showMsg('没开后台')
      }
    });
  }
</script>
<style lang="less" scoped>
  .container {
    padding: 15rpx 80rpx 0;

    .welcome {
      margin-top: 260rpx;
      text-align: center;
      font-family: KaiTi;
      font-size: 52rpx;
      font-weight: normal;
    }
    .avatar {
      margin-top: 50rpx;

      /deep/ .uni-file-picker__container {
        justify-content: center;
      }
      .content {
        color: white;
        font-size: 30rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .iconfont {
          color: white;
          box-sizing: 1px solid white;
          font-size: 50rpx;
        }
      }

      .avatar_content {
        width: 196rpx;
        height: 192rpx;
        border: solid 2rpx #ccc;
        border-radius: 50%;
        overflow: hidden;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }

    /deep/.file-picker__box-content {
      background-color: #3E6FAC;
    }

    /deep/ .file-picker__progress {
      display: none !important;
    }

    .user_info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 70rpx;

      .item {
        display: flex;
        margin-bottom: 32rpx;
        align-items: center;
        position: relative;
        width: 100%;

        label {
          position: absolute;
          left: 40rpx;
        }

        input {
          margin-left: 110rpx;
          border-bottom: 1rpx solid #c5b7b7;
          width: 65%;
          padding: 0 16rpx
        }
      }
    }

    .btn {
      display: flex;
      text-align: center;
      justify-content: center;
      margin-top: 48rpx;

      .btn_submit {
        width: 400rpx;
        height: 78rpx;
        line-height: 78rpx;
        background-color: #3e6fac;
        border-radius: 50rpx;

        text {
          font-family: STXingkai;
          font-size: 40rpx;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rpx;
          color: #fff;
        }
      }

    }

    .distance {
      margin: 65rpx 0;
      text-align: center;
    }

    .other_login_icon {
      display: flex;
      justify-content: space-around;

      .iconfont {
        font-size: 90rpx;
      }
    }
  }
</style>