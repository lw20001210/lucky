import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

// 加载中文语言包
dayjs.locale('zh-cn')

// 扩展 dayjs 的相对时间插件
dayjs.extend(relativeTime)

export function dayFormat(val) {
  //转化为日期对象。
  const targetTime = dayjs.unix(val / 1000)
  // 返回相对时间的字符串描述; dayjs().from() 方法需要传入一个日期对象（比如 dayjs('2023-06-14')），而不是一个时间戳。
return dayjs().to(dayjs(targetTime))
}