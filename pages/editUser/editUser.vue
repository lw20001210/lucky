<template>
  <view class="container">
    <Header :obj="headObj"></Header>
    <view class="list">
      <view class="content">
        <view class="describe">
          头像
        </view>
        <view class="iconfont special">
          <uni-file-picker :del-icon="false" limit="1" :imageStyles="imageStyles" file-mediatype="image"
            @select="select" disable-preview return-type="object">
            <view class="photograph">
              &#xe634;
            </view>
          </uni-file-picker>
          <text>&#xe612</text>
        </view>
      </view>
      <view class="content" @click="editInfo('个性签名')">
        <view class="describe">
          个性签名
        </view>
        <view class="detail iconfont">
          <view class="default fixed">
            {{onSignature}}
          </view>
          <text style="margin-right: 3rpx;">&#xe612</text>
        </view>
      </view>
      <view class="content" @click="editInfo('昵称')">
        <view class="describe">
          昵称
        </view>
        <view class="detail iconfont">
          <view class="default">
            {{nickname}}
          </view>
          <text>&#xe612</text>
        </view>
      </view>
      <view class="content" @click="editInfo('性别')">
        <view class="describe">
          性别
        </view>
        <view class="detail iconfont">
          <view class="default">
            {{onSex}}
          </view>
          <text>&#xe612</text>
        </view>
      </view>
    </view>
  </view>
  <view class="divide">
  </view>
  <view class="two">
    <view class="list">
      <view class="content">
        <view class="describe">
          生日
        </view>
        <view class="detail iconfont">
          <view class="default">
          <picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
            <view class="uni-input">{{initBirthday}}</view>
          </picker>
          </view>
          <text>&#xe612</text>
        </view>
      </view>
      <view class="content" @click="editInfo('邮箱')">
        <view class="describe">
          邮箱
        </view>
        <view class="detail iconfont">
          <view class="default">
            {{onEmail}}
          </view>
          <text>&#xe612</text>
        </view>
      </view>
      <view class="content" @click="editInfo('绑定手机号')">
        <view class="describe">
          绑定手机号
        </view>
        <view class="detail iconfont">
          <view class="default">
            {{onPhone}}
          </view>
          <text>&#xe612</text>
        </view>
      </view>
      <view class="content" @click="Warn">
        <view class="describe">
          绑定第三方账号
        </view>
        <view class="detail iconfont">
          <view class="default">
          </view>
          <text>&#xe612</text>
        </view>
      </view>
      <view class="content" @click="editInfo('新密码')">
        <view class="describe">
          修改密码
        </view>
        <view class="detail iconfont">
          <view class="default">
          </view>
          <text>&#xe612</text>
        </view>
      </view>
    </view>
  </view>
  <view class="divide">
  </view>
  <view class="two">
    <view class="list">
      <view class="content" @click="removeUser">
        <view class="describe">
          注销账号
        </view>
        <view class="detail iconfont">
          <view class="default">
          </view>
          <text>&#xe612</text>
        </view>
      </view>
    </view>
  </view>
  <!-- 输入框示例 -->
  <uni-popup ref="inputDialog" type="dialog">
    <uni-popup-dialog ref="inputClose" mode="input" :value="infoValue" :title="info" :placeholder="infoVal"
      @confirm="dialogInputConfirm"></uni-popup-dialog>
  </uni-popup>
</template>

