"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "apply",
  setup(__props) {
    let applyList = common_vendor.ref([]);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(applyList)
      }, common_vendor.unref(applyList) ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-426a9ebe"], ["__file", "D:/新的开始/uniapp毕设/luckly/pages/apply/apply.vue"]]);
wx.createPage(MiniProgramPage);
