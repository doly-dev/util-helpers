export default isWX;
/**
 * 检测值是否为微信号
 *
 * @static
 * @alias module:Validator.isWX
 * @since 1.1.0
 * @param {string} value 要检测的值
 * @returns {boolean} 值是否为微信号
 * @example
 *
 * isWX('a12345');
 * // => true
 *
 * isWX('123');
 * // => false
 *
 */
declare function isWX(value: string): boolean;
