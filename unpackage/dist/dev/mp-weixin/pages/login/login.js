"use strict";
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
require("../../common/vendor.js");
require("../../utils/Toast.js");
require("../../utils/local.js");
require("../../utils/request.js");
require("../../utils/config.js");
wx.createPage(pinia_userInfo_userInfo.MiniProgramPage);
