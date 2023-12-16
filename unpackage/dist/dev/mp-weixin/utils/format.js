"use strict";
const common_vendor = require("../common/vendor.js");
common_vendor.dayjs.locale("zh-cn");
common_vendor.dayjs.extend(common_vendor.relativeTime);
function dayFormat(val) {
  const targetTime = common_vendor.dayjs.unix(val / 1e3);
  return common_vendor.dayjs().to(common_vendor.dayjs(targetTime));
}
exports.dayFormat = dayFormat;
