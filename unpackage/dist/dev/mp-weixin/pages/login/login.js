"use strict";
const common_vendor = require("../../common/vendor.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_Toast = require("../../utils/Toast.js");
require("../../utils/request.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    let userInfo = common_vendor.reactive({
      username: "",
      password: ""
    });
    function goRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    }
    const user = pinia_userInfo_userInfo.userStore();
    function goHome() {
      if (userInfo.username == "" || userInfo.password == "") {
        return utils_Toast.showMsg("请完善登录信息");
      }
      user.loginUser(userInfo);
    }
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "D:/新的开始/uniapp毕设/luckly/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
