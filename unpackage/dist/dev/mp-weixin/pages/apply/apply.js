"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const utils_format = require("../../utils/format.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_Toast = require("../../utils/Toast.js");
require("../../utils/config.js");
require("../../utils/local.js");
if (!Array) {
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (Header + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const Header = () => "../../component/header.js";
const _sfc_main = {
  __name: "apply",
  setup(__props) {
    let nickname = common_vendor.ref();
    let applyList = common_vendor.ref([]);
    common_vendor.ref();
    let inputDialog = common_vendor.ref();
    let options2 = common_vendor.ref([{
      text: "删除",
      style: {
        backgroundColor: "#E93535"
      }
    }]);
    let headObj = common_vendor.ref({
      leftFont: "icon-zuojiantou",
      title: "新朋友",
      path: "/pages/linkman/linkman"
    });
    const user = pinia_userInfo_userInfo.userStore();
    common_vendor.onLoad((option) => {
      getApplyList();
    });
    async function getApplyList() {
      let {
        data: res
      } = await utils_request.request("/user/getApplyList", "get", {
        userId: user.id
      });
      if (res.code != 200 || res.code == 404)
        return false;
      res.data.forEach((item) => {
        item.isOpened = "none";
      });
      applyList.value = res.data;
    }
    async function bindClick(e, info) {
      if (e.content.text == "删除") {
        let {
          data: res
        } = await utils_request.request("/user/deleteApplyRecord", "delete", {
          sendId: info.sendId,
          acceptId: info.acceptId
        });
        console.log(res);
        if (res.code == 200) {
          utils_Toast.showMsg("已成功删除该条记录", 1e3, "loading");
          getApplyList();
        }
      }
    }
    function formatStatus(item) {
      if (item.status == -1) {
        return "已拒绝该请求";
      } else if (item.status == 1) {
        return "已添加";
      }
    }
    let seletedDate = common_vendor.ref([]);
    function validate(data) {
      seletedDate.value = data;
      inputDialog.value.open();
    }
    async function reject(data) {
      let {
        data: res
      } = await utils_request.request("/user/rejectApply", "put", {
        myId: user.id,
        friendId: data.sendId
      });
      if (res.code == 200) {
        getApplyList();
        utils_Toast.showMsg("已拒绝该请求", 500, "loading");
        seletedDate.value = [];
      }
    }
    async function dialogInputConfirm(val) {
      if (val) {
        let {
          data: res
        } = await utils_request.request("/user/createShip", "post", {
          myId: user.id,
          friendId: seletedDate.value.sendId,
          friendName: val
        });
        if (res.code == 200) {
          utils_Toast.showMsg("添加好友成功", 1e3, "loading");
          seletedDate.value = [];
          common_vendor.index.switchTab({
            url: "/pages/home/home"
          });
        }
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          obj: common_vendor.unref(headObj)
        }),
        b: common_vendor.unref(applyList).length == 0
      }, common_vendor.unref(applyList).length == 0 ? {} : {
        c: common_vendor.f(common_vendor.unref(applyList), (item, k0, i0) => {
          return common_vendor.e({
            a: item.avatar,
            b: common_vendor.t(item.content),
            c: common_vendor.t(item.username),
            d: common_vendor.t(common_vendor.unref(utils_format.dayFormat)(item.createTime)),
            e: item.status == 0
          }, item.status == 0 ? {
            f: common_vendor.o(($event) => reject(item)),
            g: common_vendor.o(($event) => validate(item)),
            h: common_vendor.t(formatStatus(item))
          } : {
            i: common_vendor.t(formatStatus(item))
          }, {
            j: common_vendor.o(($event) => bindClick($event, item)),
            k: "426a9ebe-2-" + i0 + ",426a9ebe-1",
            l: common_vendor.p({
              ["right-options"]: common_vendor.unref(options2),
              show: item.isOpened,
              ["auto-close"]: false
            })
          });
        })
      }, {
        d: common_vendor.o(dialogInputConfirm),
        e: common_vendor.p({
          mode: "input",
          title: "同意该好友申请",
          value: common_vendor.unref(nickname),
          placeholder: "请输入备注"
        }),
        f: common_vendor.sr(inputDialog, "426a9ebe-3", {
          "k": "inputDialog"
        }),
        g: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-426a9ebe"], ["__file", "D:/uniapp毕设/lucky/pages/apply/apply.vue"]]);
wx.createPage(MiniProgramPage);
