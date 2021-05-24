export default isEmail;
/**
 * 检测值是否为Email
 *
 * @static
 * @alias module:Validator.isEmail
 * @since 1.1.0
 * @param {string} value 要检测的值
 * @returns {boolean} 值是否为Email
 * @example
 *
 * isEmail('1232@qq.com');
 * // => true
 *
 * isEmail('123@');
 * // => false
 *
 */
declare function isEmail(value: string): boolean;
