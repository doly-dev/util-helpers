import isString from './type/isString';

/**
 * 转换为字符串
 *
 * @param {*} value 值
 * @returns {string} 字符串
 */
function convertToString(value: any) {
  return isString(value) ? (value as string) : String(value);
}

export default convertToString;
