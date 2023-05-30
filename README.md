## 解决页面y轴滚动条问题

* 给最外层容器加个padding

```less
<style lang="less">
  .container{
     padding: 10rpx 80rpx 0;
     .welcome{
```

## 样式兼容问题

* 登录注册页的输入框前面的昵称账号这些字老是竖着显示，给够了宽度也不行，

* 解决方法：用定位

  ```less
  .item {
          display: flex;
          margin-bottom: 32rpx;
          align-items: center;
          position: relative;
          width: 100%;
          label {
            position: absolute;
            left: 40rpx;
          }
  ```


## post请求解析form_data数据问题

* 当我们用uni.uploadFile上传数据时，req.body为空对象，node无法解析数据，需要装个插件

  ```js
  npm install connect-multiparty --save
  ------------------------------------------------------
  var multipart = require("connect-multiparty");
  -------------------------------------------------------
  router.post("/add", multipart(), (req, res) => {
  console.log(req.body);
  ```


## uniapp手机端异步问题

> 我写的uniapp项目中。当发送异步请求的时候，发现在浏览器运行是没问题的，但是手机端却是会报错。
>
> 这是因为模拟器和电脑似乎不是一个系统，它们两之间有一个边界作为隔离，也就是说模拟器是不能使用127.0.0.1或者localhost作为url访问地址的
>
> 所以需要把初始路径改为局域网ip地址

```js
const BASE_URL = 'http://192.168.242.20:3000'
```

## uni.showloading于Toast兼容性问题

```js
解决方法。把toast也加个定时器
  setTimeout(() => {
          showMsg('注册成功')
        }, 500)
```

## md5密码加密

```js
// 换md5加密算了，因为bcryptjs是单向加密的，无法解密
const md5 = require("md5");

// 拿着用户输入的密码,和数据库中存储的密码进行对比
  // 如果对比的结果等于 false, 则证明用户输入的密码错误
  function md5Hash(text) {
    const hash = crypto.createHash("md5");
    hash.update(text);
    return hash.digest("hex");
  }
  if (md5Hash(userinfo.password) != userRes.password)
    return res.send({
      msg: "密码错误",
    });
```

## 生成token

* 这是一个配置文件

  ```js
  // 这是一个全局的配置文件

  module.exports = {
    // 加密和解密 Token 的秘钥
    Keys: "lw",
    // token 的有效期
    times: "10h",
    mainUrl: "http://192.168.242.20:3000",
  };
  ```



* ```js
  const jwt = require("jsonwebtoken");
  // 生成 Token 字符串
    // 调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
    // //参数1：用户信息对象，参数2：加密的密匙，参数3：配置对象，可以配置当前token的有效期
    const tokenStr = jwt.sign({ username: userinfo.username }, config.Keys, {
      expiresIn: config.times,
    });
  ---------------------------------------------
       res.send({
      code: 200,
      data: userRes.dataValues,
      msg: "登录成功！",
      token: "Bearer " + tokenStr, // 要发送给客户端的 token 字符串,因为请求头的那个authorization属性必须家：Bearer，我这里直接给你拼接好了
    });
  ```

* ```js
  main.js
  const expressJWT = require("express-jwt");
  // 定义 token 的解析中间件，并排除 以/user开头的相关路由
  app.use(expressJWT({ secret: config.Keys }).unless({ path: [/^\/user/] }));
  // 定义错误中间件，全局自动捕获错误
  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") return res.send("身份验证失败。");
    res.send("服务器发生错误。");
  });

  ```

## sequelize操作数据库

### 基本使用

* 1.安装

  ```js
  npm i sequelize mysql
  npm install sequelize mysql2
  ```

* 2.连接数据库

  ```js
  const Sequelize = require("sequelize");
  // 配置sequlize连接数据库
  // 参数1：数据库名，参数2：用户名，参数3：密码。{参数1：数据库主机地址，参数2：数据库类型，参数3：是否打印日志}
  const sequelize = new Sequelize("mychatapp", "root", "admin123", {
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  });

  module.exports = sequelize;
  ```

* 3.定义数据模型

  ```js
  const Sequelize = require("sequelize");
  const sequelize = require("../mysql/sequlize");

  const UsersModel = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, //主键
        autoIncrement: true, //自动递增
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true, //唯一性
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: "D:新的开始Vue3项目\travelssrcassetsimghome", // 这里自行替换为默认图片的路径
      },
      sex: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
      },
      email: {
        type: Sequelize.STRING(50),
        defaultValue: "",
      },
      phone: {
        type: Sequelize.STRING(50),
        defaultValue: "",
      },
      birthday: {
        type: Sequelize.STRING(100),
        defaultValue: "",
      },
      statu: {
        type: Sequelize.TINYINT,
        defaultValue: 0, //默认0为女，1为男
      },
      createTime: {
        type: Sequelize.STRING(100),
        defaultValue: Date.now(),
      },
      signature: {
        type: Sequelize.STRING(100),
        defaultValue: "",
      },
    },
    { timestamps: false } //这个它会自动生成两个时间字段，我不需要·，所以弄掉了
  );

  module.exports = UsersModel;

  ```

