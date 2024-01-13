"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_ablilty = require("../../utils/ablilty.js");
const utils_request = require("../../utils/request.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_Toast = require("../../utils/Toast.js");
const pinia_userInfo_status = require("../../pinia/userInfo/status.js");
require("../../utils/config.js");
require("../../utils/local.js");
if (!Array) {
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_textarea2 = common_vendor.resolveComponent("uv-textarea");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_input2 + _easycom_uv_textarea2 + _easycom_uv_button2)();
}
const _easycom_uv_input = () => "../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_textarea = () => "../../uni_modules/uv-textarea/components/uv-textarea/uv-textarea.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (Header + _easycom_uv_input + _easycom_uv_textarea + _easycom_uv_button)();
}
const Header = () => "../../component/header.js";
const _sfc_main = {
  __name: "createGroup",
  setup(__props) {
    const statusInfo = pinia_userInfo_status.statusStore();
    const userInfo = pinia_userInfo_userInfo.userStore();
    let objDate = common_vendor.ref({
      leftFont: "icon-zuojiantou",
      title: "创建群聊"
    });
    let searchValue = common_vendor.ref("");
    let areaValue = common_vendor.ref("");
    const customStyle = common_vendor.computed(() => {
      return {
        width: "250rpx"
      };
    });
    const input = utils_ablilty.debounce((e) => {
    }, 1e3);
    const areaInput = utils_ablilty.debounce((e) => {
    }, 1e3);
    function warn() {
      utils_Toast.showMsg("此功能尚未开发!");
    }
    async function createGroup() {
      let obj = {
        nickname: searchValue.value,
        adminId: userInfo.id,
        intro: areaValue.value,
        groupUserIds: statusInfo.groupUserIds
      };
      let { data: res } = await utils_request.request("/user/createGroup", "post", obj);
      if (res.code != 200)
        return utils_Toast.showMsg("创建失败");
      common_vendor.index.switchTab({
        url: "/pages/home/home"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          obj: common_vendor.unref(objDate)
        }),
        b: common_vendor.o(common_vendor.unref(input)),
        c: common_vendor.o(($event) => common_vendor.isRef(searchValue) ? searchValue.value = $event : searchValue = $event),
        d: common_vendor.p({
          maxlength: "30",
          fontSize: "22+'rpx'",
          placeholderStyle: "{fontSize:22+'rpx'}",
          placeholder: "填写群名称",
          border: "bottom",
          modelValue: common_vendor.unref(searchValue)
        }),
        e: common_vendor.o(warn),
        f: common_vendor.o(common_vendor.unref(areaInput)),
        g: common_vendor.o(($event) => common_vendor.isRef(areaValue) ? areaValue.value = $event : areaValue = $event),
        h: common_vendor.p({
          textStyle: "fontSize:30rpx;color:black",
          placeholderStyle: "fontSize:26rpx",
          count: true,
          placeholder: "介绍一下自己群吧",
          modelValue: common_vendor.unref(areaValue)
        }),
        i: common_vendor.o(createGroup),
        j: common_vendor.p({
          shape: "circle",
          color: "#3e6fac",
          text: "创建",
          customStyle: common_vendor.unref(customStyle)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c1a2246"], ["__file", "D:/uniapp毕设/lucky/pages/createGroup/createGroup.vue"]]);
wx.createPage(MiniProgramPage);
