import { toString } from 'ut2';

// 微信号 6至20位，以字母开头，字母，数字，减号（连接符），下划线
const reg = /^[a-z]([-_a-z0-9]{5,19})+$/i;

/**
 * 检测值是否为微信号
 *
 * @alias module:Validator.isWX
 * @since 1.1.0
 * @param {*} value 要检测的值
 * @returns {boolean} 值是否为微信号
 * @example
 *
 * isWX('a12345'); // true
 * isWX('123'); // false
 *
 */
function isWX(value: any) {
  const valueStr = toString(value);
  return reg.test(valueStr);
}

export default isWX;
