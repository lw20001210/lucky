"use strict";
const common_vendor = require("../../common/vendor.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
require("../../utils/Toast.js");
require("../../utils/local.js");
require("../../utils/request.js");
if (!Math) {
  (stastuBar + Header)();
}
const Header = () => "../../component/header.js";
const stastuBar = () => "../../component/statusBar.js";
const _sfc_main = {
  __name: "dynamic",
  setup(__props) {
    let List = common_vendor.ref([]);
    let headObj = common_vendor.ref({
      leftFont: "icon-zuojiantou-copy",
      title: "",
      rightFont: "",
      path: "/pages/star/star"
    });
    const userPower = new pinia_userInfo_userInfo.userStore();
    const {
      avatar,
      nickname
    } = common_vendor.storeToRefs(userPower);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          obj: common_vendor.unref(headObj)
        }),
        b: common_vendor.t(common_vendor.unref(nickname)),
        c: common_vendor.unref(avatar),
        d: common_vendor.unref(List)
      }, common_vendor.unref(List) ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e73567d5"], ["__file", "D:/新的开始/uniapp毕设/lucky/pages/dynamic/dynamic.vue"]]);
wx.createPage(MiniProgramPage);
