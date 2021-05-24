export default isRegExp;
/**
 * 检查值是否为RegExp
 *
 * @static
 * @alias module:Type.isRegExp
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为RegExp
 * @example
 *
 * isRegExp(/abc/)
 * // => true
 *
 * isRegExp('/abc/')
 * // => false
 */
declare function isRegExp(value: any): boolean;
