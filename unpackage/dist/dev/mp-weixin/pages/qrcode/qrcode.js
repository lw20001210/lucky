"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_Toast = require("../../utils/Toast.js");
const common_assets = require("../../common/assets.js");
require("../../utils/config.js");
require("../../utils/local.js");
if (!Math) {
  Header();
}
const Header = () => "../../component/header.js";
const _sfc_main = {
  __name: "qrcode",
  setup(__props) {
    let headObj = common_vendor.ref({
      leftFont: "icon-zuojiantou-copy2",
      title: "我的二维码",
      rightFont: "分享",
      path: "/pages/star/star"
    });
    let userPower = new pinia_userInfo_userInfo.userStore();
    const {
      avatar,
      nickname,
      username,
      id
    } = common_vendor.storeToRefs(userPower);
    let qrcode = common_vendor.ref();
    function warning() {
      utils_Toast.showMsg("该功能尚未开发");
    }
    common_vendor.onLoad(async () => {
      let {
        data: res
      } = await utils_request.request("/user/createQrcode", "post", {
        username: username.value
      });
      qrcode.value = res.data;
    });
    let codeImg = common_vendor.ref();
    codeImg.value = common_assets.img$1;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(warning),
        b: common_vendor.p({
          obj: common_vendor.unref(headObj)
        }),
        c: common_vendor.unref(avatar),
        d: common_vendor.t(common_vendor.unref(nickname)),
        e: common_vendor.t(common_vendor.unref(username)),
        f: common_vendor.unref(qrcode),
        g: `url(${common_vendor.unref(codeImg)})`
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a7a2e00e"], ["__file", "D:/uniapp毕设/lucky/pages/qrcode/qrcode.vue"]]);
wx.createPage(MiniProgramPage);
