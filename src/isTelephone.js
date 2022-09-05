import normalizeString from './normalizeString';

// 固定电话 支持区号和分机号 3～4位区号，以0开头；7～8位直播号，以2～9开头；1～6位分机号
const reg = /^(0\d{2,3}\-)?([2-9]\d{6,7})(\-\d{1,6})?$/;

/**
 * 检测值是否为固定电话
 *
 * @static
 * @alias module:Validator.isTelephone
 * @since 1.1.0
 * @param {*} value 要检测的值
 * @returns {boolean} 值是否为固定电话
 * @example
 *
 * isTelephone('22033212'); // true
 * isTelephone('13000000000'); // false
 * 
 * // 含区号
 * isTelephone('021-22033212'); // true
 *
 * // 含区号和分机号
 * isTelephone('021-22033212-123'); // true
 *
 */
function isTelephone(value) {
  const valueStr = normalizeString(value);
  return reg.test(valueStr);
}

export default isTelephone;
