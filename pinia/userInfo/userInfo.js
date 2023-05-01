import {
  defineStore
} from 'pinia'
import { showMsg } from '@/utils/Toast.js';
import request from '@/utils/request.js'
export const userStore = defineStore('user', {
  state: () => ({
    username: '',
    password: '',
    nickname: '',
    avatar: ''
  }),
  getters: {
  },
  actions: {
    async addUser(obj) {
     try {
            const { data: res } = await request('/user/register', 'POST', obj);
            if (res.code === 500) {
            return  showMsg(res.msg);
            } else if (res.code === 200) {
              this.username = obj.username;
              this.password = obj.password;
              this.nickname = obj.nickname;
              this.avatar = obj.avatar;
              uni.hideToast();
              showMsg(res.msg);
              uni.reLaunch({
                url: '/pages/login/login'
              })
            }
          } catch (e) {
            console.log('添加用户时出错：', e);
          return showMsg('其他错误');
          }
       },
  }
})