// QQ号 非0开头，5至11位数字
const reg = /^[1-9]\d{4,10}$/;

/**
 * 检测值是否为QQ号
 * 
 * @static
 * @alias module:Validator.isQQ
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为QQ号
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
  return reg.test(value);
}

export default isQQ;