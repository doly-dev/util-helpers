import isType from './isType';

/**
 * 检查值是否为Array
 *
 * @static
 * @alias module:Type.isArray
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为Array
 * @example
 *
 * isArray([])
 * // => true
 *
 * isArray(1)
 * // => false
 */
function isArray(value: any) {
  return Array.isArray(value) || isType(value, 'Array');
}

export default isArray;
