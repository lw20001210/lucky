"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  stastuBar();
}
const stastuBar = () => "../../component/statusBar.js";
const _sfc_main = {
  __name: "video",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/新的开始/uniapp毕设/lucky/pages/video/video.vue"]]);
wx.createPage(MiniProgramPage);