* 创建表和导入数据表

  ```js
  const express = require("express");
  const userRoute = require("./router/users");
  const bodyParser = require("body-parser");
  const app = express();
  const cors = require("cors"); //跨域
  const config = require("./config");
  const expressJWT = require("express-jwt"); //一定要在路由之前配置
  const { mainUrl } = require("./config");
  app.use(cors());
  // 导入 Sequelize连接数据库 和模型定义
  const sequelize = require("./mysql/sequlize");
  const UserModel = require("./models/usersModel.js");
  const mySpace = require("./models/mySpace");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // 静态资源,方便我们前端以往网络图片形式访问
  app.use("/static", express.static("static"));

  // 定义 token 的解析中间件，并排除 user/register和user/login 相关路由
  app.use(
    expressJWT({ secret: config.Keys }).unless({
      path: [/^\/user\/register/, /^\/user\/login/],
    })
  );

  // 定义错误中间件
  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError")
      return res.send({
        code: 401,
        msg: "token已失效",
      });
    res.send("服务器发生错误。");
  });

  // 挂载路由
  app.use("/user", userRoute);

  // 连接数据库并同步数据表
  sequelize
    .authenticate()
    .then(() => {
      console.log("数据库连接成功。");
      return sequelize.sync();
    })
    .then(() => {
      console.log("数据表同步成功。");
      app.listen(3000, () => {
        console.log(`应用程序已启动，访问地址: ${mainUrl}/user`);
      });
    })
    .catch((error) => {
      console.error("数据库连接失败：", error);
    });

  ```

### 操作数据库

* 删除操作

  ```js
  //引入定义模型
  const UserModel = require("./models/UserModel");
  // 删除单个用户
  UserModel.destroy({
    where: { id: 1 },
  })
    .then(() => {
      console.log("删除用户成功");
    })
    .catch((error) => {
      console.error("删除用户失败", error);
    });

  // 删除多个用户
  UserModel.destroy({
    where: { type: "admin" },
  })
    .then(() => {
      console.log("删除用户成功");
    })
    .catch((error) => {
      console.error("删除用户失败", error);
    });
  ```

* 查询操作

  ```js
  const UserModel = require("./models/UserModel");
  // 查询单个用户
  UserModel.findOne({ where: { id: 1 } })
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.error("查询用户失败", error);
    });

  // 查询多个用户
  UserModel.findAll({ where: { type: "admin" } })
    .then((users) => {
      console.log(users);
    })
    .catch((error) => {
      console.error("查询用户失败", error);
    });

  //查询整个用户表
  UserModel.findAll()
    .then(users => {
      console.log(users);
    })
    .catch(error => {
      console.error('查询用户表失败', error);
    });
  ```

* 更新操作

  ```js
  const UserModel = require("./models/UserModel");
  // 更新单个用户
  UserModel.update(
    { username: "newname", email: "newemail@example.com" },
    {
      where: { id: 1 },
    }
  )
    .then(() => {
      console.log("更新用户成功");
    })
    .catch((error) => {
      console.error("更新用户失败", error);
    });

  // 更新多个用户
  UserModel.update(
    { type: "admin" },
    {
      where: { type: "user" },
    }
  )
    .then(() => {
      console.log("更新用户成功");
    })
    .catch((error) => {
      console.error("更新用户失败", error);
    });
  ```

* 插入操作

  ```js
   let result = await UsersModel.create({
      nickname,
      username,
      sex,
      phone,
      email,
      createTime,
      birthday,
      signature,
      ...newObj,
    });​
  ```


## 首页下拉框功能

* template

  ```vue
     <view class="navBar">
        <view class="left">
          <view class="avatar">
            <image class='img' :src="getLocal('avatar')"></image>
          </view>
          <view class="header_title">
            <text class="header_logo">{{getLocal('nickname')}}</text>
          </view>
        </view>
        <view class="right"><text class="iconfont size" @click="openPopup">&#xe615</text>
        </view>
        <!-- 下拉菜单 -->
        <view class="header_downup" @click="close" :animation="animationData">
          <view class="wrap">
            <view class="downup_item" @click="goSearch">
              <view class="iconfont">&#xe75c</view>
              <text>添加好友</text>
            </view>
            <view class="downup_item">
              <view class="iconfont">&#xe616</view>
              <text>创建群聊</text>
            </view>
            <view class="downup_item">
              <view class="iconfont">&#xe605</view>
              <text>创建小组</text>
            </view>
            <view class="downup_item">
              <view class="iconfont">&#xe8b5</view>
              <text>扫一扫</text>
            </view>
          </view>
        </view>
      </view>
  ```

