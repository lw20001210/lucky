"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const utils_format = require("../../utils/format.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_Toast = require("../../utils/Toast.js");
const common_assets = require("../../common/assets.js");
require("../../utils/config.js");
require("../../utils/local.js");
if (!Math) {
  Header();
}
const Header = () => "../../component/header.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const userInfo = pinia_userInfo_userInfo.userStore();
    let flag = common_vendor.ref(false);
    let objDate = common_vendor.ref({
      leftFont: "icon-zuojiantou-copy",
      path: "/pages/home/home"
    });
    let spaceInfo = common_vendor.ref({});
    let itemId = common_vendor.ref();
    common_vendor.onLoad(async (option) => {
      try {
        itemId.value = option.id;
        if (!itemId.value)
          return;
        let {
          data: res
        } = await utils_request.request("/user/getNewSpace", "get", {
          id: itemId.value
        });
        if (res.code != 200)
          return utils_Toast.showMsg();
        if (res.data && res.data.result.length == 0) {
          spaceInfo.value = res.data;
          console.log(spaceInfo.value, 444);
          flag.value = false;
        } else {
          flag.value = true;
          spaceInfo.value = res.data;
        }
      } catch (e) {
        console.log(e);
      }
    });
    function preView(index, imgArr) {
      common_vendor.index.previewImage({
        current: index,
        urls: imgArr,
        loop: true,
        indicator: "default"
      });
    }
    let codeImg = common_vendor.ref();
    codeImg.value = common_assets.img;
    function goInfo() {
      if (itemId.value == userInfo.id) {
        common_vendor.index.navigateTo({
          url: "/pages/editUser/editUser"
        });
      } else {
        common_vendor.index.navigateTo({
          url: `/pages/friendInfo/friendInfo?id=${itemId.value}`
        });
      }
    }
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
      return common_vendor.e({
        a: common_vendor.o(goInfo),
        b: common_vendor.p({
          obj: common_vendor.unref(objDate)
        }),
        c: (_a = common_vendor.unref(spaceInfo)) == null ? void 0 : _a.avatar,
        d: common_vendor.t(common_vendor.unref(spaceInfo).nickname),
        e: common_vendor.unref(itemId) != common_vendor.unref(userInfo).id
      }, common_vendor.unref(itemId) != common_vendor.unref(userInfo).id ? {
        f: common_vendor.t(common_vendor.unref(spaceInfo).remarked)
      } : {}, {
        g: common_vendor.t((_b = common_vendor.unref(spaceInfo)) == null ? void 0 : _b.username),
        h: common_vendor.unref(spaceInfo) && common_vendor.unref(flag)
      }, common_vendor.unref(spaceInfo) && common_vendor.unref(flag) ? common_vendor.e({
        i: common_vendor.unref(spaceInfo) && common_vendor.unref(spaceInfo).avatar,
        j: common_vendor.t(common_vendor.unref(spaceInfo) && common_vendor.unref(spaceInfo).nickname),
        k: common_vendor.unref(itemId) != common_vendor.unref(userInfo).id
      }, common_vendor.unref(itemId) != common_vendor.unref(userInfo).id ? {
        l: common_vendor.t(common_vendor.unref(spaceInfo).remarked)
      } : {}, {
        m: common_vendor.t(common_vendor.unref(utils_format.dayFormat)((_d = (_c = common_vendor.unref(spaceInfo)) == null ? void 0 : _c.result[0]) == null ? void 0 : _d.createTime))
      }) : {}, {
        n: common_vendor.unref(spaceInfo) && common_vendor.unref(flag)
      }, common_vendor.unref(spaceInfo) && common_vendor.unref(flag) ? common_vendor.e({
        o: common_vendor.t((_e = common_vendor.unref(spaceInfo).result[0].content) == null ? void 0 : _e.title),
        p: ((_f = common_vendor.unref(spaceInfo).result[0].content) == null ? void 0 : _f.imgArr) != []
      }, ((_g = common_vendor.unref(spaceInfo).result[0].content) == null ? void 0 : _g.imgArr) != [] ? {
        q: common_vendor.f((_h = common_vendor.unref(spaceInfo).result[0].content) == null ? void 0 : _h.imgArr, (img, inde, i0) => {
          return {
            a: common_vendor.o(($event) => {
              var _a2;
              return preView(inde, (_a2 = common_vendor.unref(spaceInfo).result[0].content) == null ? void 0 : _a2.imgArr);
            }, inde),
            b: img,
            c: inde
          };
        }),
        r: ((_i = common_vendor.unref(spaceInfo).result[0].content) == null ? void 0 : _i.imgArr.length) == 1 ? "90%" : ((_j = common_vendor.unref(spaceInfo).result[0].content) == null ? void 0 : _j.imgArr) == 2 ? "38%" : "32%",
        s: ((_k = common_vendor.unref(spaceInfo).result[0].content) == null ? void 0 : _k.imgArr.length) <= 3 ? "100%" : ((_l = common_vendor.unref(spaceInfo).result[0].content) == null ? void 0 : _l.imgArr.length) <= 6 ? "48%" : "32%"
      } : {}, {
        t: common_vendor.t((_m = common_vendor.unref(spaceInfo).result[0]) == null ? void 0 : _m.position)
      }) : {}, {
        v: !common_vendor.unref(flag)
      }, !common_vendor.unref(flag) ? {
        w: common_vendor.unref(codeImg)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"], ["__file", "D:/uniapp毕设/lucky/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
