"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_format = require("../../utils/format.js");
const utils_request = require("../../utils/request.js");
const pinia_userInfo_status = require("../../pinia/userInfo/status.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_config = require("../../utils/config.js");
require("../../utils/local.js");
require("../../utils/Toast.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_search_bar2 + _easycom_uni_list_chat2 + _easycom_uni_list2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_list_chat = () => "../../uni_modules/uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (statusBar + _easycom_uni_search_bar + _easycom_uni_list_chat + _easycom_uni_list)();
}
const statusBar = () => "../../component/statusBar.js";
const _sfc_main = {
  __name: "home",
  setup(__props) {
    let animationData = common_vendor.ref({});
    let animation = common_vendor.ref(null);
    let isShow = common_vendor.ref(false);
    let socket = common_vendor.ref(null);
    const userPower = new pinia_userInfo_userInfo.userStore();
    const statusInfo = pinia_userInfo_status.statusStore();
    function goCreateGroup() {
      common_vendor.index.navigateTo({
        url: "/pages/search/search?url=group"
      });
    }
    function openPopup() {
      if (!animation.value) {
        animation.value = common_vendor.index.createAnimation({
          duration: 200,
          transformOrigin: "top right",
          timingFunction: "ease"
        });
      }
      const animationValue = animation.value;
      if (isShow.value) {
        animationValue.opacity(0).width(0).height(0).step();
        isShow.value = false;
      } else {
        animationValue.opacity(1).width("300rpx").height("428rpx").step();
        isShow.value = true;
      }
      animationData.value = animationValue.export();
    }
    function close() {
      if (!animation.value)
        return;
      animation.value.opacity(0).width(0).height(0).step();
      animationData.value = animation.value.export();
      isShow.value = false;
    }
    let wh = common_vendor.ref();
    function getHeight() {
      common_vendor.index.getSystemInfoSync();
    }
    common_vendor.onMounted(() => {
      getHeight();
    });
    function goInfo() {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${userPower.id}`
      });
      close();
    }
    const goSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
      close();
    };
    function goChat(item) {
      if (item.adminId) {
        common_vendor.index.navigateTo({
          url: `/pages/chat/chat?groupId=${item.id}&groupName=${item.nickname}`
        });
      } else {
        statusInfo.avatar = item.avatar;
        common_vendor.index.navigateTo({
          url: `/pages/chat/chat?id=${item.id}&remarked=${item.remarked}`
        });
      }
      close();
    }
    function scanCode() {
      common_vendor.index.scanCode({
        success: function(res) {
          console.log("条码内容：" + res.result);
          common_vendor.index.navigateTo({
            url: `/pages/addFriend/addFriend?username=${res.result}`
          });
        }
      });
    }
    let friendList = common_vendor.ref([]);
    async function getData() {
      let {
        data: res
      } = await utils_request.request("/user/getFriendList", "get", {
        id: userPower.id
      });
      if (res.code != 200)
        return showMsg("获取数据失败");
      res.data.forEach((item) => {
        if (item.id == userPower.id) {
          item.createTime = utils_format.getTimeFormat(Number(userPower.createTime));
          item["remarked"] = item.nickname;
        }
      });
      let {
        // 获取朋友列表最新消息的状态
        data: otherData
      } = await utils_request.request("/user/getFriendStatus", "get", {
        id: userPower.id
      });
      res.data.forEach((item) => {
        item.total = 0;
        otherData.data.total.forEach((val) => {
          if (userPower.id == val.toUid) {
            if (item.id == val.fromUid) {
              item.total += 1;
            }
          }
        });
      });
      let categorizedArr = {};
      otherData.data.datas.forEach((item) => {
        let key = item.fromUid < item.toUid ? `${item.fromUid}-${item.toUid}` : `${item.toUid}-${item.fromUid}`;
        categorizedArr[key] = item;
      });
      let result = Object.values(categorizedArr);
      res.data.forEach((item) => {
        item.message = "";
        result.forEach((val) => {
          if (userPower.id == val.fromUid && item.id == val.toUid || userPower.id == val.toUid && item.id == val.fromUid) {
            item.createTime = val.createTime;
            if (val.type == 0) {
              item.message = val.message;
            } else if (val.type == 1) {
              item.message = "图片";
            } else if (val.type == 2) {
              item.message = "语音";
            } else if (val.type == 3) {
              item.message = "位置";
            } else if (val.type == 4) {
              item.message = "视频";
            } else {
              item.message = "";
            }
          }
        });
      });
      let {
        data: groups
      } = await utils_request.request("/user/getGroupList", "get", {
        uid: userPower.id
      });
      groups.data.forEach((item) => [
        groups.endMsgs.forEach((val) => {
          if (item.id == val.groupId) {
            item.createTime = val.createTime;
            if (val.type == 0) {
              item.message = val.message;
            } else if (val.type == 1) {
              item.message = "图片";
            } else if (val.type == 2) {
              item.message = "语音";
            } else if (val.type == 3) {
              item.message = "位置";
            } else if (val.type == 4) {
              item.message = "视频";
            } else {
              item.message = "";
            }
          }
        })
      ]);
      res.data = [...res.data, ...groups.data];
      res.data.sort(function(a, b) {
        return b.createTime - a.createTime;
      });
      res.data.forEach((item) => {
        result.forEach((val) => {
          if (!item.adminId && (userPower.id == val.fromUid && item.id == val.toUid) || !item.adminId && (userPower.id == val.toUid && item.id == val.fromUid)) {
            item.createTime = utils_format.getTimeFormat(Number(val.createTime));
          }
        });
      });
      res.data.forEach((item) => {
        groups.endMsgs.forEach((val) => {
          if (item.adminId && item.id == val.groupId) {
            item.createTime = utils_format.getTimeFormat(Number(item.createTime));
          }
        });
      });
      friendList.value = res.data;
    }
    function socketIo() {
      socket.value = common_vendor.io(utils_config.mainUrl, {
        transports: ["websocket", "polling"],
        timeout: 5e3,
        query: {
          id: userPower.id
        }
      });
      statusInfo.socket = socket.value;
      socket.value.on("connect", () => {
      });
      socket.value.on("init", (msg) => {
        statusInfo.userList = msg;
      });
    }
    common_vendor.onShow(() => {
      userPower.getUserInfo();
      getData();
      socketIo();
    });
    common_vendor.onLoad(() => {
      socketIo();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userPower).avatar,
        b: common_vendor.o(goInfo),
        c: common_vendor.t(common_vendor.unref(userPower).nickname),
        d: common_vendor.o(openPopup),
        e: common_vendor.o(goSearch),
        f: common_vendor.o(goCreateGroup),
        g: common_vendor.o(scanCode),
        h: common_vendor.o(close),
        i: common_vendor.unref(animationData),
        j: common_vendor.p({
          placeholder: "搜索",
          readonly: true
        }),
        k: common_vendor.o(goSearch),
        l: common_vendor.f(common_vendor.unref(friendList), (item, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(($event) => goChat(item), index),
            c: "07e72d3c-3-" + i0 + ",07e72d3c-2",
            d: common_vendor.p({
              clickable: true,
              ["avatar-circle"]: true,
              title: item.adminId ? item.nickname : item.remarked,
              avatar: item.adminId ? item.avatar ? item.avatar : "../../static/images/groupAvatar.jpg" : item.avatar,
              note: item.message ? item.message : item.intro,
              time: item.createTime,
              showBadge: true,
              ["badge-text"]: item.adminId ? "" : item.total
            })
          };
        }),
        m: common_vendor.p({
          border: false
        }),
        n: common_vendor.unref(wh) + "px"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"], ["__file", "D:/uniapp毕设/lucky/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
