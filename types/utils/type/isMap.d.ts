export default isMap;
/**
 * 检查值是否为Map
 *
 * @static
 * @alias module:Type.isMap
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为Map
 * @example
 *
 * isMap(new Map)
 * // => true
 *
 * isMap(new WeakMap)
 * // => false
 */
declare function isMap(value: any): boolean;
