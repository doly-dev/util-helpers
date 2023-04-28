import normalizeString from './normalizeString';

// 邮政编码
const reg = /^\d{6}$/;

/**
 * 检测值是否为邮政编码，6位数字
 *
 * @static
 * @alias module:Validator.isPostcode
 * @since 1.1.0
 * @param {*} value 要检测的值
 * @returns {boolean} 值是否为邮政编码
 * @example
 *
 * isPostcode('101111'); // true
 * isPostcode('123'); // false
 *
 */
function isPostcode(value: any) {
  const valueStr = normalizeString(value);
  return reg.test(valueStr);
}

export default isPostcode;
