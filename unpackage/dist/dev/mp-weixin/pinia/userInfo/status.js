"use strict";
const common_vendor = require("../../common/vendor.js");
const statusStore = common_vendor.defineStore("status", {
  state: () => ({
    userList: [],
    //好友列表
    socket: null,
    avatar: "",
    //chat界面朋友头像,
    groupUserIds: []
    //群聊成员id
  })
});
exports.statusStore = statusStore;
