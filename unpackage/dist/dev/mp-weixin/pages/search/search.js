"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_Toast = require("../../utils/Toast.js");
require("../../utils/config.js");
require("../../utils/local.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  (statusBar + _easycom_uni_search_bar)();
}
const statusBar = () => "../../component/statusBar.js";
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const userPower = new pinia_userInfo_userInfo.userStore();
    const {
      id
    } = common_vendor.storeToRefs(userPower);
    let searchValue = common_vendor.ref();
    let userList = common_vendor.ref([]);
    let flag = common_vendor.ref(false);
    common_vendor.onLoad((option) => {
      getApplyList();
    });
    let idList = common_vendor.ref([]);
    async function getApplyList() {
      let {
        data: res
      } = await utils_request.request("/user/getFriendList", "get", {
        id: id.value
      });
      if (res.code != 200 || res.code == 404)
        return false;
      idList.value = res.data.map((item) => {
        return item.id;
      });
    }
    const moreContent = common_vendor.computed(() => {
      return flag.value ? userList.value : userList.value.filter((item, i) => {
        return i < 3;
      });
    });
    async function input(inputUser) {
      if (inputUser == "") {
        userList.value = [];
      } else {
        let {
          data: res
        } = await utils_request.request("/user/searchAllUser", "get");
        if (res.code != 200)
          return utils_Toast.showMsg();
        userList.value = res.data.filter((item) => {
          return item.username.includes(inputUser) && id.value != item.id;
        });
        if (userList.value.length == 0) {
          utils_Toast.showMsg("暂无更多搜索结果", 2e3, "loading");
        } else {
          utils_Toast.showMsg("加载中...", 500, "loading");
        }
      }
    }
    function cancel(res) {
      common_vendor.index.switchTab({
        url: "/pages/home/home"
      });
    }
    function formatContent(item) {
      if (Object.values(idList.value).includes(item.id)) {
        return "发信息";
      } else {
        return "加好友";
      }
    }
    function showMore() {
      flag.value = true;
    }
    function apply(item) {
      common_vendor.index.navigateTo({
        url: `/pages/addFriend/addFriend?username=${item.username}`
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(input),
        b: common_vendor.o(cancel),
        c: common_vendor.o(($event) => common_vendor.isRef(searchValue) ? searchValue.value = $event : searchValue = $event),
        d: common_vendor.p({
          focus: true,
          modelValue: common_vendor.unref(searchValue)
        }),
        e: common_vendor.unref(userList).length != 0
      }, common_vendor.unref(userList).length != 0 ? {
        f: common_vendor.o(showMore),
        g: common_vendor.f(common_vendor.unref(moreContent), (item, k0, i0) => {
          return {
            a: item.avatar,
            b: common_vendor.t(item.nickname),
            c: common_vendor.t(item.username),
            d: common_vendor.t(formatContent(item)),
            e: common_vendor.o(($event) => apply(item))
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "D:/uniapp毕设/lucky/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
