"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_Toast = require("../../utils/Toast.js");
const pinia_userInfo_status = require("../../pinia/userInfo/status.js");
require("../../utils/config.js");
require("../../utils/local.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uv_checkbox2 = common_vendor.resolveComponent("uv-checkbox");
  const _easycom_uv_checkbox_group2 = common_vendor.resolveComponent("uv-checkbox-group");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uni_search_bar2 + _easycom_uv_checkbox2 + _easycom_uv_checkbox_group2 + _easycom_uv_button2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uv_checkbox = () => "../../uni_modules/uv-checkbox/components/uv-checkbox/uv-checkbox.js";
const _easycom_uv_checkbox_group = () => "../../uni_modules/uv-checkbox/components/uv-checkbox-group/uv-checkbox-group.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (statusBar + Header + _easycom_uni_search_bar + _easycom_uv_checkbox + _easycom_uv_checkbox_group + _easycom_uv_button)();
}
const statusBar = () => "../../component/statusBar.js";
const Header = () => "../../component/header.js";
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const userPower = new pinia_userInfo_userInfo.userStore();
    const {
      id
    } = common_vendor.storeToRefs(userPower);
    let searchValue = common_vendor.ref();
    let userList = common_vendor.ref([]);
    let flag = common_vendor.ref(false);
    const statusInfo = pinia_userInfo_status.statusStore();
    let groupFlag = common_vendor.ref(false);
    let objDate = common_vendor.ref({
      leftFont: "icon-zuojiantou",
      title: "创建群聊"
    });
    let allUser = common_vendor.ref([]);
    const customStyle = common_vendor.computed(() => {
      return {
        height: "60rpx",
        padding: "0 20rpx"
      };
    });
    function change(e) {
      console.log(e, 4444);
    }
    let wh = common_vendor.ref();
    function getHeight() {
      common_vendor.index.getSystemInfoSync();
    }
    let inviteFlag = common_vendor.ref(false);
    let removeFlag = common_vendor.ref(false);
    let groupId = common_vendor.ref();
    let count = common_vendor.ref();
    let checkedIds = common_vendor.ref([]);
    common_vendor.onLoad(async (option) => {
      let {
        data: res
      } = await utils_request.request("/user/searchAllUser", "get");
      allUser.value = res.data;
      let result = await getList();
      if ((option == null ? void 0 : option.url) == "group") {
        groupFlag.value = true;
        if (option == null ? void 0 : option.ids) {
          if (option.remove) {
            removeFlag.value = true;
          } else {
            inviteFlag.value = true;
          }
          groupId.value = option.groupId;
          count.value = option.count;
          let result2 = JSON.parse(option.ids).filter((item) => {
            return item != userPower.id;
          });
          resultDate.value = result2;
          checkedIds.value = result2;
        }
        getHeight();
      } else {
        getHeight();
      }
      if (groupId.value !== userPower.id) {
        idList.value = idList.value.filter((item) => {
          return item != userPower.id;
        });
        let selectObj2 = [];
        checkedIds.value.forEach((item) => {
          if (idList.value.includes(item)) {
            selectObj2.push(item);
          }
        });
        resultDate.value = selectObj2;
        checkedIds.value = selectObj2;
      }
      if (groupFlag.value) {
        userList.value = result.filter((item) => {
          return item.id != userPower.id;
        });
      } else {
        userList.value = result;
      }
    });
    let idList = common_vendor.ref([]);
    async function getList() {
      let {
        data: res
      } = await utils_request.request("/user/getFriendList", "get", {
        id: id.value
      });
      if (res.code != 200 || res.code == 404)
        return false;
      idList.value = res.data.map((item) => {
        return item.id;
      });
      if (res.code != 200)
        return utils_Toast.showMsg();
      return res.data;
    }
    const moreContent = common_vendor.computed(() => {
      if (groupFlag.value) {
        return userList.value;
      } else {
        return flag.value ? userList.value : userList.value.filter((item, i) => {
          return i < 4;
        });
      }
    });
    async function input(inputUser) {
      if (inputUser == "") {
        let result = await getList();
        if (!groupFlag.value) {
          userList.value = result;
        }
      } else {
        let result = await getList();
        if (groupFlag.value) {
          userList.value = result.filter((item) => {
            return item.username.includes(inputUser) && id.value != item.id;
          });
          console.log(userList.value, 777);
        } else {
          let firstData = [...allUser.value, ...result];
          let secondData = Array.from(firstData.reduce((map, obj) => map.set(obj.id, obj), /* @__PURE__ */ new Map()).values());
          userList.value = [...secondData].filter((item) => {
            return item.username.includes(inputUser);
          });
          console.log(userList.value, 444);
        }
        if (userList.value.length == 0) {
          utils_Toast.showMsg("暂无更多搜索结果", 2e3, "loading");
        } else {
          utils_Toast.showMsg("加载中...", 500, "loading");
        }
      }
    }
    function cancel(res) {
      common_vendor.index.switchTab({
        url: "/pages/home/home"
      });
    }
    function formatContent(item) {
      if (!idList.value.includes(userPower.id)) {
        idList.value.push(userPower.id);
      }
      if (Object.values(idList.value).includes(item.id)) {
        return "发信息";
      } else {
        return "加好友";
      }
    }
    function showMore() {
      flag.value = !flag.value;
    }
    function apply(item) {
      if (Object.values(idList.value).includes(item.id)) {
        statusInfo.avatar = item.avatar;
        if (item.id == id.value) {
          common_vendor.index.navigateTo({
            url: `/pages/chat/chat?id=${item.id}&remarked=${item.nickname}`
          });
        } else {
          common_vendor.index.navigateTo({
            url: `/pages/chat/chat?id=${item.id}&remarked=${item.remarked}`
          });
        }
      } else {
        common_vendor.index.navigateTo({
          url: `/pages/addFriend/addFriend?username=${item.username}`
        });
      }
    }
    let resultDate = common_vendor.ref([]);
    const selectObj = common_vendor.computed(() => {
      console.log(resultDate.value.length);
      return resultDate.value.length - checkedIds.value.length;
    });
    function optionCheck(id2) {
      if (checkedIds.value.includes(id2)) {
        if (removeFlag.value) {
          return false;
        } else {
          return true;
        }
      } else {
        if (removeFlag.value) {
          return true;
        }
      }
    }
    function getUniqueElements(arr1, arr2) {
      let uniqueArr = [.../* @__PURE__ */ new Set([...arr1, ...arr2])];
      return uniqueArr.filter((x) => !arr2.includes(x));
    }
    async function createGroup() {
      if (inviteFlag.value) {
        if (checkedIds.value.length == resultDate.value.length)
          return utils_Toast.showMsg("你还未选择");
        let data = getUniqueElements(resultDate.value, checkedIds.value);
        let {
          data: res
        } = await utils_request.request("/user/inviteFriend", "post", {
          groupId: groupId.value,
          data
        });
        console.log(res, 6666);
        common_vendor.index.navigateTo({
          url: `/pages/groupInfo/groupInfo?groupId=${groupId.value}`
        });
      } else if (removeFlag.value) {
        if (checkedIds.value.length == resultDate.value.length)
          return utils_Toast.showMsg("你还未选择");
        console.log("我是删除好友");
        let result = [];
        checkedIds.value.forEach((item) => {
          if (!resultDate.value.includes(item)) {
            result.push(item);
          }
        });
        let {
          data: res
        } = await utils_request.request("/user/removeGroupUser", "delete", {
          groupId: groupId.value,
          result
        });
        if (res.code != 200)
          return utils_Toast.showMsg("踢出群聊失败");
        common_vendor.index.navigateTo({
          url: `/pages/groupInfo/groupInfo?groupId=${groupId.value}`
        });
      } else {
        statusInfo.groupUserIds = [];
        statusInfo.groupUserIds = resultDate.value;
        common_vendor.index.navigateTo({
          url: "/pages/createGroup/createGroup"
        });
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(groupFlag)
      }, !common_vendor.unref(groupFlag) ? {} : {}, {
        b: common_vendor.unref(groupFlag)
      }, common_vendor.unref(groupFlag) ? {
        c: common_vendor.p({
          obj: common_vendor.unref(objDate)
        })
      } : {}, {
        d: common_vendor.o(input),
        e: common_vendor.o(cancel),
        f: common_vendor.o(($event) => common_vendor.isRef(searchValue) ? searchValue.value = $event : searchValue = $event),
        g: common_vendor.p({
          focus: true,
          modelValue: common_vendor.unref(searchValue)
        }),
        h: !common_vendor.unref(groupFlag)
      }, !common_vendor.unref(groupFlag) ? {
        i: common_vendor.o(showMore)
      } : {}, {
        j: common_vendor.unref(userList).length != 0
      }, common_vendor.unref(userList).length != 0 ? common_vendor.e({
        k: !common_vendor.unref(groupFlag)
      }, !common_vendor.unref(groupFlag) ? {
        l: common_vendor.f(common_vendor.unref(moreContent), (item, k0, i0) => {
          return common_vendor.e({
            a: item.avatar,
            b: item.id == common_vendor.unref(userPower).id
          }, item.id == common_vendor.unref(userPower).id ? {
            c: common_vendor.t(item.nickname)
          } : !item.remarked ? {
            e: common_vendor.t(item.nickname)
          } : {
            f: common_vendor.t(item.remarked)
          }, {
            d: !item.remarked,
            g: common_vendor.t(item.username),
            h: common_vendor.t(formatContent(item)),
            i: common_vendor.o(($event) => apply(item))
          });
        })
      } : {
        m: common_vendor.f(common_vendor.unref(moreContent), (item, k0, i0) => {
          return common_vendor.e({
            a: item.avatar,
            b: item.id == common_vendor.unref(userPower).id
          }, item.id == common_vendor.unref(userPower).id ? {
            c: common_vendor.t(item.nickname)
          } : !item.remarked ? {
            e: common_vendor.t(item.nickname)
          } : {
            f: common_vendor.t(item.remarked)
          }, {
            d: !item.remarked,
            g: "c10c040c-4-" + i0 + ",c10c040c-3",
            h: common_vendor.p({
              name: item.id,
              disabled: (common_vendor.unref(inviteFlag) || common_vendor.unref(removeFlag)) && optionCheck(item.id),
              shape: "circle",
              activeColor: "#19be6b"
            })
          });
        }),
        n: common_vendor.o(change),
        o: common_vendor.o(($event) => common_vendor.isRef(resultDate) ? resultDate.value = $event : resultDate = $event),
        p: common_vendor.p({
          placement: "column",
          modelValue: common_vendor.unref(resultDate)
        })
      }, {
        q: common_vendor.unref(wh) + "px"
      }) : {}, {
        r: common_vendor.unref(groupFlag)
      }, common_vendor.unref(groupFlag) ? common_vendor.e({
        s: common_vendor.unref(selectObj) != 0
      }, common_vendor.unref(selectObj) != 0 ? {
        t: common_vendor.t(common_vendor.unref(selectObj))
      } : {}, {
        v: common_vendor.o(createGroup),
        w: common_vendor.p({
          customStyle: common_vendor.unref(customStyle),
          color: "#5ac725",
          type: "primary"
        })
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"], ["__file", "D:/uniapp毕设/lucky/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
