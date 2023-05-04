import {
  defineStore
} from 'pinia'
import {
  showMsg
} from '@/utils/Toast.js';
import request from '@/utils/request.js'
export const userStore = defineStore('user', {
  state: () => ({
    username: '',
    password: '',
    nickname: '',
    avatar: ''
  }),
  getters: {},
  actions: {
    async addUser(obj) {
      this.username = obj.username;
      this.password = obj.password;
      this.nickname = obj.nickname;
      this.avatar = obj.avatar
    },
  }
})