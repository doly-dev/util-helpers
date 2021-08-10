import convertToString from './utils/convertToString';

// QQ号正则
const reg = /^[1-9]\d{4,10}$/;

/**
 * 检测值是否为QQ号，非0开头，5至11位数字
 *
 * @static
 * @alias module:Validator.isQQ
 * @since 1.1.0
 * @param {*} value 要检测的值
 * @returns {boolean} 值是否为QQ号
 * @example
 *
 * isQQ('12345');
 * // => true
 *
 * isQQ('123');
 * // => false
 *
 */
function isQQ(value) {
  const valueStr = convertToString(value);
  return reg.test(valueStr);
}

export default isQQ;
