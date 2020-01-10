// 车牌号正则
const reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;

/**
 * 检测值是否为车牌号
 * 
 * @static
 * @alias module:Validator.isVehicle
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为车牌号
 * @example 
 * 
 * isVehicle('京L88888');
 * // => true
 *
 * isVehicle('333333');
 * // => false
 * 
 */
function isVehicle(value) {
  return reg.test(value);
}

export default isVehicle;