export default isObject;
/**
 * 检查值是否为Object
 *
 * @static
 * @alias module:Type.isObject
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为Object
 * @example
 *
 * isObject({})
 * // => true
 *
 * isObject([1,2,3])
 * // => true
 *
 * isObject(null)
 * // => false
 */
declare function isObject(value: any): boolean;
