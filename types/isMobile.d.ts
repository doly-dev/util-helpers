export default isMobile;
/**
 * 检测值是否为手机号码
 *
 * @static
 * @alias module:Validator.isMobile
 * @since 1.1.0
 * @param {string} value 要检测的值
 * @returns {boolean} 值是否为手机号码
 * @example
 *
 * isMobile('13000000000');
 * // => true
 *
 * isMobile('13000');
 * // => false
 *
 */
declare function isMobile(value: string): boolean;
