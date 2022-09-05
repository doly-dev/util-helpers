import normalizeString from './normalizeString';

// 车牌号正则
const reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([A-Z0-9]{4}[A-Z0-9挂学警港澳]{1})|([A-Z0-9]{5}[DF])|([DF][A-Z0-9]{5}))$/;

/**
 * 检测值是否为车牌号，支持新能源和非新能源车牌
 *
 * @static
 * @alias module:Validator.isVehicle
 * @see 参考 {@link https://baike.baidu.com/item/车牌号|车牌号}
 * @since 1.1.0
 * @param {*} value 要检测的值
 * @returns {boolean} 值是否为车牌号
 * @example
 *
 * isVehicle('京L12345'); // true
 * isVehicle('京L1234学'); // true
 * isVehicle('BL1234警'); // true
 * 
 * // 新能源车牌
 * isVehicle('粤BD12345'); // true
 * isVehicle('粤BF12345'); // true
 * isVehicle('粤B12345D'); // true
 * isVehicle('粤B12345F'); // true
 *
 */
function isVehicle(value) {
  const valueStr = normalizeString(value);
  return reg.test(valueStr);
}

export default isVehicle;
