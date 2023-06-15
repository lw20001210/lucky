"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  (statusBar + _easycom_uni_search_bar)();
}
const statusBar = () => "../../component/statusBar.js";
const _sfc_main = {
  __name: "search",
  setup(__props) {
    let searchValue = common_vendor.ref();
    function input(res) {
      console.log("----input:", res);
    }
    function cancel(res) {
      console.log(1);
      common_vendor.index.navigateBack();
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(input),
        b: common_vendor.o(cancel),
        c: common_vendor.o(($event) => common_vendor.isRef(searchValue) ? searchValue.value = $event : searchValue = $event),
        d: common_vendor.p({
          focus: true,
          modelValue: common_vendor.unref(searchValue)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "D:/新的开始/uniapp毕设/lucky/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
