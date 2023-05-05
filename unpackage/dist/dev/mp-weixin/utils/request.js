"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://192.168.242.20:3000";
const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: BASE_URL + url,
      method,
      data,
      timeout: 3e3,
      header: {
        authorization: common_vendor.index.getStorageSync("userinfo").Token
      },
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
      }
    });
  });
};
exports.request = request;
