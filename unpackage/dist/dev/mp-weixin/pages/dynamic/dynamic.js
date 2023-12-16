"use strict";
const common_vendor = require("../../common/vendor.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_request = require("../../utils/request.js");
const utils_format = require("../../utils/format.js");
const utils_Toast = require("../../utils/Toast.js");
const utils_ablilty = require("../../utils/ablilty.js");
require("../../utils/local.js");
require("../../utils/config.js");
if (!Math) {
  (stastuBar + Header)();
}
const Header = () => "../../component/header.js";
const stastuBar = () => "../../component/statusBar.js";
const _sfc_main = {
  __name: "dynamic",
  setup(__props) {
    let List = common_vendor.ref([]);
    let headObj = common_vendor.ref({
      leftFont: "icon-zuojiantou-copy",
      title: "",
      rightFont: "",
      path: "/pages/star/star"
    });
    const userPower = new pinia_userInfo_userInfo.userStore();
    const {
      avatar,
      nickname,
      id
    } = common_vendor.storeToRefs(userPower);
    let flag = common_vendor.ref("a");
    function goInfo(uid) {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${uid}`
      });
    }
    function preView(index, imgArr) {
      common_vendor.index.previewImage({
        current: index,
        urls: imgArr,
        loop: true,
        indicator: "default"
      });
    }
    common_vendor.onLoad(() => {
      getHeight();
      getList();
    });
    async function getList() {
      let {
        data: res
      } = await utils_request.request("/user/getFriendDynamicList", "get", {
        id: userPower.id
      });
      if (res.code != 200) {
        return utils_Toast.showMsg();
      } else {
        if (res.data.length != 0) {
          List.value = res.data.reverse();
        }
      }
      console.log(List.value, 55);
    }
    let wh = common_vendor.ref();
    function getHeight() {
      const val = common_vendor.index.getSystemInfoSync();
      wh.value = val.windowHeight - 270;
    }
    function editContent(index) {
      if (flag.value == index) {
        flag.value = "a";
      } else {
        flag.value = index;
      }
    }
    async function changeLike(spaceId) {
      let {
        data: res
      } = await utils_request.request("/user/updateLike", "post", {
        id: spaceId,
        uid: id.value
      });
      if (res.code == 200) {
        flag.value = "a";
        getList();
      }
    }
    function prepare(status) {
      if (status.length == 0)
        return false;
      let result = status.find((item) => {
        return item.uid == id.value;
      });
      if (result == void 0) {
        return false;
      } else {
        return true;
      }
    }
    let temporary = common_vendor.ref({});
    let foucsFlag = common_vendor.ref(false);
    let comment = common_vendor.ref("");
    function validate(info) {
      console.log(info, 66666);
      temporary.value = info;
      foucsFlag.value = true;
      flag.value = "a";
    }
    let keyboardHeight = common_vendor.ref(0);
    function getInputHeight(e) {
      if (e.detail.height != 0) {
        keyboardHeight.value = parseInt(e.detail.height) * 2 - 25;
        console.log(keyboardHeight.value);
      }
    }
    function closeKeyBorder(e) {
      console.log(e);
      if (e.detail.height == 0) {
        flag.value = "a";
        keyboardHeight.value = 10;
        setTimeout(() => {
          foucsFlag.value = false;
        }, 100);
      } else {
        keyboardHeight.value = parseInt(e.detail.height) * 2 - 25;
      }
    }
    const debouncedInputChange = utils_ablilty.debounce(function inputChange(val) {
      comment.value = val;
    }, 800);
    const handleInput = (e) => {
      debouncedInputChange(e.detail.value);
    };
    let judgeComment = common_vendor.ref(false);
    function replyComments(commentInfo) {
      console.log(commentInfo, 123);
      if (userPower.id == commentInfo.commentId) {
        return false;
      } else {
        judgeComment.value = true;
        temporary.value = commentInfo;
        foucsFlag.value = true;
        flag.value = "a";
      }
    }
    async function acheveComment() {
      if (comment.value == "") {
        utils_Toast.showMsg("评论不能为空");
      } else {
        if (judgeComment.value) {
          console.log("我是点击了回复");
          let replyobj = {
            spaceId: temporary.value.spaceId,
            replyComment: comment.value,
            commentUid: temporary.value.commentId,
            replyId: userPower.id,
            commentId: temporary.value.id
          };
          let {
            data: res
          } = await utils_request.request("/user/replyComment", "post", replyobj);
          if (res.code == 200) {
            comment.value = "";
            temporary.value = {};
            judgeComment.value = false;
            getList();
            console.log(res.data, 33333);
          }
        } else {
          console.log(temporary.value, 111);
          let obj = {
            commentId: userPower.id,
            spaceId: temporary.value.id,
            comment: comment.value
          };
          let {
            data: res
          } = await utils_request.request("/user/comment", "post", obj);
          if (res.code == 200) {
            comment.value = "";
            temporary.value = {};
            getList();
          }
        }
      }
    }
    function goDetail(info) {
      console.log(info, 777);
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${info.commentId}`
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          obj: common_vendor.unref(headObj)
        }),
        b: common_vendor.t(common_vendor.unref(nickname)),
        c: common_vendor.unref(avatar),
        d: common_vendor.unref(List).length == 0
      }, common_vendor.unref(List).length == 0 ? {} : {
        e: common_vendor.f(common_vendor.unref(List), (item, index, i0) => {
          var _a;
          return common_vendor.e({
            a: item.avatar,
            b: common_vendor.o(($event) => goInfo(item.uid), item.id),
            c: common_vendor.t(item.remarked),
            d: common_vendor.t(item.content.title),
            e: item.content.imgArr.length != 0
          }, item.content.imgArr.length != 0 ? {
            f: common_vendor.f((_a = item == null ? void 0 : item.content) == null ? void 0 : _a.imgArr, (img, inde, i1) => {
              return {
                a: common_vendor.o(($event) => preView(inde, item == null ? void 0 : item.content.imgArr), inde),
                b: img,
                c: inde
              };
            }),
            g: (item == null ? void 0 : item.content.imgArr.length) == 1 ? "90%" : (item == null ? void 0 : item.content.imgArr.length) == 2 ? "38%" : "32%",
            h: (item == null ? void 0 : item.content.imgArr.length) <= 3 ? "100%" : (item == null ? void 0 : item.content.imgArr.length) <= 6 ? "48%" : "32%"
          } : {}, {
            i: item.position
          }, item.position ? {
            j: common_vendor.t(item.position)
          } : {}, {
            k: common_vendor.t(common_vendor.unref(utils_format.dayFormat)(item.createTime)),
            l: common_vendor.n(prepare(item.likes) ? "icon-aixin1" : "icon-aixin"),
            m: common_vendor.o(($event) => changeLike(item.id), item.id),
            n: common_vendor.o(($event) => validate(item), item.id),
            o: index == common_vendor.unref(flag) ? 1 : "",
            p: common_vendor.o(($event) => editContent(index), item.id),
            q: item.likes.length != 0 || item.comments.length != 0
          }, item.likes.length != 0 || item.comments.length != 0 ? common_vendor.e({
            r: item.likes.length != 0
          }, item.likes.length != 0 ? {
            s: common_vendor.f(item.likes, (val, index2, i1) => {
              return {
                a: common_vendor.t(index2 > 0 ? "," : ""),
                b: common_vendor.t(val.remarked),
                c: common_vendor.o(($event) => goDetail(val), val.id),
                d: val.id
              };
            })
          } : {}, {
            t: common_vendor.f(item.comments, (com, ind, i1) => {
              return {
                a: common_vendor.t(com.remarked),
                b: common_vendor.o(($event) => goDetail(com)),
                c: common_vendor.t(com.comment),
                d: common_vendor.o(($event) => replyComments(com)),
                e: common_vendor.f(com.replyList, (reply, k2, i2) => {
                  return {
                    a: common_vendor.t(reply.replyName),
                    b: common_vendor.t(reply.replyComment)
                  };
                }),
                f: common_vendor.t(com.remarked)
              };
            })
          }) : {}, {
            v: item.id
          });
        }),
        f: common_vendor.unref(wh) + "px"
      }, {
        g: common_vendor.unref(foucsFlag)
      }, common_vendor.unref(foucsFlag) ? {
        h: common_vendor.o(handleInput),
        i: common_vendor.o(closeKeyBorder),
        j: common_vendor.o(getInputHeight),
        k: common_vendor.unref(foucsFlag),
        l: common_vendor.unref(comment),
        m: common_vendor.o(acheveComment),
        n: common_vendor.unref(keyboardHeight) + "rpx"
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e73567d5"], ["__file", "D:/uniapp毕设/lucky/pages/dynamic/dynamic.vue"]]);
wx.createPage(MiniProgramPage);
