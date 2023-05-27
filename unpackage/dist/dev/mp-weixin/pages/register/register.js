"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_Toast = require("../../utils/Toast.js");
const utils_local = require("../../utils/local.js");
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
    common_vendor.onLoad(() => {
      console.log("onload");
      utils_local.setLocal("login", true);
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
        // 我这里直接在前端进行加密了，因为传给后端的时候
        password: common_vendor.cryptoJsExports.MD5(userInfo.password).toString()
      };
      common_vendor.index.uploadFile({
        url: "http://192.168.85.20:3000/user/register",
        filePath: userInfo.avatar,
        name: "avatar",
        timeout: 1e3,
        formData: param,
        success: (res) => {
          let result = JSON.parse(res.data);
          console.log(result);
          if (result.code == 200) {
            utils_Toast.showMsg(result.msg, 1e3, "loading");
            common_vendor.index.reLaunch({
              url: "/pages/login/login"
            });
            utils_local.removeLocal("login");
          } else {
            utils_Toast.showMsg(result.msg, 1e3);
          }
        },
        fail: () => {
          utils_Toast.showMsg("注册失败");
        }
      });
    }
    function goBack() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goBack),
        b: common_vendor.o(select),
        c: common_vendor.p({
          ["del-icon"]: false,
          limit: "1",
          imageStyles: common_vendor.unref(imageStyles),
          ["file-mediatype"]: "image",
          ["disable-preview"]: true,
          ["return-type"]: "object"
        }),
        d: common_vendor.unref(userInfo).nickname,
        e: common_vendor.o(($event) => common_vendor.unref(userInfo).nickname = $event.detail.value),
        f: common_vendor.unref(userInfo).username,
        g: common_vendor.o(($event) => common_vendor.unref(userInfo).username = $event.detail.value),
        h: common_vendor.unref(userInfo).password,
        i: common_vendor.o(($event) => common_vendor.unref(userInfo).password = $event.detail.value),
        j: common_vendor.o(addUser)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bac4a35d"], ["__file", "D:/新的开始/uniapp毕设/luckly/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
