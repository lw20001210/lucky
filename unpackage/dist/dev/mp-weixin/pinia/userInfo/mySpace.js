"use strict";
const common_vendor = require("../../common/vendor.js");
const mySpaceStore = common_vendor.defineStore("mySpace", {
  state: () => ({
    id: "",
    content: {
      title: "",
      imgArr: []
    },
    statu: "",
    createTime: ""
  })
});
exports.mySpaceStore = mySpaceStore;
