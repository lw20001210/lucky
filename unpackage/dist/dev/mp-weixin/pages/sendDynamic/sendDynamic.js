"use strict";
const common_vendor = require("../../common/vendor.js");
const pinia_userInfo_mySpace = require("../../pinia/userInfo/mySpace.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  _easycom_uni_file_picker2();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  (Header + _easycom_uni_file_picker)();
}
const Header = () => "../../component/header.js";
const _sfc_main = {
  __name: "sendDynamic",
  setup(__props) {
    const mySpace = pinia_userInfo_mySpace.mySpaceStore();
    const { id, content, statu } = common_vendor.storeToRefs(mySpace);
    let headObj = common_vendor.ref({
      path: "/pages/selfStar/selfStar"
    });
    function deleteImage(e) {
      content.value.imgArr = content.value.imgArr.filter((item) => {
        return item != e.tempFilePath;
      });
    }
    function bindTextAreaBlur(e) {
      console.log(e.detail.value);
      content.value.title = e.detail.value;
    }
    function select(e) {
      console.log(e);
      content.value.imgArr = e.tempFilePaths;
    }
    const powerRes = common_vendor.computed(() => {
      if (statu.value == "0") {
        return "私密";
      } else if (statu.value == "1") {
        return "所有人可见";
      } else {
        return "权限设置";
      }
    });
    function selectPower() {
      common_vendor.index.showActionSheet({
        itemList: ["私密", "所有人可见"],
        success: function(res) {
          console.log("选中了第" + res.tapIndex + "个按钮");
          if (res.tapIndex == "0") {
            statu.value = res.tapIndex;
          } else if (res.tapIndex == "1") {
            statu.value = res.tapIndex;
          }
        },
        fail: function(res) {
          console.log(res.errMsg);
        }
      });
    }
    function getLocation() {
      common_vendor.index.chooseLocation({
        success: function(res) {
          console.log(res);
        },
        fail: function(res) {
          console.log(res);
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          obj: common_vendor.unref(headObj)
        }),
        b: common_vendor.o(bindTextAreaBlur),
        c: common_vendor.o(select),
        d: common_vendor.o(deleteImage),
        e: common_vendor.p({
          limit: "9",
          fileMediatype: "image",
          mode: "grid"
        }),
        f: common_vendor.o(getLocation),
        g: common_vendor.t(common_vendor.unref(powerRes)),
        h: common_vendor.o(selectPower)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a04d0646"], ["__file", "D:/新的开始/uniapp毕设/luckly/pages/sendDynamic/sendDynamic.vue"]]);
wx.createPage(MiniProgramPage);
