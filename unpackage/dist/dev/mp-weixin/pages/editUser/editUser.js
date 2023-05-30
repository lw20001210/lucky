"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_local = require("../../utils/local.js");
const utils_Toast = require("../../utils/Toast.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_file_picker2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (Header + _easycom_uni_file_picker + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const Header = () => "../../component/header.js";
const _sfc_main = {
  __name: "editUser",
  setup(__props) {
    let headObj = common_vendor.ref({
      leftFont: "icon-zuojiantou",
      title: "账号设置",
      path: "/pages/star/star"
    });
    let imageStyles = common_vendor.ref({
      width: 50,
      height: 50,
      border: {
        "radius": "50%"
      }
    });
    let userInfo = common_vendor.reactive({
      username: "",
      password: "",
      nickname: "",
      avatar: ""
    });
    function Warn() {
      utils_Toast.showMsg("该功能尚未开发");
    }
    const powerStore = pinia_userInfo_userInfo.userStore();
    const {
      nickname,
      username,
      avatar,
      signature,
      email,
      phone,
      password,
      sex,
      birthday
    } = common_vendor.storeToRefs(powerStore);
    function removeUser() {
      powerStore.removeUser();
    }
    function select(res) {
      userInfo.avatar = res.tempFilePaths[0];
      avatar.value = res.tempFilePaths[0];
      upload();
    }
    common_vendor.onLoad(() => {
      console.log("onload");
      utils_local.setLocal("edits", true);
    });
    common_vendor.onUnload(() => {
      utils_local.removeLocal("edits");
    });
    function upload() {
      let param = {
        nickname: nickname.value,
        username: username.value
        // 我这里直接在前端进行加密了，因为传给后端的时候
        // password: MD5(userInfo.password).toString()
      };
      common_vendor.index.uploadFile({
        url: "http://192.168.39.20:3000/user/update",
        filePath: userInfo.avatar,
        name: "avatar",
        timeout: 1500,
        header: {
          authorization: utils_local.getLocal("token") ? utils_local.getLocal("token") : ""
        },
        formData: param,
        success: (res) => {
          let result = JSON.parse(res.data);
          console.log(result);
          if (result.code == 200) {
            avatar.value = result.data.avatar;
            utils_Toast.showMsg("更新成功", 1e3, "loading");
          }
          utils_local.removeLocal("edits");
        },
        fail: () => {
          utils_Toast.showMsg("更新失败");
        }
      });
    }
    let info = common_vendor.ref();
    const infoVal = common_vendor.computed(() => {
      return "请输入" + info.value;
    });
    const onSignature = common_vendor.computed(() => {
      if (!signature.value) {
        return "这个人很懒，什么都没有留下666";
      } else {
        return signature.value;
      }
    });
    const onEmail = common_vendor.computed(() => {
      if (!email.value) {
        return "未设置";
      } else {
        return email.value;
      }
    });
    const onPhone = common_vendor.computed(() => {
      if (!phone.value) {
        return "未绑定";
      } else {
        return phone.value;
      }
    });
    const onSex = common_vendor.computed(() => {
      if (sex.value == 0) {
        return "女";
      } else {
        return "男";
      }
    });
    const initBirthday = common_vendor.computed(() => {
      if (!birthday.value) {
        return "未设置";
      } else {
        return birthday.value;
      }
    });
    common_vendor.computed(() => {
      if (!birthday.value) {
        return "未设置";
      } else {
        birthday.value = getDate({ format: true });
        getDate({ format: true });
      }
    });
    const startDate = common_vendor.computed(() => {
      return getDate("start");
    });
    const endDate = common_vendor.computed(() => {
      return getDate("end");
    });
    function bindDateChange(e) {
      birthday.value = e.detail.value;
      console.log(e);
      return powerStore.updateUser({
        username: username.value,
        // 直接用响应式的值做对象的键会报错
        "birthday": e.detail.value
      });
    }
    function getDate(type) {
      const date = /* @__PURE__ */ new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    }
    let inputDialog = common_vendor.ref();
    let inputClose = common_vendor.ref();
    function upDateInfo(val) {
      info.value = val;
      inputDialog.value.open();
    }
    function editInfo(val) {
      switch (val) {
        case "个性签名":
          upDateInfo(val);
          break;
        case "昵称":
          upDateInfo(val);
          break;
        case "邮箱":
          upDateInfo(val);
          break;
        case "绑定手机号":
          upDateInfo(val);
          break;
        case "新密码":
          upDateInfo(val);
          break;
        case "性别":
          common_vendor.index.showActionSheet({
            itemList: ["男", "女"],
            success: function(res) {
              if (res.tapIndex == 1) {
                console.log(res.tapIndex);
                sex.value = "女";
                return powerStore.updateUser({
                  username: username.value,
                  // 直接用响应式的值做对象的键会报错
                  "sex": 0
                });
              } else if (res.tapIndex == 0) {
                console.log(res.tapIndex);
                sex.value = "男";
                return powerStore.updateUser({
                  username: username.value,
                  // 直接用响应式的值做对象的键会报错
                  "sex": 1
                });
              }
              utils_Toast.showMsg("修改中", 800, "loading");
            },
            fail: function(res) {
              console.log(res.errMsg);
            }
          });
      }
    }
    let itemVal = common_vendor.ref();
    common_vendor.watch(info, (newX) => {
      info.value = newX;
      if (newX == "个性签名") {
        itemVal.value = "signature";
      } else if (newX == "昵称") {
        itemVal.value = "nickname";
      } else if (newX == "邮箱") {
        itemVal.value = "email";
      } else if (newX == "绑定手机号") {
        itemVal.value = "phone";
      } else if (newX == "新密码") {
        itemVal.value = "password";
      }
    });
    let infoValue = common_vendor.ref();
    function dialogInputConfirm(e) {
      console.log(e);
      infoValue.value = e;
      console.log(infoValue.value);
      if (itemVal.value == "password") {
        infoValue.value = common_vendor.cryptoJsExports.MD5(infoValue.value).toString();
      }
      powerStore.updateUser({
        username: username.value,
        // 直接用响应式的值做对象的键会报错
        [itemVal.value]: infoValue.value
      });
      utils_Toast.showMsg("修改中", 800, "loading");
      inputDialog.value.close();
      inputDialog.value.close();
      infoValue.value = "";
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          obj: common_vendor.unref(headObj)
        }),
        b: common_vendor.o(select),
        c: common_vendor.p({
          ["del-icon"]: false,
          limit: "1",
          imageStyles: common_vendor.unref(imageStyles),
          ["file-mediatype"]: "image",
          ["disable-preview"]: true,
          ["return-type"]: "object"
        }),
        d: common_vendor.t(common_vendor.unref(onSignature)),
        e: common_vendor.o(($event) => editInfo("个性签名")),
        f: common_vendor.t(common_vendor.unref(nickname)),
        g: common_vendor.o(($event) => editInfo("昵称")),
        h: common_vendor.t(common_vendor.unref(onSex)),
        i: common_vendor.o(($event) => editInfo("性别")),
        j: common_vendor.t(common_vendor.unref(initBirthday)),
        k: common_vendor.unref(birthday),
        l: common_vendor.unref(startDate),
        m: common_vendor.unref(endDate),
        n: common_vendor.o(bindDateChange),
        o: common_vendor.t(common_vendor.unref(onEmail)),
        p: common_vendor.o(($event) => editInfo("邮箱")),
        q: common_vendor.t(common_vendor.unref(onPhone)),
        r: common_vendor.o(($event) => editInfo("绑定手机号")),
        s: common_vendor.o(Warn),
        t: common_vendor.o(($event) => editInfo("新密码")),
        v: common_vendor.o(removeUser),
        w: common_vendor.sr(inputClose, "24ea2ac3-3,24ea2ac3-2", {
          "k": "inputClose"
        }),
        x: common_vendor.o(dialogInputConfirm),
        y: common_vendor.p({
          mode: "input",
          value: common_vendor.unref(infoValue),
          title: common_vendor.unref(info),
          placeholder: common_vendor.unref(infoVal)
        }),
        z: common_vendor.sr(inputDialog, "24ea2ac3-2", {
          "k": "inputDialog"
        }),
        A: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-24ea2ac3"], ["__file", "D:/新的开始/uniapp毕设/luckly/pages/editUser/editUser.vue"]]);
wx.createPage(MiniProgramPage);
