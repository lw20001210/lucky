"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_Toast = require("../../utils/Toast.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  _easycom_uni_file_picker2();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  _easycom_uni_file_picker();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "register",
  setup(__props) {
    const userPower = pinia_userInfo_userInfo.userStore();
    let userInfo = common_vendor.reactive({
      username: "",
      password: "",
      nickname: "",
      avatar: "https://aliyun_id_photo_bucket.oss.aliyuncs.com/default_handsome.jpg"
    });
    let imageStyles = common_vendor.ref({
      width: 98,
      height: 98,
      border: {
        "radius": "50%"
      }
    });
    function select(res) {
      userInfo.avatar = res.tempFilePaths[0];
    }
    function addUser() {
      let passwordLimit = /^[a-zA-Z0-9_]{4,15}$/;
      let usernameLimit = /^[a-zA-Z0-9_]{4,}$/;
      if (userInfo.avatar == "") {
        return utils_Toast.showMsg("你还未选择头像");
      } else if (userInfo.nickname == "") {
        return utils_Toast.showMsg("昵称不能未空");
      } else if (userInfo.username == "") {
        return utils_Toast.showMsg("账号不能未空");
      } else if (userInfo.password == "") {
        return utils_Toast.showMsg("密码不能未空");
      } else {
        if (!passwordLimit.test(userInfo.password)) {
          return utils_Toast.showMsg("密码格式有误");
        } else if (!usernameLimit.test(userInfo.username)) {
          return utils_Toast.showMsg("账号格式有误");
        } else {
          upload();
        }
      }
    }
    function upload() {
      let param = {
        nickname: userInfo.nickname,
        username: userInfo.username,
        password: userInfo.password
      };
      common_vendor.index.uploadFile({
        url: "http://192.168.242.20:3000/user/register",
        //仅为示例，非真实的接口地址
        filePath: userInfo.avatar,
        name: "avatar",
        timeout: 1e3,
        formData: param,
        success: (res) => {
          let result = JSON.parse(res.data);
          console.log(result);
          if (result.code == 200) {
            userPower.registeriUser(result.obj);
            utils_Toast.showMsg(result.msg, 1e3, "loading");
            common_vendor.index.reLaunch({
              url: "/pages/login/login"
            });
          } else {
            utils_Toast.showMsg(result.msg, 1e3);
          }
        },
        fail: () => {
          utils_Toast.showMsg("没开后台");
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(select),
        b: common_vendor.p({
          ["del-icon"]: false,
          limit: "1",
          imageStyles: common_vendor.unref(imageStyles),
          ["file-mediatype"]: "image",
          ["disable-preview"]: true,
          ["return-type"]: "object"
        }),
        c: common_vendor.unref(userInfo).nickname,
        d: common_vendor.o(($event) => common_vendor.unref(userInfo).nickname = $event.detail.value),
        e: common_vendor.unref(userInfo).username,
        f: common_vendor.o(($event) => common_vendor.unref(userInfo).username = $event.detail.value),
        g: common_vendor.unref(userInfo).password,
        h: common_vendor.o(($event) => common_vendor.unref(userInfo).password = $event.detail.value),
        i: common_vendor.o(addUser)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bac4a35d"], ["__file", "D:/新的开始/uniapp毕设/luckly/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
