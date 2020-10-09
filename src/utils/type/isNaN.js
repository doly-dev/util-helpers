import isType from './isType';

/**
 * 检查值是否为NaN
 * 
 * @static
 * @alias module:Type.isNaN
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {boolean} 是否为NaN
 * @example
 *
 * isNaN(NaN)
 * // => true
 *
 * isNaN(1)
 * // => false
 */
function _isNaN(value) {
  return isType(value, 'Number') && isNaN(value);
}

export default _isNaN;