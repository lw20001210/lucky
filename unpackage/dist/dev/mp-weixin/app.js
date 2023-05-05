"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const pinia_index = require("./pinia/index.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/register/register.js";
  "./pages/home/home.js";
  "./pages/linkman/linkman.js";
  "./pages/video/video.js";
  "./pages/star/star.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
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
