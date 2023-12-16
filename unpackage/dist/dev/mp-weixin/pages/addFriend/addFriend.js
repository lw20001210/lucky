"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_Toast = require("../../utils/Toast.js");
require("../../utils/config.js");
require("../../utils/local.js");
if (!Math) {
  Header();
}
const Header = () => "../../component/header.js";
const _sfc_main = {
  __name: "addFriend",
  setup(__props) {
    let user = pinia_userInfo_userInfo.userStore();
    let data = common_vendor.ref({
      leftFont: "icon-zuojiantou",
      title: "添加好友",
      path: "/pages/search/search"
    });
    let userInfo = common_vendor.ref({});
    let applyInfo = common_vendor.ref({
      status: false,
      sendId: 0,
      acceptId: "",
      avatar: "",
      username: "",
      nickname: "",
      //备注
      content: "我是",
      //验证信息
      createTime: Date.now()
    });
    common_vendor.onLoad(async (option) => {
      let {
        data: res
      } = await utils_request.request("/user/userInfo", "get", {
        username: option.username
      });
      if (res.code != 200)
        return utils_Toast.showMsg();
      utils_Toast.showMsg("加载中...", 500, "loading");
      userInfo.value = res.data;
    });
    function bindTextAreaBlur(e) {
      applyInfo.value.content = e.detail.value;
    }
    function bindTextArea(e) {
      applyInfo.value.nickname = e.detail.value;
    }
    async function sendApply() {
      applyInfo.value.sendId = user.id;
      applyInfo.value.username = user.nickname;
      applyInfo.value.avatar = user.avatar;
      applyInfo.value.acceptId = userInfo.value.id;
      let {
        data: res
      } = await utils_request.request("/user/sendApply", "post", applyInfo.value);
      if (res.code != 200)
        return utils_Toast.showMsg("发送失败");
      utils_Toast.showMsg(res.msg, 500, "loading");
      common_vendor.index.switchTab({
        url: "/pages/home/home"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          obj: common_vendor.unref(data)
        }),
        b: common_vendor.unref(userInfo).avatar,
        c: common_vendor.t(common_vendor.unref(userInfo).nickname),
        d: common_vendor.t(common_vendor.unref(userInfo).username),
        e: common_vendor.o(bindTextAreaBlur),
        f: common_vendor.o(bindTextArea),
        g: common_vendor.o(sendApply)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-51ba3ded"], ["__file", "D:/uniapp毕设/lucky/pages/addFriend/addFriend.vue"]]);
wx.createPage(MiniProgramPage);
