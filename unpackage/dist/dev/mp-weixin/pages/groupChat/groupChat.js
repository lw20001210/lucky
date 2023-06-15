"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  (Header + _easycom_uni_search_bar)();
}
const Header = () => "../../component/header.js";
const _sfc_main = {
  __name: "groupChat",
  setup(__props) {
    let headObj = common_vendor.ref({
      leftFont: "icon-zuojiantou",
      title: "我的群聊",
      rightFont: "创建",
      path: "/pages/linkman/linkman"
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          obj: common_vendor.unref(headObj)
        }),
        b: common_vendor.p({
          radius: "5",
          placeholder: "搜索",
          clearButton: "auto",
          cancelButton: "none"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70ae8d23"], ["__file", "D:/新的开始/uniapp毕设/lucky/pages/groupChat/groupChat.vue"]]);
wx.createPage(MiniProgramPage);
