"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const utils_format = require("../../utils/format.js");
const utils_emojs = require("../../utils/emojs.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const pinia_userInfo_status = require("../../pinia/userInfo/status.js");
const utils_ablilty = require("../../utils/ablilty.js");
const utils_Toast = require("../../utils/Toast.js");
const common_assets = require("../../common/assets.js");
require("../../utils/config.js");
require("../../utils/local.js");
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
    var _a;
    const recorderManager = common_vendor.index.getRecorderManager();
    const innerAudioContext = common_vendor.index.createInnerAudioContext();
    innerAudioContext.autoplay = true;
    const userInfo = pinia_userInfo_userInfo.userStore();
    const statusInfo = pinia_userInfo_status.statusStore();
    let foucsFlag = common_vendor.ref(false);
    let emojiFlag = common_vendor.ref(false);
    let optionFlag = common_vendor.ref(false);
    const messages = common_vendor.ref([]);
    let newMessage = common_vendor.ref("");
    const isVoice = common_vendor.ref(false);
    let voicePath = common_vendor.ref("");
    let wh = common_vendor.ref();
    let keyboardHeight = common_vendor.ref(0);
    let popup = common_vendor.ref();
    let options = common_vendor.ref();
    let audioAni = common_vendor.ref();
    let itemId = common_vendor.ref();
    let emojiHeight = common_vendor.ref(531);
    let objDate = common_vendor.ref({
      leftFont: "icon-zuojiantou",
      title: ""
      // path: '/pages/home/home'
    });
    let chatType = common_vendor.ref(0);
    let audioIndex = common_vendor.ref(-1);
    let scrollTop = common_vendor.ref(0);
    let refreshFlag = common_vendor.ref(true);
    let triggered = common_vendor.ref(false);
    let page = common_vendor.ref(1);
    let pageNum = common_vendor.ref(30);
    let total = common_vendor.ref(0);
    let starTime = common_vendor.ref("");
    let obj = common_vendor.ref({
      fromUid: userInfo.id,
      toUid: itemId.value ? itemId.value : 0,
      page: page.value,
      pageNum: pageNum.value
    });
    let groupId = common_vendor.ref();
    let scrollHeight = common_vendor.ref(9999999999);
    common_vendor.ref([]);
    function scrollBottom() {
      setTimeout(() => {
        scrollHeight.value += 1;
        scrollTop.value += scrollHeight.value;
      }, 20);
    }
    function goDetail(item) {
      if (chatType.value == 0) {
        common_vendor.index.navigateTo({
          url: `/pages/detail/detail?id=${itemId.value}`
        });
      } else {
        common_vendor.index.navigateTo({
          url: `/pages/detail/detail?id=${item.fromUid}`
        });
        console.log(item, 88);
      }
    }
    common_vendor.watch(messages, (val) => {
      messages.value.forEach((item) => {
        if (item.type === 3) {
          item.address.markers = [{
            id: 1,
            width: 30,
            height: 30,
            latitude: item.latitude,
            longitude: item.longitude,
            iconPath: "/static/images/address.png"
          }];
        }
      });
    }, {
      immediate: true
    });
    common_vendor.onShow(() => {
      recorderManager.onStop(function(res) {
        voicePath.value = res.tempFilePath;
        let objs = {};
        if (chatType.value == 0) {
          objs = {
            fromUid: userInfo.id,
            toUid: itemId.value,
            message: voicePath.value,
            type: 2,
            createTime: Date.now(),
            status: 0,
            audioTime: ""
          };
        } else {
          objs = {
            fromUid: userInfo.id,
            groupId: groupId.value,
            message: voicePath.value,
            type: 2,
            createTime: Date.now(),
            status: 0,
            audioTime: "",
            remarked: userInfo.nickname
          };
        }
        let time = Math.ceil((Date.now() - starTime.value) / 1e3);
        objs.avatar = userInfo.avatar;
        objs.audioTime = time;
        utils_ablilty.pathToBase64(res.tempFilePath).then((base64) => {
          var _a2, _b, _c, _d;
          objs.message = base64;
          if (chatType.value == 0) {
            (_a2 = statusInfo.socket) == null ? void 0 : _a2.emit("getChatVoice", objs);
            (_b = statusInfo.socket) == null ? void 0 : _b.on("audio", (data) => {
              objs.message = data.message;
              messages.value.push(objs);
              console.log(data, 987);
            });
          } else {
            (_c = statusInfo.socket) == null ? void 0 : _c.emit("groupMsg", objs);
            (_d = statusInfo.socket) == null ? void 0 : _d.on("audio", (data) => {
              objs.message = data.message;
              messages.value.push(objs);
            });
          }
          scrollBottom();
        }).catch((err) => {
          utils_Toast.showMsg("信息错误");
        });
      });
      scrollBottom();
    });
    common_vendor.onUnload(() => {
      if (chatType.value == 1) {
        statusInfo.socket.emit("leave", {
          id: userInfo.id,
          groupId: groupId.value
        });
      } else {
        statusInfo.socket.emit("leaveChatRoom", {
          id: userInfo.id
        });
      }
    });
    function onSrcollTop(e) {
      triggered.value = true;
      refreshFlag.value = true;
      let num = page.value * pageNum.value;
      if (messages.value.length > 20) {
        if (messages.value.length == 0 || num > total.value) {
          triggered.value = false;
          refreshFlag.value = false;
          return utils_Toast.showMsg("已经没有数据了");
        }
      } else {
        triggered.value = false;
        refreshFlag.value = false;
      }
      page.value += 1;
      obj.value.page = page.value;
      if (chatType.value == 0) {
        getChatList(obj.value);
      } else {
        let obj2 = {
          groupId: groupId.value,
          page: page.value,
          pageNum: pageNum.value
        };
        getGroupChatList(obj2);
      }
    }
    let groupUsers = common_vendor.ref([]);
    async function getGroupChatList(groupId2) {
      let {
        data: res
      } = await utils_request.request("/user/getGroupChats", "get", {
        groupId: groupId2
      });
      return res.data;
    }
    const getGroupUsers = async (groupId2) => {
      let {
        data: res
      } = await utils_request.request("/user/groupUserList", "get", {
        groupId: groupId2,
        myId: userInfo.id
      });
      if (res.code != 200) {
        return utils_Toast.showMsg("获取数据失败");
      } else {
        groupUsers.value = res.data;
        return res.data;
      }
    };
    common_vendor.onLoad(async (option) => {
      if (option.groupId) {
        chatType.value = 1;
        groupId.value = option.groupId;
        joinGroup(option.groupId);
        let chatList = await getGroupChatList(option.groupId);
        let userList = await getGroupUsers(option.groupId);
        chatList.forEach((item) => {
          userList.forEach((val) => {
            if (item.fromUid == val.id) {
              if (val.remarked) {
                item.avatar = val.avatar;
                return item.remarked = val.remarked;
              } else {
                item.avatar = val.avatar;
                return item.remarked = val.nickname;
              }
            }
          });
        });
        messages.value = chatList;
        console.log(chatList, 333);
        objDate.value.title = `${option.groupName} ( ${userList.length} )`;
        obj.value.page = page.value;
        obj.value.pageNum = pageNum.value;
        statusInfo.socket.on("listToGroupMsg", (data) => {
          groupUsers.value.forEach((item) => {
            if (item.id == data.fromUid) {
              data.avatar = item.avatar;
              if (data.fromUid == userInfo.id) {
                return data.remarked == item.nickname;
              } else {
                return data.remarked == item.remarked;
              }
            }
          });
          if (data.fromUid != userInfo.id) {
            messages.value.push(data);
          }
          scrollBottom();
        });
        scrollBottom();
      } else {
        joinChat(option.id);
        chatType.value = 0;
        itemId.value = option.id;
        objDate.value.title = option.remarked;
        obj.value.fromUid = userInfo.id;
        obj.value.toUid = option.id;
        obj.value.page = page.value;
        obj.value.pageNum = pageNum.value;
        getChatList(obj.value);
        statusInfo.socket.on("msgNotice", (data) => {
          if (data.toUid == userInfo.id && itemId.value == data.fromUid) {
            data.avatar = statusInfo.avatar;
            messages.value.push(data);
            scrollBottom();
          }
        });
      }
      getHeight();
    });
    const sendFlag = common_vendor.computed(() => {
      if (newMessage.value == "") {
        return true;
      } else {
        return false;
      }
    });
    function getChatList(obj2) {
      var _a2;
      (_a2 = statusInfo.socket) == null ? void 0 : _a2.emit("getMsgList", obj2);
    }
    (_a = statusInfo.socket) == null ? void 0 : _a.on("msgList", (msgs) => {
      if (msgs.total == 0) {
        setTimeout(() => {
          triggered.value = false;
          refreshFlag.value = false;
        }, 1e3);
      }
      total.value = msgs.total;
      msgs.data.forEach((item) => {
        if (item.fromUid == userInfo.id) {
          item.avatar = userInfo.avatar;
        } else {
          item.avatar = statusInfo.avatar;
        }
      });
      if (messages.value.length == 0) {
        messages.value = msgs.data;
        triggered.value = false;
        refreshFlag.value = false;
        return scrollBottom();
      } else {
        setTimeout(() => {
          messages.value = msgs.data;
          triggered.value = false;
          refreshFlag.value = false;
        }, 1e3);
      }
    });
    function getTime(time, index) {
      if (index == 0) {
        return utils_format.getTimeFormat(Number(time));
      } else {
        let preTime = messages.value[index - 1].createTime;
        let preT = (time - preTime) / 1e3;
        if (preT > 5 * 60) {
          return utils_format.getTimeFormat(Number(time));
        } else {
          return "";
        }
      }
    }
    function getInputHeight(e) {
      if (e.detail.height != 0) {
        keyboardHeight.value = parseInt(e.detail.height) * 2 - 25;
        emojiHeight.value = parseInt(e.detail.height) * 2 - 25;
      }
    }
    function getHeight() {
      common_vendor.index.getSystemInfoSync();
    }
    function closeKeyBorder(e) {
      if (e.detail.height == 0) {
        getHeight();
        if (emojiFlag.value) {
          emojiFlag.value = false;
          popup.value.close();
        }
        if (optionFlag.value) {
          optionFlag.value = false;
          options.value.close();
        }
        keyboardHeight.value = 10;
        setTimeout(() => {
          foucsFlag.value = false;
        }, 100);
      } else {
        if (optionFlag.value) {
          options.value.open("bottom");
        } else if (emojiFlag.value) {
          popup.value.open("bottom");
        }
        keyboardHeight.value = parseInt(e.detail.height) * 2 - 25;
        common_vendor.index.getSystemInfoSync();
      }
      scrollBottom();
    }
    function optionClick(type) {
      if (type == 1) {
        selectImg("album");
      } else if (type == 2) {
        selectImg("camera");
      } else if (type == 3) {
        sendAddress();
      } else if (type == 4) {
        common_vendor.index.navigateTo({
          url: `/pages/videoCall/videoCall?fromId=${userInfo.id}&toUid=${itemId.value}&type=4`
        });
      } else {
        utils_Toast.showMsg("功能尚未开发");
      }
    }
    function transForm() {
      isVoice.value = !isVoice.value;
    }
    const handleInput = utils_ablilty.debounce((e) => {
      newMessage.value = e.detail.value;
    }, 500);
    function goInfo() {
      if (groupId.value) {
        common_vendor.index.navigateTo({
          url: `/pages/groupInfo/groupInfo?groupId=${groupId.value}`
        });
      } else {
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
    }
    function openPopup() {
      if (emojiFlag.value == false) {
        foucsFlag.value = false;
        foucsFlag.value = false;
        emojiFlag.value = true;
        options.value.close();
        keyboardHeight.value = 531;
        popup.value.open("bottom");
      } else {
        emojiFlag.value = false;
        keyboardHeight.value = 10;
        foucsFlag.value = true;
        popup.value.close();
      }
      scrollBottom();
    }
    function openOption() {
      scrollBottom();
      if (optionFlag.value == false) {
        foucsFlag.value = false;
        emojiFlag.value = false;
        optionFlag.value = true;
        popup.value.close();
        keyboardHeight.value = 531;
        options.value.open("bottom");
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
    const sendMessage = () => {
      var _a2, _b;
      if (newMessage.value == "")
        return utils_Toast.showMsg("你还未输入内容");
      if (chatType.value == 0) {
        let objs = {
          fromUid: userInfo.id,
          toUid: itemId.value,
          message: newMessage.value,
          type: 0,
          //0为文本，1为图片，2为语音，3为位置
          createTime: Date.now(),
          status: 0
        };
        (_a2 = statusInfo.socket) == null ? void 0 : _a2.emit("chat", objs);
        objs.avatar = userInfo.avatar;
        messages.value.push(objs);
        newMessage.value = "";
      } else {
        let obj2 = {
          groupId: groupId.value,
          fromUid: userInfo.id,
          message: newMessage.value,
          type: 0,
          createTime: Date.now(),
          status: 0,
          remarked: userInfo.nickname
        };
        obj2.avatar = userInfo.avatar;
        (_b = statusInfo.socket) == null ? void 0 : _b.emit("groupMsg", obj2);
        messages.value.push(obj2);
        newMessage.value = "";
      }
      if (messages.value.length % 30 == 0) {
        page.value += 1;
      }
      newMessage.value = "";
      scrollBottom();
    };
    function selectImg(type) {
      let objs = {};
      if (chatType.value == 0) {
        objs = {
          fromUid: userInfo.id,
          toUid: itemId.value,
          message: "图片",
          type: 1,
          createTime: Date.now(),
          status: 0
        };
      } else {
        objs = {
          groupId: groupId.value,
          fromUid: userInfo.id,
          message: "图片",
          type: 1,
          createTime: Date.now(),
          status: 0,
          remarked: userInfo.nickname
        };
      }
      common_vendor.index.chooseImage({
        sizeType: ["compressed"],
        //这个不能写，否则手机端会出现问题
        sourceType: [type],
        success: function(res) {
          common_vendor.index.getImageInfo({
            src: res.tempFilePaths[0],
            success: function(image) {
              utils_ablilty.pathToBase64(image.path).then((base64) => {
                var _a2, _b;
                objs.message = base64;
                objs.avatar = userInfo.avatar;
                messages.value.push(objs);
                if (chatType.value == 0) {
                  (_a2 = statusInfo.socket) == null ? void 0 : _a2.emit("getChatImg", objs);
                } else {
                  (_b = statusInfo.socket) == null ? void 0 : _b.emit("groupMsg", objs);
                }
                scrollBottom();
                newMessage.value = "";
              }).catch((error) => {
                console.error(error);
              });
            }
          });
        }
      });
    }
    function previewImg(url) {
      common_vendor.index.previewImage({
        urls: [url],
        longPressActions: {
          itemList: ["保存图片"],
          success: function(data) {
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: url,
              success: function() {
                console.log("save success");
              }
            });
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      });
    }
    function startRecord(e) {
      starTime.value = Date.now();
      recorderManager.start();
      audioAni.value.open("center");
    }
    function touchEnd(e) {
      recorderManager.stop();
      audioAni.value.close();
    }
    function playVoice() {
      console.log("播放录音");
      if (voicePath.value) {
        innerAudioContext.src = voicePath.value;
        innerAudioContext.play();
      }
    }
    function changeStatus(message, index) {
      audioIndex.value = index;
      innerAudioContext.src = message;
      innerAudioContext.play();
      innerAudioContext.onEnded(() => {
        recorderManager.stop();
        audioIndex.value = -1;
      });
    }
    function sendAddress() {
      common_vendor.index.chooseLocation({
        success: function(res) {
          var _a2, _b;
          let obj2 = {};
          if (chatType.value == 0) {
            obj2 = {
              fromUid: userInfo.id,
              toUid: itemId.value,
              message: "位置",
              type: 3,
              createTime: Date.now(),
              status: 0,
              latitude: res.latitude,
              longitude: res.longitude,
              address: {
                descript: res.address
              }
            };
          } else {
            obj2 = {
              fromUid: userInfo.id,
              groupId: groupId.value,
              message: "位置",
              type: 3,
              createTime: Date.now(),
              status: 0,
              latitude: res.latitude,
              longitude: res.longitude,
              address: {
                descript: res.address
              },
              remarked: userInfo.nickname
            };
          }
          messages.value.push(obj2);
          if (chatType.value == 0) {
            (_a2 = statusInfo.socket) == null ? void 0 : _a2.emit("getLocal", obj2);
          } else {
            (_b = statusInfo.socket) == null ? void 0 : _b.emit("groupMsg", obj2);
          }
          scrollBottom();
        }
      });
    }
    function openMap(info) {
      console.log(info, 3535);
      common_vendor.index.openLocation({
        // 必须转数字，否则可能会打不开地图
        latitude: Number(info.latitude),
        //要去的纬度-地址
        longitude: Number(info.longitude),
        //要去的经度-地址
        address: info.address.descript
      });
    }
    function joinGroup(groupId2) {
      var _a2;
      let data = {
        id: userInfo.id,
        groupId: groupId2
      };
      (_a2 = statusInfo.socket) == null ? void 0 : _a2.emit("join", data);
    }
    function joinChat(friendId) {
      let data = {
        id: userInfo.id,
        friendId
      };
      statusInfo.socket.emit("joinChatRoom", data);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goInfo),
        b: common_vendor.p({
          obj: common_vendor.unref(objDate)
        }),
        c: common_vendor.o(playVoice),
        d: common_vendor.f(messages.value, (item, index, i0) => {
          return common_vendor.e({
            a: getTime(item.createTime, index)
          }, getTime(item.createTime, index) ? common_vendor.e({
            b: common_vendor.t(getTime(item.createTime, index)),
            c: index == 0 && common_vendor.unref(chatType) == 0
          }, index == 0 && common_vendor.unref(chatType) == 0 ? {} : {}, {
            d: index == 0 && common_vendor.unref(chatType) == 1
          }, index == 0 && common_vendor.unref(chatType) == 1 ? {} : {}) : {}, {
            e: item.fromUid == common_vendor.unref(userInfo).id
          }, item.fromUid == common_vendor.unref(userInfo).id ? common_vendor.e({
            f: common_vendor.unref(chatType) == 1
          }, common_vendor.unref(chatType) == 1 ? {
            g: common_vendor.t(item.remarked)
          } : {}, {
            h: item.type == 0
          }, item.type == 0 ? {
            i: common_vendor.t(item.message)
          } : {}, {
            j: item.type == 1
          }, item.type == 1 ? {
            k: common_vendor.o(($event) => previewImg(item.message), item),
            l: item.message
          } : {}, {
            m: item.type == 2
          }, item.type == 2 ? {
            n: common_vendor.t(item.audioTime),
            o: common_vendor.o(($event) => changeStatus(item.message, index), item),
            p: index === common_vendor.unref(audioIndex) ? common_vendor.unref(common_assets.audioImg) : common_vendor.unref(common_assets.audioShowImg)
          } : {}, {
            q: item.type === 3
          }, item.type === 3 ? {
            r: common_vendor.t(item.address.descript),
            s: common_vendor.o(($event) => openMap(item), item)
          } : {}, {
            t: item.avatar
          }) : common_vendor.e({
            v: item.avatar,
            w: common_vendor.o(($event) => goDetail(item), item),
            x: common_vendor.unref(chatType) == 1
          }, common_vendor.unref(chatType) == 1 ? {
            y: common_vendor.t(item.remarked)
          } : {}, {
            z: item.type == 0
          }, item.type == 0 ? {
            A: common_vendor.t(item.message)
          } : {}, {
            B: item.type == 1
          }, item.type == 1 ? {
            C: common_vendor.o(($event) => previewImg(item.message.img), item),
            D: item.message
          } : {}, {
            E: item.type == 2
          }, item.type == 2 ? {
            F: common_vendor.o(($event) => changeStatus(item.message, index), item),
            G: index === common_vendor.unref(audioIndex) ? common_vendor.unref(common_assets.audioImg) : common_vendor.unref(common_assets.audioShowImg),
            H: common_vendor.t(item.audioTime)
          } : {}, {
            I: item.type === 3
          }, item.type === 3 ? {
            J: common_vendor.t(item.address.descript),
            K: common_vendor.o(($event) => openMap(item), item)
          } : {}), {
            L: item
          });
        }),
        e: common_vendor.unref(refreshFlag),
        f: common_vendor.unref(triggered),
        g: common_vendor.unref(scrollTop),
        h: common_vendor.unref(wh) + "px",
        i: common_vendor.o(onSrcollTop),
        j: isVoice.value
      }, isVoice.value ? {
        k: common_vendor.o(transForm)
      } : {
        l: common_vendor.o(transForm)
      }, {
        m: !isVoice.value
      }, !isVoice.value ? {
        n: common_vendor.o((...args) => common_vendor.unref(handleInput) && common_vendor.unref(handleInput)(...args)),
        o: common_vendor.o(closeKeyBorder),
        p: common_vendor.o(getInputHeight),
        q: common_vendor.unref(foucsFlag),
        r: common_vendor.unref(newMessage)
      } : {
        s: common_vendor.o(startRecord),
        t: common_vendor.o(touchEnd)
      }, {
        v: !common_vendor.unref(emojiFlag)
      }, !common_vendor.unref(emojiFlag) ? {
        w: common_vendor.o(openPopup)
      } : {}, {
        x: common_vendor.unref(emojiFlag)
      }, common_vendor.unref(emojiFlag) ? {
        y: common_vendor.o(openPopup)
      } : {}, {
        z: common_vendor.unref(sendFlag)
      }, common_vendor.unref(sendFlag) ? {
        A: common_vendor.o(openOption)
      } : {}, {
        B: !common_vendor.unref(sendFlag)
      }, !common_vendor.unref(sendFlag) ? {
        C: common_vendor.o(sendMessage)
      } : {}, {
        D: common_vendor.unref(keyboardHeight) + "rpx",
        E: common_vendor.f(common_vendor.unref(utils_emojs.emoji), (item, i, i0) => {
          return {
            a: common_vendor.t(item),
            b: i,
            c: common_vendor.o(($event) => addEmoji(i), i)
          };
        }),
        F: common_vendor.unref(emojiHeight) + "rpx",
        G: common_vendor.sr(popup, "0a633310-1", {
          "k": "popup"
        }),
        H: common_vendor.p({
          overlay: false
        }),
        I: common_vendor.o(($event) => optionClick(1)),
        J: common_vendor.o(($event) => optionClick(2)),
        K: common_vendor.o(($event) => optionClick(3)),
        L: common_vendor.o(($event) => optionClick(4)),
        M: common_vendor.o(optionClick),
        N: common_vendor.o(optionClick),
        O: common_vendor.o(optionClick),
        P: common_vendor.unref(emojiHeight) + "rpx",
        Q: common_vendor.sr(options, "0a633310-2", {
          "k": "options"
        }),
        R: common_vendor.p({
          overlay: false
        }),
        S: common_vendor.unref(common_assets.audioImg),
        T: common_vendor.sr(audioAni, "0a633310-3", {
          "k": "audioAni"
        }),
        U: common_vendor.p({
          bgColor: "none"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a633310"], ["__file", "D:/uniapp毕设/lucky/pages/chat/chat.vue"]]);
wx.createPage(MiniProgramPage);
