const numberChars = '0123456789';
const letterChars = 'abcdefghijklmnopqrstuvwxyz';
const defaultChars = numberChars + letterChars + letterChars.toUpperCase();

/**
 * @private
 * @param {number} len 长度
 * @param {string} optionalChars 允许的字符，默认为数字和大小写字母
 * @param {string} [prefix=''] 前缀部分，不计入长度
 * @returns {string}
 */
function internalRandomString(len: number, optionalChars: string, prefix = ''): string {
  while (len-- > 0) {
    const r = optionalChars[Math.floor(Math.random() * optionalChars.length)];
    return internalRandomString(len, optionalChars, prefix + r);
  }
  return prefix;
}

/**
 * 生成随机字符串
 *
 * @static
 * @alias module:Other.randomString
 * @since 4.8.0
 * @param {number} [len=0] 长度
 * @param {string} [optionalChars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'] 允许的字符，默认为数字和大小写字母
 * @returns {string} 随机字符串
 * @example
 * 
 * randomString(5); // slk23
 * randomString(8); // 71mHqo2A
 *
 * // 自定义允许的字符
 * randomString(5, 'abc'); // ccbcb
 * randomString(8, 'abcefg'); // bcgcfabg
 * 
 */
function randomString(len = 0, optionalChars?: string) {
  let realLen = typeof len === 'number' ? len : Number(len);
  if (isNaN(realLen)) {
    realLen = 0;
  }

  const realChars = typeof optionalChars === 'string' && optionalChars ? optionalChars : defaultChars;

  return internalRandomString(len, realChars);
}

export default randomString;
