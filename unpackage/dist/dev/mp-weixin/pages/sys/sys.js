"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  Header();
}
const Header = () => "../../component/header.js";
const _sfc_main = {
  __name: "sys",
  setup(__props) {
    let headObj = common_vendor.ref({
      leftFont: "icon-zuojiantou",
      title: "系统通知",
      path: "/pages/star/star"
    });
    let List = common_vendor.ref([]);
    let codeImg = common_vendor.ref();
    codeImg.value = common_assets.img;
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          obj: common_vendor.unref(headObj)
        }),
        b: common_vendor.unref(List).length != 0
      }, common_vendor.unref(List).length != 0 ? {} : {
        c: common_vendor.unref(codeImg)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e8c9a334"], ["__file", "D:/新的开始/uniapp毕设/luckly/pages/sys/sys.vue"]]);
wx.createPage(MiniProgramPage);
