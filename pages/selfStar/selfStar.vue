<template>
  <view class="container">
    <view class="bg">
      <stastuBar class="important"></stastuBar>
      <view class="content">
        <Header :obj="headObj">
          <template #center>
            <text style="font-size: 30rpx;color: #fff;">个人空间</text>
          </template>
          <template #right>
            <text @click="goSendDynamic" class="iconfont icon-xiangji" style="font-size: 50rpx;"></text>
          </template>
        </Header>
        <view class="avatar">
          <text class="rootName">{{nickname}}</text>
          <view class="imgBg">
            <image :src="avatar"></image>
          </view>
        </view>
      </view>
    </view>
    <view class="none">
      <view class="default">
        <view class="left">
          <text>今天</text>
        </view>
        <view class="right">
          <view class="rImg">
            <text @click="goSendDynamic" class="iconfont icon-xiangji"></text>
          </view>
          <text class="vir">今天写点什么呢...</text>
        </view>
      </view>
    </view>
    <view class="detail" v-if="totalList!=[]">
      <scroll-view scroll-y="true" :style="{height: wh+'px'}">
        <template v-for="(item,index) in getSpaceDate" :key="index">
          <view class="spaceItem">
            <view class="scrollLeft">
              <view class="lt">
                {{dayFormat(item.createTime)}}
              </view>
              <view class="rt" v-if="item.content.imgArr!=[]">
                <template v-for="(img,inde) in item.content.imgArr" :key="index">
                  <image @click="preView(inde,item.content.imgArr)" :src="img" :style="{ 
                    width: item.content.imgArr.length == 1 ? '98%' : (item.content.imgArr.length == 2 ? '48%' : '32%'),
                 height: item.content.imgArr.length <= 3 ? '98%' : (item.content.imgArr.length <= 6 ? '48%' : '32%'),
                }">
                  </image>
                </template>
              </view>
            </view>
            <view class="scrollRight">
              <text>{{item.content.title}}</text>
              <view class="editBox">
                <view class="boxLt" :class="{imp:index==flag}">
                  <view class="l" @click="changeLike(item.id,item.uid,item.likes)">
                    赞<text
                      :class="{'icon-aixin': (item.likes?.length == 0) || (item.likes && item.likes[0]?.status == '0'), 'icon-aixin1': item.likes && item.likes[0]?.status == '1'}"
                      class="iconfont"></text>
                  </view>
                  <view class="c">
                    评论<text class="iconfont">&#xe66c</text>
                  </view>
                  <view class="r" @click="removeItem(item.id,item.uid)">
                    删除<text class="iconfont">&#xe8b6;</text>
                  </view>
                </view>
                <view class="boxRt iconfont" @click="editContent(index)">
                  &#xe6dd;
                </view>
              </view>
            </view>
          </view>
          <view class="showInfo iconfont" v-if="item.likes.length!=0?(item.likes[0].status==1):false">
            &#xeb47;<text>{{nickname}}</text>
          </view>
        </template>
      </scroll-view>
    </view>
  </view>
</template>
<script setup>
  import Header from "@/component/header.vue";
  import stastuBar from '@/component/statusBar.vue';
  import {
    userStore
  } from "@/pinia/userInfo/userInfo.js"
  import {
    ref,
    computed,
    onMounted,
  } from 'vue';
  import {
    mySpaceStore
  } from "@/pinia/userInfo/mySpace.js"
  import loginVue from "../login/login.vue";
  import {
    dayFormat
  } from "@/utils/format.js"
  const mySpacePower = new mySpaceStore();
  const userPower = new userStore();
  import {
    onLoad
  } from '@dcloudio/uni-app';
  import {
    storeToRefs
  } from 'pinia';

  const {
    avatar,
    nickname,
    id,
  } = storeToRefs(userPower);
  const {
    totalList,
    flag,
    isLike,
    likeList
  } = storeToRefs(mySpacePower)
  // 传递给header组件的数据
  let headObj = ref({
    leftFont: 'icon-zuojiantou-copy',
    title: '',
    rightFont: '',
    path: '/pages/star/star'
  });

  function goSendDynamic() {
    uni.navigateTo({
      url: '/pages/sendDynamic/sendDynamic'
    });
  }
  // 滚动栏的高度
  let wh = ref()

  function getHeight() {
    const val = uni.getSystemInfoSync()
    wh.value = val.windowHeight - 340
    // console.log(val.windowHeight);
  }
  onMounted(() => {
    getHeight();
  })
  // 发起请求
  onLoad(() => {
    userPower.getUserInfo()
    mySpacePower.getmySpaceInfo(id.value)
    mySpacePower.getSpaceDetail()
  })

  // 判断点击了哪个编辑框
  function editContent(index) {
    if (flag.value == index) {
      flag.value = 'a'
    } else {
      flag.value = index;
    }
  }
  // 判断是是否点赞
  const getLike = computed(() => {
    return isLike.value == '0' ? 'icon-aixin' : 'icon-aixin1';
  });
  // 改变点赞的状态
  function changeLike(id, uid, likeArr) {
    if (likeArr.length == 0) return mySpacePower.updateLike(id, uid, 1)
    if (likeArr[0].status == '0') {
      likeArr[0].status = 1
    } else {
      likeArr[0].status = 0
    }
    mySpacePower.updateLike(id, uid, likeArr[0].status)
  }
  // 删除朋友圈
  function removeItem(id, uid) {
    mySpacePower.removeSpace(id, uid)
  }
  // 图片预览
  function preView(index, imgArr) {
    uni.previewImage({
      current: index,
      urls: imgArr,
      loop: true,
      indicator: "default"
    })
  }
  // 整理把动态数据和点赞数据整合在一块
  let getSpaceDate = computed(() => {
    return totalList.value.map(dynamic => {
      // 在每个动态对象中添加一个空数组属性用于存储点赞信息
      dynamic.likes = [];
      // 遍历点赞表的数据，将与当前动态ID匹配的点赞信息添加到对应动态的likes数组中
      likeList.value.forEach(like => {
        if (like.likeId === dynamic.id) {
          // 构建点赞对象
          const likeInfo = {
            id: like.id,
            uid: like.uid,
            status: like.status,
            createTime: like.createTime
          };
          // 将点赞对象添加到对应动态的likes数组中
          dynamic.likes.push(likeInfo);
        }
      });
      return dynamic;
    })
  })
  console.log(getSpaceDate.value);
