"use strict";
const common_vendor = require("../common/vendor.js");
function showMsg(title = "获取数据失败", duration = 1500, icon = "error") {
  common_vendor.index.showToast({
    title,
    duration,
    icon
  });
}
exports.showMsg = showMsg;
