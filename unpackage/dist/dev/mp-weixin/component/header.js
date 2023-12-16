"use strict";
const common_vendor = require("../common/vendor.js");
if (!Math) {
  statusBar();
}
const statusBar = () => "./statusBar.js";
const _sfc_main = {
  __name: "header",
  props: ["obj"],
  setup(__props) {
    function goBack() {
      common_vendor.index.navigateBack();
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(__props.obj.leftFont),
        b: common_vendor.o(goBack),
        c: common_vendor.t(__props.obj.title),
        d: common_vendor.t(__props.obj.rightFont)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8548c3e5"], ["__file", "D:/uniapp毕设/lucky/component/header.vue"]]);
wx.createComponent(Component);
