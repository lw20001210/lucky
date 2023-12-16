"use strict";
const common_vendor = require("../../common/vendor.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_request = require("../../utils/request.js");
const utils_Toast = require("../../utils/Toast.js");
require("../../utils/local.js");
require("../../utils/config.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_uni_search_bar2 + _easycom_uni_badge2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (stastuBar + _easycom_uni_search_bar + featureItem + _easycom_uni_badge + friendItem + _easycom_uni_collapse_item + _easycom_uni_collapse)();
}
const stastuBar = () => "../../component/statusBar.js";
const friendItem = () => "../../component/friendItem.js";
const featureItem = () => "../../component/featureItem.js";
const _sfc_main = {
  __name: "linkman",
  setup(__props) {
    const userInfo = pinia_userInfo_userInfo.userStore();
    let friendList = common_vendor.ref(["0"]);
    const goSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    let obj = common_vendor.ref([{
      textFont: "icon-tianjiahaoyou1",
      title: "好友申请",
      bgColor: "rgb(255, 166, 102)"
    }, {
      textFont: "icon-chuangjianqunliao",
      title: "创建群聊",
      bgColor: " rgb(61, 203, 242)"
    }]);
    function goDetail(val) {
      if (val == "好友申请") {
        common_vendor.index.navigateTo({
          url: "/pages/apply/apply"
        });
      } else if (val == "创建群聊") {
        common_vendor.index.navigateTo({
          url: "/pages/groupChat/groupChat"
        });
      }
    }
    let value = common_vendor.ref(["0"]);
    let friendNum = common_vendor.ref(0);
    async function getData() {
      let {
        data: res
      } = await utils_request.request("/user/getFriendList", "get", {
        id: userInfo.id
      });
      if (res.code != 200)
        return utils_Toast.showMsg("获取数据失败");
      friendList.value = res.data;
      friendList.value.forEach((item) => {
        if (item.id == userInfo.id) {
          item["remarked"] = item.nickname;
        }
      });
      let {
        data: result
      } = await utils_request.request("/user/getFriendNum", "get", {
        id: userInfo.id
      });
      if (result.code != 200)
        return utils_Toast.showMsg("获取数据失败");
      return friendNum.value = result.data.length;
    }
    common_vendor.onLoad((option) => {
      getData();
    });
    common_vendor.onShow((option) => {
      getData();
    });
    function change(e) {
      getData();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          placeholder: "搜索",
          readonly: true
        }),
        b: common_vendor.o(goSearch),
        c: common_vendor.f(common_vendor.unref(obj), (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => goDetail(item.title), item.title),
            b: "dd0bc604-2-" + i0,
            c: common_vendor.p({
              objData: item
            }),
            d: item.title
          };
        }),
        d: common_vendor.unref(friendNum) != 0
      }, common_vendor.unref(friendNum) != 0 ? {
        e: common_vendor.p({
          text: common_vendor.unref(friendNum)
        })
      } : {}, {
        f: common_vendor.f(common_vendor.unref(friendList), (item, k0, i0) => {
          return {
            a: item.id,
            b: "dd0bc604-6-" + i0 + ",dd0bc604-5",
            c: common_vendor.p({
              obj: item
            })
          };
        }),
        g: common_vendor.p({
          title: "我的好友"
        }),
        h: common_vendor.sr("collapse", "dd0bc604-4"),
        i: common_vendor.o(change),
        j: common_vendor.o(($event) => common_vendor.isRef(value) ? value.value = $event : value = $event),
        k: common_vendor.p({
          modelValue: common_vendor.unref(value)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd0bc604"], ["__file", "D:/uniapp毕设/lucky/pages/linkman/linkman.vue"]]);
wx.createPage(MiniProgramPage);
