import { toString } from 'ut2';

// 邮政编码
const reg = /^\d{6}$/;

/**
 * 检测值是否为邮政编码，6位数字
 *
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
  const valueStr = toString(value);
  return reg.test(valueStr);
}

export default isPostcode;
