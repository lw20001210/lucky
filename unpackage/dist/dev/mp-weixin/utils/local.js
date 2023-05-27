"use strict";
const common_vendor = require("../common/vendor.js");
function setLocal(keys, val) {
  return common_vendor.index.setStorage({
    key: keys,
    data: JSON.stringify(val)
  });
}
function getLocal(keys) {
  let value = common_vendor.index.getStorageSync(keys);
  if (value) {
    return JSON.parse(value);
  } else {
    return value;
  }
}
function removeLocal(keys) {
  common_vendor.index.removeStorage({
    key: keys,
    success: function(res) {
      console.log("success");
    }
  });
}
exports.getLocal = getLocal;
exports.removeLocal = removeLocal;
exports.setLocal = setLocal;