</script>

<style scoped lang="scss">
  .container {

    // background-color: rgb(255, 255, 255);
    .bg {
      position: relative;
      height: 450rpx;
      width: 100%;
      background: url('@/static/images/spaceBg.jpg') no-repeat;
      background-size: cover;
      overflow: visible;
    }

    .content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 15rpx 30rpx 0;
      overflow: visible;

      .avatar {
        display: flex;
        position: absolute;
        top: 380rpx;
        right: 30rpx;

        .rootName {
          margin-right: 10rpx;
          margin-top: 20rpx;
          color: white;
          font-size: 28rpx
        }

        .imgBg {
          width: 115rpx;
          height: 115rpx;
          position: relative;
          // background-color: #3e6fac;
          border-radius: 15rpx;

          image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }

    .none,
    .detail {
      font-family: '华文楷体';
      margin: 70rpx 30rpx 0;

      .default {
        height: 100rpx;
        display: flex;

        .left {
          text {
            font-size: 50rpx;
            font-family: '华文楷体';
          }
        }

        .right {
          margin-left: 50rpx;
          display: flex;

          .rImg {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100rpx;
            height: 100rpx;
            border-radius: 10rpx;
            background-color: #2680eb;
            flex-shrink: 0;

            text {
              font-size: 60rpx
            }
          }

          .vir {
            color: rgb(102, 102, 102);
            font-size: 30rpx;
            margin: 5rpx 0 0 15rpx;
          }
        }
      }
    }

    .none {
      margin-bottom: 20rpx;
    }

    .detail {
      // overflow: hidden;
      margin-top: 0;

      .spaceItem {
        box-sizing: border-box; // 添加这一行
        margin: 40rpx 10rpx;
        margin-left: 0;
        height: 300rpx;
        display: flex;
        justify-content: space-between;
        transform: all 1s;
        // background-color: red;
        .scrollLeft {
          height: 100%;
          width: 60%;
          display: flex;
          justify-content: space-between;

          .lt {
            width: 120rpx;
            font-size: 40rpx;
            font-family: STKaiti;
          }

          .rt {
            width: 100%;
            height: 100%;

            image {
              vertical-align: middle;
              margin-left: 4rpx;
              margin-top: 4rpx;
            }
          }
        }

        .scrollRight {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 10rpx;
          font-size: 28rpx;
          height: 300rpx;

          text {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            overflow: hidden;
            font-family: STKaiti;
            /* 设置文本超出内容省略号显示 */
            text-overflow: ellipsis;
            /* 可以换行 */
            word-wrap: break-word;
            /* 超出不换行 */
            white-space: pre-wrap;
          }

          .editBox {
            height: 80rpx;
            // background-color: #2680eb;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            position: relative;

            .boxRt {
              position: absolute;
              right: 0;
              font-size: 40rpx;
              background-color: #f7f7f7;
              padding: 1rpx 5rpx;
              display: flex;
              justify-content: center;
              height: 50rpx;
              align-items: center;
              margin-top: 5rpx;
            }

            .boxLt {
              display: none;
            }

            .imp {
              display: block;
              position: absolute;
              left: 0;
              right: 50rpx;
              color: #fff;
              background-color: rgba(76, 76, 76);
              border-radius: 10rpx;
              font-size: 20rpx;
              overflow: hidden;

              // display: flex;
              // justify-content: space-around;
              // align-items: center;
              .l,
              .c,
              .r {
                float: left;
                width: 33.3%;
                text-align: center;
              }
            }

          }
        }
      }

      .showInfo {
        background-color: #f7f7f7;
        padding: 12rpx 15rpx;
        width: 100%;
        font-weight: bold;
        font-size: 28rpx;
        color: #746ba7;

        text {
          padding-left: 5rpx;
        }
      }
    }
  }
</style>