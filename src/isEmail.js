import convertToString from './utils/convertToString';

// 邮箱
const reg = /^[\da-z]+([\-\.\_]?[\da-z]+)*@[\da-z]+([\-\.]?[\da-z]+)*(\.[a-z]{2,})+$/i;

/**
 * 检测值是否为Email
 *
 * @static
 * @alias module:Validator.isEmail
 * @since 1.1.0
 * @param {*} value 要检测的值
 * @returns {boolean} 值是否为Email
 * @example
 *
 * isEmail('1232@qq.com');
 * // => true
 *
 * isEmail('123@');
 * // => false
 *
 */
function isEmail(value) {
  const valueStr = convertToString(value);
  return reg.test(valueStr);
}

export default isEmail;
