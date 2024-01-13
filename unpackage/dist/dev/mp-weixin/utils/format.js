"use strict";
const common_vendor = require("../common/vendor.js");
common_vendor.dayjs.locale("zh-cn");
common_vendor.dayjs.extend(common_vendor.relativeTime);
function dayFormat(val) {
  const targetTime = common_vendor.dayjs.unix(val / 1e3);
  return common_vendor.dayjs().to(common_vendor.dayjs(targetTime));
}
function getTimeFormat(timestamp) {
  const now = Date.now();
  const date = common_vendor.dayjs(timestamp);
  let dayType;
  let timePeriod;
  if (date.isSame(common_vendor.dayjs(now), "day")) {
    dayType = "";
  } else if (date.isSame(common_vendor.dayjs(now).subtract(1, "day"), "day")) {
    dayType = "昨天";
  } else {
    if (date.year() === common_vendor.dayjs(now).year()) {
      dayType = date.format("MM-DD");
    } else {
      dayType = date.format("YYYY/MM/DD");
    }
  }
  const hour = date.hour();
  if (hour >= 0 && hour < 12) {
    timePeriod = "上午";
  } else if (hour >= 12 && hour < 18) {
    timePeriod = "下午";
  } else {
    timePeriod = "晚上";
  }
  const formattedTime = date.format("HH:mm");
  return `${dayType}  ${timePeriod} ${formattedTime}`;
}
exports.dayFormat = dayFormat;
exports.getTimeFormat = getTimeFormat;
