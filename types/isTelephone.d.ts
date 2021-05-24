export default isTelephone;
/**
 * 检测值是否为固定电话
 *
 * @static
 * @alias module:Validator.isTelephone
 * @since 1.1.0
 * @param {string} value 要检测的值
 * @returns {boolean} 值是否为固定电话
 * @example
 *
 * isTelephone('22033212');
 * // => true
 *
 * isTelephone('021-22033212');
 * // => true
 *
 * isTelephone('021-22033212-123');
 * // => true
 *
 * isTelephone('13000000000');
 * // => false
 *
 */
declare function isTelephone(value: string): boolean;
