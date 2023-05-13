import {
  defineStore
} from 'pinia'
import {
  showMsg
} from '@/utils/Toast.js';
import {
  setLocal,
  getLocal,
  removeLocal
} from '@/utils/local.js'
import request from "@/utils/request.js"
import loginVue from '../../pages/login/login.vue';
export const userStore = defineStore('user', {
  state: () => ({
    username: getLocal('username') ? getLocal('username') : '',
    password: '',
    nickname: getLocal('nickname') ? getLocal('nickname') : '',
    avatar: getLocal('avatar') ? getLocal('avatar') : ''
  }),
  getters: {},
  actions: {
    getData(obj) {
      this.username = obj.username;
      setLocal('username', obj.username)
      this.password = obj.password;
      setLocal('nickname', obj.nickname)
      this.nickname = obj.nickname;
      setLocal('avatar', obj.avatar)
      this.avatar = obj.avatar;
    },
    // 登录
    async loginUser(obj) {
      const {
        data: res
      } = await request('/user/login', 'post', obj);
      if (res.code == 500) {
        showMsg(res.msg)
      } else if (res.code == 200) {
        showMsg(res.msg, 1000, 'loading');
        this.getData(res.data)
        console.log(res);
        setLocal('token', res.token)
        uni.switchTab({
          url: '/pages/home/home'
        })
      }
    },
    // 注销用户
    async removeUser() {
      // 只能传对象
      let {
        data: res
      } = await request('/user/delete', 'delete', {
        username: this.username
      });
      console.log(res);
      if (res.code == '200') {
        showMsg(res.msg, 1500, 'loading');
        uni.reLaunch({
          url: '/pages/login/login'
        })
        removeLocal('token')
      } else {
        return showMsg('注销账号失败')
      }
    }
  }
})