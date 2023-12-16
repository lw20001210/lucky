"use strict";
const common_vendor = require("../common/vendor.js");
const utils_config = require("./config.js");
const utils_local = require("./local.js");
const utils_Toast = require("./Toast.js");
const request = (url, method, data = null) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: utils_config.mainUrl + url,
      method,
      data,
      timeout: 2e3,
      header: {
        authorization: utils_local.getLocal("token") ? utils_local.getLocal("token") : ""
      },
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        utils_Toast.showMsg("请求失败");
        reject(err);
      },
      complete: () => {
      }
    });
  });
};
exports.request = request;
