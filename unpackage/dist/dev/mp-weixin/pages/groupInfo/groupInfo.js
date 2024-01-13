"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_config = require("../../utils/config.js");
const utils_request = require("../../utils/request.js");
const pinia_userInfo_userInfo = require("../../pinia/userInfo/userInfo.js");
const utils_Toast = require("../../utils/Toast.js");
const pinia_userInfo_status = require("../../pinia/userInfo/status.js");
const utils_local = require("../../utils/local.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_file_picker2 + _easycom_uv_button2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (Header + _easycom_uni_file_picker + _easycom_uv_button + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const Header = () => "../../component/header.js";
const _sfc_main = {
  __name: "groupInfo",
  setup(__props) {
    pinia_userInfo_status.statusStore();
    const userInfo = pinia_userInfo_userInfo.userStore();
    const inputDialog = common_vendor.ref();
    let imageStyles = common_vendor.ref({
      width: 50,
      height: 50,
      border: {
        "radius": "50%"
      }
    });
    let objDate = common_vendor.ref({
      leftFont: "icon-zuojiantou",
      title: ""
    });
    common_vendor.ref("");
    common_vendor.ref("");
    let groupId = common_vendor.ref();
    let groupLeaderId = common_vendor.ref();
    let groupUsers = common_vendor.ref([]);
    let groupUserList = common_vendor.ref([]);
    let groupInfo = common_vendor.ref({});
    const getGroupUsers = async (groupId2) => {
      let {
        data: res
      } = await utils_request.request("/user/getGroupUsers", "get", {
        groupId: groupId2,
        myId: userInfo.id
      });
      if (res.code != 200) {
        return utils_Toast.showMsg("获取数据失败");
      } else {
        groupUsers.value = res.data;
        return res.data;
      }
    };
    const getGroupUserList = async (groupId2) => {
      let {
        data: res
      } = await utils_request.request("/user/groupUserList", "get", {
        groupId: groupId2,
        myId: userInfo.id
      });
      if (res.code != 200) {
        return utils_Toast.showMsg("获取数据失败");
      } else {
        res.data.sort(function(a, b) {
          return a.createTime - b.createTime;
        });
        console.log(res.data, 566);
        groupUserList.value = res.data;
        return res.data;
      }
    };
    async function getGroupInfo(id) {
      var _a;
      let {
        data: res
      } = await utils_request.request("/user/getGroupInfo", "get", {
        groupId: id
      });
      if (res.code != 200)
        return utils_Toast.showMsg("数据获取失败");
      groupInfo.value = res.data;
      groupLeaderId.value = (_a = res.data) == null ? void 0 : _a.adminId;
      console.log(1111);
    }
    common_vendor.onLoad(async (option) => {
      groupId.value = option.groupId;
      await getGroupInfo(option.groupId);
      await getGroupUsers(option.groupId);
      let userList = await getGroupUserList(option == null ? void 0 : option.groupId);
      objDate.value.title = `群聊信息（${userList.length}）`;
    });
    const customStyle = common_vendor.computed(() => {
      return {
        width: "100%",
        height: "100rpx",
        color: "red"
      };
    });
    function warn() {
      utils_Toast.showMsg("此功能尚未开发!");
    }
    function invite() {
      let ids = groupUserList.value.map((item) => {
        return item.id;
      });
      common_vendor.index.navigateTo({
        url: `/pages/search/search?url=group&ids=${JSON.stringify(ids)}&groupId=${groupId.value}&count=${groupUserList.value.length}`
      });
    }
    function removeFriend() {
      let ids = groupUserList.value.map((item) => {
        return item.id;
      });
      common_vendor.index.navigateTo({
        url: `/pages/search/search?remove=true&url=group&ids=${JSON.stringify(ids)}&groupId=${groupId.value}&count=${groupUserList.value.length}`
      });
    }
    function select(res) {
      console.log(res.tempFilePaths[0], 666);
      editInfo(3, res.tempFilePaths[0]);
    }
    let typed = common_vendor.ref(0);
    function editInfo(type, fileUrl) {
      if (type == 1) {
        typed.value = 1;
        inputDialog.value.open();
      } else if (type == 2) {
        if (groupLeaderId.value != userInfo.id)
          return utils_Toast.showMsg("仅群主可编辑");
        typed.value = 2;
        inputDialog.value.open();
      } else {
        let param = {
          groupId: groupId.value
        };
        console.log(fileUrl, 999);
        common_vendor.index.uploadFile({
          url: `${utils_config.mainUrl}/user//updateAvatar`,
          filePath: fileUrl,
          name: "avatar",
          timeout: 1500,
          header: {
            authorization: utils_local.getLocal("token") ? utils_local.getLocal("token") : ""
          },
          formData: param,
          success: (res) => {
            utils_Toast.showMsg("更新成功", 1e3, "loading");
            console.log(res);
          },
          fail: () => {
            utils_Toast.showMsg("更新失败");
          }
        });
      }
    }
    async function dialogInputConfirm(e) {
      console.log(e, typed.value);
      let obj = {
        groupId: groupId.value,
        typed: typed.value,
        message: e
      };
      let {
        data: res
      } = await utils_request.request("/user/updateGroup", "put", obj);
      if (res.code != 200)
        return utils_Toast.showMsg();
      getGroupInfo(groupId.value);
      inputDialog.value.close();
    }
    async function exitGroup() {
      let {
        data: res
      } = await utils_request.request("/user/exitGroup", "delete", {
        uid: userInfo.id,
        groupId: groupId.value
      });
      if (res.code != 200)
        return utils_Toast.showMsg("退出群聊失败");
      utils_Toast.showMsg("退出群聊成功", 1e3, "loading");
      common_vendor.index.switchTab({
        url: "/pages/home/home"
      });
    }
    async function removeGroup() {
      let { data: res } = await utils_request.request("/user/removeGroup", "delete", {
        groupId: groupId.value
      });
      if (res.code != 200)
        return utils_Toast.showMsg("解散群聊失败");
      utils_Toast.showMsg("解散群聊成功", 1e3, "loading");
      common_vendor.index.switchTab({
        url: "/pages/home/home"
      });
    }
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.p({
          obj: common_vendor.unref(objDate)
        }),
        b: common_vendor.f(common_vendor.unref(groupUserList), (item, index, i0) => {
          return common_vendor.e({
            a: index < 17
          }, index < 17 ? {
            b: item.avatar,
            c: common_vendor.t(item.remarked ? item.remarked : item.nickname)
          } : {}, {
            d: item.id
          });
        }),
        c: common_vendor.o(invite),
        d: common_vendor.unref(groupLeaderId) == common_vendor.unref(userInfo).id
      }, common_vendor.unref(groupLeaderId) == common_vendor.unref(userInfo).id ? {
        e: common_vendor.o(removeFriend)
      } : {}, {
        f: common_vendor.t((_a = common_vendor.unref(groupInfo)) == null ? void 0 : _a.nickname),
        g: common_vendor.o(($event) => editInfo(1)),
        h: common_vendor.o(select),
        i: common_vendor.p({
          ["del-icon"]: false,
          limit: "1",
          imageStyles: common_vendor.unref(imageStyles),
          ["file-mediatype"]: "image",
          ["disable-preview"]: true,
          ["return-type"]: "object"
        }),
        j: common_vendor.t(common_vendor.unref(groupInfo).intro),
        k: common_vendor.o(($event) => editInfo(2)),
        l: common_vendor.o(warn),
        m: common_vendor.p({
          text: "清空聊天记录",
          customStyle: common_vendor.unref(customStyle)
        }),
        n: common_vendor.unref(groupLeaderId) == common_vendor.unref(userInfo).id
      }, common_vendor.unref(groupLeaderId) == common_vendor.unref(userInfo).id ? {
        o: common_vendor.o(removeGroup),
        p: common_vendor.p({
          text: "解散群聊",
          customStyle: common_vendor.unref(customStyle)
        })
      } : {
        q: common_vendor.o(exitGroup),
        r: common_vendor.p({
          text: "退出群聊",
          customStyle: common_vendor.unref(customStyle)
        })
      }, {
        s: common_vendor.sr("inputClose", "0f05e0bf-6,0f05e0bf-5"),
        t: common_vendor.o(dialogInputConfirm),
        v: common_vendor.p({
          mode: "input",
          title: "编辑群信息",
          placeholder: "请输入"
        }),
        w: common_vendor.sr(inputDialog, "0f05e0bf-5", {
          "k": "inputDialog"
        }),
        x: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f05e0bf"], ["__file", "D:/uniapp毕设/lucky/pages/groupInfo/groupInfo.vue"]]);
wx.createPage(MiniProgramPage);
