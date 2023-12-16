"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_Toast = require("../../utils/Toast.js");
require("../../utils/config.js");
require("../../utils/local.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (Header + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const Header = () => "../../component/header.js";
const _sfc_main = {
  __name: "friendInfo",
  setup(__props) {
    const powerStore = pinia_userInfo_userInfo.userStore();
    let {
      id
    } = common_vendor.storeToRefs(powerStore);
    let keyId = common_vendor.ref(0);
    let infoDate = common_vendor.ref({});
    let headObj = common_vendor.ref({
      leftFont: "icon-zuojiantou",
      title: "好友详情",
      path: `/pages/detail/detail?id=${keyId.value}`
    });
    async function getData(userId, friend) {
      let {
        data: res
      } = await utils_request.request("/user/getFriendInfo", "get", {
        myId: userId,
        friendId: parseInt(friend)
      });
      if (res.code == 200) {
        infoDate.value = res.data;
      } else {
        utils_Toast.showMsg("获取数据失败");
      }
    }
    common_vendor.onLoad((option) => {
      keyId.value = option.id;
      getData(id.value, option.id);
    });
    const formatSex = common_vendor.computed(() => {
      return infoDate.value.sex == 0 ? "女" : "男";
    });
    const initBirthday = common_vendor.computed(() => {
      if (infoDate.value.birthday == "") {
        return "未设置";
      } else {
        return infoDate.value.birthday;
      }
    });
    const initTelephone = common_vendor.computed(() => {
      if (infoDate.value.birthday == "") {
        return "未设置";
      } else {
        return infoDate.value.phone;
      }
    });
    const initEmail = common_vendor.computed(() => {
      if (infoDate.value.email == "") {
        return "未设置";
      } else {
        return infoDate.value.email;
      }
    });
    common_vendor.ref();
    let inputDialog = common_vendor.ref();
    let alertDialog = common_vendor.ref();
    function editInfo() {
      inputDialog.value.open();
    }
    async function dialogInputConfirm(val) {
      if (val == "") {
        utils_Toast.showMsg("备注不能为空", 1500);
      } else {
        let {
          data: res
        } = await utils_request.request("/user/updateFriendName", "put", {
          myId: id.value,
          friendId: keyId.value,
          remark: val
        });
        if (res.code != 200)
          return utils_Toast.showMsg("更新失败");
        getData(id.value, keyId.value);
        utils_Toast.showMsg("更新成功", 1500, "success");
      }
    }
    function removeUser() {
      alertDialog.value.open();
    }
    async function confirmDelete() {
      console.log(id.value, keyId.value);
      let {
        data: res
      } = await utils_request.request("/user/removeFriend", "delete", {
        myId: id.value,
        friendId: keyId.value
      });
      if (res.code != 200)
        return false;
      utils_Toast.showMsg(res.msg, 2e3, "loading");
      setTimeout(() => {
        common_vendor.index.switchTab({
          url: "/pages/home/home"
        });
      });
      console.log(res);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          obj: common_vendor.unref(headObj)
        }),
        b: common_vendor.t(common_vendor.unref(infoDate).remarked),
        c: common_vendor.o(($event) => editInfo()),
        d: common_vendor.t(common_vendor.unref(infoDate).username),
        e: common_vendor.t(common_vendor.unref(infoDate).signature),
        f: common_vendor.t(common_vendor.unref(formatSex)),
        g: common_vendor.t(common_vendor.unref(initBirthday)),
        h: common_vendor.t(common_vendor.unref(initTelephone)),
        i: common_vendor.t(common_vendor.unref(initEmail)),
        j: common_vendor.o(removeUser),
        k: common_vendor.sr("inputClose", "baf24a3c-2,baf24a3c-1"),
        l: common_vendor.o(dialogInputConfirm),
        m: common_vendor.p({
          mode: "input",
          value: common_vendor.unref(infoDate).remarked,
          title: "请输入新的备注",
          placeholder: "备注"
        }),
        n: common_vendor.sr(inputDialog, "baf24a3c-1", {
          "k": "inputDialog"
        }),
        o: common_vendor.p({
          type: "dialog"
        }),
        p: common_vendor.o(confirmDelete),
        q: common_vendor.p({
          type: "warn",
          cancelText: "取消",
          confirmText: "确定",
          title: "",
          content: "确定删除该好友吗?"
        }),
        r: common_vendor.sr(alertDialog, "baf24a3c-3", {
          "k": "alertDialog"
        }),
        s: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-baf24a3c"], ["__file", "D:/uniapp毕设/lucky/pages/friendInfo/friendInfo.vue"]]);
wx.createPage(MiniProgramPage);