<script setup>
  import {
    ref,
    reactive,
    computed,
    watch
  } from 'vue';
  import Header from "@/component/header.vue";
  import {
    getLocal
  } from "@/utils/local.js";
  import {
    onLoad,
    onHide,
    onUnload
  } from '@dcloudio/uni-app';
  import {
    MD5
  } from "crypto-js";
  import {
    removeLocal,
    setLocal
  } from "@/utils/local.js";
  import request from "@/utils/request.js";
  // 传递给header组件的数据
  let headObj = ref({
    leftFont: 'icon-zuojiantou',
    title: '账号设置',
    path: '/pages/star/star'
  })
  // 上传选中图片的样式数据
  let imageStyles = ref({
    width: 50,
    height: 50,
    border: {
      "radius": "50%"
    }
  })
  let userInfo = reactive({
    username: '',
    password: '',
    nickname: '',
    avatar: ''
  })

  function Warn() {
    showMsg('该功能尚未开发')
  }
  import {
    userStore
  } from '@/pinia/userInfo/userInfo.js';
  import {
    storeToRefs
  } from 'pinia';
  import {
    showMsg
  } from '@/utils/Toast.js'
  const powerStore = userStore()
  const {
    nickname,
    username,
    avatar,
    signature,
    email,
    phone,
    password,
    sex,
    birthday
  } = storeToRefs(powerStore)
  // 注销账号
  function removeUser() {
    powerStore.removeUser()
  }

  function select(res) {
    userInfo.avatar = res.tempFilePaths[0]
    avatar.value = res.tempFilePaths[0]
    upload()
  }
  onLoad(() => {
    console.log('onload');
    setLocal('edits', true)
  })
  onUnload(() => {
    removeLocal('edits') //我用来另一种方法
  })
  // 更新导入图片
  function upload() {
    let param = {
      nickname: nickname.value,
      username: username.value
      // 我这里直接在前端进行加密了，因为传给后端的时候
      // password: MD5(userInfo.password).toString()
    }
    uni.uploadFile({
      url: 'http://192.168.85.20:3000/user/update',
      filePath: userInfo.avatar,
      name: 'avatar',
      timeout: 1500,
      header: {
        authorization: getLocal('token') ? getLocal('token') : ""
      },
      formData: param,
      success: (res) => {
        let result = JSON.parse(res.data);
        console.log(result);
        if (result.code == 200) {
          avatar.value = result.data.avatar;
          showMsg('更新成功', 1000, 'loading')
        }
        removeLocal('edits') //我用来另一种方法
      },
      fail: () => {
        showMsg('更新失败')
      }
    })
  }
  // 通过弹出框更新用户信息
  let info = ref(); //编辑信息popup-dialog提示1信息
  // 一个计算属性 ,默认显示的提示信息
  const infoVal = computed(() => {
    return '请输入' + info.value
  });
  // 动态展示用户信息
  const onSignature = computed(() => {
    if (!signature.value) {
      return '这个人很懒，什么都没有留下666'
    } else {
      return signature.value
    }
  });
  const onEmail = computed(() => {
    if (!email.value) {
      return '未设置'
    } else {
      return email.value
    }
  });
  const onPhone = computed(() => {
    if (!phone.value) {
      return '未绑定'
    } else {
      return phone.value
    }
  });
  const onSex = computed(() => {
    if (sex.value == 0) {
      return '女'
    } else {
      return '男'
    }
  });
  const initBirthday = computed(() => {
    if (!birthday.value) {
      return '未设置'
    } else {
      return birthday.value
    }
  });
  const onbirthday = computed(() => {
        if (!birthday.value) {
          return '未设置'
        } else {
          birthday.value = getDate({format: true})
           getDate({format: true})
            }
          });
        const startDate = computed(() => {
          return getDate('start');
        });
        const endDate = computed(() => {
          return getDate('end');
        });

        function bindDateChange(e) {
          birthday.value = e.detail.value
          console.log(e);
          return powerStore.updateUser({
            username: username.value,
            // 直接用响应式的值做对象的键会报错
            'birthday': e.detail.value
          })
        }
        function getDate(type) {
          const date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();

          if (type === 'start') {
            year = year - 60;
          } else if (type === 'end') {
            year = year + 2;
          }
          month = month > 9 ? month : '0' + month;
          day = day > 9 ? day : '0' + day;
          return `${year}-${month}-${day}`;
        }
        // 编辑框的实例对象
        let inputDialog = ref();
        let inputClose = ref()
        // 小封装
        function upDateInfo(val) {
          info.value = val;
          inputDialog.value.open()
        }
        // 点击编辑的每个小点
        function editInfo(val) {
          switch (val) {
            case '个性签名':
              upDateInfo(val)
              break;
            case '昵称':
              upDateInfo(val)
              break;
            case '邮箱':
              upDateInfo(val)
              break;
            case '绑定手机号':
              upDateInfo(val)
              break;
            case '新密码':
              upDateInfo(val)
              break;
            case '性别':
              uni.showActionSheet({
                itemList: ['男', '女'],
                success: function(res) {
                  // console.log(res.tapIndex);
                  if (res.tapIndex == 1) {
                    console.log(res.tapIndex);
                    sex.value = '女';
                    return powerStore.updateUser({
                      username: username.value,
                      // 直接用响应式的值做对象的键会报错
                      'sex': 0
                    })
                  } else if (res.tapIndex == 0) {
                    console.log(res.tapIndex);
                    sex.value = '男'
                    return powerStore.updateUser({
                      username: username.value,
                      // 直接用响应式的值做对象的键会报错
                      'sex': 1
                    })
                  }
                  showMsg('修改中', 800, 'loading')
                },
                fail: function(res) {
                  console.log(res.errMsg);
                }
              });


          }
        }
        // 即使更新视图信息变化
        let itemVal = ref()
        watch(info, (newX) => {
          info.value = newX;
          // 判断点击了哪个该传递给后端的参数
          if (newX == '个性签名') {
            itemVal.value = 'signature'
          } else if (newX == '昵称') {
            itemVal.value = 'nickname'
          } else if (newX == '邮箱') {
            itemVal.value = 'email'
          } else if (newX == '绑定手机号') {
            itemVal.value = 'phone'
          } else if (newX == '新密码') {
            itemVal.value = 'password'
          }
        })
        let infoValue = ref(); //我们输入的信息
        // 判断点击了哪个该传递给后端的参数
        function dialogInputConfirm(e) {
          console.log(e);
          infoValue.value = e;
          console.log(infoValue.value);
          if (itemVal.value == 'password') {
            infoValue.value = MD5(infoValue.value).toString()
          }
          powerStore.updateUser({
            username: username.value,
            // 直接用响应式的值做对象的键会报错
            [itemVal.value]: infoValue.value
          })
          showMsg('修改中', 800, 'loading')
          inputDialog.value.close()
          // 关闭窗口后，恢复默认内容
          inputDialog.value.close();
          infoValue.value = ''

        }
