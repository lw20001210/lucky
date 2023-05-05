"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_Toast = require("../../utils/Toast.js");
const utils_request = require("../../utils/request.js");
const userStore = common_vendor.defineStore("user", {
  state: () => ({
    username: "",
    password: "",
    nickname: "",
    avatar: ""
  }),
  getters: {},
  actions: {
    // 注册的时候拿到注册信息
    registeriUser(obj) {
      this.username = obj.username;
      this.password = obj.password;
      this.nickname = obj.nickname;
      this.avatar = obj.avatar;
    },
    // 登录
    async loginUser(obj) {
      const {
        data: res
      } = await utils_request.request("/user/login", "post", obj);
      console.log(res);
      if (res.code == 500) {
        utils_Toast.showMsg(res.msg);
      } else if (res.code == 200) {
        utils_Toast.showMsg(res.msg, 1e3, "loading");
        this.username = obj.username;
        this.password = obj.password;
        console.log(res);
        common_vendor.index.switchTab({
          url: "/pages/home/home"
        });
      } else {
        utils_Toast.showMsg(res.msg);
      }
    }
  }
});
exports.userStore = userStore;