* js

  ```js
  let animationData = ref({}) //响应动画数据
  let animation = ref(null); //创建动画对象
  let isShow = ref(false); //判断下拉框
   // 打开菜单
    function openPopup() {
      if (!animation.value) {
        animation.value = uni.createAnimation({
          duration: 200,
          transformOrigin: 'top right',
          timingFunction: 'ease',
        });
      }
      const animationValue = animation.value;
      if (isShow.value) {
        animationValue.opacity(0).width(0).height(0).step();
        isShow.value = false;
      } else {
        animationValue.opacity(1).width('300rpx').height('428rpx').step();
        isShow.value = true;
      }
      animationData.value = animationValue.export();
    }
    // 关闭菜单
    function close() {
      if (!animation.value) return;
      animation.value.opacity(0).width(0).height(0).step();
      animationData.value = animation.value.export();
      isShow.value = false;
    }
  ```

* css

  ```less
   .navBar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
      }
    .header_downup {
        position: absolute;
        top: 100rpx;
        right: 21rpx;
        z-index: 99;
        background-color: #fff;
        text-align: left;
        padding-left: 40rpx;
        box-sizing: border-box;
        background-color: rgba(76, 76, 76);
        width: 0;
        height: 0;
        opacity: 0;
        // width: 300rpx;
        // height: 428rpx;
        // opacity: 1;
        border-radius: 20rpx;
        box-shadow: 10rpx 10rpx 40rpx #ccc;
        overflow: hidden;

        .wrap {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .downup_item {
          display: flex;
          align-items: center;
          font-family: '华文楷体';
          font-size: 32rpx;
          font-weight: normal;
          color: #fff;
          text-overflow: ellipsis;
          white-space: nowrap;

          view {
            font-size: 42rpx;
          }

          text {
            margin-left: 10rpx;
          }
        }
      }
  ```


## 首页列表展示功能

```vue
 <scroll-view class="scroll" scroll-y="true" :style="{height: wh+'px'}">  </scroll-view>
```

```js
et wh=ref()
  function getHeight() {
    const val = uni.getSystemInfoSync()
    // 要减去tabbar的高度
    wh.value = val.windowHeight-50
  }
  onMounted(()=>{
    getHeight()
  })
```

```css
全局样式
/* 这个高度我们得手动去掉，否则纵向滚动做不了，它会撑开盒子高度导致两个滚动条 */
  :deep(.uni-app--showtabbar uni-page-wrapper::after)
  {
    display: none !important;
    height: 0 !important;
  }
  /* 隐藏滚动条 */
  ::-webkit-scrollbar {
      display: none;
      width: 0 !important;
      height: 0 !important;
      -webkit-appearance: none;
      background: transparent;
      color: transparent;
    }
```

## 组件传递字体图标解析失败

* 父组件

  ```js
    let obj=ref([{
      textFont:'icon-tianjiahaoyou1',
      title:'好友申请',
      bgColor:'rgb(255, 166, 102)'
      
    },{textFont:'icon-chuangjianqunliao',
      title:'创建群聊',
      bgColor:' rgb(61, 203, 242)'}])
    这样传类名可以在子组件解析
  ```

  ```js
   let obj=ref([{
      textFont:'&#xe75c',
      title:'好友申请',
      bgColor:'rgb(255, 166, 102)'
      
    },{textFont:'&#xe75c',
      title:'创建群聊',
      bgColor:' rgb(61, 203, 242)'}])
    这样传类名可以在子组件解析
  ```

> 上面第2种代码传值解析是无效的。可以直接写在模板上，但是不能传值和通过props传值渲染。

* 子组件

  ```vue
   <view class="left" >
        <view class="imgBg" :style="{backgroundColor:objData.bgColor}">
          <view class="iconfont size" :class="objData.textFont"></view>
        </view>
        <text>{{objData.title}}</text>
      </view>
      <view class="right">
        <view class="iconfont">&#xe62d</view>
      </view>
    </view>
  </template>
  <script setup>
    const props = defineProps(['objData']);
    console.log(props.objData);
  </script>
  ```

  ```vue
  <view class="left" >
        <view class="imgBg" :style="{backgroundColor:objData.bgColor}">
          <view class="iconfont size">{{objData.textFont}}</view>
        </view>
        <text>{{objData.title}}</text>
      </view>
      <view class="right">
        <view class="iconfont">&#xe62d</view>
      </view>
    </view>
  </template>
  <script setup>
    const props = defineProps(['objData']);
    console.log(props.objData);
  </script>
  ```

