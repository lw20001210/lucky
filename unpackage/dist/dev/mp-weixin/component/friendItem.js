"use strict";
const common_vendor = require("../common/vendor.js");
const pinia_userInfo_userInfo = require("../pinia/userInfo/userInfo.js");
require("../utils/Toast.js");
require("../utils/local.js");
require("../utils/request.js");
const _sfc_main = {
  __name: "friendItem",
  setup(__props) {
    const userPower = new pinia_userInfo_userInfo.userStore();
    const {
      avatar,
      nickname
    } = common_vendor.storeToRefs(userPower);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(avatar),
        b: common_vendor.t(common_vendor.unref(nickname))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd3f64b3"], ["__file", "D:/新的开始/uniapp毕设/luckly/component/friendItem.vue"]]);
wx.createComponent(Component);
