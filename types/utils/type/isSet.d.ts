export default isSet;
/**
 * 检查值是否为Set
 *
 * @static
 * @alias module:Type.isSet
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为Set
 * @example
 *
 * isSet(new Set)
 * // => true
 *
 * isSet(new WeakSet)
 * // => false
 */
declare function isSet(value: any): boolean;
