"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "featureItem",
  props: ["objData"],
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(__props.objData.textFont),
        b: __props.objData.bgColor ? __props.objData.bgColor : "",
        c: common_vendor.t(__props.objData.title)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-887da2a3"], ["__file", "D:/uniapp毕设/lucky/component/featureItem.vue"]]);
wx.createComponent(Component);
