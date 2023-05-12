import {
  defineStore
} from 'pinia'
import {
  showMsg
} from '@/utils/Toast.js';
import {setLocal,getLocal} from '@/utils/local.js'
import request from "@/utils/request.js"
export const userStore = defineStore('user', {
  state: () => ({
    username: '',
    password: '',
    nickname:getLocal('nickname')?getLocal('nickname'):'',
    avatar: getLocal('avatar')?getLocal('avatar'):''
  }),
  getters: {},
  actions: {
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
        uni.switchTab({
          url: '/pages/home/home'
        })
      } else {
        showMsg(res.msg)
      }
    },
    getData(obj) {
      this.username = obj.username;
      this.password = obj.password;
       setLocal('nickname',obj.nickname)
      this.nickname = obj.nickname;
      setLocal('avatar',obj.avatar)
      this.avatar = obj.avatar;
    }
  }
})