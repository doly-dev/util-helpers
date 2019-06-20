import isType from './common/isType';

// 当前时区
const localeZone = new Date().getTimezoneOffset()/60;

// 获取时区差值
function getTimezoneOffset(zone){
    return localeZone - zone;
}

// 转换时区时间戳
function transformTimezone(date, zone){
    const d = new Date(date).getTime();
    const timezoneOffset = getTimezoneOffset(zone);
    const timezoneOffsetTimestamp = timezoneOffset * 60 * 60 * 1000;
    return d + timezoneOffsetTimestamp;
}

/**
 * 格式化日期时间
 * y-年 M-月 d-日 h-小时 m-分钟 s-秒 q-季度 S-毫秒
 * 1.关于时区处理，默认当地时区。可设置 utcOffset 为东八区utc偏移量({utcOffset=-8})
 * 2.如果日期字符串不带时间(如2019-06-20)，时间会自动处理为当地时区 2019-06-20 08:00:00
 * 
 * @since 1.1.0
 * @param { Date | String | Number } date 日期时间 字符串（2019-06-20 00:15:38）、数字（时间戳） 默认 当前时间
 * @param { String } format 日期时间格式 默认格式 yyyy-MM-dd hh:mm:ss
 * @param { Object } options 配置项
 * @param { String | Number } options.utcOffset UTC偏移量 默认当前时区 (new Date().getTimezoneOffset()/60)
 * @return { String } 格式化的日期时间
 * @example
 * 
 * const d1 = Date.now();
 * formatDate(d1); // => 2019-06-19 19:24:05
 * fotmatDate(d1, 'yyyy-MM-dd'); // => 2019-06-19
 * formatDate(d1, 'hh:mm'); // => 19:24
 * 
 */
function formatDate(date = new Date(), format = 'yyyy-MM-dd hh:mm:ss', {
    utcOffset = localeZone
}={}) {

    utcOffset = +utcOffset;

    if (!date || typeof format !== 'string' || typeof utcOffset !== 'number' || isNaN(utcOffset)) {
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

    // 转换时区
    date = new Date(transformTimezone(date, utcOffset));

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