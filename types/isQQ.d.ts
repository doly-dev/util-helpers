export default isQQ;
/**
 * 检测值是否为QQ号，非0开头，5至11位数字
 *
 * @static
 * @alias module:Validator.isQQ
 * @since 1.1.0
 * @param {string} value 要检测的值
 * @returns {boolean} 值是否为QQ号
 * @example
 *
 * isQQ('12345');
 * // => true
 *
 * isQQ('123');
 * // => false
 *
 */
declare function isQQ(value: string): boolean;
