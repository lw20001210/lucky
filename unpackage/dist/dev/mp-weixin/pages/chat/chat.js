"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_emojs = require("../../utils/emojs.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_ablilty = require("../../utils/ablilty.js");
require("../../utils/Toast.js");
require("../../utils/local.js");
require("../../utils/request.js");
require("../../utils/config.js");
if (!Array) {
  const _easycom_uv_popup2 = common_vendor.resolveComponent("uv-popup");
  _easycom_uv_popup2();
}
const _easycom_uv_popup = () => "../../uni_modules/uv-popup/components/uv-popup/uv-popup.js";
if (!Math) {
  (Header + _easycom_uv_popup)();
}
const Header = () => "../../component/header.js";
const _sfc_main = {
  __name: "chat",
  setup(__props) {
    let wh = common_vendor.ref();
    const userInfo = pinia_userInfo_userInfo.userStore();
    let foucsFlag = common_vendor.ref(false);
    let emojiFlag = common_vendor.ref(false);
    let optionFlag = common_vendor.ref(false);
    common_vendor.ref([]);
    let socket = null;
    let newMessage = common_vendor.ref("");
    let keyboardHeight = common_vendor.ref(0);
    let popup = common_vendor.ref();
    let options = common_vendor.ref();
    common_vendor.onLoad(async (option) => {
      getHeight();
      console.log(option);
      itemId.value = option.id;
      objDate.value.title = option.remarked;
    });
    let itemId = common_vendor.ref();
    let objDate = common_vendor.ref({
      leftFont: "icon-zuojiantou",
      title: "",
      path: "/pages/home/home"
    });
    let emojiHeight = common_vendor.ref(531);
    function getInputHeight(e) {
      if (e.detail.height != 0) {
        keyboardHeight.value = parseInt(e.detail.height) * 2 - 25;
        emojiHeight.value = parseInt(e.detail.height) * 2 - 25;
      }
    }
    function getHeight() {
      const val = common_vendor.index.getSystemInfoSync();
      wh.value = val.windowHeight - 130;
    }
    function closeKeyBorder(e) {
      if (e.detail.height == 0) {
        if (emojiFlag.value == false && optionFlag.value == false) {
          getHeight();
          keyboardHeight.value = 10;
          setTimeout(() => {
            foucsFlag.value = false;
          }, 100);
        }
      } else {
        keyboardHeight.value = parseInt(e.detail.height) * 2 - 25;
        wh.value = 440;
      }
    }
    common_vendor.onMounted(() => {
      socket = common_vendor.lookup("http://192.168.23.20:8888");
      socket.on("connect", () => {
        console.log("socket connected:", socket.connected);
      });
      socket.on("init", (msg) => {
        console.log(msg);
      });
      socket.emit("chat", "我是客户端推送过来的");
    });
    const sendMessage = () => {
      if (socket) {
        socket.emit("chat message", newMessage.value);
        newMessage.value = "";
      }
    };
    const debouncedInputChange = utils_ablilty.debounce(function inputChange(val) {
      newMessage.value = val;
    }, 800);
    const handleInput = (e) => {
      debouncedInputChange(e.detail.value);
    };
    function goInfo() {
      if (itemId.value == userInfo.id) {
        common_vendor.index.navigateTo({
          url: "/pages/editUser/editUser"
        });
      } else {
        common_vendor.index.navigateTo({
          url: `/pages/friendInfo/friendInfo?id=${itemId.value}`
        });
      }
    }
    function openPopup() {
      if (emojiFlag.value == false) {
        foucsFlag.value = false;
        foucsFlag.value = false;
        emojiFlag.value = true;
        options.value.close();
        keyboardHeight.value = 531;
        popup.value.open("bottom");
        wh.value = 440;
      } else {
        emojiFlag.value = false;
        keyboardHeight.value = 10;
        foucsFlag.value = true;
        popup.value.close();
      }
    }
    function openOption() {
      if (optionFlag.value == false) {
        foucsFlag.value = false;
        emojiFlag.value = false;
        optionFlag.value = true;
        popup.value.close();
        keyboardHeight.value = 531;
        options.value.open("bottom");
        wh.value = 440;
      } else {
        options.value.close();
        optionFlag.value = false;
        keyboardHeight.value = 10;
        foucsFlag.value = true;
      }
    }
    function addEmoji(index) {
      newMessage.value += utils_emojs.emoji[index];
      console.log(utils_emojs.emoji[index]);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goInfo),
        b: common_vendor.p({
          obj: common_vendor.unref(objDate)
        }),
        c: common_vendor.f(common_vendor.unref(utils_emojs.emoji), (item, k0, i0) => {
          return {
            a: common_vendor.t(item)
          };
        }),
        d: common_vendor.unref(wh) + "px",
        e: common_vendor.o(handleInput),
        f: common_vendor.o(closeKeyBorder),
        g: common_vendor.o(getInputHeight),
        h: common_vendor.unref(foucsFlag),
        i: common_vendor.unref(newMessage),
        j: !common_vendor.unref(emojiFlag)
      }, !common_vendor.unref(emojiFlag) ? {
        k: common_vendor.o(openPopup)
      } : {}, {
        l: common_vendor.unref(emojiFlag)
      }, common_vendor.unref(emojiFlag) ? {
        m: common_vendor.o(openPopup)
      } : {}, {
        n: common_vendor.unref(newMessage).length == 0
      }, common_vendor.unref(newMessage).length == 0 ? {
        o: common_vendor.o(openOption)
      } : {
        p: common_vendor.o(sendMessage)
      }, {
        q: common_vendor.unref(keyboardHeight) + "rpx",
        r: common_vendor.f(common_vendor.unref(utils_emojs.emoji), (item, i, i0) => {
          return {
            a: common_vendor.t(item),
            b: i,
            c: common_vendor.o(($event) => addEmoji(i), i)
          };
        }),
        s: common_vendor.unref(emojiHeight) + "rpx",
        t: common_vendor.sr(popup, "0a633310-1", {
          "k": "popup"
        }),
        v: common_vendor.p({
          overlay: false
        }),
        w: common_vendor.unref(emojiHeight) + "rpx",
        x: common_vendor.sr(options, "0a633310-2", {
          "k": "options"
        }),
        y: common_vendor.p({
          overlay: false
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a633310"], ["__file", "D:/uniapp毕设/lucky/pages/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);
