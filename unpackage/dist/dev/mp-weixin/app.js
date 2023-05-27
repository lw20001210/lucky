"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_local = require("./utils/local.js");
const pinia_userInfo_userInfo = require("./pinia/userInfo/userInfo.js");
const utils_Toast = require("./utils/Toast.js");
const utils_request = require("./utils/request.js");
const pinia_index = require("./pinia/index.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/register/register.js";
  "./pages/sendDynamic/sendDynamic.js";
  "./pages/sys/sys.js";
  "./pages/selfStar/selfStar.js";
  "./pages/dynamic/dynamic.js";
  "./pages/qrcode/qrcode.js";
  "./pages/editUser/editUser.js";
  "./pages/apply/apply.js";
  "./pages/groupChat/groupChat.js";
  "./pages/home/home.js";
  "./pages/linkman/linkman.js";
  "./pages/video/video.js";
  "./pages/star/star.js";
  "./pages/search/search.js";
}
const _sfc_main = {
  onLaunch: function(options) {
    if (utils_local.getLocal("login")) {
      console.log("防止手机上选择头像的时候触发下面代码直接进入到登录页");
    } else if (utils_local.getLocal("edits")) {
      console.log("防止更换手机头像的时候触发下面代码直接进入到登录页");
    } else if (utils_local.getLocal("token")) {
      const userPower = new pinia_userInfo_userInfo.userStore();
      utils_request.request("/user/userInfo", "get", { username: userPower.username }).then((response) => {
        const res = response.data;
        console.log(res);
        if (res.code == "401") {
          return utils_Toast.showMsg(res.msg);
        } else {
          common_vendor.index.switchTab({
            url: "/pages/home/home"
          });
        }
      });
    } else {
      common_vendor.index.redirectTo({
        url: "/pages/login/login",
        animationType: "pop-in",
        animationDuration: 200
      });
    }
    console.log("App Launch");
  },
  onShow: function(options) {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/新的开始/uniapp毕设/luckly/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(pinia_index.pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
