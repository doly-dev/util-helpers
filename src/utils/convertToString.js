import isString from './type/isString';
import { config } from './config';

/**
 * 转换为字符串
 *
 * @param {*} value 值
 * @returns 字符串
 */
function convertToString(value) {
  if (!isString(value)) {
    if (!config.disableWarning) {
      console.warn(`[validatePassword] value must be a string.`);
    }
    return String(value);
  }
  return value;
}

export default convertToString;
