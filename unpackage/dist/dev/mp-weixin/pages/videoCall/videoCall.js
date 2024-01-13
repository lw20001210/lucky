"use strict";
const common_vendor = require("../../common/vendor.js");
const pinia_userInfo_status = require("../../pinia/userInfo/status.js");
const _sfc_main = {
  __name: "videoCall",
  setup(__props) {
    let context = common_vendor.ref(null);
    let windowWidth = common_vendor.ref(0);
    let windowHeight = common_vendor.ref(0);
    let statusNav = common_vendor.ref(0);
    let fromUid = common_vendor.ref();
    let toUid = common_vendor.ref();
    let avatar = common_vendor.ref("");
    let type = common_vendor.ref("");
    let isSwitch = common_vendor.ref(false);
    let enableCamera = common_vendor.ref(true);
    const statusInfo = pinia_userInfo_status.statusStore();
    common_vendor.onLoad((option) => {
      let sys = common_vendor.index.getSystemInfoSync();
      windowWidth.value = sys.windowWidth;
      windowHeight.value = sys.windowHeight;
      statusNav.value = sys.statusBarHeight;
      try {
        fromUid.value = option.fromUid;
        toUid.value = option.toUid;
        avatar.value = statusInfo.avatar;
        type.value = option.type;
        context.value = common_vendor.index.createLivePusherContext("livePusher", common_vendor.getCurrentInstance().proxy);
      } catch (error2) {
        console.error("Error in onLoad:", error2);
      }
    });
    function handUp() {
      stopPreview();
      common_vendor.index.navigateBack();
    }
    function statechange(e) {
      console.log("statechange:" + JSON.stringify(e));
    }
    function netstatus(e) {
      console.log("netstatus:" + JSON.stringify(e));
    }
    function error(e) {
      console.log("error:" + JSON.stringify(e));
    }
    function switchCamera() {
      console.log(88);
      context.value.switchCamera({
        success: (a) => {
          console.log("切换摄像头" + JSON.stringify(a));
        }
      });
    }
    function stopPreview() {
      console.log("关闭摄像头预览");
      context.value.stopPreview({
        success: (a) => {
          console.log("livePusher.stopPreview:" + JSON.stringify(a));
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(isSwitch) ? 1 : "",
        b: "rtmp://192.168.241.20/live/" + common_vendor.unref(fromUid),
        c: !common_vendor.unref(isSwitch) ? common_vendor.unref(windowWidth) + "px" : "175px",
        d: !common_vendor.unref(isSwitch) ? common_vendor.unref(windowHeight) + "px" : "500rpx",
        e: common_vendor.unref(enableCamera),
        f: common_vendor.o(statechange),
        g: common_vendor.o(netstatus),
        h: common_vendor.o(error),
        i: common_vendor.o(($event) => common_vendor.isRef(isSwitch) ? isSwitch.value = true : isSwitch = true),
        j: `http://192.168.241.20:8000/live/${common_vendor.unref(toUid)}.flv`,
        k: (common_vendor.unref(isSwitch) ? common_vendor.unref(windowWidth) : "175") + "px",
        l: common_vendor.unref(isSwitch) ? common_vendor.unref(windowHeight) + "px" : "500rpx",
        m: !common_vendor.unref(isSwitch) ? 1 : ""
      }, {}, {
        n: common_vendor.unref(statusNav) + "px",
        o: common_vendor.o(handUp),
        p: common_vendor.o(switchCamera)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd14bb92"], ["__file", "D:/uniapp毕设/lucky/pages/videoCall/videoCall.vue"]]);
wx.createPage(MiniProgramPage);
