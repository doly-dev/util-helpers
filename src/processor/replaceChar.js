
/**
 * 替换字符，应用场景如：脱敏
 * 
 * @module processor/replaceChar
 * @since 1.1.0
 * @param {String} str 要处理的字符串
 * @param {Object} [options] 配置项
 * @param {Number} [options.start=3] 开始位置
 * @param {Number} [options.end=-4] 结束位置
 * @param {String} [options.char='*'] 替换字符
 * @param {Number} [options.repeat] 替换字符的重复次数，默认为替换内容长度，可设置为固定值
 * @param {String} [options.exclude] 排除字符，如果指定排除项，repeat设置无效
 * @example
 * 
 * // 手机号
 * replaceChar('13000000000');
 * // => 130****0000
 * 
 * // 身份证
 * replaceChar('130701199310302288');
 * // => 130***********2288
 * 
 * // 邮箱
 * const email = '12345@qq.com'
 * replaceChar(email, {start: 2, end: email.indexOf('@'), repeat: 4});
 * // => 12****@qq.com
 *
 * // 银行卡号
 * replaceChar('6228480402564890018', {start: 0, end: -4, repeat: 4});
 * // => ****0018
 * 
 * // 带格式的银行卡号
 * replaceChar('6228 4804 0256 4890 018', {start: 4, end: -4, exclude: ' '});
 * // => 6228 **** **** **** 018
 * 
 * // 用户名
 * replaceChar('林某某', {start: 1, end: -1, repeat: 1});
 * // => 林*某
 * 
 */
function replaceChar(str = '', {
    start = 3,
    end = -4,
    char = '*',
    repeat,
    exclude
} = {}) {
    const strLen = str.length;

    // 开始位置超过str长度
    if (Math.abs(start) >= strLen) {
        return str;
    }

    start = start >= 0 ? start : strLen + start;
    end = end >= 0 ? end : strLen + end;

    // 开始位置大于结束位置
    if (start >= end) {
        return str;
    }

    let middleStr = '';

    if (exclude) {
        repeat = Math.round(end - start);

        const maskStr = str.substr(start, repeat);
        const reg = new RegExp(`[^${exclude}]`, 'g');
        middleStr = maskStr.replace(reg, char);
    } else {
        repeat = typeof repeat === 'number' && repeat >= 0 ? repeat : Math.round(end - start);
        middleStr = char.repeat(repeat);
    }

    return str.substr(0, start) + middleStr + str.substr(end);
}

export default replaceChar