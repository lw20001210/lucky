// 不能存localStorage本地，因为手机获取不到
export function setLocal(keys,val) {
  return uni.setStorage({
    key:keys,
    data: JSON.stringify(val),
  });
}
export function getLocal(keys) {
  let value = uni.getStorageSync(keys)
  if (value) {
      return JSON.parse(value)
  } else {
      return value
  }
}
export function removeLocal(keys) {
 uni.removeStorage({
 	key: keys,
 	success: function (res) {
 		console.log('success');
 	}
 });
}