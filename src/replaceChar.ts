import { toString } from 'ut2';

type Options = {
  start?: number;
  end?: number;
  char?: string;
  repeat?: number;
  exclude?: string;
};

/**
 * 替换字符，应用场景如：脱敏
 *
 * @alias module:Processor.replaceChar
 * @since 1.1.0
 * @param {string} str 要处理的字符串
 * @param {Object} [options] 配置项
 * @param {number} [options.start=3] 开始位置，默认`3`
 * @param {number} [options.end=-4] 结束位置，默认`-4`
 * @param {string} [options.char="*"] 替换字符，默认`*`
 * @param {number} [options.repeat] 替换字符的重复次数，默认为替换内容长度，可设置为固定值
 * @param {string} [options.exclude] 排除字符，如果指定排除项，repeat设置无效
 * @returns {string} 处理后的字符
 * @example
 *
 * // 手机号 前3后4
 * replaceChar('13000000000'); // 130****0000
 *
 * // 手机号 前2后4
 * replaceChar('13000000000', { start: 2 }); // 13*****0000
 *
 * // 身份证 前6后4
 * replaceChar('130701199310302288', { start: 6, end: -4 }); // 130701********2288
 *
 * // 邮箱@前两位
 * const email = '12345@qq.com';
 * const emailAtIndex = email.indexOf('@');
 * replaceChar('email', { start: emailAtIndex - 2, end: emailAtIndex }); // 123**@qq.com
 *
 * // 邮箱 前2和@后面内容，固定替换字符4位
 * replaceChar(email, {start: 2, end: email.indexOf('@'), repeat: 4}); // 12****@qq.com
 *
 * // 银行卡号 只展示后4位，固定替换字符4位
 * replaceChar('6228480402564890018', {start: 0, end: -4, repeat: 4}); // ****0018
 *
 * // 银行卡号 前6后4
 * replaceChar('6228480402564890018', { start: 6, end: -4 }); // 622848*********0018
 *
 * // 银行卡号 前4后3 忽略格式的空格
 * replaceChar('6228 4804 0256 4890 018', {start: 4, end: -4, exclude: ' '}); // 6228 **** **** **** 018
 *
 * // 用户名
 * replaceChar('林某某', {start: 1, end: Infinity, repeat: 2}); // 林**
 * replaceChar('林某', {start: 1, end: Infinity, repeat: 2}); // 林**
 * replaceChar('林某某某', { start: 1, end: -1, repeat: 1 }); // 林*某
 *
 */
function replaceChar(str = '', options: Options = {}) {
  const { char = '*', exclude } = options;
  let { start = 3, end = -4, repeat } = options;

  const realStr = toString(str);
  const strLen = realStr.length;

  // 开始位置超过str长度
  if (Math.abs(start) >= strLen) {
    return realStr;
  }

  start = start >= 0 ? start : strLen + start;
  end = end >= 0 ? end : strLen + end;

  // 开始位置大于结束位置
  if (start >= end) {
    return realStr;
  }

  let middleStr = realStr.substring(start, end);

  if (exclude) {
    const reg = new RegExp(`[^${exclude}]`, 'g');
    middleStr = middleStr.replace(reg, char);
  } else {
    repeat = typeof repeat === 'number' && repeat >= 0 ? repeat : middleStr.length;
    middleStr = char.repeat(repeat!);
  }

  return realStr.substring(0, start) + middleStr + realStr.substring(end);
}

export default replaceChar;
