import { toString } from 'ut2';

// 邮箱
const reg = /^[\da-z]+([-._]?[\da-z]+)*@[\da-z]+([-.]?[\da-z]+)*(\.[a-z]{2,})+$/i;

/**
 * 检测值是否为Email
 *
 * @alias module:Validator.isEmail
 * @since 1.1.0
 * @param {*} value 要检测的值
 * @returns {boolean} 值是否为Email
 * @example
 *
 * isEmail('123@qq.com'); // true
 * isEmail('1-23@qq.com'); // true
 * isEmail('123@'); // false
 *
 * // 包含非法字符（除 -、_、. 以外的符号）
 * isEmail('1 23@qq.com'); // false
 * isEmail('1&23@qq.com'); // false
 * isEmail('1%23@qq.com'); // false
 *
 */
function isEmail(value: any) {
  const valueStr = toString(value);
  return reg.test(valueStr);
}

export default isEmail;
