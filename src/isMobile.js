// 手机号码 11位数字，以1开头，第二位是3456789其中一个，后面再加9个数字
const reg = /^1[3456789]\d{9}$/;

/**
 * 检测值是否为手机号码
 * 
 * @static
 * @alias module:Validator.isMobile
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为手机号码
 * @example 
 * 
 * isMobile('13000000000');
 * // => true
 *
 * isMobile('13000');
 * // => false
 * 
 */
function isMobile(value) {
  return reg.test(value);
}

export default isMobile;