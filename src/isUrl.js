import convertToString from './utils/convertToString';

// url正则
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

/**
 * 检测值是否为url
 *
 * @static
 * @alias module:Validator.isUrl
 * @since 3.4.0
 * @see 参考 {@link https://zh.wikipedia.org/wiki/统一资源定位符|统一资源定位符}
 * @param {*} value 要检测的值
 * @returns {boolean} 值是否为url
 * @example
 *
 * isUrl('');
 * // => false
 *
 * isUrl('8.8.8.8');
 * // => false
 *
 * isUrl('example.com');
 * // => true
 *
 * isUrl('http://example.com');
 * // => true
 *
 * isUrl('https://example.com:8080');
 * // => true
 *
 * isUrl('http://www.example.com/test/123');
 * // => true
 *
 * isUrl('http://www.example.com/test/123?foo=bar');
 * // => true
 */
function isUrl(value) {
  const valueStr = convertToString(value);
  return reg.test(valueStr);
}

export default isUrl;
