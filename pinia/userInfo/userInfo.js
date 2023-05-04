import {
  defineStore
} from 'pinia'
import {
  showMsg
} from '@/utils/Toast.js';
import request from "@/utils/request.js"
export const userStore = defineStore('user', {
  state: () => ({
    username: '',
    password: '',
    nickname: '',
    avatar: ''
  }),
  getters: {},
  actions: {
    // 注册的时候拿到注册信息
    registeriUser(obj) {
      this.username = obj.username;
      this.password = obj.password;
      this.nickname = obj.nickname;
      this.avatar = obj.avatar
    },
    // 登录
    async loginUser(obj) {
      const {
        data: res
      } = await request('/user/login','post',obj);
      console.log(res);
     if(res.code==500){
       showMsg(res.msg)
     }else if(res.code==200){
        showMsg(res.msg, 1000, 'loading');
        this.username = obj.username;
        this.password = obj.password;
        console.log(res);
     }else{
       showMsg(res.msg)
     }
   }
  }
})