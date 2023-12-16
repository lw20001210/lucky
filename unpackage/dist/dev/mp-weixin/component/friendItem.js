"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "friendItem",
  props: ["obj"],
  setup(__props) {
    function goDetail(obj) {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${obj.id}`
      });
    }
    return (_ctx, _cache) => {
      return {
        a: __props.obj.avatar,
        b: common_vendor.o(($event) => goDetail(__props.obj)),
        c: common_vendor.t(__props.obj.remarked),
        d: common_vendor.t(__props.obj.signature)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd3f64b3"], ["__file", "D:/uniapp毕设/lucky/component/friendItem.vue"]]);
wx.createComponent(Component);
