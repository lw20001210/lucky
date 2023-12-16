"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_local = require("../../utils/local.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_Toast = require("../../utils/Toast.js");
require("../../utils/request.js");
require("../../utils/config.js");
if (!Math) {
  (stastuBar + featureItem)();
}
const stastuBar = () => "../../component/statusBar.js";
const featureItem = () => "../../component/featureItem.js";
const _sfc_main = {
  __name: "star",
  setup(__props) {
    const userPower = new pinia_userInfo_userInfo.userStore();
    const {
      avatar,
      nickname,
      signature
    } = common_vendor.storeToRefs(userPower);
    common_vendor.watch(avatar, (newX) => {
      avatar.value = newX;
    });
    const onSignature = common_vendor.computed(() => {
      return signature.value;
    });
    common_vendor.onLoad(() => {
      userPower.getUserInfo();
    });
    let obj = common_vendor.ref([{
      textFont: "icon-icon6",
      title: "编辑资料",
      bgColor: "#1db856"
    }, {
      textFont: "icon-tubiaozhizuomoban-",
      title: "好友动态",
      bgColor: " #5a69f1"
    }, {
      textFont: "icon-dongtai",
      title: "个人空间",
      bgColor: "#1db856"
    }, {
      textFont: "icon-tongzhizhongxin",
      title: "系统通知",
      bgColor: "#1db856"
    }, {
      textFont: "icon-tuichu",
      title: "退出登录",
      bgColor: "#f15a8a"
    }]);
    function ability(val) {
      switch (val) {
        case "退出登录":
          common_vendor.index.showModal({
            title: "提示",
            content: "是否退出登录?",
            cancelText: "关闭",
            confirmText: "同意",
            success: function(res) {
              if (res.confirm) {
                utils_Toast.showMsg("退出登录中", 1e3, "loading");
                setTimeout(() => {
                  common_vendor.index.reLaunch({
                    url: `/pages/login/login?username=${userPower.username}`,
                    animationType: "pop-in",
                    animationDuration: 200
                  });
                }, 500);
                utils_local.removeLocal("token");
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            }
          });
          break;
        case "编辑资料":
          common_vendor.index.navigateTo({
            url: "/pages/editUser/editUser"
          });
          break;
        case "好友动态":
          common_vendor.index.navigateTo({
            url: "/pages/dynamic/dynamic"
          });
          break;
        case "个人空间":
          common_vendor.index.navigateTo({
            url: "/pages/selfStar/selfStar"
          });
          break;
        case "系统通知":
          common_vendor.index.navigateTo({
            url: "/pages/sys/sys"
          });
          break;
      }
    }
    function goQrcode() {
      common_vendor.index.navigateTo({
        url: "/pages/qrcode/qrcode",
        animationType: "pop-in",
        animationDuration: 200
      });
    }
    function goInfo() {
      common_vendor.index.navigateTo({
        url: "/pages/editUser/editUser",
        animationType: "pop-in",
        animationDuration: 200
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(avatar),
        b: common_vendor.o(goInfo),
        c: common_vendor.t(common_vendor.unref(nickname)),
        d: common_vendor.t(common_vendor.unref(onSignature)),
        e: common_vendor.o(goQrcode),
        f: common_vendor.f(common_vendor.unref(obj), (item, i, i0) => {
          return common_vendor.e({
            a: common_vendor.o(($event) => ability(item.title), item.title),
            b: "611ff4ad-1-" + i0,
            c: common_vendor.p({
              objData: item
            }),
            d: i % 2 != 1
          }, i % 2 != 1 ? {} : {}, {
            e: item.title
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-611ff4ad"], ["__file", "D:/uniapp毕设/lucky/pages/star/star.vue"]]);
wx.createPage(MiniProgramPage);
