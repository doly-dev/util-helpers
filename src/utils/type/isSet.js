import isType from './isType';

/**
 * 检查值是否为Set
 * 
 * @static
 * @alias module:Type.isSet
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为Set
 * @example
 *
 * isSet(new Set)
 * // => true
 *
 * isSet(new WeakSet)
 * // => false
 */
function isSet(value) {
  return isType(value, 'Set');
}

export default isSet;