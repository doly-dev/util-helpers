import { toString } from 'ut2';

// ipv4正则
const reg = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

/**
 * 检测值是否为ipv4
 *
 * @alias module:Validator.isIPv4
 * @since 1.1.0
 * @param {*} value 要检测的值
 * @returns {boolean} 值是否为ipv4
 * @example
 *
 * isIPv4('192.168.1.1'); // true
 * isIPv4('255.255.255.255'); // true
 * isIPv4('256.256.256.256'); // false
 * isIPv4('0.0'); // false
 *
 */
function isIPv4(value: any) {
  const valueStr = toString(value);
  return reg.test(valueStr);
}

export default isIPv4;
