import convertToString from './utils/convertToString';

const reg = /^[A-Z]{6}[A-Z\d]{2}(?:[A-Z\d]{3})?$/;

/**
 * 检测值是否为 Swift Code。8位或11位，前6位为大写字母，7-8位为大写字母或数字，9-11位为可选的大写字母或数字。
 *
 * @static
 * @alias module:Validator.isSwiftCode
 * @see 参考 {@link https://zh.wikipedia.org/wiki/ISO_9362|ISO 9362}
 * @since 4.9.0
 * @param {*} value 要检测的值
 * @returns {boolean} 值是否为 Swift Code
 */
function isSwiftCode(value) {
  const valueStr = convertToString(value);
  return reg.test(valueStr);
}

export default isSwiftCode;
