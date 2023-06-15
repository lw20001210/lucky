"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_Toast = require("../../utils/Toast.js");
const utils_local = require("../../utils/local.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    let userInfo = common_vendor.reactive({
      username: "",
      password: ""
    });
    function goRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register",
        animationType: "pop-in",
        animationDuration: 200
      });
    }
    const user = userStore();
    function goHome() {
      if (userInfo.username == "" || userInfo.password == "") {
        return utils_Toast.showMsg("请完善登录信息");
      }
      user.loginUser({
        ...userInfo,
        password: common_vendor.cryptoJsExports.MD5(userInfo.password).toString()
      });
    }
    common_vendor.onLoad((option) => {
      if (option.username) {
        return userInfo.username = option.username;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userInfo).username,
        b: common_vendor.o(($event) => common_vendor.unref(userInfo).username = $event.detail.value),
        c: common_vendor.unref(userInfo).password,
        d: common_vendor.o(($event) => common_vendor.unref(userInfo).password = $event.detail.value),
        e: common_vendor.o(goHome),
        f: common_vendor.o(goRegister)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "D:/新的开始/uniapp毕设/lucky/pages/login/login.vue"]]);
const userStore = common_vendor.defineStore("user", {
  state: () => ({
    username: utils_local.getLocal("username") ? utils_local.getLocal("username") : "",
    password: "",
    nickname: "",
    avatar: "",
    sex: "",
    phone: "",
    email: "",
    createTime: "",
    birthday: "",
    signature: "",
    statu: "",
    id: ""
  }),
  getters: {},
  actions: {
    getData(obj) {
      Object.assign(this.$state, obj);
      if (obj) {
        utils_local.setLocal("username", obj.username);
      }
    },
    // 登录
    async loginUser(obj) {
      const {
        data: res
      } = await utils_request.request("/user/login", "post", obj);
      if (res.code == 500) {
        utils_Toast.showMsg(res.msg);
      } else if (res.code == 200) {
        utils_Toast.showMsg(res.msg, 1e3, "loading");
        this.username = res.data;
        utils_local.setLocal("username", res.data);
        utils_local.setLocal("token", res.token);
        common_vendor.index.switchTab({
          url: "/pages/home/home"
        });
      }
    },
    // 获取用户信息
    async getUserInfo() {
      let {
        data: res
      } = await utils_request.request("/user/userInfo", "get", {
        username: this.username
      });
      this.getData(res.data);
    },
    // 注销用户
    async removeUser() {
      let {
        data: res
      } = await utils_request.request("/user/delete", "delete", {
        username: this.username
      });
      if (res.code == "200") {
        utils_Toast.showMsg(res.msg, 1500, "loading");
        common_vendor.index.reLaunch({
          url: "/pages/login/login"
        });
        utils_local.removeLocal("token");
      } else {
        return utils_Toast.showMsg("注销账号失败");
      }
    },
    // 更新用户信息
    async updateUser(obj) {
      let {
        data: res
      } = await utils_request.request("/user/update", "post", obj);
      this.getData(res.data);
      console.log(res.data);
    }
  }
});
exports.MiniProgramPage = MiniProgramPage;
exports.userStore = userStore;
