<script>
  import {
    getLocal
  } from "@/utils/local.js";
  import {
    userStore
  } from '@/pinia/userInfo/userInfo.js';
  import {
    showMsg
  } from '@/utils/Toast.js';
  import request from "@/utils/request.js"
  export default {
    onLaunch: function(options) {
      if (getLocal('login')) {
        console.log('防止手机上选择头像的时候触发下面代码直接进入到登录页');
      } else if (getLocal('edits')) {
        console.log('防止更换手机头像的时候触发下面代码直接进入到登录页');
      } else if (getLocal('token')) {
        const userPower = new userStore();
      // 判断token是否过期
        request('/user/userInfo', 'get', { username: userPower.username })
          .then(response => {
            const res = response.data;
            console.log(res);
            // 处理返回的数据
            if (res.code == '401') {
            return showMsg(res.msg)
            }else{
              uni.switchTab({
                url: '/pages/home/home'
              })
            }
          })
     // uni.switchTab({
     //   url: '/pages/home/home'
     // })
      } else {
        uni.redirectTo({
          url: "/pages/login/login",
          animationType: 'pop-in',
          animationDuration: 200
        });
      }
      console.log('App Launch');
    },
    onShow: function(options) {
       console.log('App Show')
      /*  // 这里如果这样写。那么在手机上将一选中注册头像就会跳转到登录页;
        // console.log(options);
        if (getLocal('token')) {
          uni.switchTab({
            url: '/pages/home/home'
          })
        } else {
          uni.redirectTo({
            url: "/pages/login/login",
          });
        }
        */
      // 我这里在登录页那个设置了个值做判断，如果是登录页则不会触发下面的判断
      // if (getLocal('login')) {
      //   console.log('防止手机上选择头像的时候触发下面代码直接进入到登录页');
      // } else if (getLocal('edits')) {
      //   console.log('防止手机上选择头像的时候触发下面代码直接进入到登录页');
      // } else if (getLocal('token')) {
      //   uni.switchTab({
      //     url: '/pages/home/home'
      //   })
      // } else {
      //   uni.redirectTo({
      //     url: "/pages/login/login",
      //   });
      // }
      // 方法2：直接这样判断就好，省去了很多代码。--------这里也不行，在编辑资料页也要选中头像。
      //  if (getLocal('token')) {
      //    uni.switchTab({
      //     url: '/pages/home/home'
      //    })
      // }
    },
    onHide: function() {
      console.log('App Hide')
    },
  }
</script>
<style>
  /*每个页面公共css */
  @import '@/static/iconfont/font/iconfont.css';
  @import '@/static/css/touch.css';

  /* 这个高度我们得手动去掉，否则纵向滚动做不了，它会撑开盒子高度导致两个滚动条 */
  :deep(.uni-app--showtabbar uni-page-wrapper::after) {
    display: none !important;
    height: 0 !important;
  }

  /* 隐藏滚动条 */
  ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
    color: transparent;
  }
</style>