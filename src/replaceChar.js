/**
 * 替换字符，应用场景如：脱敏
 *
 * @static
 * @alias module:Processor.replaceChar
 * @since 1.1.0
 * @param {string} str 要处理的字符串
 * @param {Object} [options] 配置项
 * @param {number} [options.start=3] 开始位置
 * @param {number} [options.end=-4] 结束位置
 * @param {string} [options.char="*"] 替换字符
 * @param {number} [options.repeat] 替换字符的重复次数，默认为替换内容长度，可设置为固定值
 * @param {string} [options.exclude] 排除字符，如果指定排除项，repeat设置无效
 * @returns {string} 处理后的字符
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
 * replaceChar('林某某', {start: 1, end: Infinity, repeat: 2});
 * // => 林**
 * replaceChar('林某', {start: 1, end: Infinity, repeat: 2});
 * // => 林**
 * replaceChar('林某某某', {start: 1, end: Infinity, repeat: 2});
 * // => 林**
 *
 */
function replaceChar(str = '', { start = 3, end = -4, char = '*', repeat, exclude } = {}) {
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

  let middleStr = str.substring(start, end);

  if (exclude) {
    const reg = new RegExp(`[^${exclude}]`, 'g');
    middleStr = middleStr.replace(reg, char);
  } else {
    repeat = typeof repeat === 'number' && repeat >= 0 ? repeat : middleStr.length;
    middleStr = char.repeat(repeat);
  }

  return str.substring(0, start) + middleStr + str.substring(end);
}

export default replaceChar;