> 子组件的代码对应父组件的2组代码。第2种是解析不了的。

## uniapp生命周期问题

* 在vue3中，需要引入生命周期才能使用，否则报错

  ```js
  uni.navigateTo({
    url: `/pages/login/login?username=${userPower.username}`
   });
  --------------------------------------------------------------------
  import { onLoad } from "@dcloudio/uni-app"
   // 退出登录到登录页或自动填充账号
  onLoad((option)=>{
    console.log(option);
    userInfo.username=option.username
  })
  ```


## 处理自动登录问题

* 需求：登录后会获取一个token，然后我注销账号和退出登录都会删掉这个token。我现在是要在有token的时候我都会自动进入主页home，否则进入登录页
* bug：电脑上是没问题的。但是手机上在注册页上传头像的时候由于是没有token的，我开始是直接根据是否有token判断要不要自动登录，所以我点击在注册页它又会直接跳回来到登录页。

```js
onShow: function(options) {
      /*  // 这里如果这样写。那么在手机上将一选中注册头像就会跳转到登录页;
        // console.log(options);
        if (getLocal('token')) {
          uni.switchTab({
            url: '/pages/home/home'
          })
        } else {
          uni.redirectTo({
            url: "/pages/login/login",
          });
        }
```

* 后面我通过页面生命周期判断，onLoad,onHide,onUpload。结果还是没用。原因是我们手机在选择头像时会进入相册和拍摄界面。而我是通过onload的时候存储setLoad。onHide或者onUploadremoveLocal的。所以当外面进入特殊界面的时候相当于reMovelocal移除了判断依据所以还是会直接跳转到login页面导致还没填其他注册信息。
* 解决方法1：我依旧在onLoad里面存储。但是移除我在点击注册按钮后再移除，这样就避免了进入特殊页面这个问题。

```js
onLoad(() => {
    console.log('onload');
    setLocal('login',true)
  })
------------------------------------------   uni.uploadFile({
          url: 'http://192.168.242.20:3000/user/register', //仅为示例，非真实的接口地址
          filePath: userInfo.avatar,
          name: 'avatar',
          timeout: 1000,
          formData: param,
          success: (res) => {
            let result = JSON.parse(res.data);
            console.log(result);
            if (result.code == 200) {
              showMsg(result.msg, 1000, 'loading')
              uni.reLaunch({
                url: '/pages/login/login'
              })
               removeLocal('login')
            } else {
              showMsg(result.msg, 1000)
            }
```

* app.vue

  ```js
     onShow: function(options) {
           if (getLocal('login')) {
          console.log('防止手机上选择头像的时候触发下面代码直接进入到登录页');
        } else if (getLocal('token')) {
          uni.switchTab({
           url: '/pages/home/home'
          })
        } else {
          uni.redirectTo({
            url: "/pages/login/login",
          });
        }
     }
  ```


* 解决方法2==这个不行。因为我后面还需要判断更新头像也会进入特殊页面==

  ```js
  直接判断一个就好，方法1太蠢了。 
  onShow: function(options) {
        if (getLocal('token')) {
          uni.switchTab({
           url: '/pages/home/home'
          })
       }
   }​
  ```


## 头像上传注意事项

* uni.uploadFile默认支持post请求。

## 对于手机上样式问题

* 电脑上效果预期一样，但是手机显示可能有点问题。这个时候建议直接去改包的源码。

## 头像更新问题

* 由于我后端命名是拿注册账号命名的。导致后缀名一样的图片它的图片名是一样的，会有命名冲突，导致图片更新失败
* 解决办法：不要用那种账号直接命名，可以用随机数之类的，我这里用的是Date.now()毫秒数。

## 手机上获取图片问题

* 直接存标签上给图片手机上是获取不到的。所以我们用js获取

  ```js
  import img from "@/static/img/bg.jpg" ;
  let codeImg=ref()
  codeImg.value=img
  ```

  ​

## 突然前端接口连不上node问题

* 电脑的局域网ip是隔断时间会变化的
* 先win+r。然后ipconfig，找到 IPv4 地址。


## slot

- 插槽

- > <!--  slot="right"这种用法已经被废弃,改用v-slot -->
  >      <template #right >


## 头像问题

* 目前没用服务器。用的电脑ipv4地址，我的头像是根据ipV4地址+时间命名的，如果id地址变了，那么头像将会获取失败。