"use strict";
const common_vendor = require("../../common/vendor.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_Toast = require("../../utils/Toast.js");
const utils_request = require("../../utils/request.js");
const utils_format = require("../../utils/format.js");
const utils_ablilty = require("../../utils/ablilty.js");
require("../../utils/local.js");
require("../../utils/config.js");
if (!Math) {
  (stastuBar + Header)();
}
const Header = () => "../../component/header.js";
const stastuBar = () => "../../component/statusBar.js";
const _sfc_main = {
  __name: "selfStar",
  setup(__props) {
    const userPower = new pinia_userInfo_userInfo.userStore();
    let comment = common_vendor.ref("");
    common_vendor.ref();
    let foucsFlag = common_vendor.ref(false);
    const {
      avatar,
      nickname,
      id
    } = common_vendor.storeToRefs(userPower);
    let flag = common_vendor.ref("a");
    let headObj = common_vendor.ref({
      leftFont: "icon-zuojiantou-copy",
      title: "",
      rightFont: "",
      path: "/pages/star/star"
    });
    let totalList = common_vendor.ref([]);
    function goSendDynamic() {
      common_vendor.index.navigateTo({
        url: "/pages/sendDynamic/sendDynamic"
      });
    }
    let wh = common_vendor.ref();
    function getHeight() {
      const val = common_vendor.index.getSystemInfoSync();
      wh.value = val.windowHeight - 360;
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
    common_vendor.onLoad(() => {
      getHeight();
      userPower.getUserInfo();
      getmySpaceInfo();
    });
    async function getmySpaceInfo() {
      let {
        data: res
      } = await utils_request.request("/user/getMySpaceInfo", "get", {
        id: userPower.id
      });
      console.log(res.data, 11111);
      totalList.value = res.data.reverse();
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
        getmySpaceInfo();
        flag.value = "a";
      }
    }
    async function removeItem(spaceId, spaceUid) {
      let {
        data: res
      } = await utils_request.request("/user/deleteSpace", "delete", {
        id: spaceId
      });
      if (res.code == "200") {
        utils_Toast.showMsg(res.msg, 1500, "loading");
        getmySpaceInfo();
        flag.value = "a";
      } else {
        return utils_Toast.showMsg("删除动态失败");
      }
    }
    function preView(index, imgArr) {
      common_vendor.index.previewImage({
        current: index,
        urls: imgArr,
        loop: true,
        indicator: "default"
      });
    }
    let temporary = common_vendor.ref({});
    function validate(info) {
      temporary.value = info;
      foucsFlag.value = true;
      flag.value = "a";
    }
    let keyboardHeight = common_vendor.ref(0);
    function getInputHeight(e) {
      if (e.detail.height != 0) {
        keyboardHeight.value = parseInt(e.detail.height) * 2 - 25;
      }
    }
    function closeKeyBorder(e) {
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
    }, 80);
    const handleInput = (e) => {
      debouncedInputChange(e.detail.value);
    };
    let judgeComment = common_vendor.ref(false);
    function replyComments(commentInfo) {
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
            getmySpaceInfo();
            console.log(res.data, 33333);
          }
        } else {
          let obj = {
            // uid: temporary.value.uid,
            commentId: temporary.value.uid,
            spaceId: temporary.value.id,
            comment: comment.value
          };
          let {
            data: res
          } = await utils_request.request("/user/comment", "post", obj);
          if (res.code == 200) {
            comment.value = "";
            temporary.value = {};
            getmySpaceInfo();
          }
        }
      }
    }
    function goDetail(info) {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${info.commentId}`
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(goSendDynamic),
        b: common_vendor.p({
          obj: common_vendor.unref(headObj)
        }),
        c: common_vendor.t(common_vendor.unref(nickname)),
        d: common_vendor.unref(avatar),
        e: common_vendor.o(goSendDynamic),
        f: common_vendor.unref(totalList) != []
      }, common_vendor.unref(totalList) != [] ? {
        g: common_vendor.f(common_vendor.unref(totalList), (item, index, i0) => {
          var _a;
          return common_vendor.e({
            a: common_vendor.o(($event) => goDetail(item), item.id),
            b: common_vendor.t(item.content.title),
            c: item.content.imgArr.length != 0
          }, item.content.imgArr.length != 0 ? {
            d: common_vendor.f((_a = item == null ? void 0 : item.content) == null ? void 0 : _a.imgArr, (img, inde, i1) => {
              return {
                a: common_vendor.o(($event) => preView(inde, item == null ? void 0 : item.content.imgArr), inde),
                b: img,
                c: inde
              };
            }),
            e: (item == null ? void 0 : item.content.imgArr.length) == 1 ? "90%" : (item == null ? void 0 : item.content.imgArr.length) == 2 ? "38%" : "32%",
            f: (item == null ? void 0 : item.content.imgArr.length) <= 3 ? "100%" : (item == null ? void 0 : item.content.imgArr.length) <= 6 ? "48%" : "32%"
          } : {}, {
            g: item.position
          }, item.position ? {
            h: common_vendor.t(item.position)
          } : {}, {
            i: common_vendor.t(common_vendor.unref(utils_format.dayFormat)(item.createTime)),
            j: common_vendor.n(prepare(item.likes) ? "icon-aixin1" : "icon-aixin"),
            k: common_vendor.o(($event) => changeLike(item.id), item.id),
            l: common_vendor.o(($event) => validate(item), item.id),
            m: common_vendor.o(($event) => removeItem(item.id, item.uid), item.id),
            n: index == common_vendor.unref(flag) ? 1 : "",
            o: common_vendor.o(($event) => editContent(index), item.id),
            p: item.likes.length != 0 || item.comments.length != 0
          }, item.likes.length != 0 || item.comments.length != 0 ? common_vendor.e({
            q: item.likes.length != 0
          }, item.likes.length != 0 ? {
            r: common_vendor.f(item.likes, (val, index2, i1) => {
              return {
                a: common_vendor.t(index2 > 0 ? "," : ""),
                b: common_vendor.t(val.remarked),
                c: common_vendor.o(($event) => goDetail(val), val.id),
                d: val.id
              };
            })
          } : {}, {
            s: common_vendor.f(item.comments, (com, ind, i1) => {
              return common_vendor.e({
                a: common_vendor.t(com.remarked),
                b: common_vendor.o(($event) => goDetail(com)),
                c: common_vendor.t(com.comment),
                d: common_vendor.o(($event) => replyComments(com)),
                e: com.replyList.length != 0
              }, com.replyList.length != 0 ? {
                f: common_vendor.f(com.replyList, (reply, k2, i2) => {
                  return {
                    a: common_vendor.t(reply.replyName),
                    b: common_vendor.t(reply.replyComment)
                  };
                }),
                g: common_vendor.t(com.remarked)
              } : {});
            })
          }) : {}, {
            t: item.id
          });
        }),
        h: common_vendor.unref(avatar),
        i: common_vendor.t(common_vendor.unref(nickname)),
        j: common_vendor.unref(wh) + "px"
      } : {}, {
        k: common_vendor.unref(foucsFlag)
      }, common_vendor.unref(foucsFlag) ? {
        l: common_vendor.o(handleInput),
        m: common_vendor.o(closeKeyBorder),
        n: common_vendor.o(getInputHeight),
        o: common_vendor.unref(foucsFlag),
        p: common_vendor.unref(comment),
        q: common_vendor.o(acheveComment),
        r: common_vendor.unref(keyboardHeight) + "rpx"
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cb7f60c"], ["__file", "D:/uniapp毕设/lucky/pages/selfStar/selfStar.vue"]]);
wx.createPage(MiniProgramPage);
