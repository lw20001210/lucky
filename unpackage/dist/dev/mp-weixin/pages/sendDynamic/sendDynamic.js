"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_local = require("../../utils/local.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_Toast = require("../../utils/Toast.js");
const utils_config = require("../../utils/config.js");
require("../../utils/request.js");
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
    const userRef = pinia_userInfo_userInfo.userStore();
    let resultData = common_vendor.ref({
      id: "",
      status: "2",
      content: {
        title: "",
        imgArr: []
      },
      position: ""
    });
    let headObj = common_vendor.ref({
      path: "/pages/selfStar/selfStar"
    });
    function deleteImage(e) {
      resultData.value.content.imgArr = resultData.value.content.imgArr.filter((item) => {
        return item != e.tempFilePath;
      });
    }
    function bindTextAreaBlur(e) {
      resultData.value.content.title = e.detail.value;
    }
    const powerRes = common_vendor.computed(() => {
      if (resultData.value.status == "0") {
        return "私密";
      } else if (resultData.value.status == "1") {
        return "所有人可见";
      } else {
        return "权限设置";
      }
    });
    function selectPower() {
      common_vendor.index.showActionSheet({
        itemList: ["私密", "所有人可见"],
        success: function(res) {
          if (res.tapIndex == "0") {
            resultData.value.status = res.tapIndex;
          } else if (res.tapIndex == "1") {
            resultData.value.status = res.tapIndex;
          } else {
            resultData.value.status = 2;
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
          console.log(res, 222);
          resultData.value.position = res.name;
        },
        fail: function(res) {
          console.log(res);
        }
      });
    }
    const positionRes = common_vendor.computed(() => {
      if (resultData.value.position == "") {
        return "所在位置";
      } else {
        return resultData.value.position;
      }
    });
    function select(e) {
      if (e.tempFilePaths) {
        resultData.value.content.imgArr = e.tempFilePaths;
      } else {
        resultData.value.content.imgArr = [];
      }
    }
    function distribute() {
      var _a, _b;
      let obj = {
        uid: userRef.id,
        content: resultData.value.content.title,
        status: resultData.value.status,
        position: resultData.value.position
      };
      if (resultData.value.content.title == "")
        return utils_Toast.showMsg("未填写发布内容");
      if (resultData.value.status != 0 && resultData.value.status != 1)
        return utils_Toast.showMsg("未选择权限");
      let fileList = [{ uri: "我没有上传图片" }];
      if (((_a = resultData.value.content) == null ? void 0 : _a.imgArr.length) != 0) {
        fileList = (_b = resultData.value.content) == null ? void 0 : _b.imgArr.map((item, index) => {
          return {
            name: index,
            uri: item
          };
        });
      }
      common_vendor.index.uploadFile({
        url: `${utils_config.mainUrl}/user/sedSpace`,
        files: fileList,
        formData: obj,
        timeout: 8e3,
        header: {
          authorization: utils_local.getLocal("token") ? utils_local.getLocal("token") : ""
        },
        success: (res) => {
          let result = JSON.parse(res.data);
          if (result.code == 200) {
            utils_Toast.showMsg(result.msg, 1e3, "loading");
          }
          common_vendor.index.redirectTo({
            url: "/pages/selfStar/selfStar"
          });
        },
        fail: (err) => {
          return utils_Toast.showMsg("发布失败", 1e3, "loading");
        }
      });
    }
    common_vendor.onShow(() => {
      resultData.value.status = "2";
    });
    common_vendor.onUnload(() => {
      resultData.value.position = "";
      resultData.value.status = "2";
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(distribute),
        b: common_vendor.p({
          obj: common_vendor.unref(headObj)
        }),
        c: common_vendor.o(bindTextAreaBlur),
        d: common_vendor.o(select),
        e: common_vendor.o(deleteImage),
        f: common_vendor.p({
          limit: "9",
          fileMediatype: "image",
          mode: "grid"
        }),
        g: common_vendor.t(common_vendor.unref(positionRes)),
        h: common_vendor.o(getLocation),
        i: common_vendor.t(common_vendor.unref(powerRes)),
        j: common_vendor.o(selectPower)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a04d0646"], ["__file", "D:/uniapp毕设/lucky/pages/sendDynamic/sendDynamic.vue"]]);
wx.createPage(MiniProgramPage);
