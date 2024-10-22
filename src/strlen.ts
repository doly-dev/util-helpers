import { toString } from 'ut2';

/**
 * 获取字符长度。中文汉字占2个字符，英文占1个字符，特殊如emoji占4个字符。
 *
 * @alias module:Other.strlen
 * @since 4.10.0
 * @param {string} str 字符串
 * @returns {number} 字符长度
 * @example
 *
 * strlen('你好a'); // 5
 * strlen('你好，世界！'); // 12
 * strlen('严両丞丽'); // 8
 * strlen('abcde'); // 5
 * strlen('𠮷'); // 4
 * strlen('🍎'); // 4
 *
 */
function strlen(str: string) {
  const realStr = toString(str);
  let len = 0;
  for (let i = 0; i < realStr.length; i++) {
    const c = realStr.charCodeAt(i);
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}

export default strlen;
