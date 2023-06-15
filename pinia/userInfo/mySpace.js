import {
  defineStore
} from 'pinia';
import request from "@/utils/request.js"
import {
  showMsg
} from '../../utils/Toast';
export const mySpaceStore = defineStore('mySpace', {
  state: () => ({
    id: '',
    uid: '',
    content: {
      title: '',
      imgArr: []
    },
    position: '',
    statu: '',
    createTime: '',
    flag:'a',
    totalList: []
  }),
  actions: {
    getData(obj) {
      this.totalList = [...obj].reverse()
    },
    //获取用户动态信息
    async getmySpaceInfo(uid) {
      let {
        data: res
      } = await request('/user/getMySpaceInfo', 'get', {
        keyId: uid
      })
      console.log(res);
      if (res.code == 404) {
        showMsg(res.msg)
      } else if (res.code == 200) {
        this.getData(res.data)
      } else {
        showMsg('数据获取失败')
      }
      flag='a'
    },
    async removeSpace(id,uid) {
      let {
        data: res
      } = await request('/user/deleteSpace', 'delete', {
        id
      });
      if (res.code == '200') {
        showMsg(res.msg, 1500, 'loading');
       this.getmySpaceInfo(uid)
      } else {
        return showMsg('删除动态失败')
      }
    }
  }
})