"use strict";
const common_vendor = require("../../common/vendor.js");
const mySpaceStore = common_vendor.defineStore("mySpace", {
  state: () => ({
    id: "",
    uid: "",
    content: {
      title: "",
      imgArr: []
    },
    position: "",
    statu: "",
    createTime: ""
  })
});
exports.mySpaceStore = mySpaceStore;
