<script>
  import {
    getLocal
  } from "@/utils/local.js";
  export default {
    onLaunch: function(options) {
      console.log('App Launch');
      /*  // 也不能写这里会注册失败
        // console.log(options);
        // if (getLocal('token')) {
        //    uni.switchTab({
        //      url: '/pages/home/home'
        //    })
        //  } else {
        //    uni.redirectTo({
        //      url: "/pages/login/login",
        //    });
        // }
        */
    },
    onShow: function(options) {
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
      if (getLocal('login')) {
        console.log('防止手机上选择头像的时候触发下面代码直接进入到登录页');
      } else if (getLocal('token')) {
        uni.switchTab({
         url: '/pages/home/home'
        })
      } else {
        uni.redirectTo({
          url: "/pages/login/login",
        });
      }
      // if (getLocal('token')) {
      //   uni.switchTab({
      //    url: '/pages/home/home'
      //   })
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