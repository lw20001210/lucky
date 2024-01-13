"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const utils_Toast = require("../../utils/Toast.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const common_assets = require("../../common/assets.js");
require("../../utils/config.js");
require("../../utils/local.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  (Header + _easycom_uni_search_bar)();
}
const Header = () => "../../component/header.js";
const _sfc_main = {
  __name: "groupChat",
  setup(__props) {
    const userInfo = pinia_userInfo_userInfo.userStore();
    let headObj = common_vendor.ref({
      leftFont: "icon-zuojiantou",
      title: "我的群聊"
    });
    let groupList = common_vendor.ref([]);
    let wh = common_vendor.ref("");
    function getHeight() {
      common_vendor.index.getSystemInfoSync();
    }
    common_vendor.onLoad(async () => {
      getHeight();
      let {
        data: res
      } = await utils_request.request("/user/getGroupList", "get", {
        uid: userInfo.id
      });
      if (res.code != 200)
        return utils_Toast.showMsg();
      console.log(res.data, 999);
      groupList.value = res.data;
    });
    const goSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search?url=group"
      });
    };
    const goChat = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/chat/chat?groupId=${item.id}&groupName=${item.nickname}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goSearch),
        b: common_vendor.p({
          obj: common_vendor.unref(headObj)
        }),
        c: common_vendor.p({
          radius: "5",
          placeholder: "搜索",
          clearButton: "auto",
          cancelButton: "none"
        }),
        d: common_vendor.f(common_vendor.unref(groupList), (item, index, i0) => {
          return {
            a: item.avatar ? item.avatar : common_vendor.unref(common_assets.groupAvatar),
            b: common_vendor.t(item.nickname),
            c: common_vendor.t(item.intro),
            d: index,
            e: common_vendor.o(($event) => goChat(item), index)
          };
        }),
        e: common_vendor.unref(wh) + "px"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-70ae8d23"], ["__file", "D:/uniapp毕设/lucky/pages/groupChat/groupChat.vue"]]);
wx.createPage(MiniProgramPage);
