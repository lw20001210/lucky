"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  (stastuBar + _easycom_uni_search_bar + featureItem + friendItem)();
}
const stastuBar = () => "../../component/statusBar.js";
const friendItem = () => "../../component/friendItem.js";
const featureItem = () => "../../component/featureItem.js";
const _sfc_main = {
  __name: "linkman",
  setup(__props) {
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
    return (_ctx, _cache) => {
      return {
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
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd0bc604"], ["__file", "D:/新的开始/uniapp毕设/lucky/pages/linkman/linkman.vue"]]);
wx.createPage(MiniProgramPage);
