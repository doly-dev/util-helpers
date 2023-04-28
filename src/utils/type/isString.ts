import isType from './isType';

/**
 * 检查值是否为String
 *
 * @static
 * @alias module:Type.isString
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为String
 * @example
 *
 * isString('abc')
 * // => true
 *
 * isString(1)
 * // => false
 */
function isString(value: any) {
  return isType(value, 'String');
}

export default isString;
