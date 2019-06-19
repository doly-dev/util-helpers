import isType from './common/isType';

/**
 * 格式化日期时间
 * y-年 M-月 d-日 h-小时 m-分钟 s-秒 q-季度 S-毫秒
 * 该方法只做格式化，存在时区问题。如只传入年月日，但格式带有时间，会导致时区错误！
 * 如果需要更多时间操作，请使用 dayjs、moment等时间处理库
 * 
 * @since 1.1.0
 * @param { Date | String | Number } date 日期时间 默认 当前时间
 * @param { String } format 日期时间格式 默认格式 yyyy-MM-dd hh:mm:ss
 * @return { String } 格式化的日期时间
 * @example
 * 
 * const d1 = Date.now();
 * formatDate(d1); // => 2019-06-19 19:24:05
 * fotmatDate(d1, 'yyyy-MM-dd'); // => 2019-06-19
 * formatDate(d1, 'hh:mm'); // => 19:24
 * 
 */
function formatDate(date = new Date(), format = 'yyyy-MM-dd hh:mm:ss') {
  if (!date || typeof format !== 'string') {
    console.error('参数错误');
    return '';
  }
  if (typeof date === 'string' || (typeof date === 'number' && !isNaN(date))) {
    date = new Date(date);
  }

  if (!isType(date, 'Date')) {
    console.log('参数错误');
    return '';
  }

  const o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S": date.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
  return format;
}

export default formatDate;