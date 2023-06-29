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
    nickname: '',
    avatar: '',
    sex: '',
    phone: '',
    email: '',
    createTime: '',
    birthday: '',
    signature: '',
    status: '',
    id: getLocal('id') ? getLocal('id') : ''
  }),
  getters: {},
  actions: {
    getData(obj) {
      Object.assign(this.$state, obj);
      if (obj) {
        setLocal('username', obj.username)
         setLocal('id', obj.id)
      }

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
        this.username = res.data;
        setLocal('username', res.data)
        setLocal('token', res.token)
        // setLocal('userInfo', res.data)
        // console.log(res.token);
        uni.switchTab({
          url: '/pages/home/home'
        })
    }
    },
    // 获取用户信息
    async getUserInfo() {
      let {
        data: res
      } = await request('/user/userInfo', 'get', {
        username: this.username
      });
      this.getData(res.data)
      // console.log(res.data);
      // console.log(this.$state);
    },
    // 注销用户
    async removeUser() {
      // 只能传对象
      let {
        data: res
      } = await request('/user/delete', 'delete', {
        username: this.username
      });
      // console.log(res);
      if (res.code == '200') {
        showMsg(res.msg, 1500, 'loading');
        uni.reLaunch({
          url: '/pages/login/login'
        })
        removeLocal('token')
      } else {
        return showMsg('注销账号失败')
      }
    },
    // 更新用户信息
    async updateUser(obj) {
      let {
        data: res
      } = await request('/user/update', 'post', obj);
      this.getData(res.data)
      console.log(res.data);
    }
  }
})