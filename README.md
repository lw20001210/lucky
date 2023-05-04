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
          }​
  ```


## post请求解析数据问题

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



## 待处理问题

* 通过手机端上传的图片。无法通过得到是对象直接拿到图片
* 一个端要不要可以具有同时登录其他账号的功能。