</script>

<style scoped lang="scss">
  .container {
    padding: 20rpx 25rpx 0;
  }

  .list {
    margin: 10rpx 5px 0;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25rpx 0;
    height: 84rpx;

    .describe {
      width: 250rpx;
    }

    .detail {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      font-size: 50rpx;
      align-items: center;
      color: #000;
      .photograph {
        width: 100rpx;
        height: 100rpx;
        border: 1px solid rgb(238, 238, 238);
        text-align: center;
        padding-left: 6rpx;
        line-height: 100rpx;
        border-radius: 50%;
      }

      .default {
        font-size: 31rpx;
        color: #7B7B7B;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    :deep(.file-picker__progress) {
      display: none !important;
    }
.special{
 display: flex;
 justify-content: flex-end;
 font-size: 50rpx;
 align-items: center;
 color: #000;
width: 150rpx;
  :deep(.uni-file-picker__container[data-v-bdfc07e0]) {
      justify-content: flex-end !important;
    }
}

  }

  .divide {
    height: 15rpx;
    background-color: #f2f2f2;
  }

  .two {
    padding: 0 25rpx;
  }

  .fixed {
    box-sizing: border-box;
  }

  // 样式兼容问题，建议直接改源码。
  // :deep(.uni-file-picker__container[data-v-bdfc07e0]) {
  //   display:inline-block;
  //  }
  // :deep(.uni-file-picker[data-v-6223573f]){
  //    flex:none;
  //    width: 80rpx;
  //  }
  // :deep(.uni-file-picker__container[data-v-bdfc07e0]){
  //   justify-content: flex-end;
  // }
</style>