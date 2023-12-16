"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
require("../../utils/config.js");
require("../../utils/local.js");
require("../../utils/Toast.js");
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
      wh.value = val.windowHeight - 82;
    }
    common_vendor.onMounted(() => {
      getHeight();
    });
    function goInfo() {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${userPower.id}`
      });
    }
    const goSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    function goChat(item) {
      common_vendor.index.navigateTo({
        url: `/pages/chat/chat?id=${item.id}&remarked=${item.remarked}`
      });
    }
    function scanCode() {
      console.log(1);
      common_vendor.index.scanCode({
        success: function(res) {
          console.log("条码内容：" + res.result);
          common_vendor.index.navigateTo({
            url: `/pages/addFriend/addFriend?username=${res.result}`
          });
        }
      });
    }
    let friendList = common_vendor.ref(["0"]);
    async function getData() {
      let {
        data: res
      } = await utils_request.request("/user/getFriendList", "get", {
        id: userPower.id
      });
      if (res.code != 200)
        return showMsg("获取数据失败");
      friendList.value = res.data;
      friendList.value.forEach((item) => {
        if (item.id == userPower.id) {
          item["remarked"] = item.nickname;
        }
      });
    }
    common_vendor.onShow(() => {
      userPower.getUserInfo();
      getData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userPower).avatar,
        b: common_vendor.o(goInfo),
        c: common_vendor.t(common_vendor.unref(userPower).nickname),
        d: common_vendor.o(openPopup),
        e: common_vendor.o(goSearch),
        f: common_vendor.o(scanCode),
        g: common_vendor.o(close),
        h: common_vendor.unref(animationData),
        i: common_vendor.p({
          placeholder: "搜索",
          readonly: true
        }),
        j: common_vendor.o(goSearch),
        k: common_vendor.f(common_vendor.unref(friendList), (item, k0, i0) => {
          return {
            a: item.id,
            b: common_vendor.o(($event) => goChat(item), item.id),
            c: "07e72d3c-3-" + i0 + ",07e72d3c-2",
            d: common_vendor.p({
              clickable: true,
              ["avatar-circle"]: true,
              title: item.remarked,
              avatar: item.avatar,
              note: "您收到一条新的消息",
              time: item.createTime
            })
          };
        }),
        l: common_vendor.p({
          border: false
        }),
        m: common_vendor.unref(wh) + "px"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"], ["__file", "D:/uniapp毕设/lucky/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
