"use strict";
const common_vendor = require("../../common/vendor.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
require("../../utils/Toast.js");
require("../../utils/local.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_search_bar2 + _easycom_uni_list_chat2 + _easycom_uni_list2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_list_chat = () => "../../uni_modules/uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (statusBar + _easycom_uni_search_bar + _easycom_uni_list_chat + _easycom_uni_list)();
}
const statusBar = () => "../../component/statusBar.js";
const _sfc_main = {
  __name: "home",
  setup(__props) {
    let animationData = common_vendor.ref({});
    let animation = common_vendor.ref(null);
    let isShow = common_vendor.ref(false);
    const userPower = new pinia_userInfo_userInfo.userStore();
    function openPopup() {
      if (!animation.value) {
        animation.value = common_vendor.index.createAnimation({
          duration: 200,
          transformOrigin: "top right",
          timingFunction: "ease"
        });
      }
      const animationValue = animation.value;
      if (isShow.value) {
        animationValue.opacity(0).width(0).height(0).step();
        isShow.value = false;
      } else {
        animationValue.opacity(1).width("300rpx").height("428rpx").step();
        isShow.value = true;
      }
      animationData.value = animationValue.export();
    }
    function close() {
      if (!animation.value)
        return;
      animation.value.opacity(0).width(0).height(0).step();
      animationData.value = animation.value.export();
      isShow.value = false;
    }
    let wh = common_vendor.ref();
    function getHeight() {
      const val = common_vendor.index.getSystemInfoSync();
      wh.value = val.windowHeight - 80;
    }
    common_vendor.onMounted(() => {
      getHeight();
    });
    const goSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    common_vendor.onLoad(() => {
      userPower.getUserInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userPower).avatar,
        b: common_vendor.t(common_vendor.unref(userPower).nickname),
        c: common_vendor.o(openPopup),
        d: common_vendor.o(goSearch),
        e: common_vendor.o(close),
        f: common_vendor.unref(animationData),
        g: common_vendor.p({
          placeholder: "搜索",
          readonly: true
        }),
        h: common_vendor.o(goSearch),
        i: common_vendor.p({
          ["avatar-circle"]: true,
          title: common_vendor.unref(userPower).nickname,
          avatar: common_vendor.unref(userPower).avatar,
          note: "您收到一条新的消息",
          time: "2020-02-02 20:20"
        }),
        j: common_vendor.p({
          title: "uni-app",
          avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          note: "您收到一条新的消息",
          time: "2020-02-02 20:20",
          ["badge-text"]: "12"
        }),
        k: common_vendor.p({
          title: "uni-app",
          avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          note: "您收到一条新的消息",
          time: "2020-02-02 20:20",
          ["badge-positon"]: "left",
          ["badge-text"]: "dot"
        }),
        l: common_vendor.p({
          title: "uni-app",
          avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          note: "您收到一条新的消息",
          time: "2020-02-02 20:20",
          ["badge-positon"]: "left",
          ["badge-text"]: "99"
        }),
        m: common_vendor.p({
          ["avatar-circle"]: true,
          title: "uni-app",
          avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          note: "您收到一条新的消息",
          time: "2020-02-02 20:20"
        }),
        n: common_vendor.p({
          title: "uni-app",
          avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          note: "您收到一条新的消息",
          time: "2020-02-02 20:20",
          ["badge-text"]: "12"
        }),
        o: common_vendor.p({
          title: "uni-app",
          avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          note: "您收到一条新的消息",
          time: "2020-02-02 20:20",
          ["badge-positon"]: "left",
          ["badge-text"]: "dot"
        }),
        p: common_vendor.p({
          title: "uni-app",
          avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          note: "您收到一条新的消息",
          time: "2020-02-02 20:20",
          ["badge-positon"]: "left",
          ["badge-text"]: "99"
        }),
        q: common_vendor.p({
          ["avatar-circle"]: true,
          title: "uni-app",
          avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          note: "您收到一条新的消息",
          time: "2020-02-02 20:20"
        }),
        r: common_vendor.p({
          title: "uni-app",
          avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          note: "您收到一条新的消息",
          time: "2020-02-02 20:20",
          ["badge-text"]: "12"
        }),
        s: common_vendor.p({
          title: "uni-app",
          avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          note: "您收到一条新的消息",
          time: "2020-02-02 20:20",
          ["badge-positon"]: "left",
          ["badge-text"]: "dot"
        }),
        t: common_vendor.p({
          title: "uni-app",
          avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          note: "您收到一条新的消息",
          time: "2020-02-02 20:20",
          ["badge-positon"]: "left",
          ["badge-text"]: "99"
        }),
        v: common_vendor.p({
          border: false
        }),
        w: common_vendor.unref(wh) + "px"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"], ["__file", "D:/新的开始/uniapp毕设/luckly/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
