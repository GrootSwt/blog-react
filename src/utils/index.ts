/**
 * 时间戳转字符串
 * @param timestamp 时间戳
 * @param format  字符串格式
 * @returns {*} 字符串时间
 */
function timestampToStr (timestamp: number, format: string) {
  const date = new Date(timestamp)
  const getTwo = (i: number) => {
    return i < 10 ? '0' + i : '' + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (i: string) => {
    switch (i) {
      case 'yyyy':
        return getTwo(date.getFullYear())
      case 'MM':
        return getTwo(date.getMonth() + 1)
      case 'dd':
        return getTwo(date.getDate())
      case 'HH':
        return getTwo(date.getHours())
      case 'mm':
        return getTwo(date.getMinutes())
      case 'ss':
        return getTwo(date.getSeconds())
      default:
        return ''
    }
  })
}

// 时间戳转字符串日期
export function formatDate (timestamp: number, format = 'yyyy-MM-dd') {
  return timestampToStr(timestamp, format)
}

// 时间戳转字符串日期加时间
export function formatTime (timestamp: number, format = 'yyyy年MM月dd日 HH时mm分ss秒') {
  return timestampToStr(timestamp, format)
}
